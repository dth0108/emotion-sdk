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
 * SDK 설정 가져오기
 */
export declare function getSDKConfig(customConfig?: Partial<SDKConfig>): SDKConfig;
/**
 * API 호출 헬퍼
 */
export declare function callEmotionAPI(endpoint: string, config: SDKConfig, body: any): Promise<any>;
//# sourceMappingURL=config.d.ts.map