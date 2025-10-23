import React from 'react';
import CustomIcon from '@assets/icons/word-ready.svg?react';
import type { IconPropsModel } from '@models/icon-props-model.ts'

const WordReadyIcon: React.FC<IconPropsModel> = ({ color = 'currentColor', size = 40 }) => {
  return <CustomIcon fill={color} width={size} height={size} />;
};

export default WordReadyIcon;
