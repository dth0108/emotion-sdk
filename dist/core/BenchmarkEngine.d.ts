/**
 * Healside Emotion SDK - Benchmark Engine
 *
 * 실시간 정확도 검증 시스템
 * 투자자/고객에게 정확도를 투명하게 증명
 */
import type { EmotionType } from '../types';
interface TestCase {
    text: string;
    expected: EmotionType;
    language: 'ko' | 'en';
    category: 'simple' | 'negation' | 'cultural' | 'metaphor';
}
interface TestResult {
    text: string;
    predicted: EmotionType;
    expected: EmotionType;
    correct: boolean;
    confidence: number;
    language: string;
    category: string;
    reasoning?: string;
}
interface ValidationReport {
    accuracy: string;
    totalTests: number;
    passed: number;
    failed: TestResult[];
    byLanguage: {
        ko: {
            accuracy: string;
            passed: number;
            total: number;
        };
        en: {
            accuracy: string;
            passed: number;
            total: number;
        };
    };
    byCategory: Record<string, {
        accuracy: string;
        passed: number;
        total: number;
    }>;
    timestamp: string;
}
/**
 * BenchmarkEngine - 실시간 정확도 검증
 */
export declare class BenchmarkEngine {
    private testCases;
    private realTimeResults;
    constructor(customTestCases?: TestCase[]);
    /**
     * 정확도 검증 실행
     */
    validateAccuracy(analyzeFunction: (text: string) => Promise<any>): Promise<ValidationReport>;
    /**
     * 실시간 분석 결과 기록
     */
    recordAnalysis(text: string, predicted: EmotionType, expected: EmotionType, confidence: number): void;
    /**
     * 실시간 정확도 조회
     */
    getRealTimeAccuracy(): {
        accuracy: string;
        totalAnalyzed: number;
    };
    /**
     * 테스트 케이스 추가
     */
    addTestCase(testCase: TestCase): void;
    /**
     * 모든 테스트 케이스 조회
     */
    getTestCases(): TestCase[];
}
export default BenchmarkEngine;
//# sourceMappingURL=BenchmarkEngine.d.ts.map