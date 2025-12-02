/**
 * Healside Emotion SDK - Emotion Badge UI
 *
 * 상품 카드에 표시되는 감정 매칭 배지
 * 스타일: Human Made 따뜻함
 */
import React from 'react';
import type { EmotionType, EmotionBadgeProps } from '../types';
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
export declare const EmotionBadge: React.FC<ExtendedEmotionBadgeProps>;
/**
 * EmotionBadgeCompact - 컴팩트 버전 (아이콘만)
 */
export declare const EmotionBadgeCompact: React.FC<{
    emotion: EmotionType;
    score: number;
    minScore?: number;
    className?: string;
}>;
/**
 * EmotionMatchIndicator - 매칭 점수 인디케이터
 */
export declare const EmotionMatchIndicator: React.FC<{
    score: number;
    emotion: EmotionType;
    showLabel?: boolean;
    size?: 'sm' | 'md';
    className?: string;
}>;
export default EmotionBadge;
//# sourceMappingURL=EmotionBadge.d.ts.map