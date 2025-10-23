import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from '@plugins/i18next/locales/en.json';
import ua from '@plugins/i18next/locales/ua.json';

const resources = {
  en: { translation: en },
  ua: { translation: ua },
};

i18n
  .use(LanguageDetector) // browser lang
  .use(initReactI18next) // i18n to react-i18next
  .init({
    resources,
    fallbackLng: 'en',
    detection: {
      order: ['navigator'],
    },
    interpolation: {
      escapeValue: false, // React by default protect from XSS
    },
  });

export default i18n;
