'use client';

import ModalFrame from '@/components/portalModal/ModalFrame';
import TypeCalcModal from '@/components/portalModal/typeCalcModal/TypeCalcModal';
import { TYPE_COLOR } from '@/constants/pokemonTypeColor';
import { typeTranslation } from '@/constants/pokemonType';
import type { Pokemon } from '@/store/PokemonStore';
import { useTypeCalcStore, type TypeCalcMode } from '@/store/TypeCalcStore';
import { GiCheckedShield, GiCrossedSwords } from "react-icons/gi";
import {
  fetchPokemonList,
  getCachedPokemonList,
  getPokemonByNameKo,
} from '@/store/PokemonStore';
import type { MoveDbEntry } from '@/types/move';
import { getAbilitySummary } from '@/utils/abilitySearch';
import { getLearnableMovesFromLocalFiles } from '@/utils/localPokemonMoves';
import { getMoveStatsTitle, getMoveTypeKo } from '@/utils/moveDisplay';
import { ALL_MOVES } from '@/utils/movesIndex';
import {
  filterMovesByPochampsNames,
  resolvePochampsStorageSlug,
} from '@/utils/pochampsMoves';
import {
  BASE_STAT_KEYS,
  BASE_STAT_LABEL,
  BASE_STAT_MAX,
} from '@/utils/pokemonBaseStats';
import { getPokemonStaticImage } from '@/utils/pokemonDisplay';
import { ensureStringArray } from '@/utils/pokemonNormalize';
import { usePochampsStore } from '@/store/PochampsStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import s from './selectPokeModal.module.scss';


const STAT_BAR_COLORS: Record<(typeof BASE_STAT_KEYS)[number], string> = {
  H: '#e02e2f',
  A: '#f67f08',
  B: '#efb906',
  C: '#419c2c',
  D: '#2c7de5',
  S: '#e771e7',
};

/** 한글 타입명 → 타입 계산기 스토어가 사용하는 영문 타입 키 */
const KO_TO_EN_TYPE: Record<string, string> = Object.fromEntries(
  Object.entries(typeTranslation).map(([en, ko]) => [ko, en]),
);

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

