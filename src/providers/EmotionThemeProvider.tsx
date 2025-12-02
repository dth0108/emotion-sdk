/**
 * Healside Emotion SDK - Independent Theme Provider
 * 
 * SDK 자체 Theme Provider 구현
 * Healside 쇼핑몰의 EmotionThemeContext 의존성 제거
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { EmotionType, EmotionTheme } from '../types';
import { EMOTION_THEMES } from '../utils/themes';

interface EmotionThemeContextValue {
  currentEmotion: EmotionType;
  currentTheme: EmotionTheme;
  setEmotion: (emotion: EmotionType) => void;
  themeColor: string;
}

const EmotionThemeContext = createContext<EmotionThemeContextValue | null>(null);

/**
 * EmotionThemeProvider - SDK 자체 Theme Provider
 */
export const EmotionThemeProvider: React.FC<{ 
  children: React.ReactNode;
  initialEmotion?: EmotionType;
  enableCSSVariables?: boolean;
}> = ({ children, initialEmotion = 'neutral', enableCSSVariables = true }) => {
  const [currentEmotion, setCurrentEmotion] = useState<EmotionType>(initialEmotion);
  const currentTheme = EMOTION_THEMES[currentEmotion] || EMOTION_THEMES.neutral;

  // CSS 변수 업데이트 (선택적)
  useEffect(() => {
    if (enableCSSVariables && typeof document !== 'undefined') {
      const root = document.documentElement;
      root.style.setProperty('--emotion-accent', currentTheme.accent);
      root.style.setProperty('--emotion-background', currentTheme.background);
      root.style.setProperty('--emotion-text', currentTheme.text);
      root.style.setProperty('--emotion-secondary', currentTheme.secondary);
      root.style.setProperty('--emotion-gradient', currentTheme.gradient);
    }
  }, [currentTheme, enableCSSVariables]);

  const value: EmotionThemeContextValue = {
    currentEmotion,
    currentTheme,
    setEmotion: setCurrentEmotion,
    themeColor: `hsl(${currentTheme.accent})`
  };

  return (
    <EmotionThemeContext.Provider value={value}>
      {children}
    </EmotionThemeContext.Provider>
  );
};

/**
 * useEmotionTheme - SDK 자체 Theme Hook
 */
export const useEmotionTheme = () => {
  const context = useContext(EmotionThemeContext);
  if (!context) {
    throw new Error('useEmotionTheme must be used within EmotionThemeProvider');
  }
  return context;
};

