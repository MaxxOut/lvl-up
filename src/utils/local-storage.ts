import type { WordModel } from '@models/word';

/**
 * get library
 */
export const getLibrary = (): WordModel[] => {
  try {
    const serializedLibrary = localStorage.getItem('library');
    if (serializedLibrary === null) {
      return [];
    }

    return JSON.parse(serializedLibrary) as WordModel[];
  }
  catch (error) {
    console.error('loading error:', error);
    return [];
  }
};

/**
 * save library
 */
export const saveLibrary = (library: WordModel[]): void => {
  try {
    const serializedLibrary = JSON.stringify(library);
    localStorage.setItem('library', serializedLibrary);
  }
  catch (error) {
    console.error('saving error:', error);
  }
};
