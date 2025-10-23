import React from 'react';
import { useTranslation } from 'react-i18next';
import LightModeIcon from '@components/icons/LightModeIcon.tsx';
import DarkModeIcon from '@components/icons/DarkModeIcon.tsx';

interface ModeSwitcherProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

const ModeSwitcher: React.FC<ModeSwitcherProps> = ({ isDarkMode, onToggle }) => {
  const { t } = useTranslation();

  return (
    <>
      <input
        type="checkbox"
        id="mode-switcher"
        className="js-checkbox"
        checked={isDarkMode}
        onChange={onToggle}
      />
      <label htmlFor="mode-switcher" className="custom-checkbox button button_icon" title={t('settings')}>
        <div className="custom-checkbox__content">
          <LightModeIcon />
          <DarkModeIcon />
        </div>
      </label>
    </>
  );
};

export default ModeSwitcher;
