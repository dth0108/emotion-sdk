/**
 * Healside Emotion SDK - Theme Definitions
 * 
 * 감정별 테마 색상 정의
 * 컨템포러리 럭셔리 스타일 (Supreme, Human Made, The Row)
 */

import type { EmotionTheme, ThemeConfig } from '../types';

/**
 * 감정별 테마 색상
 * 
 * 디자인 원칙:
 * - 미묘하지만 인지 가능한 변화
 * - 고급스러운 톤 다운 컬러
 * - 눈의 피로를 줄이는 부드러운 색상
 */
export const EMOTION_THEMES: ThemeConfig = {
  neutral: {
    background: '#F8FAFB',
    accent: '#14B8A6',
    text: '#1F2937',
    secondary: '#6B7280',
    gradient: 'linear-gradient(135deg, #F8FAFB 0%, #E5E7EB 100%)'
  },
  
  happy: {
    background: '#FFFBEB',
    accent: '#EAB308',
    text: '#713F12',
    secondary: '#A16207',
    gradient: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)'
  },
  
  excited: {
    background: '#FFF7ED',
    accent: '#F97316',
    text: '#7C2D12',
    secondary: '#C2410C',
    gradient: 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)'
  },
  
  stressed: {
    background: '#FEF2F2',
    accent: '#EF4444',
    text: '#7F1D1D',
    secondary: '#B91C1C',
    gradient: 'linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%)'
  },
  
  anxious: {
    background: '#EFF6FF',
    accent: '#3B82F6',
    text: '#1E3A8A',
    secondary: '#1D4ED8',
    gradient: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)'
  },
  
  sad: {
    background: '#EEF2FF',
    accent: '#6366F1',
    text: '#312E81',
    secondary: '#4338CA',
    gradient: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)'
  },
  
  anger: {
    background: '#FFF1F2',
    accent: '#BE123C',
    text: '#881337',
    secondary: '#9F1239',
    gradient: 'linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 100%)'
  },
  
  fear: {
    background: '#FAF5FF',
    accent: '#7C3AED',
    text: '#4C1D95',
    secondary: '#6D28D9',
    gradient: 'linear-gradient(135deg, #FAF5FF 0%, #EDE9FE 100%)'
  },
  
  surprise: {
    background: '#FFFBEB',
    accent: '#F59E0B',
    text: '#78350F',
    secondary: '#B45309',
    gradient: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)'
  },
  
  meditation: {
    background: '#ECFDF5',
    accent: '#10B981',
    text: '#064E3B',
    secondary: '#047857',
    gradient: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)'
  },
  
  fatigue: {
    background: '#F5F5F4',
    accent: '#78716C',
    text: '#292524',
    secondary: '#57534E',
    gradient: 'linear-gradient(135deg, #F5F5F4 0%, #E7E5E4 100%)'
  },
  
  depression: {
    background: '#F9FAFB',
    accent: '#4B5563',
    text: '#111827',
    secondary: '#374151',
    gradient: 'linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%)'
  }
};

/**
 * 감정별 아이콘 이름 (Lucide Icons)
 */
export const EMOTION_ICONS: Record<string, string> = {
  neutral: 'Leaf',
  happy: 'Sun',
  excited: 'Sparkles',
  stressed: 'Zap',
  anxious: 'Wind',
  sad: 'CloudRain',
  anger: 'Flame',
  fear: 'Umbrella',
  surprise: 'Star',
  meditation: 'Flower2',
  fatigue: 'Moon',
  depression: 'CloudFog'
};

/**
 * 감정별 라벨 (한국어)
 */
export const EMOTION_LABELS_KO: Record<string, string> = {
  neutral: '평온',
  happy: '행복',
  excited: '설렘',
  stressed: '스트레스',
  anxious: '불안',
  sad: '슬픔',
  anger: '화남',
  fear: '두려움',
  surprise: '놀람',
  meditation: '명상',
  fatigue: '피로',
  depression: '우울'
};

/**
 * 감정별 라벨 (영어)
 */
export const EMOTION_LABELS_EN: Record<string, string> = {
  neutral: 'Calm',
  happy: 'Happy',
  excited: 'Excited',
  stressed: 'Stressed',
  anxious: 'Anxious',
  sad: 'Sad',
  anger: 'Angry',
  fear: 'Fearful',
  surprise: 'Surprised',
  meditation: 'Meditative',
  fatigue: 'Tired',
  depression: 'Down'
};

/**
 * 테마 가져오기 함수
 */
export function getTheme(emotion: string): EmotionTheme {
  return EMOTION_THEMES[emotion] || EMOTION_THEMES.neutral;
}

/**
 * CSS 변수 문자열 생성
 */
export function getThemeCSSVariables(emotion: string): string {
  const theme = getTheme(emotion);
  return `
    --emotion-bg: ${theme.background};
    --emotion-accent: ${theme.accent};
    --emotion-text: ${theme.text};
    --emotion-secondary: ${theme.secondary};
    --emotion-gradient: ${theme.gradient};
  `;
}

/**
 * 테마 전환 애니메이션 CSS
 */
export const THEME_TRANSITION_CSS = `
  .emotion-transition-enter {
    opacity: 0;
    transform: scale(0.98);
  }
  
  .emotion-transition-enter-active {
    opacity: 1;
    transform: scale(1);
    transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1),
                transform 1.2s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .emotion-transition-exit {
    opacity: 1;
  }
  
  .emotion-transition-exit-active {
    opacity: 0;
    transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

export default EMOTION_THEMES;

