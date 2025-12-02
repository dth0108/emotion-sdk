/**
 * Healside Emotion SDK - Multimodal Fusion
 * 
 * 멀티모달 감정 융합 엔진
 * 특허 핵심 기술: 행동 데이터 + 텍스트 분석 결합
 */

import type { EmotionType, EmotionScores } from '../types';
import { BehaviorTracker } from './BehaviorTracker';
import { TextAnalyzer } from './TextAnalyzer';
import { Hysteresis } from './Hysteresis';

interface FusionConfig {
  /** 행동 분석 가중치 (0-1) */
  behaviorWeight?: number;
  /** 텍스트 분석 가중치 (0-1) */
  textWeight?: number;
  /** 히스테리시스 적용 */
  useHysteresis?: boolean;
  /** 최소 신뢰도 임계값 */
  minConfidence?: number;
  /** 자동 분석 간격 (ms) */
  autoAnalyzeInterval?: number;
  /** 디버그 모드 */
  debug?: boolean;
}

interface FusionResult {
  /** 최종 감정 */
  emotion: EmotionType;
  /** 신뢰도 */
  confidence: number;
  /** 감정별 점수 */
  scores: EmotionScores;
  /** 소스 */
  source: 'behavior' | 'text' | 'multimodal' | 'manual';
  /** 상세 정보 */
  details: {
    behaviorEmotion?: EmotionType;
    behaviorConfidence?: number;
    behaviorReasons?: string[];
    textEmotion?: EmotionType;
    textConfidence?: number;
    textKeywords?: string[];
    fusionMethod: string;
  };
  /** 타임스탬프 */
  timestamp: string;
}

interface FusionSubscriber {
  (result: FusionResult): void;
}

const DEFAULT_CONFIG: FusionConfig = {
  behaviorWeight: 0.4,
  textWeight: 0.6,
  useHysteresis: true,
  minConfidence: 0.5,
  autoAnalyzeInterval: 5000, // 5초
  debug: false
};

/**
 * MultimodalFusion - 멀티모달 감정 융합 엔진
 */
export class MultimodalFusion {
  private config: FusionConfig;
  private behaviorTracker: BehaviorTracker;
  private textAnalyzer: TextAnalyzer;
  private hysteresis: Hysteresis;
  
  private currentResult: FusionResult;
  private subscribers: Set<FusionSubscriber>;
  private autoAnalyzeTimer: NodeJS.Timeout | null;
  private lastTextInput: string;
  private manualOverride: EmotionType | null;

  constructor(config: Partial<FusionConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    
    this.behaviorTracker = new BehaviorTracker({ debug: this.config.debug });
    this.textAnalyzer = new TextAnalyzer({ debug: this.config.debug });
    this.hysteresis = new Hysteresis({
      requiredConsecutiveCount: 3,
      minimumSwitchIntervalMs: 5000,
      minConfidence: 0.7
    });
    
    this.currentResult = this.getDefaultResult();
    this.subscribers = new Set();
    this.autoAnalyzeTimer = null;
    this.lastTextInput = '';
    this.manualOverride = null;
  }

  // ============================================
  // 라이프사이클
  // ============================================

  start(): void {
    this.behaviorTracker.start();
    this.startAutoAnalyze();
    this.log('Multimodal fusion started');
  }

  stop(): void {
    this.behaviorTracker.stop();
    this.stopAutoAnalyze();
    this.log('Multimodal fusion stopped');
  }

  reset(): void {
    this.behaviorTracker.reset();
    this.hysteresis.reset();
    this.currentResult = this.getDefaultResult();
    this.lastTextInput = '';
    this.manualOverride = null;
    this.notifySubscribers();
  }

  // ============================================
  // 자동 분석
  // ============================================

  private startAutoAnalyze(): void {
    if (this.autoAnalyzeTimer) return;
    
    this.autoAnalyzeTimer = setInterval(() => {
      this.analyze();
    }, this.config.autoAnalyzeInterval);
  }

  private stopAutoAnalyze(): void {
    if (this.autoAnalyzeTimer) {
      clearInterval(this.autoAnalyzeTimer);
      this.autoAnalyzeTimer = null;
    }
  }

  // ============================================
  // 분석 메서드
  // ============================================

  /**
   * 통합 분석 수행
   */
  async analyze(textInput?: string): Promise<FusionResult> {
    // 수동 오버라이드 체크
    if (this.manualOverride) {
      return this.createManualResult(this.manualOverride);
    }

    // 텍스트 저장
    if (textInput) {
      this.lastTextInput = textInput;
    }

    // 행동 분석
    const behaviorResult = this.behaviorTracker.inferEmotion();
    
    // 텍스트 분석 (있는 경우)
    let textResult = null;
    if (this.lastTextInput) {
      textResult = await this.textAnalyzer.analyze(this.lastTextInput);
    }

    // 융합
    const fusedResult = this.fuseResults(behaviorResult, textResult);
    
    // 히스테리시스 적용
    if (this.config.useHysteresis) {
      const hysteresisResult = this.hysteresis.processEmotionJudgment(
        fusedResult.emotion,
        fusedResult.confidence,
        Date.now()
      );
      
      if (!hysteresisResult.shouldTransition) {
        // 전환 차단됨 - 이전 감정 유지
        this.log('Transition blocked by hysteresis', hysteresisResult.debugInfo);
        return this.currentResult;
      }
    }

    // 결과 저장 및 알림
    this.currentResult = fusedResult;
    this.notifySubscribers();
    
    return fusedResult;
  }

