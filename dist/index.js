'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var require$$0 = require('react');

/**
 * Healside Emotion SDK - Theme Definitions
 *
 * 감정별 테마 색상 정의
 * 컨템포러리 럭셔리 스타일 (Supreme, Human Made, The Row)
 */
/**
 * 감정별 테마 색상
 *
 * 디자인 원칙:
 * - 미묘하지만 인지 가능한 변화
 * - 고급스러운 톤 다운 컬러
 * - 눈의 피로를 줄이는 부드러운 색상
 */
const EMOTION_THEMES = {
    neutral: {
        background: '#F8FAFB',
        accent: '#14B8A6',
        text: '#1F2937',
        secondary: '#6B7280',
        gradient: 'linear-gradient(135deg, #F8FAFB 0%, #E5E7EB 100%)'
    },
    happy: {
        background: '#FFFBEB',
        accent: '#EAB308',
        text: '#713F12',
        secondary: '#A16207',
        gradient: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)'
    },
    excited: {
        background: '#FFF7ED',
        accent: '#F97316',
        text: '#7C2D12',
        secondary: '#C2410C',
        gradient: 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)'
    },
    stressed: {
        background: '#FEF2F2',
        accent: '#EF4444',
        text: '#7F1D1D',
        secondary: '#B91C1C',
        gradient: 'linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%)'
    },
    anxious: {
        background: '#EFF6FF',
        accent: '#3B82F6',
        text: '#1E3A8A',
        secondary: '#1D4ED8',
        gradient: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)'
    },
    sad: {
        background: '#EEF2FF',
        accent: '#6366F1',
        text: '#312E81',
        secondary: '#4338CA',
        gradient: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)'
    },
    anger: {
        background: '#FFF1F2',
        accent: '#BE123C',
        text: '#881337',
        secondary: '#9F1239',
        gradient: 'linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 100%)'
    },
    fear: {
        background: '#FAF5FF',
        accent: '#7C3AED',
        text: '#4C1D95',
        secondary: '#6D28D9',
        gradient: 'linear-gradient(135deg, #FAF5FF 0%, #EDE9FE 100%)'
    },
    surprise: {
        background: '#FFFBEB',
        accent: '#F59E0B',
        text: '#78350F',
        secondary: '#B45309',
        gradient: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)'
    },
    meditation: {
        background: '#ECFDF5',
        accent: '#10B981',
        text: '#064E3B',
        secondary: '#047857',
        gradient: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)'
    },
    fatigue: {
        background: '#F5F5F4',
        accent: '#78716C',
        text: '#292524',
        secondary: '#57534E',
        gradient: 'linear-gradient(135deg, #F5F5F4 0%, #E7E5E4 100%)'
    },
    depression: {
        background: '#F9FAFB',
        accent: '#4B5563',
        text: '#111827',
        secondary: '#374151',
        gradient: 'linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%)'
    }
};
/**
 * 감정별 아이콘 이름 (Lucide Icons)
 */
const EMOTION_ICONS = {
    neutral: 'Leaf',
    happy: 'Sun',
    excited: 'Sparkles',
    stressed: 'Zap',
    anxious: 'Wind',
    sad: 'CloudRain',
    anger: 'Flame',
    fear: 'Umbrella',
    surprise: 'Star',
    meditation: 'Flower2',
    fatigue: 'Moon',
    depression: 'CloudFog'
};
/**
 * 감정별 라벨 (한국어)
 */
const EMOTION_LABELS_KO = {
    neutral: '평온',
    happy: '행복',
    excited: '설렘',
    stressed: '스트레스',
    anxious: '불안',
    sad: '슬픔',
    anger: '화남',
    fear: '두려움',
    surprise: '놀람',
    meditation: '명상',
    fatigue: '피로',
    depression: '우울'
};
/**
 * 감정별 라벨 (영어)
 */
const EMOTION_LABELS_EN = {
    neutral: 'Calm',
    happy: 'Happy',
    excited: 'Excited',
    stressed: 'Stressed',
    anxious: 'Anxious',
    sad: 'Sad',
    anger: 'Angry',
    fear: 'Fearful',
    surprise: 'Surprised',
    meditation: 'Meditative',
    fatigue: 'Tired',
    depression: 'Down'
};
/**
 * 테마 가져오기 함수
 */
function getTheme(emotion) {
    return EMOTION_THEMES[emotion] || EMOTION_THEMES.neutral;
}
/**
 * CSS 변수 문자열 생성
 */
function getThemeCSSVariables(emotion) {
    const theme = getTheme(emotion);
    return `
    --emotion-bg: ${theme.background};
    --emotion-accent: ${theme.accent};
    --emotion-text: ${theme.text};
    --emotion-secondary: ${theme.secondary};
    --emotion-gradient: ${theme.gradient};
  `;
}
/**
 * 테마 전환 애니메이션 CSS
 */
