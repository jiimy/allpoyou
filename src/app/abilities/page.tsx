'use client';

import { Suspense } from 'react';

import AbilitiesList from '@/components/abilitiesList/AbilitiesList';
import StickySearchBar from '@/components/searchBar/StickySearchBar';
import { useUrlQueryParams } from '@/hooks/useUrlQueryParams';

import s from './abilities.module.scss';

function AbilitiesPageContent() {
  const { searchParams, replaceParams } = useUrlQueryParams();
  const keyword = searchParams.get('q') ?? '';

  const handleKeywordChange = (value: string) => {
    replaceParams({
      q: value.trim() || null,
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
      <AbilitiesList keyword={keyword} />
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
