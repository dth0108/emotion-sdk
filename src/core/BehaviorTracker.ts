/**
 * Healside Emotion SDK - Behavior Tracker
 * 
 * 사용자 행동 데이터 수집 및 분석
 * 특허 핵심 기술: 마우스/스크롤/클릭 패턴에서 감정 추론
 */

import type { BehaviorMetrics, BehaviorData, EmotionType } from '../types';

interface BehaviorTrackerConfig {
  /** 마우스 추적 활성화 */
  trackMouse?: boolean;
  /** 스크롤 추적 활성화 */
  trackScroll?: boolean;
  /** 클릭 추적 활성화 */
  trackClicks?: boolean;
  /** 키보드 추적 활성화 */
  trackKeyboard?: boolean;
  /** 샘플링 간격 (ms) */
  sampleInterval?: number;
  /** 히스토리 보존 기간 (ms) */
  historyRetention?: number;
  /** 디버그 모드 */
  debug?: boolean;
}

interface MousePosition {
  x: number;
  y: number;
  timestamp: number;
}

interface ScrollPosition {
  y: number;
  timestamp: number;
}

interface ClickEvent {
  x: number;
  y: number;
  timestamp: number;
  target?: string;
}

interface KeystrokeEvent {
  key: string;
  timestamp: number;
}

// 감정 추론을 위한 임계값
const BEHAVIOR_THRESHOLDS = {
  // 마우스 속도 (px/s)
  mouseSpeed: {
    slow: 100,      // < 100: 평온/피로
    normal: 300,    // 100-300: 중립
    fast: 500,      // 300-500: 활발
    veryFast: 800   // > 800: 스트레스/불안
  },
  // 스크롤 속도 (px/s)
  scrollSpeed: {
    slow: 200,
    normal: 500,
    fast: 1000,
    veryFast: 2000
  },
  // 클릭 빈도 (clicks/min)
  clickFrequency: {
    low: 5,
    normal: 15,
    high: 30,
    veryHigh: 50
  },
  // 망설임 시간 (ms)
  hesitation: {
    none: 500,
    short: 1500,
    medium: 3000,
    long: 5000
  }
};

const DEFAULT_CONFIG: BehaviorTrackerConfig = {
  trackMouse: true,
  trackScroll: true,
  trackClicks: true,
  trackKeyboard: false, // 기본 비활성화 (프라이버시)
  sampleInterval: 100,
  historyRetention: 60000, // 1분
  debug: false
};

/**
 * BehaviorTracker - 행동 데이터 수집기
 */
export class BehaviorTracker {
  private config: BehaviorTrackerConfig;
  private isTracking: boolean;
  
  // 데이터 저장소
  private mouseHistory: MousePosition[];
  private scrollHistory: ScrollPosition[];
  private clickHistory: ClickEvent[];
  private keystrokeHistory: KeystrokeEvent[];
  
  // 계산된 메트릭
  private metrics: BehaviorMetrics;
  
  // 이벤트 리스너 참조 (cleanup용)
  private boundHandlers: {
    mouseMove?: (e: MouseEvent) => void;
    scroll?: () => void;
    click?: (e: MouseEvent) => void;
    keydown?: (e: KeyboardEvent) => void;
  };
  
  // 샘플링 타이머
  private sampleTimer: NodeJS.Timeout | null;
  private cleanupTimer: NodeJS.Timeout | null;

  constructor(config: Partial<BehaviorTrackerConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.isTracking = false;
    
    this.mouseHistory = [];
    this.scrollHistory = [];
    this.clickHistory = [];
    this.keystrokeHistory = [];
    
    this.metrics = {
      mouseSpeed: 0,
      clickFrequency: 0,
      scrollSpeed: 0,
      dwellTime: 0,
      hesitationTime: 0
    };
    
    this.boundHandlers = {};
    this.sampleTimer = null;
    this.cleanupTimer = null;
  }

  // ============================================
  // 추적 제어
  // ============================================

  start(): void {
    if (this.isTracking || typeof window === 'undefined') return;
    
    this.isTracking = true;
    this.setupEventListeners();
    this.startSampling();
    this.startCleanup();
    
    this.log('Behavior tracking started');
  }