const THEME_TRANSITION_CSS = `
  .emotion-transition-enter {
    opacity: 0;
    transform: scale(0.98);
  }
  
  .emotion-transition-enter-active {
    opacity: 1;
    transform: scale(1);
    transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1),
                transform 1.2s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .emotion-transition-exit {
    opacity: 1;
  }
  
  .emotion-transition-exit-active {
    opacity: 0;
    transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

/**
 * Healside Emotion SDK - Hysteresis Engine
 *
 * 감정 전환 안정화 알고리즘
 * 특허 핵심 기술: 연속 판단 + 최소 간격 + 신뢰도 임계값
 */
const DEFAULT_CONFIG$4 = {
    requiredConsecutiveCount: 3,
    maxTimeBetweenJudgments: 10000,
    minConfidence: 0.7,
    minimumSwitchIntervalMs: 5000,
    historyRetentionTime: 300000,
    oppositeEmotionExtraCount: 2 // 반대 감정은 5회 확인 (3 + 2)
};
// 반대 감정 쌍 정의
const OPPOSITE_EMOTIONS = [
    ['happy', 'sad'],
    ['excited', 'depression'],
    ['anger', 'fear'],
    ['stressed', 'meditation'],
    ['anxious', 'meditation']
];
// 유사 감정 그룹 정의
const SIMILAR_EMOTION_GROUPS = [
    ['happy', 'excited'],
    ['sad', 'depression'],
    ['stressed', 'anxious'],
    ['anger', 'stressed']
];
/**
 * Hysteresis - 감정 전환 안정화 엔진
 */
class Hysteresis {
    constructor(config = {}) {
        this.config = { ...DEFAULT_CONFIG$4, ...config };
        this.emotionCounts = {};
        this.currentStableEmotion = 'neutral';
        this.lastSwitchTimestamp = 0;
        this.transitionHistory = [];
        // 초기화 로그 (특허 파라미터 명시)
        console.info('[Hysteresis:init]', {
            requiredConsecutiveCount: this.config.requiredConsecutiveCount,
            minimumSwitchIntervalMs: this.config.minimumSwitchIntervalMs,
            minConfidence: this.config.minConfidence
        });
    }
    /**
     * 감정 판단 처리 및 전환 여부 결정 (Enhanced)
     */
    processEmotionJudgment(emotion, confidence, timestamp = Date.now()) {
        // 1. 신뢰도 체크
        if (confidence < this.config.minConfidence) {
            return this.createResult(false, `Low confidence: ${confidence} < ${this.config.minConfidence}`);
        }
        // 2. 최소 전환 간격 체크
        const timeSinceLastSwitch = timestamp - this.lastSwitchTimestamp;
        if (timeSinceLastSwitch < this.config.minimumSwitchIntervalMs) {
            return this.createResult(false, `Too soon: ${timeSinceLastSwitch}ms < ${this.config.minimumSwitchIntervalMs}ms`);
        }
        // 3. 연속 카운트 업데이트
        this.updateEmotionCount(emotion, confidence, timestamp);
        // 4. 다른 감정들 리셋 (시간 초과)
        this.cleanupOldCounts(timestamp);
        // 5. 동적 임계값 계산 (반대 감정 vs 유사 감정)
        const requiredCount = this.getRequiredCount(this.currentStableEmotion, emotion);
        // 6. 전환 조건 체크
        const emotionData = this.emotionCounts[emotion];
        if (emotionData && emotionData.consecutiveCount >= requiredCount) {
            // 전환 실행
            const previousEmotion = this.currentStableEmotion;
            this.currentStableEmotion = emotion;
            this.lastSwitchTimestamp = timestamp;
            // 히스토리 기록
            this.recordTransition(previousEmotion, emotion, timestamp, confidence);
            // 카운트 리셋
            this.emotionCounts[emotion].consecutiveCount = 0;
            const transitionType = this.isOppositeEmotion(previousEmotion, emotion) ? 'OPPOSITE' :
                this.isSimilarEmotion(previousEmotion, emotion) ? 'SIMILAR' : 'NORMAL';
            return this.createResult(true, undefined, `Transition: ${previousEmotion} → ${emotion} [${transitionType}] (count: ${requiredCount})`);
        }
        return this.createResult(false, `Not enough consecutive: ${emotionData?.consecutiveCount || 0} < ${requiredCount}`);
    }
    /**
     * 필요한 확인 횟수 계산
     * - 반대 감정: 5회 (기본 3 + 추가 2)
     * - 유사 감정: 2회
     * - 일반: 3회
     */
    getRequiredCount(from, to) {
        if (this.isOppositeEmotion(from, to)) {
            return this.config.requiredConsecutiveCount + this.config.oppositeEmotionExtraCount;
        }
        if (this.isSimilarEmotion(from, to)) {
            return 2; // 유사 감정은 빠르게 전환
        }
        return this.config.requiredConsecutiveCount;
    }
    /**
     * 반대 감정 체크
     */
    isOppositeEmotion(e1, e2) {
        return OPPOSITE_EMOTIONS.some(([a, b]) => (a === e1 && b === e2) || (a === e2 && b === e1));
    }
    /**
     * 유사 감정 체크
     */
    isSimilarEmotion(e1, e2) {
        return SIMILAR_EMOTION_GROUPS.some(group => group.includes(e1) && group.includes(e2));
    }
    updateEmotionCount(emotion, confidence, timestamp) {
        if (!this.emotionCounts[emotion]) {
            this.emotionCounts[emotion] = {
                consecutiveCount: 0,
                lastTimestamp: 0,
                confidence: 0
            };
        }
        const data = this.emotionCounts[emotion];
        const timeSinceLastJudgment = timestamp - data.lastTimestamp;
        // 연속성 체크
        if (timeSinceLastJudgment <= this.config.maxTimeBetweenJudgments) {
            data.consecutiveCount++;
        }
        else {
            data.consecutiveCount = 1;
        }
        data.lastTimestamp = timestamp;
        data.confidence = confidence;
    }
    cleanupOldCounts(currentTimestamp) {
        Object.keys(this.emotionCounts).forEach(emotion => {
            const data = this.emotionCounts[emotion];
            const age = currentTimestamp - data.lastTimestamp;
            if (age > this.config.maxTimeBetweenJudgments) {
                data.consecutiveCount = 0;
            }
        });
    }
    recordTransition(from, to, timestamp, confidence) {
        this.transitionHistory.push({ from, to, timestamp, confidence });
        // 오래된 기록 정리
        const cutoff = timestamp - this.config.historyRetentionTime;
        this.transitionHistory = this.transitionHistory.filter(record => record.timestamp > cutoff);
    }
    createResult(shouldTransition, blockedReason, transitionReason) {
        return {
            shouldTransition,
            stableEmotion: this.currentStableEmotion,
            consecutiveCount: this.emotionCounts[this.currentStableEmotion]?.consecutiveCount || 0,
            debugInfo: {
                allCounts: { ...this.emotionCounts },
                transitionReason,
                blockedReason
            }
        };
    }
    // ============================================
    // 공개 메서드
    // ============================================
    /** 현재 안정 감정 조회 */
    getStableEmotion() {
        return this.currentStableEmotion;
    }
    /** 전환 히스토리 조회 */
    getTransitionHistory() {
        return [...this.transitionHistory];
    }
    /** 설정 업데이트 */
    updateConfig(config) {
        this.config = { ...this.config, ...config };
    }
    /** 상태 리셋 */
    reset() {
        this.emotionCounts = {};
        this.currentStableEmotion = 'neutral';
        this.lastSwitchTimestamp = 0;
        this.transitionHistory = [];
    }
    /** 안정성 지수 계산 (0-1) */
    getStabilityIndex() {
        const recentTransitions = this.transitionHistory.filter(record => Date.now() - record.timestamp < 60000 // 최근 1분
        );
        // 전환이 적을수록 안정적
        const transitionsPerMinute = recentTransitions.length;
        const maxTransitions = this.config.requiredConsecutiveCount * 2;
        return Math.max(0, 1 - (transitionsPerMinute / maxTransitions));
    }
}

/**
 * Healside Emotion SDK - Core Engine
 *
 * 감정 분석의 핵심 엔진
 * 모든 감정 관련 로직의 중앙 허브
 */
// 기본 설정
const DEFAULT_CONFIG$3 = {
    trackBehavior: true,
    trackText: true,
    autoTheme: true,
    enableUI: true,
    debug: false,
    hysteresis: {
        consecutiveCount: 3,
        minInterval: 5000,
        minConfidence: 0.7
    },
    weights: {
        behavior: 0.4,
        text: 0.6
    }
};
// 초기 감정 상태
const INITIAL_STATE = {
    emotion: 'neutral',
    confidence: 0.5,
    scores: { neutral: 1 },
    source: 'auto',
    timestamp: new Date().toISOString()
};
/**
 * EmotionEngine - SDK의 핵심 클래스
 */
class EmotionEngine {
    constructor() {
        this.config = DEFAULT_CONFIG$3;
        this.state = { ...INITIAL_STATE };
        this.subscribers = new Set();
        this.hysteresis = new Hysteresis();
        this.enabled = false;
        this.behaviorMetrics = {
            mouseSpeed: 0,
            clickFrequency: 0,
            scrollSpeed: 0,
            dwellTime: 0,
            hesitationTime: 0
        };
    }
    // ============================================
    // 초기화
    // ============================================
    init(config) {
        this.config = { ...DEFAULT_CONFIG$3, ...config };
        this.enabled = true;
        // 히스테리시스 설정
        if (this.config.hysteresis) {
            this.hysteresis = new Hysteresis({
                requiredConsecutiveCount: this.config.hysteresis.consecutiveCount || 3,
                minimumSwitchIntervalMs: this.config.hysteresis.minInterval || 5000,
                minConfidence: this.config.hysteresis.minConfidence || 0.7
            });
        }
        this.log('SDK initialized', this.config);
    }
    destroy() {
        this.enabled = false;
        this.subscribers.clear();
        this.state = { ...INITIAL_STATE };
        this.log('SDK destroyed');
    }
    // ============================================
    // 감정 상태 접근
    // ============================================
    getEmotion() {
        return this.state.emotion;
    }
    getConfidence() {
        return this.state.confidence;
    }
    getState() {
        return { ...this.state };
    }
    // ============================================
    // 감정 설정
    // ============================================
    setEmotion(emotion) {
        this.updateState({
            emotion,
            confidence: 1.0,
            scores: { [emotion]: 1 },
            source: 'manual',
            timestamp: new Date().toISOString()
        });
    }
    /**
     * 내부용: 감정 상태 업데이트 (히스테리시스 적용)
     */
    updateEmotionFromAnalysis(emotion, confidence, scores, source) {
        if (!this.enabled)
            return;
        // 히스테리시스 체크
        const result = this.hysteresis.processEmotionJudgment(emotion, confidence, Date.now());
        if (result.shouldTransition) {
            this.updateState({
                emotion: result.stableEmotion,
                confidence,
                scores,
                source,
                timestamp: new Date().toISOString()
            });
        }
        else {
            this.log('Emotion transition blocked by hysteresis', {
                attempted: emotion,
                current: this.state.emotion,
                reason: result.debugInfo.blockedReason
            });
        }
    }
    updateState(newState) {
        const previousEmotion = this.state.emotion;
        this.state = newState;
        // 콜백 호출
        if (this.config.onEmotionChange && previousEmotion !== newState.emotion) {
            this.config.onEmotionChange(newState);
        }
        // 구독자 알림
        this.notifySubscribers();
        // 테마 자동 적용
        if (this.config.autoTheme) {
            this.applyTheme();
        }
        this.log('State updated', newState);
    }
    // ============================================
    // 구독
    // ============================================
    subscribe(callback) {
        this.subscribers.add(callback);
        // 현재 상태 즉시 전달
        callback(this.state);
        // 구독 해제 함수 반환
        return () => {
            this.subscribers.delete(callback);
        };
    }
    notifySubscribers() {
        this.subscribers.forEach(callback => {
            try {
                callback(this.state);
            }
            catch (error) {
                this.log('Subscriber error', error);
            }
        });
    }
    // ============================================
    // 상품 점수
    // ============================================
    getProductScore(productId) {
        // 기본 점수
        return 0.5 + Math.random() * 0.3;
    }
    getProductScores(productIds) {
        return productIds.map(productId => ({
            productId,
            score: this.getProductScore(productId),
            matchReason: this.getMatchReason(this.state.emotion),
            emotionTags: this.getEmotionTags(this.state.emotion)
        }));
    }
    getMatchReason(emotion) {
        const reasons = {
            neutral: '일상에 활력을',
            happy: '기쁨을 더하는',
            excited: '설렘을 유지하는',
            stressed: '스트레스 완화에',
            anxious: '마음을 진정시키는',
            sad: '위로가 되는',
            anger: '평온을 찾아주는',
            fear: '안정감을 주는',
            surprise: '특별한 순간을 위한',
            meditation: '명상에 어울리는',
            fatigue: '피로 회복에',
            depression: '마음을 밝혀주는'
        };
        return reasons[emotion] || '추천';
    }
    getEmotionTags(emotion) {
        const tags = {
            neutral: ['일상', '밸런스'],
            happy: ['기쁨', '에너지'],
            excited: ['설렘', '활력'],
            stressed: ['릴렉스', '진정'],
            anxious: ['안정', '평온'],
            sad: ['위로', '따뜻함'],
            anger: ['쿨다운', '평화'],
            fear: ['안전', '보호'],
            surprise: ['특별', '선물'],
            meditation: ['명상', '집중'],
            fatigue: ['회복', '휴식'],
            depression: ['희망', '빛']
        };
        return tags[emotion] || [];
    }
    // ============================================
    // 테마
    // ============================================
    getTheme() {
        return EMOTION_THEMES[this.state.emotion] || EMOTION_THEMES.neutral;
    }
    applyTheme() {
        if (typeof document === 'undefined')
            return;
        const theme = this.getTheme();
        const root = document.documentElement;
        root.style.setProperty('--emotion-bg', theme.background);
        root.style.setProperty('--emotion-accent', theme.accent);
        root.style.setProperty('--emotion-text', theme.text);
        root.style.setProperty('--emotion-secondary', theme.secondary);
        root.style.setProperty('--emotion-gradient', theme.gradient);
        // 감정 클래스 추가
        document.body.classList.remove(...Object.keys(EMOTION_THEMES).map(e => `emotion-${e}`));
        document.body.classList.add(`emotion-${this.state.emotion}`);
        this.log('Theme applied', theme);
    }
    // ============================================
    // 행동 분석
    // ============================================
    getBehaviorMetrics() {
        return { ...this.behaviorMetrics };
    }
    updateBehaviorMetrics(metrics) {
        this.behaviorMetrics = { ...this.behaviorMetrics, ...metrics };
    }
    // ============================================
    // 활성화/비활성화
    // ============================================
    enable() {
        this.enabled = true;
        this.log('SDK enabled');
    }
    disable() {
        this.enabled = false;
        this.log('SDK disabled');
    }
    isEnabled() {
        return this.enabled;
    }
    // ============================================
    // 텍스트 분석
    // ============================================
    async analyzeText(text) {
        if (!this.enabled) {
            return this.state;
        }
        try {
            // TODO: 실제 API 호출 구현
            // 현재는 더미 분석
            const emotion = this.dummyTextAnalysis(text);
            this.updateEmotionFromAnalysis(emotion, 0.8, { [emotion]: 0.8, neutral: 0.2 }, 'text');
            return this.state;
        }
        catch (error) {
            this.log('Text analysis error', error);
            if (this.config.onError) {
                this.config.onError(error);
            }
            return this.state;
        }
    }
    dummyTextAnalysis(text) {
        const lower = text.toLowerCase();
        if (lower.includes('스트레스') || lower.includes('stress') || lower.includes('힘들')) {
            return 'stressed';
        }
        if (lower.includes('불안') || lower.includes('anxious') || lower.includes('걱정')) {
            return 'anxious';
        }
        if (lower.includes('슬') || lower.includes('sad') || lower.includes('우울')) {
            return 'sad';
        }
        if (lower.includes('행복') || lower.includes('happy') || lower.includes('기쁘')) {
            return 'happy';
        }
        if (lower.includes('피곤') || lower.includes('tired') || lower.includes('지쳐')) {
            return 'fatigue';
        }
        return 'neutral';
    }
    // ============================================
    // 유틸리티
    // ============================================
    log(message, data) {
        if (this.config.debug) {
            console.log(`[Healside SDK] ${message}`, data || '');
        }
    }
}
// 싱글톤 인스턴스
const emotionEngine$2 = new EmotionEngine();
// 전역 접근 (개발용)
if (typeof window !== 'undefined') {
    window.__HEALSIDE_SDK__ = emotionEngine$2;
}

/**
 * Healside Emotion SDK - Behavior Tracker
 *
 * 사용자 행동 데이터 수집 및 분석
 * 특허 핵심 기술: 마우스/스크롤/클릭 패턴에서 감정 추론
 */
// 감정 추론을 위한 임계값
const BEHAVIOR_THRESHOLDS = {
    // 마우스 속도 (px/s)
    mouseSpeed: {
        slow: 100, // < 100: 평온/피로
        fast: 500, // 300-500: 활발
        veryFast: 800 // > 800: 스트레스/불안
    },
    // 스크롤 속도 (px/s)
    scrollSpeed: {
        fast: 1000,
        veryFast: 2000
    },
    // 클릭 빈도 (clicks/min)
    clickFrequency: {
        low: 5,
        normal: 15,
        veryHigh: 50
    },
    // 망설임 시간 (ms)
    hesitation: {
        short: 1500,
        medium: 3000,
        long: 5000
    }
};
const DEFAULT_CONFIG$2 = {
    trackMouse: true,
    trackScroll: true,
    trackClicks: true,
    trackKeyboard: false, // 기본 비활성화 (프라이버시)
    sampleInterval: 100,
    historyRetention: 60000, // 1분
    debug: false
};
/**
 * BehaviorTracker - 행동 데이터 수집기
 */
class BehaviorTracker {
    constructor(config = {}) {
        this.config = { ...DEFAULT_CONFIG$2, ...config };
        this.isTracking = false;
        this.mouseHistory = [];
        this.scrollHistory = [];
        this.clickHistory = [];
        this.keystrokeHistory = [];
        this.metrics = {
            mouseSpeed: 0,
            clickFrequency: 0,
            scrollSpeed: 0,
            dwellTime: 0,
            hesitationTime: 0
        };
        this.boundHandlers = {};
        this.sampleTimer = null;
        this.cleanupTimer = null;
    }
    // ============================================
    // 추적 제어
    // ============================================
    start() {
        if (this.isTracking || typeof window === 'undefined')
            return;
        this.isTracking = true;
        this.setupEventListeners();
        this.startSampling();
        this.startCleanup();
        this.log('Behavior tracking started');
    }
    stop() {
        if (!this.isTracking)
            return;
        this.isTracking = false;
        this.removeEventListeners();
        this.stopSampling();
        this.stopCleanup();
        this.log('Behavior tracking stopped');
    }
    reset() {
        this.mouseHistory = [];
        this.scrollHistory = [];
        this.clickHistory = [];
        this.keystrokeHistory = [];
        this.metrics = {
            mouseSpeed: 0,
            clickFrequency: 0,
            scrollSpeed: 0,
            dwellTime: 0,
            hesitationTime: 0
        };
    }
    // ============================================
    // 이벤트 리스너
    // ============================================
    setupEventListeners() {
        if (this.config.trackMouse) {
            this.boundHandlers.mouseMove = this.handleMouseMove.bind(this);
            window.addEventListener('mousemove', this.boundHandlers.mouseMove, { passive: true });
        }
        if (this.config.trackScroll) {
            this.boundHandlers.scroll = this.handleScroll.bind(this);
            window.addEventListener('scroll', this.boundHandlers.scroll, { passive: true });
        }
        if (this.config.trackClicks) {
            this.boundHandlers.click = this.handleClick.bind(this);
            window.addEventListener('click', this.boundHandlers.click, { passive: true });
        }
        if (this.config.trackKeyboard) {
            this.boundHandlers.keydown = this.handleKeydown.bind(this);
            window.addEventListener('keydown', this.boundHandlers.keydown, { passive: true });
        }
    }
    removeEventListeners() {
        if (this.boundHandlers.mouseMove) {
            window.removeEventListener('mousemove', this.boundHandlers.mouseMove);
        }
        if (this.boundHandlers.scroll) {
            window.removeEventListener('scroll', this.boundHandlers.scroll);
        }
        if (this.boundHandlers.click) {
            window.removeEventListener('click', this.boundHandlers.click);
        }
        if (this.boundHandlers.keydown) {
            window.removeEventListener('keydown', this.boundHandlers.keydown);
        }
        this.boundHandlers = {};
    }
    handleMouseMove(e) {
        this.mouseHistory.push({
            x: e.clientX,
            y: e.clientY,
            timestamp: Date.now()
        });
    }
    handleScroll() {
        this.scrollHistory.push({
            y: window.scrollY,
            timestamp: Date.now()
        });
    }
    handleClick(e) {
        const target = e.target;
        this.clickHistory.push({
            x: e.clientX,
            y: e.clientY,
            timestamp: Date.now(),
            target: target?.tagName || 'unknown'
        });
    }
    handleKeydown(e) {
        // 민감한 키 제외 (비밀번호 등)
        const sensitiveFields = ['password', 'credit', 'card', 'cvv'];
        const target = e.target;
        const isSensitive = sensitiveFields.some(field => target?.type?.toLowerCase().includes(field) ||
            target?.name?.toLowerCase().includes(field));
        if (!isSensitive) {
            this.keystrokeHistory.push({
                key: e.key.length === 1 ? '*' : e.key, // 실제 키 대신 마스킹
                timestamp: Date.now()
            });
        }
    }
    // ============================================
    // 샘플링 및 정리
    // ============================================
    startSampling() {
        this.sampleTimer = setInterval(() => {
            this.calculateMetrics();
        }, this.config.sampleInterval);
    }
    stopSampling() {
        if (this.sampleTimer) {
            clearInterval(this.sampleTimer);
            this.sampleTimer = null;
        }
    }
    startCleanup() {
        this.cleanupTimer = setInterval(() => {
            this.cleanupOldData();
        }, 10000); // 10초마다 정리
    }
    stopCleanup() {
        if (this.cleanupTimer) {
            clearInterval(this.cleanupTimer);
            this.cleanupTimer = null;
        }
    }
    cleanupOldData() {
        const cutoff = Date.now() - (this.config.historyRetention || 60000);
        this.mouseHistory = this.mouseHistory.filter(p => p.timestamp > cutoff);
        this.scrollHistory = this.scrollHistory.filter(p => p.timestamp > cutoff);
        this.clickHistory = this.clickHistory.filter(p => p.timestamp > cutoff);
        this.keystrokeHistory = this.keystrokeHistory.filter(p => p.timestamp > cutoff);
    }
    // ============================================
    // 메트릭 계산
    // ============================================
    calculateMetrics() {
        const now = Date.now();
        const windowMs = 10000; // 최근 10초
        // 마우스 속도 계산
        this.metrics.mouseSpeed = this.calculateMouseSpeed(now, windowMs);
        // 스크롤 속도 계산
        this.metrics.scrollSpeed = this.calculateScrollSpeed(now, windowMs);
        // 클릭 빈도 계산
        this.metrics.clickFrequency = this.calculateClickFrequency(now, windowMs);
        // 체류 시간 (첫 이벤트부터)
        this.metrics.dwellTime = this.calculateDwellTime();
        // 망설임 시간 (마지막 클릭 후 경과)
        this.metrics.hesitationTime = this.calculateHesitationTime(now);
    }
    calculateMouseSpeed(now, windowMs) {
        const recent = this.mouseHistory.filter(p => p.timestamp > now - windowMs);
        if (recent.length < 2)
            return 0;
        let totalDistance = 0;
        for (let i = 1; i < recent.length; i++) {
            const dx = recent[i].x - recent[i - 1].x;
            const dy = recent[i].y - recent[i - 1].y;
            totalDistance += Math.sqrt(dx * dx + dy * dy);
        }
        const timeSpan = (recent[recent.length - 1].timestamp - recent[0].timestamp) / 1000;
        return timeSpan > 0 ? totalDistance / timeSpan : 0;
    }
    calculateScrollSpeed(now, windowMs) {
        const recent = this.scrollHistory.filter(p => p.timestamp > now - windowMs);
        if (recent.length < 2)
            return 0;
        let totalDistance = 0;
        for (let i = 1; i < recent.length; i++) {
            totalDistance += Math.abs(recent[i].y - recent[i - 1].y);
        }
        const timeSpan = (recent[recent.length - 1].timestamp - recent[0].timestamp) / 1000;
        return timeSpan > 0 ? totalDistance / timeSpan : 0;
    }
    calculateClickFrequency(now, windowMs) {
        const recent = this.clickHistory.filter(p => p.timestamp > now - windowMs);
        const minutes = windowMs / 60000;
        return recent.length / minutes;
    }
    calculateDwellTime() {
        const allEvents = [
            ...this.mouseHistory,
            ...this.scrollHistory,
            ...this.clickHistory
        ];
        if (allEvents.length === 0)
            return 0;
        const firstEvent = Math.min(...allEvents.map(e => e.timestamp));
        return Date.now() - firstEvent;
    }
    calculateHesitationTime(now) {
        if (this.clickHistory.length === 0)
            return 0;
        const lastClick = Math.max(...this.clickHistory.map(c => c.timestamp));
        return now - lastClick;
    }
    // ============================================
    // 감정 추론
    // ============================================
    /**
     * 행동 패턴에서 감정 추론
     * 특허 핵심 알고리즘
     */
    inferEmotion() {
        const metrics = this.getMetrics();
        const reasons = [];
        let emotion = 'neutral';
        let confidence = 0.5;
        // 스트레스/불안 신호
        const stressSignals = this.detectStressSignals(metrics, reasons);
        // 피로 신호
        const fatigueSignals = this.detectFatigueSignals(metrics, reasons);
        // 흥분/행복 신호
        const excitementSignals = this.detectExcitementSignals(metrics, reasons);
        // 가장 강한 신호 선택
        const signals = [
            { emotion: 'stressed', score: stressSignals },
            { emotion: 'fatigue', score: fatigueSignals },
            { emotion: 'excited', score: excitementSignals }
        ];
        const strongest = signals.reduce((max, s) => s.score > max.score ? s : max, signals[0]);
        if (strongest.score > 0.3) {
            emotion = strongest.emotion;
            confidence = Math.min(0.9, 0.5 + strongest.score);
        }
        this.log('Emotion inferred', { emotion, confidence, reasons, metrics });
        return { emotion, confidence, reasons };
    }
    detectStressSignals(metrics, reasons) {
        let score = 0;
        // 빠른 마우스 움직임
        if (metrics.mouseSpeed > BEHAVIOR_THRESHOLDS.mouseSpeed.veryFast) {
            score += 0.3;
            reasons.push('빠른 마우스 움직임 감지');
        }
        else if (metrics.mouseSpeed > BEHAVIOR_THRESHOLDS.mouseSpeed.fast) {
            score += 0.15;
        }
        // 빠른 스크롤
        if (metrics.scrollSpeed > BEHAVIOR_THRESHOLDS.scrollSpeed.veryFast) {
            score += 0.3;
            reasons.push('급한 스크롤 감지');
        }
        else if (metrics.scrollSpeed > BEHAVIOR_THRESHOLDS.scrollSpeed.fast) {
            score += 0.15;
        }
        // 높은 클릭 빈도
        if (metrics.clickFrequency > BEHAVIOR_THRESHOLDS.clickFrequency.veryHigh) {
            score += 0.25;
            reasons.push('빈번한 클릭 감지');
        }
        return Math.min(1, score);
    }
    detectFatigueSignals(metrics, reasons) {
        let score = 0;
        // 느린 마우스 움직임
        if (metrics.mouseSpeed < BEHAVIOR_THRESHOLDS.mouseSpeed.slow && metrics.mouseSpeed > 0) {
            score += 0.2;
            reasons.push('느린 움직임 감지');
        }
        // 긴 망설임 시간
        if (metrics.hesitationTime > BEHAVIOR_THRESHOLDS.hesitation.long) {
            score += 0.3;
            reasons.push('긴 망설임 시간');
        }
        else if (metrics.hesitationTime > BEHAVIOR_THRESHOLDS.hesitation.medium) {
            score += 0.15;
        }
        // 긴 체류 시간 + 낮은 활동
        if (metrics.dwellTime > 120000 && metrics.clickFrequency < BEHAVIOR_THRESHOLDS.clickFrequency.low) {
            score += 0.2;
            reasons.push('낮은 활동 수준');
        }
        return Math.min(1, score);
    }
    detectExcitementSignals(metrics, reasons) {
        let score = 0;
        // 적당히 빠른 움직임 (스트레스보다 낮음)
        if (metrics.mouseSpeed > BEHAVIOR_THRESHOLDS.mouseSpeed.fast &&
            metrics.mouseSpeed < BEHAVIOR_THRESHOLDS.mouseSpeed.veryFast) {
            score += 0.2;
        }
        // 적당한 클릭 빈도
        if (metrics.clickFrequency > BEHAVIOR_THRESHOLDS.clickFrequency.normal &&
            metrics.clickFrequency < BEHAVIOR_THRESHOLDS.clickFrequency.veryHigh) {
            score += 0.2;
            reasons.push('활발한 탐색 감지');
        }
        // 짧은 망설임 (결정력)
        if (metrics.hesitationTime < BEHAVIOR_THRESHOLDS.hesitation.short &&
            metrics.hesitationTime > 0) {
            score += 0.15;
            reasons.push('빠른 결정');
        }
        return Math.min(1, score);
    }
    // ============================================
    // 공개 API
    // ============================================
    getMetrics() {
        return { ...this.metrics };
    }
    getRawData() {
        return {
            mouse: [...this.mouseHistory],
            clicks: [...this.clickHistory],
            scroll: [...this.scrollHistory],
            keystrokes: [...this.keystrokeHistory]
        };
    }
    isActive() {
        return this.isTracking;
    }
    // ============================================
    // 유틸리티
    // ============================================
    log(message, data) {
        if (this.config.debug) {
            console.log(`[BehaviorTracker] ${message}`, data || '');
        }
    }
}

/**
 * Healside Emotion SDK - Text Analyzer
 *
 * 텍스트 기반 감정 분석
 * 특허 핵심 기술: 사용자 입력 텍스트에서 감정 추출
 */
// 한국어 감정 키워드 사전
const KOREAN_EMOTION_KEYWORDS = {
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
const ENGLISH_EMOTION_KEYWORDS = {
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
const DEFAULT_CONFIG$1 = {
    apiEndpoint: '/api/emotion/analyze-text',
    useLocalAnalysis: true,
    language: 'auto',
    debug: false
};
/**
 * TextAnalyzer - 텍스트 감정 분석기
 */
class TextAnalyzer {
    constructor(config = {}) {
        this.config = { ...DEFAULT_CONFIG$1, ...config };
    }
    // ============================================
    // 분석 메서드
    // ============================================
    /**
     * 텍스트 분석 (API 우선, 실패 시 로컬)
     */
    async analyze(text) {
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
            }
            catch (error) {
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
    async analyzeWithAPI(text, language) {
        const response = await fetch(this.config.apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(this.config.apiKey ? { 'Authorization': `Bearer ${this.config.apiKey}` } : {})
            },
            body: JSON.stringify({
                text,
                mode: 'smart', // Smart 라우팅 (HF → GPT 자동 선택)
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
    analyzeLocally(text, language) {
        const keywords = language === 'ko' ? KOREAN_EMOTION_KEYWORDS : ENGLISH_EMOTION_KEYWORDS;
        const scores = {};
        const matchedKeywords = [];
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
        let maxEmotion = 'neutral';
        let maxScore = 0;
        for (const [emotion, score] of Object.entries(scores)) {
            if (score > maxScore) {
                maxScore = score;
                maxEmotion = emotion;
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
    preprocessText(text) {
        return text
            .trim()
            .replace(/\s+/g, ' ') // 다중 공백 제거
            .replace(/[^\w\sㄱ-ㅎㅏ-ㅣ가-힣.,!?]/g, ''); // 특수문자 제거 (한글 유지)
    }
    detectLanguage(text) {
        if (this.config.language !== 'auto') {
            return this.config.language;
        }
        // 한글 포함 여부로 판단
        const koreanPattern = /[ㄱ-ㅎㅏ-ㅣ가-힣]/;
        return koreanPattern.test(text) ? 'ko' : 'en';
    }
    checkIntensityModifiers(text) {
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
    calculateConfidence(score, keywordCount, textLength) {
        // 기본 신뢰도
        let confidence = 0.3;
        // 점수 기반
        confidence += score * 0.3;
        // 키워드 수 기반
        confidence += Math.min(0.2, keywordCount * 0.05);
        // 텍스트 길이 기반 (너무 짧으면 낮음)
        if (textLength < 10) {
            confidence *= 0.7;
        }
        else if (textLength > 50) {
            confidence += 0.1;
        }
        return Math.min(0.95, Math.max(0.3, confidence));
    }
    getDefaultResult() {
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
    createStreamAnalyzer(onResult, debounceMs = 500) {
        let timeoutId = null;
        let lastText = '';
        return {
            feed: (text) => {
                if (text === lastText)
                    return;
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
    updateConfig(config) {
        this.config = { ...this.config, ...config };
    }
    log(message, data) {
        if (this.config.debug) {
            console.log(`[TextAnalyzer] ${message}`, data || '');
        }
    }
}

/**
 * Healside Emotion SDK - Multimodal Fusion
 *
 * 멀티모달 감정 융합 엔진
 * 특허 핵심 기술: 행동 데이터 + 텍스트 분석 결합
 */
const DEFAULT_CONFIG = {
    behaviorWeight: 0.4,
    textWeight: 0.6,
    useHysteresis: true,
    minConfidence: 0.5,
    autoAnalyzeInterval: 5000, // 5초
    debug: false
};
/**
 * MultimodalFusion - 멀티모달 감정 융합 엔진
 */
class MultimodalFusion {
    constructor(config = {}) {
        this.config = { ...DEFAULT_CONFIG, ...config };
        this.behaviorTracker = new BehaviorTracker({ debug: this.config.debug });
        this.textAnalyzer = new TextAnalyzer({ debug: this.config.debug });
        this.hysteresis = new Hysteresis({
            requiredConsecutiveCount: 3,
            minimumSwitchIntervalMs: 5000,
            minConfidence: 0.7
        });
        this.currentResult = this.getDefaultResult();
        this.subscribers = new Set();
        this.autoAnalyzeTimer = null;
        this.lastTextInput = '';
        this.manualOverride = null;
    }
    // ============================================
    // 라이프사이클
    // ============================================
    start() {
        this.behaviorTracker.start();
        this.startAutoAnalyze();
        this.log('Multimodal fusion started');
    }
    stop() {
        this.behaviorTracker.stop();
        this.stopAutoAnalyze();
        this.log('Multimodal fusion stopped');
    }
    reset() {
        this.behaviorTracker.reset();
        this.hysteresis.reset();
        this.currentResult = this.getDefaultResult();
        this.lastTextInput = '';
        this.manualOverride = null;
        this.notifySubscribers();
    }
    // ============================================
    // 자동 분석
    // ============================================
    startAutoAnalyze() {
        if (this.autoAnalyzeTimer)
            return;
        this.autoAnalyzeTimer = setInterval(() => {
            this.analyze();
        }, this.config.autoAnalyzeInterval);
    }
    stopAutoAnalyze() {
        if (this.autoAnalyzeTimer) {
            clearInterval(this.autoAnalyzeTimer);
            this.autoAnalyzeTimer = null;
        }
    }
    // ============================================
    // 분석 메서드
    // ============================================
    /**
     * 통합 분석 수행
     */
    async analyze(textInput) {
        // 수동 오버라이드 체크
        if (this.manualOverride) {
            return this.createManualResult(this.manualOverride);
        }
        // 텍스트 저장
        if (textInput) {
            this.lastTextInput = textInput;
        }
        // 행동 분석
        const behaviorResult = this.behaviorTracker.inferEmotion();
        // 텍스트 분석 (있는 경우)
        let textResult = null;
        if (this.lastTextInput) {
            textResult = await this.textAnalyzer.analyze(this.lastTextInput);
        }
        // 융합
        const fusedResult = this.fuseResults(behaviorResult, textResult);
        // 히스테리시스 적용
        if (this.config.useHysteresis) {
            const hysteresisResult = this.hysteresis.processEmotionJudgment(fusedResult.emotion, fusedResult.confidence, Date.now());
            if (!hysteresisResult.shouldTransition) {
                // 전환 차단됨 - 이전 감정 유지
                this.log('Transition blocked by hysteresis', hysteresisResult.debugInfo);
                return this.currentResult;
            }
        }
        // 결과 저장 및 알림
        this.currentResult = fusedResult;
        this.notifySubscribers();
        return fusedResult;
    }
    /**
     * 행동 + 텍스트 결과 융합
     */
    fuseResults(behaviorResult, textResult) {
        const timestamp = new Date().toISOString();
        // 텍스트 없음 - 행동만 사용
        if (!textResult) {
            return {
                emotion: behaviorResult.emotion,
                confidence: behaviorResult.confidence * 0.8, // 단일 소스는 신뢰도 감소
                scores: { [behaviorResult.emotion]: behaviorResult.confidence },
                source: 'behavior',
                details: {
                    behaviorEmotion: behaviorResult.emotion,
                    behaviorConfidence: behaviorResult.confidence,
                    behaviorReasons: behaviorResult.reasons,
                    fusionMethod: 'behavior_only'
                },
                timestamp
            };
        }
        // 행동 신뢰도 낮음 - 텍스트만 사용
        if (behaviorResult.confidence < 0.3) {
            return {
                emotion: textResult.emotion,
                confidence: textResult.confidence,
                scores: { [textResult.emotion]: textResult.confidence },
                source: 'text',
                details: {
                    textEmotion: textResult.emotion,
                    textConfidence: textResult.confidence,
                    textKeywords: textResult.keywords,
                    fusionMethod: 'text_only'
                },
                timestamp
            };
        }
        // 멀티모달 융합
        const behaviorWeight = this.config.behaviorWeight;
        const textWeight = this.config.textWeight;
        // 가중 평균 점수 계산
        const scores = {};
        const emotions = new Set([behaviorResult.emotion, textResult.emotion]);
        for (const emotion of emotions) {
            const behaviorScore = emotion === behaviorResult.emotion ? behaviorResult.confidence : 0;
            const textScore = emotion === textResult.emotion ? textResult.confidence : 0;
            scores[emotion] = behaviorScore * behaviorWeight + textScore * textWeight;
        }
        // 최고 점수 감정 선택
        let maxEmotion = 'neutral';
        let maxScore = 0;
        for (const [emotion, score] of Object.entries(scores)) {
            if (score > maxScore) {
                maxScore = score;
                maxEmotion = emotion;
            }
        }
        // 일치 여부에 따른 신뢰도 조정
        let confidence = maxScore;
        if (behaviorResult.emotion === textResult.emotion) {
            // 일치 시 신뢰도 부스트
            confidence = Math.min(0.95, confidence * 1.2);
        }
        return {
            emotion: maxEmotion,
            confidence,
            scores,
            source: 'multimodal',
            details: {
                behaviorEmotion: behaviorResult.emotion,
                behaviorConfidence: behaviorResult.confidence,
                behaviorReasons: behaviorResult.reasons,
                textEmotion: textResult.emotion,
                textConfidence: textResult.confidence,
                textKeywords: textResult.keywords,
                fusionMethod: `weighted_average (behavior: ${behaviorWeight}, text: ${textWeight})`
            },
            timestamp
        };
    }
    // ============================================
    // 수동 설정
    // ============================================
    setManualEmotion(emotion) {
        this.manualOverride = emotion;
        this.currentResult = this.createManualResult(emotion);
        this.notifySubscribers();
        this.log('Manual emotion set', emotion);
    }
    clearManualEmotion() {
        this.manualOverride = null;
        this.analyze(); // 자동 분석 재개
        this.log('Manual emotion cleared');
    }
    createManualResult(emotion) {
        return {
            emotion,
            confidence: 1.0,
            scores: { [emotion]: 1.0 },
            source: 'manual',
            details: {
                fusionMethod: 'manual_override'
            },
            timestamp: new Date().toISOString()
        };
    }
    // ============================================
    // 텍스트 입력
    // ============================================
    feedText(text) {
        this.lastTextInput = text;
        this.analyze(text);
    }
    // ============================================
    // 구독
    // ============================================
    subscribe(callback) {
        this.subscribers.add(callback);
        callback(this.currentResult);
        return () => {
            this.subscribers.delete(callback);
        };
    }
    notifySubscribers() {
        this.subscribers.forEach(callback => {
            try {
                callback(this.currentResult);
            }
            catch (error) {
                this.log('Subscriber error', error);
            }
        });
    }
    // ============================================
    // 상태 조회
    // ============================================
    getResult() {
        return { ...this.currentResult };
    }
    getEmotion() {
        return this.currentResult.emotion;
    }
    getConfidence() {
        return this.currentResult.confidence;
    }
    getBehaviorMetrics() {
        return this.behaviorTracker.getMetrics();
    }
    // ============================================
    // 설정
    // ============================================
    updateConfig(config) {
        this.config = { ...this.config, ...config };
        // 가중치 정규화
        const total = (this.config.behaviorWeight || 0) + (this.config.textWeight || 0);
        if (total > 0 && total !== 1) {
            this.config.behaviorWeight = (this.config.behaviorWeight || 0) / total;
            this.config.textWeight = (this.config.textWeight || 0) / total;
        }
    }
    // ============================================
    // 유틸리티
    // ============================================
    getDefaultResult() {
        return {
            emotion: 'neutral',
            confidence: 0.5,
            scores: { neutral: 1 },
            source: 'behavior',
            details: {
                fusionMethod: 'default'
            },
            timestamp: new Date().toISOString()
        };
    }
    log(message, data) {
        if (this.config.debug) {
            console.log(`[MultimodalFusion] ${message}`, data || '');
        }
    }
}

/**
 * Healside Emotion SDK - Benchmark Engine
 *
 * 실시간 정확도 검증 시스템
 * 투자자/고객에게 정확도를 투명하게 증명
 */
/**
 * 사전 정의된 테스트 케이스 (한글/영어)
 */
const PREDEFINED_TEST_CASES = [
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
class BenchmarkEngine {
    constructor(customTestCases = []) {
        this.realTimeResults = [];
        this.testCases = [...PREDEFINED_TEST_CASES, ...customTestCases];
    }
    /**
     * 정확도 검증 실행
     */
    async validateAccuracy(analyzeFunction) {
        console.log('[Benchmark] Starting validation...');
        const startTime = Date.now();
        const results = await Promise.all(this.testCases.map(async (tc) => {
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
            }
            catch (error) {
                console.error(`[Benchmark] Error analyzing "${tc.text}":`, error);
                return {
                    text: tc.text,
                    predicted: 'neutral',
                    expected: tc.expected,
                    correct: false,
                    confidence: 0,
                    language: tc.language,
                    category: tc.category
                };
            }
        }));
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
        const byCategory = {};
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
        const report = {
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
    recordAnalysis(text, predicted, expected, confidence) {
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
    getRealTimeAccuracy() {
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
    addTestCase(testCase) {
        this.testCases.push(testCase);
    }
    /**
     * 모든 테스트 케이스 조회
     */
    getTestCases() {
        return [...this.testCases];
    }
}

/**
 * Healside Emotion SDK - React Hook
 *
 * React 컴포넌트에서 감정 SDK를 쉽게 사용하기 위한 훅
 * 이것이 "외장하드 커넥터"의 React 버전
 */
/**
 * useEmotion - 감정 SDK React 훅
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { emotion, confidence, setEmotion, theme } = useEmotion();
 *
 *   return (
 *     <div style={{ background: theme.background }}>
 *       현재 감정: {emotion} ({Math.round(confidence * 100)}%)
 *     </div>
 *   );
 * }
 * ```
 */
