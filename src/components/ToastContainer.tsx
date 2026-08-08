

// src/components/ToastContainer.tsx
import React from 'react';
import  type { Toast } from '../types/Index';

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  return (
    // Fixed layout container in the bottom right corner
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`p-4 rounded-lg shadow-lg border text-sm font-medium flex justify-between items-center animate-slide-in transition-all ${
              isSuccess 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                : isError 
                  ? 'bg-rose-50 border-rose-200 text-rose-800' 
                  : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}
          >
            <span>{toast.message}</span>
            <button
              onClick={() => onRemove(toast.id)}
              className="ml-4 text-slate-400 hover:text-slate-600 focus:outline-none"
            >
              &times;
            </button>
          </div>
        );
      })}
    </div>
  );
};