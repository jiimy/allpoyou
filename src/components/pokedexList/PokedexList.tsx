'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

import { TYPE_COLOR } from '@/constants/pokemonTypeColor';
import {
  fetchPokemonList,
  filterPokemonByTagSelections,
  filterPokemonList,
  type Pokemon,
  type PokedexTagSelection,
} from '@/store/PokemonStore';
import { usePokemonPickStore } from '@/store/PokemonPickStore';
import { usePochampsStore } from '@/store/PochampsStore';
import { useTeamModalStore } from '@/store/TeamModalStore';
import { formatAbilityTooltipText } from '@/utils/abilitySearch';
import { filterPokemonByPochampsData } from '@/utils/pochampsMoves';
import { getPokemonStaticImage } from '@/utils/pokemonDisplay';
import { applyPokemonListFilters } from '@/utils/pokemonListFilter';
import SelectPokeModal from '@/components/portalModal/selectPokeModal/SelectPokeModal';
import PokemonTooltip from '@/components/pokemonTooltip/PokemonTooltip';
import type {
  PokedexStatSortRule,
  PokedexTypeSlotSort,
} from '@/components/pokedexStatSort/PokedexStatSort';
import { usePokemonListFilterStore } from '@/store/PokemonListFilterStore';
import { useUrlQueryParams } from '@/hooks/useUrlQueryParams';

import s from './pokedex.module.scss';

const PAGE_SIZE = 16;

function typeSlotRank(
  pokemon: Pokemon,
  tokens: string[],
  slot: PokedexTypeSlotSort,
): number {
  if (slot === 'front') {
    return tokens.includes(pokemon.types[0] ?? '') ? 0 : 1;
  }
  return pokemon.types.length > 1 && tokens.includes(pokemon.types[1] ?? '')
    ? 0
    : 1;
}

function compareStatRules(
  a: Pokemon,
  b: Pokemon,
  rules: PokedexStatSortRule[],
): number {
  for (const rule of rules) {
    const av = Number(a[rule.key]);
    const bv = Number(b[rule.key]);
    if (!Number.isFinite(av) && !Number.isFinite(bv)) continue;
    if (!Number.isFinite(av)) return 1;
    if (!Number.isFinite(bv)) return -1;
    if (av === bv) continue;
    // asc: 작은 값 먼저 / desc: 큰 값 먼저
    return rule.direction === 'asc' ? av - bv : bv - av;
  }
  return 0;
}

function sortPokemonsComposite(
  list: Pokemon[],
  options: {
    typeSlotSort: PokedexTypeSlotSort | null;
    typeSearchTokens: string[] | null;
    statSorts: PokedexStatSortRule[];
  },
): Pokemon[] {
  const { typeSlotSort, typeSearchTokens, statSorts } = options;
  const hasTypeSlot =
    typeSlotSort != null &&
    typeSearchTokens != null &&
    typeSearchTokens.length > 0;
  const hasStatSort = statSorts.length > 0;

  if (!hasTypeSlot && !hasStatSort) return list;

  return list
    .map((pokemon, index) => ({ pokemon, index }))
    .sort((left, right) => {
      if (hasTypeSlot && typeSlotSort && typeSearchTokens) {
        const bySlot =
          typeSlotRank(left.pokemon, typeSearchTokens, typeSlotSort) -
          typeSlotRank(right.pokemon, typeSearchTokens, typeSlotSort);
        if (bySlot !== 0) return bySlot;
      }

      const byStats = compareStatRules(
        left.pokemon,
        right.pokemon,
        statSorts,
      );
      if (byStats !== 0) return byStats;

      const byNumber = left.pokemon.number - right.pokemon.number;
      if (byNumber !== 0) return byNumber;

      const byName = left.pokemon.nameKo.localeCompare(
        right.pokemon.nameKo,
        'ko',
      );
      if (byName !== 0) return byName;

      // 안정 정렬: 원래 순서 유지
      return left.index - right.index;
    })
    .map(({ pokemon }) => pokemon);
}

