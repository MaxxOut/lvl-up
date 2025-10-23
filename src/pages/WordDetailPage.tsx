import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLibrary } from '@utils/local-storage';
import type { WordModel } from '@models/word';
import ArrowLeftIcon from '@components/icons/ArrowLeftIcon';

const WordDetailPage: React.FC = () => {
  const { wordId } = useParams<{ wordId: string }>();
  const navigate = useNavigate();
  const [word, setWord] = useState<WordModel | null>(null);

  useEffect(() => {
    if (wordId) {
      const library = getLibrary();
      const foundWord = library.find(w => w.english.toLowerCase() === wordId.toLowerCase());
      setWord(foundWord || null);
    }
  }, [wordId]);

  if (!word) {
    return (
      <div className="word-detail-page not-found">
        <h2>Слово не найдено</h2>
        <button className="button" onClick={() => navigate(-1)}>
          Вернуться назад
        </button>
      </div>
    );
  }

  return (
    <div className="word-detail-page">
      <div className="button-group button-group_navigation">
        <button
          className="button button_icon button_small both-mode button_without-shadow"
          onClick={() => navigate(-1)}
        >
          <ArrowLeftIcon />
        </button>
      </div>

      <h1>{word.english}</h1>
      {word.transcription && <p className="transcription">[{word.transcription}]</p>}

      {/* Отображение основного перевода */}
      <h3 className="section-header">Основной перевод</h3>
      <p>{word.native}</p>

      {/* Отображение дополнительных переводов и примеров, если они есть */}
      {word.details && word.details.length > 0 && (
        <>
          <h3 className="section-header">Другие значения и примеры</h3>
          <div className="examples-list">
            {word.details.map((detail, index) => (
              <div key={index} className="example-item">
                <h4>{detail.translation}</h4>
                <div className="example-sentences">
                  {detail.examples.map((example, exampleIndex) => (
                    <div key={exampleIndex} className="sentence-pair">
                      <p className="sentence-english">{example.english}</p>
                      <p className="sentence-native">{example.native}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default WordDetailPage;