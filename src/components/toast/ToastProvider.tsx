import React, { useState, type ReactNode } from 'react';
import Toast from '@components/toast/Toast.tsx';
import { ToastContext } from '@contexts/ToastContext';
import type { ToastOptionsModel } from '@models/toast';

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<ToastOptionsModel | null>(null);

  // function changes toast state
  const showToast = (options: ToastOptionsModel) => {
    setToast(options);
  };

  const closeToast = () => {
    setToast(null);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={closeToast}
        />
      )}
    </ToastContext.Provider>
  );
};