  /**
   * 행동 + 텍스트 결과 융합
   */
  private fuseResults(
    behaviorResult: { emotion: EmotionType; confidence: number; reasons: string[] },
    textResult: { emotion: EmotionType; confidence: number; keywords: string[] } | null
  ): FusionResult {
    const timestamp = new Date().toISOString();
    
    // 텍스트 없음 - 행동만 사용
    if (!textResult) {
      return {
        emotion: behaviorResult.emotion,
        confidence: behaviorResult.confidence * 0.8, // 단일 소스는 신뢰도 감소
        scores: { [behaviorResult.emotion]: behaviorResult.confidence },
        source: 'behavior',
        details: {
          behaviorEmotion: behaviorResult.emotion,
          behaviorConfidence: behaviorResult.confidence,
          behaviorReasons: behaviorResult.reasons,
          fusionMethod: 'behavior_only'
        },
        timestamp
      };
    }

    // 행동 신뢰도 낮음 - 텍스트만 사용
    if (behaviorResult.confidence < 0.3) {
      return {
        emotion: textResult.emotion,
        confidence: textResult.confidence,
        scores: { [textResult.emotion]: textResult.confidence },
        source: 'text',
        details: {
          textEmotion: textResult.emotion,
          textConfidence: textResult.confidence,
          textKeywords: textResult.keywords,
          fusionMethod: 'text_only'
        },
        timestamp
      };
    }

    // 멀티모달 융합
    const behaviorWeight = this.config.behaviorWeight!;
    const textWeight = this.config.textWeight!;
    
    // 가중 평균 점수 계산
    const scores: EmotionScores = {};
    const emotions = new Set([behaviorResult.emotion, textResult.emotion]);
    
    for (const emotion of emotions) {
      const behaviorScore = emotion === behaviorResult.emotion ? behaviorResult.confidence : 0;
      const textScore = emotion === textResult.emotion ? textResult.confidence : 0;
      scores[emotion] = behaviorScore * behaviorWeight + textScore * textWeight;
    }

    // 최고 점수 감정 선택
    let maxEmotion: EmotionType = 'neutral';
    let maxScore = 0;
    
    for (const [emotion, score] of Object.entries(scores)) {
      if (score > maxScore) {
        maxScore = score;
        maxEmotion = emotion as EmotionType;
      }
    }

    // 일치 여부에 따른 신뢰도 조정
    let confidence = maxScore;
    if (behaviorResult.emotion === textResult.emotion) {
      // 일치 시 신뢰도 부스트
      confidence = Math.min(0.95, confidence * 1.2);
    }

    return {
      emotion: maxEmotion,
      confidence,
      scores,
      source: 'multimodal',
      details: {
        behaviorEmotion: behaviorResult.emotion,
        behaviorConfidence: behaviorResult.confidence,
        behaviorReasons: behaviorResult.reasons,
        textEmotion: textResult.emotion,
        textConfidence: textResult.confidence,
        textKeywords: textResult.keywords,
        fusionMethod: `weighted_average (behavior: ${behaviorWeight}, text: ${textWeight})`
      },
      timestamp
    };
  }

  // ============================================
  // 수동 설정
  // ============================================

  setManualEmotion(emotion: EmotionType): void {
    this.manualOverride = emotion;
    this.currentResult = this.createManualResult(emotion);
    this.notifySubscribers();
    this.log('Manual emotion set', emotion);
  }

  clearManualEmotion(): void {
    this.manualOverride = null;
    this.analyze(); // 자동 분석 재개
    this.log('Manual emotion cleared');
  }

  private createManualResult(emotion: EmotionType): FusionResult {
    return {
      emotion,
      confidence: 1.0,
      scores: { [emotion]: 1.0 },
      source: 'manual',
      details: {
        fusionMethod: 'manual_override'
      },
      timestamp: new Date().toISOString()
    };
  }

  // ============================================
  // 텍스트 입력
  // ============================================

  feedText(text: string): void {
    this.lastTextInput = text;
    this.analyze(text);
  }

  // ============================================
  // 구독
  // ============================================

  subscribe(callback: FusionSubscriber): () => void {
    this.subscribers.add(callback);
    callback(this.currentResult);
    
    return () => {
      this.subscribers.delete(callback);
    };
  }

  private notifySubscribers(): void {
    this.subscribers.forEach(callback => {
      try {
        callback(this.currentResult);
      } catch (error) {
        this.log('Subscriber error', error);
      }
    });
  }

  // ============================================
  // 상태 조회
  // ============================================

  getResult(): FusionResult {
    return { ...this.currentResult };
  }

  getEmotion(): EmotionType {
    return this.currentResult.emotion;
  }

  getConfidence(): number {
    return this.currentResult.confidence;
  }

  getBehaviorMetrics() {
    return this.behaviorTracker.getMetrics();
  }

  // ============================================
  // 설정
  // ============================================

  updateConfig(config: Partial<FusionConfig>): void {
    this.config = { ...this.config, ...config };
    
    // 가중치 정규화
    const total = (this.config.behaviorWeight || 0) + (this.config.textWeight || 0);
    if (total > 0 && total !== 1) {
      this.config.behaviorWeight = (this.config.behaviorWeight || 0) / total;
      this.config.textWeight = (this.config.textWeight || 0) / total;
    }
  }

  // ============================================
  // 유틸리티
  // ============================================

  private getDefaultResult(): FusionResult {
    return {
      emotion: 'neutral',
      confidence: 0.5,
      scores: { neutral: 1 },
      source: 'behavior',
      details: {
        fusionMethod: 'default'
      },
      timestamp: new Date().toISOString()
    };
  }

  private log(message: string, data?: unknown): void {
    if (this.config.debug) {
      console.log(`[MultimodalFusion] ${message}`, data || '');
    }
  }
}

export default MultimodalFusion;