function useEmotion(options = {}) {
    const { autoSubscribe = true } = options;
    // 상태
    const [state, setState] = require$$0.useState(emotionEngine$2.getState());
    const [behaviorMetrics, setBehaviorMetrics] = require$$0.useState(emotionEngine$2.getBehaviorMetrics());
    // 구독
    require$$0.useEffect(() => {
        if (!autoSubscribe)
            return;
        const unsubscribe = emotionEngine$2.subscribe((newState) => {
            setState(newState);
        });
        // 행동 메트릭 주기적 업데이트
        const metricsInterval = setInterval(() => {
            setBehaviorMetrics(emotionEngine$2.getBehaviorMetrics());
        }, 1000);
        return () => {
            unsubscribe();
            clearInterval(metricsInterval);
        };
    }, [autoSubscribe]);
    // 액션
    const setEmotion = require$$0.useCallback((emotion) => {
        emotionEngine$2.setEmotion(emotion);
    }, []);
    const analyzeText = require$$0.useCallback(async (text) => {
        return emotionEngine$2.analyzeText(text);
    }, []);
    // 상품 점수
    const getProductScore = require$$0.useCallback((productId) => {
        return emotionEngine$2.getProductScore(productId);
    }, []);
    const getProductScores = require$$0.useCallback((productIds) => {
        return emotionEngine$2.getProductScores(productIds);
    }, []);
    // 유틸리티
    const enable = require$$0.useCallback(() => {
        emotionEngine$2.enable();
    }, []);
    const disable = require$$0.useCallback(() => {
        emotionEngine$2.disable();
    }, []);
    // 파생 값
    const theme = require$$0.useMemo(() => emotionEngine$2.getTheme(), [state.emotion]);
    const isEnabled = emotionEngine$2.isEnabled();
    return {
        // 상태
        emotion: state.emotion,
        confidence: state.confidence,
        state,
        theme,
        // 액션
        setEmotion,
        analyzeText,
        // 상품 점수
        getProductScore,
        getProductScores,
        // 행동 분석
        behaviorMetrics,
        // 유틸리티
        isEnabled,
        enable,
        disable
    };
}
/**
 * useEmotionInit - SDK 초기화 훅
 *
 * @example
 * ```tsx
 * function App() {
 *   useEmotionInit({
 *     apiKey: 'your-api-key',
 *     trackBehavior: true,
 *     onEmotionChange: (state) => console.log('Emotion:', state.emotion)
 *   });
 *
 *   return <MyApp />;
 * }
 * ```
 */
function useEmotionInit(config) {
    require$$0.useEffect(() => {
        emotionEngine$2.init(config);
        return () => {
            emotionEngine$2.destroy();
        };
    }, [config.apiKey]); // apiKey 변경 시에만 재초기화
}
/**
 * useEmotionTheme - 테마만 사용하는 경량 훅
 */
function useEmotionTheme() {
    const [theme, setTheme] = require$$0.useState(emotionEngine$2.getTheme());
    require$$0.useEffect(() => {
        const unsubscribe = emotionEngine$2.subscribe((state) => {
            setTheme(emotionEngine$2.getTheme());
        });
        return unsubscribe;
    }, []);
    return theme;
}
/**
 * useProductEmotionScore - 특정 상품의 감정 점수 훅
 */
function useProductEmotionScore(productId) {
    const [score, setScore] = require$$0.useState({
        productId,
        score: 0.5,
        matchReason: '',
        emotionTags: []
    });
    require$$0.useEffect(() => {
        const unsubscribe = emotionEngine$2.subscribe(() => {
            const scores = emotionEngine$2.getProductScores([productId]);
            if (scores.length > 0) {
                setScore(scores[0]);
            }
        });
        // 초기값 설정
        const initialScores = emotionEngine$2.getProductScores([productId]);
        if (initialScores.length > 0) {
            setScore(initialScores[0]);
        }
        return unsubscribe;
    }, [productId]);
    return {
        score: score.score,
        matchReason: score.matchReason,
        emotionTags: score.emotionTags
    };
}

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production_min = {};

/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_production_min;

function requireReactJsxRuntime_production_min () {
	if (hasRequiredReactJsxRuntime_production_min) return reactJsxRuntime_production_min;
	hasRequiredReactJsxRuntime_production_min = 1;
var f=require$$0,k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:true,ref:true,__self:true,__source:true};
	function q(c,a,g){var b,d={},e=null,h=null;void 0!==g&&(e=""+g);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(h=a.ref);for(b in a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a) void 0===d[b]&&(d[b]=a[b]);return {$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}reactJsxRuntime_production_min.Fragment=l;reactJsxRuntime_production_min.jsx=q;reactJsxRuntime_production_min.jsxs=q;
	return reactJsxRuntime_production_min;
}

var reactJsxRuntime_development = {};

/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_development;

