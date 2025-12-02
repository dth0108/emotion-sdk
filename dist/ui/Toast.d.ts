/**
 * Healside Emotion SDK - Independent Toast System
 *
 * Healside 쇼핑몰의 useToast 의존성 제거
 * SDK 자체 Toast 시스템 구현
 */
import React from 'react';
interface Toast {
    id: number;
    message: string;
    type: 'info' | 'success' | 'error' | 'warning';
    duration: number;
}
interface ToastContextValue {
    toast: (message: string, type?: Toast['type'], duration?: number) => void;
    toasts: Toast[];
}
/**
 * EmotionToastProvider - SDK 자체 Toast Provider
 */
export declare const EmotionToastProvider: React.FC<{
    children: React.ReactNode;
}>;
/**
 * useEmotionToast - SDK 자체 Toast Hook
 */
export declare const useEmotionToast: () => ToastContextValue;
export {};
//# sourceMappingURL=Toast.d.ts.map