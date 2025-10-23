import React from 'react';
import CustomIcon from '@assets/icons/options.svg?react';
import type { IconPropsModel } from '@models/icon-props-model.ts'

const SettingIcon: React.FC<IconPropsModel> = ({ color = 'currentColor', size = 40 }) => {
  return <CustomIcon fill={color} width={size} height={size} />;
};

export default SettingIcon;