function requireReactJsxRuntime_development () {
	if (hasRequiredReactJsxRuntime_development) return reactJsxRuntime_development;
	hasRequiredReactJsxRuntime_development = 1;

	if (process.env.NODE_ENV !== "production") {
	  (function() {

	var React = require$$0;

	// ATTENTION
	// When adding new symbols to this file,
	// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
	// The Symbol used to tag the ReactElement-like types.
	var REACT_ELEMENT_TYPE = Symbol.for('react.element');
	var REACT_PORTAL_TYPE = Symbol.for('react.portal');
	var REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
	var REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode');
	var REACT_PROFILER_TYPE = Symbol.for('react.profiler');
	var REACT_PROVIDER_TYPE = Symbol.for('react.provider');
	var REACT_CONTEXT_TYPE = Symbol.for('react.context');
	var REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
	var REACT_SUSPENSE_TYPE = Symbol.for('react.suspense');
	var REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list');
	var REACT_MEMO_TYPE = Symbol.for('react.memo');
	var REACT_LAZY_TYPE = Symbol.for('react.lazy');
	var REACT_OFFSCREEN_TYPE = Symbol.for('react.offscreen');
	var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
	var FAUX_ITERATOR_SYMBOL = '@@iterator';
	function getIteratorFn(maybeIterable) {
	  if (maybeIterable === null || typeof maybeIterable !== 'object') {
	    return null;
	  }

	  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

	  if (typeof maybeIterator === 'function') {
	    return maybeIterator;
	  }

	  return null;
	}

	var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

	function error(format) {
	  {
	    {
	      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	        args[_key2 - 1] = arguments[_key2];
	      }

	      printWarning('error', format, args);
	    }
	  }
	}

	function printWarning(level, format, args) {
	  // When changing this logic, you might want to also
	  // update consoleWithStackDev.www.js as well.
	  {
	    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
	    var stack = ReactDebugCurrentFrame.getStackAddendum();

	    if (stack !== '') {
	      format += '%s';
	      args = args.concat([stack]);
	    } // eslint-disable-next-line react-internal/safe-string-coercion


	    var argsWithFormat = args.map(function (item) {
	      return String(item);
	    }); // Careful: RN currently depends on this prefix

	    argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
	    // breaks IE9: https://github.com/facebook/react/issues/13610
	    // eslint-disable-next-line react-internal/no-production-logging

	    Function.prototype.apply.call(console[level], console, argsWithFormat);
	  }
	}

	// -----------------------------------------------------------------------------

	var enableScopeAPI = false; // Experimental Create Event Handle API.
	var enableCacheElement = false;
	var enableTransitionTracing = false; // No known bugs, but needs performance testing

	var enableLegacyHidden = false; // Enables unstable_avoidThisFallback feature in Fiber
	// stuff. Intended to enable React core members to more easily debug scheduling
	// issues in DEV builds.

	var enableDebugTracing = false; // Track which Fiber(s) schedule render work.

	var REACT_MODULE_REFERENCE;

	{
	  REACT_MODULE_REFERENCE = Symbol.for('react.module.reference');
	}

	function isValidElementType(type) {
	  if (typeof type === 'string' || typeof type === 'function') {
	    return true;
	  } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).


	  if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing  || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden  || type === REACT_OFFSCREEN_TYPE || enableScopeAPI  || enableCacheElement  || enableTransitionTracing ) {
	    return true;
	  }

	  if (typeof type === 'object' && type !== null) {
	    if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
	    // types supported by any Flight configuration anywhere since
	    // we don't know which Flight build this will end up being used
	    // with.
	    type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== undefined) {
	      return true;
	    }
	  }

	  return false;
	}

	function getWrappedName(outerType, innerType, wrapperName) {
	  var displayName = outerType.displayName;

	  if (displayName) {
	    return displayName;
	  }

	  var functionName = innerType.displayName || innerType.name || '';
	  return functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName;
	} // Keep in sync with react-reconciler/getComponentNameFromFiber


	function getContextName(type) {
	  return type.displayName || 'Context';
	} // Note that the reconciler package should generally prefer to use getComponentNameFromFiber() instead.


	function getComponentNameFromType(type) {
	  if (type == null) {
	    // Host root, text node or just invalid type.
	    return null;
	  }

	  {
	    if (typeof type.tag === 'number') {
	      error('Received an unexpected object in getComponentNameFromType(). ' + 'This is likely a bug in React. Please file an issue.');
	    }
	  }

	  if (typeof type === 'function') {
	    return type.displayName || type.name || null;
	  }

	  if (typeof type === 'string') {
	    return type;
	  }

	  switch (type) {
	    case REACT_FRAGMENT_TYPE:
	      return 'Fragment';

	    case REACT_PORTAL_TYPE:
	      return 'Portal';

	    case REACT_PROFILER_TYPE:
	      return 'Profiler';

	    case REACT_STRICT_MODE_TYPE:
	      return 'StrictMode';

	    case REACT_SUSPENSE_TYPE:
	      return 'Suspense';

	    case REACT_SUSPENSE_LIST_TYPE:
	      return 'SuspenseList';

	  }

	  if (typeof type === 'object') {
	    switch (type.$$typeof) {
	      case REACT_CONTEXT_TYPE:
	        var context = type;
	        return getContextName(context) + '.Consumer';

	      case REACT_PROVIDER_TYPE:
	        var provider = type;
	        return getContextName(provider._context) + '.Provider';

	      case REACT_FORWARD_REF_TYPE:
	        return getWrappedName(type, type.render, 'ForwardRef');

	      case REACT_MEMO_TYPE:
	        var outerName = type.displayName || null;

	        if (outerName !== null) {
	          return outerName;
	        }

	        return getComponentNameFromType(type.type) || 'Memo';

	      case REACT_LAZY_TYPE:
	        {
	          var lazyComponent = type;
	          var payload = lazyComponent._payload;
	          var init = lazyComponent._init;

	          try {
	            return getComponentNameFromType(init(payload));
	          } catch (x) {
	            return null;
	          }
	        }

	      // eslint-disable-next-line no-fallthrough
	    }
	  }

	  return null;
	}

	var assign = Object.assign;

	// Helpers to patch console.logs to avoid logging during side-effect free
	// replaying on render function. This currently only patches the object
	// lazily which won't cover if the log function was extracted eagerly.
	// We could also eagerly patch the method.
	var disabledDepth = 0;
	var prevLog;
	var prevInfo;
	var prevWarn;
	var prevError;
	var prevGroup;
	var prevGroupCollapsed;
	var prevGroupEnd;

	function disabledLog() {}

	disabledLog.__reactDisabledLog = true;
	function disableLogs() {
	  {
	    if (disabledDepth === 0) {
	      /* eslint-disable react-internal/no-production-logging */
	      prevLog = console.log;
	      prevInfo = console.info;
	      prevWarn = console.warn;
	      prevError = console.error;
	      prevGroup = console.group;
	      prevGroupCollapsed = console.groupCollapsed;
	      prevGroupEnd = console.groupEnd; // https://github.com/facebook/react/issues/19099

	      var props = {
	        configurable: true,
	        enumerable: true,
	        value: disabledLog,
	        writable: true
	      }; // $FlowFixMe Flow thinks console is immutable.

	      Object.defineProperties(console, {
	        info: props,
	        log: props,
	        warn: props,
	        error: props,
	        group: props,
	        groupCollapsed: props,
	        groupEnd: props
	      });
	      /* eslint-enable react-internal/no-production-logging */
	    }

	    disabledDepth++;
	  }
	}
	function reenableLogs() {
	  {
	    disabledDepth--;

	    if (disabledDepth === 0) {
	      /* eslint-disable react-internal/no-production-logging */
	      var props = {
	        configurable: true,
	        enumerable: true,
	        writable: true
	      }; // $FlowFixMe Flow thinks console is immutable.

	      Object.defineProperties(console, {
	        log: assign({}, props, {
	          value: prevLog
	        }),
	        info: assign({}, props, {
	          value: prevInfo
	        }),
	        warn: assign({}, props, {
	          value: prevWarn
	        }),
	        error: assign({}, props, {
	          value: prevError
	        }),
	        group: assign({}, props, {
	          value: prevGroup
	        }),
	        groupCollapsed: assign({}, props, {
	          value: prevGroupCollapsed
	        }),
	        groupEnd: assign({}, props, {
	          value: prevGroupEnd
	        })
	      });
	      /* eslint-enable react-internal/no-production-logging */
	    }

	    if (disabledDepth < 0) {
	      error('disabledDepth fell below zero. ' + 'This is a bug in React. Please file an issue.');
	    }
	  }
	}

	var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
	var prefix;
	function describeBuiltInComponentFrame(name, source, ownerFn) {
	  {
	    if (prefix === undefined) {
	      // Extract the VM specific prefix used by each line.
	      try {
	        throw Error();
	      } catch (x) {
	        var match = x.stack.trim().match(/\n( *(at )?)/);
	        prefix = match && match[1] || '';
	      }
	    } // We use the prefix to ensure our stacks line up with native stack frames.


	    return '\n' + prefix + name;
	  }
	}
	var reentry = false;
	var componentFrameCache;

	{
	  var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;
	  componentFrameCache = new PossiblyWeakMap();
	}

	function describeNativeComponentFrame(fn, construct) {
	  // If something asked for a stack inside a fake render, it should get ignored.
	  if ( !fn || reentry) {
	    return '';
	  }

	  {
	    var frame = componentFrameCache.get(fn);

	    if (frame !== undefined) {
	      return frame;
	    }
	  }

	  var control;
	  reentry = true;
	  var previousPrepareStackTrace = Error.prepareStackTrace; // $FlowFixMe It does accept undefined.

	  Error.prepareStackTrace = undefined;
	  var previousDispatcher;

	  {
	    previousDispatcher = ReactCurrentDispatcher.current; // Set the dispatcher in DEV because this might be call in the render function
	    // for warnings.

	    ReactCurrentDispatcher.current = null;
	    disableLogs();
	  }

	  try {
	    // This should throw.
	    if (construct) {
	      // Something should be setting the props in the constructor.
	      var Fake = function () {
	        throw Error();
	      }; // $FlowFixMe


	      Object.defineProperty(Fake.prototype, 'props', {
	        set: function () {
	          // We use a throwing setter instead of frozen or non-writable props
	          // because that won't throw in a non-strict mode function.
	          throw Error();
	        }
	      });

	      if (typeof Reflect === 'object' && Reflect.construct) {
	        // We construct a different control for this case to include any extra
	        // frames added by the construct call.
	        try {
	          Reflect.construct(Fake, []);
	        } catch (x) {
	          control = x;
	        }

	        Reflect.construct(fn, [], Fake);
	      } else {
	        try {
	          Fake.call();
	        } catch (x) {
	          control = x;
	        }

	        fn.call(Fake.prototype);
	      }
	    } else {
	      try {
	        throw Error();
	      } catch (x) {
	        control = x;
	      }

	      fn();
	    }
	  } catch (sample) {
	    // This is inlined manually because closure doesn't do it for us.
	    if (sample && control && typeof sample.stack === 'string') {
	      // This extracts the first frame from the sample that isn't also in the control.
	      // Skipping one frame that we assume is the frame that calls the two.
	      var sampleLines = sample.stack.split('\n');
	      var controlLines = control.stack.split('\n');
	      var s = sampleLines.length - 1;
	      var c = controlLines.length - 1;

	      while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
	        // We expect at least one stack frame to be shared.
	        // Typically this will be the root most one. However, stack frames may be
	        // cut off due to maximum stack limits. In this case, one maybe cut off
	        // earlier than the other. We assume that the sample is longer or the same
	        // and there for cut off earlier. So we should find the root most frame in
	        // the sample somewhere in the control.
	        c--;
	      }

	      for (; s >= 1 && c >= 0; s--, c--) {
	        // Next we find the first one that isn't the same which should be the
	        // frame that called our sample function and the control.
	        if (sampleLines[s] !== controlLines[c]) {
	          // In V8, the first line is describing the message but other VMs don't.
	          // If we're about to return the first line, and the control is also on the same
	          // line, that's a pretty good indicator that our sample threw at same line as
	          // the control. I.e. before we entered the sample frame. So we ignore this result.
	          // This can happen if you passed a class to function component, or non-function.
	          if (s !== 1 || c !== 1) {
	            do {
	              s--;
	              c--; // We may still have similar intermediate frames from the construct call.
	              // The next one that isn't the same should be our match though.

	              if (c < 0 || sampleLines[s] !== controlLines[c]) {
	                // V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
	                var _frame = '\n' + sampleLines[s].replace(' at new ', ' at '); // If our component frame is labeled "<anonymous>"
	                // but we have a user-provided "displayName"
	                // splice it in to make the stack more readable.


	                if (fn.displayName && _frame.includes('<anonymous>')) {
	                  _frame = _frame.replace('<anonymous>', fn.displayName);
	                }

	                {
	                  if (typeof fn === 'function') {
	                    componentFrameCache.set(fn, _frame);
	                  }
	                } // Return the line we found.


	                return _frame;
	              }
	            } while (s >= 1 && c >= 0);
	          }

	          break;
	        }
	      }
	    }
	  } finally {
	    reentry = false;

	    {
	      ReactCurrentDispatcher.current = previousDispatcher;
	      reenableLogs();
	    }

	    Error.prepareStackTrace = previousPrepareStackTrace;
	  } // Fallback to just using the name if we couldn't make it throw.


	  var name = fn ? fn.displayName || fn.name : '';
	  var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';

	  {
	    if (typeof fn === 'function') {
	      componentFrameCache.set(fn, syntheticFrame);
	    }
	  }

	  return syntheticFrame;
	}
	function describeFunctionComponentFrame(fn, source, ownerFn) {
	  {
	    return describeNativeComponentFrame(fn, false);
	  }
	}

	function shouldConstruct(Component) {
	  var prototype = Component.prototype;
	  return !!(prototype && prototype.isReactComponent);
	}

	function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {

	  if (type == null) {
	    return '';
	  }

	  if (typeof type === 'function') {
	    {
	      return describeNativeComponentFrame(type, shouldConstruct(type));
	    }
	  }

	  if (typeof type === 'string') {
	    return describeBuiltInComponentFrame(type);
	  }

	  switch (type) {
	    case REACT_SUSPENSE_TYPE:
	      return describeBuiltInComponentFrame('Suspense');

	    case REACT_SUSPENSE_LIST_TYPE:
	      return describeBuiltInComponentFrame('SuspenseList');
	  }

	  if (typeof type === 'object') {
	    switch (type.$$typeof) {
	      case REACT_FORWARD_REF_TYPE:
	        return describeFunctionComponentFrame(type.render);

	      case REACT_MEMO_TYPE:
	        // Memo may contain any component type so we recursively resolve it.
	        return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);

	      case REACT_LAZY_TYPE:
	        {
	          var lazyComponent = type;
	          var payload = lazyComponent._payload;
	          var init = lazyComponent._init;

	          try {
	            // Lazy may contain any component type so we recursively resolve it.
	            return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
	          } catch (x) {}
	        }
	    }
	  }

	  return '';
	}

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	var loggedTypeFailures = {};
	var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;

	function setCurrentlyValidatingElement(element) {
	  {
	    if (element) {
	      var owner = element._owner;
	      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
	      ReactDebugCurrentFrame.setExtraStackFrame(stack);
	    } else {
	      ReactDebugCurrentFrame.setExtraStackFrame(null);
	    }
	  }
	}

	function checkPropTypes(typeSpecs, values, location, componentName, element) {
	  {
	    // $FlowFixMe This is okay but Flow doesn't know it.
	    var has = Function.call.bind(hasOwnProperty);

	    for (var typeSpecName in typeSpecs) {
	      if (has(typeSpecs, typeSpecName)) {
	        var error$1 = void 0; // Prop type validation may throw. In case they do, we don't want to
	        // fail the render phase where it didn't fail before. So we log it.
	        // After these have been cleaned up, we'll let them throw.

	        try {
	          // This is intentionally an invariant that gets caught. It's the same
	          // behavior as without this statement except with a better message.
	          if (typeof typeSpecs[typeSpecName] !== 'function') {
	            // eslint-disable-next-line react-internal/prod-error-codes
	            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
	            err.name = 'Invariant Violation';
	            throw err;
	          }

	          error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
	        } catch (ex) {
	          error$1 = ex;
	        }

	        if (error$1 && !(error$1 instanceof Error)) {
	          setCurrentlyValidatingElement(element);

	          error('%s: type specification of %s' + ' `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error$1);

	          setCurrentlyValidatingElement(null);
	        }

	        if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
	          // Only monitor this failure once because there tends to be a lot of the
	          // same error.
	          loggedTypeFailures[error$1.message] = true;
	          setCurrentlyValidatingElement(element);

	          error('Failed %s type: %s', location, error$1.message);

	          setCurrentlyValidatingElement(null);
	        }
	      }
	    }
	  }
	}

	var isArrayImpl = Array.isArray; // eslint-disable-next-line no-redeclare

	function isArray(a) {
	  return isArrayImpl(a);
	}

	/*
	 * The `'' + value` pattern (used in in perf-sensitive code) throws for Symbol
	 * and Temporal.* types. See https://github.com/facebook/react/pull/22064.
	 *
	 * The functions in this module will throw an easier-to-understand,
	 * easier-to-debug exception with a clear errors message message explaining the
	 * problem. (Instead of a confusing exception thrown inside the implementation
	 * of the `value` object).
	 */
	// $FlowFixMe only called in DEV, so void return is not possible.
	function typeName(value) {
	  {
	    // toStringTag is needed for namespaced types like Temporal.Instant
	    var hasToStringTag = typeof Symbol === 'function' && Symbol.toStringTag;
	    var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || 'Object';
	    return type;
	  }
	} // $FlowFixMe only called in DEV, so void return is not possible.


	function willCoercionThrow(value) {
	  {
	    try {
	      testStringCoercion(value);
	      return false;
	    } catch (e) {
	      return true;
	    }
	  }
	}

	function testStringCoercion(value) {
	  // If you ended up here by following an exception call stack, here's what's
	  // happened: you supplied an object or symbol value to React (as a prop, key,
	  // DOM attribute, CSS property, string ref, etc.) and when React tried to
	  // coerce it to a string using `'' + value`, an exception was thrown.
	  //
	  // The most common types that will cause this exception are `Symbol` instances
	  // and Temporal objects like `Temporal.Instant`. But any object that has a
	  // `valueOf` or `[Symbol.toPrimitive]` method that throws will also cause this
	  // exception. (Library authors do this to prevent users from using built-in
	  // numeric operators like `+` or comparison operators like `>=` because custom
	  // methods are needed to perform accurate arithmetic or comparison.)
	  //
	  // To fix the problem, coerce this object or symbol value to a string before
	  // passing it to React. The most reliable way is usually `String(value)`.
	  //
	  // To find which value is throwing, check the browser or debugger console.
	  // Before this exception was thrown, there should be `console.error` output
	  // that shows the type (Symbol, Temporal.PlainDate, etc.) that caused the
	  // problem and how that type was used: key, atrribute, input value prop, etc.
	  // In most cases, this console output also shows the component and its
	  // ancestor components where the exception happened.
	  //
	  // eslint-disable-next-line react-internal/safe-string-coercion
	  return '' + value;
	}
	function checkKeyStringCoercion(value) {
	  {
	    if (willCoercionThrow(value)) {
	      error('The provided key is an unsupported type %s.' + ' This value must be coerced to a string before before using it here.', typeName(value));

	      return testStringCoercion(value); // throw (to help callers find troubleshooting comments)
	    }
	  }
	}

	var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
	var RESERVED_PROPS = {
	  key: true,
	  ref: true,
	  __self: true,
	  __source: true
	};
	var specialPropKeyWarningShown;
	var specialPropRefWarningShown;

	function hasValidRef(config) {
	  {
	    if (hasOwnProperty.call(config, 'ref')) {
	      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;

	      if (getter && getter.isReactWarning) {
	        return false;
	      }
	    }
	  }

	  return config.ref !== undefined;
	}

	function hasValidKey(config) {
	  {
	    if (hasOwnProperty.call(config, 'key')) {
	      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;

	      if (getter && getter.isReactWarning) {
	        return false;
	      }
	    }
	  }

	  return config.key !== undefined;
	}

	function warnIfStringRefCannotBeAutoConverted(config, self) {
	  {
	    if (typeof config.ref === 'string' && ReactCurrentOwner.current && self) ;
	  }
	}

	function defineKeyPropWarningGetter(props, displayName) {
	  {
	    var warnAboutAccessingKey = function () {
	      if (!specialPropKeyWarningShown) {
	        specialPropKeyWarningShown = true;

	        error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
	      }
	    };

	    warnAboutAccessingKey.isReactWarning = true;
	    Object.defineProperty(props, 'key', {
	      get: warnAboutAccessingKey,
	      configurable: true
	    });
	  }
	}

	function defineRefPropWarningGetter(props, displayName) {
	  {
	    var warnAboutAccessingRef = function () {
	      if (!specialPropRefWarningShown) {
	        specialPropRefWarningShown = true;

	        error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
	      }
	    };

	    warnAboutAccessingRef.isReactWarning = true;
	    Object.defineProperty(props, 'ref', {
	      get: warnAboutAccessingRef,
	      configurable: true
	    });
	  }
	}
	/**
	 * Factory method to create a new React element. This no longer adheres to
	 * the class pattern, so do not use new to call it. Also, instanceof check
	 * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
	 * if something is a React Element.
	 *
	 * @param {*} type
	 * @param {*} props
	 * @param {*} key
	 * @param {string|object} ref
	 * @param {*} owner
	 * @param {*} self A *temporary* helper to detect places where `this` is
	 * different from the `owner` when React.createElement is called, so that we
	 * can warn. We want to get rid of owner and replace string `ref`s with arrow
	 * functions, and as long as `this` and owner are the same, there will be no
	 * change in behavior.
	 * @param {*} source An annotation object (added by a transpiler or otherwise)
	 * indicating filename, line number, and/or other information.
	 * @internal
	 */


	var ReactElement = function (type, key, ref, self, source, owner, props) {
	  var element = {
	    // This tag allows us to uniquely identify this as a React Element
	    $$typeof: REACT_ELEMENT_TYPE,
	    // Built-in properties that belong on the element
	    type: type,
	    key: key,
	    ref: ref,
	    props: props,
	    // Record the component responsible for creating this element.
	    _owner: owner
	  };

	  {
	    // The validation flag is currently mutative. We put it on
	    // an external backing store so that we can freeze the whole object.
	    // This can be replaced with a WeakMap once they are implemented in
	    // commonly used development environments.
	    element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
	    // the validation flag non-enumerable (where possible, which should
	    // include every environment we run tests in), so the test framework
	    // ignores it.

	    Object.defineProperty(element._store, 'validated', {
	      configurable: false,
	      enumerable: false,
	      writable: true,
	      value: false
	    }); // self and source are DEV only properties.

	    Object.defineProperty(element, '_self', {
	      configurable: false,
	      enumerable: false,
	      writable: false,
	      value: self
	    }); // Two elements created in two different places should be considered
	    // equal for testing purposes and therefore we hide it from enumeration.

	    Object.defineProperty(element, '_source', {
	      configurable: false,
	      enumerable: false,
	      writable: false,
	      value: source
	    });

	    if (Object.freeze) {
	      Object.freeze(element.props);
	      Object.freeze(element);
	    }
	  }

	  return element;
	};
	/**
	 * https://github.com/reactjs/rfcs/pull/107
	 * @param {*} type
	 * @param {object} props
	 * @param {string} key
	 */

	function jsxDEV(type, config, maybeKey, source, self) {
	  {
	    var propName; // Reserved names are extracted

	    var props = {};
	    var key = null;
	    var ref = null; // Currently, key can be spread in as a prop. This causes a potential
	    // issue if key is also explicitly declared (ie. <div {...props} key="Hi" />
	    // or <div key="Hi" {...props} /> ). We want to deprecate key spread,
	    // but as an intermediary step, we will use jsxDEV for everything except
	    // <div {...props} key="Hi" />, because we aren't currently able to tell if
	    // key is explicitly declared to be undefined or not.

	    if (maybeKey !== undefined) {
	      {
	        checkKeyStringCoercion(maybeKey);
	      }

	      key = '' + maybeKey;
	    }

	    if (hasValidKey(config)) {
	      {
	        checkKeyStringCoercion(config.key);
	      }

	      key = '' + config.key;
	    }

	    if (hasValidRef(config)) {
	      ref = config.ref;
	      warnIfStringRefCannotBeAutoConverted(config, self);
	    } // Remaining properties are added to a new props object


	    for (propName in config) {
	      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
	        props[propName] = config[propName];
	      }
	    } // Resolve default props


	    if (type && type.defaultProps) {
	      var defaultProps = type.defaultProps;

	      for (propName in defaultProps) {
	        if (props[propName] === undefined) {
	          props[propName] = defaultProps[propName];
	        }
	      }
	    }

	    if (key || ref) {
	      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

	      if (key) {
	        defineKeyPropWarningGetter(props, displayName);
	      }

	      if (ref) {
	        defineRefPropWarningGetter(props, displayName);
	      }
	    }

	    return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
	  }
	}

	var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
	var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;

	function setCurrentlyValidatingElement$1(element) {
	  {
	    if (element) {
	      var owner = element._owner;
	      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
	      ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
	    } else {
	      ReactDebugCurrentFrame$1.setExtraStackFrame(null);
	    }
	  }
	}

	var propTypesMisspellWarningShown;

	{
	  propTypesMisspellWarningShown = false;
	}
	/**
	 * Verifies the object is a ReactElement.
	 * See https://reactjs.org/docs/react-api.html#isvalidelement
	 * @param {?object} object
	 * @return {boolean} True if `object` is a ReactElement.
	 * @final
	 */


	function isValidElement(object) {
	  {
	    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
	  }
	}

	function getDeclarationErrorAddendum() {
	  {
	    if (ReactCurrentOwner$1.current) {
	      var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);

	      if (name) {
	        return '\n\nCheck the render method of `' + name + '`.';
	      }
	    }

	    return '';
	  }
	}

	function getSourceInfoErrorAddendum(source) {
	  {

	    return '';
	  }
	}
	/**
	 * Warn if there's no key explicitly set on dynamic arrays of children or
	 * object keys are not valid. This allows us to keep track of children between
	 * updates.
	 */


	var ownerHasKeyUseWarning = {};

	function getCurrentComponentErrorInfo(parentType) {
	  {
	    var info = getDeclarationErrorAddendum();

	    if (!info) {
	      var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;

	      if (parentName) {
	        info = "\n\nCheck the top-level render call using <" + parentName + ">.";
	      }
	    }

	    return info;
	  }
	}
	/**
	 * Warn if the element doesn't have an explicit key assigned to it.
	 * This element is in an array. The array could grow and shrink or be
	 * reordered. All children that haven't already been validated are required to
	 * have a "key" property assigned to it. Error statuses are cached so a warning
	 * will only be shown once.
	 *
	 * @internal
	 * @param {ReactElement} element Element that requires a key.
	 * @param {*} parentType element's parent's type.
	 */


	function validateExplicitKey(element, parentType) {
	  {
	    if (!element._store || element._store.validated || element.key != null) {
	      return;
	    }

	    element._store.validated = true;
	    var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

	    if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
	      return;
	    }

	    ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
	    // property, it may be the creator of the child that's responsible for
	    // assigning it a key.

	    var childOwner = '';

	    if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
	      // Give the component that originally created this child.
	      childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
	    }

	    setCurrentlyValidatingElement$1(element);

	    error('Each child in a list should have a unique "key" prop.' + '%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);

	    setCurrentlyValidatingElement$1(null);
	  }
	}
	/**
	 * Ensure that every element either is passed in a static location, in an
	 * array with an explicit keys property defined, or in an object literal
	 * with valid key property.
	 *
	 * @internal
	 * @param {ReactNode} node Statically passed child of any type.
	 * @param {*} parentType node's parent's type.
	 */


	function validateChildKeys(node, parentType) {
	  {
	    if (typeof node !== 'object') {
	      return;
	    }

	    if (isArray(node)) {
	      for (var i = 0; i < node.length; i++) {
	        var child = node[i];

	        if (isValidElement(child)) {
	          validateExplicitKey(child, parentType);
	        }
	      }
	    } else if (isValidElement(node)) {
	      // This element was passed in a valid location.
	      if (node._store) {
	        node._store.validated = true;
	      }
	    } else if (node) {
	      var iteratorFn = getIteratorFn(node);

	      if (typeof iteratorFn === 'function') {
	        // Entry iterators used to provide implicit keys,
	        // but now we print a separate warning for them later.
	        if (iteratorFn !== node.entries) {
	          var iterator = iteratorFn.call(node);
	          var step;

	          while (!(step = iterator.next()).done) {
	            if (isValidElement(step.value)) {
	              validateExplicitKey(step.value, parentType);
	            }
	          }
	        }
	      }
	    }
	  }
	}
	/**
	 * Given an element, validate that its props follow the propTypes definition,
	 * provided by the type.
	 *
	 * @param {ReactElement} element
	 */


	function validatePropTypes(element) {
	  {
	    var type = element.type;

	    if (type === null || type === undefined || typeof type === 'string') {
	      return;
	    }

	    var propTypes;

	    if (typeof type === 'function') {
	      propTypes = type.propTypes;
	    } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
	    // Inner props are checked in the reconciler.
	    type.$$typeof === REACT_MEMO_TYPE)) {
	      propTypes = type.propTypes;
	    } else {
	      return;
	    }

	    if (propTypes) {
	      // Intentionally inside to avoid triggering lazy initializers:
	      var name = getComponentNameFromType(type);
	      checkPropTypes(propTypes, element.props, 'prop', name, element);
	    } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
	      propTypesMisspellWarningShown = true; // Intentionally inside to avoid triggering lazy initializers:

	      var _name = getComponentNameFromType(type);

	      error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', _name || 'Unknown');
	    }

	    if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
	      error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
	    }
	  }
	}
	/**
	 * Given a fragment, validate that it can only be provided with fragment props
	 * @param {ReactElement} fragment
	 */


	function validateFragmentProps(fragment) {
	  {
	    var keys = Object.keys(fragment.props);

	    for (var i = 0; i < keys.length; i++) {
	      var key = keys[i];

	      if (key !== 'children' && key !== 'key') {
	        setCurrentlyValidatingElement$1(fragment);

	        error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);

	        setCurrentlyValidatingElement$1(null);
	        break;
	      }
	    }

	    if (fragment.ref !== null) {
	      setCurrentlyValidatingElement$1(fragment);

	      error('Invalid attribute `ref` supplied to `React.Fragment`.');

	      setCurrentlyValidatingElement$1(null);
	    }
	  }
	}

	var didWarnAboutKeySpread = {};
	function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
	  {
	    var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
	    // succeed and there will likely be errors in render.

	    if (!validType) {
	      var info = '';

	      if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
	        info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
	      }

	      var sourceInfo = getSourceInfoErrorAddendum();

	      if (sourceInfo) {
	        info += sourceInfo;
	      } else {
	        info += getDeclarationErrorAddendum();
	      }

	      var typeString;

	      if (type === null) {
	        typeString = 'null';
	      } else if (isArray(type)) {
	        typeString = 'array';
	      } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
	        typeString = "<" + (getComponentNameFromType(type.type) || 'Unknown') + " />";
	        info = ' Did you accidentally export a JSX literal instead of a component?';
	      } else {
	        typeString = typeof type;
	      }

	      error('React.jsx: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
	    }

	    var element = jsxDEV(type, props, key, source, self); // The result can be nullish if a mock or a custom function is used.
	    // TODO: Drop this when these are no longer allowed as the type argument.

	    if (element == null) {
	      return element;
	    } // Skip key warning if the type isn't valid since our key validation logic
	    // doesn't expect a non-string/function type and can throw confusing errors.
	    // We don't want exception behavior to differ between dev and prod.
	    // (Rendering will throw with a helpful message and as soon as the type is
	    // fixed, the key warnings will appear.)


	    if (validType) {
	      var children = props.children;

	      if (children !== undefined) {
	        if (isStaticChildren) {
	          if (isArray(children)) {
	            for (var i = 0; i < children.length; i++) {
	              validateChildKeys(children[i], type);
	            }

	            if (Object.freeze) {
	              Object.freeze(children);
	            }
	          } else {
	            error('React.jsx: Static children should always be an array. ' + 'You are likely explicitly calling React.jsxs or React.jsxDEV. ' + 'Use the Babel transform instead.');
	          }
	        } else {
	          validateChildKeys(children, type);
	        }
	      }
	    }

	    {
	      if (hasOwnProperty.call(props, 'key')) {
	        var componentName = getComponentNameFromType(type);
	        var keys = Object.keys(props).filter(function (k) {
	          return k !== 'key';
	        });
	        var beforeExample = keys.length > 0 ? '{key: someKey, ' + keys.join(': ..., ') + ': ...}' : '{key: someKey}';

	        if (!didWarnAboutKeySpread[componentName + beforeExample]) {
	          var afterExample = keys.length > 0 ? '{' + keys.join(': ..., ') + ': ...}' : '{}';

	          error('A props object containing a "key" prop is being spread into JSX:\n' + '  let props = %s;\n' + '  <%s {...props} />\n' + 'React keys must be passed directly to JSX without using spread:\n' + '  let props = %s;\n' + '  <%s key={someKey} {...props} />', beforeExample, componentName, afterExample, componentName);

	          didWarnAboutKeySpread[componentName + beforeExample] = true;
	        }
	      }
	    }

	    if (type === REACT_FRAGMENT_TYPE) {
	      validateFragmentProps(element);
	    } else {
	      validatePropTypes(element);
	    }

	    return element;
	  }
	} // These two functions exist to still get child warnings in dev
	// even with the prod transform. This means that jsxDEV is purely
	// opt-in behavior for better messages but that we won't stop
	// giving you warnings if you use production apis.

	function jsxWithValidationStatic(type, props, key) {
	  {
	    return jsxWithValidation(type, props, key, true);
	  }
	}
	function jsxWithValidationDynamic(type, props, key) {
	  {
	    return jsxWithValidation(type, props, key, false);
	  }
	}

	var jsx =  jsxWithValidationDynamic ; // we may want to special case jsxs internally to take advantage of static children.
	// for now we can ship identical prod functions

	var jsxs =  jsxWithValidationStatic ;

	reactJsxRuntime_development.Fragment = REACT_FRAGMENT_TYPE;
	reactJsxRuntime_development.jsx = jsx;
	reactJsxRuntime_development.jsxs = jsxs;
	  })();
	}
	return reactJsxRuntime_development;
}