function PokemonCard({
  pokemon,
  onSelect,
  onViewInfo,
}: {
  pokemon: Pokemon;
  onSelect: () => void;
  onViewInfo: () => void;
}) {
  const [imageError, setImageError] = useState(false);
  const imageUrl = getPokemonStaticImage(pokemon.images);

  return (
    <article
      className={`${s.card} ${s.cardSelectable} pokemonTooltipHost`}
      tabIndex={0}
    >
      # {pokemon.number}
      {pokemon.tag ? <span className={s.tag}>{pokemon.tag}</span> : null}
      <div className={s.imageWrap}>
        {imageUrl && !imageError ? (
          <Image
            src={imageUrl}
            alt={pokemon.nameKo}
            width={96}
            height={96}
            className={s.image}
            onError={() => setImageError(true)}
          />
        ) : (
          <span className={s.imageFallback}>이미지 없음</span>
        )}
      </div>

      <h3 className={s.name}>{pokemon.nameKo}</h3>

      <div className={s.types}>
        {pokemon.types.map((type) => (
          <span
            key={type}
            className={s.typeBadge}
            style={{ background: TYPE_COLOR[type] ?? '#999' }}
          >
            {type}
          </span>
        ))}
      </div>

      <div className={s.stats}>
        <div className={s.statRow}>
          <div>HP</div>
          <div className={s.statCount}>{pokemon.H}</div>
          <div className="w-full bg-[#f8e5e5]" >
            <div style={{ width: `${(pokemon.H * 100) / 255}%` }} className="h-full bg-[#e02e2f]"></div>
          </div>
          <div>공격</div>
          <div className={s.statCount}>{pokemon.A}</div>
          <div className="w-full bg-[#faeee1]">
            <div style={{ width: `${(pokemon.A * 100) / 255}%` }} className="h-full bg-[#f67f08]"></div>
          </div>
          <div>방어</div>
          <div className={s.statCount}>{pokemon.B}</div>
          <div className="w-full bg-[#f4f4e1]">
            <div style={{ width: `${(pokemon.B * 100) / 255}%` }} className="h-full bg-[#efb906]"></div>
          </div>
          <div>특공</div>
          <div className={s.statCount}>{pokemon.C}</div>
          <div className="w-full bg-[#e7f1e5]">
            <div style={{ width: `${(pokemon.C * 100) / 255}%` }} className="h-full bg-[#419c2c]"></div>
          </div>
          <div>특방</div>
          <div className={s.statCount}>{pokemon.D}</div>
          <div className="w-full bg-[#e5eef8]">
            <div style={{ width: `${(pokemon.D * 100) / 255}%` }} className="h-full bg-[#2c7de5]"></div>
          </div>
          <div>스피드</div>
          <div className={s.statCount}>{pokemon.S}</div>
          <div className="w-full bg-[#f8ecf8]">
            <div style={{ width: `${(pokemon.S * 100) / 255}%` }} className="h-full bg-[#e771e7]"></div>
          </div>
          <div>총합</div>
          <div className={s.statCount}>{pokemon.total}</div>
        </div>
      </div>

      <div className={s.abilities}>
        {pokemon.ability.length > 0 ? (
          <span
            className={s.abilityLine}
            title={formatAbilityTooltipText(pokemon.ability)}
          >
            {pokemon.ability.join(', ')}
          </span>
        ) : null}
        {pokemon.s_ability.length > 0 ? (
          <span
            className={s.abilityLine}
            title={formatAbilityTooltipText(pokemon.s_ability)}
          >
            / 🔓 {pokemon.s_ability.join(', ')}
          </span>
        ) : null}
      </div>
      <PokemonTooltip
        onViewInfo={(event) => {
          event.stopPropagation();
          onViewInfo();
        }}
        onAddToTeam={(event) => {
          event.stopPropagation();
          onSelect();
        }}
      />
    </article>
  );
}

type PokedexListProps = {
  keyword?: string;
  tagSelections?: PokedexTagSelection[];
  statSorts?: PokedexStatSortRule[];
  typeSlotSort?: PokedexTypeSlotSort | null;
  typeSearchTokens?: string[] | null;
};

