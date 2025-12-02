/**
 * Healside Emotion SDK
 *
 * 커머스 특화 감정 인텔리전스 SDK
 * "당신의 쇼핑몰에 감정을 입히세요"
 *
 * @packageDocumentation
 */
export { EmotionEngine, emotionEngine } from './core/EmotionEngine';
export { Hysteresis } from './core/Hysteresis';
export { BehaviorTracker } from './core/BehaviorTracker';
export { TextAnalyzer } from './core/TextAnalyzer';
export { MultimodalFusion } from './core/MultimodalFusion';
export { BenchmarkEngine } from './core/BenchmarkEngine';
export { useEmotion, useEmotionInit, useEmotionTheme, useProductEmotionScore } from './hooks/useEmotion';
export { EmotionPulse } from './ui/EmotionPulse';
export { EmotionBadge, EmotionBadgeCompact, EmotionMatchIndicator } from './ui/EmotionBadge';
export { EmotionOverlay, EmotionTransitionToast } from './ui/EmotionOverlay';
export { EmotionFeedback, useFeedback } from './ui/EmotionFeedback';
export { EmotionDemo } from './demo/EmotionDemo';
export { EMOTION_THEMES, EMOTION_ICONS, EMOTION_LABELS_KO, EMOTION_LABELS_EN, getTheme, getThemeCSSVariables, THEME_TRANSITION_CSS } from './utils/themes';
export type { EmotionType, EmotionState, EmotionScores, EmotionTheme, ThemeConfig, BehaviorMetrics, BehaviorData, ProductEmotionScore, HealsideSDKConfig, HealsideEmotionSDK, EmotionChangeEvent, EmotionTransitionEvent, EmotionPulseProps, EmotionBadgeProps, EmotionOverlayProps } from './types';
export default emotionEngine;
export declare const SDK_VERSION = "1.0.0";
export declare const SDK_NAME = "@healside/emotion-sdk";
export declare const SDK_DESCRIPTION = "\uCEE4\uBA38\uC2A4 \uD2B9\uD654 \uAC10\uC815 \uC778\uD154\uB9AC\uC804\uC2A4 SDK";
/**
 * SDK 정보 출력
 */
export declare function printSDKInfo(): void;
//# sourceMappingURL=index.d.ts.map