/**
 * Healside Emotion SDK - React Hook
 *
 * React 컴포넌트에서 감정 SDK를 쉽게 사용하기 위한 훅
 * 이것이 "외장하드 커넥터"의 React 버전
 */
import type { EmotionType, EmotionState, EmotionTheme, ProductEmotionScore, BehaviorMetrics, HealsideSDKConfig } from '../types';
interface UseEmotionOptions {
    /** 자동 구독 (기본: true) */
    autoSubscribe?: boolean;
}
interface UseEmotionReturn {
    emotion: EmotionType;
    confidence: number;
    state: EmotionState;
    theme: EmotionTheme;
    setEmotion: (emotion: EmotionType) => void;
    analyzeText: (text: string) => Promise<EmotionState>;
    getProductScore: (productId: string) => number;
    getProductScores: (productIds: string[]) => ProductEmotionScore[];
    behaviorMetrics: BehaviorMetrics;
    isEnabled: boolean;
    enable: () => void;
    disable: () => void;
}
/**
 * useEmotion - 감정 SDK React 훅
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { emotion, confidence, setEmotion, theme } = useEmotion();
 *
 *   return (
 *     <div style={{ background: theme.background }}>
 *       현재 감정: {emotion} ({Math.round(confidence * 100)}%)
 *     </div>
 *   );
 * }
 * ```
 */
export declare function useEmotion(options?: UseEmotionOptions): UseEmotionReturn;
/**
 * useEmotionInit - SDK 초기화 훅
 *
 * @example
 * ```tsx
 * function App() {
 *   useEmotionInit({
 *     apiKey: 'your-api-key',
 *     trackBehavior: true,
 *     onEmotionChange: (state) => console.log('Emotion:', state.emotion)
 *   });
 *
 *   return <MyApp />;
 * }
 * ```
 */
export declare function useEmotionInit(config: HealsideSDKConfig): void;
/**
 * useEmotionTheme - 테마만 사용하는 경량 훅
 */
export declare function useEmotionTheme(): EmotionTheme;
/**
 * useProductEmotionScore - 특정 상품의 감정 점수 훅
 */
export declare function useProductEmotionScore(productId: string): {
    score: number;
    matchReason: string;
    emotionTags: string[];
};
export default useEmotion;
//# sourceMappingURL=useEmotion.d.ts.map