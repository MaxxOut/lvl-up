import React from 'react';
import { useTranslation } from 'react-i18next';

interface SettingsRangeProps {
  titleKey: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}

const SettingsRange: React.FC<SettingsRangeProps> = ({ titleKey, min, max, value, onChange }) => {
  const { t } = useTranslation();

  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value));
  };

  return (
    <div className="settings__block">
      <p className="settings__title">{ t(titleKey) }</p>
      <div className="settings__row">
        <input
          className="settings__range"
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={handleRangeChange}
        />
        <div className="settings__value">{ value }</div>
      </div>
    </div>
  );
};

export default SettingsRange;
