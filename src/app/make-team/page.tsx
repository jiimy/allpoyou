'use client';

import React, {
  useCallback,
  useMemo,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import {
  formatCounterProduct,
  getRecommendedCounterDetails,
} from '@/hooks/useType';
import type { Pokemon } from '@/store/PokemonStore';
import { PokemonSpriteImage } from '@/components/PokemonSpriteImage';
import { hasPokemonImage } from '@/utils/pokemonDisplay';
import { ensureStringArray } from '@/utils/pokemonNormalize';
import { isMegaDisplayName } from '@/utils/pokemonName';
import Team from '@/components/team/Team';
import { useTeamEditor } from '@/hooks/useTeamEditor';
import { TEAM_SLOT_COUNT } from '@/store/PokemonTeamStore';
import s from './maekTeam.module.scss';
import { TYPE_COLOR } from '@/constants/pokemonTypeColor';

const STAT_FIELD_KEYS = ['H', 'A', 'B', 'C', 'D', 'S', 'total'] as const;
const STAT_HIGHLIGHT_KEYS = ['H', 'A', 'B', 'C', 'D', 'S'] as const;
const STAT_KEYS = ['HP', '공격', '방어', '특공', '특방', '스피드', '총합'] as const;
type StatFieldKey = (typeof STAT_FIELD_KEYS)[number];
type StatHighlightKey = (typeof STAT_HIGHLIGHT_KEYS)[number];
type TableSortKey = StatFieldKey | 'name' | 'types';

function getRowMaxStatKeys(p: Pokemon): Set<StatHighlightKey> {
  let max = -Infinity;
  for (const key of STAT_HIGHLIGHT_KEYS) {
    const v = p[key];
    if (typeof v === 'number' && v > max) max = v;
  }
  if (max === -Infinity) return new Set();

  const keys = new Set<StatHighlightKey>();
  for (const key of STAT_HIGHLIGHT_KEYS) {
    if (p[key] === max) keys.add(key);
  }
  return keys;
}

const statThStyle: React.CSSProperties = {
  padding: '6px 8px',
  borderBottom: '1px solid #eee',
  textAlign: 'center',
  fontSize: 11,
  color: '#555',
  fontWeight: 600,
  whiteSpace: 'nowrap',
};

const statTdStyle: React.CSSProperties = {
  padding: '4px 8px',
  borderBottom: '1px solid #f5f5f5',
  textAlign: 'center',
  whiteSpace: 'nowrap',
};

type SortDirection = 'asc' | 'desc';

const PREVIEW_CURSOR_OFFSET = 14;
const PREVIEW_IMAGE_SIZE = 120;

type PokemonImagePreviewState = {
  images: string[];
  name: string;
  x: number;
  y: number;
} | null;

function PokemonImageCursorPreview({
  preview,
}: {
  preview: PokemonImagePreviewState;
}) {
  if (!preview || typeof document === 'undefined') return null;

  return createPortal(
    <div
      className={s.pokemonImagePreview}
      style={{
        left: preview.x + PREVIEW_CURSOR_OFFSET,
        top: preview.y + PREVIEW_CURSOR_OFFSET,
      }}
      role="tooltip"
      aria-hidden
    >
      <PokemonSpriteImage
        images={preview.images}
        alt=""
        width={PREVIEW_IMAGE_SIZE}
        height={PREVIEW_IMAGE_SIZE}
      />
      <span className={s.pokemonImagePreviewName}>{preview.name}</span>
    </div>,
    document.body,
  );
}

const MatchingPokemonsTable: React.FC<{
  pokemons: Pokemon[];
  onSelectPokemon?: (pokemon: Pokemon) => void;
}> = ({ pokemons, onSelectPokemon }) => {
  const [sortKey, setSortKey] = useState<TableSortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection | null>(null);
  const [imagePreview, setImagePreview] =
    useState<PokemonImagePreviewState>(null);

  const showImagePreview = useCallback((pokemon: Pokemon, e: React.MouseEvent) => {
    if (!hasPokemonImage(pokemon.images)) return;
    setImagePreview({
      images: pokemon.images,
      name: pokemon.nameKo,
      x: e.clientX,
      y: e.clientY,
    });
  }, []);

  const moveImagePreview = useCallback((e: React.MouseEvent) => {
    setImagePreview((prev) =>
      prev ? { ...prev, x: e.clientX, y: e.clientY } : null,
    );
  }, []);

  const hideImagePreview = useCallback(() => setImagePreview(null), []);

  // 클릭 시: 다른 컬럼이면 desc부터, 같으면 desc → asc → 해제 순환
  const handleSort = (key: TableSortKey) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir('desc');
      return;
    }
    if (sortDir === 'desc') {
      setSortDir('asc');
    } else if (sortDir === 'asc') {
      setSortKey(null);
      setSortDir(null);
    } else {
      setSortDir('desc');
    }
  };

  const sorted = useMemo(() => {
    if (!sortKey || !sortDir) return pokemons;
    const dirMult = sortDir === 'asc' ? 1 : -1;
    return [...pokemons].sort((a, b) => {
      if (sortKey === 'name') {
        return a.nameKo.localeCompare(b.nameKo, 'ko') * dirMult;
      }
      if (sortKey === 'types') {
        const at = [...ensureStringArray(a.types)]
          .sort((x, y) => x.localeCompare(y, 'ko'))
          .join(',');
        const bt = [...ensureStringArray(b.types)]
          .sort((x, y) => x.localeCompare(y, 'ko'))
          .join(',');
        return at.localeCompare(bt, 'ko') * dirMult;
      }
      const statKey = sortKey as StatFieldKey;
      const av = a[statKey];
      const bv = b[statKey];
      const an = typeof av === 'number' ? av : -Infinity;
      const bn = typeof bv === 'number' ? bv : -Infinity;
      return (an - bn) * dirMult;
    });
  }, [pokemons, sortKey, sortDir]);

  return (
    <>
      <div
        style={{
          maxHeight: 260,
          overflowY: 'auto',
          border: '1px solid #f0f0f0',
          borderRadius: 4,
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: 12,
          }}
        >
          <thead
            style={{
              position: 'sticky',
              top: 0,
              background: '#fafafa',
            }}
          >
            <tr>
              <th style={statThStyle}>#</th>
              <th
                onClick={() => handleSort('name')}
                style={{
                  ...statThStyle,
                  textAlign: 'left',
                  cursor: 'pointer',
                  userSelect: 'none',
                  background: sortKey === 'name' ? '#eef5ff' : undefined,
                }}
                title="이름 정렬"
              >
                이름
                <span style={{ marginLeft: 2, color: '#888' }}>
                  {sortKey === 'name' ? (sortDir === 'asc' ? '▲' : '▼') : '⇅'}
                </span>
              </th>
              <th
                onClick={() => handleSort('types')}
                style={{
                  ...statThStyle,
                  textAlign: 'left',
                  cursor: 'pointer',
                  userSelect: 'none',
                  background: sortKey === 'types' ? '#eef5ff' : undefined,
                }}
                title="타입 정렬"
              >
                타입
                <span style={{ marginLeft: 2, color: '#888' }}>
                  {sortKey === 'types' ? (sortDir === 'asc' ? '▲' : '▼') : '⇅'}
                </span>
              </th>
              {STAT_FIELD_KEYS.map((fieldKey, i) => {
                const label = STAT_KEYS[i];
                const isActive = sortKey === fieldKey;
                return (
                  <th
                    key={fieldKey}
                    onClick={() => handleSort(fieldKey)}
                    style={{
                      ...statThStyle,
                      cursor: 'pointer',
                      userSelect: 'none',
                      background: isActive ? '#eef5ff' : undefined,
                    }}
                    title={`${label} 정렬`}
                  >
                    {label}
                    <span style={{ marginLeft: 2, color: '#888' }}>
                      {isActive ? (sortDir === 'asc' ? '▲' : '▼') : '⇅'}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {sorted.map((p) => {
              const rowMaxKeys = getRowMaxStatKeys(p);
              return (
                <tr
                  key={p.name}
                  className={s.resultRow}
                  onClick={() => onSelectPokemon?.(p)}
                >
                  <td style={{ ...statTdStyle, color: '#888' }}>#{p.number}</td>
                  <td
                    style={{ ...statTdStyle, textAlign: 'left' }}
                    onMouseEnter={(e) => showImagePreview(p, e)}
                    onMouseMove={moveImagePreview}
                    onMouseLeave={hideImagePreview}
                  >
                    <span
                      className={
                        hasPokemonImage(p.images) ? s.nameWithPreview : undefined
                      }
                    >
                      {p.nameKo}
                    </span>
                  </td>
                  <td style={{ ...statTdStyle, textAlign: 'left' }}>
                    <span style={{ display: 'inline-flex', gap: 4 }}>
                      {ensureStringArray(p.types).map((t) => (
                        <span
                          key={t}
                          style={{
                            background: TYPE_COLOR[t] ?? '#999',
                            color: '#fff',
                            padding: '1px 8px',
                            borderRadius: 10,
                            fontSize: 11,
                            fontWeight: 600,
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </span>
                  </td>
                  {STAT_FIELD_KEYS.map((fieldKey) => {
                    const v = p[fieldKey];
                    const isMax =
                      fieldKey !== 'total' && rowMaxKeys.has(fieldKey);
                    return (
                      <td
                        key={fieldKey}
                        style={{
                          ...statTdStyle,
                          color: isMax ? 'red' : undefined,
                          fontWeight: isMax ? 700 : 400,
                        }}
                      >
                        {typeof v === 'number' ? v : '-'}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <PokemonImageCursorPreview preview={imagePreview} />
    </>
  );
};

const TEAM_SIZE = TEAM_SLOT_COUNT;

const MakeTeam = () => {
  "use no memo";

  const {
    teamProps,
    pokemonListError,
    selectedPokemons,
    allPokemons,
    handleSelect,
  } = useTeamEditor();

  const [excludeSameTypes, setExcludeSameTypes] = useState(true);
  const [requireTwoRecTypes, setRequireTwoRecTypes] = useState<boolean[]>(() =>
    Array.from({ length: TEAM_SIZE }, () => true),
  );
  const [excludeMegaEvolution, setExcludeMegaEvolution] = useState<boolean[]>(
    () => Array.from({ length: TEAM_SIZE }, () => false),
  );

  const handleSelectFromRecommendation = (index: number, suggestion: Pokemon) => {
    handleSelect(index, suggestion);
  };

  /** 현재 입력(선택)된 포켓몬들의 타입 집합 */
  const getSelectedTeamTypes = useCallback(() => {
    const types = new Set<string>();
    for (const p of selectedPokemons) {
      if (!p) continue;
      for (const t of ensureStringArray(p.types)) types.add(t);
    }
    return types;
  }, [selectedPokemons]);

  // 선택된 슬롯 중 가장 뒤 인덱스 (추천 결과의 마지막 리스트)
  const lastSelectedIndex = useMemo(() => {
    let last = -1;
    selectedPokemons.forEach((p, i) => {
      if (p) last = i;
    });
    return last;
  }, [selectedPokemons]);

  const nextEmptyIndex = useMemo(
    () => selectedPokemons.findIndex((p) => p === null),
    [selectedPokemons],
  );

  const selectedPokemonIds = useMemo(() => {
    const ids = new Set<number>();
    for (const p of selectedPokemons) {
      if (p) ids.add(p.id);
    }
    return ids;
  }, [selectedPokemons]);

  return (
    <div>
      {pokemonListError ? (
        <p style={{ color: '#c00', fontSize: 13, marginBottom: 8 }}>
          {pokemonListError}
        </p>
      ) : null}
      <Team {...teamProps} />
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <h2 style={{ margin: 0 }}>추천 포켓몬</h2>
            <label
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 13,
                color: '#555',
                cursor: 'pointer',
                userSelect: 'none',
              }}
            >
              <input
                type="checkbox"
                checked={excludeSameTypes}
                onChange={(e) => setExcludeSameTypes(e.target.checked)}
              />
              선택한 포켓몬과 다른 타입만 보기
            </label>
          </div>
          <div>
            <div>1 2 3 4 5</div>
            <div>팀 이름</div>
          </div>
        </div>
        {selectedPokemons.every((p) => p === null) && (
          <p style={{ color: '#888', fontSize: 13 }}>
            포켓몬을 선택하면 약점을 보완하는 카운터 타입을 추천해드려요.
          </p>
        )}
        {selectedPokemons.map((pokemon, idx) => {
          if (!pokemon) return null;
          // 팀이 가득 찼을 때 마지막 슬롯 기준 '다음(7번째)' 추천 표만 숨김
          if (nextEmptyIndex === -1 && idx === lastSelectedIndex) return null;
          const counterResult = getRecommendedCounterDetails(
            ensureStringArray(pokemon.types),
          );
          const { weaknesses, counters } = counterResult;
          const teamTypes = excludeSameTypes ? getSelectedTeamTypes() : null;
          const visibleCounters = teamTypes
            ? counters.filter((c) => !teamTypes.has(c.type))
            : counters;
          if (visibleCounters.length === 0) return null;

          const recSet = new Set(visibleCounters.map((c) => c.type));
          const minRecTypeCount = requireTwoRecTypes[idx] ? 2 : 1;
          const matchingPokemons = allPokemons.filter((p) => {
            if (selectedPokemonIds.has(p.id)) return false;
            const matches = ensureStringArray(p.types).filter((t) =>
              recSet.has(t),
            );
            if (matches.length < minRecTypeCount) return false;
            if (excludeMegaEvolution[idx] && isMegaDisplayName(p.nameKo))
              return false;
            if (teamTypes) {
              const overlapsTeam = ensureStringArray(p.types).some((t) =>
                teamTypes.has(t),
              );
              if (overlapsTeam) return false;
            }
            return true;
          });

          return (
            <>
            {idx < 5 &&
            <div
              key={`${pokemon.name}-${idx}`}
              style={{
                marginTop: 12,
                padding: 12,
                border: '1px solid #eee',
                borderRadius: 6,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  flexWrap: 'wrap',
                }}
              >
                ( {`${idx + 2}`} 번째 포켓몬 선택)
                <strong>{pokemon.nameKo}</strong>
                <span style={{ display: 'inline-flex', gap: 4 }}>
                  {ensureStringArray(pokemon.types).map((t) => (
                    <span
                      key={t}
                      style={{
                        background: TYPE_COLOR[t] ?? '#999',
                        color: '#fff',
                        padding: '2px 10px',
                        borderRadius: 12,
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </span>
                <span style={{ color: '#888' }}>→</span>
                <span
                  style={{ display: 'inline-flex', gap: 4, flexWrap: 'wrap' }}
                >
                  {visibleCounters.map((c) => (
                    <span
                      key={c.type}
                      style={{
                        background: TYPE_COLOR[c.type] ?? '#999',
                        color: '#fff',
                        padding: '2px 10px',
                        borderRadius: 12,
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                      title={formatCounterProduct(c)}
                    >
                      {c.type}
                      <span style={{ marginLeft: 4, opacity: 0.85 }}>
                        ×{c.product}
                      </span>
                    </span>
                  ))}
                </span>
              </div>

              <div
                style={{
                  marginTop: 10,
                  padding: 10,
                  background: '#fafafa',
                  borderRadius: 4,
                  fontSize: 12,
                  lineHeight: 1.7,
                  display: 'none',
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: 6, color: '#444' }}>
                  약점 타입 (2배 이상 피해)
                </div>
                {weaknesses.map((w) => (
                  <div key={w.weakness} style={{ marginBottom: 4 }}>
                    <span
                      style={{
                        display: 'inline-block',
                        background: TYPE_COLOR[w.weakness] ?? '#999',
                        color: '#fff',
                        padding: '1px 8px',
                        borderRadius: 10,
                        fontWeight: 600,
                        marginRight: 6,
                      }}
                    >
                      {w.weakness}
                    </span>
                    {w.superEffective.length > 0 && (
                      <span>
                        <span style={{ color: '#c22' }}>2배</span>{' '}
                        {w.superEffective.join(', ')}
                      </span>
                    )}
                    {w.notVeryEffective.length > 0 && (
                      <span style={{ marginLeft: 8 }}>
                        <span style={{ color: '#888' }}>0.5배</span>{' '}
                        {w.notVeryEffective.join(', ')}
                      </span>
                    )}
                    {w.noEffect.length > 0 && (
                      <span style={{ marginLeft: 8 }}>
                        <span style={{ color: '#999' }}>0배</span>{' '}
                        {w.noEffect.join(', ')}
                      </span>
                    )}
                  </div>
                ))}

                <div
                  style={{
                    fontWeight: 600,
                    marginTop: 10,
                    marginBottom: 6,
                    color: '#444',
                  }}
                >
                  추천 타입 (약점 상성 곱 ≥ 2)
                </div>
                {visibleCounters.map((c) => (
                  <div key={c.type} style={{ marginBottom: 2 }}>
                    <span
                      style={{
                        display: 'inline-block',
                        background: TYPE_COLOR[c.type] ?? '#999',
                        color: '#fff',
                        padding: '1px 8px',
                        borderRadius: 10,
                        fontWeight: 600,
                        marginRight: 6,
                      }}
                    >
                      {c.type}
                    </span>
                    <span style={{ color: '#555' }}>
                      {formatCounterProduct(c)}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 10 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    flexWrap: 'wrap',
                    marginBottom: 4,
                  }}
                >
                  <span style={{ fontSize: 12, color: '#666' }}>
                    추천 타입을{' '}
                    {requireTwoRecTypes[idx] ? '두 가지 이상' : '한 가지 이상'}{' '}
                    가진 포켓몬 ({matchingPokemons.length})
                  </span>
                  <label
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: 12,
                      color: '#555',
                      cursor: 'pointer',
                      userSelect: 'none',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={requireTwoRecTypes[idx]}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setRequireTwoRecTypes((prev) => {
                          const next = [...prev];
                          next[idx] = checked;
                          return next;
                        });
                      }}
                    />
                    추천 타입 2가지 이상만 보기
                  </label>
                  <label
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: 12,
                      color: '#555',
                      cursor: 'pointer',
                      userSelect: 'none',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={excludeMegaEvolution[idx]}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setExcludeMegaEvolution((prev) => {
                          const next = [...prev];
                          next[idx] = checked;
                          return next;
                        });
                      }}
                    />
                    메가진화 제외
                  </label>
                </div>
                {matchingPokemons.length === 0 ? (
                  <span style={{ color: '#aaa', fontSize: 12 }}>
                    해당하는 포켓몬이 없어요.
                  </span>
                ) : (
                  <MatchingPokemonsTable
                    pokemons={matchingPokemons}
                    onSelectPokemon={(p) =>
                      handleSelectFromRecommendation(idx + 1, p)
                    }
                  />
                )}
              </div>
            </div>
            }
            </>
          );
        })}
      </div>
    </div>
  );
};

export default MakeTeam;
