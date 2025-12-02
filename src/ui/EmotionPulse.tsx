/**
 * Healside Emotion SDK - Emotion Pulse UI
 * 
 * 감정 상태를 시각적으로 표시하는 펄스 인디케이터
 * 스타일: The Row 미니멀
 */

import React, { useState, useEffect, useCallback } from 'react';
import type { EmotionType, EmotionPulseProps } from '../types';
import { EMOTION_THEMES, EMOTION_LABELS_KO, EMOTION_ICONS } from '../utils/themes';

// 감정별 이모지 (Lucide 아이콘 대신 이모지 사용)
const EMOTION_EMOJI: Record<EmotionType, string> = {
  neutral: '🍃',
  happy: '☀️',
  excited: '✨',
  stressed: '⚡',
  anxious: '💨',
  sad: '🌧️',
  anger: '🔥',
  fear: '☂️',
  surprise: '⭐',
  meditation: '🌸',
  fatigue: '🌙',
  depression: '🌫️'
};

interface ExtendedEmotionPulseProps extends EmotionPulseProps {
  /** 현재 감정 */
  emotion: EmotionType;
  /** 신뢰도 (0-1) */
  confidence: number;
  /** 소스 */
  source?: 'auto' | 'manual' | 'text' | 'behavior' | 'multimodal';
  /** 확장 패널 열기 핸들러 */
  onExpand?: () => void;
  /** 감정 수동 선택 핸들러 */
  onSelectEmotion?: (emotion: EmotionType) => void;
  /** 애니메이션 활성화 */
  animated?: boolean;
}

/**
 * EmotionPulse - 감정 펄스 인디케이터
 */
