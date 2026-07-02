'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ModalFrame from '@/components/portalModal/ModalFrame';
import { TYPE_COLOR } from '@/constants/pokemonTypeColor';
import type { Pokemon } from '@/store/PokemonStore';
import type { MoveDbEntry } from '@/types/move';
import { getAbilitySummary } from '@/utils/abilitySearch';
import { getMoveStatsTitle, getMoveTypeKo } from '@/utils/moveDisplay';
import { getMovesByIds } from '@/utils/movesDb';
import { MOVES_BY_ID } from '@/utils/movesIndex';
import {
  fetchPokemonList,
  getCachedPokemonList,
  getPokemonByNameKo,
} from '@/store/PokemonStore';
import { getPokemonStaticImage } from '@/utils/pokemonDisplay';
import { ensureStringArray } from '@/utils/pokemonNormalize';
import {
  getMoveLookupNameKo,
  resolveMoveLookupPokemonId,
} from '@/utils/pokemonName';
import {
  BASE_STAT_KEYS,
  BASE_STAT_LABEL,
  BASE_STAT_MAX,
} from '@/utils/pokemonBaseStats';
import s from './selectPokeModal.module.scss';

const STAT_BAR_COLORS: Record<(typeof BASE_STAT_KEYS)[number], string> = {
  H: '#e02e2f',
  A: '#f67f08',
  B: '#efb906',
  C: '#419c2c',
  D: '#2c7de5',
  S: '#e771e7',
};

type SelectPokeModalProps = {
  pokemon: Pokemon;
  setOnModal: React.Dispatch<React.SetStateAction<boolean>>;
};

type EvolutionTarget = {
  nameKo: string;
  pokemon: Pokemon | null;
};

function enrichPokemon(entry: Pokemon, list: Pokemon[]): Pokemon {
  return (
    list.find((item) => item.id === entry.id) ??
    list.find((item) => item.name === entry.name) ??
    entry
  );
}

function resolveEvolutionPokemon(nameKo: string, list: Pokemon[]): Pokemon | undefined {
  return getPokemonByNameKo(nameKo) ?? list.find((entry) => entry.nameKo === nameKo);
}

