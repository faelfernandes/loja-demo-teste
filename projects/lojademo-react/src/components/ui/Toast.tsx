import React from 'react';
import { useToastStore } from '../../store/toastStore';
import { CheckCircle2, X, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <div 
          key={toast.id} 
          className="bg-slate-900 border border-slate-800 shadow-2xl shadow-slate-900/20 rounded-2xl p-4 flex items-center gap-3 pointer-events-auto animate-slide-up min-w-[300px]"
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="h-6 w-6 text-green-400 shrink-0" />
          ) : (
            <Info className="h-6 w-6 text-blue-400 shrink-0" />
          )}
          
          <p className="text-sm font-bold text-white flex-1 pr-2">{toast.message}</p>
          
          {/* Botão de Ação (Desfazer) */}
          {toast.action && (
            <button 
              onClick={() => {
                toast.action!.onClick();
                removeToast(toast.id);
              }}
              className="text-sm font-black text-violet-400 hover:text-violet-300 transition-colors shrink-0 px-3 py-1.5 rounded-xl hover:bg-slate-800 active:scale-95"
            >
              {toast.action.label}
            </button>
          )}

          <button 
            onClick={() => removeToast(toast.id)}
            className="text-slate-400 hover:text-white transition-colors shrink-0 bg-slate-800 hover:bg-slate-700 p-1.5 rounded-full"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
