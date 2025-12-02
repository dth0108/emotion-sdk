/**
 * Healside Emotion SDK - Emotion Feedback UI
 * 
 * 실시간 분석 피드백 토스트
 * 사용자에게 행동 분석 과정을 시각화
 */

import React, { useState, useEffect, useCallback } from 'react';
import type { EmotionType } from '../types';
import { EMOTION_THEMES, EMOTION_LABELS_KO } from '../utils/themes';

// 피드백 메시지 타입
interface FeedbackMessage {
  id: string;
  type: 'behavior' | 'text' | 'fusion' | 'transition';
  icon: string;
  message: string;
  detail?: string;
  emotion?: EmotionType;
  timestamp: number;
}

// 행동 피드백 템플릿
const BEHAVIOR_FEEDBACK = {
  fastMouse: { icon: '🖱️', message: '빠른 마우스 움직임 감지' },
  slowMouse: { icon: '🐌', message: '느린 움직임 감지' },
  fastScroll: { icon: '📜', message: '급한 스크롤 감지' },
  frequentClicks: { icon: '👆', message: '빈번한 클릭 감지' },
  hesitation: { icon: '🤔', message: '망설임 감지' },
  longStay: { icon: '⏱️', message: '오래 머무르고 있어요' }
};

interface EmotionFeedbackProps {
  /** 피드백 표시 여부 */
  enabled?: boolean;
  /** 최대 표시 개수 */
  maxMessages?: number;
  /** 메시지 표시 시간 (ms) */
  displayDuration?: number;
  /** 위치 */
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  /** 새 사용자 여부 (교육 모드) */
  isNewUser?: boolean;
  /** 커스텀 클래스 */
  className?: string;
}

interface EmotionFeedbackHandle {
  addFeedback: (feedback: Omit<FeedbackMessage, 'id' | 'timestamp'>) => void;
  clearAll: () => void;
}

/**
 * EmotionFeedback - 실시간 분석 피드백 컴포넌트
 */
export const EmotionFeedback: React.FC<EmotionFeedbackProps> = ({
  enabled = true,
  maxMessages = 3,
  displayDuration = 3000,
  position = 'bottom-left',
  isNewUser = false,
  className = ''
}) => {
  const [messages, setMessages] = useState<FeedbackMessage[]>([]);
  const [showCount, setShowCount] = useState(0);

  // 새 사용자는 최대 3번만 표시
  const shouldShow = enabled && (isNewUser ? showCount < 3 : true);

  // 메시지 추가
  const addMessage = useCallback((feedback: Omit<FeedbackMessage, 'id' | 'timestamp'>) => {
    if (!shouldShow) return;

    const newMessage: FeedbackMessage = {
      ...feedback,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now()
    };

    setMessages(prev => {
      const updated = [newMessage, ...prev].slice(0, maxMessages);
      return updated;
    });

    if (isNewUser) {
      setShowCount(prev => prev + 1);
    }

    // 자동 제거
    setTimeout(() => {
      setMessages(prev => prev.filter(m => m.id !== newMessage.id));
    }, displayDuration);
  }, [shouldShow, maxMessages, displayDuration, isNewUser]);

  // 위치 클래스
  const positionClasses = {
    'bottom-left': 'bottom-24 left-6',
    'bottom-right': 'bottom-24 right-6',
    'top-left': 'top-24 left-6',
    'top-right': 'top-24 right-6'
  };

  // 외부에서 접근 가능하도록 전역에 등록
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__HEALSIDE_FEEDBACK__ = {
        addFeedback: addMessage,
        clearAll: () => setMessages([])
      };
    }

    return () => {
      if (typeof window !== 'undefined') {
        delete (window as any).__HEALSIDE_FEEDBACK__;
      }
    };
  }, [addMessage]);

  if (!enabled || messages.length === 0) {
    return null;
  }

  return (
    <div 
      className={`fixed ${positionClasses[position]} z-40 flex flex-col gap-2 ${className}`}
      style={{ maxWidth: '280px' }}
    >
      {messages.map((msg, index) => (
        <FeedbackToast
          key={msg.id}
          message={msg}
          index={index}
          onClose={() => setMessages(prev => prev.filter(m => m.id !== msg.id))}
        />
      ))}
    </div>
  );
};