if (process.env.NODE_ENV === 'production') {
  jsxRuntime.exports = requireReactJsxRuntime_production_min();
} else {
  jsxRuntime.exports = requireReactJsxRuntime_development();
}

var jsxRuntimeExports = jsxRuntime.exports;

// 감정별 이모지 (Lucide 아이콘 대신 이모지 사용)
const EMOTION_EMOJI = {
    neutral: '🍃',
    happy: '☀️',
    excited: '✨',
    stressed: '⚡',
    anxious: '💨',
    sad: '🌧️',
    anger: '🔥',
    fear: '☂️',
    surprise: '⭐',
    meditation: '🌸',
    fatigue: '🌙',
    depression: '🌫️'
};
/**
 * EmotionPulse - 감정 펄스 인디케이터
 */
const EmotionPulse = ({ emotion = 'neutral', confidence = 0.5, source = 'auto', size = 'md', position = 'bottom-right', showConfidence = true, onClick, onExpand, onSelectEmotion, className = '', animated = true }) => {
    const [isExpanded, setIsExpanded] = require$$0.useState(false);
    const [isPulsing, setIsPulsing] = require$$0.useState(false);
    const [prevEmotion, setPrevEmotion] = require$$0.useState(emotion);
    const [showTooltip, setShowTooltip] = require$$0.useState(false);
    // 감정 변경 시 펄스 애니메이션
    require$$0.useEffect(() => {
        if (emotion !== prevEmotion) {
            setIsPulsing(true);
            const timer = setTimeout(() => setIsPulsing(false), 1000);
            setPrevEmotion(emotion);
            return () => clearTimeout(timer);
        }
    }, [emotion, prevEmotion]);
    const theme = EMOTION_THEMES[emotion] || EMOTION_THEMES.neutral;
    const label = EMOTION_LABELS_KO[emotion] || '평온';
    const emoji = EMOTION_EMOJI[emotion] || '🍃';
    // 크기 설정
    const sizeClasses = {
        sm: 'w-12 h-12 text-lg',
        md: 'w-16 h-16 text-2xl',
        lg: 'w-20 h-20 text-3xl'
    };
    // 위치 설정
    const positionClasses = {
        'bottom-right': 'bottom-6 right-6',
        'bottom-left': 'bottom-6 left-6',
        'top-right': 'top-6 right-6',
        'top-left': 'top-6 left-6'
    };
    const handleClick = require$$0.useCallback(() => {
        if (onClick) {
            onClick();
        }
        else {
            setIsExpanded(!isExpanded);
            if (!isExpanded && onExpand) {
                onExpand();
            }
        }
    }, [onClick, isExpanded, onExpand]);
    const handleEmotionSelect = require$$0.useCallback((selectedEmotion) => {
        if (onSelectEmotion) {
            onSelectEmotion(selectedEmotion);
        }
        setIsExpanded(false);
    }, [onSelectEmotion]);
    return (jsxRuntimeExports.jsxs("div", { className: `fixed ${positionClasses[position]} z-50 ${className}`, style: { fontFamily: "'Pretendard', sans-serif" }, children: [isExpanded && (jsxRuntimeExports.jsxs("div", { className: "absolute bottom-full right-0 mb-3 p-4 rounded-2xl shadow-xl", style: {
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                    minWidth: '200px'
                }, children: [jsxRuntimeExports.jsxs("div", { className: "mb-4 pb-3 border-b border-gray-100", children: [jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-400 uppercase tracking-wider mb-1", children: "\uD604\uC7AC \uAC10\uC815" }), jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [jsxRuntimeExports.jsx("span", { className: "text-2xl", children: emoji }), jsxRuntimeExports.jsx("span", { className: "text-lg font-medium", style: { color: theme.text }, children: label })] }), showConfidence && (jsxRuntimeExports.jsxs("div", { className: "mt-2", children: [jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-gray-500 mb-1", children: [jsxRuntimeExports.jsx("span", { children: "\uC2E0\uB8B0\uB3C4" }), jsxRuntimeExports.jsxs("span", { children: [Math.round(confidence * 100), "%"] })] }), jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-gray-100 rounded-full overflow-hidden", children: jsxRuntimeExports.jsx("div", { className: "h-full rounded-full transition-all duration-500", style: {
                                                width: `${confidence * 100}%`,
                                                background: theme.accent
                                            } }) })] })), jsxRuntimeExports.jsx("div", { className: "mt-2 text-xs text-gray-400", children: source === 'manual' ? '수동 선택' :
                                    source === 'text' ? '텍스트 분석' :
                                        source === 'behavior' ? '행동 분석' :
                                            source === 'multimodal' ? '멀티모달 분석' : '자동 분석' })] }), onSelectEmotion && (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-400 uppercase tracking-wider mb-2", children: "\uC9C1\uC811 \uC120\uD0DD" }), jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2", children: Object.keys(EMOTION_EMOJI).map((em) => (jsxRuntimeExports.jsx("button", { onClick: () => handleEmotionSelect(em), className: `
                      p-2 rounded-lg text-xl transition-all duration-200
                      hover:scale-110 hover:shadow-md
                      ${emotion === em ? 'ring-2 ring-offset-1' : ''}
                    `, style: {
                                        background: emotion === em ? EMOTION_THEMES[em].background : 'transparent',
                                        ringColor: EMOTION_THEMES[em].accent
                                    }, title: EMOTION_LABELS_KO[em], children: EMOTION_EMOJI[em] }, em))) })] }))] })), showTooltip && !isExpanded && (jsxRuntimeExports.jsxs("div", { className: "absolute bottom-full right-0 mb-2 px-3 py-2 rounded-lg shadow-lg whitespace-nowrap", style: {
                    background: 'rgba(0, 0, 0, 0.85)',
                    backdropFilter: 'blur(10px)',
                    animation: 'fadeIn 0.2s ease-out'
                }, children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [jsxRuntimeExports.jsx("span", { className: "text-lg", children: emoji }), jsxRuntimeExports.jsxs("div", { className: "text-white", children: [jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: label }), jsxRuntimeExports.jsxs("div", { className: "text-xs opacity-75", children: [Math.round(confidence * 100), "% \uC2E0\uB8B0\uB3C4"] })] })] }), jsxRuntimeExports.jsx("div", { className: "absolute top-full right-4 w-0 h-0", style: {
                            borderLeft: '6px solid transparent',
                            borderRight: '6px solid transparent',
                            borderTop: '6px solid rgba(0, 0, 0, 0.85)'
                        } })] })), jsxRuntimeExports.jsx("button", { onClick: handleClick, onMouseEnter: () => setShowTooltip(true), onMouseLeave: () => setShowTooltip(false), className: `
          ${sizeClasses[size]}
          rounded-full shadow-lg
          flex items-center justify-center
          transition-all duration-500 ease-out
          hover:scale-105 hover:shadow-xl
          focus:outline-none focus:ring-2 focus:ring-offset-2
          ${animated && isPulsing ? 'animate-pulse-emotion' : ''}
        `, style: {
                    background: theme.gradient,
                    border: `2px solid ${theme.accent}`,
                    boxShadow: `0 4px 20px ${theme.accent}40`,
                    focusRingColor: theme.accent
                }, "aria-label": `현재 감정: ${label}`, children: jsxRuntimeExports.jsx("span", { className: isPulsing ? 'animate-bounce' : '', children: emoji }) }), showConfidence && !isExpanded && (jsxRuntimeExports.jsx("svg", { className: "absolute inset-0 -m-1 pointer-events-none", style: {
                    width: size === 'sm' ? 56 : size === 'md' ? 72 : 88,
                    height: size === 'sm' ? 56 : size === 'md' ? 72 : 88
                }, children: jsxRuntimeExports.jsx("circle", { cx: "50%", cy: "50%", r: "45%", fill: "none", stroke: theme.accent, strokeWidth: "2", strokeDasharray: `${confidence * 283} 283`, strokeLinecap: "round", transform: "rotate(-90 50 50)", className: "transition-all duration-1000", style: { opacity: 0.6 } }) })), jsxRuntimeExports.jsx("style", { children: `
        @keyframes pulse-emotion {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 4px 20px ${theme.accent}40;
          }
          50% {
            transform: scale(1.08);
            box-shadow: 0 8px 30px ${theme.accent}60;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-pulse-emotion {
          animation: pulse-emotion 1s cubic-bezier(0.4, 0, 0.6, 1);
        }
      ` })] }));
};

