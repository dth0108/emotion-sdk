/**
 * Healside Emotion SDK - Text Analyzer
 *
 * 텍스트 기반 감정 분석
 * 특허 핵심 기술: 사용자 입력 텍스트에서 감정 추출
 */
import type { EmotionType, EmotionScores } from '../types';
interface TextAnalyzerConfig {
    /** API 엔드포인트 */
    apiEndpoint?: string;
    /** API 키 */
    apiKey?: string;
    /** 로컬 분석 사용 (API 없을 때) */
    useLocalAnalysis?: boolean;
    /** 언어 */
    language?: 'ko' | 'en' | 'auto';
    /** 디버그 모드 */
    debug?: boolean;
}
interface AnalysisResult {
    emotion: EmotionType;
    confidence: number;
    scores: EmotionScores;
    keywords: string[];
    language: string;
}
/**
 * TextAnalyzer - 텍스트 감정 분석기
 */
export declare class TextAnalyzer {
    private config;
    constructor(config?: Partial<TextAnalyzerConfig>);
    /**
     * 텍스트 분석 (API 우선, 실패 시 로컬)
     */
    analyze(text: string): Promise<AnalysisResult>;
    /**
     * API 분석 (다국어 지원 - HuggingFace + GPT-4o-mini)
     */
    private analyzeWithAPI;
    /**
     * 로컬 분석 (키워드 기반)
     */
    private analyzeLocally;
    private preprocessText;
    private detectLanguage;
    private checkIntensityModifiers;
    private calculateConfidence;
    private getDefaultResult;
    /**
     * 실시간 입력 분석 (디바운스 적용)
     */
    createStreamAnalyzer(onResult: (result: AnalysisResult) => void, debounceMs?: number): {
        feed: (text: string) => void;
        cancel: () => void;
    };
    updateConfig(config: Partial<TextAnalyzerConfig>): void;
    private log;
}
export default TextAnalyzer;
//# sourceMappingURL=TextAnalyzer.d.ts.map