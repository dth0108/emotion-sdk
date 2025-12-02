/**
 * Healside Emotion SDK - Core Engine
 * 
 * 감정 분석의 핵심 엔진
 * 모든 감정 관련 로직의 중앙 허브
 */

import type {
  EmotionType,
  EmotionState,
  EmotionScores,
  HealsideSDKConfig,
  BehaviorMetrics,
  EmotionTheme,
  ProductEmotionScore,
  HealsideEmotionSDK
} from '../types';
import { EMOTION_THEMES } from '../utils/themes';
import { Hysteresis } from './Hysteresis';

// 기본 설정
const DEFAULT_CONFIG: Partial<HealsideSDKConfig> = {
  trackBehavior: true,
  trackText: true,
  autoTheme: true,
  enableUI: true,
  debug: false,
  hysteresis: {
    consecutiveCount: 3,
    minInterval: 5000,
    minConfidence: 0.7
  },
  weights: {
    behavior: 0.4,
    text: 0.6
  }
};

// 초기 감정 상태
const INITIAL_STATE: EmotionState = {
  emotion: 'neutral',
  confidence: 0.5,
  scores: { neutral: 1 },
  source: 'auto',
  timestamp: new Date().toISOString()
};

/**
 * EmotionEngine - SDK의 핵심 클래스
 */
export class EmotionEngine implements HealsideEmotionSDK {
  private config: HealsideSDKConfig;
  private state: EmotionState;
  private subscribers: Set<(state: EmotionState) => void>;
  private hysteresis: Hysteresis;
  private enabled: boolean;
  private behaviorMetrics: BehaviorMetrics;
  
  constructor() {
    this.config = DEFAULT_CONFIG as HealsideSDKConfig;
    this.state = { ...INITIAL_STATE };
    this.subscribers = new Set();
    this.hysteresis = new Hysteresis();
    this.enabled = false;
    this.behaviorMetrics = {
      mouseSpeed: 0,
      clickFrequency: 0,
      scrollSpeed: 0,
      dwellTime: 0,
      hesitationTime: 0
    };
  }

  // ============================================
  // 초기화
  // ============================================

  init(config: HealsideSDKConfig): void {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.enabled = true;
    
    // 히스테리시스 설정
    if (this.config.hysteresis) {
      this.hysteresis = new Hysteresis({
        requiredConsecutiveCount: this.config.hysteresis.consecutiveCount || 3,
        minimumSwitchIntervalMs: this.config.hysteresis.minInterval || 5000,
        minConfidence: this.config.hysteresis.minConfidence || 0.7
      });
    }

    this.log('SDK initialized', this.config);
  }

  destroy(): void {
    this.enabled = false;
    this.subscribers.clear();
    this.state = { ...INITIAL_STATE };
    this.log('SDK destroyed');
  }

  // ============================================
  // 감정 상태 접근
  // ============================================

  getEmotion(): EmotionType {
    return this.state.emotion;
  }

  getConfidence(): number {
    return this.state.confidence;
  }

  getState(): EmotionState {
    return { ...this.state };
  }

  // ============================================
  // 감정 설정
  // ============================================

  setEmotion(emotion: EmotionType): void {
    this.updateState({
      emotion,
      confidence: 1.0,
      scores: { [emotion]: 1 },
      source: 'manual',
      timestamp: new Date().toISOString()
    });
  }

  /**
   * 내부용: 감정 상태 업데이트 (히스테리시스 적용)
   */
  updateEmotionFromAnalysis(
    emotion: EmotionType,
    confidence: number,
    scores: EmotionScores,
    source: EmotionState['source']
  ): void {
    if (!this.enabled) return;

    // 히스테리시스 체크
    const result = this.hysteresis.processEmotionJudgment(
      emotion,
      confidence,
      Date.now()
    );

    if (result.shouldTransition) {
      this.updateState({
        emotion: result.stableEmotion as EmotionType,
        confidence,
        scores,
        source,
        timestamp: new Date().toISOString()
      });
    } else {
      this.log('Emotion transition blocked by hysteresis', {
        attempted: emotion,
        current: this.state.emotion,
        reason: result.debugInfo.blockedReason
      });
    }
  }

  private updateState(newState: EmotionState): void {
    const previousEmotion = this.state.emotion;
    this.state = newState;

    // 콜백 호출
    if (this.config.onEmotionChange && previousEmotion !== newState.emotion) {
      this.config.onEmotionChange(newState);
    }

    // 구독자 알림
    this.notifySubscribers();

    // 테마 자동 적용
    if (this.config.autoTheme) {
      this.applyTheme();
    }

    this.log('State updated', newState);
  }

  // ============================================
  // 구독
  // ============================================

  subscribe(callback: (state: EmotionState) => void): () => void {
    this.subscribers.add(callback);
    
    // 현재 상태 즉시 전달
    callback(this.state);
    
    // 구독 해제 함수 반환
    return () => {
      this.subscribers.delete(callback);
    };
  }

  private notifySubscribers(): void {
    this.subscribers.forEach(callback => {
      try {
        callback(this.state);
      } catch (error) {
        this.log('Subscriber error', error);
      }
    });
  }

  // ============================================
  // 상품 점수
  // ============================================

