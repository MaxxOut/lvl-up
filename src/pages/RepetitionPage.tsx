import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import type { WordModel } from '@models/word';
import { getLibrary } from '@utils/local-storage';
import ArrowLeftIcon from '@components/icons/ArrowLeftIcon';
import WordCard from '@components/WordCard';
// import ResultDisplay from '@components/ResultDisplay'; // Новый компонент для отображения результатов
// import { c } from '@components/toast';

const RepetitionPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [words, setWords] = useState<WordModel[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentStage, setCurrentStage] = useState<'intro' | 'toNative' | 'toEnglish' | 'results'>('intro');
  const [correctWords, setCorrectWords] = useState<WordModel[]>([]);
  const [incorrectWords, setIncorrectWords] = useState<WordModel[]>([]);

  // Здесь можно использовать реальную логику для выбора слов, например, с учетом настроек
  useEffect(() => {
    const allWords = getLibrary();
    const wordsToRepeat = allWords.slice(0, 10); // Пример: берем 10 слов для повторения
    setWords(wordsToRepeat);
    // if (wordsToRepeat.length === 0) {
    //   toast.show(t('toast_no_words_to_repeat'));
    // }
  }, [t]);

  const handleNextWord = (isCorrect: boolean) => {
    const currentWord = words[currentWordIndex];
    if (isCorrect) {
      setCorrectWords(prev => [...prev, currentWord]);
    } else {
      setIncorrectWords(prev => [...prev, currentWord]);
    }

    const nextIndex = currentWordIndex + 1;
    if (nextIndex < words.length) {
      setCurrentWordIndex(nextIndex);
    } else {
      if (currentStage === 'toNative') {
        setCurrentStage('toEnglish');
        setCurrentWordIndex(0); // Начинаем второй этап
      } else {
        setCurrentStage('results'); // Завершаем тренировку
      }
    }
  };

  const currentWord = words[currentWordIndex];

  // Рендеринг в зависимости от текущего этапа
  if (currentStage === 'intro') {
    return (
      <div className="repetition-page">
        <h2>{t('repetition_intro_title')}</h2>
        <p>{t('repetition_intro_text', { count: words.length })}</p>
        <button
          className="button"
          onClick={() => setCurrentStage('toNative')}
        >
          {t('button_start_repetition')}
        </button>
      </div>
    );
  }

  // if (currentStage === 'results') {
  //   return <ResultDisplay correctWords={correctWords} incorrectWords={incorrectWords} />;
  // }

  // Основная часть тренировки
  if (!currentWord) {
    // Если слов нет, показываем сообщение
    return (
      <div className="repetition-page">
        <p>{t('loading_or_no_words')}</p>
        <button className="button button_small" onClick={() => navigate('/')}>{t('button_go_home')}</button>
      </div>
    );
  }

  return (
    <div className="repetition-page">
      <div className="button-group button-group_navigation">
        <button
          className="button button_icon button_small both-mode button_without-shadow"
          onClick={() => navigate('/')}
        >
          <ArrowLeftIcon />
        </button>
      </div>

      <h2>{t(currentStage === 'toNative' ? 'repetition_to_native_title' : 'repetition_to_english_title')}</h2>

      <WordCard
        word={currentWord}
        stage={currentStage}
        onSuccess={() => handleNextWord(true)}
        onFail={() => handleNextWord(false)}
      />
    </div>
  );
};

export default RepetitionPage;