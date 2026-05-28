'use client';

import React, { useMemo } from 'react';

import {
  Type,
  typeChart,
  typeColor,
  typeTranslation,
} from '@/constants/pokemonType';

import s from './typeTable.module.scss';

const TEAM_SIZE = 6;
const ATTACK_TYPES = Object.keys(typeChart) as Type[];

const KOREAN_TO_ENGLISH: Record<string, Type> = Object.fromEntries(
  Object.entries(typeTranslation).map(([en, ko]) => [ko, en as Type]),
);

export type TypeTablePokemon = {
  name: string;
  types: string[];
};

type TypeTableProps = {
  pokemons: (TypeTablePokemon | null)[];
};

function toEnglishTypes(koreanTypes: string[]): Type[] {
  return koreanTypes
    .map((t) => KOREAN_TO_ENGLISH[t])
    .filter((t): t is Type => Boolean(t && t in typeChart));
}

function getDamageMultiplier(
  attackType: Type,
  defenderTypes: Type[],
): number {
  if (defenderTypes.length === 0) return 1;

  return defenderTypes.reduce(
    (acc, defender) => acc * (typeChart[defender][attackType] ?? 1),
    1,
  );
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

const TypeTable = ({ pokemons }: TypeTableProps) => {
  const slots = useMemo(() => {
    const normalized = [...pokemons];
    while (normalized.length < TEAM_SIZE) normalized.push(null);
    return normalized.slice(0, TEAM_SIZE);
  }, [pokemons]);

  const matrix = useMemo(
    () =>
      ATTACK_TYPES.map((attackType) => {
        const attackLabel = typeTranslation[attackType];
        const cells = slots.map((pokemon, slotIndex) => {
          if (!pokemon) {
            return { slotIndex, multiplier: 1, empty: true as const };
          }

          const defenderTypes = toEnglishTypes(pokemon.types);
          const multiplier = getDamageMultiplier(attackType, defenderTypes);

          return {
            slotIndex,
            multiplier,
            empty: false as const,
          };
        });

        const weaknessCount = cells.filter(
          (cell) => !cell.empty && cell.multiplier >= 2,
        ).length;
        const strengthCount = cells.filter(
          (cell) =>
            !cell.empty &&
            (cell.multiplier === 0 || cell.multiplier === 0.5),
        ).length;

        return {
          attackType,
          attackLabel,
          cells,
          weaknessCount,
          strengthCount,
        };
      }),
    [slots],
  );

  const teamSummary = useMemo(() => {
    const weaknesses: string[] = [];
    const strengths: string[] = [];

    for (const row of matrix) {
      const activeCells = row.cells.filter((cell) => !cell.empty);
      if (activeCells.length === 0) continue;

      const maxMultiplier = Math.max(...activeCells.map((cell) => cell.multiplier));
      const minMultiplier = Math.min(...activeCells.map((cell) => cell.multiplier));

      if (maxMultiplier >= 2) {
        weaknesses.push(
          `${formatSummaryMultiplier(maxMultiplier)} ${row.attackLabel}`,
        );
      }

      if (minMultiplier <= 0.5) {
        strengths.push(
          `${formatSummaryMultiplier(minMultiplier)} ${row.attackLabel}`,
        );
      }
    }

    return { weaknesses, strengths };
  }, [matrix]);

  const hasPokemon = slots.some(Boolean);
  const summaryText = hasPokemon
    ? [
        teamSummary.weaknesses.length > 0
          ? `약점 : ${teamSummary.weaknesses.join(', ')}`
          : '약점 : 없음',
        teamSummary.strengths.length > 0
          ? `강점 : ${teamSummary.strengths.join(', ')}`
          : '강점 : 없음',
      ].join(' / ')
    : '';

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
            <th className={s.corner}>타입</th>
            {slots.map((pokemon, slotIndex) => (
              <th
                key={slotIndex}
                className={s.pokemonHead}
                title={pokemon?.name}
              >
                {pokemon?.name ?? ''}
              </th>
            ))}
            <th className={s.summaryHead}>총 약점수</th>
            <th className={s.summaryHead}>총 강점 수</th>
          </tr>
        </thead>
        <tbody>
          {matrix.map((row) => (
            <tr key={row.attackType}>
              <th
                className={s.typeHead}
                style={{ background: typeColor[row.attackLabel] }}
              >
                {row.attackLabel}
              </th>
              {row.cells.map((cell) => {
                if (cell.empty) {
                  return (
                    <td key={cell.slotIndex} className={s.emptyCell} />
                  );
                }

                const text = formatMultiplier(cell.multiplier);
                const cellClass =
                  cell.multiplier >= 2
                    ? s.weak
                    : cell.multiplier === 0 || cell.multiplier === 0.5
                      ? s.resist
                      : s.neutral;

                return (
                  <td key={cell.slotIndex} className={cellClass}>
                    {text}
                  </td>
                );
              })}
              <td className={s.summaryCell}>{row.weaknessCount}</td>
              <td className={s.summaryCell}>{row.strengthCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {summaryText && <p className={s.summaryText}>{summaryText}</p>}
    </div>
  );
};

export default TypeTable;
