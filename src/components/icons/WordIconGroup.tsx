import React from 'react';
import WordErrorIcon from '@assets/icons/word-error.svg?react';
import WordLearnedIcon from '@assets/icons/word-learned.svg?react';
import WordIgnoredIcon from '@assets/icons/word-ignored.svg?react';
import WordNewIcon from '@assets/icons/word-new.svg?react';
import type { GroupIconPropsModel } from '@models/icon-props-model';

const WordIcon: React.FC<GroupIconPropsModel> = ({ type, color = 'currentColor', size = 40 }) => {
  switch (type) {
    case 'error':
      return <WordErrorIcon fill={color} width={size} height={size} />;
    case 'learned':
      return <WordLearnedIcon fill={color} width={size} height={size} />;
    case 'ignored':
      return <WordIgnoredIcon fill={color} width={size} height={size} />;
    case 'new':
      return <WordNewIcon fill={color} width={size} height={size} />;
    default:
      return null;
  }
};

export default WordIcon;
