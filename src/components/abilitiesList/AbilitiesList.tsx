'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

import { fetchPokemonList } from '@/store/PokemonStore';
import { ALL_ABILITIES, filterAbilities } from '@/utils/abilitySearch';
import { getPokemonStaticImage } from '@/utils/pokemonDisplay';

import s from '@/app/abilities/abilities.module.scss';

type AbilitiesListProps = {
  keyword?: string;
};

function AbilityCard({
  nameKo,
  summary,
  matchedPokemons,
}: {
  nameKo: string;
  summary: string;
  matchedPokemons: { id: number; nameKo: string; images: string[] }[];
}) {
  return (
    <article className={s.card}>
      <h3 className={s.name}>{nameKo}</h3>
      <p className={s.summary}>{summary}</p>

      {matchedPokemons.length > 0 ? (
        <ul className={s.pokemonList}>
          {matchedPokemons.map((pokemon) => {
            const imageUrl = getPokemonStaticImage(pokemon.images);

            return (
              <li key={pokemon.id} className={s.pokemonItem}>
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={pokemon.nameKo}
                    width={32}
                    height={32}
                    className={s.pokemonImage}
                  />
                ) : null}
                <span>{pokemon.nameKo}</span>
              </li>
            );
          })}
        </ul>
      ) : null}
    </article>
  );
}

export default function AbilitiesList({ keyword = '' }: AbilitiesListProps) {
  const [pokemons, setPokemons] = useState<Awaited<ReturnType<typeof fetchPokemonList>>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const filteredAbilities = useMemo(
    () => filterAbilities(ALL_ABILITIES, pokemons, keyword),
    [pokemons, keyword],
  );

  const trimmedKeyword = keyword.trim();

  if (loading) {
    return <p className={s.status}>특성 목록을 불러오는 중…</p>;
  }

  if (error) {
    return <p className={s.error}>{error}</p>;
  }

  return (
    <>
      <p className={s.resultCount}>
        {trimmedKeyword
          ? `${filteredAbilities.length.toLocaleString()}개 / ${ALL_ABILITIES.length.toLocaleString()}개`
          : `${filteredAbilities.length.toLocaleString()}개`}
      </p>

      <div className={s.grid}>
        {filteredAbilities.length > 0 ? (
          filteredAbilities.map((ability) => (
            <AbilityCard
              key={ability.id}
              nameKo={ability.nameKo}
              summary={ability.summary}
              matchedPokemons={ability.matchedPokemons}
            />
          ))
        ) : (
          <p className={s.empty}>검색 결과가 없습니다.</p>
        )}
      </div>
    </>
  );
}
