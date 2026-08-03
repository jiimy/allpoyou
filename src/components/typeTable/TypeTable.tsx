'use client';

import React, { useMemo } from 'react';

import {
  Type,
  typeChart,
  typeColor,
  typeTranslation,
  isTypeTableStrengthMultiplier,
} from '@/constants/pokemonType';
import classnames from 'classnames';

import s from './typeTable.module.scss';

const TEAM_SIZE = 6;
const ALL_TYPES = Object.keys(typeChart) as Type[];

const KOREAN_TO_ENGLISH: Record<string, Type> = Object.fromEntries(
  Object.entries(typeTranslation).map(([en, ko]) => [ko, en as Type]),
);

export type TypeTablePokemon = {
  name: string;
  types: string[];
};

/** defense = 맞을 때, attack = 공격할 때 */
export type TypeTableMode = 'defense' | 'attack';

type TypeTableProps = {
  pokemons: (TypeTablePokemon | null)[];
  mode?: TypeTableMode;
};

type AttackHit = {
  typeKo: string;
  multiplier: number;
};

type DefenseCell = {
  slotIndex: number;
  empty: false;
  kind: 'defense';
  multiplier: number;
};

type AttackCell = {
  slotIndex: number;
  empty: false;
  kind: 'attack';
  hits: AttackHit[];
};

type EmptyCell = {
  slotIndex: number;
  empty: true;
};

type TableCell = DefenseCell | AttackCell | EmptyCell;

function toEnglishTypes(koreanTypes: string[]): Type[] {
  return koreanTypes
    .map((t) => KOREAN_TO_ENGLISH[t])
    .filter((t): t is Type => Boolean(t && t in typeChart));
}

/** 맞을 때: attackType 기술이 defenderTypes 포켓몬에게 들어가는 배율 */
function getDefenseMultiplier(
  attackType: Type,
  defenderTypes: Type[],
): number {
  if (defenderTypes.length === 0) return 1;

  return defenderTypes.reduce(
    (acc, defender) => acc * (typeChart[defender][attackType] ?? 1),
    1,
  );
}

/** 공격할 때: 각 자속 타입별 배율 (1배는 제외) */
function getAttackHits(
  attackerTypes: Type[],
  defenderType: Type,
): AttackHit[] {
  return attackerTypes
    .map((atk) => ({
      typeKo: typeTranslation[atk],
      multiplier: typeChart[defenderType][atk] ?? 1,
    }))
    .filter((hit) => hit.multiplier !== 1);
}

function formatMultiplier(value: number): string {
  if (value === 1) return '';
  if (value === 0.5) return '0.5';
  return String(value);
}

function formatSummaryMultiplier(value: number): string {
  if (value === 0) return '0배';
  if (value === 0.5) return '0.5배';
  return `${value}배`;
}

function formatAttackHit(hit: AttackHit): string {
  return `${hit.typeKo} ${formatMultiplier(hit.multiplier)}`;
}

function attackHitClass(multiplier: number): string {
  if (multiplier >= 2) return s.hitSe;
  if (multiplier === 0) return s.hitImmune;
  if (multiplier === 0.5) return s.hitNve;
  return s.hitNeutral;
}

