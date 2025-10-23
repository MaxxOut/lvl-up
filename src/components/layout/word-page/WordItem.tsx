import React from 'react';
import type { WordModel } from '@models/word';
import WordIgnoredIcon from '@components/icons/WordIgnoredIcon.tsx';
import WordNewIcon from '@components/icons/WordNewIcon.tsx';
import WordReadyIcon from '@components/icons/WordReadyIcon.tsx';

interface WordItemProps {
  word: WordModel;
  onEdit: () => void;
}

const WordItem: React.FC<WordItemProps> = ({ word, onEdit }) => {
  const getStatusIcon = () => {
    if (word.ignored)
      return <WordIgnoredIcon />;
    if (word.learnedAt)
      return <WordReadyIcon />;
    return <WordNewIcon />;
  };

  return (
    <button className="button button_word-full" onClick={onEdit}>
      <div className="button__caption">{word.english}</div>
      <div className="button__value">{word.native}</div>
      <span className="button__icon-wrapper">
        { getStatusIcon() }
      </span>
    </button>
  )
};

export default WordItem;
