/**
 * Healside Emotion SDK - Configuration
 * 
 * 환경별 설정 관리
 * - Development: localhost
 * - Production (External): 절대 경로 (외부 고객사)
 */

export interface SDKConfig {
  apiEndpoint: string;
  apiKey?: string;
  mode: 'internal' | 'external';
  debug?: boolean;
}

/**
 * 기본 설정
 */
const DEFAULT_CONFIG = {
  development: {
    apiEndpoint: 'http://localhost:3000/api/emotion',
    mode: 'internal' as const,
    debug: true
  },
  production_external: {
    apiEndpoint: 'https://api.healside.net/v1/emotion',
    mode: 'external' as const,
    debug: false
  }
};

/**
 * SDK 설정 가져오기
 */
export function getSDKConfig(customConfig?: Partial<SDKConfig>): SDKConfig {
  // 개발 환경
  if (process.env.NODE_ENV === 'development') {
    return { ...DEFAULT_CONFIG.development, ...customConfig };
  }

  // 프로덕션 - 외부 고객사 (API Key 필수)
  return { ...DEFAULT_CONFIG.production_external, ...customConfig };
}

/**
 * API 호출 헬퍼
 */
export async function callEmotionAPI(
  endpoint: string,
  config: SDKConfig,
  body: any
): Promise<any> {
  const url = `${config.apiEndpoint}${endpoint}`;
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  };

  // 외부 고객사는 API Key 필수
  if (config.mode === 'external' && config.apiKey) {
    headers['Authorization'] = `Bearer ${config.apiKey}`;
  }

  if (config.debug) {
    console.log('[Emotion SDK] API Call:', { url, body });
  }

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();

  if (config.debug) {
    console.log('[Emotion SDK] API Response:', data);
  }

  return data;
}

