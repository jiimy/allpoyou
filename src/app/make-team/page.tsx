'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useOutOfClick } from '@/hooks/useOutOfClick';
import { getRecommendedCounters } from '@/hooks/useType';
import { createClient } from '@/utils/supabase/client';
import s from './maekTeam.module.scss';

type Suggestion = {
  id: string | number;
  number: number;
  name: string;
  types: string[];
  H?: number;
  A?: number;
  B?: number;
  C?: number;
  D?: number;
  S?: number;
  total?: number;
};

const STAT_FIELD_KEYS = ['H', 'A', 'B', 'C', 'D', 'S', 'total'] as const;
const STAT_HIGHLIGHT_KEYS = ['H', 'A', 'B', 'C', 'D', 'S'] as const;
const STAT_KEYS = ['HP', '공격', '방어', '특공', '특방', '스피드', '총합'] as const;
type StatFieldKey = (typeof STAT_FIELD_KEYS)[number];
type StatHighlightKey = (typeof STAT_HIGHLIGHT_KEYS)[number];

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

const MatchingPokemonsTable: React.FC<{
  pokemons: Suggestion[];
  onSelectPokemon?: (pokemon: Suggestion) => void;
}> = ({ pokemons, onSelectPokemon }) => {
  const [sortKey, setSortKey] = useState<StatFieldKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection | null>(null);

  // 클릭 시: 다른 컬럼이면 desc부터, 같으면 desc → asc → 해제 순환
  const handleSort = (key: StatFieldKey) => {
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
    const key = sortKey;
    const dirMult = sortDir === 'asc' ? 1 : -1;
    return [...pokemons].sort((a, b) => {
      const av = a[key];
      const bv = b[key];
      const an = typeof av === 'number' ? av : -Infinity;
      const bn = typeof bv === 'number' ? bv : -Infinity;
      return (an - bn) * dirMult;
    });
  }, [pokemons, sortKey, sortDir]);

  const getRowMaxStatKeys = (p: Suggestion): Set<StatHighlightKey> => {
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
  };

  return (
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
            <th style={{ ...statThStyle, textAlign: 'left' }}>이름</th>
            <th style={{ ...statThStyle, textAlign: 'left' }}>타입</th>
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
              key={p.id}
              className={s.resultRow}
              onClick={() => onSelectPokemon?.(p)}
            >
              <td style={{ ...statTdStyle, color: '#888' }}>#{p.number}</td>
              <td style={{ ...statTdStyle, textAlign: 'left' }}>{p.name}</td>
              <td style={{ ...statTdStyle, textAlign: 'left' }}>
                <span style={{ display: 'inline-flex', gap: 4 }}>
                  {p.types.map((t) => (
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
  );
};

const TEAM_SIZE = 6;

const PLACEHOLDERS = [
  '첫번째 포켓몬',
  '두번째 포켓몬',
  '세번째 포켓몬',
  '네번째 포켓몬',
  '다섯번째 포켓몬',
  '여섯번째 포켓몬',
];

// supabase에서 받은 types 값을 항상 string[]로 정규화.
// - 배열이면 그대로
// - PostgreSQL array literal "{불꽃,비행}" 형태 처리
// - JSON 문자열 처리
// - 그 외 단일 문자열은 [value]
function normalizeTypes(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((v): v is string => typeof v === 'string');
  }
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
      return trimmed
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^"(.*)"$/, '$1'))
        .filter(Boolean);
    }
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.filter((v): v is string => typeof v === 'string');
      }
    } catch {
      // not JSON
    }
    return trimmed ? [trimmed] : [];
  }
  return [];
}

// 한글 타입명 → 색상 매핑 (공식 컬러 팔레트)
const TYPE_COLOR: Record<string, string> = {
  노말: '#A8A77A',
  격투: '#C22E28',
  비행: '#A98FF3',
  독: '#A33EA1',
  땅: '#E2BF65',
  바위: '#B6A136',
  벌레: '#A6B91A',
  고스트: '#735797',
  강철: '#B7B7CE',
  불꽃: '#EE8130',
  물: '#6390F0',
  풀: '#7AC74C',
  전기: '#F7D02C',
  에스퍼: '#F95587',
  얼음: '#96D9D6',
  드래곤: '#6F35FC',
  악: '#705746',
  페어리: '#D685AD',
};