  stop(): void {
    if (!this.isTracking) return;
    
    this.isTracking = false;
    this.removeEventListeners();
    this.stopSampling();
    this.stopCleanup();
    
    this.log('Behavior tracking stopped');
  }

  reset(): void {
    this.mouseHistory = [];
    this.scrollHistory = [];
    this.clickHistory = [];
    this.keystrokeHistory = [];
    this.metrics = {
      mouseSpeed: 0,
      clickFrequency: 0,
      scrollSpeed: 0,
      dwellTime: 0,
      hesitationTime: 0
    };
  }

  // ============================================
  // 이벤트 리스너
  // ============================================

  private setupEventListeners(): void {
    if (this.config.trackMouse) {
      this.boundHandlers.mouseMove = this.handleMouseMove.bind(this);
      window.addEventListener('mousemove', this.boundHandlers.mouseMove, { passive: true });
    }
    
    if (this.config.trackScroll) {
      this.boundHandlers.scroll = this.handleScroll.bind(this);
      window.addEventListener('scroll', this.boundHandlers.scroll, { passive: true });
    }
    
    if (this.config.trackClicks) {
      this.boundHandlers.click = this.handleClick.bind(this);
      window.addEventListener('click', this.boundHandlers.click, { passive: true });
    }
    
    if (this.config.trackKeyboard) {
      this.boundHandlers.keydown = this.handleKeydown.bind(this);
      window.addEventListener('keydown', this.boundHandlers.keydown, { passive: true });
    }
  }

  private removeEventListeners(): void {
    if (this.boundHandlers.mouseMove) {
      window.removeEventListener('mousemove', this.boundHandlers.mouseMove);
    }
    if (this.boundHandlers.scroll) {
      window.removeEventListener('scroll', this.boundHandlers.scroll);
    }
    if (this.boundHandlers.click) {
      window.removeEventListener('click', this.boundHandlers.click);
    }
    if (this.boundHandlers.keydown) {
      window.removeEventListener('keydown', this.boundHandlers.keydown);
    }
    this.boundHandlers = {};
  }

  private handleMouseMove(e: MouseEvent): void {
    this.mouseHistory.push({
      x: e.clientX,
      y: e.clientY,
      timestamp: Date.now()
    });
  }

  private handleScroll(): void {
    this.scrollHistory.push({
      y: window.scrollY,
      timestamp: Date.now()
    });
  }

  private handleClick(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    this.clickHistory.push({
      x: e.clientX,
      y: e.clientY,
      timestamp: Date.now(),
      target: target?.tagName || 'unknown'
    });
  }

  private handleKeydown(e: KeyboardEvent): void {
    // 민감한 키 제외 (비밀번호 등)
    const sensitiveFields = ['password', 'credit', 'card', 'cvv'];
    const target = e.target as HTMLInputElement;
    const isSensitive = sensitiveFields.some(field => 
      target?.type?.toLowerCase().includes(field) ||
      target?.name?.toLowerCase().includes(field)
    );
    
    if (!isSensitive) {
      this.keystrokeHistory.push({
        key: e.key.length === 1 ? '*' : e.key, // 실제 키 대신 마스킹
        timestamp: Date.now()
      });
    }
  }

  // ============================================
  // 샘플링 및 정리
  // ============================================

  private startSampling(): void {
    this.sampleTimer = setInterval(() => {
      this.calculateMetrics();
    }, this.config.sampleInterval);
  }

  private stopSampling(): void {
    if (this.sampleTimer) {
      clearInterval(this.sampleTimer);
      this.sampleTimer = null;
    }
  }

  private startCleanup(): void {
    this.cleanupTimer = setInterval(() => {
      this.cleanupOldData();
    }, 10000); // 10초마다 정리
  }

