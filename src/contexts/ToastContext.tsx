import{ createContext, useContext } from 'react';
import type { ToastContextTypeModel } from '@models/toast';

export const ToastContext = createContext<ToastContextTypeModel | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
