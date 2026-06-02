'use client';

import { useState } from 'react';

import SearchBar from '@/components/searchBar/SearchBar';

import PokedexList from '@/components/pokedexList/PokedexList';
import s from './pokedexPage.module.scss';

const PokedexPage = () => {
  const [keyword, setKeyword] = useState('');

  return (
    <div className={s.page}>
      <SearchBar
        keyword={keyword}
        onKeywordChange={setKeyword}
        placeholderType="pokemon"
      />
      <PokedexList keyword={keyword} />
    </div>
  );
};

export default PokedexPage;