// 배지 타입별 라벨
const BADGE_LABELS = {
    forYou: { ko: '당신을 위한', en: 'FOR YOU' },
    moodLift: { ko: '기분 전환', en: 'MOOD LIFT' },
    calmDown: { ko: '마음 진정', en: 'CALM DOWN' },
    energyUp: { ko: '활력 충전', en: 'ENERGY UP' },
    comfort: { ko: '위로가 되는', en: 'COMFORT' },
    perfect: { ko: '완벽 매칭', en: 'PERFECT' }
};
// 감정별 배지 타입 매핑
const EMOTION_BADGE_TYPE = {
    neutral: 'forYou',
    happy: 'energyUp',
    excited: 'energyUp',
    stressed: 'calmDown',
    anxious: 'calmDown',
    sad: 'comfort',
    anger: 'calmDown',
    fear: 'comfort',
    surprise: 'forYou',
    meditation: 'calmDown',
    fatigue: 'energyUp',
    depression: 'moodLift'
};
/**
 * EmotionBadge - 상품 감정 매칭 배지
 */
const EmotionBadge = ({ emotion = 'neutral', score = 0.5, minScore = 0.6, variant = 'filled', language = 'ko', showScore = false, animated = true, className = '' }) => {
    // 최소 점수 미만이면 렌더링 안 함
    if (score < minScore) {
        return null;
    }
    const theme = EMOTION_THEMES[emotion] || EMOTION_THEMES.neutral;
    const badgeType = EMOTION_BADGE_TYPE[emotion];
    const label = BADGE_LABELS[badgeType];
    const emotionLabel = EMOTION_LABELS_KO[emotion];
    // 점수에 따른 배지 강조
    const isPerfect = score >= 0.9;
    const displayLabel = isPerfect ? BADGE_LABELS.perfect : label;
    // 변형별 스타일
    const variantStyles = require$$0.useMemo(() => {
        switch (variant) {
            case 'filled':
                return {
                    background: theme.accent,
                    color: '#FFFFFF',
                    border: 'none'
                };
            case 'outline':
                return {
                    background: 'transparent',
                    color: theme.accent,
                    border: `1.5px solid ${theme.accent}`
                };
            case 'subtle':
                return {
                    background: `${theme.accent}15`,
                    color: theme.accent,
                    border: 'none'
                };
            default:
                return {
                    background: theme.accent,
                    color: '#FFFFFF',
                    border: 'none'
                };
        }
    }, [variant, theme]);
    return (jsxRuntimeExports.jsxs("div", { className: `
        inline-flex flex-col items-start gap-0.5
        px-2.5 py-1.5 rounded-lg
        text-xs font-medium
        ${animated ? 'animate-badge-enter' : ''}
        ${className}
      `, style: {
            ...variantStyles,
            fontFamily: "'Pretendard', sans-serif",
            letterSpacing: '0.02em'
        }, children: [jsxRuntimeExports.jsx("span", { className: "uppercase tracking-wider text-[10px] opacity-80", children: language === 'ko' ? displayLabel.ko : displayLabel.en }), jsxRuntimeExports.jsx("span", { className: "font-semibold", children: emotionLabel }), showScore && (jsxRuntimeExports.jsxs("span", { className: "text-[9px] opacity-70 mt-0.5", children: [Math.round(score * 100), "% \uB9E4\uCE6D"] })), jsxRuntimeExports.jsx("style", { children: `
        @keyframes badge-enter {
          from {
            opacity: 0;
            transform: translateY(-8px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-badge-enter {
          animation: badge-enter 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      ` })] }));
};
/**
 * EmotionBadgeCompact - 컴팩트 버전 (아이콘만)
 */
const EmotionBadgeCompact = ({ emotion, score, minScore = 0.6, className = '' }) => {
    if (score < minScore) {
        return null;
    }
    const theme = EMOTION_THEMES[emotion] || EMOTION_THEMES.neutral;
    const isPerfect = score >= 0.9;
    return (jsxRuntimeExports.jsx("div", { className: `
        w-6 h-6 rounded-full
        flex items-center justify-center
        text-xs font-bold text-white
        shadow-sm
        ${className}
      `, style: { background: theme.accent }, title: `${EMOTION_LABELS_KO[emotion]} ${Math.round(score * 100)}%`, children: isPerfect ? '★' : '♥' }));
};
/**
 * EmotionMatchIndicator - 매칭 점수 인디케이터
 */
const EmotionMatchIndicator = ({ score, emotion, showLabel = true, size = 'md', className = '' }) => {
    const theme = EMOTION_THEMES[emotion] || EMOTION_THEMES.neutral;
    const percentage = Math.round(score * 100);
    const sizeClasses = {
        sm: 'h-1 text-[10px]',
        md: 'h-1.5 text-xs'
    };
    return (jsxRuntimeExports.jsxs("div", { className: `w-full ${className}`, children: [showLabel && (jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-1", children: [jsxRuntimeExports.jsx("span", { className: "text-gray-500", style: { fontSize: size === 'sm' ? '10px' : '11px' }, children: "\uAC10\uC815 \uB9E4\uCE6D" }), jsxRuntimeExports.jsxs("span", { className: "font-medium", style: { color: theme.accent, fontSize: size === 'sm' ? '10px' : '11px' }, children: [percentage, "%"] })] })), jsxRuntimeExports.jsx("div", { className: `w-full bg-gray-100 rounded-full overflow-hidden ${sizeClasses[size]}`, children: jsxRuntimeExports.jsx("div", { className: "h-full rounded-full transition-all duration-500", style: {
                        width: `${percentage}%`,
                        background: theme.accent
                    } }) })] }));
};

// 감정 전환 메시지
const TRANSITION_MESSAGES = {
    ko: {
        neutral: '평온한 상태로 돌아왔어요',
        happy: '기분이 좋아지고 있네요',
        excited: '설레는 마음이 느껴져요',
        stressed: '스트레스를 감지했어요',
        anxious: '불안함이 느껴지네요',
        sad: '조금 우울해 보여요',
        anger: '화가 나셨군요',
        fear: '두려움이 느껴져요',
        surprise: '놀라셨군요!',
        meditation: '명상 모드로 전환해요',
        fatigue: '피곤해 보여요',
        depression: '힘든 시간이시군요'
    },
    en: {
        neutral: 'Back to calm',
        happy: 'Feeling happy',
        excited: 'Getting excited',
        stressed: 'Stress detected',
        anxious: 'Feeling anxious',
        sad: 'Feeling down',
        anger: 'Feeling angry',
        fear: 'Feeling fearful',
        surprise: 'Surprised!',
        meditation: 'Meditation mode',
        fatigue: 'Feeling tired',
        depression: 'Going through tough times'
    }
};
// 감정별 추천 액션
const EMOTION_ACTIONS = {
    neutral: { icon: '🍃', text: '좋은 하루 되세요' },
    happy: { icon: '☀️', text: '이 기분 유지해요!' },
    excited: { icon: '✨', text: '설렘을 즐겨보세요' },
    stressed: { icon: '🧘', text: '깊은 호흡을 해볼까요?' },
    anxious: { icon: '💆', text: '잠시 쉬어가세요' },
    sad: { icon: '🤗', text: '따뜻한 차 한잔 어때요?' },
    anger: { icon: '🌊', text: '차분해지는 시간을' },
    fear: { icon: '🛡️', text: '안전한 공간에 있어요' },
    surprise: { icon: '🎁', text: '특별한 발견이네요!' },
    meditation: { icon: '🌸', text: '고요함을 느껴보세요' },
    fatigue: { icon: '🌙', text: '휴식이 필요해요' },
    depression: { icon: '💫', text: '작은 것부터 시작해요' }
};
/**
 * EmotionOverlay - 감정 전환 오버레이
 */
const EmotionOverlay = ({ fromEmotion, toEmotion, confidence, isVisible, onClose, duration = 3000, language = 'ko', onAction, className = '' }) => {
    const [isAnimating, setIsAnimating] = require$$0.useState(false);
    const [progress, setProgress] = require$$0.useState(0);
    const toTheme = EMOTION_THEMES[toEmotion] || EMOTION_THEMES.neutral;
    const fromLabel = EMOTION_LABELS_KO[fromEmotion];
    const toLabel = EMOTION_LABELS_KO[toEmotion];
    const message = TRANSITION_MESSAGES[language][toEmotion];
    const action = EMOTION_ACTIONS[toEmotion];
    // 표시 시 애니메이션 시작
    require$$0.useEffect(() => {
        if (isVisible) {
            setIsAnimating(true);
            setProgress(0);
            // 프로그레스 애니메이션
            const progressInterval = setInterval(() => {
                setProgress(prev => Math.min(100, prev + 2));
            }, duration / 50);
            // 자동 닫기
            const closeTimer = setTimeout(() => {
                setIsAnimating(false);
                setTimeout(onClose, 300); // 페이드아웃 후 닫기
            }, duration);
            return () => {
                clearInterval(progressInterval);
                clearTimeout(closeTimer);
            };
        }
    }, [isVisible, duration, onClose]);
    if (!isVisible && !isAnimating) {
        return null;
    }
    return (jsxRuntimeExports.jsx("div", { className: `
        fixed inset-0 z-[100]
        flex items-center justify-center
        transition-opacity duration-300
        ${isAnimating ? 'opacity-100' : 'opacity-0'}
        ${className}
      `, style: {
            background: `linear-gradient(135deg, ${toTheme.background}F0 0%, ${toTheme.accent}30 100%)`,
            backdropFilter: 'blur(8px)'
        }, onClick: onClose, children: jsxRuntimeExports.jsxs("div", { className: `
          text-center px-8 py-10 rounded-3xl
          transform transition-all duration-500
          ${isAnimating ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}
        `, style: {
                background: 'rgba(255, 255, 255, 0.9)',
                boxShadow: `0 25px 50px -12px ${toTheme.accent}40`,
                maxWidth: '400px'
            }, onClick: e => e.stopPropagation(), children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-4 mb-6", children: [jsxRuntimeExports.jsx("span", { className: "text-2xl opacity-50", children: fromLabel }), jsxRuntimeExports.jsx("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: toTheme.accent, strokeWidth: "2", children: jsxRuntimeExports.jsx("path", { d: "M5 12h14M12 5l7 7-7 7" }) }), jsxRuntimeExports.jsx("span", { className: "text-3xl font-bold", style: { color: toTheme.accent }, children: toLabel })] }), jsxRuntimeExports.jsx("p", { className: "text-xl font-light mb-6", style: {
                        color: toTheme.text,
                        fontFamily: "'Noto Sans KR', sans-serif",
                        lineHeight: 1.6
                    }, children: message }), jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [jsxRuntimeExports.jsxs("div", { className: "text-xs text-gray-400 mb-2", children: ["\uBD84\uC11D \uC2E0\uB8B0\uB3C4 ", Math.round(confidence * 100), "%"] }), jsxRuntimeExports.jsx("div", { className: "h-1 bg-gray-100 rounded-full overflow-hidden mx-auto", style: { maxWidth: '200px' }, children: jsxRuntimeExports.jsx("div", { className: "h-full rounded-full transition-all duration-500", style: {
                                    width: `${confidence * 100}%`,
                                    background: toTheme.accent
                                } }) })] }), jsxRuntimeExports.jsxs("button", { onClick: () => {
                        if (onAction)
                            onAction();
                        onClose();
                    }, className: "\r\n            inline-flex items-center gap-2\r\n            px-6 py-3 rounded-full\r\n            text-white font-medium\r\n            transition-all duration-200\r\n            hover:scale-105 hover:shadow-lg\r\n          ", style: { background: toTheme.accent }, children: [jsxRuntimeExports.jsx("span", { className: "text-xl", children: action.icon }), jsxRuntimeExports.jsx("span", { children: action.text })] }), jsxRuntimeExports.jsx("div", { className: "mt-6 h-0.5 bg-gray-100 rounded-full overflow-hidden", children: jsxRuntimeExports.jsx("div", { className: "h-full transition-all duration-100", style: {
                            width: `${progress}%`,
                            background: toTheme.accent,
                            opacity: 0.5
                        } }) }), jsxRuntimeExports.jsx("p", { className: "mt-4 text-xs text-gray-400", children: "\uD654\uBA74\uC744 \uD0ED\uD558\uBA74 \uB2EB\uD799\uB2C8\uB2E4" })] }) }));
};
/**
 * EmotionTransitionToast - 간단한 토스트 버전
 */
