/**
 * Healside Emotion SDK - Core Engine
 *
 * 감정 분석의 핵심 엔진
 * 모든 감정 관련 로직의 중앙 허브
 */
import type { EmotionType, EmotionState, EmotionScores, HealsideSDKConfig, BehaviorMetrics, EmotionTheme, ProductEmotionScore, HealsideEmotionSDK } from '../types';
/**
 * EmotionEngine - SDK의 핵심 클래스
 */
export declare class EmotionEngine implements HealsideEmotionSDK {
    private config;
    private state;
    private subscribers;
    private hysteresis;
    private enabled;
    private behaviorMetrics;
    constructor();
    init(config: HealsideSDKConfig): void;
    destroy(): void;
    getEmotion(): EmotionType;
    getConfidence(): number;
    getState(): EmotionState;
    setEmotion(emotion: EmotionType): void;
    /**
     * 내부용: 감정 상태 업데이트 (히스테리시스 적용)
     */
    updateEmotionFromAnalysis(emotion: EmotionType, confidence: number, scores: EmotionScores, source: EmotionState['source']): void;
    private updateState;
    subscribe(callback: (state: EmotionState) => void): () => void;
    private notifySubscribers;
    getProductScore(productId: string): number;
    getProductScores(productIds: string[]): ProductEmotionScore[];
    private getMatchReason;
    private getEmotionTags;
    getTheme(): EmotionTheme;
    applyTheme(): void;
    getBehaviorMetrics(): BehaviorMetrics;
    updateBehaviorMetrics(metrics: Partial<BehaviorMetrics>): void;
    enable(): void;
    disable(): void;
    isEnabled(): boolean;
    analyzeText(text: string): Promise<EmotionState>;
    private dummyTextAnalysis;
    private log;
}
export declare const emotionEngine: EmotionEngine;
//# sourceMappingURL=EmotionEngine.d.ts.map