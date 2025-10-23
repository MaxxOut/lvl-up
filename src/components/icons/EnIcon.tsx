import React from 'react';
import CustomIcon from '@assets/icons/en.svg?react';
import type { IconPropsModel } from '@models/icon-props-model.ts'

const EnglishIcon: React.FC<IconPropsModel> = ({ color = 'currentColor', size = 48 }) => {
  return <CustomIcon fill={color} width={size} height={size} />;
};

export default EnglishIcon;