const MakeTeam = () => {
  const supabase = useMemo(() => createClient(), []);

  const [values, setValues] = useState<string[]>(() =>
    Array.from({ length: TEAM_SIZE }, () => ''),
  );
  const [selectedPokemons, setSelectedPokemons] = useState<
    (Suggestion | null)[]
  >(() => Array.from({ length: TEAM_SIZE }, () => null));
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [allPokemons, setAllPokemons] = useState<Suggestion[]>([]);
  const [excludeSameTypes, setExcludeSameTypes] = useState(true);
  const [requireTwoRecTypes, setRequireTwoRecTypes] = useState<boolean[]>(() =>
    Array.from({ length: TEAM_SIZE }, () => false),
  );

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  // 바깥 영역 클릭 시 드롭다운 닫기
  const handleOutsideClick = useCallback(() => {
    setActiveIndex(null);
  }, []);
  useOutOfClick(wrapperRef, handleOutsideClick);

  // 활성 input 값이 바뀌면 디바운스해서 supabase 조회
  useEffect(() => {
    if (activeIndex === null) return;

    const keyword = values[activeIndex].trim();

    const timer = setTimeout(async () => {
      if (!keyword) {
        setSuggestions([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      const { data, error } = await supabase
        .from('pokemon')
        .select('id, number, name, types')
        .ilike('name', `%${keyword}%`)
        .order('number', { ascending: true })
        .limit(10);

      if (!error && data) {
        const normalized: Suggestion[] = data.map((row) => ({
          id: row.id as string | number,
          number: row.number as number,
          name: row.name as string,
          types: normalizeTypes((row as { types: unknown }).types),
        }));
        setSuggestions(normalized);
      } else {
        setSuggestions([]);
      }
      setHighlightedIndex(0);
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [activeIndex, values, supabase]);

  // 하이라이트가 바뀌면 보이도록 스크롤
  useEffect(() => {
    const el = itemRefs.current[highlightedIndex];
    if (el) el.scrollIntoView({ block: 'nearest' });
  }, [highlightedIndex]);

  // 마운트 시 전체 포켓몬 목록을 한 번 받아서 추천 필터에 사용
  useEffect(() => {
    let cancelled = false;
    const fetchAll = async () => {
      const { data, error } = await supabase
        .from('pokemon')
        .select('id, number, name, types, H, A, B, C, D, S, total')
        .order('number', { ascending: true })
        .limit(2000);

      if (cancelled || error || !data) return;

      const normalized: Suggestion[] = data.map((row) => {
        const r = row as Record<string, unknown>;
        return {
          id: r.id as string | number,
          number: r.number as number,
          name: r.name as string,
          types: normalizeTypes(r.types),
          H: typeof r.H === 'number' ? r.H : undefined,
          A: typeof r.A === 'number' ? r.A : undefined,
          B: typeof r.B === 'number' ? r.B : undefined,
          C: typeof r.C === 'number' ? r.C : undefined,
          D: typeof r.D === 'number' ? r.D : undefined,
          S: typeof r.S === 'number' ? r.S : undefined,
          total: typeof r.total === 'number' ? r.total : undefined,
        };
      });
      setAllPokemons(normalized);
    };
    fetchAll();
    return () => {
      cancelled = true;
    };
  }, [supabase]);

  const handleChange = (index: number, value: string) => {
    setValues((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
    // 사용자가 직접 텍스트를 바꾸면 그 슬롯의 선택 정보 초기화
    setSelectedPokemons((prev) => {
      if (!prev[index] || prev[index]?.name === value) return prev;
      const next = [...prev];
      next[index] = null;
      return next;
    });
  };

  const handleSelect = (index: number, suggestion: Suggestion) => {
    setValues((prev) => {
      const next = [...prev];
      next[index] = suggestion.name;
      return next;
    });
    setSelectedPokemons((prev) => {
      const next = [...prev];
      next[index] = suggestion;
      return next;
    });
    setSuggestions([]);
    setActiveIndex(null);
  };

  const handleSelectFromRecommendation = (suggestion: Suggestion) => {
    const emptyIndex = selectedPokemons.findIndex((p) => p === null);
    if (emptyIndex === -1) return;
    handleSelect(emptyIndex, suggestion);
  };

  const handleClear = (index: number) => {
    setValues((prev) => {
      const next = [...prev];
      next[index] = '';
      return next;
    });
    setSelectedPokemons((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
    if (activeIndex === index) {
      setSuggestions([]);
      setActiveIndex(null);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    const dropdownOpen =
      activeIndex === index &&
      values[index].trim().length > 0 &&
      !loading &&
      suggestions.length > 0;

    if (!dropdownOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(
        (prev) => (prev - 1 + suggestions.length) % suggestions.length,
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const picked = suggestions[highlightedIndex];
      if (picked) handleSelect(index, picked);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setActiveIndex(null);
    }
  };

  // 인풋에 선택된 모든 포켓몬의 타입 합집합 (마지막 추천 리스트 필터용)
  const teamSelectedTypes = useMemo(() => {
    const types = new Set<string>();
    for (const p of selectedPokemons) {
      if (!p) continue;
      for (const t of p.types) types.add(t);
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

  return (
    <div>
      팀만들기
      <div ref={wrapperRef}>
        {PLACEHOLDERS.map((placeholder, index) => {
          const isActive = activeIndex === index;
          const showDropdown =
            isActive && values[index].trim().length > 0;
          const selected = selectedPokemons[index];

          return (
            <div
              key={index}
              style={{ position: 'relative', marginBottom: 8 }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <div className={s.inputWrap}>
                  <input
                    type="text"
                    className={s.input}
                    placeholder={placeholder}
                    value={values[index]}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onFocus={() => {
                      setActiveIndex(index);
                      setHighlightedIndex(0);
                    }}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    autoComplete="off"
                    data-1p-ignore
                    data-lpignore="true"
                    data-form-type="other"
                    suppressHydrationWarning
                  />
                  <button
                    type="button"
                    className={s.clearBtn}
                    onClick={() => handleClear(index)}
                    aria-label={`${placeholder} 입력 초기화`}
                    tabIndex={-1}
                  >
                    ×
                  </button>
                </div>
                <span style={{ display: 'inline-flex', gap: 4 }}>
                  {selected?.types?.map((t) => (
                    <span
                      key={t}
                      style={{
                        background: TYPE_COLOR[t] ?? '#999',
                        color: '#fff',
                        padding: '2px 10px',
                        borderRadius: 12,
                        fontSize: 12,
                        fontWeight: 600,
                        lineHeight: 1.6,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </span>
              </div>
              {showDropdown && (
                <ul
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    width: 240,
                    margin: 0,
                    padding: 0,
                    listStyle: 'none',
                    border: '1px solid #ddd',
                    borderRadius: 4,
                    background: '#fff',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    zIndex: 10,
                    maxHeight: 240,
                    overflowY: 'auto',
                  }}
                >
                  {loading && (
                    <li style={{ padding: '8px 10px', color: '#888' }}>
                      검색중...
                    </li>
                  )}
                  {!loading && suggestions.length === 0 && (
                    <li style={{ padding: '8px 10px', color: '#888' }}>
                      검색 결과 없음
                    </li>
                  )}
                  {!loading &&
                    suggestions.map((s, i) => {
                      const isHighlighted = i === highlightedIndex;
                      return (
                        <li
                          key={s.id}
                          ref={(el) => {
                            itemRefs.current[i] = el;
                          }}
                          onMouseDown={(e) => {
                            // input blur 보다 먼저 동작하도록 mousedown 사용
                            e.preventDefault();
                            handleSelect(index, s);
                          }}
                          onMouseEnter={() => setHighlightedIndex(i)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            padding: '8px 10px',
                            cursor: 'pointer',
                            borderBottom: '1px solid #f0f0f0',
                            background: isHighlighted ? '#f0f7ff' : '#fff',
                          }}
                        >
                          <span style={{ color: '#888' }}>#{s.number}</span>
                          <span style={{ flex: 1 }}>{s.name}</span>
                          <span style={{ display: 'inline-flex', gap: 4 }}>
                            {s.types?.map((t) => (
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
                        </li>
                      );
                    })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            flexWrap: 'wrap',
          }}
        >
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
        {selectedPokemons.every((p) => p === null) && (
          <p style={{ color: '#888', fontSize: 13 }}>
            포켓몬을 선택하면 약점을 보완하는 카운터 타입을 추천해드려요.
          </p>
        )}
        {selectedPokemons.map((pokemon, idx) => {
          if (!pokemon) return null;
          const recommended = getRecommendedCounters(pokemon.types);
          if (recommended.length === 0) return null;

          const recSet = new Set(recommended);
          const minRecTypeCount = requireTwoRecTypes[idx] ? 2 : 1;
          const matchingPokemons = allPokemons.filter((p) => {
            const matches = p.types.filter((t) => recSet.has(t));
            if (matches.length < minRecTypeCount) return false;
            if (
              excludeSameTypes &&
              idx === lastSelectedIndex
            ) {
              const hasTeamType = p.types.some((t) => teamSelectedTypes.has(t));
              if (hasTeamType) return false;
            }
            return true;
          });

          return (
            <div
              key={`${pokemon.id}-${idx}`}
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
                <strong>{pokemon.name}</strong>
                <span style={{ display: 'inline-flex', gap: 4 }}>
                  {pokemon.types.map((t) => (
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
                  {recommended.map((c) => (
                    <span
                      key={c}
                      style={{
                        background: TYPE_COLOR[c] ?? '#999',
                        color: '#fff',
                        padding: '2px 10px',
                        borderRadius: 12,
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      {c}
                    </span>
                  ))}
                </span>
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
                    {requireTwoRecTypes[idx] ? '두 가지 이상' : '하나 이상'}{' '}
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
                </div>
                {matchingPokemons.length === 0 ? (
                  <span style={{ color: '#aaa', fontSize: 12 }}>
                    해당하는 포켓몬이 없어요.
                  </span>
                ) : (
                  <MatchingPokemonsTable
                    pokemons={matchingPokemons}
                    onSelectPokemon={handleSelectFromRecommendation}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MakeTeam;
