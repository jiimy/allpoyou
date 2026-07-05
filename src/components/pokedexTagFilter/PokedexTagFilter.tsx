'use client';

import { POKEDEX_TAGS } from '@/store/PokemonStore';

import s from './pokedexTagFilter.module.scss';

type PokedexTagFilterProps = {
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
};

export default function PokedexTagFilter({
  selectedTag,
  onSelectTag,
}: PokedexTagFilterProps) {
  return (
    <div className={s.wrap}>
      <button
        type="button"
        className={`${s.tagBtn} ${selectedTag === null ? s.tagBtnActive : ''}`}
        aria-pressed={selectedTag === null}
        onClick={() => onSelectTag(null)}
      >
        전체
      </button>
      {POKEDEX_TAGS.map((tag) => {
        const active = selectedTag === tag;
        return (
          <button
            key={tag}
            type="button"
            className={`${s.tagBtn} ${active ? s.tagBtnActive : ''}`}
            aria-pressed={active}
            onClick={() => onSelectTag(active ? null : tag)}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
