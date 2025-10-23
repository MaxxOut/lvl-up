import React from 'react';
import SortNewIcon from '@assets/icons/sort-new.svg?react';
import SortOldIcon from '@assets/icons/sort-old.svg?react';
import SortAIcon from '@assets/icons/sort-a.svg?react';
import SortZIcon from '@assets/icons/sort-z.svg?react';
import type { GroupIconPropsModel } from '@models/icon-props-model';

const SortIcon: React.FC<GroupIconPropsModel> = ({ type, color = 'currentColor', size = 40 }) => {
  switch (type) {
    case 'newest':
      return <SortNewIcon fill={color} width={size} height={size}  />;
    case 'oldest':
      return <SortOldIcon fill={color} width={size} height={size}  />;
    case 'az':
      return <SortAIcon fill={color} width={size} height={size}  />;
    case 'za':
      return <SortZIcon fill={color} width={size} height={size}  />;
    default:
      return null;
  }
};

export default SortIcon;
