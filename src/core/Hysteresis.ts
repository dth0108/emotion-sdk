/**
 * Healside Emotion SDK - Hysteresis Engine
 * 
 * 감정 전환 안정화 알고리즘
 * 특허 핵심 기술: 연속 판단 + 최소 간격 + 신뢰도 임계값
 */

interface HysteresisConfig {
  /** 전환을 위한 최소 연속 판단 횟수 */
  requiredConsecutiveCount: number;
  /** 연속 판단의 최대 간격 (ms) */
  maxTimeBetweenJudgments: number;
  /** 최소 신뢰도 임계값 */
  minConfidence: number;
  /** 전환 사이 최소 간격 (ms) */
  minimumSwitchIntervalMs: number;
  /** 히스토리 보존 기간 (ms) */
  historyRetentionTime: number;
  /** 반대 감정 전환 시 필요한 추가 확인 횟수 */
  oppositeEmotionExtraCount: number;
}

interface EmotionTracker {
  [emotion: string]: {
    consecutiveCount: number;
    lastTimestamp: number;
    confidence: number;
  };
}

interface TransitionRecord {
  from: string;
  to: string;
  timestamp: number;
  confidence: number;
}

interface ProcessResult {
  shouldTransition: boolean;
  stableEmotion: string;
  consecutiveCount: number;
  debugInfo: {
    allCounts: EmotionTracker;
    transitionReason?: string;
    blockedReason?: string;
  };
}

const DEFAULT_CONFIG: HysteresisConfig = {
  requiredConsecutiveCount: 3,
  maxTimeBetweenJudgments: 10000,
  minConfidence: 0.7,
  minimumSwitchIntervalMs: 5000,
  historyRetentionTime: 300000,
  oppositeEmotionExtraCount: 2 // 반대 감정은 5회 확인 (3 + 2)
};

// 반대 감정 쌍 정의
const OPPOSITE_EMOTIONS: [string, string][] = [
  ['happy', 'sad'],
  ['excited', 'depression'],
  ['anger', 'fear'],
  ['stressed', 'meditation'],
  ['anxious', 'meditation']
];

// 유사 감정 그룹 정의
const SIMILAR_EMOTION_GROUPS: string[][] = [
  ['happy', 'excited'],
  ['sad', 'depression'],
  ['stressed', 'anxious'],
  ['anger', 'stressed']
];

/**
 * Hysteresis - 감정 전환 안정화 엔진
 */
export class Hysteresis {
  private config: HysteresisConfig;
  private emotionCounts: EmotionTracker;
  private currentStableEmotion: string;
  private lastSwitchTimestamp: number;
  private transitionHistory: TransitionRecord[];

  constructor(config: Partial<HysteresisConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.emotionCounts = {};
    this.currentStableEmotion = 'neutral';
    this.lastSwitchTimestamp = 0;
    this.transitionHistory = [];

    // 초기화 로그 (특허 파라미터 명시)
    console.info('[Hysteresis:init]', {
      requiredConsecutiveCount: this.config.requiredConsecutiveCount,
      minimumSwitchIntervalMs: this.config.minimumSwitchIntervalMs,
      minConfidence: this.config.minConfidence
    });
  }

  /**
   * 감정 판단 처리 및 전환 여부 결정 (Enhanced)
   */
  processEmotionJudgment(
    emotion: string,
    confidence: number,
    timestamp: number = Date.now()
  ): ProcessResult {
    // 1. 신뢰도 체크
    if (confidence < this.config.minConfidence) {
      return this.createResult(false, `Low confidence: ${confidence} < ${this.config.minConfidence}`);
    }

    // 2. 최소 전환 간격 체크
    const timeSinceLastSwitch = timestamp - this.lastSwitchTimestamp;
    if (timeSinceLastSwitch < this.config.minimumSwitchIntervalMs) {
      return this.createResult(false, `Too soon: ${timeSinceLastSwitch}ms < ${this.config.minimumSwitchIntervalMs}ms`);
    }

    // 3. 연속 카운트 업데이트
    this.updateEmotionCount(emotion, confidence, timestamp);

    // 4. 다른 감정들 리셋 (시간 초과)
    this.cleanupOldCounts(timestamp);

    // 5. 동적 임계값 계산 (반대 감정 vs 유사 감정)
    const requiredCount = this.getRequiredCount(this.currentStableEmotion, emotion);

    // 6. 전환 조건 체크
    const emotionData = this.emotionCounts[emotion];
    if (emotionData && emotionData.consecutiveCount >= requiredCount) {
      // 전환 실행
      const previousEmotion = this.currentStableEmotion;
      this.currentStableEmotion = emotion;
      this.lastSwitchTimestamp = timestamp;
      
      // 히스토리 기록
      this.recordTransition(previousEmotion, emotion, timestamp, confidence);
      
      // 카운트 리셋
      this.emotionCounts[emotion].consecutiveCount = 0;

      const transitionType = this.isOppositeEmotion(previousEmotion, emotion) ? 'OPPOSITE' : 
                             this.isSimilarEmotion(previousEmotion, emotion) ? 'SIMILAR' : 'NORMAL';

      return this.createResult(
        true,
        undefined,
        `Transition: ${previousEmotion} → ${emotion} [${transitionType}] (count: ${requiredCount})`
      );
    }

    return this.createResult(
      false,
      `Not enough consecutive: ${emotionData?.consecutiveCount || 0} < ${requiredCount}`
    );
  }

