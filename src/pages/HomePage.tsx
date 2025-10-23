import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import MainHeader from '@components/layout/MainHeader.tsx'
import OpenBookIcon from '@components/icons/OpenBookIcon.tsx';
import SettingIcon from '@components/icons/SettingIcon.tsx';
import { useLibrary } from '@contexts/LibraryContext.tsx';
import { useSettings } from '@contexts/SettingsContext.tsx';

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { library } = useLibrary();
  const { settings} = useSettings();

  const [wordsForLearn, setWordsForLearn] = useState(0);
  const [wordsForRepeat, setWordsForRepeat] = useState(0);

  // calc once for render
  useEffect(() => {
    const getQuantityWordsForLearn = () => {
      return library.filter(e => !e.learnedAt).length;
    };

    const getQuantityWordsForRepeat = () => {
      return library.filter(e => e.learnedAt).length;
    };

    setWordsForLearn(getQuantityWordsForLearn());
    setWordsForRepeat(getQuantityWordsForRepeat());
  }, [library]);

  const handleAction = (id: string) => {
    switch (id) {
      case 'settings':
        navigate('/settings');
        break;
      case 'words':
        navigate('/words');
        break;
      case 'learn':
        if (wordsForLearn < settings.learnWords.current) {
          alert(t('home_start_error_1')); // maybe better use toast instead alert?
        } 
        else {
          navigate('/learn');
        }
        break;
      case 'repeat':
        if (wordsForRepeat < settings.repeatWords.current) {
          alert(t('home_start_error_2')); // maybe better use toast instead alert?
        }
        else {
          navigate('/repetition');
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="content">
      <MainHeader />

      <div className="content__home">
        <div className="button-group">
          <button
            disabled
            className="button"
            onClick={() => handleAction('learn')}
          >
            {t('common.start')} ({wordsForLearn})
          </button>

          <button
            disabled
            className="button"
            onClick={() => handleAction('repeat')}
          >
            {t('common.blitz')} ({wordsForRepeat})
          </button>
        </div>

        <div className="content__home-actions">
          <button
            className="button button_icon button_large both-mode"
            onClick={() => handleAction('settings')}
          >
            <SettingIcon />
          </button>

          <button
            className="button button_icon button_large both-mode"
            onClick={() => handleAction('words')}
          >
            <OpenBookIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
