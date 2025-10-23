import React, { useState, type ReactNode, createContext, useContext } from 'react';
import type { SettingsModel } from '@models/settings';
import { defaultLibrary } from '@/data/default-library.ts';
import type { LibraryAction, WordModel } from '@models/word';

// Create context
interface LibraryContextType {
  library: WordModel[];
  updateLibrary: (key: keyof SettingsModel, value: any) => void;
}

// Create context with default
const LibraryContext = createContext<LibraryContextType>({
  library: defaultLibrary,
  dispatchLibraryAction: () => {
    console.warn('dispatchLibraryAction was called without a provider.');
  },
});

export const useLibrary = () => {
  const context = useContext(LibraryContext);

  if (context === undefined) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }

  return context;
};

interface LibraryProviderProps {
  children: ReactNode;
}

export const LibraryProvider: React.FC<LibraryProviderProps> = ({ children }) => {
  const [library, setLibrary] = useState<WordModel[]>(loadLibraryFromLocalStorage);

  const dispatchLibraryAction = (action: LibraryAction) => {

    setLibrary(prevLibrary => {
      let newLibrary: WordModel[] = [];

      switch (action.type) {
        case 'ADD':
          if (action.payload && typeof action.payload !== 'string') {
            if (!prevLibrary.some(word => word.createdAt === action.payload!.createdAt)) {
              newLibrary = [...prevLibrary, action.payload as WordModel];
            }
            else {
              newLibrary = prevLibrary;
            }
          } else {
            newLibrary = prevLibrary;
          }
          break;

        case 'UPDATE':
          if (action.payload && typeof action.payload !== 'string') {
            const updatedWord = action.payload as WordModel;
            newLibrary = prevLibrary.map(word =>
              word.createdAt === updatedWord.createdAt ? updatedWord : word
            );
          } else {
            newLibrary = prevLibrary;
          }
          break;

        case 'DELETE':
          if (action.payload) {
            const createdAtToDelete = action.payload;
            newLibrary = prevLibrary.filter(word => word.createdAt !== createdAtToDelete);
          }
          else {
            newLibrary = prevLibrary;
          }
          break;

        case 'CLEAR':
          newLibrary = [];
          break;

        default:
          newLibrary = prevLibrary;
      }

      saveLibraryToLocalStorage(newLibrary);
      return newLibrary;
    });
  };

  return (
    <LibraryContext.Provider value={{ library, dispatchLibraryAction }}>
      {children}
    </LibraryContext.Provider>
  );
};

const LIBRARY_KEY = 'library';

const loadLibraryFromLocalStorage = (): WordModel[] => {
  try {
    const data = localStorage.getItem(LIBRARY_KEY);
    return data ? (JSON.parse(data) as WordModel[]) : defaultLibrary;
  }
  catch (e) {
    console.error("Failed to load library:", e);
    return defaultLibrary;
  }
};

const saveLibraryToLocalStorage = (library: WordModel[]) => {
  try {
    localStorage.setItem(LIBRARY_KEY, JSON.stringify(library));
  }
  catch (e) {
    console.error("Failed to save library:", e);
  }
};
