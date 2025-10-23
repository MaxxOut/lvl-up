import React from 'react';
import CloseIcon from '@components/icons/CloseIcon.tsx';
import { useTranslation } from 'react-i18next';

interface SearchBarProps {
  search: string;
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({search, onSearch}) => {
  const { t } = useTranslation();

  return (
    <div className="custom-field__wrapper">
      <input
        value={search}
        placeholder={t('common.search')}
        type="text"
        className="custom-field custom-field_small"
        onChange={e => onSearch(e.target.value)}
      />
      <button
        className="button custom-field__delete button_icon button_without-shadow button_x-small"
        onClick={() => onSearch('')}
      >
        <CloseIcon/>
      </button>
    </div>
  )
};

export default SearchBar;