const EmotionTransitionToast = ({ fromEmotion, toEmotion, isVisible, onClose, position = 'bottom' }) => {
    const toTheme = EMOTION_THEMES[toEmotion] || EMOTION_THEMES.neutral;
    const toLabel = EMOTION_LABELS_KO[toEmotion];
    const action = EMOTION_ACTIONS[toEmotion];
    require$$0.useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(onClose, 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);
    if (!isVisible)
        return null;
    return (jsxRuntimeExports.jsxs("div", { className: `
        fixed left-1/2 -translate-x-1/2 z-[100]
        px-6 py-3 rounded-full
        flex items-center gap-3
        shadow-lg
        animate-toast-enter
        ${position === 'top' ? 'top-6' : 'bottom-24'}
        cursor-pointer
      `, style: {
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: `2px solid ${toTheme.accent}`
        }, onClick: onClose, children: [jsxRuntimeExports.jsx("span", { className: "text-xl", children: action.icon }), jsxRuntimeExports.jsx("span", { style: { color: toTheme.text }, className: "font-medium", children: toLabel }), jsxRuntimeExports.jsx("span", { className: "text-gray-400 text-sm", children: "\uAC10\uC9C0\uB428" }), jsxRuntimeExports.jsx("style", { children: `
        @keyframes toast-enter {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(${position === 'top' ? '-20px' : '20px'});
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
        
        .animate-toast-enter {
          animation: toast-enter 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      ` })] }));
};

// 행동 피드백 템플릿
const BEHAVIOR_FEEDBACK = {
    fastMouse: { icon: '🖱️', message: '빠른 마우스 움직임 감지' },
    slowMouse: { icon: '🐌', message: '느린 움직임 감지' },
    fastScroll: { icon: '📜', message: '급한 스크롤 감지' },
    frequentClicks: { icon: '👆', message: '빈번한 클릭 감지' },
    hesitation: { icon: '🤔', message: '망설임 감지' },
    longStay: { icon: '⏱️', message: '오래 머무르고 있어요' }
};
/**
 * EmotionFeedback - 실시간 분석 피드백 컴포넌트
 */
const EmotionFeedback = ({ enabled = true, maxMessages = 3, displayDuration = 3000, position = 'bottom-left', isNewUser = false, className = '' }) => {
    const [messages, setMessages] = require$$0.useState([]);
    const [showCount, setShowCount] = require$$0.useState(0);
    // 새 사용자는 최대 3번만 표시
    const shouldShow = enabled && (isNewUser ? showCount < 3 : true);
    // 메시지 추가
    const addMessage = require$$0.useCallback((feedback) => {
        if (!shouldShow)
            return;
        const newMessage = {
            ...feedback,
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            timestamp: Date.now()
        };
        setMessages(prev => {
            const updated = [newMessage, ...prev].slice(0, maxMessages);
            return updated;
        });
        if (isNewUser) {
            setShowCount(prev => prev + 1);
        }
        // 자동 제거
        setTimeout(() => {
            setMessages(prev => prev.filter(m => m.id !== newMessage.id));
        }, displayDuration);
    }, [shouldShow, maxMessages, displayDuration, isNewUser]);
    // 위치 클래스
    const positionClasses = {
        'bottom-left': 'bottom-24 left-6',
        'bottom-right': 'bottom-24 right-6',
        'top-left': 'top-24 left-6',
        'top-right': 'top-24 right-6'
    };
    // 외부에서 접근 가능하도록 전역에 등록
    require$$0.useEffect(() => {
        if (typeof window !== 'undefined') {
            window.__HEALSIDE_FEEDBACK__ = {
                addFeedback: addMessage,
                clearAll: () => setMessages([])
            };
        }
        return () => {
            if (typeof window !== 'undefined') {
                delete window.__HEALSIDE_FEEDBACK__;
            }
        };
    }, [addMessage]);
    if (!enabled || messages.length === 0) {
        return null;
    }
    return (jsxRuntimeExports.jsx("div", { className: `fixed ${positionClasses[position]} z-40 flex flex-col gap-2 ${className}`, style: { maxWidth: '280px' }, children: messages.map((msg, index) => (jsxRuntimeExports.jsx(FeedbackToast, { message: msg, index: index, onClose: () => setMessages(prev => prev.filter(m => m.id !== msg.id)) }, msg.id))) }));
};
/**
 * FeedbackToast - 개별 피드백 토스트
 */
const FeedbackToast = ({ message, index, onClose }) => {
    const theme = message.emotion
        ? EMOTION_THEMES[message.emotion]
        : EMOTION_THEMES.neutral;
    return (jsxRuntimeExports.jsxs("div", { className: "\r\n        flex items-start gap-3\r\n        px-4 py-3 rounded-xl\r\n        shadow-lg\r\n        animate-feedback-enter\r\n        cursor-pointer\r\n        transition-all duration-200\r\n        hover:scale-[1.02]\r\n      ", style: {
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderLeft: `3px solid ${theme.accent}`,
            animationDelay: `${index * 50}ms`
        }, onClick: onClose, children: [jsxRuntimeExports.jsx("span", { className: "text-xl flex-shrink-0", children: message.icon }), jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-gray-800 leading-tight", children: message.message }), message.detail && (jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mt-0.5", children: message.detail })), message.emotion && (jsxRuntimeExports.jsxs("span", { className: "inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium", style: {
                            background: `${theme.accent}20`,
                            color: theme.accent
                        }, children: ["\u2192 ", EMOTION_LABELS_KO[message.emotion], " \uC2E0\uD638"] }))] }), jsxRuntimeExports.jsx("button", { className: "text-gray-400 hover:text-gray-600 text-sm", onClick: (e) => {
                    e.stopPropagation();
                    onClose();
                }, children: "\u2715" }), jsxRuntimeExports.jsx("style", { children: `
        @keyframes feedback-enter {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-feedback-enter {
          animation: feedback-enter 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      ` })] }));
};
/**
 * useFeedback - 피드백 훅
 */
function useFeedback() {
    const addFeedback = require$$0.useCallback((type, icon, message, detail, emotion) => {
        if (typeof window !== 'undefined' && window.__HEALSIDE_FEEDBACK__) {
            window.__HEALSIDE_FEEDBACK__.addFeedback({
                type,
                icon,
                message,
                detail,
                emotion
            });
        }
    }, []);
    // 편의 메서드들
    const feedbackBehavior = require$$0.useCallback((behaviorType, emotion, detail) => {
        const template = BEHAVIOR_FEEDBACK[behaviorType];
        if (template) {
            addFeedback('behavior', template.icon, template.message, detail, emotion);
        }
    }, [addFeedback]);
    const feedbackText = require$$0.useCallback((emotion, keywords) => {
        addFeedback('text', '💬', '텍스트에서 감정 감지', `키워드: ${keywords.slice(0, 3).join(', ')}`, emotion);
    }, [addFeedback]);
    const feedbackFusion = require$$0.useCallback((emotion, confidence) => {
        addFeedback('fusion', '🔀', '멀티모달 분석 완료', `신뢰도 ${Math.round(confidence * 100)}%`, emotion);
    }, [addFeedback]);
    const feedbackTransition = require$$0.useCallback((from, to) => {
        addFeedback('transition', '🔄', `감정 전환: ${EMOTION_LABELS_KO[from]} → ${EMOTION_LABELS_KO[to]}`, undefined, to);
    }, [addFeedback]);
    return {
        addFeedback,
        feedbackBehavior,
        feedbackText,
        feedbackFusion,
        feedbackTransition
    };
}

/**
 * EmotionDemo - SDK 독립 데모 페이지
 */
