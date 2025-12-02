/**
 * Healside Emotion SDK - Demo Page
 * 
 * SDK 기능을 독립적으로 테스트하는 데모 페이지
 * 이 페이지는 쇼핑몰과 별개로 SDK만 테스트 가능
 */

import React, { useState, useEffect, useCallback } from 'react';
import { EmotionEngine } from '../core/EmotionEngine';
import { BehaviorTracker } from '../core/BehaviorTracker';
import { TextAnalyzer } from '../core/TextAnalyzer';
import { MultimodalFusion } from '../core/MultimodalFusion';
import { BenchmarkEngine } from '../core/BenchmarkEngine';
import { EmotionPulse } from '../ui/EmotionPulse';
import { EmotionBadge, EmotionMatchIndicator } from '../ui/EmotionBadge';
import { EmotionOverlay, EmotionTransitionToast } from '../ui/EmotionOverlay';
import { EmotionFeedback, useFeedback } from '../ui/EmotionFeedback';
import { EMOTION_THEMES, EMOTION_LABELS_KO } from '../utils/themes';
import type { EmotionType, BehaviorMetrics } from '../types';

/**
 * EmotionDemo - SDK 독립 데모 페이지
 */
export const EmotionDemo: React.FC = () => {
  // 상태
  const [currentEmotion, setCurrentEmotion] = useState<EmotionType>('neutral');
  const [confidence, setConfidence] = useState(0.5);
  const [source, setSource] = useState<'auto' | 'manual' | 'text' | 'behavior' | 'multimodal'>('auto');
  const [behaviorMetrics, setBehaviorMetrics] = useState<BehaviorMetrics | null>(null);
  const [textInput, setTextInput] = useState('');
  const [showOverlay, setShowOverlay] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [prevEmotion, setPrevEmotion] = useState<EmotionType>('neutral');
  const [isTracking, setIsTracking] = useState(false);
  const [debugMode, setDebugMode] = useState(true);

  // 인스턴스
  const [fusion] = useState(() => new MultimodalFusion({ debug: true }));
  const [textAnalyzer] = useState(() => new TextAnalyzer({ debug: true }));
  const [benchmark] = useState(() => new BenchmarkEngine());
  
  // 벤치마크 상태
  const [benchmarkResult, setBenchmarkResult] = useState<any>(null);
  const [isBenchmarking, setIsBenchmarking] = useState(false);
  
  // 피드백 훅
  const { feedbackBehavior, feedbackText, feedbackFusion, feedbackTransition } = useFeedback();

  // 테마
  const theme = EMOTION_THEMES[currentEmotion] || EMOTION_THEMES.neutral;

  // 추적 시작/중지
  const toggleTracking = useCallback(() => {
    if (isTracking) {
      fusion.stop();
      setIsTracking(false);
    } else {
      fusion.start();
      setIsTracking(true);
    }
  }, [isTracking, fusion]);

  // 융합 결과 구독
  useEffect(() => {
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
  useEffect(() => {
    if (!isTracking) return;

    const metricsInterval = setInterval(() => {
      const metrics = fusion.getBehaviorMetrics();
      setBehaviorMetrics(metrics);
    }, 1000); // 1초마다 업데이트

    return () => clearInterval(metricsInterval);
  }, [isTracking, fusion]);

  // 텍스트 분석
  const handleTextAnalysis = useCallback(async () => {
    if (!textInput.trim()) return;

    const result = await textAnalyzer.analyze(textInput);
    fusion.feedText(textInput);
    
    feedbackText(result.emotion, result.keywords);
  }, [textInput, textAnalyzer, fusion, feedbackText]);

  // 수동 감정 선택
  const handleManualSelect = useCallback((emotion: EmotionType) => {
    setPrevEmotion(currentEmotion);
    fusion.setManualEmotion(emotion);
    setShowOverlay(true);
  }, [fusion, currentEmotion]);

  // 수동 선택 해제
  const clearManualSelect = useCallback(() => {
    fusion.clearManualEmotion();
  }, [fusion]);

  // 벤치마크 실행
  const runBenchmark = useCallback(async () => {
    setIsBenchmarking(true);
    try {
      const result = await benchmark.validateAccuracy(async (text: string) => {
        return await textAnalyzer.analyze(text);
      });
      setBenchmarkResult(result);
      console.log('[Benchmark] Result:', result);
    } catch (error) {
      console.error('[Benchmark] Error:', error);
    } finally {
      setIsBenchmarking(false);
    }
  }, [benchmark, textAnalyzer]);

  return (
    <div 
      className="min-h-screen transition-colors duration-1000"
      style={{ 
        background: theme.gradient,
        fontFamily: "'Helvetica Neue', 'Pretendard', sans-serif"
      }}
    >
      {/* 헤더 - 밝은 테마 */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-5">
          <div className="flex items-center justify-between">
            {/* 좌측: 로고 & 타이틀 */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-md">
                  <span className="text-white text-xl font-bold">H</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold tracking-tight" style={{ color: theme.text }}>
                    HEALSIDE EMOTION SDK
                  </h1>
                  <p className="text-xs uppercase tracking-wider" style={{ color: theme.secondary }}>
                    Developer Preview v1.0
                  </p>
                </div>
              </div>
              
              {/* 쇼핑몰 이동 버튼 */}
              <a
                href="/"
                className="
                  px-6 py-2.5 rounded-lg
                  bg-gradient-to-r from-emerald-500 to-teal-600
                  text-white text-sm font-medium
                  hover:from-emerald-600 hover:to-teal-700
                  transition-all duration-200
                  flex items-center gap-2
                  shadow-lg shadow-emerald-500/20
                "
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                실제 쇼핑몰 보기
              </a>
            </div>
            
            {/* 우측: 컨트롤 */}
            <div className="flex items-center gap-4">
              {/* 추적 토글 */}
              <button
                onClick={toggleTracking}
                className={`
                  px-5 py-2.5 rounded-lg text-sm font-medium
                  transition-all duration-200 shadow-sm
                  ${isTracking 
                    ? 'bg-green-50 text-green-600 border border-green-200' 
                    : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                  }
                `}
              >
                <span className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isTracking ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                  {isTracking ? '추적 중' : '추적 시작'}
                </span>
              </button>
              
              {/* 디버그 모드 */}
              <label className="flex items-center gap-2 text-sm cursor-pointer transition-colors" style={{ color: theme.secondary }}>
                <input
                  type="checkbox"
                  checked={debugMode}
                  onChange={(e) => setDebugMode(e.target.checked)}
                  className="rounded border-gray-300 text-emerald-500 focus:ring-emerald-500/50"
                />
                <span className="uppercase tracking-wider text-xs">Debug</span>
              </label>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* 좌측: 현재 상태 */}
          <section className="space-y-6">
            {/* 현재 감정 카드 - 밝은 테마 */}
            <div 
              className="p-8 rounded-2xl border shadow-lg bg-white"
              style={{ borderColor: `${theme.accent}20` }}
            >
              <h2 className="text-xs font-semibold mb-6 uppercase tracking-widest" style={{ color: theme.secondary }}>
                Current Emotion State
              </h2>
              
              <div className="flex items-center gap-8">
                <div 
                  className="w-28 h-28 rounded-2xl flex items-center justify-center text-5xl shadow-xl"
                  style={{ 
                    background: `linear-gradient(135deg, ${theme.accent}15 0%, ${theme.accent}05 100%)`,
                    border: `3px solid ${theme.accent}`
                  }}
                >
                  {EMOTION_LABELS_KO[currentEmotion]?.charAt(0) || '😊'}
                </div>
                
                <div className="flex-1">
                  <div className="text-4xl font-bold mb-2" style={{ color: theme.text }}>
                    {EMOTION_LABELS_KO[currentEmotion]}
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span style={{ color: theme.secondary }}>
                      신뢰도
                    </span>
                    <span className="font-mono font-bold" style={{ color: theme.accent }}>
                      {Math.round(confidence * 100)}%
                    </span>
                  </div>
                  <div className="mt-2 text-xs uppercase tracking-wider" style={{ color: theme.secondary }}>
                    {source === 'manual' ? '수동 선택' : 
                     source === 'text' ? '텍스트 분석' :
                     source === 'behavior' ? '행동 분석' :
                     source === 'multimodal' ? '멀티모달 융합' : '자동 분석'}
                  </div>
                </div>
              </div>

              {/* 신뢰도 바 */}
              <div className="mt-6">
                <div className="flex justify-between text-xs mb-2" style={{ color: theme.secondary }}>
                  <span className="uppercase tracking-wider font-semibold">Confidence</span>
                  <span className="font-mono font-bold">{Math.round(confidence * 100)}%</span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${confidence * 100}%`,
                      background: `linear-gradient(90deg, ${theme.accent} 0%, ${theme.accent}CC 100%)`
                    }}
                  />
                </div>
              </div>
            </div>

            {/* 텍스트 분석 - 밝은 테마 */}
            <div 
              className="p-8 rounded-2xl border shadow-lg bg-white"
              style={{ borderColor: `${theme.accent}20` }}
            >
              <h2 className="text-xs font-semibold mb-6 uppercase tracking-widest" style={{ color: theme.secondary }}>
                Text Emotion Analysis
              </h2>
              
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="감정을 담은 텍스트를 입력하세요...&#10;예: 오늘 너무 스트레스 받아서 힘들어요"
                className="w-full h-32 p-4 rounded-xl bg-gray-50 border-2 resize-none focus:outline-none focus:ring-2 transition-all"
                style={{ 
                  borderColor: theme.accent + '30',
                  color: theme.text
                }}
              />
              
              <button
                onClick={handleTextAnalysis}
                disabled={!textInput.trim()}
                className="mt-4 w-full py-3.5 rounded-xl text-white font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
                style={{ 
                  background: textInput.trim() 
                    ? `linear-gradient(135deg, ${theme.accent} 0%, ${theme.accent}DD 100%)`
                    : '#E5E7EB'
                }}
              >
                분석하기
              </button>
            </div>

            {/* 수동 감정 선택 - 밝은 테마 */}
            <div 
              className="p-8 rounded-2xl border shadow-lg bg-white"
              style={{ borderColor: `${theme.accent}20` }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xs font-semibold uppercase tracking-widest" style={{ color: theme.secondary }}>
                  Manual Selection
                </h2>
                {source === 'manual' && (
                  <button
                    onClick={clearManualSelect}
                    className="text-xs font-semibold uppercase tracking-wider transition-colors hover:underline"
                    style={{ color: theme.accent }}
                  >
                    Auto Mode
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-4 gap-3">
                {(Object.keys(EMOTION_LABELS_KO) as EmotionType[]).map((em) => (
                  <button
                    key={em}
                    onClick={() => handleManualSelect(em)}
                    className={`
                      p-4 rounded-xl text-center transition-all duration-200
                      hover:scale-105 hover:shadow-lg
                      ${currentEmotion === em 
                        ? 'ring-2 ring-offset-2' 
                        : 'hover:bg-gray-50'
                      }
                    `}
                    style={{
                      background: currentEmotion === em 
                        ? `${EMOTION_THEMES[em].accent}15`
                        : '#FAFAFA',
                      border: currentEmotion === em ? `2px solid ${EMOTION_THEMES[em].accent}` : '1px solid #E5E7EB',
                      ringColor: EMOTION_THEMES[em].accent
                    }}
                  >
                    <div className="text-2xl mb-2">
                      {em === 'neutral' ? '🍃' :
                       em === 'happy' ? '☀️' :
                       em === 'excited' ? '✨' :
                       em === 'stressed' ? '⚡' :
                       em === 'anxious' ? '💨' :
                       em === 'sad' ? '🌧️' :
                       em === 'anger' ? '🔥' :
                       em === 'fear' ? '☂️' :
                       em === 'surprise' ? '⭐' :
                       em === 'meditation' ? '🌸' :
                       em === 'fatigue' ? '🌙' : '🌫️'}
                    </div>
                    <div className="text-xs font-semibold" style={{ color: EMOTION_THEMES[em].text }}>
                      {EMOTION_LABELS_KO[em]}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* 우측: 분석 데이터 */}
          <section className="space-y-6">
            {/* 행동 메트릭 - 밝은 테마 */}
            <div 
              className="p-8 rounded-2xl border shadow-lg bg-white"
              style={{ borderColor: `${theme.accent}20` }}
            >
              <h2 className="text-xs font-semibold mb-6 uppercase tracking-widest" style={{ color: theme.secondary }}>
                Behavior Metrics
              </h2>
              
              {behaviorMetrics ? (
                <div className="space-y-5">
                  <MetricBar 
                    label="마우스 속도" 
                    value={behaviorMetrics.mouseSpeed} 
                    max={1000}
                    unit="px/s"
                    color={theme.accent}
                  />
                  <MetricBar 
                    label="스크롤 속도" 
                    value={behaviorMetrics.scrollSpeed} 
                    max={2000}
                    unit="px/s"
                    color={theme.accent}
                  />
                  <MetricBar 
                    label="클릭 빈도" 
                    value={behaviorMetrics.clickFrequency} 
                    max={60}
                    unit="clicks/min"
                    color={theme.accent}
                  />
                  <MetricBar 
                    label="체류 시간" 
                    value={behaviorMetrics.dwellTime / 1000} 
                    max={300}
                    unit="초"
                    color={theme.accent}
                  />
                  <MetricBar 
                    label="망설임 시간" 
                    value={behaviorMetrics.hesitationTime / 1000} 
                    max={10}
                    unit="초"
                    color={theme.accent}
                  />
                </div>
              ) : (
                <div className="text-center py-12" style={{ color: theme.secondary }}>
                  <div className="text-4xl mb-3">📊</div>
                  <p className="text-sm">추적을 시작하면 메트릭이 표시됩니다</p>
                </div>
              )}
            </div>

            {/* UI 컴포넌트 미리보기 - 밝은 테마 */}
            <div 
              className="p-8 rounded-2xl border shadow-lg bg-white"
              style={{ borderColor: `${theme.accent}20` }}
            >
              <h2 className="text-xs font-semibold mb-6 uppercase tracking-widest" style={{ color: theme.secondary }}>
                UI Components Preview
              </h2>
              
              <div className="space-y-6">
                {/* 배지 변형 */}
                <div>
                  <div className="text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: theme.secondary }}>
                    Badge Variants
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <EmotionBadge emotion={currentEmotion} score={0.85} variant="filled" />
                    <EmotionBadge emotion={currentEmotion} score={0.85} variant="outline" />
                    <EmotionBadge emotion={currentEmotion} score={0.85} variant="subtle" />
                  </div>
                </div>

                {/* 버튼들 */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowOverlay(true)}
                    className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${theme.accent} 0%, ${theme.accent}DD 100%)` }}
                  >
                    Overlay Test
                  </button>
                  <button
                    onClick={() => setShowToast(true)}
                    className="px-5 py-2.5 rounded-lg text-sm font-semibold border-2 transition-all hover:bg-gray-50"
                    style={{ borderColor: theme.accent, color: theme.accent }}
                  >
                    Toast Test
                  </button>
                </div>
              </div>
            </div>

            {/* 테마 색상 - 밝은 테마 */}
            <div 
              className="p-8 rounded-2xl border shadow-lg bg-white"
              style={{ borderColor: `${theme.accent}20` }}
            >
              <h2 className="text-xs font-semibold mb-6 uppercase tracking-widest" style={{ color: theme.secondary }}>
                Theme Colors
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                <ColorSwatch label="Background" color={theme.background} />
                <ColorSwatch label="Accent" color={theme.accent} />
                <ColorSwatch label="Text" color={theme.text} />
                <ColorSwatch label="Secondary" color={theme.secondary} />
              </div>
            </div>
          </section>
        </div>

        {/* 벤치마크 섹션 */}
        <section className="mt-12">
          <div 
            className="p-8 rounded-2xl border shadow-lg bg-white"
            style={{ borderColor: `${theme.accent}20` }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: theme.secondary }}>
                  Accuracy Benchmark
                </h2>
                <p className="text-sm text-gray-600">
                  실시간 정확도 검증 (투자자/고객용)
                </p>
              </div>
              
              <button
                onClick={runBenchmark}
                disabled={isBenchmarking}
                className={`
                  px-6 py-3 rounded-lg text-sm font-semibold
                  transition-all duration-200 shadow-md
                  ${isBenchmarking 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700'
                  }
                `}
              >
                {isBenchmarking ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    검증 중...
                  </span>
                ) : '정확도 검증 시작'}
              </button>
            </div>

            {benchmarkResult && (
              <div className="space-y-6">
                {/* 전체 정확도 */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-6 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200">
                    <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-2">
                      전체 정확도
                    </div>
                    <div className="text-4xl font-bold text-emerald-700">
                      {benchmarkResult.accuracy}
                    </div>
                    <div className="text-xs text-emerald-600 mt-1">
                      {benchmarkResult.passed}/{benchmarkResult.totalTests} 통과
                    </div>
                  </div>

                  <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
                    <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2">
                      한국어
                    </div>
                    <div className="text-4xl font-bold text-blue-700">
                      {benchmarkResult.byLanguage.ko.accuracy}
                    </div>
                    <div className="text-xs text-blue-600 mt-1">
                      {benchmarkResult.byLanguage.ko.passed}/{benchmarkResult.byLanguage.ko.total} 통과
                    </div>
                  </div>

                  <div className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200">
                    <div className="text-xs font-semibold uppercase tracking-wider text-purple-600 mb-2">
                      English
                    </div>
                    <div className="text-4xl font-bold text-purple-700">
                      {benchmarkResult.byLanguage.en.accuracy}
                    </div>
                    <div className="text-xs text-purple-600 mt-1">
                      {benchmarkResult.byLanguage.en.passed}/{benchmarkResult.byLanguage.en.total} 통과
                    </div>
                  </div>
                </div>

                {/* 카테고리별 정확도 */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-600 mb-4">
                    카테고리별 정확도
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(benchmarkResult.byCategory).map(([category, data]: [string, any]) => (
                      <div key={category} className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700 capitalize">
                            {category}
                          </span>
                          <span className="text-lg font-bold" style={{ color: theme.accent }}>
                            {data.accuracy}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {data.passed}/{data.total} 통과
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 실패한 케이스 */}
                {benchmarkResult.failed.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-red-600 mb-4">
                      실패한 케이스 ({benchmarkResult.failed.length}개)
                    </h3>
                    <div className="space-y-2">
                      {benchmarkResult.failed.map((fail: any, idx: number) => (
                        <div key={idx} className="p-4 rounded-lg bg-red-50 border border-red-200">
                          <div className="text-sm font-medium text-gray-800 mb-2">
                            "{fail.text}"
                          </div>
                          <div className="flex gap-4 text-xs">
                            <span className="text-red-600">
                              예측: <strong>{fail.predicted}</strong>
                            </span>
                            <span className="text-green-600">
                              정답: <strong>{fail.expected}</strong>
                            </span>
                            <span className="text-gray-500">
                              신뢰도: {Math.round(fail.confidence * 100)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 타임스탬프 */}
                <div className="text-xs text-gray-400 text-right">
                  검증 시각: {new Date(benchmarkResult.timestamp).toLocaleString('ko-KR')}
                </div>
              </div>
            )}

            {!benchmarkResult && !isBenchmarking && (
              <div className="text-center py-12 text-gray-400">
                <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                <p className="text-sm">
                  정확도 검증을 시작하려면 위 버튼을 클릭하세요
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* UI 컴포넌트들 */}
      <EmotionPulse
        emotion={currentEmotion}
        confidence={confidence}
        source={source}
        onSelectEmotion={handleManualSelect}
        showConfidence={true}
        size="md"
        position="bottom-right"
      />

      <EmotionFeedback
        enabled={debugMode}
        position="bottom-left"
        isNewUser={false}
      />

      <EmotionOverlay
        fromEmotion={prevEmotion}
        toEmotion={currentEmotion}
        confidence={confidence}
        isVisible={showOverlay}
        onClose={() => setShowOverlay(false)}
        duration={3000}
      />

      <EmotionTransitionToast
        fromEmotion={prevEmotion}
        toEmotion={currentEmotion}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        position="top"
      />
    </div>
  );
};

// 헬퍼 컴포넌트: 메트릭 바 (밝은 테마)
const MetricBar: React.FC<{
  label: string;
  value: number;
  max: number;
  unit: string;
  color: string;
}> = ({ label, value, max, unit, color }) => {
  const percentage = Math.min(100, (value / max) * 100);
  
  return (
    <div>
      <div className="flex justify-between text-xs mb-2">
        <span className="text-gray-600 uppercase tracking-wider font-semibold">{label}</span>
        <span className="font-mono font-bold" style={{ color }}>
          {value.toFixed(1)} <span className="text-gray-400">{unit}</span>
        </span>
      </div>
      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-500"
          style={{ 
            width: `${percentage}%`, 
            background: `linear-gradient(90deg, ${color} 0%, ${color}DD 100%)`
          }}
        />
      </div>
    </div>
  );
};

// 헬퍼 컴포넌트: 색상 스와치 (밝은 테마)
const ColorSwatch: React.FC<{
  label: string;
  color: string;
}> = ({ label, color }) => (
  <div className="flex items-center gap-3">
    <div 
      className="w-10 h-10 rounded-lg border-2 border-gray-200 shadow-md"
      style={{ background: color }}
    />
    <div>
      <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{label}</div>
      <div className="text-xs font-mono text-gray-700 font-bold">{color}</div>
    </div>
  </div>
);

export default EmotionDemo;

