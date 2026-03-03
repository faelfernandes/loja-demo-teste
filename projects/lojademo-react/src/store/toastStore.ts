import { create } from 'zustand';

interface ToastAction {
  label: string;
  onClick: () => void;
}

interface ToastOptions {
  action?: ToastAction;
  type?: 'success' | 'info';
}

interface Toast {
  id: number;
  message: string;
  action?: ToastAction;
  type: 'success' | 'info';
}

interface ToastState {
  toasts: Toast[];
  addToast: (message: string, options?: ToastOptions) => void;
  removeToast: (id: number) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (message, options) => {
    const id = Date.now();
    set((state) => ({ 
      toasts: [...state.toasts, { 
        id, 
        message, 
        action: options?.action,
        type: options?.type || 'success'
      }] 
    }));

    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, 5000);
  },
  removeToast: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));
