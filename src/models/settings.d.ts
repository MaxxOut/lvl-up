export interface SettingsModel {
  darkMode: boolean
  englishInterface: boolean
  extraLetters: true,
  constructorAddLetters: {
    state: boolean
    min: number
    max: number
    current: number
  },
  learnWords: {
    min: number
    max: number
    current: number
  },
  repeatWords: {
    min: number
    max: number
    current: number
  },
  learnSteps: {
    toNative: boolean
    toEnglish: boolean
    wordConstructor: boolean
    writing: boolean
  },
  repeatSteps: {
    toNative: boolean
    toEnglish: boolean
  },
  extraLetterNumber: {
    min: number
    max: number
    current: number
  }
}