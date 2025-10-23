import React, { useEffect, useRef, } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ArrowLeftIcon from '../components/icons/ArrowLeftIcon';
import LangSwitcher from '@components/ui/LangSwitcher';
import DarkModeSwitcher from '@components/ui/DarkModeSwitcher.tsx';
import { useToast } from '@/contexts/ToastContext.tsx';
import MainHeader from '@components/layout/MainHeader.tsx';
import SettingsToggle from '@components/ui/SettingToggle.tsx';
import SettingsRange from '@components/ui/SettingsRange.tsx';
import useScroll from '@/hooks/use-scroll.ts'
import { useSettings } from '@contexts/SettingsContext.tsx';
import type { SettingsModel } from '@models/settings';

const SettingsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { settings, updateSetting } = useSettings();
  const darkMode: boolean = settings.darkMode;
  const isEnglish: boolean = settings.englishInterface;

  const setDarkMode = (darkMode: boolean): void => {
    updateSetting('darkMode', darkMode);
  };

  const setIsEnglish = (isEnglish: boolean): void => {
    updateSetting('englishInterface', isEnglish);
  };

  const scrollableDivRef = useRef(null);
  const isScrolled = useScroll(scrollableDivRef) > 0;

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));

    document.documentElement.setAttribute('data-theme', settings.darkMode ? 'dark' : 'light');
    i18n.changeLanguage(settings.englishInterface ? 'en' : 'ua');

  }, [settings, i18n]);

  // Effect to handle language changes (not complete)
  useEffect(() => {
    i18n.changeLanguage(isEnglish ? 'en' : 'ua');
    localStorage.setItem('lang', isEnglish ? 'en' : 'ua');
  }, [isEnglish, i18n]);

  // const handleClearDB = () => {
  //   if (window.confirm(t('clearDB'))) {
  //     try {
  //       // ...
  //       showToast({ message: t('DBClearedSuccess') });
  //     }
  //     catch {
  //       // ...
  //       showToast({ message: t('DBClearedError'), type: 'warning' });
  //     }
  //   }
  // };

  // update settings elements
  const handleUpdateNested = (
    parentKey: keyof SettingsModel,
    nestedKey: string, // 'wordConstructor', 'current'
    newValue: any
  ) => {
    const currentNestedObject = settings[parentKey];

    const newNestedObject = {
      ...currentNestedObject,
      [nestedKey]: newValue,
    };

    updateSetting(parentKey, newNestedObject);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const BackButton = (
    <button
      className="button button_icon button_small both-mode button_without-shadow"
      onClick={handleGoHome}
    >
      <ArrowLeftIcon/>
    </button>
  );

  return (
    <div className="content">
      <MainHeader
        slotLeft={BackButton} // Передаем кнопку в левый слот
      />

      <div ref={scrollableDivRef} className={`content__value ${isScrolled ? 'content__value_scrolled' : ''}`}>
        <h2 className="header-2">{ t('common.settings') }</h2>
        <h3 className="header-3">{ t('common.common') }</h3>

        <div className="content__home-actions">
          <LangSwitcher isEnglish={isEnglish} onToggle={() => setIsEnglish(!isEnglish)}/>
          <DarkModeSwitcher isDarkMode={darkMode} onToggle={() => setDarkMode(!darkMode)}/>
        </div>

        <hr className="hr"/>

        {/**
         * Learning
         */}
        <h3 className="header-3">{ t('common.learning') }</h3>
        <SettingsRange
          titleKey="settings.number_learn_words"
          min={settings.learnWords?.min}
          max={settings.learnWords?.max}
          value={settings.learnWords?.current}
          onChange={(newValue) =>
            handleUpdateNested('learnWords', 'current', newValue)
          }
        />

        {/* Using the new SettingsToggle component */}
        <SettingsToggle
          id="learnToNative"
          titleKey="settings.learn_to_native"
          checked={settings.learnSteps?.toNative}
          onToggle={() =>
            handleUpdateNested(
              'learnSteps',
              'toNative',
              !settings.learnSteps?.toNative // Вычисляем новое значение
            )
          }
        />

        <SettingsToggle
          id="learnToEnglish"
          titleKey="settings.learn_to_translated"
          checked={settings.learnSteps?.toEnglish}
          onToggle={() =>
            handleUpdateNested(
              'learnSteps',
              'toEnglish',
              !settings.learnSteps?.toEnglish // Вычисляем новое значение
            )
          }
        />

        <SettingsToggle
          id="learnConstructor"
          titleKey="settings.constructor"
          checked={settings.learnSteps?.wordConstructor}
          onToggle={() =>
            handleUpdateNested(
              'learnSteps',
              'wordConstructor',
              !settings.learnSteps?.wordConstructor // Вычисляем новое значение
            )
          }
        />

        <SettingsToggle
          id="learnWrite"
          titleKey="settings.writing"
          checked={settings.learnSteps?.writing}
          onToggle={() =>
            handleUpdateNested(
              'learnSteps',
              'writing',
              !settings.learnSteps?.writing // Вычисляем новое значение
            )
          }
        />

        <SettingsToggle
          id="extraLetters"
          titleKey="settings.extra_letters"
          checked={settings.extraLetters}
          onToggle={() =>
            updateSetting('extraLetters', !settings.extraLetters)
          }
        />

        <SettingsRange
          titleKey="settings.extra_letters_number"
          min={settings.extraLetterNumber?.min}
          max={settings.extraLetterNumber?.max}
          value={settings.extraLetterNumber?.current}
          onChange={(newValue) =>
            handleUpdateNested('extraLetterNumber', 'current', newValue)
          }
        />

        {/**
         * Repeating
         */}
        <h3 className="header-3">{ t('settings.repeating') }</h3>

        <SettingsRange
          titleKey="settings.number_repeat_words"
          min={settings?.repeatWords?.min}
          max={settings?.repeatWords?.max}
          value={settings.repeatWords?.current}
          onChange={(newValue) =>
            handleUpdateNested('repeatWords', 'current', newValue)
          }
        />

        <SettingsToggle
          id="repeatLearnToNative"
          titleKey="settings.learn_to_native"
          checked={settings.repeatSteps?.toNative}
          onToggle={() =>
            handleUpdateNested(
              'repeatSteps',
              'toNative',
              !settings.repeatSteps?.toNative // Вычисляем новое значение
            )
          }
        />

        <SettingsToggle
          id="repeatLearnToEnglish"
          titleKey="settings.learn_to_translated"
          checked={settings.repeatSteps?.toEnglish}
          onToggle={() =>
            handleUpdateNested(
              'repeatSteps',
              'toEnglish',
              !settings.repeatSteps?.toEnglish // Вычисляем новое значение
            )
          }
        />

        {/*<h3 className="header-3">{ t('settings.saving') }</h3>*/}
        {/*<p className="text" dangerouslySetInnerHTML={{__html: t('settings.text_1')}}/>*/}

        {/*<hr className="hr"/>*/}
        {/*<p className="text" dangerouslySetInnerHTML={{__html: t('settings.text_3')}}/>*/}
        {/*<button*/}
        {/*  className="button button_margin button_small js-button"*/}
        {/*  onClick={handleClearDB}*/}
        {/*>*/}
        {/*  {t('buttons.clear')}*/}
        {/*</button>*/}
      </div>
    </div>
  );
};

export default SettingsPage;
