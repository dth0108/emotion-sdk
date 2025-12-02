/**
 * Healside Emotion SDK - Emotion Overlay UI
 * 
 * 감정 전환 시 표시되는 오버레이 효과
 * 스타일: Supreme 대담함
 */

import React, { useState, useEffect, useCallback } from 'react';
import type { EmotionType, EmotionOverlayProps } from '../types';
import { EMOTION_THEMES, EMOTION_LABELS_KO } from '../utils/themes';

// 감정 전환 메시지
const TRANSITION_MESSAGES: Record<string, Record<EmotionType, string>> = {
  ko: {
    neutral: '평온한 상태로 돌아왔어요',
    happy: '기분이 좋아지고 있네요',
    excited: '설레는 마음이 느껴져요',
    stressed: '스트레스를 감지했어요',
    anxious: '불안함이 느껴지네요',
    sad: '조금 우울해 보여요',
    anger: '화가 나셨군요',
    fear: '두려움이 느껴져요',
    surprise: '놀라셨군요!',
    meditation: '명상 모드로 전환해요',
    fatigue: '피곤해 보여요',
    depression: '힘든 시간이시군요'
  },
  en: {
    neutral: 'Back to calm',
    happy: 'Feeling happy',
    excited: 'Getting excited',
    stressed: 'Stress detected',
    anxious: 'Feeling anxious',
    sad: 'Feeling down',
    anger: 'Feeling angry',
    fear: 'Feeling fearful',
    surprise: 'Surprised!',
    meditation: 'Meditation mode',
    fatigue: 'Feeling tired',
    depression: 'Going through tough times'
  }
};

// 감정별 추천 액션
const EMOTION_ACTIONS: Record<EmotionType, { icon: string; text: string }> = {
  neutral: { icon: '🍃', text: '좋은 하루 되세요' },
  happy: { icon: '☀️', text: '이 기분 유지해요!' },
  excited: { icon: '✨', text: '설렘을 즐겨보세요' },
  stressed: { icon: '🧘', text: '깊은 호흡을 해볼까요?' },
  anxious: { icon: '💆', text: '잠시 쉬어가세요' },
  sad: { icon: '🤗', text: '따뜻한 차 한잔 어때요?' },
  anger: { icon: '🌊', text: '차분해지는 시간을' },
  fear: { icon: '🛡️', text: '안전한 공간에 있어요' },
  surprise: { icon: '🎁', text: '특별한 발견이네요!' },
  meditation: { icon: '🌸', text: '고요함을 느껴보세요' },
  fatigue: { icon: '🌙', text: '휴식이 필요해요' },
  depression: { icon: '💫', text: '작은 것부터 시작해요' }
};

interface ExtendedEmotionOverlayProps extends EmotionOverlayProps {
  /** 이전 감정 */
  fromEmotion: EmotionType;
  /** 새 감정 */
  toEmotion: EmotionType;
  /** 신뢰도 */
  confidence: number;
  /** 표시 여부 */
  isVisible: boolean;
  /** 닫기 핸들러 */
  onClose: () => void;
  /** 언어 */
  language?: 'ko' | 'en';
  /** 액션 버튼 클릭 */
  onAction?: () => void;
}

/**
 * EmotionOverlay - 감정 전환 오버레이
 */
