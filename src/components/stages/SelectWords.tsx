// src/components/WordSelection.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { WordModel } from '@models/word';

interface WordSelectionProps {
  word: WordModel;
  onLearn: () => void;
  onSkip: () => void;
  onIgnore: () => void;
}

const WordSelection: React.FC<WordSelectionProps> = ({ word, onLearn, onSkip, onIgnore }) => {
  const { t } = useTranslation();

  return (
    <div className="word-selection">
      <h2>{t('learn_word_title')}</h2>
      <p className="word-to-learn">{word.english}</p>
      <div className="button-group">
        <button className="button button_learn" onClick={onLearn}>
          {t('button_learn')}
        </button>
        <button className="button button_skip" onClick={onSkip}>
          {t('button_skip')}
        </button>
        <button className="button button_ignore" onClick={onIgnore}>
          {t('button_ignore')}
        </button>
      </div>
    </div>
  );
};

export default WordSelection;