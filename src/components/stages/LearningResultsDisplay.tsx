// src/components/LearningResultsDisplay.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Word } from '../types';
import LearningResultItem from './LearningResultItem';

interface LearningResultsDisplayProps {
  learnedWords: Word[];
  unlearnedWords: Word[];
  onMarkAsLearned: (word: Word) => void;
  onMarkAsUnlearned: (word: Word) => void;
  onIgnore: (word: Word) => void;
  onFinish: () => void;
}

const LearningResultsDisplay: React.FC<LearningResultsDisplayProps> = ({
                                                                         learnedWords,
                                                                         unlearnedWords,
                                                                         onMarkAsLearned,
                                                                         onMarkAsUnlearned,
                                                                         onIgnore,
                                                                         onFinish,
                                                                       }) => {
  const { t } = useTranslation();

  const totalWords = learnedWords.length + unlearnedWords.length;
  const learnedPercentage = totalWords > 0 ? Math.round((learnedWords.length / totalWords) * 100) : 0;

  return (
    <div className="learning-results-display">
      <h2 className="header-2">{t('results_header')}</h2>

      <div className="result-summary">
        <p className="summary-text">{t('result_summary_text', { total: totalWords })}</p>
        <p className="summary-score">{t('result_score', { score: learnedPercentage })}</p>
      </div>

      <hr className="hr" />

      {learnedWords.length > 0 && (
        <div className="result-section">
          <h3 className="result-section-title success">{t('result_correct_words')}</h3>
          {learnedWords.map(word => (
            <LearningResultItem
              key={word.english}
              word={word}
              status="learned"
              onMarkAsLearned={onMarkAsLearned}
              onMarkAsUnlearned={onMarkAsUnlearned}
              onIgnore={onIgnore}
            />
          ))}
        </div>
      )}

      {unlearnedWords.length > 0 && (
        <div className="result-section">
          <h3 className="result-section-title fail">{t('result_incorrect_words')}</h3>
          {unlearnedWords.map(word => (
            <LearningResultItem
              key={word.english}
              word={word}
              status="unlearned"
              onMarkAsLearned={onMarkAsLearned}
              onMarkAsUnlearned={onMarkAsUnlearned}
              onIgnore={onIgnore}
            />
          ))}
        </div>
      )}

      <button className="button" onClick={onFinish}>
        {t('button_finish_learning')}
      </button>
    </div>
  );
};

export default LearningResultsDisplay;