  private stopCleanup(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
      this.cleanupTimer = null;
    }
  }

  private cleanupOldData(): void {
    const cutoff = Date.now() - (this.config.historyRetention || 60000);
    
    this.mouseHistory = this.mouseHistory.filter(p => p.timestamp > cutoff);
    this.scrollHistory = this.scrollHistory.filter(p => p.timestamp > cutoff);
    this.clickHistory = this.clickHistory.filter(p => p.timestamp > cutoff);
    this.keystrokeHistory = this.keystrokeHistory.filter(p => p.timestamp > cutoff);
  }

  // ============================================
  // 메트릭 계산
  // ============================================

  private calculateMetrics(): void {
    const now = Date.now();
    const windowMs = 10000; // 최근 10초
    
    // 마우스 속도 계산
    this.metrics.mouseSpeed = this.calculateMouseSpeed(now, windowMs);
    
    // 스크롤 속도 계산
    this.metrics.scrollSpeed = this.calculateScrollSpeed(now, windowMs);
    
    // 클릭 빈도 계산
    this.metrics.clickFrequency = this.calculateClickFrequency(now, windowMs);
    
    // 체류 시간 (첫 이벤트부터)
    this.metrics.dwellTime = this.calculateDwellTime();
    
    // 망설임 시간 (마지막 클릭 후 경과)
    this.metrics.hesitationTime = this.calculateHesitationTime(now);
  }

  private calculateMouseSpeed(now: number, windowMs: number): number {
    const recent = this.mouseHistory.filter(p => p.timestamp > now - windowMs);
    if (recent.length < 2) return 0;
    
    let totalDistance = 0;
    for (let i = 1; i < recent.length; i++) {
      const dx = recent[i].x - recent[i - 1].x;
      const dy = recent[i].y - recent[i - 1].y;
      totalDistance += Math.sqrt(dx * dx + dy * dy);
    }
    
    const timeSpan = (recent[recent.length - 1].timestamp - recent[0].timestamp) / 1000;
    return timeSpan > 0 ? totalDistance / timeSpan : 0;
  }

  private calculateScrollSpeed(now: number, windowMs: number): number {
    const recent = this.scrollHistory.filter(p => p.timestamp > now - windowMs);
    if (recent.length < 2) return 0;
    
    let totalDistance = 0;
    for (let i = 1; i < recent.length; i++) {
      totalDistance += Math.abs(recent[i].y - recent[i - 1].y);
    }
    
    const timeSpan = (recent[recent.length - 1].timestamp - recent[0].timestamp) / 1000;
    return timeSpan > 0 ? totalDistance / timeSpan : 0;
  }

  private calculateClickFrequency(now: number, windowMs: number): number {
    const recent = this.clickHistory.filter(p => p.timestamp > now - windowMs);
    const minutes = windowMs / 60000;
    return recent.length / minutes;
  }

  private calculateDwellTime(): number {
    const allEvents = [
      ...this.mouseHistory,
      ...this.scrollHistory,
      ...this.clickHistory
    ];
    
    if (allEvents.length === 0) return 0;
    
    const firstEvent = Math.min(...allEvents.map(e => e.timestamp));
    return Date.now() - firstEvent;
  }

  private calculateHesitationTime(now: number): number {
    if (this.clickHistory.length === 0) return 0;
    
    const lastClick = Math.max(...this.clickHistory.map(c => c.timestamp));
    return now - lastClick;
  }

  // ============================================
  // 감정 추론
  // ============================================

  /**
   * 행동 패턴에서 감정 추론
   * 특허 핵심 알고리즘
   */
  inferEmotion(): { emotion: EmotionType; confidence: number; reasons: string[] } {
    const metrics = this.getMetrics();
    const reasons: string[] = [];
    let emotion: EmotionType = 'neutral';
    let confidence = 0.5;

    // 스트레스/불안 신호
    const stressSignals = this.detectStressSignals(metrics, reasons);
    
    // 피로 신호
    const fatigueSignals = this.detectFatigueSignals(metrics, reasons);
    
    // 흥분/행복 신호
    const excitementSignals = this.detectExcitementSignals(metrics, reasons);
    
    // 가장 강한 신호 선택
    const signals = [
      { emotion: 'stressed' as EmotionType, score: stressSignals },
      { emotion: 'fatigue' as EmotionType, score: fatigueSignals },
      { emotion: 'excited' as EmotionType, score: excitementSignals }
    ];
    
    const strongest = signals.reduce((max, s) => s.score > max.score ? s : max, signals[0]);
    
    if (strongest.score > 0.3) {
      emotion = strongest.emotion;
      confidence = Math.min(0.9, 0.5 + strongest.score);
    }

    this.log('Emotion inferred', { emotion, confidence, reasons, metrics });

    return { emotion, confidence, reasons };
  }

  private detectStressSignals(metrics: BehaviorMetrics, reasons: string[]): number {
    let score = 0;
    
    // 빠른 마우스 움직임
    if (metrics.mouseSpeed > BEHAVIOR_THRESHOLDS.mouseSpeed.veryFast) {
      score += 0.3;
      reasons.push('빠른 마우스 움직임 감지');
    } else if (metrics.mouseSpeed > BEHAVIOR_THRESHOLDS.mouseSpeed.fast) {
      score += 0.15;
    }
    
    // 빠른 스크롤
    if (metrics.scrollSpeed > BEHAVIOR_THRESHOLDS.scrollSpeed.veryFast) {
      score += 0.3;
      reasons.push('급한 스크롤 감지');
    } else if (metrics.scrollSpeed > BEHAVIOR_THRESHOLDS.scrollSpeed.fast) {
      score += 0.15;
    }
    
    // 높은 클릭 빈도
    if (metrics.clickFrequency > BEHAVIOR_THRESHOLDS.clickFrequency.veryHigh) {
      score += 0.25;
      reasons.push('빈번한 클릭 감지');
    }
    
    return Math.min(1, score);
  }

  private detectFatigueSignals(metrics: BehaviorMetrics, reasons: string[]): number {
    let score = 0;
    
    // 느린 마우스 움직임
    if (metrics.mouseSpeed < BEHAVIOR_THRESHOLDS.mouseSpeed.slow && metrics.mouseSpeed > 0) {
      score += 0.2;
      reasons.push('느린 움직임 감지');
    }
    
    // 긴 망설임 시간
    if (metrics.hesitationTime > BEHAVIOR_THRESHOLDS.hesitation.long) {
      score += 0.3;
      reasons.push('긴 망설임 시간');
    } else if (metrics.hesitationTime > BEHAVIOR_THRESHOLDS.hesitation.medium) {
      score += 0.15;
    }
    
    // 긴 체류 시간 + 낮은 활동
    if (metrics.dwellTime > 120000 && metrics.clickFrequency < BEHAVIOR_THRESHOLDS.clickFrequency.low) {
      score += 0.2;
      reasons.push('낮은 활동 수준');
    }
    
    return Math.min(1, score);
  }

  private detectExcitementSignals(metrics: BehaviorMetrics, reasons: string[]): number {
    let score = 0;
    
    // 적당히 빠른 움직임 (스트레스보다 낮음)
    if (metrics.mouseSpeed > BEHAVIOR_THRESHOLDS.mouseSpeed.fast && 
        metrics.mouseSpeed < BEHAVIOR_THRESHOLDS.mouseSpeed.veryFast) {
      score += 0.2;
    }
    
    // 적당한 클릭 빈도
    if (metrics.clickFrequency > BEHAVIOR_THRESHOLDS.clickFrequency.normal &&
        metrics.clickFrequency < BEHAVIOR_THRESHOLDS.clickFrequency.veryHigh) {
      score += 0.2;
      reasons.push('활발한 탐색 감지');
    }
    
    // 짧은 망설임 (결정력)
    if (metrics.hesitationTime < BEHAVIOR_THRESHOLDS.hesitation.short &&
        metrics.hesitationTime > 0) {
      score += 0.15;
      reasons.push('빠른 결정');
    }
    
    return Math.min(1, score);
  }

  // ============================================
  // 공개 API
  // ============================================

  getMetrics(): BehaviorMetrics {
    return { ...this.metrics };
  }

  getRawData(): BehaviorData {
    return {
      mouse: [...this.mouseHistory],
      clicks: [...this.clickHistory],
      scroll: [...this.scrollHistory],
      keystrokes: [...this.keystrokeHistory]
    };
  }

  isActive(): boolean {
    return this.isTracking;
  }

  // ============================================
  // 유틸리티
  // ============================================

  private log(message: string, data?: unknown): void {
    if (this.config.debug) {
      console.log(`[BehaviorTracker] ${message}`, data || '');
    }
  }
}

export default BehaviorTracker;