  getProductScore(productId: string): number {
    // TODO: 실제 상품-감정 매칭 로직 구현
    // 현재는 더미 점수 반환
    const emotionProductMatch: Record<string, string[]> = {
      stressed: ['aromatherapy', 'meditation', 'sleep'],
      anxious: ['calm', 'breathing', 'tea'],
      sad: ['comfort', 'warm', 'cozy'],
      happy: ['energy', 'active', 'bright'],
      neutral: ['all']
    };

    // 기본 점수
    return 0.5 + Math.random() * 0.3;
  }

  getProductScores(productIds: string[]): ProductEmotionScore[] {
    return productIds.map(productId => ({
      productId,
      score: this.getProductScore(productId),
      matchReason: this.getMatchReason(this.state.emotion),
      emotionTags: this.getEmotionTags(this.state.emotion)
    }));
  }

  private getMatchReason(emotion: EmotionType): string {
    const reasons: Record<EmotionType, string> = {
      neutral: '일상에 활력을',
      happy: '기쁨을 더하는',
      excited: '설렘을 유지하는',
      stressed: '스트레스 완화에',
      anxious: '마음을 진정시키는',
      sad: '위로가 되는',
      anger: '평온을 찾아주는',
      fear: '안정감을 주는',
      surprise: '특별한 순간을 위한',
      meditation: '명상에 어울리는',
      fatigue: '피로 회복에',
      depression: '마음을 밝혀주는'
    };
    return reasons[emotion] || '추천';
  }

  private getEmotionTags(emotion: EmotionType): string[] {
    const tags: Record<EmotionType, string[]> = {
      neutral: ['일상', '밸런스'],
      happy: ['기쁨', '에너지'],
      excited: ['설렘', '활력'],
      stressed: ['릴렉스', '진정'],
      anxious: ['안정', '평온'],
      sad: ['위로', '따뜻함'],
      anger: ['쿨다운', '평화'],
      fear: ['안전', '보호'],
      surprise: ['특별', '선물'],
      meditation: ['명상', '집중'],
      fatigue: ['회복', '휴식'],
      depression: ['희망', '빛']
    };
    return tags[emotion] || [];
  }

  // ============================================
  // 테마
  // ============================================

  getTheme(): EmotionTheme {
    return EMOTION_THEMES[this.state.emotion] || EMOTION_THEMES.neutral;
  }

  applyTheme(): void {
    if (typeof document === 'undefined') return;

    const theme = this.getTheme();
    const root = document.documentElement;

    root.style.setProperty('--emotion-bg', theme.background);
    root.style.setProperty('--emotion-accent', theme.accent);
    root.style.setProperty('--emotion-text', theme.text);
    root.style.setProperty('--emotion-secondary', theme.secondary);
    root.style.setProperty('--emotion-gradient', theme.gradient);

    // 감정 클래스 추가
    document.body.classList.remove(
      ...Object.keys(EMOTION_THEMES).map(e => `emotion-${e}`)
    );
    document.body.classList.add(`emotion-${this.state.emotion}`);

    this.log('Theme applied', theme);
  }

  // ============================================
  // 행동 분석
  // ============================================

  getBehaviorMetrics(): BehaviorMetrics {
    return { ...this.behaviorMetrics };
  }

  updateBehaviorMetrics(metrics: Partial<BehaviorMetrics>): void {
    this.behaviorMetrics = { ...this.behaviorMetrics, ...metrics };
  }

  // ============================================
  // 활성화/비활성화
  // ============================================

  enable(): void {
    this.enabled = true;
    this.log('SDK enabled');
  }

  disable(): void {
    this.enabled = false;
    this.log('SDK disabled');
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  // ============================================
  // 텍스트 분석
  // ============================================

  async analyzeText(text: string): Promise<EmotionState> {
    if (!this.enabled) {
      return this.state;
    }

    try {
      // TODO: 실제 API 호출 구현
      // 현재는 더미 분석
      const emotion = this.dummyTextAnalysis(text);
      
      this.updateEmotionFromAnalysis(
        emotion,
        0.8,
        { [emotion]: 0.8, neutral: 0.2 },
        'text'
      );

      return this.state;
    } catch (error) {
      this.log('Text analysis error', error);
      if (this.config.onError) {
        this.config.onError(error as Error);
      }
      return this.state;
    }
  }

  private dummyTextAnalysis(text: string): EmotionType {
    const lower = text.toLowerCase();
    
    if (lower.includes('스트레스') || lower.includes('stress') || lower.includes('힘들')) {
      return 'stressed';
    }
    if (lower.includes('불안') || lower.includes('anxious') || lower.includes('걱정')) {
      return 'anxious';
    }
    if (lower.includes('슬') || lower.includes('sad') || lower.includes('우울')) {
      return 'sad';
    }
    if (lower.includes('행복') || lower.includes('happy') || lower.includes('기쁘')) {
      return 'happy';
    }
    if (lower.includes('피곤') || lower.includes('tired') || lower.includes('지쳐')) {
      return 'fatigue';
    }
    
    return 'neutral';
  }

  // ============================================
  // 유틸리티
  // ============================================

  private log(message: string, data?: unknown): void {
    if (this.config.debug) {
      console.log(`[Healside SDK] ${message}`, data || '');
    }
  }
}

// 싱글톤 인스턴스
export const emotionEngine = new EmotionEngine();

// 전역 접근 (개발용)
if (typeof window !== 'undefined') {
  (window as any).__HEALSIDE_SDK__ = emotionEngine;
}

