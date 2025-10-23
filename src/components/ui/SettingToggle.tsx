import React from 'react';
import { useTranslation } from 'react-i18next';

interface SettingsToggleProps {
  id: string;
  titleKey: string;
  checked: boolean;
  onToggle: () => void;
}

const SettingsToggle: React.FC<SettingsToggleProps> = ({ id, titleKey, checked, onToggle }) => {
  const { t } = useTranslation();

  return (
    <div className="settings__block">
      <div className="settings__row">
        <p className="settings__title">{t(titleKey)}</p>
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onToggle}
          className="togglebtn"
          autoComplete="off"
        />
        <label htmlFor={id} className="togglebtn">
          <span className="indicator"></span>
        </label>
      </div>
    </div>
  );
};

export default SettingsToggle;
