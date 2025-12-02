/**
 * Healside Emotion SDK - Emotion Overlay UI
 *
 * 감정 전환 시 표시되는 오버레이 효과
 * 스타일: Supreme 대담함
 */
import React from 'react';
import type { EmotionType, EmotionOverlayProps } from '../types';
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
export declare const EmotionOverlay: React.FC<ExtendedEmotionOverlayProps>;
/**
 * EmotionTransitionToast - 간단한 토스트 버전
 */
export declare const EmotionTransitionToast: React.FC<{
    fromEmotion: EmotionType;
    toEmotion: EmotionType;
    isVisible: boolean;
    onClose: () => void;
    position?: 'top' | 'bottom';
}>;
export default EmotionOverlay;
//# sourceMappingURL=EmotionOverlay.d.ts.map