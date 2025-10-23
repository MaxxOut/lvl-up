import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx'
import ReactDOM from 'react-dom/client';
import React from 'react';
import '@plugins/i18next/i18next.ts';
import { ToastProvider } from '@components/toast/ToastProvider.tsx';
import { SettingsProvider } from '@/contexts/SettingsContext.tsx';
import { LibraryProvider } from '@contexts/LibraryContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <SettingsProvider>
          <LibraryProvider>
            <App />
          </LibraryProvider>
        </SettingsProvider>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
