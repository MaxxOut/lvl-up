import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import WordModal from '@components/layout/word-page/WordModal.tsx';
import type { WordModel } from '@models/word';
import MainHeader from '@components/layout/MainHeader.tsx';
import ArrowLeftIcon from '@components/icons/ArrowLeftIcon.tsx';
import { useNavigate } from 'react-router-dom';
import PlusIcon from '@components/icons/PlusIcon.tsx';
import WordFilter from '@components/layout/word-page/WordFilter.tsx';
import WordItem from '@components/layout/word-page/WordItem.tsx';
import ChevronDownIcon from '@components/icons/ChevronDownIcon.tsx';
import { useLibrary } from '@contexts/LibraryContext.tsx';

const WordListPage: React.FC = () => {
  const { library, dispatchLibraryAction } = useLibrary();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentWord, setCurrentWord] = useState<WordModel | null>(null);
  const navigate = useNavigate();
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  // filter
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest', 'az', 'za'
  const [filter, setFilter] = useState('all'); // 'all', 'learned', 'unlearned', 'ignored'
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredWords, setFilteredWords] = useState<WordModel[]>([]);

  useEffect(() => {
    // В этом эффекте мы будем применять логику фильтрации и сортировки
    // Пока что просто отображаем все слова
    setFilteredWords(library);
  }, [library]);

  // Применение фильтров и сортировки при изменении слов, поиска, сортировки или фильтра
  useEffect(() => {
    let newFilteredWords = [...library];

    // Применение фильтра
    if (filter === 'learned') {
      newFilteredWords = newFilteredWords.filter(word => word.learnedAt !== null);
    } else if (filter === 'unlearned') {
      newFilteredWords = newFilteredWords.filter(word => word.learnedAt === null);
    } else if (filter === 'ignored') {
      newFilteredWords = newFilteredWords.filter(word => word.ignored);
    }

    // Применение поиска
    if (searchQuery) {
      newFilteredWords = newFilteredWords.filter(word =>
        word.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
        word.native.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Применение сортировки
    if (sortBy === 'az') {
      newFilteredWords.sort((a, b) => a.english.localeCompare(b.english));
    } else if (sortBy === 'za') {
      newFilteredWords.sort((a, b) => b.english.localeCompare(a.english));
    } else if (sortBy === 'newest') {
      newFilteredWords.sort((a, b) => b.createdAt - a.createdAt);
    } else if (sortBy === 'oldest') {
      newFilteredWords.sort((a, b) => a.createdAt - b.createdAt);
    }

    setFilteredWords(newFilteredWords);
  }, [library, searchQuery, sortBy, filter]);

  // Обработчик для открытия модального окна для добавления нового слова
  const handleOpenModal = (word: WordModel | null = null): void => {
    setCurrentWord(word);
    console.log('curr is', word);
    setIsModalOpen(true);
  };

  // Обработчик для сохранения или обновления слова
  const handleSaveWord = (word: WordModel) => {
    if (currentWord && currentWord.createdAt) {
      const updatedWord = { ...word, createdAt: currentWord.createdAt };

      dispatchLibraryAction({
        type: 'UPDATE',
        payload: updatedWord,
      });
    }
    else {
      const newWord = { ...word, createdAt: Date.now() }; // Используем метку времени как ID

      dispatchLibraryAction({
        type: 'ADD',
        payload: newWord,
      });
    }

    setIsModalOpen(false);
  };

  const handleDeleteWord = (word: WordModel): void => {
    dispatchLibraryAction({ type: 'DELETE', payload: word.createdAt });
    handleCloseModal()
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const BackButton = (
    <button
      className="button button_icon button_small both-mode button_without-shadow"
      onClick={handleGoHome}
    >
      <ArrowLeftIcon/>
    </button>
  );

  const AddButton = (
    <button
      className="button button_icon button_small both-mode button_without-shadow"
      onClick={() => handleOpenModal()}
    >
      <PlusIcon/>
    </button>
  );

  return (
    <div className="content">
      <MainHeader
        slotLeft={BackButton}
        slotRight={AddButton}
      />

      <WordFilter
        isOpenFilter={isOpenFilter}
        filter={filter}
        sortBy={sortBy}
        searchField={searchQuery}
        onSortChange={setSortBy}
        onFilterChange={setFilter}
        onSearchChange={setSearchQuery}
      />

      {/* filter visibility control */}
      <div className="button-group button-group_row button-group_low">
        <button
          className={`button button_icon button_small both-mode button_without-shadow ${isOpenFilter ? 'button_rotated' : ''}`}
          onClick={() => setIsOpenFilter(!isOpenFilter)}
        >
          <ChevronDownIcon/>
        </button>
      </div>

      <div className="content__list">
        {filteredWords.length === 0 ? (
          <p>{ t('common.empty') }</p>
        ) : (
          filteredWords.map(word => (
            <WordItem
              key={word.english} // 💡 Я бы рекомендовал использовать уникальный ID или createdAt
              word={word}
              onEdit={() => handleOpenModal(word)}
            />
          ))
        )}
      </div>

      {isModalOpen && (
        <WordModal
          isModalOpen={isModalOpen}
          word={currentWord}
          onSave={handleSaveWord}
          onClose={handleCloseModal}
          onDelete={handleDeleteWord}
        />
      )}
    </div>
  );
};

export default WordListPage;
