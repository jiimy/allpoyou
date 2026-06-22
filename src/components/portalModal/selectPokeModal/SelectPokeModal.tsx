'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import ModalFrame from '@/components/portalModal/ModalFrame';
import { TYPE_COLOR } from '@/constants/pokemonTypeColor';
import type { Pokemon } from '@/store/PokemonStore';
import type { MoveDbEntry } from '@/types/move';
import { getAbilitySummary } from '@/utils/abilitySearch';
import { getMoveTypeKo } from '@/utils/moveDisplay';
import { getMovesByIds } from '@/utils/movesDb';
import { MOVES_BY_ID } from '@/utils/movesIndex';
import { getPokemonStaticImage } from '@/utils/pokemonDisplay';
import { ensureStringArray } from '@/utils/pokemonNormalize';
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

const SelectPokeModal = ({ pokemon, setOnModal }: SelectPokeModalProps) => {
  const [moves, setMoves] = useState<MoveDbEntry[]>([]);
  const [movesLoading, setMovesLoading] = useState(true);
  const [movesError, setMovesError] = useState<string | null>(null);

  const imageUrl = getPokemonStaticImage(pokemon.images);
  const regularAbilities = ensureStringArray(pokemon.ability);
  const hiddenAbilities = ensureStringArray(pokemon.s_ability);

  useEffect(() => {
    let cancelled = false;
    setMovesLoading(true);
    setMovesError(null);
    setMoves([]);

    const params = new URLSearchParams({
      pokemonId: String(pokemon.id),
      nameKo: pokemon.nameKo,
    });

    fetch(`/api/moves?${params.toString()}`, { cache: 'no-store' })
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
  }, [pokemon.id, pokemon.nameKo]);

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
                alt={pokemon.nameKo}
                width={96}
                height={96}
                className={s.image}
              />
            ) : null}
          </div>
          <div className={s.headerMeta}>
            <p className={s.number}>#{pokemon.number}</p>
            <h2 className={s.name}>{pokemon.nameKo}</h2>
            <div className={s.types}>
              {ensureStringArray(pokemon.types).map((type) => (
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
                <span className={s.statValue}>{pokemon[key]}</span>
                <div className={s.statBarTrack}>
                  <div
                    className={s.statBarFill}
                    style={{
                      width: `${(pokemon[key] / BASE_STAT_MAX) * 100}%`,
                      background: STAT_BAR_COLORS[key],
                    }}
                  />
                </div>
              </React.Fragment>
            ))}
          </div>
          <div className={s.statTotalRow}>
            <span>합계</span>
            <strong>{pokemon.total}</strong>
          </div>
        </section>

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

        <section>
          <h3 className={s.sectionTitle}>배울 수 있는 기술</h3>
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
                  <li key={move.id} className={s.moveItem}>
                    <span className={s.moveName}>{move.koreanName}</span>
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
