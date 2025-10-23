import React from 'react';
import { useTranslation } from 'react-i18next';
import { Word } from '../types';
import CheckIcon from './icons/CheckIcon';
import WrongIcon from './icons/WrongIcon';

interface LearningResultItemProps {
  word: Word;
  status: 'learned' | 'unlearned';
  onMarkAsLearned: (word: Word) => void;
  onMarkAsUnlearned: (word: Word) => void;
  onIgnore: (word: Word) => void;
}

const LearningResultItem: React.FC<LearningResultItemProps> = ({
                                                                 word,
                                                                 status,
                                                                 onMarkAsLearned,
                                                                 onMarkAsUnlearned,
                                                                 onIgnore,
                                                               }) => {
  const { t } = useTranslation();

  return (
    <div className="learning-result-item">
      <div className="result-item-info">
        {status === 'learned' ? <CheckIcon /> : <WrongIcon />}
        <span>{word.english} - {word.native}</span>
      </div>
      <div className="result-item-actions">
        {status === 'unlearned' && (
          <button className="button button_small" onClick={() => onMarkAsLearned(word)}>
            {t('button_mark_as_learned')}
          </button>
        )}
        {status === 'learned' && (
          <button className="button button_small" onClick={() => onMarkAsUnlearned(word)}>
            {t('button_mark_as_unlearned')}
          </button>
        )}
        <button className="button button_small" onClick={() => onIgnore(word)}>
          {t('button_ignore')}
        </button>
      </div>
    </div>
  );
};

export default LearningResultItem;