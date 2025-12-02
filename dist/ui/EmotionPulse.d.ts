/**
 * Healside Emotion SDK - Emotion Pulse UI
 *
 * 감정 상태를 시각적으로 표시하는 펄스 인디케이터
 * 스타일: The Row 미니멀
 */
import React from 'react';
import type { EmotionType, EmotionPulseProps } from '../types';
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
export declare const EmotionPulse: React.FC<ExtendedEmotionPulseProps>;
export default EmotionPulse;
//# sourceMappingURL=EmotionPulse.d.ts.map