  /**
   * 필요한 확인 횟수 계산
   * - 반대 감정: 5회 (기본 3 + 추가 2)
   * - 유사 감정: 2회
   * - 일반: 3회
   */
  private getRequiredCount(from: string, to: string): number {
    if (this.isOppositeEmotion(from, to)) {
      return this.config.requiredConsecutiveCount + this.config.oppositeEmotionExtraCount;
    }
    
    if (this.isSimilarEmotion(from, to)) {
      return 2; // 유사 감정은 빠르게 전환
    }
    
    return this.config.requiredConsecutiveCount;
  }

  /**
   * 반대 감정 체크
   */
  private isOppositeEmotion(e1: string, e2: string): boolean {
    return OPPOSITE_EMOTIONS.some(
      ([a, b]) => (a === e1 && b === e2) || (a === e2 && b === e1)
    );
  }

  /**
   * 유사 감정 체크
   */
  private isSimilarEmotion(e1: string, e2: string): boolean {
    return SIMILAR_EMOTION_GROUPS.some(group => 
      group.includes(e1) && group.includes(e2)
    );
  }

  private updateEmotionCount(emotion: string, confidence: number, timestamp: number): void {
    if (!this.emotionCounts[emotion]) {
      this.emotionCounts[emotion] = {
        consecutiveCount: 0,
        lastTimestamp: 0,
        confidence: 0
      };
    }

    const data = this.emotionCounts[emotion];
    const timeSinceLastJudgment = timestamp - data.lastTimestamp;

    // 연속성 체크
    if (timeSinceLastJudgment <= this.config.maxTimeBetweenJudgments) {
      data.consecutiveCount++;
    } else {
      data.consecutiveCount = 1;
    }

    data.lastTimestamp = timestamp;
    data.confidence = confidence;
  }

  private cleanupOldCounts(currentTimestamp: number): void {
    Object.keys(this.emotionCounts).forEach(emotion => {
      const data = this.emotionCounts[emotion];
      const age = currentTimestamp - data.lastTimestamp;
      
      if (age > this.config.maxTimeBetweenJudgments) {
        data.consecutiveCount = 0;
      }
    });
  }

  private recordTransition(
    from: string,
    to: string,
    timestamp: number,
    confidence: number
  ): void {
    this.transitionHistory.push({ from, to, timestamp, confidence });

    // 오래된 기록 정리
    const cutoff = timestamp - this.config.historyRetentionTime;
    this.transitionHistory = this.transitionHistory.filter(
      record => record.timestamp > cutoff
    );
  }

  private createResult(
    shouldTransition: boolean,
    blockedReason?: string,
    transitionReason?: string
  ): ProcessResult {
    return {
      shouldTransition,
      stableEmotion: this.currentStableEmotion,
      consecutiveCount: this.emotionCounts[this.currentStableEmotion]?.consecutiveCount || 0,
      debugInfo: {
        allCounts: { ...this.emotionCounts },
        transitionReason,
        blockedReason
      }
    };
  }

  // ============================================
  // 공개 메서드
  // ============================================

  /** 현재 안정 감정 조회 */
  getStableEmotion(): string {
    return this.currentStableEmotion;
  }

  /** 전환 히스토리 조회 */
  getTransitionHistory(): TransitionRecord[] {
    return [...this.transitionHistory];
  }

  /** 설정 업데이트 */
  updateConfig(config: Partial<HysteresisConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /** 상태 리셋 */
  reset(): void {
    this.emotionCounts = {};
    this.currentStableEmotion = 'neutral';
    this.lastSwitchTimestamp = 0;
    this.transitionHistory = [];
  }

  /** 안정성 지수 계산 (0-1) */
  getStabilityIndex(): number {
    const recentTransitions = this.transitionHistory.filter(
      record => Date.now() - record.timestamp < 60000 // 최근 1분
    );

    // 전환이 적을수록 안정적
    const transitionsPerMinute = recentTransitions.length;
    const maxTransitions = this.config.requiredConsecutiveCount * 2;
    
    return Math.max(0, 1 - (transitionsPerMinute / maxTransitions));
  }
}

export default Hysteresis;

