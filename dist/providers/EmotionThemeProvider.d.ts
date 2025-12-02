/**
 * Healside Emotion SDK - Independent Theme Provider
 *
 * SDK 자체 Theme Provider 구현
 * Healside 쇼핑몰의 EmotionThemeContext 의존성 제거
 */
import React from 'react';
import type { EmotionType, EmotionTheme } from '../types';
interface EmotionThemeContextValue {
    currentEmotion: EmotionType;
    currentTheme: EmotionTheme;
    setEmotion: (emotion: EmotionType) => void;
    themeColor: string;
}
/**
 * EmotionThemeProvider - SDK 자체 Theme Provider
 */
export declare const EmotionThemeProvider: React.FC<{
    children: React.ReactNode;
    initialEmotion?: EmotionType;
    enableCSSVariables?: boolean;
}>;
/**
 * useEmotionTheme - SDK 자체 Theme Hook
 */
export declare const useEmotionTheme: () => EmotionThemeContextValue;
export {};
//# sourceMappingURL=EmotionThemeProvider.d.ts.map