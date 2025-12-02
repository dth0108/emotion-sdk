/**
 * Healside Emotion SDK - Emotion Badge UI
 * 
 * 상품 카드에 표시되는 감정 매칭 배지
 * 스타일: Human Made 따뜻함
 */

import React, { useMemo } from 'react';
import type { EmotionType, EmotionBadgeProps } from '../types';
import { EMOTION_THEMES, EMOTION_LABELS_KO } from '../utils/themes';

// 배지 타입별 라벨
const BADGE_LABELS: Record<string, { ko: string; en: string }> = {
  forYou: { ko: '당신을 위한', en: 'FOR YOU' },
  moodLift: { ko: '기분 전환', en: 'MOOD LIFT' },
  calmDown: { ko: '마음 진정', en: 'CALM DOWN' },
  energyUp: { ko: '활력 충전', en: 'ENERGY UP' },
  comfort: { ko: '위로가 되는', en: 'COMFORT' },
  perfect: { ko: '완벽 매칭', en: 'PERFECT' }
};

// 감정별 배지 타입 매핑
const EMOTION_BADGE_TYPE: Record<EmotionType, keyof typeof BADGE_LABELS> = {
  neutral: 'forYou',
  happy: 'energyUp',
  excited: 'energyUp',
  stressed: 'calmDown',
  anxious: 'calmDown',
  sad: 'comfort',
  anger: 'calmDown',
  fear: 'comfort',
  surprise: 'forYou',
  meditation: 'calmDown',
  fatigue: 'energyUp',
  depression: 'moodLift'
};

interface ExtendedEmotionBadgeProps extends EmotionBadgeProps {
  /** 현재 감정 */
  emotion: EmotionType;
  /** 매칭 점수 (0-1) */
  score: number;
  /** 언어 */
  language?: 'ko' | 'en';
  /** 점수 표시 */
  showScore?: boolean;
  /** 애니메이션 */
  animated?: boolean;
}

/**
 * EmotionBadge - 상품 감정 매칭 배지
 */
export const EmotionBadge: React.FC<ExtendedEmotionBadgeProps> = ({
  emotion = 'neutral',
  score = 0.5,
  minScore = 0.6,
  variant = 'filled',
  language = 'ko',
  showScore = false,
  animated = true,
  className = ''
}) => {
  // 최소 점수 미만이면 렌더링 안 함
  if (score < minScore) {
    return null;
  }

  const theme = EMOTION_THEMES[emotion] || EMOTION_THEMES.neutral;
  const badgeType = EMOTION_BADGE_TYPE[emotion];
  const label = BADGE_LABELS[badgeType];
  const emotionLabel = EMOTION_LABELS_KO[emotion];

  // 점수에 따른 배지 강조
  const isPerfect = score >= 0.9;
  const displayLabel = isPerfect ? BADGE_LABELS.perfect : label;

  // 변형별 스타일
  const variantStyles = useMemo(() => {
    switch (variant) {
      case 'filled':
        return {
          background: theme.accent,
          color: '#FFFFFF',
          border: 'none'
        };
      case 'outline':
        return {
          background: 'transparent',
          color: theme.accent,
          border: `1.5px solid ${theme.accent}`
        };
      case 'subtle':
        return {
          background: `${theme.accent}15`,
          color: theme.accent,
          border: 'none'
        };
      default:
        return {
          background: theme.accent,
          color: '#FFFFFF',
          border: 'none'
        };
    }
  }, [variant, theme]);

  return (
    <div
      className={`
        inline-flex flex-col items-start gap-0.5
        px-2.5 py-1.5 rounded-lg
        text-xs font-medium
        ${animated ? 'animate-badge-enter' : ''}
        ${className}
      `}
      style={{
        ...variantStyles,
        fontFamily: "'Pretendard', sans-serif",
        letterSpacing: '0.02em'
      }}
    >
      {/* 메인 라벨 */}
      <span className="uppercase tracking-wider text-[10px] opacity-80">
        {language === 'ko' ? displayLabel.ko : displayLabel.en}
      </span>
      
      {/* 감정 라벨 */}
      <span className="font-semibold">
        {emotionLabel}
      </span>

      {/* 점수 표시 (선택적) */}
      {showScore && (
        <span className="text-[9px] opacity-70 mt-0.5">
          {Math.round(score * 100)}% 매칭
        </span>
      )}

      {/* 애니메이션 스타일 */}
      <style>{`
        @keyframes badge-enter {
          from {
            opacity: 0;
            transform: translateY(-8px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-badge-enter {
          animation: badge-enter 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  );
};

/**
 * EmotionBadgeCompact - 컴팩트 버전 (아이콘만)
 */
export const EmotionBadgeCompact: React.FC<{
  emotion: EmotionType;
  score: number;
  minScore?: number;
  className?: string;
}> = ({ emotion, score, minScore = 0.6, className = '' }) => {
  if (score < minScore) {
    return null;
  }

  const theme = EMOTION_THEMES[emotion] || EMOTION_THEMES.neutral;
  const isPerfect = score >= 0.9;

  return (
    <div
      className={`
        w-6 h-6 rounded-full
        flex items-center justify-center
        text-xs font-bold text-white
        shadow-sm
        ${className}
      `}
      style={{ background: theme.accent }}
      title={`${EMOTION_LABELS_KO[emotion]} ${Math.round(score * 100)}%`}
    >
      {isPerfect ? '★' : '♥'}
    </div>
  );
};

/**
 * EmotionMatchIndicator - 매칭 점수 인디케이터
 */
export const EmotionMatchIndicator: React.FC<{
  score: number;
  emotion: EmotionType;
  showLabel?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}> = ({ score, emotion, showLabel = true, size = 'md', className = '' }) => {
  const theme = EMOTION_THEMES[emotion] || EMOTION_THEMES.neutral;
  const percentage = Math.round(score * 100);

  const sizeClasses = {
    sm: 'h-1 text-[10px]',
    md: 'h-1.5 text-xs'
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-gray-500" style={{ fontSize: size === 'sm' ? '10px' : '11px' }}>
            감정 매칭
          </span>
          <span 
            className="font-medium"
            style={{ color: theme.accent, fontSize: size === 'sm' ? '10px' : '11px' }}
          >
            {percentage}%
          </span>
        </div>
      )}
      <div className={`w-full bg-gray-100 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
            background: theme.accent
          }}
        />
      </div>
    </div>
  );
};

export default EmotionBadge;

