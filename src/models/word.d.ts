export interface WordModel {
  english: string;
  transcription: string;
  native: string;
  createdAt: number;
  learnedAt: number | null;
  repeatAt: number | null;
  ignored: boolean;

  details?: {
    translation: string;
    examples: {
      english: string;
      native: string;
    }[];
  }[];
}

type LibraryActionType = 'ADD' | 'UPDATE' | 'DELETE' | 'CLEAR';

interface LibraryAction {
  type: LibraryActionType;
  payload?: WordModel | string | number;
}

export interface LibraryContextType {
  library: WordModel[];
  dispatchLibraryAction: (action: LibraryAction) => void;
}
