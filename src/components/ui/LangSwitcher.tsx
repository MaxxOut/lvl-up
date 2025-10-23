import React from 'react';
import { useTranslation } from 'react-i18next';
import UaIcon from '@components/icons/UaIcon.tsx';
import EnIcon from '@components/icons/EnIcon.tsx';

interface LangSwitcherProps {
  isEnglish: boolean;
  onToggle: () => void;
}

const LangSwitcher: React.FC<LangSwitcherProps> = ({ isEnglish, onToggle }) => {
  const { t } = useTranslation();

  return (
    <>
      <input
        type="checkbox"
        id="lang-switcher"
        className="js-checkbox"
        checked={isEnglish}
        onChange={onToggle}
      />
      <label htmlFor="lang-switcher" className="custom-checkbox button button_icon" title={t('settings')}>
        <div className="custom-checkbox__content">
          <UaIcon />
          <EnIcon />
        </div>
      </label>
    </>
  );
};

export default LangSwitcher;
