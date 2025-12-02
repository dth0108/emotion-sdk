/**
 * Healside Emotion SDK
 * 
 * 커머스 특화 감정 인텔리전스 SDK
 * "당신의 쇼핑몰에 감정을 입히세요"
 * 
 * @packageDocumentation
 */

// ============================================
// Core
// ============================================
export { EmotionEngine, emotionEngine } from './core/EmotionEngine';
export { Hysteresis } from './core/Hysteresis';
export { BehaviorTracker } from './core/BehaviorTracker';
export { TextAnalyzer } from './core/TextAnalyzer';
export { MultimodalFusion } from './core/MultimodalFusion';
export { BenchmarkEngine } from './core/BenchmarkEngine';

// ============================================
// Hooks
// ============================================
export {
  useEmotion,
  useEmotionInit,
  useEmotionTheme,
  useProductEmotionScore
} from './hooks/useEmotion';

// ============================================
// UI Components
// ============================================
export { EmotionPulse } from './ui/EmotionPulse';
export { 
  EmotionBadge, 
  EmotionBadgeCompact, 
  EmotionMatchIndicator 
} from './ui/EmotionBadge';
export { 
  EmotionOverlay, 
  EmotionTransitionToast 
} from './ui/EmotionOverlay';
export { 
  EmotionFeedback, 
  useFeedback 
} from './ui/EmotionFeedback';

// ============================================
// Demo
// ============================================
export { EmotionDemo } from './demo/EmotionDemo';

// ============================================
// Utils
// ============================================
export {
  EMOTION_THEMES,
  EMOTION_ICONS,
  EMOTION_LABELS_KO,
  EMOTION_LABELS_EN,
  getTheme,
  getThemeCSSVariables,
  THEME_TRANSITION_CSS
} from './utils/themes';

// ============================================
// Types
// ============================================
export type {
  EmotionType,
  EmotionState,
  EmotionScores,
  EmotionTheme,
  ThemeConfig,
  BehaviorMetrics,
  BehaviorData,
  ProductEmotionScore,
  HealsideSDKConfig,
  HealsideEmotionSDK,
  EmotionChangeEvent,
  EmotionTransitionEvent,
  EmotionPulseProps,
  EmotionBadgeProps,
  EmotionOverlayProps
} from './types';

// ============================================
// Default Export
// ============================================
export default emotionEngine;

// ============================================
// Version & Info
// ============================================
export const SDK_VERSION = '1.0.0';
export const SDK_NAME = '@healside/emotion-sdk';
export const SDK_DESCRIPTION = '커머스 특화 감정 인텔리전스 SDK';

/**
 * SDK 정보 출력
 */
export function printSDKInfo(): void {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   🧠 Healside Emotion SDK v${SDK_VERSION}                          ║
║   "당신의 쇼핑몰에 감정을 입히세요"                          ║
║                                                              ║
║   Features:                                                  ║
║   ├── 행동 추적 (마우스/스크롤/클릭)                         ║
║   ├── 텍스트 감정 분석                                       ║
║   ├── 멀티모달 융합                                          ║
║   ├── 히스테리시스 안정화                                    ║
║   └── 체감 UI 컴포넌트                                       ║
║                                                              ║
║   © 2024 Healside. Patent Pending.                           ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
  `);
}

