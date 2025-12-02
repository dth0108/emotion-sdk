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

// 한국어 감정 키워드 사전
const KOREAN_EMOTION_KEYWORDS: Record<EmotionType, string[]> = {
  neutral: ['괜찮', '보통', '그냥', '일반', '평범'],
  happy: ['행복', '기쁘', '좋아', '즐거', '신나', '웃', '사랑', '감사', '최고', '완벽'],
  excited: ['설레', '흥분', '기대', '두근', '신기', '놀라', '대박', '와우', '짜릿'],
  stressed: ['스트레스', '힘들', '지치', '짜증', '답답', '미치', '죽겠', '너무'],
  anxious: ['불안', '걱정', '초조', '긴장', '무서', '두려', '떨리', '조마조마'],
  sad: ['슬프', '우울', '눈물', '아프', '외로', '쓸쓸', '그리', '허전', '서글'],
  anger: ['화나', '짜증', '열받', '빡치', '미워', '싫어', '분노', '억울'],
  fear: ['무서', '두려', '공포', '겁나', '떨리', '불안'],
  surprise: ['놀라', '깜짝', '헐', '대박', '믿기지', '어머', '세상에'],
  meditation: ['명상', '평화', '고요', '차분', '집중', '호흡', '마음'],
  fatigue: ['피곤', '졸리', '지치', '힘들', '녹초', '기진맥진', '쉬고싶'],
  depression: ['우울', '무기력', '의욕', '암담', '절망', '포기', '힘없']
};

// 영어 감정 키워드 사전
const ENGLISH_EMOTION_KEYWORDS: Record<EmotionType, string[]> = {
  neutral: ['okay', 'fine', 'normal', 'regular', 'average'],
  happy: ['happy', 'joy', 'glad', 'love', 'great', 'wonderful', 'amazing', 'thank'],
  excited: ['excited', 'thrilled', 'eager', 'can\'t wait', 'wow', 'awesome'],
  stressed: ['stress', 'pressure', 'overwhelm', 'too much', 'can\'t handle'],
  anxious: ['anxious', 'worry', 'nervous', 'scared', 'afraid', 'uncertain'],
  sad: ['sad', 'cry', 'tear', 'miss', 'lonely', 'heartbreak', 'depressed'],
  anger: ['angry', 'mad', 'furious', 'hate', 'annoyed', 'frustrated'],
  fear: ['fear', 'scared', 'terrified', 'panic', 'horror'],
  surprise: ['surprise', 'shock', 'unexpected', 'omg', 'wow', 'unbelievable'],
  meditation: ['peace', 'calm', 'meditate', 'mindful', 'serene', 'tranquil'],
  fatigue: ['tired', 'exhausted', 'sleepy', 'drained', 'worn out'],
  depression: ['depressed', 'hopeless', 'empty', 'numb', 'give up']
};

// 감정 강도 수식어
const INTENSITY_MODIFIERS = {
  increase: ['매우', '너무', '정말', '진짜', '완전', '엄청', 'very', 'really', 'so', 'extremely'],
  decrease: ['조금', '약간', '살짝', 'a bit', 'slightly', 'somewhat']
};

const DEFAULT_CONFIG: TextAnalyzerConfig = {
  apiEndpoint: '/api/emotion/analyze-text',
  useLocalAnalysis: true,
  language: 'auto',
  debug: false
};

/**
 * TextAnalyzer - 텍스트 감정 분석기
 */
export class TextAnalyzer {
  private config: TextAnalyzerConfig;

