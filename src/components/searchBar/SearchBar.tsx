'use client';

import s from './searchBar.module.scss';

export type SearchBarProps = {
  keyword: string;
  onKeywordChange: (value: string) => void;
  pokemonSearchLoading?: boolean;
  pokemonSearchError?: string | null;
  matchedPokemonNames?: string[];
};

export default function SearchBar({
  keyword,
  onKeywordChange,
  pokemonSearchLoading = false,
  pokemonSearchError = null,
  matchedPokemonNames = [],
}: SearchBarProps) {
  const q = keyword.trim();
  const showPokemonHint = q.length > 0;

  return (
    <div className={s.wrap}>
      <input
        type="search"
        className={s.input}
        placeholder="기술명, 설명, 포켓몬 이름 검색"
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
