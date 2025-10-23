// src/components/WordModal.tsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { WordModel } from '@models/word';
import DeleteItemIcon from '@components/icons/DeleteItemIcon.tsx';
import CancelIcon from '@components/icons/CancelIcon.tsx';
import OkIcon from '@components/icons/OkIcon.tsx';
import CloseIcon from '@components/icons/CloseIcon.tsx';

interface WordModalProps {
  isModalOpen: boolean;
  word: WordModel | null;
  onSave: (word: WordModel) => void;
  onClose: () => void;
  onDelete: (word: WordModel) => void;
}

const WordModal: React.FC<WordModalProps> = ({ isModalOpen,word, onSave, onClose, onDelete }) => {
  const { t } = useTranslation();
  const [english, setEnglish] = useState(word?.english || '');
  const [native, setNative] = useState(word?.native || '');
  const [learnedAt, setLearnedAt] = useState(word?.learnedAt || null);
  const [ignored, setIgnored] = useState(word?.ignored || false);
  const [transcription, setTranscription] = useState(word?.transcription || '');

  // Обновляем состояние, если слово для редактирования меняется
  useEffect(() => {
    if (word) {
      setEnglish(word.english);
      setNative(word.native);
      setLearnedAt(word.learnedAt);
      setIgnored(word.ignored);
      setTranscription(word.transcription || '');
    }
  }, [word]);

  const handleSave = () => {
    const newWord: WordModel = {
      english,
      native,
      transcription,
      createdAt: word?.createdAt || Date.now(),
      learnedAt,
      repeatAt: word?.repeatAt || null,
      ignored,
    };
    onSave(newWord);
  };

  return (
    <div
      className={`modal__wrapper ${isModalOpen ? 'modal__wrapper_show' : ''}`}
      onClick={onClose}
    >
      <div
        className="modal"
        onClick={e => e.stopPropagation()}
      >
        <div className="custom-field__wrapper">
          <input
            className="custom-field custom-field_small"
            type="text"
            value={english}
            onChange={e => setEnglish(e.target.value)}
            placeholder={t('common.translate')}
          />

          <button
            className="button custom-field__delete button_icon button_without-shadow button_x-small"
            id="modal-translate-clear"
            onClick={() => setEnglish('')}
          >
            <CloseIcon />
          </button>
        </div>

        <div className="custom-field__wrapper">
          <input
            className="custom-field custom-field_small"
            type="text"
            value={native}
            onChange={e => setNative(e.target.value)}
            placeholder={t('common.native')}
          />

          <button
            className="button custom-field__delete button_icon button_without-shadow button_x-small"
            id="modal-translate-clear"
            onClick={() => setNative('')}
          >
            <CloseIcon/>
          </button>
        </div>

        <div className="custom-field__wrapper">
          <textarea
            className="custom-field custom-field_small textarea"
            value={transcription}
            onChange={e => setTranscription(e.target.value)}
            placeholder={t('common.transcription')}
          />

          <button
            className="button custom-field__delete button_icon button_without-shadow button_x-small"
            id="modal-translate-clear"
            onClick={() => setTranscription('')}
          >
            <CloseIcon/>
          </button>
        </div>

        <div className="button-group button-group_gap-2" id="modal-state">
          <button
            className={`button button_small ${learnedAt ? 'button_active' : ''}`}
            onClick={() => setLearnedAt(learnedAt ? null : Date.now())}
          >
            {t('common.learned_one')}
          </button>

          <button
            className={`button button_small ${ignored ? 'button_active' : ''}`}
            onClick={() => setIgnored(!ignored)}
          >
            {t('common.ignored_one')}
          </button>
        </div>

        <hr className="hr"/>

        <div className="button-group button-group_row">
          {word ? (
            <button className="button button_icon" onClick={() => onDelete(word)}>
              <DeleteItemIcon />
            </button>
          ) : null}

          <button className="button button_icon" onClick={onClose}>
            <CancelIcon />
          </button>

          <button className="button button_icon" onClick={handleSave}>
            <OkIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WordModal;