const SelectPokeModal = ({ pokemon, setOnModal }: SelectPokeModalProps) => {
  const router = useRouter();
  const [activePokemon, setActivePokemon] = useState(pokemon);
  const [prevPokemonProp, setPrevPokemonProp] = useState(pokemon);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>(() =>
    getCachedPokemonList(),
  );
  const [moves, setMoves] = useState<MoveDbEntry[]>([]);
  const [movesLoading, setMovesLoading] = useState(true);
  const [movesError, setMovesError] = useState<string | null>(null);

  if (prevPokemonProp !== pokemon) {
    setPrevPokemonProp(pokemon);
    setActivePokemon(enrichPokemon(pokemon, pokemonList));
    setMovesLoading(true);
    setMovesError(null);
  }

  useEffect(() => {
    let cancelled = false;

    fetchPokemonList(true)
      .then((list) => {
        if (cancelled) return;
        setPokemonList(list);
        setActivePokemon((current) => enrichPokemon(current, list));
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [pokemon.id, pokemon.name]);

  const prevEvolutionNames = ensureStringArray(activePokemon.prevEvolutions);
  const nextEvolutionNames = ensureStringArray(activePokemon.nextEvolutions);

  const prevEvolutionTargets = useMemo((): EvolutionTarget[] => {
    return prevEvolutionNames.map((nameKo) => ({
      nameKo,
      pokemon: resolveEvolutionPokemon(nameKo, pokemonList) ?? null,
    }));
  }, [prevEvolutionNames, pokemonList]);

  const nextEvolutionTargets = useMemo((): EvolutionTarget[] => {
    return nextEvolutionNames.map((nameKo) => ({
      nameKo,
      pokemon: resolveEvolutionPokemon(nameKo, pokemonList) ?? null,
    }));
  }, [nextEvolutionNames, pokemonList]);

  const handleEvolutionSelect = useCallback((target: Pokemon | null) => {
    if (!target) return;
    setActivePokemon(target);
    setMovesLoading(true);
    setMovesError(null);
  }, []);

  const handleMoveSelect = useCallback(
    (move: MoveDbEntry) => {
      router.push(`/skills?moveId=${move.id}&learnable=1`);
    },
    [router],
  );

  const imageUrl = getPokemonStaticImage(activePokemon.images);
  const regularAbilities = ensureStringArray(activePokemon.ability);
  const hiddenAbilities = ensureStringArray(activePokemon.s_ability);
  const showEvolutionNav =
    prevEvolutionNames.length > 0 || nextEvolutionNames.length > 0;

  useEffect(() => {
    let cancelled = false;

    const loadMoves = async () => {
      let list = pokemonList;
      if (list.length === 0) {
        try {
          list = await fetchPokemonList();
          if (!cancelled) setPokemonList(list);
        } catch {
          /* id/nameKo fallback은 캐시 없이도 동작 */
        }
      }

      const lookupNameKo = getMoveLookupNameKo(activePokemon.nameKo);
      const lookupId = resolveMoveLookupPokemonId(activePokemon, list);

      const params = new URLSearchParams({
        pokemonId: String(lookupId),
        nameKo: lookupNameKo,
      });

      return fetch(`/api/moves?${params.toString()}`, { cache: 'no-store' });
    };

    loadMoves()
      .then(async (res) => {
        const body = (await res.json()) as {
          moveIds?: number[];
          error?: string;
        };
        if (!res.ok) {
          throw new Error(body.error ?? `조회 실패 (${res.status})`);
        }
        if (cancelled) return;
        setMoves(getMovesByIds(MOVES_BY_ID, body.moveIds ?? []));
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setMovesError(
          err instanceof Error
            ? err.message
            : '기술 목록을 불러오지 못했습니다.',
        );
      })
      .finally(() => {
        if (!cancelled) setMovesLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [activePokemon, pokemonList]);

  return (
    <ModalFrame
      setOnModal={setOnModal}
      isDim
      onClose
      dimClick
      className={s.modal}
    >
      <div className={s.content}>
        <div className={s.header}>
          <div className={s.imageWrap}>
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={activePokemon.nameKo}
                width={96}
                height={96}
                className={s.image}
              />
            ) : null}
          </div>
          <div className={s.headerMeta}>
            <p className={s.number}>#{activePokemon.number}</p>
            <h2 className={s.name}>{activePokemon.nameKo}</h2>
            <div className={s.types}>
              {ensureStringArray(activePokemon.types).map((type) => (
                <span
                  key={type}
                  className={s.typeBadge}
                  style={{ background: TYPE_COLOR[type] ?? '#999' }}
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>

        <section>
          <h3 className={s.sectionTitle}>종족값</h3>
          <div className={s.statGrid}>
            {BASE_STAT_KEYS.map((key) => (
              <React.Fragment key={key}>
                <span className={s.statLabel}>{BASE_STAT_LABEL[key]}</span>
                <span className={s.statValue}>{activePokemon[key]}</span>
                <div className={s.statBarTrack}>
                  <div
                    className={s.statBarFill}
                    style={{
                      width: `${(activePokemon[key] / BASE_STAT_MAX) * 100}%`,
                      background: STAT_BAR_COLORS[key],
                    }}
                  />
                </div>
              </React.Fragment>
            ))}
          </div>
          <div className={s.statTotalRow}>
            <span>합계</span>
            <strong>{activePokemon.total}</strong>
          </div>
        </section>

        {showEvolutionNav ? (
          <section className={s.evolutionSection}>
            <div className={s.evolutionRow}>
              <div className={s.evolutionSidePrev}>
                {prevEvolutionTargets.map(({ nameKo, pokemon: target }) => (
                  <button
                    key={`prev-${nameKo}`}
                    type="button"
                    className={s.evolutionBtn}
                    disabled={!target}
                    onClick={() => handleEvolutionSelect(target)}
                  >
                    <span className={s.evolutionArrow} aria-hidden>
                      &lt;
                    </span>
                    <span className={s.evolutionLabel}>진화전</span>
                    <span className={s.evolutionName}>{nameKo}</span>
                  </button>
                ))}
              </div>
              <div className={s.evolutionSideNext}>
                {nextEvolutionTargets.map(({ nameKo, pokemon: target }) => (
                  <button
                    key={`next-${nameKo}`}
                    type="button"
                    className={`${s.evolutionBtn} ${s.evolutionBtnNext}`}
                    disabled={!target}
                    onClick={() => handleEvolutionSelect(target)}
                  >
                    <span className={s.evolutionName}>{nameKo}</span>
                    <span className={s.evolutionLabel}>진화후</span>
                    <span className={s.evolutionArrow} aria-hidden>
                      &gt;
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section>
          <h3 className={s.sectionTitle}>특성</h3>
          {regularAbilities.length === 0 && hiddenAbilities.length === 0 ? (
            <p className={s.statusText}>특성 정보 없음</p>
          ) : (
            <ul className={s.abilityList}>
              {regularAbilities.map((name) => (
                <li key={`ability-${name}`} className={s.abilityItem}>
                  <span className={s.abilityName}>{name}</span>
                  <p className={s.abilitySummary}>
                    {getAbilitySummary(name) ?? '설명 없음'}
                  </p>
                </li>
              ))}
              {hiddenAbilities.map((name) => (
                <li
                  key={`s-ability-${name}`}
                  className={`${s.abilityItem} ${s.abilityHidden}`}
                >
                  <span className={s.abilityName}>{name}</span>
                  <p className={s.abilitySummary}>
                    {getAbilitySummary(name) ?? '설명 없음'}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className={s.skillSection}>
          <h3 className={s.sectionTitle}>배울 수 있는 기술 <p>항목 클릭시 기술 페이지로 이동되며 배울수있는 포켓몬이 검색됩니다.</p></h3>
          {movesLoading ? (
            <p className={s.statusText}>기술 목록 불러오는 중…</p>
          ) : movesError ? (
            <p className={s.errorText}>{movesError}</p>
          ) : moves.length === 0 ? (
            <p className={s.statusText}>배울 수 있는 기술이 없습니다.</p>
          ) : (
            <ul className={s.moveList}>
              {moves.map((move) => {
                const typeKo = getMoveTypeKo(move.type);
                return (
                  <li
                    key={move.id}
                    className={s.moveItem}
                    role="button"
                    tabIndex={0}
                    onClick={() => handleMoveSelect(move)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        handleMoveSelect(move);
                      }
                    }}
                  >
                    <span className={s.moveName}>{move.koreanName}</span>
                    <span className={s.moveStats}>{getMoveStatsTitle(move)}</span>
                    <span
                      className={s.moveTypeBadge}
                      style={{ background: TYPE_COLOR[typeKo] ?? '#999' }}
                    >
                      {typeKo}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </ModalFrame>
  );
};

export default SelectPokeModal;
