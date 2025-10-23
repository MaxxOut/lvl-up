import React from 'react';
import { useTranslation } from 'react-i18next';
import SortIconGroup from '@components/icons/SortIconGroup.tsx';
import SearchBar from '@components/layout/word-page/WordSearch.tsx';

interface FilterSortMenuProps {
  isOpenFilter: boolean
  sortBy: string;
  filter: string;
  searchField: string;
  onSortChange: (sortType: string) => void;
  onFilterChange: (filterType: string) => void;
  onSearchChange: (search: string) => void;
}

const WordFilter: React.FC<FilterSortMenuProps> = ({
  isOpenFilter,
  sortBy,
  filter,
  searchField,
  onSortChange,
  onFilterChange,
  onSearchChange,
}) => {
  const { t } = useTranslation();

  return (
    <div className={`content__collapsed ${isOpenFilter ? 'content__collapsed_open' : ''}`}>
      {/* Filter buttons */}
      <div className="button-group button-group_rows">
        <button
          className={`button button_small ${filter === 'all' ? 'button_active' : ''}`}
          onClick={() => onFilterChange('all')}
        >
          {t('common.all')}
        </button>
        <button
          className={`button button_small ${filter === 'learned' ? 'button_active' : ''}`}
          onClick={() => onFilterChange('learned')}
        >
          {t('common.learned_one')}
        </button>
        <button
          className={`button button_small ${filter === 'unlearned' ? 'button_active' : ''}`}
          onClick={() => onFilterChange('unlearned')}
        >
          {t('common.unlearned_one')}
        </button>
        <button
          className={`button button_small ${filter === 'ignored' ? 'button_active' : ''}`}
          onClick={() => onFilterChange('ignored')}
        >
          {t('common.ignored_one')}
        </button>
      </div>

      {/* Sort buttons */}
      <div className="button-group button-group_row">
        <button
          className={`button button_icon ${sortBy === 'newest' ? 'button_active' : ''}`}
          onClick={() => onSortChange('newest')}
          title={t('sort_newest')}
        >
          <SortIconGroup type="newest"/>
        </button>
        <button
          className={`button button_icon ${sortBy === 'oldest' ? 'button_active' : ''}`}
          onClick={() => onSortChange('oldest')}
          title={t('sort_oldest')}
        >
          <SortIconGroup type="oldest"/>
        </button>
        <button
          className={`button button_icon ${sortBy === 'az' ? 'button_active' : ''}`}
          onClick={() => onSortChange('az')}
          title={t('sort_az')}
        >
          <SortIconGroup type="az"/>
        </button>
        <button
          className={`button button_icon ${sortBy === 'za' ? 'button_active' : ''}`}
          onClick={() => onSortChange('za')}
          title={t('sort_za')}
        >
          <SortIconGroup type="za"/>
        </button>
      </div>

      {/* Search */}
      <div className="custom-field__wrapper">
        <SearchBar
          search={searchField}
          onSearch={onSearchChange}/>
      </div>
    </div>
  );
};

export default WordFilter;
