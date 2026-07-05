'use client';

import { Suspense, useState } from 'react';

import SearchBar from '@/components/searchBar/SearchBar';
import PokedexList from '@/components/pokedexList/PokedexList';
import PokedexTagFilter from '@/components/pokedexTagFilter/PokedexTagFilter';
import { useUrlQueryParams } from '@/hooks/useUrlQueryParams';

import s from './pokedexPage.module.scss';
import Loading from '@/components/loading/Loading';

function PokedexPageContent() {
  const { searchParams, replaceParams } = useUrlQueryParams();
  const keyword = searchParams.get('q') ?? '';
  const selectedTag = searchParams.get('tag');
  const [isSearchDebouncing, setIsSearchDebouncing] = useState(false);

  const handleKeywordChange = (value: string) => {
    replaceParams({
      q: value.trim() || null,
      pokemonId: null,
    });
  };

  const handleTagChange = (tag: string | null) => {
    replaceParams({
      tag,
      pokemonId: null,
    });
  };

  return (
    <div className={s.page}>
      <SearchBar
        keyword={keyword}
        onKeywordChange={handleKeywordChange}
        onDebouncingChange={setIsSearchDebouncing}
        placeholderType="pokemon"
      />
      <PokedexTagFilter selectedTag={selectedTag} onSelectTag=
        {handleTagChange} />
      {/* <Loading /> */}
      <div className={s.listArea}>
        {isSearchDebouncing ? (
          <Loading />
        ) : (
          <PokedexList keyword={keyword} tag={selectedTag} />
        )}
      </div>
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
