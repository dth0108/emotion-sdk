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
    ko: { accuracy: string; passed: number; total: number };
    en: { accuracy: string; passed: number; total: number };
  };
  byCategory: Record<string, { accuracy: string; passed: number; total: number }>;
  timestamp: string;
}

/**
 * 사전 정의된 테스트 케이스 (한글/영어)
 */
const PREDEFINED_TEST_CASES: TestCase[] = [
  // 한국어 - 단순
  { text: '오늘 정말 행복해!', expected: 'happy', language: 'ko', category: 'simple' },
  { text: '너무 슬퍼', expected: 'sad', language: 'ko', category: 'simple' },
  { text: '화나', expected: 'angry', language: 'ko', category: 'simple' },
  
  // 한국어 - 부정문
  { text: '나는 우울하지 않아', expected: 'happy', language: 'ko', category: 'negation' },
  { text: '슬프지 않아요', expected: 'happy', language: 'ko', category: 'negation' },
  
  // 한국어 - 문화적 맥락
  { text: '괜찮아요', expected: 'sad', language: 'ko', category: 'cultural' },
  { text: '화이팅!', expected: 'excited', language: 'ko', category: 'cultural' },
  { text: '제발 도와주세요', expected: 'anxious', language: 'ko', category: 'cultural' },
  
  // 영어 - 단순
  { text: "I'm so happy!", expected: 'happy', language: 'en', category: 'simple' },
  { text: "I'm sad", expected: 'sad', language: 'en', category: 'simple' },
  { text: "I'm angry", expected: 'angry', language: 'en', category: 'simple' },
  
  // 영어 - 부정문
  { text: "I'm not sad", expected: 'happy', language: 'en', category: 'negation' },
  { text: "I'm not unhappy", expected: 'happy', language: 'en', category: 'negation' },
  
  // 영어 - 은유
  { text: "This is killing me", expected: 'stressed', language: 'en', category: 'metaphor' },
  { text: "I'm literally dying", expected: 'excited', language: 'en', category: 'metaphor' }
];

/**
 * BenchmarkEngine - 실시간 정확도 검증
 */
export class BenchmarkEngine {
  private testCases: TestCase[];
  private realTimeResults: TestResult[] = [];

  constructor(customTestCases: TestCase[] = []) {
    this.testCases = [...PREDEFINED_TEST_CASES, ...customTestCases];
  }

  /**
   * 정확도 검증 실행
   */
  async validateAccuracy(analyzeFunction: (text: string) => Promise<any>): Promise<ValidationReport> {
    console.log('[Benchmark] Starting validation...');
    const startTime = Date.now();

    const results: TestResult[] = await Promise.all(
      this.testCases.map(async (tc) => {
        try {
          const result = await analyzeFunction(tc.text);
          const predicted = result.emotion || result.dominantEmotion || 'neutral';
          
          return {
            text: tc.text,
            predicted,
            expected: tc.expected,
            correct: predicted === tc.expected,
            confidence: result.confidence || 0,
            language: tc.language,
            category: tc.category,
            reasoning: result.reasoning
          };
        } catch (error) {
          console.error(`[Benchmark] Error analyzing "${tc.text}":`, error);
          return {
            text: tc.text,
            predicted: 'neutral' as EmotionType,
            expected: tc.expected,
            correct: false,
            confidence: 0,
            language: tc.language,
            category: tc.category
          };
        }
      })
    );

    const duration = Date.now() - startTime;

    // 전체 정확도
    const passed = results.filter(r => r.correct).length;
    const accuracy = (passed / results.length * 100).toFixed(1);

    // 언어별 정확도
    const koResults = results.filter(r => r.language === 'ko');
    const enResults = results.filter(r => r.language === 'en');

    const byLanguage = {
      ko: {
        accuracy: (koResults.filter(r => r.correct).length / koResults.length * 100).toFixed(1) + '%',
        passed: koResults.filter(r => r.correct).length,
        total: koResults.length
      },
      en: {
        accuracy: (enResults.filter(r => r.correct).length / enResults.length * 100).toFixed(1) + '%',
        passed: enResults.filter(r => r.correct).length,
        total: enResults.length
      }
    };

    // 카테고리별 정확도
    const categories = ['simple', 'negation', 'cultural', 'metaphor'];
    const byCategory: Record<string, any> = {};
    
    categories.forEach(cat => {
      const catResults = results.filter(r => r.category === cat);
      if (catResults.length > 0) {
        byCategory[cat] = {
          accuracy: (catResults.filter(r => r.correct).length / catResults.length * 100).toFixed(1) + '%',
          passed: catResults.filter(r => r.correct).length,
          total: catResults.length
        };
      }
    });

    const report: ValidationReport = {
      accuracy: accuracy + '%',
      totalTests: results.length,
      passed,
      failed: results.filter(r => !r.correct),
      byLanguage,
      byCategory,
      timestamp: new Date().toISOString()
    };

    console.log(`[Benchmark] Completed in ${duration}ms`);
    console.log(`[Benchmark] Overall Accuracy: ${accuracy}%`);
    console.log(`[Benchmark] Korean: ${byLanguage.ko.accuracy}, English: ${byLanguage.en.accuracy}`);

    return report;
  }

  /**
   * 실시간 분석 결과 기록
   */
  recordAnalysis(text: string, predicted: EmotionType, expected: EmotionType, confidence: number): void {
    this.realTimeResults.push({
      text,
      predicted,
      expected,
      correct: predicted === expected,
      confidence,
      language: 'unknown',
      category: 'realtime'
    });

    // 최근 100개만 유지
    if (this.realTimeResults.length > 100) {
      this.realTimeResults.shift();
    }
  }

  /**
   * 실시간 정확도 조회
   */
  getRealTimeAccuracy(): { accuracy: string; totalAnalyzed: number } {
    if (this.realTimeResults.length === 0) {
      return { accuracy: 'N/A', totalAnalyzed: 0 };
    }

    const correct = this.realTimeResults.filter(r => r.correct).length;
    const accuracy = (correct / this.realTimeResults.length * 100).toFixed(1);

    return {
      accuracy: accuracy + '%',
      totalAnalyzed: this.realTimeResults.length
    };
  }

  /**
   * 테스트 케이스 추가
   */
  addTestCase(testCase: TestCase): void {
    this.testCases.push(testCase);
  }

  /**
   * 모든 테스트 케이스 조회
   */
  getTestCases(): TestCase[] {
    return [...this.testCases];
  }
}

export default BenchmarkEngine;

