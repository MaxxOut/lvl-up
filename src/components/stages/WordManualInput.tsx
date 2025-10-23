// src/components/WordManualInput.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Word } from '../types';

interface WordManualInputProps {
  word: Word;
  onSuccess: () => void;
  onFail: () => void;
}

const WordManualInput: React.FC<WordManualInputProps> = ({ word, onFail, onSuccess }) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState('');
  const [showHint, setShowHint] = useState(false);

  const handleCheck = () => {
    if (inputValue.toLowerCase() === word.english.toLowerCase()) {
      onSuccess();
    } else {
      // Пользователь ошибся, помечаем слово как не выученное
      onFail();
      // Очищаем поле ввода, чтобы он мог попробовать снова
      setInputValue('');
      // Добавляем подсказку, если хочет
      setShowHint(true);
    }
  };

  const handleHint = () => {
    // Пользователь запросил подсказку, помечаем слово как не выученное
    onFail();
    setShowHint(true);
  };

  return (
    <div className="word-manual-input">
      <h2>{t('manual_input_title')}</h2>
      <p className="word-to-write">{word.native}</p>

      {showHint && (
        <p className="hint-text">{t('hint_correct_word')}: {word.english}</p>
      )}

      <input
        className="input"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={t('placeholder_type_word')}
        disabled={showHint}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleCheck();
        }}
      />

      <div className="button-group">
        <button
          className="button button_small"
          onClick={handleCheck}
          disabled={showHint}
        >
          {t('button_check')}
        </button>
        <button
          className="button button_small"
          onClick={handleHint}
          disabled={showHint}
        >
          {t('button_hint')}
        </button>
      </div>
    </div>
  );
};

export default WordManualInput;