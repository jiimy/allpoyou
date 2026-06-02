'use client';

import { useState } from 'react';

import AbilitiesList from '@/components/abilitiesList/AbilitiesList';
import SearchBar from '@/components/searchBar/SearchBar';

import s from './abilities.module.scss';

const AbilitiesPage = () => {
  const [keyword, setKeyword] = useState('');

  return (
    <div className={s.page}>
      <SearchBar
        keyword={keyword}
        onKeywordChange={setKeyword}
        placeholderType="ability"
      />
      <AbilitiesList keyword={keyword} />
    </div>
  );
};

export default AbilitiesPage;
