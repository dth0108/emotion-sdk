/**
 * Healside Emotion SDK - React Hook
 * 
 * React 컴포넌트에서 감정 SDK를 쉽게 사용하기 위한 훅
 * 이것이 "외장하드 커넥터"의 React 버전
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { emotionEngine } from '../core/EmotionEngine';
import type {
  EmotionType,
  EmotionState,
  EmotionTheme,
  ProductEmotionScore,
  BehaviorMetrics,
  HealsideSDKConfig
} from '../types';

interface UseEmotionOptions {
  /** 자동 구독 (기본: true) */
  autoSubscribe?: boolean;
}

interface UseEmotionReturn {
  // 상태
  emotion: EmotionType;
  confidence: number;
  state: EmotionState;
  theme: EmotionTheme;
  
  // 액션
  setEmotion: (emotion: EmotionType) => void;
  analyzeText: (text: string) => Promise<EmotionState>;
  
  // 상품 점수
  getProductScore: (productId: string) => number;
  getProductScores: (productIds: string[]) => ProductEmotionScore[];
  
  // 행동 분석
  behaviorMetrics: BehaviorMetrics;
  
  // 유틸리티
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
export function useEmotion(options: UseEmotionOptions = {}): UseEmotionReturn {
  const { autoSubscribe = true } = options;
  
  // 상태
  const [state, setState] = useState<EmotionState>(emotionEngine.getState());
  const [behaviorMetrics, setBehaviorMetrics] = useState<BehaviorMetrics>(
    emotionEngine.getBehaviorMetrics()
  );

  // 구독
  useEffect(() => {
    if (!autoSubscribe) return;

    const unsubscribe = emotionEngine.subscribe((newState) => {
      setState(newState);
    });

    // 행동 메트릭 주기적 업데이트
    const metricsInterval = setInterval(() => {
      setBehaviorMetrics(emotionEngine.getBehaviorMetrics());
    }, 1000);

    return () => {
      unsubscribe();
      clearInterval(metricsInterval);
    };
  }, [autoSubscribe]);

  // 액션
  const setEmotion = useCallback((emotion: EmotionType) => {
    emotionEngine.setEmotion(emotion);
  }, []);

  const analyzeText = useCallback(async (text: string) => {
    return emotionEngine.analyzeText(text);
  }, []);

  // 상품 점수
  const getProductScore = useCallback((productId: string) => {
    return emotionEngine.getProductScore(productId);
  }, []);

  const getProductScores = useCallback((productIds: string[]) => {
    return emotionEngine.getProductScores(productIds);
  }, []);

  // 유틸리티
  const enable = useCallback(() => {
    emotionEngine.enable();
  }, []);

  const disable = useCallback(() => {
    emotionEngine.disable();
  }, []);

  // 파생 값
  const theme = useMemo(() => emotionEngine.getTheme(), [state.emotion]);
  const isEnabled = emotionEngine.isEnabled();

  return {
    // 상태
    emotion: state.emotion,
    confidence: state.confidence,
    state,
    theme,
    
    // 액션
    setEmotion,
    analyzeText,
    
    // 상품 점수
    getProductScore,
    getProductScores,
    
    // 행동 분석
    behaviorMetrics,
    
    // 유틸리티
    isEnabled,
    enable,
    disable
  };
}

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
export function useEmotionInit(config: HealsideSDKConfig): void {
  useEffect(() => {
    emotionEngine.init(config);
    
    return () => {
      emotionEngine.destroy();
    };
  }, [config.apiKey]); // apiKey 변경 시에만 재초기화
}

/**
 * useEmotionTheme - 테마만 사용하는 경량 훅
 */
export function useEmotionTheme(): EmotionTheme {
  const [theme, setTheme] = useState<EmotionTheme>(emotionEngine.getTheme());

  useEffect(() => {
    const unsubscribe = emotionEngine.subscribe((state) => {
      setTheme(emotionEngine.getTheme());
    });

    return unsubscribe;
  }, []);

  return theme;
}

/**
 * useProductEmotionScore - 특정 상품의 감정 점수 훅
 */
export function useProductEmotionScore(productId: string): {
  score: number;
  matchReason: string;
  emotionTags: string[];
} {
  const [score, setScore] = useState<ProductEmotionScore>({
    productId,
    score: 0.5,
    matchReason: '',
    emotionTags: []
  });

  useEffect(() => {
    const unsubscribe = emotionEngine.subscribe(() => {
      const scores = emotionEngine.getProductScores([productId]);
      if (scores.length > 0) {
        setScore(scores[0]);
      }
    });

    // 초기값 설정
    const initialScores = emotionEngine.getProductScores([productId]);
    if (initialScores.length > 0) {
      setScore(initialScores[0]);
    }

    return unsubscribe;
  }, [productId]);

  return {
    score: score.score,
    matchReason: score.matchReason,
    emotionTags: score.emotionTags
  };
}

export default useEmotion;

