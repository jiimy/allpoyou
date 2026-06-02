'use client';

import s from './searchBar.module.scss';

type PlaceholderType = 'pokemon' | 'moves' | 'item' | 'ability';

const PLACEHOLDER_BY_TYPE: Record<PlaceholderType, string> = {
  pokemon: '포켓몬 이름, 타입 검색',
  moves: '기술명, 설명, 포켓몬 이름 검색;',
  item: '도구명, 설명 검색',
  ability: '포켓몬 이름, 특성 이름, 특성 설명 검색',
};

export type SearchBarProps = {
  keyword: string;
  onKeywordChange: (value: string) => void;
  pokemonSearchLoading?: boolean;
  pokemonSearchError?: string | null;
  matchedPokemonNames?: string[];
  placeholderType?: PlaceholderType;
};

export default function SearchBar({
  keyword,
  onKeywordChange,
  pokemonSearchLoading = false,
  pokemonSearchError = null,
  matchedPokemonNames = [],
  placeholderType = 'moves',
}: SearchBarProps) {
  const q = keyword.trim();
  const showPokemonHint = placeholderType === 'moves' && q.length > 0;

  return (
    <div className={s.wrap}>
      <input
        type="search"
        className={s.input}
        placeholder={PLACEHOLDER_BY_TYPE[placeholderType]}
        value={keyword}
        onChange={(e) => onKeywordChange(e.target.value)}
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
    </div>
  );
}
