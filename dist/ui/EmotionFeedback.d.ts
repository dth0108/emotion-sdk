/**
 * Healside Emotion SDK - Emotion Feedback UI
 *
 * 실시간 분석 피드백 토스트
 * 사용자에게 행동 분석 과정을 시각화
 */
import React from 'react';
import type { EmotionType } from '../types';
interface FeedbackMessage {
    id: string;
    type: 'behavior' | 'text' | 'fusion' | 'transition';
    icon: string;
    message: string;
    detail?: string;
    emotion?: EmotionType;
    timestamp: number;
}
declare const BEHAVIOR_FEEDBACK: {
    fastMouse: {
        icon: string;
        message: string;
    };
    slowMouse: {
        icon: string;
        message: string;
    };
    fastScroll: {
        icon: string;
        message: string;
    };
    frequentClicks: {
        icon: string;
        message: string;
    };
    hesitation: {
        icon: string;
        message: string;
    };
    longStay: {
        icon: string;
        message: string;
    };
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
/**
 * EmotionFeedback - 실시간 분석 피드백 컴포넌트
 */
export declare const EmotionFeedback: React.FC<EmotionFeedbackProps>;
/**
 * useFeedback - 피드백 훅
 */
export declare function useFeedback(): {
    addFeedback: (type: FeedbackMessage["type"], icon: string, message: string, detail?: string, emotion?: EmotionType) => void;
    feedbackBehavior: (behaviorType: keyof typeof BEHAVIOR_FEEDBACK, emotion?: EmotionType, detail?: string) => void;
    feedbackText: (emotion: EmotionType, keywords: string[]) => void;
    feedbackFusion: (emotion: EmotionType, confidence: number) => void;
    feedbackTransition: (from: EmotionType, to: EmotionType) => void;
};
export default EmotionFeedback;
//# sourceMappingURL=EmotionFeedback.d.ts.map