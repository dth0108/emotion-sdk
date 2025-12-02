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
export declare const EMOTION_THEMES: ThemeConfig;
/**
 * 감정별 아이콘 이름 (Lucide Icons)
 */
export declare const EMOTION_ICONS: Record<string, string>;
/**
 * 감정별 라벨 (한국어)
 */
export declare const EMOTION_LABELS_KO: Record<string, string>;
/**
 * 감정별 라벨 (영어)
 */
export declare const EMOTION_LABELS_EN: Record<string, string>;
/**
 * 테마 가져오기 함수
 */
export declare function getTheme(emotion: string): EmotionTheme;
/**
 * CSS 변수 문자열 생성
 */
export declare function getThemeCSSVariables(emotion: string): string;
/**
 * 테마 전환 애니메이션 CSS
 */
export declare const THEME_TRANSITION_CSS = "\n  .emotion-transition-enter {\n    opacity: 0;\n    transform: scale(0.98);\n  }\n  \n  .emotion-transition-enter-active {\n    opacity: 1;\n    transform: scale(1);\n    transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1),\n                transform 1.2s cubic-bezier(0.4, 0, 0.2, 1);\n  }\n  \n  .emotion-transition-exit {\n    opacity: 1;\n  }\n  \n  .emotion-transition-exit-active {\n    opacity: 0;\n    transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);\n  }\n";
export default EMOTION_THEMES;
//# sourceMappingURL=themes.d.ts.map