/** 로컬 JSON 누락 시에만 PokeAPI로 보강 */
async function fetchLearnsetFromPokeApi(
  englishName: string,
): Promise<MoveDbEntry[]> {
  const slug = englishName.trim().toLowerCase();
  if (!slug) return [];

  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(slug)}`,
  );
  if (!res.ok) return [];

  const data = (await res.json()) as {
    moves?: { move: { name: string } }[];
  };
  const keys = new Set(
    (data.moves ?? []).map((entry) => entry.move.name.toLowerCase()),
  );
  if (keys.size === 0) return [];

  return ALL_MOVES.filter((move) =>
    keys.has(move.englishName.toLowerCase()),
  ).sort((a, b) => a.id - b.id);
}

const SelectPokeModal = ({ pokemon, setOnModal }: SelectPokeModalProps) => {
  const router = useRouter();
  const [activePokemon, setActivePokemon] = useState(pokemon);
  const [prevPokemonProp, setPrevPokemonProp] = useState(pokemon);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>(() =>
    getCachedPokemonList(),
  );
  const pokemonListRef = React.useRef(pokemonList);
  const [moves, setMoves] = useState<MoveDbEntry[]>([]);
  const [movesLoading, setMovesLoading] = useState(true);
  const [movesError, setMovesError] = useState<string | null>(null);
  const [typeCalcOpen, setTypeCalcOpen] = useState(false);
  const [prevMovesPokemonKey, setPrevMovesPokemonKey] = useState<string | null>(
    null,
  );

  const setTypeCalcMode = useTypeCalcStore((state) => state.setMode);
  const setAttackSelected = useTypeCalcStore((state) => state.setAttackSelected);
  const setDefenseSelected = useTypeCalcStore((state) => state.setDefenseSelected);
  const pochampsEnabled = usePochampsStore((state) => state.enabled);
  const pochampsHydrated = usePochampsStore((state) => state.hasHydrated);
  const pochampsActive = pochampsHydrated && pochampsEnabled;

  const movesPokemonKey = `${activePokemon.id}:${activePokemon.nameKo}:${pochampsActive}`;

  if (prevPokemonProp !== pokemon) {
    setPrevPokemonProp(pokemon);
    setActivePokemon(enrichPokemon(pokemon, pokemonList));
    setMovesLoading(true);
    setMovesError(null);
  }

  if (prevMovesPokemonKey !== movesPokemonKey) {
    setPrevMovesPokemonKey(movesPokemonKey);
    if (prevMovesPokemonKey !== null) {
      setMovesLoading(true);
      setMovesError(null);
    }
  }

  useEffect(() => {
    pokemonListRef.current = pokemonList;
  }, [pokemonList]);

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

  const isMegaEvolution =
    activePokemon.name.includes('-mega') ||
    activePokemon.nameKo.startsWith('메가 ');

  // 메가 진화일 경우, 진화전은 이 포켓몬을 nextEvolutions로 가진 기본형(비-메가)으로 표시한다.
  const megaBaseName = isMegaEvolution
    ? pokemonList.find((entry) =>
        ensureStringArray(entry.nextEvolutions).includes(activePokemon.nameKo),
      )?.nameKo ?? null
    : null;

  const prevEvolutionNames = megaBaseName
    ? [megaBaseName]
    : ensureStringArray(activePokemon.prevEvolutions);
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

  const handleAbilitySelect = useCallback(
    (name: string) => {
      router.push(`/abilities?q=${encodeURIComponent(name)}`);
    },
    [router],
  );

  const handleOpenTypeCalc = useCallback(
    (mode: TypeCalcMode) => {
      const englishTypes = ensureStringArray(activePokemon.types)
        .map((ko) => KO_TO_EN_TYPE[ko])
        .filter((type): type is string => Boolean(type));

      setTypeCalcMode(mode);
      if (mode === 'attack') {
        setAttackSelected(englishTypes);
      } else {
        setDefenseSelected(englishTypes);
      }
      setTypeCalcOpen(true);
    },
    [activePokemon.types, setTypeCalcMode, setAttackSelected, setDefenseSelected],
  );

  const imageUrl = getPokemonStaticImage(activePokemon.images);
  const regularAbilities = ensureStringArray(activePokemon.ability);
  const hiddenAbilities = ensureStringArray(activePokemon.s_ability);
  const showEvolutionNav =
    prevEvolutionNames.length > 0 || nextEvolutionNames.length > 0;

  useEffect(() => {
    let cancelled = false;

    const loadMoves = async () => {
      if (pochampsActive) {
        const slug = resolvePochampsStorageSlug(activePokemon.name);
        const res = await fetch(
          `/api/pokemon-meta/pokemon-moves?slug=${encodeURIComponent(slug)}`,
          { cache: 'no-store' },
        );
        const body = (await res.json()) as {
          names?: string[];
          error?: string;
        };
        if (!res.ok) {
          throw new Error(body.error ?? `조회 실패 (${res.status})`);
        }
        if (cancelled) return;
        setMoves(filterMovesByPochampsNames(ALL_MOVES, body.names ?? []));
        return;
      }

      // OFF: 로컬 JSON 우선 (pokemon-with-moves + moves-db), 없으면 PokeAPI
      const localMoves = await getLearnableMovesFromLocalFiles({
        id: activePokemon.id,
        number: activePokemon.number,
        nameKo: activePokemon.nameKo,
      });
      if (cancelled) return;

      if (localMoves.length > 0) {
        setMoves(localMoves);
        return;
      }

      const pokeApiMoves = await fetchLearnsetFromPokeApi(activePokemon.name);
      if (cancelled) return;
      if (pokeApiMoves.length === 0) {
        throw new Error('배울 수 있는 기술을 찾지 못했습니다.');
      }
      setMoves(pokeApiMoves);
    };

    loadMoves()
      .catch((err: unknown) => {
        if (cancelled) return;
        setMoves([]);
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
  }, [
    activePokemon.id,
    activePokemon.name,
    activePokemon.nameKo,
    activePokemon.number,
    pochampsActive,
  ]);

  return (
    <>
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
            <span className={s.typeCalc}>
              <button
                type="button"
                className={`${s.typeCalcBtn} ${s.typeCalcAttack}`}
                onClick={() => handleOpenTypeCalc('attack')}
                title="공격 상성 계산"
                aria-label="공격 상성 계산"
              >
                <GiCrossedSwords />
              </button>
              <button
                type="button"
                className={`${s.typeCalcBtn} ${s.typeCalcDefense}`}
                onClick={() => handleOpenTypeCalc('defense')}
                title="방어 상성 계산"
                aria-label="방어 상성 계산"
              >
                <GiCheckedShield />
              </button>
            </span>
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
          <h3 className={s.sectionTitle}>특성 <p>항목 클릭시 특성 페이지로 이동됩니다.</p></h3>
          {regularAbilities.length === 0 && hiddenAbilities.length === 0 ? (
            <p className={s.statusText}>특성 정보 없음</p>
          ) : (
            <ul className={s.abilityList}>
              {regularAbilities.map((name) => (
                <li
                  key={`ability-${name}`}
                  className={s.abilityItem}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleAbilitySelect(name)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      handleAbilitySelect(name);
                    }
                  }}
                >
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
                  role="button"
                  tabIndex={0}
                  onClick={() => handleAbilitySelect(name)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      handleAbilitySelect(name);
                    }
                  }}
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
          <h3 className={s.sectionTitle}>
            배울 수 있는 기술
            {pochampsActive ? ' · 포챔스' : ''}{' '}
            <p>항목 클릭시 기술 페이지로 이동합니다.</p>
          </h3>
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
    {typeCalcOpen ? (
      <TypeCalcModal setOnModal={setTypeCalcOpen} dimClick />
    ) : null}
    </>
  );
};

export default SelectPokeModal;