const EmotionDemo = () => {
    // 상태
    const [currentEmotion, setCurrentEmotion] = require$$0.useState('neutral');
    const [confidence, setConfidence] = require$$0.useState(0.5);
    const [source, setSource] = require$$0.useState('auto');
    const [behaviorMetrics, setBehaviorMetrics] = require$$0.useState(null);
    const [textInput, setTextInput] = require$$0.useState('');
    const [showOverlay, setShowOverlay] = require$$0.useState(false);
    const [showToast, setShowToast] = require$$0.useState(false);
    const [prevEmotion, setPrevEmotion] = require$$0.useState('neutral');
    const [isTracking, setIsTracking] = require$$0.useState(false);
    const [debugMode, setDebugMode] = require$$0.useState(true);
    // 인스턴스
    const [fusion] = require$$0.useState(() => new MultimodalFusion({ debug: true }));
    const [textAnalyzer] = require$$0.useState(() => new TextAnalyzer({ debug: true }));
    const [benchmark] = require$$0.useState(() => new BenchmarkEngine());
    // 벤치마크 상태
    const [benchmarkResult, setBenchmarkResult] = require$$0.useState(null);
    const [isBenchmarking, setIsBenchmarking] = require$$0.useState(false);
    // 피드백 훅
    const { feedbackBehavior, feedbackText, feedbackFusion, feedbackTransition } = useFeedback();
    // 테마
    const theme = EMOTION_THEMES[currentEmotion] || EMOTION_THEMES.neutral;
    // 추적 시작/중지
    const toggleTracking = require$$0.useCallback(() => {
        if (isTracking) {
            fusion.stop();
            setIsTracking(false);
        }
        else {
            fusion.start();
            setIsTracking(true);
        }
    }, [isTracking, fusion]);
    // 융합 결과 구독
    require$$0.useEffect(() => {
        const unsubscribe = fusion.subscribe((result) => {
            if (result.emotion !== currentEmotion) {
                setPrevEmotion(currentEmotion);
                setShowToast(true);
                feedbackTransition(currentEmotion, result.emotion);
            }
            setCurrentEmotion(result.emotion);
            setConfidence(result.confidence);
            setSource(result.source);
            // 행동 메트릭 업데이트
            setBehaviorMetrics(fusion.getBehaviorMetrics());
        });
        return unsubscribe;
    }, [fusion, currentEmotion, feedbackTransition]);
    // 행동 메트릭 실시간 업데이트 (1초마다)
    require$$0.useEffect(() => {
        if (!isTracking)
            return;
        const metricsInterval = setInterval(() => {
            const metrics = fusion.getBehaviorMetrics();
            setBehaviorMetrics(metrics);
        }, 1000); // 1초마다 업데이트
        return () => clearInterval(metricsInterval);
    }, [isTracking, fusion]);
    // 텍스트 분석
    const handleTextAnalysis = require$$0.useCallback(async () => {
        if (!textInput.trim())
            return;
        const result = await textAnalyzer.analyze(textInput);
        fusion.feedText(textInput);
        feedbackText(result.emotion, result.keywords);
    }, [textInput, textAnalyzer, fusion, feedbackText]);
    // 수동 감정 선택
    const handleManualSelect = require$$0.useCallback((emotion) => {
        setPrevEmotion(currentEmotion);
        fusion.setManualEmotion(emotion);
        setShowOverlay(true);
    }, [fusion, currentEmotion]);
    // 수동 선택 해제
    const clearManualSelect = require$$0.useCallback(() => {
        fusion.clearManualEmotion();
    }, [fusion]);
    // 벤치마크 실행
    const runBenchmark = require$$0.useCallback(async () => {
        setIsBenchmarking(true);
        try {
            const result = await benchmark.validateAccuracy(async (text) => {
                return await textAnalyzer.analyze(text);
            });
            setBenchmarkResult(result);
            console.log('[Benchmark] Result:', result);
        }
        catch (error) {
            console.error('[Benchmark] Error:', error);
        }
        finally {
            setIsBenchmarking(false);
        }
    }, [benchmark, textAnalyzer]);
    return (jsxRuntimeExports.jsxs("div", { className: "min-h-screen transition-colors duration-1000", style: {
            background: theme.gradient,
            fontFamily: "'Helvetica Neue', 'Pretendard', sans-serif"
        }, children: [jsxRuntimeExports.jsx("header", { className: "border-b border-gray-200 bg-white/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm", children: jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-8 py-5", children: jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-md", children: jsxRuntimeExports.jsx("span", { className: "text-white text-xl font-bold", children: "H" }) }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold tracking-tight", style: { color: theme.text }, children: "HEALSIDE EMOTION SDK" }), jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider", style: { color: theme.secondary }, children: "Developer Preview v1.0" })] })] }), jsxRuntimeExports.jsxs("a", { href: "/", className: "\r\n                  px-6 py-2.5 rounded-lg\r\n                  bg-gradient-to-r from-emerald-500 to-teal-600\r\n                  text-white text-sm font-medium\r\n                  hover:from-emerald-600 hover:to-teal-700\r\n                  transition-all duration-200\r\n                  flex items-center gap-2\r\n                  shadow-lg shadow-emerald-500/20\r\n                ", children: [jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10 19l-7-7m0 0l7-7m-7 7h18" }) }), "\uC2E4\uC81C \uC1FC\uD551\uBAB0 \uBCF4\uAE30"] })] }), jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [jsxRuntimeExports.jsx("button", { onClick: toggleTracking, className: `
                  px-5 py-2.5 rounded-lg text-sm font-medium
                  transition-all duration-200 shadow-sm
                  ${isTracking
                                            ? 'bg-green-50 text-green-600 border border-green-200'
                                            : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'}
                `, children: jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [jsxRuntimeExports.jsx("span", { className: `w-2 h-2 rounded-full ${isTracking ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}` }), isTracking ? '추적 중' : '추적 시작'] }) }), jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm cursor-pointer transition-colors", style: { color: theme.secondary }, children: [jsxRuntimeExports.jsx("input", { type: "checkbox", checked: debugMode, onChange: (e) => setDebugMode(e.target.checked), className: "rounded border-gray-300 text-emerald-500 focus:ring-emerald-500/50" }), jsxRuntimeExports.jsx("span", { className: "uppercase tracking-wider text-xs", children: "Debug" })] })] })] }) }) }), jsxRuntimeExports.jsxs("main", { className: "max-w-7xl mx-auto px-8 py-12", children: [jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [jsxRuntimeExports.jsxs("section", { className: "space-y-6", children: [jsxRuntimeExports.jsxs("div", { className: "p-8 rounded-2xl border shadow-lg bg-white", style: { borderColor: `${theme.accent}20` }, children: [jsxRuntimeExports.jsx("h2", { className: "text-xs font-semibold mb-6 uppercase tracking-widest", style: { color: theme.secondary }, children: "Current Emotion State" }), jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-8", children: [jsxRuntimeExports.jsx("div", { className: "w-28 h-28 rounded-2xl flex items-center justify-center text-5xl shadow-xl", style: {
                                                            background: `linear-gradient(135deg, ${theme.accent}15 0%, ${theme.accent}05 100%)`,
                                                            border: `3px solid ${theme.accent}`
                                                        }, children: EMOTION_LABELS_KO[currentEmotion]?.charAt(0) || '😊' }), jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [jsxRuntimeExports.jsx("div", { className: "text-4xl font-bold mb-2", style: { color: theme.text }, children: EMOTION_LABELS_KO[currentEmotion] }), jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-sm", children: [jsxRuntimeExports.jsx("span", { style: { color: theme.secondary }, children: "\uC2E0\uB8B0\uB3C4" }), jsxRuntimeExports.jsxs("span", { className: "font-mono font-bold", style: { color: theme.accent }, children: [Math.round(confidence * 100), "%"] })] }), jsxRuntimeExports.jsx("div", { className: "mt-2 text-xs uppercase tracking-wider", style: { color: theme.secondary }, children: source === 'manual' ? '수동 선택' :
                                                                    source === 'text' ? '텍스트 분석' :
                                                                        source === 'behavior' ? '행동 분석' :
                                                                            source === 'multimodal' ? '멀티모달 융합' : '자동 분석' })] })] }), jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs mb-2", style: { color: theme.secondary }, children: [jsxRuntimeExports.jsx("span", { className: "uppercase tracking-wider font-semibold", children: "Confidence" }), jsxRuntimeExports.jsxs("span", { className: "font-mono font-bold", children: [Math.round(confidence * 100), "%"] })] }), jsxRuntimeExports.jsx("div", { className: "h-2.5 bg-gray-100 rounded-full overflow-hidden", children: jsxRuntimeExports.jsx("div", { className: "h-full rounded-full transition-all duration-500", style: {
                                                                width: `${confidence * 100}%`,
                                                                background: `linear-gradient(90deg, ${theme.accent} 0%, ${theme.accent}CC 100%)`
                                                            } }) })] })] }), jsxRuntimeExports.jsxs("div", { className: "p-8 rounded-2xl border shadow-lg bg-white", style: { borderColor: `${theme.accent}20` }, children: [jsxRuntimeExports.jsx("h2", { className: "text-xs font-semibold mb-6 uppercase tracking-widest", style: { color: theme.secondary }, children: "Text Emotion Analysis" }), jsxRuntimeExports.jsx("textarea", { value: textInput, onChange: (e) => setTextInput(e.target.value), placeholder: "\uAC10\uC815\uC744 \uB2F4\uC740 \uD14D\uC2A4\uD2B8\uB97C \uC785\uB825\uD558\uC138\uC694...\n\uC608: \uC624\uB298 \uB108\uBB34 \uC2A4\uD2B8\uB808\uC2A4 \uBC1B\uC544\uC11C \uD798\uB4E4\uC5B4\uC694", className: "w-full h-32 p-4 rounded-xl bg-gray-50 border-2 resize-none focus:outline-none focus:ring-2 transition-all", style: {
                                                    borderColor: theme.accent + '30',
                                                    color: theme.text
                                                } }), jsxRuntimeExports.jsx("button", { onClick: handleTextAnalysis, disabled: !textInput.trim(), className: "mt-4 w-full py-3.5 rounded-xl text-white font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]", style: {
                                                    background: textInput.trim()
                                                        ? `linear-gradient(135deg, ${theme.accent} 0%, ${theme.accent}DD 100%)`
                                                        : '#E5E7EB'
                                                }, children: "\uBD84\uC11D\uD558\uAE30" })] }), jsxRuntimeExports.jsxs("div", { className: "p-8 rounded-2xl border shadow-lg bg-white", style: { borderColor: `${theme.accent}20` }, children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [jsxRuntimeExports.jsx("h2", { className: "text-xs font-semibold uppercase tracking-widest", style: { color: theme.secondary }, children: "Manual Selection" }), source === 'manual' && (jsxRuntimeExports.jsx("button", { onClick: clearManualSelect, className: "text-xs font-semibold uppercase tracking-wider transition-colors hover:underline", style: { color: theme.accent }, children: "Auto Mode" }))] }), jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-3", children: Object.keys(EMOTION_LABELS_KO).map((em) => (jsxRuntimeExports.jsxs("button", { onClick: () => handleManualSelect(em), className: `
                      p-4 rounded-xl text-center transition-all duration-200
                      hover:scale-105 hover:shadow-lg
                      ${currentEmotion === em
                                                        ? 'ring-2 ring-offset-2'
                                                        : 'hover:bg-gray-50'}
                    `, style: {
                                                        background: currentEmotion === em
                                                            ? `${EMOTION_THEMES[em].accent}15`
                                                            : '#FAFAFA',
                                                        border: currentEmotion === em ? `2px solid ${EMOTION_THEMES[em].accent}` : '1px solid #E5E7EB',
                                                        ringColor: EMOTION_THEMES[em].accent
                                                    }, children: [jsxRuntimeExports.jsx("div", { className: "text-2xl mb-2", children: em === 'neutral' ? '🍃' :
                                                                em === 'happy' ? '☀️' :
                                                                    em === 'excited' ? '✨' :
                                                                        em === 'stressed' ? '⚡' :
                                                                            em === 'anxious' ? '💨' :
                                                                                em === 'sad' ? '🌧️' :
                                                                                    em === 'anger' ? '🔥' :
                                                                                        em === 'fear' ? '☂️' :
                                                                                            em === 'surprise' ? '⭐' :
                                                                                                em === 'meditation' ? '🌸' :
                                                                                                    em === 'fatigue' ? '🌙' : '🌫️' }), jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold", style: { color: EMOTION_THEMES[em].text }, children: EMOTION_LABELS_KO[em] })] }, em))) })] })] }), jsxRuntimeExports.jsxs("section", { className: "space-y-6", children: [jsxRuntimeExports.jsxs("div", { className: "p-8 rounded-2xl border shadow-lg bg-white", style: { borderColor: `${theme.accent}20` }, children: [jsxRuntimeExports.jsx("h2", { className: "text-xs font-semibold mb-6 uppercase tracking-widest", style: { color: theme.secondary }, children: "Behavior Metrics" }), behaviorMetrics ? (jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [jsxRuntimeExports.jsx(MetricBar, { label: "\uB9C8\uC6B0\uC2A4 \uC18D\uB3C4", value: behaviorMetrics.mouseSpeed, max: 1000, unit: "px/s", color: theme.accent }), jsxRuntimeExports.jsx(MetricBar, { label: "\uC2A4\uD06C\uB864 \uC18D\uB3C4", value: behaviorMetrics.scrollSpeed, max: 2000, unit: "px/s", color: theme.accent }), jsxRuntimeExports.jsx(MetricBar, { label: "\uD074\uB9AD \uBE48\uB3C4", value: behaviorMetrics.clickFrequency, max: 60, unit: "clicks/min", color: theme.accent }), jsxRuntimeExports.jsx(MetricBar, { label: "\uCCB4\uB958 \uC2DC\uAC04", value: behaviorMetrics.dwellTime / 1000, max: 300, unit: "\uCD08", color: theme.accent }), jsxRuntimeExports.jsx(MetricBar, { label: "\uB9DD\uC124\uC784 \uC2DC\uAC04", value: behaviorMetrics.hesitationTime / 1000, max: 10, unit: "\uCD08", color: theme.accent })] })) : (jsxRuntimeExports.jsxs("div", { className: "text-center py-12", style: { color: theme.secondary }, children: [jsxRuntimeExports.jsx("div", { className: "text-4xl mb-3", children: "\uD83D\uDCCA" }), jsxRuntimeExports.jsx("p", { className: "text-sm", children: "\uCD94\uC801\uC744 \uC2DC\uC791\uD558\uBA74 \uBA54\uD2B8\uB9AD\uC774 \uD45C\uC2DC\uB429\uB2C8\uB2E4" })] }))] }), jsxRuntimeExports.jsxs("div", { className: "p-8 rounded-2xl border shadow-lg bg-white", style: { borderColor: `${theme.accent}20` }, children: [jsxRuntimeExports.jsx("h2", { className: "text-xs font-semibold mb-6 uppercase tracking-widest", style: { color: theme.secondary }, children: "UI Components Preview" }), jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold mb-3 uppercase tracking-wider", style: { color: theme.secondary }, children: "Badge Variants" }), jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [jsxRuntimeExports.jsx(EmotionBadge, { emotion: currentEmotion, score: 0.85, variant: "filled" }), jsxRuntimeExports.jsx(EmotionBadge, { emotion: currentEmotion, score: 0.85, variant: "outline" }), jsxRuntimeExports.jsx(EmotionBadge, { emotion: currentEmotion, score: 0.85, variant: "subtle" })] })] }), jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [jsxRuntimeExports.jsx("button", { onClick: () => setShowOverlay(true), className: "px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-lg", style: { background: `linear-gradient(135deg, ${theme.accent} 0%, ${theme.accent}DD 100%)` }, children: "Overlay Test" }), jsxRuntimeExports.jsx("button", { onClick: () => setShowToast(true), className: "px-5 py-2.5 rounded-lg text-sm font-semibold border-2 transition-all hover:bg-gray-50", style: { borderColor: theme.accent, color: theme.accent }, children: "Toast Test" })] })] })] }), jsxRuntimeExports.jsxs("div", { className: "p-8 rounded-2xl border shadow-lg bg-white", style: { borderColor: `${theme.accent}20` }, children: [jsxRuntimeExports.jsx("h2", { className: "text-xs font-semibold mb-6 uppercase tracking-widest", style: { color: theme.secondary }, children: "Theme Colors" }), jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [jsxRuntimeExports.jsx(ColorSwatch, { label: "Background", color: theme.background }), jsxRuntimeExports.jsx(ColorSwatch, { label: "Accent", color: theme.accent }), jsxRuntimeExports.jsx(ColorSwatch, { label: "Text", color: theme.text }), jsxRuntimeExports.jsx(ColorSwatch, { label: "Secondary", color: theme.secondary })] })] })] })] }), jsxRuntimeExports.jsx("section", { className: "mt-12", children: jsxRuntimeExports.jsxs("div", { className: "p-8 rounded-2xl border shadow-lg bg-white", style: { borderColor: `${theme.accent}20` }, children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h2", { className: "text-xs font-semibold uppercase tracking-widest mb-2", style: { color: theme.secondary }, children: "Accuracy Benchmark" }), jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600", children: "\uC2E4\uC2DC\uAC04 \uC815\uD655\uB3C4 \uAC80\uC99D (\uD22C\uC790\uC790/\uACE0\uAC1D\uC6A9)" })] }), jsxRuntimeExports.jsx("button", { onClick: runBenchmark, disabled: isBenchmarking, className: `
                  px-6 py-3 rounded-lg text-sm font-semibold
                  transition-all duration-200 shadow-md
                  ${isBenchmarking
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700'}
                `, children: isBenchmarking ? (jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [jsxRuntimeExports.jsxs("svg", { className: "animate-spin h-4 w-4", fill: "none", viewBox: "0 0 24 24", children: [jsxRuntimeExports.jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), jsxRuntimeExports.jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] }), "\uAC80\uC99D \uC911..."] })) : '정확도 검증 시작' })] }), benchmarkResult && (jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [jsxRuntimeExports.jsxs("div", { className: "p-6 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200", children: [jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-2", children: "\uC804\uCCB4 \uC815\uD655\uB3C4" }), jsxRuntimeExports.jsx("div", { className: "text-4xl font-bold text-emerald-700", children: benchmarkResult.accuracy }), jsxRuntimeExports.jsxs("div", { className: "text-xs text-emerald-600 mt-1", children: [benchmarkResult.passed, "/", benchmarkResult.totalTests, " \uD1B5\uACFC"] })] }), jsxRuntimeExports.jsxs("div", { className: "p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200", children: [jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2", children: "\uD55C\uAD6D\uC5B4" }), jsxRuntimeExports.jsx("div", { className: "text-4xl font-bold text-blue-700", children: benchmarkResult.byLanguage.ko.accuracy }), jsxRuntimeExports.jsxs("div", { className: "text-xs text-blue-600 mt-1", children: [benchmarkResult.byLanguage.ko.passed, "/", benchmarkResult.byLanguage.ko.total, " \uD1B5\uACFC"] })] }), jsxRuntimeExports.jsxs("div", { className: "p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200", children: [jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold uppercase tracking-wider text-purple-600 mb-2", children: "English" }), jsxRuntimeExports.jsx("div", { className: "text-4xl font-bold text-purple-700", children: benchmarkResult.byLanguage.en.accuracy }), jsxRuntimeExports.jsxs("div", { className: "text-xs text-purple-600 mt-1", children: [benchmarkResult.byLanguage.en.passed, "/", benchmarkResult.byLanguage.en.total, " \uD1B5\uACFC"] })] })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h3", { className: "text-xs font-semibold uppercase tracking-wider text-gray-600 mb-4", children: "\uCE74\uD14C\uACE0\uB9AC\uBCC4 \uC815\uD655\uB3C4" }), jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4", children: Object.entries(benchmarkResult.byCategory).map(([category, data]) => (jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-lg bg-gray-50 border border-gray-200", children: [jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-700 capitalize", children: category }), jsxRuntimeExports.jsx("span", { className: "text-lg font-bold", style: { color: theme.accent }, children: data.accuracy })] }), jsxRuntimeExports.jsxs("div", { className: "text-xs text-gray-500 mt-1", children: [data.passed, "/", data.total, " \uD1B5\uACFC"] })] }, category))) })] }), benchmarkResult.failed.length > 0 && (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsxs("h3", { className: "text-xs font-semibold uppercase tracking-wider text-red-600 mb-4", children: ["\uC2E4\uD328\uD55C \uCF00\uC774\uC2A4 (", benchmarkResult.failed.length, "\uAC1C)"] }), jsxRuntimeExports.jsx("div", { className: "space-y-2", children: benchmarkResult.failed.map((fail, idx) => (jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-lg bg-red-50 border border-red-200", children: [jsxRuntimeExports.jsxs("div", { className: "text-sm font-medium text-gray-800 mb-2", children: ["\"", fail.text, "\""] }), jsxRuntimeExports.jsxs("div", { className: "flex gap-4 text-xs", children: [jsxRuntimeExports.jsxs("span", { className: "text-red-600", children: ["\uC608\uCE21: ", jsxRuntimeExports.jsx("strong", { children: fail.predicted })] }), jsxRuntimeExports.jsxs("span", { className: "text-green-600", children: ["\uC815\uB2F5: ", jsxRuntimeExports.jsx("strong", { children: fail.expected })] }), jsxRuntimeExports.jsxs("span", { className: "text-gray-500", children: ["\uC2E0\uB8B0\uB3C4: ", Math.round(fail.confidence * 100), "%"] })] })] }, idx))) })] })), jsxRuntimeExports.jsxs("div", { className: "text-xs text-gray-400 text-right", children: ["\uAC80\uC99D \uC2DC\uAC01: ", new Date(benchmarkResult.timestamp).toLocaleString('ko-KR')] })] })), !benchmarkResult && !isBenchmarking && (jsxRuntimeExports.jsxs("div", { className: "text-center py-12 text-gray-400", children: [jsxRuntimeExports.jsx("svg", { className: "w-16 h-16 mx-auto mb-4 opacity-50", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" }) }), jsxRuntimeExports.jsx("p", { className: "text-sm", children: "\uC815\uD655\uB3C4 \uAC80\uC99D\uC744 \uC2DC\uC791\uD558\uB824\uBA74 \uC704 \uBC84\uD2BC\uC744 \uD074\uB9AD\uD558\uC138\uC694" })] }))] }) })] }), jsxRuntimeExports.jsx(EmotionPulse, { emotion: currentEmotion, confidence: confidence, source: source, onSelectEmotion: handleManualSelect, showConfidence: true, size: "md", position: "bottom-right" }), jsxRuntimeExports.jsx(EmotionFeedback, { enabled: debugMode, position: "bottom-left", isNewUser: false }), jsxRuntimeExports.jsx(EmotionOverlay, { fromEmotion: prevEmotion, toEmotion: currentEmotion, confidence: confidence, isVisible: showOverlay, onClose: () => setShowOverlay(false), duration: 3000 }), jsxRuntimeExports.jsx(EmotionTransitionToast, { fromEmotion: prevEmotion, toEmotion: currentEmotion, isVisible: showToast, onClose: () => setShowToast(false), position: "top" })] }));
};
// 헬퍼 컴포넌트: 메트릭 바 (밝은 테마)
const MetricBar = ({ label, value, max, unit, color }) => {
    const percentage = Math.min(100, (value / max) * 100);
    return (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs mb-2", children: [jsxRuntimeExports.jsx("span", { className: "text-gray-600 uppercase tracking-wider font-semibold", children: label }), jsxRuntimeExports.jsxs("span", { className: "font-mono font-bold", style: { color }, children: [value.toFixed(1), " ", jsxRuntimeExports.jsx("span", { className: "text-gray-400", children: unit })] })] }), jsxRuntimeExports.jsx("div", { className: "h-2.5 bg-gray-100 rounded-full overflow-hidden", children: jsxRuntimeExports.jsx("div", { className: "h-full rounded-full transition-all duration-500", style: {
                        width: `${percentage}%`,
                        background: `linear-gradient(90deg, ${color} 0%, ${color}DD 100%)`
                    } }) })] }));
};
// 헬퍼 컴포넌트: 색상 스와치 (밝은 테마)
const ColorSwatch = ({ label, color }) => (jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg border-2 border-gray-200 shadow-md", style: { background: color } }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-500 uppercase tracking-wider font-semibold", children: label }), jsxRuntimeExports.jsx("div", { className: "text-xs font-mono text-gray-700 font-bold", children: color })] })] }));

/**
 * Healside Emotion SDK
 *
 * 커머스 특화 감정 인텔리전스 SDK
 * "당신의 쇼핑몰에 감정을 입히세요"
 *
 * @packageDocumentation
 */
// ============================================
// Core
// ============================================
// ============================================
// Default Export
// ============================================
var emotionEngine$1 = emotionEngine;
// ============================================
// Version & Info
// ============================================
const SDK_VERSION = '1.0.0';
const SDK_NAME = '@healside/emotion-sdk';
const SDK_DESCRIPTION = '커머스 특화 감정 인텔리전스 SDK';
/**
 * SDK 정보 출력
 */
function printSDKInfo() {
    console.log(`
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   🧠 Healside Emotion SDK v${SDK_VERSION}                          ║
║   "당신의 쇼핑몰에 감정을 입히세요"                          ║
║                                                              ║
║   Features:                                                  ║
║   ├── 행동 추적 (마우스/스크롤/클릭)                         ║
║   ├── 텍스트 감정 분석                                       ║
║   ├── 멀티모달 융합                                          ║
║   ├── 히스테리시스 안정화                                    ║
║   └── 체감 UI 컴포넌트                                       ║
║                                                              ║
║   © 2024 Healside. Patent Pending.                           ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
  `);
}

exports.BehaviorTracker = BehaviorTracker;
exports.BenchmarkEngine = BenchmarkEngine;
exports.EMOTION_ICONS = EMOTION_ICONS;
exports.EMOTION_LABELS_EN = EMOTION_LABELS_EN;
exports.EMOTION_LABELS_KO = EMOTION_LABELS_KO;
exports.EMOTION_THEMES = EMOTION_THEMES;
exports.EmotionBadge = EmotionBadge;
exports.EmotionBadgeCompact = EmotionBadgeCompact;
exports.EmotionDemo = EmotionDemo;
exports.EmotionEngine = EmotionEngine;
exports.EmotionFeedback = EmotionFeedback;
exports.EmotionMatchIndicator = EmotionMatchIndicator;
exports.EmotionOverlay = EmotionOverlay;
exports.EmotionPulse = EmotionPulse;
exports.EmotionTransitionToast = EmotionTransitionToast;
exports.Hysteresis = Hysteresis;
exports.MultimodalFusion = MultimodalFusion;
exports.SDK_DESCRIPTION = SDK_DESCRIPTION;
exports.SDK_NAME = SDK_NAME;
exports.SDK_VERSION = SDK_VERSION;
exports.THEME_TRANSITION_CSS = THEME_TRANSITION_CSS;
exports.TextAnalyzer = TextAnalyzer;
exports.default = emotionEngine$1;
exports.emotionEngine = emotionEngine$2;
exports.getTheme = getTheme;
exports.getThemeCSSVariables = getThemeCSSVariables;
exports.printSDKInfo = printSDKInfo;
exports.useEmotion = useEmotion;
exports.useEmotionInit = useEmotionInit;
exports.useEmotionTheme = useEmotionTheme;
exports.useFeedback = useFeedback;
exports.useProductEmotionScore = useProductEmotionScore;
//# sourceMappingURL=index.js.map
