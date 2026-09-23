'use client';

import {
  POKEDEX_TAGS,
  type PokedexTagSelection,
} from '@/store/PokemonStore';

import s from './pokedexTagFilter.module.scss';

type PokedexTagFilterProps = {
  selections: PokedexTagSelection[];
  onCycleTag: (tag: string) => void;
  onClear: () => void;
};

export default function PokedexTagFilter({
  selections,
  onCycleTag,
  onClear,
}: PokedexTagFilterProps) {
  const modeByTag = new Map(
    selections.map((entry) => [entry.tag, entry.mode] as const),
  );
  const noneActive = selections.length === 0;

  return (
    <div className={s.wrap} role="group" aria-label="도감 태그 필터">
      <button
        type="button"
        className={`${s.tagBtn} ${noneActive ? s.tagBtnActive : ''}`}
        aria-pressed={noneActive}
        onClick={onClear}
      >
        전체
      </button>
      {POKEDEX_TAGS.map((tag) => {
        const mode = modeByTag.get(tag);
        const include = mode === 'include';
        const exclude = mode === 'exclude';
        return (
          <button
            key={tag}
            type="button"
            className={`${s.tagBtn} ${include ? s.tagBtnActive : ''} ${exclude ? s.tagBtnExclude : ''}`}
            aria-pressed={mode != null}
            aria-label={
              include
                ? `${tag}만 보기 (다시 누르면 제외)`
                : exclude
                  ? `${tag} 제외 (다시 누르면 해제)`
                  : `${tag} 필터`
            }
            onClick={() => onCycleTag(tag)}
          >
            {exclude ? `${tag}제외` : tag}
          </button>
        );
      })}
    </div>
  );
}
