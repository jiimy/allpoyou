'use client';

import Image from 'next/image';
import { type KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react';

import { TYPE_COLOR } from '@/constants/pokemonTypeColor';
import { fetchPokemonList, filterPokemonList, type Pokemon } from '@/store/PokemonStore';
import { usePokemonPickStore } from '@/store/PokemonPickStore';
import { useTeamModalStore } from '@/store/TeamModalStore';
import { getPokemonStaticImage } from '@/utils/pokemonDisplay';

import s from './pokedex.module.scss';

const PAGE_SIZE = 16;

function PokemonCard({
  pokemon,
  onSelect,
}: {
  pokemon: Pokemon;
  onSelect: () => void;
}) {
  const [imageError, setImageError] = useState(false);
  const imageUrl = getPokemonStaticImage(pokemon.images);

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect();
    }
  };

  return (
    <article
      className={`${s.card} ${s.cardSelectable}`}
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
    >
      # {pokemon.number}
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
          <span className={s.abilityLine}>
            {pokemon.ability.join(', ')}
          </span>
        ) : null}
        {pokemon.s_ability.length > 0 ? (
          <span className={s.abilityLine}>
            / 🔓 {pokemon.s_ability.join(', ')}
          </span>
        ) : null}
      </div>
    </article>
  );
}

type PokedexListProps = {
  keyword?: string;
};

export default function PokedexList({ keyword = '' }: PokedexListProps) {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const setPendingPokemon = usePokemonPickStore((state) => state.setPendingPokemon);
  const setTeamModalOpen = useTeamModalStore((state) => state.setIsOpen);

  const handlePokemonSelect = (pokemon: Pokemon) => {
    setPendingPokemon(pokemon);
    setTeamModalOpen(true);
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

  const filteredPokemons = useMemo(
    () => filterPokemonList(pokemons, keyword),
    [pokemons, keyword],
  );

  const visiblePokemons = useMemo(
    () => filteredPokemons.slice(0, visibleCount),
    [filteredPokemons, visibleCount],
  );

  const hasMore = visibleCount < filteredPokemons.length;

  const [prevKeyword, setPrevKeyword] = useState(keyword);
  if (prevKeyword !== keyword) {
    setPrevKeyword(keyword);
    setVisibleCount(PAGE_SIZE);
  }

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
          ? `${filteredPokemons.length.toLocaleString()}마리 / ${pokemons.length.toLocaleString()}마리`
          : `${filteredPokemons.length.toLocaleString()}마리`}
      </p>

      <div className={s.grid}>
        {visiblePokemons.length > 0 ? (
          visiblePokemons.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              onSelect={() => handlePokemonSelect(pokemon)}
            />
          ))
        ) : (
          <p className={s.empty}>검색 결과가 없습니다.</p>
        )}
        {hasMore ? <div ref={sentinelRef} className={s.sentinel} aria-hidden /> : null}
      </div>
    </>
  );
}