  constructor(config: Partial<TextAnalyzerConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  // ============================================
  // 분석 메서드
  // ============================================

  /**
   * 텍스트 분석 (API 우선, 실패 시 로컬)
   */
  async analyze(text: string): Promise<AnalysisResult> {
    if (!text || text.trim().length === 0) {
      return this.getDefaultResult();
    }

    const cleanText = this.preprocessText(text);
    const language = this.detectLanguage(cleanText);

    // API 분석 시도 (apiEndpoint만 있으면 시도)
    if (this.config.apiEndpoint) {
      try {
        const apiResult = await this.analyzeWithAPI(cleanText, language);
        this.log('API analysis result', apiResult);
        return apiResult;
      } catch (error) {
        this.log('API analysis failed, falling back to local', error);
      }
    }

    // 로컬 분석
    if (this.config.useLocalAnalysis) {
      const localResult = this.analyzeLocally(cleanText, language);
      this.log('Local analysis result', localResult);
      return localResult;
    }

    return this.getDefaultResult();
  }

  /**
   * API 분석 (다국어 지원 - HuggingFace + GPT-4o-mini)
   */
  private async analyzeWithAPI(text: string, language: string): Promise<AnalysisResult> {
    const response = await fetch(this.config.apiEndpoint!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(this.config.apiKey ? { 'Authorization': `Bearer ${this.config.apiKey}` } : {})
      },
      body: JSON.stringify({ 
        text, 
        mode: 'smart',  // Smart 라우팅 (HF → GPT 자동 선택)
        language: language === 'auto' ? undefined : language
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    
    // 새 API 응답 형식: { success: true, result: { dominantEmotion, confidence, scores, keywords, language, source } }
    if (!data.success) {
      throw new Error(data.error || 'API analysis failed');
    }
    
    const result = data.result;
    
    return {
      emotion: result.dominantEmotion || 'neutral',
      confidence: result.confidence || 0.5,
      scores: result.scores || { [result.dominantEmotion]: result.confidence },
      keywords: result.keywords || [],
      language: result.language || language
    };
  }

  /**
   * 로컬 분석 (키워드 기반)
   */
  private analyzeLocally(text: string, language: string): AnalysisResult {
    const keywords = language === 'ko' ? KOREAN_EMOTION_KEYWORDS : ENGLISH_EMOTION_KEYWORDS;
    const scores: EmotionScores = {};
    const matchedKeywords: string[] = [];
    
    const lowerText = text.toLowerCase();
    
    // 각 감정별 점수 계산
    for (const [emotion, emotionKeywords] of Object.entries(keywords)) {
      let score = 0;
      
      for (const keyword of emotionKeywords) {
        if (lowerText.includes(keyword.toLowerCase())) {
          score += 0.2;
          matchedKeywords.push(keyword);
        }
      }
      
      // 강도 수식어 체크
      const intensityMultiplier = this.checkIntensityModifiers(lowerText);
      score *= intensityMultiplier;
      
      scores[emotion] = Math.min(1, score);
    }

    // 가장 높은 점수의 감정 선택
    let maxEmotion: EmotionType = 'neutral';
    let maxScore = 0;
    
    for (const [emotion, score] of Object.entries(scores)) {
      if (score > maxScore) {
        maxScore = score;
        maxEmotion = emotion as EmotionType;
      }
    }

    // 신뢰도 계산
    const confidence = this.calculateConfidence(maxScore, matchedKeywords.length, text.length);

    return {
      emotion: maxEmotion,
      confidence,
      scores,
      keywords: matchedKeywords,
      language
    };
  }

  // ============================================
  // 유틸리티 메서드
  // ============================================

  private preprocessText(text: string): string {
    return text
      .trim()
      .replace(/\s+/g, ' ')  // 다중 공백 제거
      .replace(/[^\w\sㄱ-ㅎㅏ-ㅣ가-힣.,!?]/g, '');  // 특수문자 제거 (한글 유지)
  }

  private detectLanguage(text: string): string {
    if (this.config.language !== 'auto') {
      return this.config.language!;
    }
    
    // 한글 포함 여부로 판단
    const koreanPattern = /[ㄱ-ㅎㅏ-ㅣ가-힣]/;
    return koreanPattern.test(text) ? 'ko' : 'en';
  }

  private checkIntensityModifiers(text: string): number {
    let multiplier = 1;
    
    for (const modifier of INTENSITY_MODIFIERS.increase) {
      if (text.includes(modifier)) {
        multiplier *= 1.3;
      }
    }
    
    for (const modifier of INTENSITY_MODIFIERS.decrease) {
      if (text.includes(modifier)) {
        multiplier *= 0.7;
      }
    }
    
    return multiplier;
  }

  private calculateConfidence(score: number, keywordCount: number, textLength: number): number {
    // 기본 신뢰도
    let confidence = 0.3;
    
    // 점수 기반
    confidence += score * 0.3;
    
    // 키워드 수 기반
    confidence += Math.min(0.2, keywordCount * 0.05);
    
    // 텍스트 길이 기반 (너무 짧으면 낮음)
    if (textLength < 10) {
      confidence *= 0.7;
    } else if (textLength > 50) {
      confidence += 0.1;
    }
    
    return Math.min(0.95, Math.max(0.3, confidence));
  }

  private getDefaultResult(): AnalysisResult {
    return {
      emotion: 'neutral',
      confidence: 0.5,
      scores: { neutral: 1 },
      keywords: [],
      language: 'unknown'
    };
  }

  // ============================================
  // 스트리밍 분석 (실시간 입력용)
  // ============================================

  /**
   * 실시간 입력 분석 (디바운스 적용)
   */
  createStreamAnalyzer(onResult: (result: AnalysisResult) => void, debounceMs: number = 500) {
    let timeoutId: NodeJS.Timeout | null = null;
    let lastText = '';
    
    return {
      feed: (text: string) => {
        if (text === lastText) return;
        lastText = text;
        
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        
        timeoutId = setTimeout(async () => {
          const result = await this.analyze(text);
          onResult(result);
        }, debounceMs);
      },
      
      cancel: () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
      }
    };
  }

  // ============================================
  // 설정
  // ============================================

  updateConfig(config: Partial<TextAnalyzerConfig>): void {
    this.config = { ...this.config, ...config };
  }

  private log(message: string, data?: unknown): void {
    if (this.config.debug) {
      console.log(`[TextAnalyzer] ${message}`, data || '');
    }
  }
}

export default TextAnalyzer;

