/**
 * Healside Emotion SDK - Multimodal Fusion
 *
 * 멀티모달 감정 융합 엔진
 * 특허 핵심 기술: 행동 데이터 + 텍스트 분석 결합
 */
import type { EmotionType, EmotionScores } from '../types';
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
/**
 * MultimodalFusion - 멀티모달 감정 융합 엔진
 */
export declare class MultimodalFusion {
    private config;
    private behaviorTracker;
    private textAnalyzer;
    private hysteresis;
    private currentResult;
    private subscribers;
    private autoAnalyzeTimer;
    private lastTextInput;
    private manualOverride;
    constructor(config?: Partial<FusionConfig>);
    start(): void;
    stop(): void;
    reset(): void;
    private startAutoAnalyze;
    private stopAutoAnalyze;
    /**
     * 통합 분석 수행
     */
    analyze(textInput?: string): Promise<FusionResult>;
    /**
     * 행동 + 텍스트 결과 융합
     */
    private fuseResults;
    setManualEmotion(emotion: EmotionType): void;
    clearManualEmotion(): void;
    private createManualResult;
    feedText(text: string): void;
    subscribe(callback: FusionSubscriber): () => void;
    private notifySubscribers;
    getResult(): FusionResult;
    getEmotion(): EmotionType;
    getConfidence(): number;
    getBehaviorMetrics(): import("../types").BehaviorMetrics;
    updateConfig(config: Partial<FusionConfig>): void;
    private getDefaultResult;
    private log;
}
export default MultimodalFusion;
//# sourceMappingURL=MultimodalFusion.d.ts.map