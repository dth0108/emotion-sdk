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
/**
 * BehaviorTracker - 행동 데이터 수집기
 */
export declare class BehaviorTracker {
    private config;
    private isTracking;
    private mouseHistory;
    private scrollHistory;
    private clickHistory;
    private keystrokeHistory;
    private metrics;
    private boundHandlers;
    private sampleTimer;
    private cleanupTimer;
    constructor(config?: Partial<BehaviorTrackerConfig>);
    start(): void;
    stop(): void;
    reset(): void;
    private setupEventListeners;
    private removeEventListeners;
    private handleMouseMove;
    private handleScroll;
    private handleClick;
    private handleKeydown;
    private startSampling;
    private stopSampling;
    private startCleanup;
    private stopCleanup;
    private cleanupOldData;
    private calculateMetrics;
    private calculateMouseSpeed;
    private calculateScrollSpeed;
    private calculateClickFrequency;
    private calculateDwellTime;
    private calculateHesitationTime;
    /**
     * 행동 패턴에서 감정 추론
     * 특허 핵심 알고리즘
     */
    inferEmotion(): {
        emotion: EmotionType;
        confidence: number;
        reasons: string[];
    };
    private detectStressSignals;
    private detectFatigueSignals;
    private detectExcitementSignals;
    getMetrics(): BehaviorMetrics;
    getRawData(): BehaviorData;
    isActive(): boolean;
    private log;
}
export default BehaviorTracker;
//# sourceMappingURL=BehaviorTracker.d.ts.map