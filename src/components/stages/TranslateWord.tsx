// src/components/WordTranslation.tsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { WordModel } from '@models/word';
import { getLibrary } from '@utils/local-storage';

interface WordTranslationProps {
  word: WordModel;
  stage: 'toNative' | 'toEnglish';
  onSuccess: () => void;
  onFail: () => void;
}

const WordTranslation: React.FC<WordTranslationProps> = ({ word, stage, onSuccess, onFail }) => {
  const { t } = useTranslation();
  const [options, setOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const frontText = stage === 'toNative' ? word.english : word.native;
  const correctOption = stage === 'toNative' ? word.native : word.english;

  useEffect(() => {
    // Получаем все слова из библиотеки для генерации неправильных вариантов
    const allWords = getLibrary();
    const wrongOptions = allWords
      .filter(w => w.english !== word.english)
      .map(w => stage === 'toNative' ? w.native : w.english);

    // Выбираем 3 случайных неправильных варианта
    const shuffledWrongOptions = wrongOptions.sort(() => 0.5 - Math.random());
    const distractors = shuffledWrongOptions.slice(0, 3);

    // Добавляем правильный ответ и перемешиваем
    const allOptions = [...distractors, correctOption];
    setOptions(allOptions.sort(() => 0.5 - Math.random()));
  }, [word, stage]);

  const handleSelectOption = (option: string) => {
    setSelectedAnswer(option);
    if (option === correctOption) {
      onSuccess();
    } else {
      onFail();
    }
  };

  return (
    <div className="word-translation">
      <h2>{t(stage === 'toNative' ? 'translation_to_native_title' : 'translation_to_english_title')}</h2>

      <div className="word-card__front">
        <p>{frontText}</p>
        {stage === 'toNative' && word.transcription && <p className="transcription">[{word.transcription}]</p>}
      </div>

      <div className="word-card__options">
        {options.map(option => (
          <button
            key={option}
            className={`button button_small ${selectedAnswer === option ? (option === correctOption ? 'button_success' : 'button_fail') : ''}`}
            onClick={() => handleSelectOption(option)}
            disabled={!!selectedAnswer} // Деактивируем кнопки после первого выбора
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WordTranslation;