import type { SettingsModel } from '@models/settings';

export const defaultSettings: SettingsModel = {
  darkMode: false,
  englishInterface: false,
  extraLetters: true,
  constructorAddLetters: {
    state: false,
    min: 1,
    max: 8,
    current: 4
  },
  learnWords: {
    min: 1,
    max: 8,
    current: 4
  },
  repeatWords: {
    min: 1,
    max: 20,
    current: 10
  },
  learnSteps: {
    toNative: true,
    toEnglish: true,
    wordConstructor: true,
    writing: true,
  },
  repeatSteps: {
    toNative: true,
    toEnglish: true
  },
  extraLetterNumber: {
    min: 1,
    max: 10,
    current: 10,
  },
}
