/**
 * Healside Emotion SDK - Type Definitions
 *
 * 외부에 노출되는 모든 타입을 정의
 * 이 인터페이스가 "외장하드 커넥터" 역할
 */
export type EmotionType = 'neutral' | 'happy' | 'excited' | 'stressed' | 'anxious' | 'sad' | 'anger' | 'fear' | 'surprise' | 'meditation' | 'fatigue' | 'depression';
export interface EmotionScores {
    [emotion: string]: number;
}
export interface EmotionState {
    /** 현재 감정 */
    emotion: EmotionType;
    /** 신뢰도 (0-1) */
    confidence: number;
    /** 각 감정별 점수 */
    scores: EmotionScores;
    /** 감정 소스 */
    source: 'auto' | 'manual' | 'text' | 'behavior' | 'multimodal';
    /** 타임스탬프 */
    timestamp: string;
}
export interface BehaviorMetrics {
    /** 마우스 이동 속도 (px/s) */
    mouseSpeed: number;
    /** 클릭 빈도 (clicks/min) */
    clickFrequency: number;
    /** 스크롤 속도 (px/s) */
    scrollSpeed: number;
    /** 체류 시간 (ms) */
    dwellTime: number;
    /** 망설임 시간 (ms) */
    hesitationTime: number;
}
export interface BehaviorData {
    mouse: Array<{
        x: number;
        y: number;
        timestamp: number;
    }>;
    clicks: Array<{
        x: number;
        y: number;
        timestamp: number;
    }>;
    scroll: Array<{
        y: number;
        timestamp: number;
    }>;
    keystrokes: Array<{
        key: string;
        timestamp: number;
    }>;
}
export interface EmotionTheme {
    /** 배경색 */
    background: string;
    /** 강조색 */
    accent: string;
    /** 텍스트색 */
    text: string;
    /** 보조색 */
    secondary: string;
    /** 그라데이션 */
    gradient: string;
}
export interface ThemeConfig {
    [emotion: string]: EmotionTheme;
}
export interface ProductEmotionScore {
    productId: string;
    score: number;
    matchReason: string;
    emotionTags: string[];
}
export interface HealsideSDKConfig {
    /** API 키 */
    apiKey: string;
    /** 행동 추적 활성화 */
    trackBehavior?: boolean;
    /** 텍스트 분석 활성화 */
    trackText?: boolean;
    /** 테마 자동 적용 */
    autoTheme?: boolean;
    /** UI 컴포넌트 활성화 */
    enableUI?: boolean;
    /** 디버그 모드 */
    debug?: boolean;
    /** 콜백: 감정 변경 시 */
    onEmotionChange?: (state: EmotionState) => void;
    /** 콜백: 에러 발생 시 */
    onError?: (error: Error) => void;
    /** 히스테리시스 설정 */
    hysteresis?: {
        /** 연속 판단 횟수 */
        consecutiveCount?: number;
        /** 최소 전환 간격 (ms) */
        minInterval?: number;
        /** 최소 신뢰도 */
        minConfidence?: number;
    };
    /** 가중치 설정 */
    weights?: {
        behavior?: number;
        text?: number;
    };
}
export interface HealsideEmotionSDK {
    init(config: HealsideSDKConfig): void;
    destroy(): void;
    getEmotion(): EmotionType;
    getConfidence(): number;
    getState(): EmotionState;
    setEmotion(emotion: EmotionType): void;
    subscribe(callback: (state: EmotionState) => void): () => void;
    getProductScore(productId: string): number;
    getProductScores(productIds: string[]): ProductEmotionScore[];
    getTheme(): EmotionTheme;
    applyTheme(): void;
    getBehaviorMetrics(): BehaviorMetrics;
    enable(): void;
    disable(): void;
    isEnabled(): boolean;
    analyzeText(text: string): Promise<EmotionState>;
}
export interface EmotionChangeEvent {
    type: 'emotion_change';
    previousEmotion: EmotionType;
    newEmotion: EmotionType;
    confidence: number;
    source: EmotionState['source'];
    timestamp: string;
}
export interface EmotionTransitionEvent {
    type: 'emotion_transition';
    from: EmotionType;
    to: EmotionType;
    duration: number;
    blocked: boolean;
    reason?: string;
}
export interface EmotionPulseProps {
    /** 크기 */
    size?: 'sm' | 'md' | 'lg';
    /** 위치 */
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    /** 신뢰도 표시 */
    showConfidence?: boolean;
    /** 클릭 핸들러 */
    onClick?: () => void;
    /** 커스텀 클래스 */
    className?: string;
}
export interface EmotionBadgeProps {
    /** 상품 ID */
    productId: string;
    /** 최소 점수 (이 이상일 때만 표시) */
    minScore?: number;
    /** 스타일 변형 */
    variant?: 'filled' | 'outline' | 'subtle';
    /** 커스텀 클래스 */
    className?: string;
}
export interface EmotionOverlayProps {
    /** 전환 시간 (ms) */
    duration?: number;
    /** 표시 조건 */
    showOnChange?: boolean;
    /** 커스텀 클래스 */
    className?: string;
}
//# sourceMappingURL=index.d.ts.map