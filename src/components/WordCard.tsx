// src/components/WordCard.tsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { WordModel } from '@models/word';
import { getLibrary } from '@utils/local-storage';

interface WordCardProps {
  word: WordModel;
  stage: 'toNative' | 'toEnglish';
  onSuccess: () => void;
  onFail: () => void;
}

const WordCard: React.FC<WordCardProps> = ({ word, stage, onSuccess, onFail }) => {
  const { t } = useTranslation();
  const [showAnswer, setShowAnswer] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const frontText = stage === 'toNative' ? word.english : word.native;
  const correctOption = stage === 'toNative' ? word.native : word.english;

  useEffect(() => {
    const allWords = getLibrary();
    const wrongOptions = allWords
      .filter(w => w.english !== word.english)
      .map(w => stage === 'toNative' ? w.native : w.english);

    // get 3 wrong result
    const shuffledWrongOptions = wrongOptions.sort(() => 0.5 - Math.random());
    const distractors = shuffledWrongOptions.slice(0, 3);

    // add correct answer and shuffle
    const allOptions = [...distractors, correctOption];
    setOptions(allOptions.sort(() => 0.5 - Math.random()));
  }, [word, stage]);

  const handleSelectOption = (option: string) => {
    setSelectedAnswer(option);
    setShowAnswer(true);
    if (option === correctOption) {
      setTimeout(onSuccess, 1000); // Даем время на визуальную обратную связь
    } else {
      setTimeout(onFail, 1000);
    }
  };

  const getButtonClass = (option: string) => {
    if (!showAnswer) {
      return '';
    }
    if (option === correctOption) {
      return 'button_success';
    }
    if (option === selectedAnswer) {
      return 'button_fail';
    }
    return '';
  };

  return (
    <div className="word-card">
      <div className="word-card__front">
        <p>{frontText}</p>
        {stage === 'toNative' && word.transcription && <p className="transcription">[{word.transcription}]</p>}
      </div>

      <div className="word-card__options">
        {options.map(option => (
          <button
            key={option}
            className={`button button_small ${getButtonClass(option)}`}
            onClick={() => handleSelectOption(option)}
            disabled={showAnswer}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WordCard;