'use client';

import { useEffect, useState } from 'react';
import { track } from '@vercel/analytics';
import { usePochampsStore } from '@/store/PochampsStore';
import { useSearchBarFocusStore } from '@/store/SearchBarFocusStore';
import {
  useSearchHistoryStore,
  type SearchHistoryScope,
} from '@/store/SearchHistoryStore';
import PochamsData from '@/components/pochamsData/PochamsData';
import s from './searchBar.module.scss';

const DEBOUNCE_MS = 1000;

export type PlaceholderType = SearchHistoryScope;

const PLACEHOLDER_BY_TYPE: Record<PlaceholderType, string> = {
  main: '포켓몬 이름 검색',
  pokemon: '포켓몬 이름, 타입 검색(예시: 불꽃 물)',
  moves: '기술명, 설명, 포켓몬 이름 검색',
  item: '도구명, 설명 검색',
  ability: '포켓몬 이름, 특성 이름, 특성 설명 검색',
};

export type SearchBarProps = {
  keyword: string;
  onKeywordChange: (value: string) => void;
  onDebouncingChange?: (isDebouncing: boolean) => void;
  pokemonSearchLoading?: boolean;
  pokemonSearchError?: string | null;
  matchedPokemonNames?: string[];
  placeholderType?: PlaceholderType;
};

export default function SearchBar({
  keyword,
  onKeywordChange,
  onDebouncingChange,
  pokemonSearchLoading = false,
  pokemonSearchError = null,
  matchedPokemonNames = [],
  placeholderType = 'moves',
}: SearchBarProps) {
  const [inputValue, setInputValue] = useState(keyword);
  const [prevKeyword, setPrevKeyword] = useState(keyword);
  const setSearchBarFocused = useSearchBarFocusStore((state) => state.setFocused);
  const addSearchHistory = useSearchHistoryStore((state) => state.addEntry);

  const pochampsEnabled = usePochampsStore((state) => state.enabled);
  const pochampsHydrated = usePochampsStore((state) => state.hasHydrated);
  const pochampsActive = pochampsHydrated && pochampsEnabled;

  if (prevKeyword !== keyword) {
    setPrevKeyword(keyword);
    setInputValue(keyword);
  }

  useEffect(() => {
    return () => setSearchBarFocused(false);
  }, [setSearchBarFocused]);

  useEffect(() => {
    onDebouncingChange?.(inputValue !== keyword);
  }, [inputValue, keyword, onDebouncingChange]);

  useEffect(() => {
    if (inputValue === keyword) return;

    const timer = window.setTimeout(() => {
      onKeywordChange(inputValue);

      const trimmedValue = inputValue.trim();
      if (trimmedValue.length > 0) {
        track('Search Submitted', {
          category: placeholderType,
          keyword: trimmedValue,
        });
      }
    }, DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [inputValue, keyword, onKeywordChange, placeholderType]);

  // 확정된 keyword(직접 입력·URL/외부 반영)를 검색 기록에 남김
  useEffect(() => {
    const trimmed = keyword.trim();
    if (!trimmed) return;
    addSearchHistory(placeholderType, trimmed);
  }, [keyword, placeholderType, addSearchHistory]);

  const q = keyword.trim();
  const showPokemonHint = placeholderType === 'moves' && q.length > 0;

  const movesPlaceholder = pochampsActive
    ? '포챔스: 기술명, 설명, 포켓몬 이름 검색'
    : PLACEHOLDER_BY_TYPE.moves;

  return (
    <div className={s.wrap}>
      <input
        type="search"
        className={s.input}
        placeholder={
          placeholderType === 'main' && pochampsActive
            ? '포챔스: 포켓몬 한글/영문 이름 검색'
            : placeholderType === 'moves'
              ? movesPlaceholder
              : PLACEHOLDER_BY_TYPE[placeholderType]
        }
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => setSearchBarFocused(true)}
        onBlur={() => setSearchBarFocused(false)}
        autoComplete="off"
      />
      {showPokemonHint ? (
        <p
          className={`${s.hint} ${pokemonSearchError ? s.hintError : ''}`}
          title={
            matchedPokemonNames.length > 0
              ? matchedPokemonNames.join(', ')
              : ''
          }
        >
          {pokemonSearchLoading
            ? pochampsActive
              ? '포챔스 기준 포켓몬 기술 조회 중…'
              : '포켓몬 기술 목록 조회 중…'
            : pokemonSearchError
              ? pokemonSearchError
              : matchedPokemonNames.length > 0
                ? `${pochampsActive ? '포챔스 포켓몬' : '포켓몬'} 매칭: ${matchedPokemonNames.join(', ')}`
                : null}
        </p>
      ) : null}

      {placeholderType === 'main' ? (
        <PochamsData keyword={keyword} onKeywordChange={onKeywordChange} />
      ) : null}
    </div>
  );
}
