/**
 * Healside Emotion SDK - Independent Toast System
 * 
 * Healside 쇼핑몰의 useToast 의존성 제거
 * SDK 자체 Toast 시스템 구현
 */

import React, { useState, createContext, useContext, useEffect } from 'react';

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

const ToastContext = createContext<ToastContextValue | null>(null);

/**
 * EmotionToastProvider - SDK 자체 Toast Provider
 */
export const EmotionToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = (message: string, type: Toast['type'] = 'info', duration = 3000) => {
    const id = Date.now();
    const newToast: Toast = { id, message, type, duration };
    
    setToasts(prev => [...prev, newToast]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  };

  return (
    <ToastContext.Provider value={{ toast, toasts }}>
      {children}
      <EmotionToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
};

/**
 * useEmotionToast - SDK 자체 Toast Hook
 */
export const useEmotionToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useEmotionToast must be used within EmotionToastProvider');
  }
  return context;
};

/**
 * EmotionToastContainer - Toast 렌더링 컨테이너
 */
const EmotionToastContainer: React.FC<{ toasts: Toast[] }> = ({ toasts }) => {
  return (
    <div className="healside-emotion-toast-container fixed bottom-4 right-4 z-[9999] space-y-2">
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
};

/**
 * ToastItem - 개별 Toast 아이템
 */
const ToastItem: React.FC<{ toast: Toast }> = ({ toast }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 애니메이션을 위한 약간의 딜레이
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  return (
    <div
      className={`
        healside-emotion-toast
        px-4 py-3 rounded-lg shadow-lg
        text-sm font-medium
        transition-all duration-300
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        ${getToastStyles(toast.type)}
      `}
    >
      <div className="flex items-center gap-2">
        {getToastIcon(toast.type)}
        <span>{toast.message}</span>
      </div>
    </div>
  );
};

function getToastStyles(type: Toast['type']): string {
  const styles = {
    info: 'bg-blue-50 text-blue-800 border border-blue-200',
    success: 'bg-green-50 text-green-800 border border-green-200',
    error: 'bg-red-50 text-red-800 border border-red-200',
    warning: 'bg-yellow-50 text-yellow-800 border border-yellow-200'
  };
  return styles[type];
}

function getToastIcon(type: Toast['type']): React.ReactNode {
  const icons = {
    info: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
    ),
    success: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    )
  };
  return icons[type];
}