export const EmotionOverlay: React.FC<ExtendedEmotionOverlayProps> = ({
  fromEmotion,
  toEmotion,
  confidence,
  isVisible,
  onClose,
  duration = 3000,
  language = 'ko',
  onAction,
  className = ''
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [progress, setProgress] = useState(0);

  const toTheme = EMOTION_THEMES[toEmotion] || EMOTION_THEMES.neutral;
  const fromLabel = EMOTION_LABELS_KO[fromEmotion];
  const toLabel = EMOTION_LABELS_KO[toEmotion];
  const message = TRANSITION_MESSAGES[language][toEmotion];
  const action = EMOTION_ACTIONS[toEmotion];

  // 표시 시 애니메이션 시작
  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      setProgress(0);

      // 프로그레스 애니메이션
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(100, prev + 2));
      }, duration / 50);

      // 자동 닫기
      const closeTimer = setTimeout(() => {
        setIsAnimating(false);
        setTimeout(onClose, 300); // 페이드아웃 후 닫기
      }, duration);

      return () => {
        clearInterval(progressInterval);
        clearTimeout(closeTimer);
      };
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible && !isAnimating) {
    return null;
  }

  return (
    <div
      className={`
        fixed inset-0 z-[100]
        flex items-center justify-center
        transition-opacity duration-300
        ${isAnimating ? 'opacity-100' : 'opacity-0'}
        ${className}
      `}
      style={{
        background: `linear-gradient(135deg, ${toTheme.background}F0 0%, ${toTheme.accent}30 100%)`,
        backdropFilter: 'blur(8px)'
      }}
      onClick={onClose}
    >
      {/* 메인 컨텐츠 */}
      <div
        className={`
          text-center px-8 py-10 rounded-3xl
          transform transition-all duration-500
          ${isAnimating ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}
        `}
        style={{
          background: 'rgba(255, 255, 255, 0.9)',
          boxShadow: `0 25px 50px -12px ${toTheme.accent}40`,
          maxWidth: '400px'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* 전환 표시 */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="text-2xl opacity-50">{fromLabel}</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={toTheme.accent} strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          <span 
            className="text-3xl font-bold"
            style={{ color: toTheme.accent }}
          >
            {toLabel}
          </span>
        </div>

        {/* 메시지 */}
        <p 
          className="text-xl font-light mb-6"
          style={{ 
            color: toTheme.text,
            fontFamily: "'Noto Sans KR', sans-serif",
            lineHeight: 1.6
          }}
        >
          {message}
        </p>

        {/* 신뢰도 */}
        <div className="mb-6">
          <div className="text-xs text-gray-400 mb-2">
            분석 신뢰도 {Math.round(confidence * 100)}%
          </div>
          <div className="h-1 bg-gray-100 rounded-full overflow-hidden mx-auto" style={{ maxWidth: '200px' }}>
            <div 
              className="h-full rounded-full transition-all duration-500"
              style={{ 
                width: `${confidence * 100}%`,
                background: toTheme.accent
              }}
            />
          </div>
        </div>

        {/* 추천 액션 */}
        <button
          onClick={() => {
            if (onAction) onAction();
            onClose();
          }}
          className="
            inline-flex items-center gap-2
            px-6 py-3 rounded-full
            text-white font-medium
            transition-all duration-200
            hover:scale-105 hover:shadow-lg
          "
          style={{ background: toTheme.accent }}
        >
          <span className="text-xl">{action.icon}</span>
          <span>{action.text}</span>
        </button>

        {/* 프로그레스 바 */}
        <div className="mt-6 h-0.5 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full transition-all duration-100"
            style={{ 
              width: `${progress}%`,
              background: toTheme.accent,
              opacity: 0.5
            }}
          />
        </div>

        {/* 닫기 힌트 */}
        <p className="mt-4 text-xs text-gray-400">
          화면을 탭하면 닫힙니다
        </p>
      </div>
    </div>
  );
};

/**
 * EmotionTransitionToast - 간단한 토스트 버전
 */
export const EmotionTransitionToast: React.FC<{
  fromEmotion: EmotionType;
  toEmotion: EmotionType;
  isVisible: boolean;
  onClose: () => void;
  position?: 'top' | 'bottom';
}> = ({ fromEmotion, toEmotion, isVisible, onClose, position = 'bottom' }) => {
  const toTheme = EMOTION_THEMES[toEmotion] || EMOTION_THEMES.neutral;
  const toLabel = EMOTION_LABELS_KO[toEmotion];
  const action = EMOTION_ACTIONS[toEmotion];

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className={`
        fixed left-1/2 -translate-x-1/2 z-[100]
        px-6 py-3 rounded-full
        flex items-center gap-3
        shadow-lg
        animate-toast-enter
        ${position === 'top' ? 'top-6' : 'bottom-24'}
        cursor-pointer
      `}
      style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        border: `2px solid ${toTheme.accent}`
      }}
      onClick={onClose}
    >
      <span className="text-xl">{action.icon}</span>
      <span style={{ color: toTheme.text }} className="font-medium">
        {toLabel}
      </span>
      <span className="text-gray-400 text-sm">
        감지됨
      </span>

      <style>{`
        @keyframes toast-enter {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(${position === 'top' ? '-20px' : '20px'});
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
        
        .animate-toast-enter {
          animation: toast-enter 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  );
};

export default EmotionOverlay;

