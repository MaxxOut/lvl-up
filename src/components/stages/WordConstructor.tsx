// src/components/WordConstructor.tsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { Word } from '@models/word';
import { useSettings } from '@contexts/SettingsContext';
import { toast } from '@context/toast';

interface WordConstructorProps {
  word: Word;
  onSuccess: () => void;
  onFail: () => void;
}

const generateExtraLetters = (count: number): string[] => {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const extraLetters = [];
  for (let i = 0; i < count; i++) {
    extraLetters.push(letters.charAt(Math.floor(Math.random() * letters.length)));
  }
  return extraLetters;
};

const WordConstructor: React.FC<WordConstructorProps> = ({ word, onSuccess, onFail }) => {
  const { t } = useTranslation();
  const settings = useSettings();
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [shuffledLetters, setShuffledLetters] = useState<string[]>([]);
  const [isFailed, setIsFailed] = useState(false);

  useEffect(() => {
    // Reset state for a new word
    setGuessedLetters([]);
    setIsFailed(false);

    // Generate letters for the word
    const wordLetters = word.english.toLowerCase().split('');
    let allLetters = [...wordLetters];

    // Add extra letters if the setting is enabled
    if (settings.constructorAddLetters.state) {
      const extraCount = settings.constructorAddLetters.current;
      const extraLetters = generateExtraLetters(extraCount);
      allLetters = [...allLetters, ...extraLetters];
    }

    // Shuffle all letters
    const shuffled = allLetters.sort(() => 0.5 - Math.random());
    setShuffledLetters(shuffled);
  }, [word, settings.constructorAddLetters.state, settings.constructorAddLetters.current]);

  const handleLetterClick = (letter: string, index: number) => {
    const nextCorrectLetter = word.english.toLowerCase()[guessedLetters.length];

    if (letter === nextCorrectLetter) {
      setGuessedLetters(prev => [...prev, letter]);
      // Remove the guessed letter from the available letters
      setShuffledLetters(prev => prev.filter((_, i) => i !== index));

      // Check for completion
      if (guessedLetters.length + 1 === word.english.length) {
        if (isFailed) {
          onFail();
        } else {
          onSuccess();
        }
      }
    } else {
      setIsFailed(true);
      toast.show(t('toast_incorrect_letter'), 'warning');
    }
  };

  const handleHint = () => {
    setIsFailed(true);
    const nextCorrectLetter = word.english.toLowerCase()[guessedLetters.length];

    // Find and add the correct letter
    setGuessedLetters(prev => [...prev, nextCorrectLetter]);

    // Remove the letter from the shuffled letters array
    setShuffledLetters(prev => {
      const firstOccurrenceIndex = prev.findIndex(l => l === nextCorrectLetter);
      return prev.filter((_, i) => i !== firstOccurrenceIndex);
    });

    // Check for completion
    if (guessedLetters.length + 1 === word.english.length) {
      onFail(); // Automatically fail since a hint was used
    }
  };

  return (
    <div className="word-constructor">
      <h2 className="header-2">{t('constructor_title')}</h2>

      <div className="constructor__display">
        {word.english.split('').map((_, index) => (
          <span
            key={index}
            className={`constructor__letter ${guessedLetters[index] ? 'guessed' : ''}`}
          >
            {guessedLetters[index] || '_'}
          </span>
        ))}
      </div>

      <div className="constructor__buttons">
        {shuffledLetters.map((letter, index) => (
          <button
            key={index}
            className="button button_letter"
            onClick={() => handleLetterClick(letter, index)}
          >
            {letter}
          </button>
        ))}
      </div>

      <button className="button button_small" onClick={handleHint}>
        {t('button_hint')}
      </button>
    </div>
  );
};

export default WordConstructor;