export default function PokedexList({
  keyword = '',
  tagSelections = [],
  statSorts = [],
  typeSlotSort = null,
  typeSearchTokens = null,
}: PokedexListProps) {
  const { replaceParams, parseIntParam } = useUrlQueryParams();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const setPendingPokemon = usePokemonPickStore((state) => state.setPendingPokemon);
  const setTeamModalOpen = useTeamModalStore((state) => state.setIsOpen);
  const pochampsEnabled = usePochampsStore((state) => state.enabled);
  const pochampsHydrated = usePochampsStore((state) => state.hasHydrated);
  const pochampsActive = pochampsHydrated && pochampsEnabled;
  const excludeMega = usePokemonListFilterStore((state) => state.excludeMega);
  const excludeGmax = usePokemonListFilterStore((state) => state.excludeGmax);
  const finalEvolutionOnly = usePokemonListFilterStore(
    (state) => state.finalEvolutionOnly,
  );

  const urlPokemonId = parseIntParam('pokemonId');

  const handlePokemonSelect = (pokemon: Pokemon) => {
    setPendingPokemon(pokemon);
    setTeamModalOpen(true);
  };

  const handlePokemonViewInfo = (pokemon: Pokemon) => {
    replaceParams({ pokemonId: String(pokemon.id) });
  };

  const handleCloseInfoModal = () => {
    replaceParams({ pokemonId: null });
  };

  useEffect(() => {
    let cancelled = false;

    fetchPokemonList()
      .then((list) => {
        if (!cancelled) setPokemons(list);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : '포켓몬 목록을 불러오지 못했습니다.');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const sourcePokemons = useMemo(
    () => (pochampsActive ? filterPokemonByPochampsData(pokemons) : pokemons),
    [pokemons, pochampsActive],
  );

  const infoModalPokemon = useMemo(() => {
    if (urlPokemonId == null || loading) return null;
    return sourcePokemons.find((entry) => entry.id === urlPokemonId) ?? null;
  }, [urlPokemonId, sourcePokemons, loading]);

  const sortKeySig = statSorts
    .map((rule) => `${rule.key}:${rule.direction}`)
    .join(',');

  const filteredPokemons = useMemo(() => {
    const filtered = applyPokemonListFilters(
      filterPokemonByTagSelections(
        filterPokemonList(sourcePokemons, keyword),
        tagSelections,
      ),
      { excludeMega, excludeGmax, finalEvolutionOnly },
    );

    return sortPokemonsComposite(filtered, {
      typeSlotSort,
      typeSearchTokens,
      statSorts,
    });
    // sortKeySig로 규칙 변경(3개 이상·방향 토글 포함)을 확실히 구독
  }, [
    sourcePokemons,
    keyword,
    tagSelections,
    sortKeySig,
    statSorts,
    typeSlotSort,
    typeSearchTokens,
    excludeMega,
    excludeGmax,
    finalEvolutionOnly,
  ]);

  const visiblePokemons = filteredPokemons.slice(0, visibleCount);

  const hasMore = visibleCount < filteredPokemons.length;

  const tagKey = tagSelections
    .map((entry) => `${entry.mode}:${entry.tag}`)
    .join(',');
  const filterKey = `${keyword}\u0000${tagKey}\u0000${pochampsActive}\u0000${sortKeySig}\u0000${typeSlotSort ?? ''}\u0000${excludeMega}\u0000${excludeGmax}\u0000${finalEvolutionOnly}`;

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filterKey]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, filteredPokemons.length));
        }
      },
      { rootMargin: '240px' },
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [filteredPokemons.length, hasMore]);

  if (loading) {
    return <p className={s.status}>포켓몬 목록을 불러오는 중…</p>;
  }

  if (error) {
    return <p className={s.error}>{error}</p>;
  }

  const trimmedKeyword = keyword.trim();

  return (
    <>
      <p className={s.resultCount}>
        {trimmedKeyword
          ? `${filteredPokemons.length.toLocaleString()}마리 / ${sourcePokemons.length.toLocaleString()}마리`
          : `${filteredPokemons.length.toLocaleString()}마리${
              pochampsActive ? ' · 포챔스' : ''
            } / ${sourcePokemons.length.toLocaleString()}마리`}
      </p>

      <div className={s.grid} key={sortKeySig || 'default-sort'}>
        {visiblePokemons.length > 0 ? (
          visiblePokemons.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              onSelect={() => handlePokemonSelect(pokemon)}
              onViewInfo={() => handlePokemonViewInfo(pokemon)}
            />
          ))
        ) : (
          <p className={s.empty}>검색 결과가 없습니다.</p>
        )}
        {hasMore ? <div ref={sentinelRef} className={s.sentinel} aria-hidden /> : null}
      </div>

      {infoModalPokemon ? (
        <SelectPokeModal
          pokemon={infoModalPokemon}
          setOnModal={(open) => {
            if (!open) handleCloseInfoModal();
          }}
        />
      ) : null}
    </>
  );
}
