'use client';

import { Suspense } from 'react';

import SearchBar from '@/components/searchBar/SearchBar';
import PokedexList from '@/components/pokedexList/PokedexList';
import { useUrlQueryParams } from '@/hooks/useUrlQueryParams';

import s from './pokedexPage.module.scss';

function PokedexPageContent() {
  const { searchParams, replaceParams } = useUrlQueryParams();
  const keyword = searchParams.get('q') ?? '';

  const handleKeywordChange = (value: string) => {
    replaceParams({
      q: value.trim() || null,
      pokemonId: null,
    });
  };

  return (
    <div className={s.page}>
      <SearchBar
        keyword={keyword}
        onKeywordChange={handleKeywordChange}
        placeholderType="pokemon"
      />
      <PokedexList keyword={keyword} />
    </div>
  );
}

const PokedexPage = () => {
  return (
    <Suspense fallback={null}>
      <PokedexPageContent />
    </Suspense>
  );
};

export default PokedexPage;