/**
 * FeedbackToast - 개별 피드백 토스트
 */
const FeedbackToast: React.FC<{
  message: FeedbackMessage;
  index: number;
  onClose: () => void;
}> = ({ message, index, onClose }) => {
  const theme = message.emotion 
    ? EMOTION_THEMES[message.emotion] 
    : EMOTION_THEMES.neutral;

  return (
    <div
      className="
        flex items-start gap-3
        px-4 py-3 rounded-xl
        shadow-lg
        animate-feedback-enter
        cursor-pointer
        transition-all duration-200
        hover:scale-[1.02]
      "
      style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderLeft: `3px solid ${theme.accent}`,
        animationDelay: `${index * 50}ms`
      }}
      onClick={onClose}
    >
      {/* 아이콘 */}
      <span className="text-xl flex-shrink-0">{message.icon}</span>

      {/* 내용 */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 leading-tight">
          {message.message}
        </p>
        {message.detail && (
          <p className="text-xs text-gray-500 mt-0.5">
            {message.detail}
          </p>
        )}
        {message.emotion && (
          <span 
            className="inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium"
            style={{ 
              background: `${theme.accent}20`,
              color: theme.accent
            }}
          >
            → {EMOTION_LABELS_KO[message.emotion]} 신호
          </span>
        )}
      </div>

      {/* 닫기 버튼 */}
      <button 
        className="text-gray-400 hover:text-gray-600 text-sm"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        ✕
      </button>

      <style>{`
        @keyframes feedback-enter {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-feedback-enter {
          animation: feedback-enter 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>
    </div>
  );
};

/**
 * useFeedback - 피드백 훅
 */
export function useFeedback() {
  const addFeedback = useCallback((
    type: FeedbackMessage['type'],
    icon: string,
    message: string,
    detail?: string,
    emotion?: EmotionType
  ) => {
    if (typeof window !== 'undefined' && (window as any).__HEALSIDE_FEEDBACK__) {
      (window as any).__HEALSIDE_FEEDBACK__.addFeedback({
        type,
        icon,
        message,
        detail,
        emotion
      });
    }
  }, []);

  // 편의 메서드들
  const feedbackBehavior = useCallback((
    behaviorType: keyof typeof BEHAVIOR_FEEDBACK,
    emotion?: EmotionType,
    detail?: string
  ) => {
    const template = BEHAVIOR_FEEDBACK[behaviorType];
    if (template) {
      addFeedback('behavior', template.icon, template.message, detail, emotion);
    }
  }, [addFeedback]);

  const feedbackText = useCallback((
    emotion: EmotionType,
    keywords: string[]
  ) => {
    addFeedback(
      'text',
      '💬',
      '텍스트에서 감정 감지',
      `키워드: ${keywords.slice(0, 3).join(', ')}`,
      emotion
    );
  }, [addFeedback]);

  const feedbackFusion = useCallback((
    emotion: EmotionType,
    confidence: number
  ) => {
    addFeedback(
      'fusion',
      '🔀',
      '멀티모달 분석 완료',
      `신뢰도 ${Math.round(confidence * 100)}%`,
      emotion
    );
  }, [addFeedback]);

  const feedbackTransition = useCallback((
    from: EmotionType,
    to: EmotionType
  ) => {
    addFeedback(
      'transition',
      '🔄',
      `감정 전환: ${EMOTION_LABELS_KO[from]} → ${EMOTION_LABELS_KO[to]}`,
      undefined,
      to
    );
  }, [addFeedback]);

  return {
    addFeedback,
    feedbackBehavior,
    feedbackText,
    feedbackFusion,
    feedbackTransition
  };
}

export default EmotionFeedback;

