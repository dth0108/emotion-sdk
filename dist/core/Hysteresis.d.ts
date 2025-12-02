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
/**
 * Hysteresis - 감정 전환 안정화 엔진
 */
export declare class Hysteresis {
    private config;
    private emotionCounts;
    private currentStableEmotion;
    private lastSwitchTimestamp;
    private transitionHistory;
    constructor(config?: Partial<HysteresisConfig>);
    /**
     * 감정 판단 처리 및 전환 여부 결정 (Enhanced)
     */
    processEmotionJudgment(emotion: string, confidence: number, timestamp?: number): ProcessResult;
    /**
     * 필요한 확인 횟수 계산
     * - 반대 감정: 5회 (기본 3 + 추가 2)
     * - 유사 감정: 2회
     * - 일반: 3회
     */
    private getRequiredCount;
    /**
     * 반대 감정 체크
     */
    private isOppositeEmotion;
    /**
     * 유사 감정 체크
     */
    private isSimilarEmotion;
    private updateEmotionCount;
    private cleanupOldCounts;
    private recordTransition;
    private createResult;
    /** 현재 안정 감정 조회 */
    getStableEmotion(): string;
    /** 전환 히스토리 조회 */
    getTransitionHistory(): TransitionRecord[];
    /** 설정 업데이트 */
    updateConfig(config: Partial<HysteresisConfig>): void;
    /** 상태 리셋 */
    reset(): void;
    /** 안정성 지수 계산 (0-1) */
    getStabilityIndex(): number;
}
export default Hysteresis;
//# sourceMappingURL=Hysteresis.d.ts.map