const TypeTable = ({ pokemons, mode = 'defense' }: TypeTableProps) => {
  const slots = useMemo(() => {
    const normalized = [...pokemons];
    while (normalized.length < TEAM_SIZE) normalized.push(null);
    return normalized.slice(0, TEAM_SIZE);
  }, [pokemons]);

  const matrix = useMemo(
    () =>
      ALL_TYPES.map((rowType) => {
        const rowLabel = typeTranslation[rowType];
        const cells: TableCell[] = slots.map((pokemon, slotIndex) => {
          if (!pokemon) {
            return { slotIndex, empty: true as const };
          }

          const pokemonTypes = toEnglishTypes(pokemon.types);

          if (mode === 'defense') {
            return {
              slotIndex,
              empty: false as const,
              kind: 'defense' as const,
              multiplier: getDefenseMultiplier(rowType, pokemonTypes),
            };
          }

          return {
            slotIndex,
            empty: false as const,
            kind: 'attack' as const,
            hits: getAttackHits(pokemonTypes, rowType),
          };
        });

        let weaknessCount = 0;
        let strengthCount = 0;

        if (mode === 'defense') {
          for (const cell of cells) {
            if (cell.empty || cell.kind !== 'defense') continue;
            if (cell.multiplier >= 2) weaknessCount += 1;
            if (isTypeTableStrengthMultiplier(cell.multiplier)) {
              strengthCount += 1;
            }
          }
        } else {
          for (const cell of cells) {
            if (cell.empty || cell.kind !== 'attack') continue;
            const hasSe = cell.hits.some((h) => h.multiplier >= 2);
            const hasResist = cell.hits.some((h) =>
              isTypeTableStrengthMultiplier(h.multiplier),
            );
            if (hasResist) weaknessCount += 1;
            if (hasSe) strengthCount += 1;
          }
        }

        return {
          rowType,
          rowLabel,
          cells,
          weaknessCount,
          strengthCount,
        };
      }),
    [slots, mode],
  );

  const defenseSummary = useMemo(() => {
    if (mode !== 'defense') {
      return { weaknesses: [] as string[], strengths: [] as string[] };
    }

    const weaknesses: string[] = [];
    const strengths: string[] = [];

    for (const row of matrix) {
      const activeCells = row.cells.filter(
        (cell): cell is DefenseCell =>
          !cell.empty && cell.kind === 'defense',
      );
      if (activeCells.length === 0) continue;

      const multipliers = activeCells.map((cell) => cell.multiplier);
      const maxMultiplier = Math.max(...multipliers);

      if (maxMultiplier >= 2) {
        weaknesses.push(
          `${formatSummaryMultiplier(maxMultiplier)} ${row.rowLabel}`,
        );
      }

      const hasStrength = activeCells.some((cell) =>
        isTypeTableStrengthMultiplier(cell.multiplier),
      );
      if (hasStrength) {
        const strengthMult = Math.min(
          ...multipliers.filter((m) => isTypeTableStrengthMultiplier(m)),
        );
        strengths.push(
          `${formatSummaryMultiplier(strengthMult)} ${row.rowLabel}`,
        );
      }
    }

    return { weaknesses, strengths };
  }, [matrix, mode]);

  const hasPokemon = slots.some(Boolean);

  const weaknessHead =
    mode === 'defense' ? '총 약점수' : '총 별로·없음';
  const strengthHead =
    mode === 'defense' ? '총 강점 수' : '총 굉장함';
  const cornerLabel = mode === 'defense' ? '공격↓' : '방어↓';

  return (
    <div className={s.wrap}>
      <table className={s.table}>
        <colgroup>
          <col className={s.typeCol} />
          {Array.from({ length: TEAM_SIZE }).map((_, index) => (
            <col key={index} className={s.pokemonCol} />
          ))}
          <col className={s.summaryCol} />
          <col className={s.summaryCol} />
        </colgroup>
        <thead>
          <tr>
            <th className={s.corner}>{cornerLabel}</th>
            {slots.map((pokemon, slotIndex) => (
              <th
                key={slotIndex}
                className={s.pokemonHead}
                title={pokemon?.name}
              >
                {pokemon?.name ?? ''}
              </th>
            ))}
            <th className={s.summaryHead}>{weaknessHead}</th>
            <th className={s.summaryHead}>{strengthHead}</th>
          </tr>
        </thead>
        <tbody>
          {matrix.map((row) => (
            <tr key={row.rowType}>
              <th
                className={s.typeHead}
                style={{ background: typeColor[row.rowLabel] }}
              >
                {row.rowLabel}
              </th>
              {row.cells.map((cell) => {
                if (cell.empty) {
                  return (
                    <td key={cell.slotIndex} className={s.emptyCell} />
                  );
                }

                if (cell.kind === 'defense') {
                  const text = formatMultiplier(cell.multiplier);
                  const cellClass =
                    cell.multiplier >= 2
                      ? s.weak
                      : isTypeTableStrengthMultiplier(cell.multiplier)
                        ? s.resist
                        : s.neutral;

                  return (
                    <td key={cell.slotIndex} className={cellClass}>
                      {text}
                    </td>
                  );
                }

                if (cell.hits.length === 0) {
                  return (
                    <td
                      key={cell.slotIndex}
                      className={classnames(s.neutral, s.attackCell)}
                    />
                  );
                }

                return (
                  <td
                    key={cell.slotIndex}
                    className={classnames(s.attackCell, s.attackCellFilled)}
                  >
                    {cell.hits.map((hit) => (
                      <span
                        key={`${hit.typeKo}-${hit.multiplier}`}
                        className={classnames(
                          s.attackHit,
                          attackHitClass(hit.multiplier),
                        )}
                      >
                        {formatAttackHit(hit)}
                      </span>
                    ))}
                  </td>
                );
              })}
              <td className={s.summaryCell}>{row.weaknessCount}</td>
              <td className={s.summaryCell}>{row.strengthCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {mode === 'defense' && hasPokemon && (
        <>
          <p className={classnames(s.summaryText, s.weakness)}>
            {defenseSummary.weaknesses.length > 0
              ? `약점 : ${defenseSummary.weaknesses.join(', ')}`
              : '약점 : 없음'}
          </p>
          <p className={classnames(s.summaryText, s.strength)}>
            {defenseSummary.strengths.length > 0
              ? `강점 : ${defenseSummary.strengths.join(', ')}`
              : '강점 : 없음'}
          </p>
        </>
      )}

    </div>
  );
};

export default TypeTable;
