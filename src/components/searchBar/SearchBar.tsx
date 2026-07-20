'use client';

import { useEffect, useState } from 'react';
import { track } from '@vercel/analytics';
import {
  fetchPokemonList,
  getPokemonByNameKo,
  type Pokemon,
} from '@/store/PokemonStore';
import { usePochampsStore } from '@/store/PochampsStore';
import { getBaseEnglishNameForDex } from '@/utils/pokemonName';
import s from './searchBar.module.scss';

const DEBOUNCE_MS = 1000;

type PlaceholderType = 'main' | 'pokemon' | 'moves' | 'item' | 'ability';

const PLACEHOLDER_BY_TYPE: Record<PlaceholderType, string> = {
  main: '포켓몬 이름 검색',
  pokemon: '포켓몬 이름, 타입 검색',
  moves: '기술명, 설명, 포켓몬 이름 검색;',
  item: '도구명, 설명 검색',
  ability: '특성 이름, 특성 설명 검색',
};

type BattleCategoryItem = {
  rank: number;
  name: string;
  nameEn: string;
  percentage: string;
};

type BattleCategoryGroup = {
  category: string;
  labelKo: string;
  items: BattleCategoryItem[];
};

type BattlePreview = {
  cached: boolean;
  date: string;
  pokemon: string;
  pokemonKo: string;
  showdownId: string;
  format: string;
  storagePath: string;
  byCategory: BattleCategoryGroup[];
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

function resolvePokemonForBattle(keyword: string, list: Pokemon[]): Pokemon | null {
  const q = keyword.trim();
  if (!q) return null;

  const exact = getPokemonByNameKo(q);
  if (exact) return exact;

  const lower = q.toLowerCase();
  return (
    list.find((p) => p.nameKo === q) ??
    list.find((p) => p.name.toLowerCase() === lower) ??
    list.find((p) => p.nameKo.includes(q)) ??
    null
  );
}

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
  const [battleLoading, setBattleLoading] = useState(false);
  const [battleError, setBattleError] = useState<string | null>(null);
  const [battlePreview, setBattlePreview] = useState<BattlePreview | null>(null);

  const pochampsEnabled = usePochampsStore((state) => state.enabled);
  const battleFormat = usePochampsStore((state) => state.format);

  if (prevKeyword !== keyword) {
    setPrevKeyword(keyword);
    setInputValue(keyword);
  }

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

  useEffect(() => {
    if (placeholderType !== 'main' || !pochampsEnabled) {
      setBattleLoading(false);
      setBattleError(null);
      setBattlePreview(null);
      return;
    }

    const q = keyword.trim();
    if (!q) {
      setBattleLoading(false);
      setBattleError(null);
      setBattlePreview(null);
      return;
    }

    let cancelled = false;

    const run = async () => {
      setBattleLoading(true);
      setBattleError(null);

      try {
        const list = await fetchPokemonList();
        if (cancelled) return;

        const pokemon = resolvePokemonForBattle(q, list);
        if (!pokemon) {
          setBattlePreview(null);
          setBattleError(`"${q}"에 해당하는 포켓몬을 찾지 못했습니다.`);
          return;
        }

        const slug = getBaseEnglishNameForDex(pokemon.name).toLowerCase();
        const res = await fetch(`/api/battle/${battleFormat}/${encodeURIComponent(slug)}`);
        const data = (await res.json()) as BattlePreview & { error?: string };

        if (cancelled) return;

        if (!res.ok) {
          setBattlePreview(null);
          setBattleError(data.error ?? `배틀 데이터 조회 실패 (${res.status})`);
          return;
        }

        setBattlePreview({
          cached: data.cached,
          date: data.date,
          pokemon: data.pokemon,
          pokemonKo: data.pokemonKo,
          showdownId: data.showdownId,
          format: data.format,
          storagePath: data.storagePath,
          byCategory: data.byCategory ?? [],
        });
        setBattleError(null);
      } catch (error) {
        if (cancelled) return;
        setBattlePreview(null);
        setBattleError(
          error instanceof Error ? error.message : '배틀 데이터를 가져오지 못했습니다.',
        );
      } finally {
        if (!cancelled) setBattleLoading(false);
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [keyword, placeholderType, pochampsEnabled, battleFormat]);

  const q = keyword.trim();
  const showPokemonHint = placeholderType === 'moves' && q.length > 0;
  const showPochampsPanel = placeholderType === 'main' && pochampsEnabled && q.length > 0;

  return (
    <div className={s.wrap}>
      <input
        type="search"
        className={s.input}
        placeholder={
          placeholderType === 'main' && pochampsEnabled
            ? '포챔스: 포켓몬 한글/영문 이름 검색'
            : PLACEHOLDER_BY_TYPE[placeholderType]
        }
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        autoComplete="off"
      />
      {showPokemonHint ? (
        <p
          className={`${s.hint} ${pokemonSearchError ? s.hintError : ''}`}
          title={matchedPokemonNames.length > 0 ? matchedPokemonNames.join(', ') : ''}
        >
          {pokemonSearchLoading
            ? '포켓몬 기술 목록 조회 중…'
            : pokemonSearchError
              ? pokemonSearchError
              : matchedPokemonNames.length > 0
                ? `포켓몬 매칭: ${matchedPokemonNames.join(', ')}`
                : null}
        </p>
      ) : null}

      {showPochampsPanel ? (
        <div className={s.pochampsPanel}>
          {battleLoading ? (
            <p className={s.hint}>포챔스 배틀 데이터 조회 중…</p>
          ) : battleError ? (
            <p className={`${s.hint} ${s.hintError}`}>{battleError}</p>
          ) : battlePreview ? (
            <>
              <p className={s.pochampsMeta}>
                {battlePreview.pokemonKo || battlePreview.pokemon} ·{' '}
                {battlePreview.format} ·{' '}
                {battlePreview.cached ? '캐시' : '신규 저장'} · {battlePreview.date}
              </p>
              <div className={s.pochampsCategories}>
                {battlePreview.byCategory.map((group) => (
                  <section key={group.category} className={s.pochampsCategory}>
                    <h3 className={s.pochampsCategoryTitle}>
                      {group.labelKo}
                      <span className={s.pochampsCategoryCount}>
                        {group.items.length}
                      </span>
                    </h3>
                    <ol className={s.pochampsList}>
                      {group.items.map((item) => (
                        <li key={`${group.category}-${item.rank}-${item.nameEn || item.name}`}>
                          <span className={s.pochampsRank}>{item.rank}</span>
                          <span className={s.pochampsName} title={item.nameEn || undefined}>
                            {item.name}
                          </span>
                          {item.percentage ? (
                            <span className={s.pochampsPct}>{item.percentage}</span>
                          ) : null}
                        </li>
                      ))}
                    </ol>
                  </section>
                ))}
              </div>
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
