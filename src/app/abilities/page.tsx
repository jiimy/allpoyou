'use client';

import { Suspense } from 'react';

import AbilitiesList from '@/components/abilitiesList/AbilitiesList';
import StickySearchBar from '@/components/searchBar/StickySearchBar';
import { useUrlQueryParams } from '@/hooks/useUrlQueryParams';

import s from './abilities.module.scss';

function AbilitiesPageContent() {
  const { searchParams, replaceParams, pushParams } = useUrlQueryParams();
  const keyword = searchParams.get('q') ?? '';

  const handleKeywordChange = (value: string) => {
    replaceParams({
      q: value.trim() || null,
      abilityId: null,
      pokemonId: null,
    });
  };

  /** 특성→포켓몬 검색은 history push (뒤로가기 시 특성 선택 복원) */
  const handlePokemonSearch = (pokemonName: string) => {
    pushParams({
      q: pokemonName.trim() || null,
      abilityId: null,
      pokemonId: null,
    });
  };

  return (
    <div className={s.page}>
      <StickySearchBar
        keyword={keyword}
        onKeywordChange={handleKeywordChange}
        placeholderType="ability"
      />
      <AbilitiesList
        keyword={keyword}
        onPokemonSearch={handlePokemonSearch}
      />
    </div>
  );
}

const AbilitiesPage = () => {
  return (
    <Suspense fallback={null}>
      <AbilitiesPageContent />
    </Suspense>
  );
};

export default AbilitiesPage;