export const EmotionPulse: React.FC<ExtendedEmotionPulseProps> = ({
  emotion = 'neutral',
  confidence = 0.5,
  source = 'auto',
  size = 'md',
  position = 'bottom-right',
  showConfidence = true,
  onClick,
  onExpand,
  onSelectEmotion,
  className = '',
  animated = true
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const [prevEmotion, setPrevEmotion] = useState(emotion);
  const [showTooltip, setShowTooltip] = useState(false);

  // 감정 변경 시 펄스 애니메이션
  useEffect(() => {
    if (emotion !== prevEmotion) {
      setIsPulsing(true);
      const timer = setTimeout(() => setIsPulsing(false), 1000);
      setPrevEmotion(emotion);
      return () => clearTimeout(timer);
    }
  }, [emotion, prevEmotion]);

  const theme = EMOTION_THEMES[emotion] || EMOTION_THEMES.neutral;
  const label = EMOTION_LABELS_KO[emotion] || '평온';
  const emoji = EMOTION_EMOJI[emotion] || '🍃';

  // 크기 설정
  const sizeClasses = {
    sm: 'w-12 h-12 text-lg',
    md: 'w-16 h-16 text-2xl',
    lg: 'w-20 h-20 text-3xl'
  };

  // 위치 설정
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6'
  };

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
    } else {
      setIsExpanded(!isExpanded);
      if (!isExpanded && onExpand) {
        onExpand();
      }
    }
  }, [onClick, isExpanded, onExpand]);

  const handleEmotionSelect = useCallback((selectedEmotion: EmotionType) => {
    if (onSelectEmotion) {
      onSelectEmotion(selectedEmotion);
    }
    setIsExpanded(false);
  }, [onSelectEmotion]);

  return (
    <div 
      className={`fixed ${positionClasses[position]} z-50 ${className}`}
      style={{ fontFamily: "'Pretendard', sans-serif" }}
    >
      {/* 확장 패널 */}
      {isExpanded && (
        <div 
          className="absolute bottom-full right-0 mb-3 p-4 rounded-2xl shadow-xl"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 0, 0, 0.05)',
            minWidth: '200px'
          }}
        >
          {/* 현재 상태 */}
          <div className="mb-4 pb-3 border-b border-gray-100">
            <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">
              현재 감정
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{emoji}</span>
              <span className="text-lg font-medium" style={{ color: theme.text }}>
                {label}
              </span>
            </div>
            {showConfidence && (
              <div className="mt-2">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>신뢰도</span>
                  <span>{Math.round(confidence * 100)}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${confidence * 100}%`,
                      background: theme.accent
                    }}
                  />
                </div>
              </div>
            )}
            <div className="mt-2 text-xs text-gray-400">
              {source === 'manual' ? '수동 선택' : 
               source === 'text' ? '텍스트 분석' :
               source === 'behavior' ? '행동 분석' :
               source === 'multimodal' ? '멀티모달 분석' : '자동 분석'}
            </div>
          </div>

          {/* 감정 선택 그리드 */}
          {onSelectEmotion && (
            <div>
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">
                직접 선택
              </div>
              <div className="grid grid-cols-4 gap-2">
                {(Object.keys(EMOTION_EMOJI) as EmotionType[]).map((em) => (
                  <button
                    key={em}
                    onClick={() => handleEmotionSelect(em)}
                    className={`
                      p-2 rounded-lg text-xl transition-all duration-200
                      hover:scale-110 hover:shadow-md
                      ${emotion === em ? 'ring-2 ring-offset-1' : ''}
                    `}
                    style={{
                      background: emotion === em ? EMOTION_THEMES[em].background : 'transparent',
                      ringColor: EMOTION_THEMES[em].accent
                    }}
                    title={EMOTION_LABELS_KO[em]}
                  >
                    {EMOTION_EMOJI[em]}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 호버 툴팁 */}
      {showTooltip && !isExpanded && (
        <div 
          className="absolute bottom-full right-0 mb-2 px-3 py-2 rounded-lg shadow-lg whitespace-nowrap"
          style={{
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(10px)',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">{emoji}</span>
            <div className="text-white">
              <div className="text-sm font-medium">{label}</div>
              <div className="text-xs opacity-75">
                {Math.round(confidence * 100)}% 신뢰도
              </div>
            </div>
          </div>
          {/* 화살표 */}
          <div 
            className="absolute top-full right-4 w-0 h-0"
            style={{
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: '6px solid rgba(0, 0, 0, 0.85)'
            }}
          />
        </div>
      )}

      {/* 메인 펄스 버튼 */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`
          ${sizeClasses[size]}
          rounded-full shadow-lg
          flex items-center justify-center
          transition-all duration-500 ease-out
          hover:scale-105 hover:shadow-xl
          focus:outline-none focus:ring-2 focus:ring-offset-2
          ${animated && isPulsing ? 'animate-pulse-emotion' : ''}
        `}
        style={{
          background: theme.gradient,
          border: `2px solid ${theme.accent}`,
          boxShadow: `0 4px 20px ${theme.accent}40`,
          focusRingColor: theme.accent
        }}
        aria-label={`현재 감정: ${label}`}
      >
        <span className={isPulsing ? 'animate-bounce' : ''}>
          {emoji}
        </span>
      </button>

      {/* 신뢰도 링 (외부) */}
      {showConfidence && !isExpanded && (
        <svg
          className="absolute inset-0 -m-1 pointer-events-none"
          style={{
            width: size === 'sm' ? 56 : size === 'md' ? 72 : 88,
            height: size === 'sm' ? 56 : size === 'md' ? 72 : 88
          }}
        >
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            fill="none"
            stroke={theme.accent}
            strokeWidth="2"
            strokeDasharray={`${confidence * 283} 283`}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            className="transition-all duration-1000"
            style={{ opacity: 0.6 }}
          />
        </svg>
      )}

      {/* 커스텀 애니메이션 스타일 */}
      <style>{`
        @keyframes pulse-emotion {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 4px 20px ${theme.accent}40;
          }
          50% {
            transform: scale(1.08);
            box-shadow: 0 8px 30px ${theme.accent}60;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-pulse-emotion {
          animation: pulse-emotion 1s cubic-bezier(0.4, 0, 0.6, 1);
        }
      `}</style>
    </div>
  );
};

export default EmotionPulse;

