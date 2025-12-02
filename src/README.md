# Healside Emotion SDK

> 🧠 커머스 특화 감정 인텔리전스 SDK
> "당신의 쇼핑몰에 감정을 입히세요"

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)]()
[![License](https://img.shields.io/badge/license-Proprietary-red.svg)]()
[![Patent](https://img.shields.io/badge/patent-pending-yellow.svg)]()

---

## 📋 목차

- [소개](#-소개)
- [설치](#-설치)
- [빠른 시작](#-빠른-시작)
- [Core API](#-core-api)
- [React Hooks](#-react-hooks)
- [UI 컴포넌트](#-ui-컴포넌트)
- [설정](#-설정)
- [예제](#-예제)
- [특허 기술](#-특허-기술)

---

## 🎯 소개

Healside Emotion SDK는 **커머스에 특화된 감정 분석 솔루션**입니다.

### 주요 기능

| 기능 | 설명 |
|------|------|
| 🖱️ **행동 추적** | 마우스, 스크롤, 클릭 패턴에서 감정 추론 |
| 💬 **텍스트 분석** | 사용자 입력에서 감정 추출 (한국어/영어) |
| 🔀 **멀티모달 융합** | 행동 + 텍스트 결합 분석 |
| ⚖️ **히스테리시스** | 감정 전환 안정화 (특허 기술) |
| 🎨 **테마 변경** | 감정 기반 UI 색상 변경 |
| 🛒 **상품 추천** | 감정-상품 매칭 점수 |

### 왜 Healside SDK인가?

```
기존 감정 분석 SDK          Healside SDK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• 범용 감정 분석             • 커머스 특화 분석
• 텍스트 또는 얼굴만         • 멀티모달 (행동+텍스트)
• 불안정한 전환              • 히스테리시스 안정화
• UI 컴포넌트 없음           • 플러그앤플레이 UI
• 상품 연동 없음             • 상품 매칭 점수 제공
```

---

## 📦 설치

```bash
# NPM
npm install @healside/emotion-sdk

# Yarn
yarn add @healside/emotion-sdk

# PNPM
pnpm add @healside/emotion-sdk
```

---

## 🚀 빠른 시작

### 1. 기본 사용

```typescript
import { emotionEngine } from '@healside/emotion-sdk';

// 초기화
emotionEngine.init({
  apiKey: 'your-api-key',
  trackBehavior: true,
  trackText: true,
  autoTheme: true
});

// 현재 감정 조회
const emotion = emotionEngine.getEmotion(); // 'neutral', 'happy', 'stressed', ...
const confidence = emotionEngine.getConfidence(); // 0.0 ~ 1.0

// 감정 변화 구독
const unsubscribe = emotionEngine.subscribe((state) => {
  console.log('감정 변화:', state.emotion, state.confidence);
});
```

### 2. React에서 사용

```tsx
import { useEmotion, useEmotionInit, EmotionPulse } from '@healside/emotion-sdk';

function App() {
  // SDK 초기화
  useEmotionInit({
    apiKey: 'your-api-key',
    trackBehavior: true
  });

  return (
    <div>
      <ProductList />
      <EmotionPulse position="bottom-right" />
    </div>
  );
}

function ProductList() {
  const { emotion, confidence, getProductScore } = useEmotion();

  return (
    <div>
      <p>현재 감정: {emotion} ({Math.round(confidence * 100)}%)</p>
      
      {products.map(product => (
        <ProductCard 
          key={product.id}
          product={product}
          emotionScore={getProductScore(product.id)}
        />
      ))}
    </div>
  );
}
```

---

## 🔧 Core API

### EmotionEngine

메인 SDK 클래스입니다.

```typescript
import { emotionEngine } from '@healside/emotion-sdk';

// 초기화
emotionEngine.init(config);

// 상태 조회
emotionEngine.getEmotion();      // EmotionType
emotionEngine.getConfidence();   // number (0-1)
emotionEngine.getState();        // EmotionState

// 수동 설정
emotionEngine.setEmotion('happy');

// 구독
const unsubscribe = emotionEngine.subscribe(callback);

// 상품 점수
emotionEngine.getProductScore('product-id');    // number
emotionEngine.getProductScores(['id1', 'id2']); // ProductEmotionScore[]

// 테마
emotionEngine.getTheme();   // EmotionTheme
emotionEngine.applyTheme(); // CSS 변수 적용

// 텍스트 분석
await emotionEngine.analyzeText('오늘 너무 스트레스 받아요');

// 활성화/비활성화
emotionEngine.enable();
emotionEngine.disable();
emotionEngine.isEnabled();

// 정리
emotionEngine.destroy();
```

### BehaviorTracker

행동 데이터 수집 및 분석

```typescript
import { BehaviorTracker } from '@healside/emotion-sdk';

const tracker = new BehaviorTracker({
  trackMouse: true,
  trackScroll: true,
  trackClicks: true,
  sampleInterval: 100
});

tracker.start();

// 메트릭 조회
const metrics = tracker.getMetrics();
// {
//   mouseSpeed: 250,      // px/s
//   scrollSpeed: 500,     // px/s
//   clickFrequency: 12,   // clicks/min
//   dwellTime: 45000,     // ms
//   hesitationTime: 2000  // ms
// }

// 감정 추론
const { emotion, confidence, reasons } = tracker.inferEmotion();

tracker.stop();
```

### TextAnalyzer

텍스트 감정 분석

```typescript
import { TextAnalyzer } from '@healside/emotion-sdk';

const analyzer = new TextAnalyzer({
  language: 'auto',
  useLocalAnalysis: true
});

const result = await analyzer.analyze('오늘 정말 기분이 좋아요!');
// {
//   emotion: 'happy',
//   confidence: 0.85,
//   scores: { happy: 0.85, neutral: 0.1, ... },
//   keywords: ['기분', '좋아'],
//   language: 'ko'
// }

// 스트리밍 분석 (실시간 입력)
const stream = analyzer.createStreamAnalyzer((result) => {
  console.log('실시간 분석:', result);
}, 500); // 500ms 디바운스

stream.feed('오늘');
stream.feed('오늘 기분이');
stream.feed('오늘 기분이 좋아요');
```

### MultimodalFusion

행동 + 텍스트 융합 분석

```typescript
import { MultimodalFusion } from '@healside/emotion-sdk';

const fusion = new MultimodalFusion({
  behaviorWeight: 0.4,
  textWeight: 0.6,
  useHysteresis: true,
  autoAnalyzeInterval: 5000
});

fusion.start();

// 텍스트 입력
fusion.feedText('스트레스 받아요');

// 결과 구독
fusion.subscribe((result) => {
  console.log('융합 결과:', result.emotion, result.source);
});

// 수동 설정
fusion.setManualEmotion('meditation');
fusion.clearManualEmotion();

fusion.stop();
```

### Hysteresis

감정 전환 안정화 (특허 기술)

```typescript
import { Hysteresis } from '@healside/emotion-sdk';

const hysteresis = new Hysteresis({
  requiredConsecutiveCount: 3,  // 3회 연속 판단
  minimumSwitchIntervalMs: 5000, // 5초 최소 간격
  minConfidence: 0.7            // 70% 최소 신뢰도
});

const result = hysteresis.processEmotionJudgment('stressed', 0.8, Date.now());
// {
//   shouldTransition: true/false,
//   stableEmotion: 'neutral',
//   consecutiveCount: 2,
//   debugInfo: { ... }
// }
```

---

## ⚛️ React Hooks

### useEmotion

```typescript
import { useEmotion } from '@healside/emotion-sdk';

function MyComponent() {
  const {
    emotion,           // 현재 감정
    confidence,        // 신뢰도
    state,             // 전체 상태
    theme,             // 현재 테마
    setEmotion,        // 수동 설정
    analyzeText,       // 텍스트 분석
    getProductScore,   // 상품 점수
    getProductScores,  // 여러 상품 점수
    behaviorMetrics,   // 행동 메트릭
    isEnabled,         // 활성화 여부
    enable,            // 활성화
    disable            // 비활성화
  } = useEmotion();
  
  return <div>현재: {emotion}</div>;
}
```

### useEmotionInit

```typescript
import { useEmotionInit } from '@healside/emotion-sdk';

function App() {
  useEmotionInit({
    apiKey: 'your-api-key',
    trackBehavior: true,
    trackText: true,
    autoTheme: true,
    onEmotionChange: (state) => {
      console.log('감정 변화:', state);
    }
  });
  
  return <MyApp />;
}
```

### useEmotionTheme

```typescript
import { useEmotionTheme } from '@healside/emotion-sdk';

function ThemedComponent() {
  const theme = useEmotionTheme();
  
  return (
    <div style={{ 
      background: theme.background,
      color: theme.text 
    }}>
      감정 테마 적용됨
    </div>
  );
}
```

### useProductEmotionScore

```typescript
import { useProductEmotionScore } from '@healside/emotion-sdk';

function ProductCard({ productId }) {
  const { score, matchReason, emotionTags } = useProductEmotionScore(productId);
  
  return (
    <div>
      {score >= 0.7 && <span>추천!</span>}
      <p>매칭 이유: {matchReason}</p>
    </div>
  );
}
```

---

## 🎨 UI 컴포넌트

### EmotionPulse

감정 상태 표시 펄스

```tsx
import { EmotionPulse } from '@healside/emotion-sdk';

<EmotionPulse
  emotion="happy"
  confidence={0.85}
  size="md"           // 'sm' | 'md' | 'lg'
  position="bottom-right"
  showConfidence={true}
  onSelectEmotion={(emotion) => console.log(emotion)}
/>
```

### EmotionBadge

상품 감정 매칭 배지

```tsx
import { EmotionBadge, EmotionBadgeCompact } from '@healside/emotion-sdk';

// 풀 배지
<EmotionBadge
  emotion="stressed"
  score={0.85}
  minScore={0.6}
  variant="filled"    // 'filled' | 'outline' | 'subtle'
  showScore={true}
/>

// 컴팩트 배지
<EmotionBadgeCompact
  emotion="stressed"
  score={0.85}
/>
```

### EmotionOverlay

감정 전환 오버레이

```tsx
import { EmotionOverlay, EmotionTransitionToast } from '@healside/emotion-sdk';

// 풀 오버레이
<EmotionOverlay
  fromEmotion="neutral"
  toEmotion="happy"
  confidence={0.85}
  isVisible={showOverlay}
  onClose={() => setShowOverlay(false)}
  duration={3000}
/>

// 간단한 토스트
<EmotionTransitionToast
  fromEmotion="neutral"
  toEmotion="happy"
  isVisible={showToast}
  onClose={() => setShowToast(false)}
  position="top"
/>
```

### EmotionFeedback

실시간 분석 피드백

```tsx
import { EmotionFeedback, useFeedback } from '@healside/emotion-sdk';

function App() {
  const { feedbackBehavior, feedbackText } = useFeedback();
  
  // 피드백 추가
  feedbackBehavior('fastMouse', 'stressed');
  feedbackText('anxious', ['걱정', '불안']);
  
  return (
    <EmotionFeedback
      enabled={true}
      position="bottom-left"
      maxMessages={3}
      displayDuration={3000}
    />
  );
}
```

---

## ⚙️ 설정

### HealsideSDKConfig

```typescript
interface HealsideSDKConfig {
  // 필수
  apiKey: string;
  
  // 추적 설정
  trackBehavior?: boolean;  // 기본: true
  trackText?: boolean;      // 기본: true
  
  // UI 설정
  autoTheme?: boolean;      // 기본: true
  enableUI?: boolean;       // 기본: true
  
  // 디버그
  debug?: boolean;          // 기본: false
  
  // 콜백
  onEmotionChange?: (state: EmotionState) => void;
  onError?: (error: Error) => void;
  
  // 히스테리시스
  hysteresis?: {
    consecutiveCount?: number;  // 기본: 3
    minInterval?: number;       // 기본: 5000ms
    minConfidence?: number;     // 기본: 0.7
  };
  
  // 가중치
  weights?: {
    behavior?: number;  // 기본: 0.4
    text?: number;      // 기본: 0.6
  };
}
```

---

## 📝 예제

### 상품 카드에 감정 배지 추가

```tsx
import { useEmotion, EmotionBadge } from '@healside/emotion-sdk';

function ProductCard({ product }) {
  const { emotion, getProductScore } = useEmotion();
  const score = getProductScore(product.id);
  
  return (
    <div className="product-card">
      {score >= 0.7 && (
        <EmotionBadge
          emotion={emotion}
          score={score}
          variant="filled"
        />
      )}
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price}</p>
    </div>
  );
}
```

### AI 챗봇에 감정 연동

```tsx
import { useEmotion } from '@healside/emotion-sdk';

function ChatBot() {
  const { emotion, analyzeText } = useEmotion();
  const [input, setInput] = useState('');
  
  const handleSend = async () => {
    // 사용자 입력 분석
    await analyzeText(input);
    
    // 감정에 맞는 응답 생성
    const response = await generateResponse(input, emotion);
    // ...
  };
  
  return (
    <div>
      <input 
        value={input} 
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSend}>전송</button>
    </div>
  );
}
```

---

## 🔬 특허 기술

### 멀티모달 감정 융합 (Patent Pending)

행동 데이터와 텍스트 분석을 결합하여 더 정확한 감정 추론

```
행동 분석 (40%)     텍스트 분석 (60%)
     │                    │
     └────────┬───────────┘
              │
        멀티모달 융합
              │
        최종 감정 판단
```

### 히스테리시스 안정화 (Patent Pending)

감정 전환의 안정성을 보장하는 알고리즘

```
조건 1: 연속 3회 동일 감정 판단
조건 2: 최소 5초 간격
조건 3: 신뢰도 70% 이상
━━━━━━━━━━━━━━━━━━━━━━━━━━━
→ 모든 조건 충족 시에만 전환
```

---

## 📄 라이선스

Proprietary License - © 2025 Healside. All rights reserved.

특허 출원 중 (Patent Pending)

---

## 🤝 지원

- 📧 Email: healside.official@gmail.com
- 📚 Documentation: https://docs.healside.com
- 🐛 Issues: https://github.com/healside/emotion-sdk/issues

