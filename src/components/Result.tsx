import React from 'react';
import { useTranslation } from 'react-i18next';
import { Word } from '../types';
import WordItem from './WordItem';

interface ResultDisplayProps {
  correctWords: Word[];
  incorrectWords: Word[];
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ correctWords, incorrectWords }) => {
  const { t } = useTranslation();

  return (
    <div className="result-display">
      <h2 className="header-2">{t('result_page_header')}</h2>

      {/* ...result */}

      <div className="result-section">
        <h3 className="result-section-title success">{t('result_correct_words')}</h3>
        {correctWords.map(word => <WordItem key={word.english} word={word} />)}
      </div>

      <div className="result-section">
        <h3 className="result-section-title fail">{t('result_incorrect_words')}</h3>
        {incorrectWords.map(word => <WordItem key={word.english} word={word} />)}
      </div>
    </div>
  );

};

export default ResultDisplay;
