'use client';

import Image from 'next/image';
import { type KeyboardEvent, useEffect, useMemo, useState } from 'react';

import { fetchPokemonList, type Pokemon } from '@/store/PokemonStore';
import { usePokemonPickStore } from '@/store/PokemonPickStore';
import { useTeamModalStore } from '@/store/TeamModalStore';
import {
  ALL_ABILITIES,
  filterAbilities,
  getPokemonsWithAbilityName,
} from '@/utils/abilitySearch';
import { getPokemonStaticImage } from '@/utils/pokemonDisplay';
import SelectPokeModal from '@/components/portalModal/selectPokeModal/SelectPokeModal';
import { useUrlQueryParams } from '@/hooks/useUrlQueryParams';

import s from '@/app/abilities/abilities.module.scss';
import PokemonTooltip from '../pokemonTooltip/PokemonTooltip';

type AbilitiesListProps = {
  keyword?: string;
};

function AbilityCard({
  nameKo,
  summary,
  matchedPokemons,
  selected,
  onSelect,
  onPokemonSelect,
  onPokemonViewInfo,
}: {
  nameKo: string;
  summary: string;
  matchedPokemons: Pokemon[];
  selected: boolean;
  onSelect: () => void;
  onPokemonSelect: (pokemon: Pokemon) => void;
  onPokemonViewInfo: (pokemon: Pokemon) => void;
}) {
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect();
    }
  };

  return (
    <article
      className={`${s.card} ${s.cardSelectable} ${selected ? s.cardSelected : ''}`}
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
    >
      <h3 className={s.name}>{nameKo}</h3>
      <p className={s.summary}>{summary}</p>

      {matchedPokemons.length > 0 ? (
        <ul className={s.pokemonList}>
          {matchedPokemons.map((pokemon) => {
            const imageUrl = getPokemonStaticImage(pokemon.images);

            return (
              <li
                key={pokemon.id}
                className={`${s.pokemonItem} ${s.pokemonItemSelectable} pokemonTooltipHost`}
                tabIndex={0}
                onClick={(event) => event.stopPropagation()}
              >
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
                <PokemonTooltip
                  onViewInfo={(event) => {
                    event.stopPropagation();
                    onPokemonViewInfo(pokemon);
                  }}
                  onAddToTeam={(event) => {
                    event.stopPropagation();
                    onPokemonSelect(pokemon);
                  }}
                />
              </li>
            );
          })}
        </ul>
      ) : selected ? (
        <p className={s.noPokemon}>해당 특성을 가진 포켓몬이 없습니다.</p>
      ) : null}
    </article>
  );
}

export default function AbilitiesList({ keyword = '' }: AbilitiesListProps) {
  const { replaceParams, parseIntParam } = useUrlQueryParams();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const setPendingPokemon = usePokemonPickStore(
    (state) => state.setPendingPokemon,
  );
  const setTeamModalOpen = useTeamModalStore((state) => state.setIsOpen);

  const urlAbilityId = parseIntParam('abilityId');
  const urlPokemonId = parseIntParam('pokemonId');
  const trimmedKeyword = keyword.trim();
  const selectedAbilityId = urlAbilityId;

  const infoModalPokemon = useMemo(() => {
    if (urlPokemonId == null || loading) return null;
    return pokemons.find((entry) => entry.id === urlPokemonId) ?? null;
  }, [urlPokemonId, pokemons, loading]);

  useEffect(() => {
    let cancelled = false;

    fetchPokemonList()
      .then((list) => {
        if (!cancelled) setPokemons(list);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : '포켓몬 목록을 불러오지 못했습니다.',
          );
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

  const handleAbilitySelect = (abilityId: number) => {
    const isDeselect = urlAbilityId === abilityId;

    if (isDeselect) {
      replaceParams({ abilityId: null, pokemonId: null });
      return;
    }

    replaceParams({
      abilityId: String(abilityId),
      pokemonId: null,
    });
  };

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
          filteredAbilities.map((ability) => {
            const isSelected = selectedAbilityId === ability.id;
            const displayPokemons = isSelected
              ? getPokemonsWithAbilityName(pokemons, ability.nameKo)
              : trimmedKeyword
                ? ability.matchedPokemons
                : [];

            return (
              <AbilityCard
                key={ability.id}
                nameKo={ability.nameKo}
                summary={ability.summary}
                matchedPokemons={displayPokemons}
                selected={isSelected}
                onSelect={() => handleAbilitySelect(ability.id)}
                onPokemonSelect={handlePokemonSelect}
                onPokemonViewInfo={handlePokemonViewInfo}
              />
            );
          })
        ) : (
          <p className={s.empty}>검색 결과가 없습니다.</p>
        )}
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
