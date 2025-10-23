import React, { useState, useEffect, type ReactNode, createContext, useContext } from 'react';
import type { SettingsModel } from '@models/settings';
import { defaultSettings } from '@/data/default-settings.ts'; // Импортируем контекст

// Create context
interface SettingsContextType {
  settings: SettingsModel;
  updateSetting: (key: keyof SettingsModel, value: any) => void;
}


// Create context with default
const SettingsContext = createContext<SettingsContextType>({
  settings: defaultSettings,
  updateSetting: (key, value) => {},
});

// hook
export const useSettings = () => {
  const context = useContext(SettingsContext);

  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }

  return context;
};

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<SettingsModel>(defaultSettings);

  useEffect(() => {
    const loadedSettings = loadSettingsFromLocalStorage(); // <-- Ваша функция чтения
    setSettings({ ...defaultSettings, ...loadedSettings });
  }, []);

  const updateSetting = (key: keyof SettingsModel, value: any) => {
    console.log('updateSetting', key, value);

    setSettings(prev => {
      const newSettings = { ...prev, [key]: value };
      saveSettingsToLocalStorage(newSettings); // <-- Ваша функция сохранения
      return newSettings;
    });
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSetting }}>
      {children}
    </SettingsContext.Provider>
  );
};

const loadSettingsFromLocalStorage = (): Partial<SettingsModel> => {
  try {
    const data = localStorage.getItem('settings');
    return data ? JSON.parse(data) : {};
  }
  catch (e) {
    console.error("Failed to load settings:", e);
    return {};
  }
};

const saveSettingsToLocalStorage = (settings: SettingsModel) => {
  try {
    localStorage.setItem('settings', JSON.stringify(settings));
  }
  catch (e) {
    console.error("Failed to save settings:", e);
  }
};
