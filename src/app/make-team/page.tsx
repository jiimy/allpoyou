'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useOutOfClick } from '@/hooks/useOutOfClick';
import {
  formatCounterProduct,
  getRecommendedCounterDetails,
} from '@/hooks/useType';
import cn from 'classnames';
import {
  POKEMON_LIST,
  searchPokemonByName,
  type Pokemon,
} from '@/store/PokemonStore';
import { isMegaDisplayName } from '@/utils/pokemonName';
import abilitiesData from '@/constants/abilities.json';
import s from './maekTeam.module.scss';
import Image from 'next/image';

type AbilityEntry = { nameKo: string; summary: string };

const ABILITY_SUMMARY_BY_NAME = Object.values(
  abilitiesData as Record<string, AbilityEntry>,
).reduce<Record<string, string>>((acc, entry) => {
  acc[entry.nameKo] = entry.summary;
  return acc;
}, {});

function getAbilitySummary(abilityName: string | null): string | null {
  if (!abilityName) return null;
  return ABILITY_SUMMARY_BY_NAME[abilityName] ?? null;
}

const STAT_FIELD_KEYS = ['H', 'A', 'B', 'C', 'D', 'S', 'total'] as const;
const STAT_HIGHLIGHT_KEYS = ['H', 'A', 'B', 'C', 'D', 'S'] as const;
const STAT_KEYS = ['HP', '공격', '방어', '특공', '특방', '스피드', '총합'] as const;
const STAT_LABEL_BY_KEY: Record<(typeof STAT_HIGHLIGHT_KEYS)[number], string> = {
  H: '체력',
  A: '공격',
  B: '방어',
  C: '특공',
  D: '특방',
  S: '스피드',
};
type StatFieldKey = (typeof STAT_FIELD_KEYS)[number];
type StatHighlightKey = (typeof STAT_HIGHLIGHT_KEYS)[number];

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

function getHighestStatLabel(p: Pokemon): string | null {
  const keys = getRowMaxStatKeys(p);
  if (keys.size === 0) return null;
  return [...keys].map((key) => STAT_LABEL_BY_KEY[key]).join(' / ');
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

const MatchingPokemonsTable: React.FC<{
  pokemons: Pokemon[];
  onSelectPokemon?: (pokemon: Pokemon) => void;
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

function getDefaultAbility(pokemon: Pokemon): string | null {
  return pokemon.ability?.[0] ?? pokemon.s_ability?.[0] ?? null;
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
  "use no memo";

  const [values, setValues] = useState<string[]>(() =>
    Array.from({ length: TEAM_SIZE }, () => ''),
  );
  const [selectedPokemons, setSelectedPokemons] = useState<
    (Pokemon | null)[]
  >(() => Array.from({ length: TEAM_SIZE }, () => null));
  const [selectedAbilities, setSelectedAbilities] = useState<
    (string | null)[]
  >(() => Array.from({ length: TEAM_SIZE }, () => null));
  const [abilitySummaries, setAbilitySummaries] = useState<(string | null)[]>(
    () => Array.from({ length: TEAM_SIZE }, () => null),
  );
  const [suggestions, setSuggestions] = useState<Pokemon[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const allPokemons = POKEMON_LIST;
  const [excludeSameTypes, setExcludeSameTypes] = useState(true);
  const [requireTwoRecTypes, setRequireTwoRecTypes] = useState<boolean[]>(() =>
    Array.from({ length: TEAM_SIZE }, () => true),
  );
  const [excludeMegaEvolution, setExcludeMegaEvolution] = useState(false);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  // 바깥 영역 클릭 시 드롭다운 닫기
  const handleOutsideClick = useCallback(() => {
    setActiveIndex(null);
  }, []);
  useOutOfClick(wrapperRef, handleOutsideClick);

  // 활성 input 값이 바뀌면 디바운스해서 로컬 스토어에서 검색
  useEffect(() => {
    if (activeIndex === null) return;

    const keyword = values[activeIndex].trim();

    const timer = setTimeout(() => {
      if (!keyword) {
        setSuggestions([]);
        setLoading(false);
        return;
      }

      setSuggestions(searchPokemonByName(keyword, 50));
      setHighlightedIndex(0);
      setLoading(false);
    }, 200);

    // if (keyword) setLoading(true);

    return () => clearTimeout(timer);
  }, [activeIndex, values]);

  // 검색 결과가 바뀌면 ref 배열 초기화
  useEffect(() => {
    itemRefs.current = [];
  }, [suggestions]);

  // 하이라이트가 바뀌면 보이도록 스크롤
  useEffect(() => {
    const el = itemRefs.current[highlightedIndex];
    if (el) el.scrollIntoView({ block: 'nearest' });
  }, [highlightedIndex, suggestions]);

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
    setSelectedAbilities((prev) => {
      if (!prev[index]) return prev;
      const next = [...prev];
      next[index] = null;
      return next;
    });
    setAbilitySummaries((prev) => {
      if (!prev[index]) return prev;
      const next = [...prev];
      next[index] = null;
      return next;
    });
  };

  const handleSelectAbility = (index: number, abilityName: string) => {
    const summary = getAbilitySummary(abilityName);
    setSelectedAbilities((prev) => {
      const next = [...prev];
      next[index] = abilityName;
      return next;
    });
    setAbilitySummaries((prev) => {
      const next = [...prev];
      next[index] = summary;
      return next;
    });
  };

  const handleSelect = (index: number, suggestion: Pokemon) => {
    const defaultAbility = getDefaultAbility(suggestion);

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
    setSelectedAbilities((prev) => {
      const next = [...prev];
      next[index] = defaultAbility;
      return next;
    });
    setAbilitySummaries((prev) => {
      const next = [...prev];
      next[index] = getAbilitySummary(defaultAbility);
      return next;
    });
    setSuggestions([]);
    setActiveIndex(null);
  };

  const handleSelectFromRecommendation = (suggestion: Pokemon) => {
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
    setSelectedAbilities((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
    setAbilitySummaries((prev) => {
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
      <div ref={wrapperRef} className={s.buildWrap}>
        {PLACEHOLDERS.map((placeholder, index) => {
          const isActive = activeIndex === index;
          const showDropdown =
            isActive && values[index].trim().length > 0;
          const selected = selectedPokemons[index];
          const chosenAbility = selectedAbilities[index];
          const regularAbilities = selected?.ability ?? [];
          const hiddenAbilities = selected?.s_ability ?? [];
          const hasAbilities =
            regularAbilities.length > 0 || hiddenAbilities.length > 0;
          const currentAbility =
            chosenAbility ?? (selected ? getDefaultAbility(selected) : null);
          const abilitySummary =
            abilitySummaries[index] ??
            (currentAbility ? getAbilitySummary(currentAbility) : null);

          return (
            <div key={index}>
              <div className={s.thumbnail}>
                {selected?.image ? (
                  <Image
                    src={selected.image}
                    alt={selected.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="!relative !h-auto object-contain"
                    priority
                  />
                ) : null}
              </div>
              <span className={s.types}>
                <div className={s.typesList}>
                  {selected?.types?.map((t) => (
                    <span
                      key={t}
                      style={{
                        background: TYPE_COLOR[t] ?? '#999',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div>
                  {selected ? getHighestStatLabel(selected) : null}
                </div>
              </span>
              <div className={s.buildArea}>
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
                  {showDropdown && (
                    <ul className={s.dropdown}>
                      {loading && (
                        <li>
                          검색중...
                        </li>
                      )}
                      {!loading && suggestions.length === 0 && (
                        <li>
                          검색 결과 없음
                        </li>
                      )}
                      {!loading &&
                        suggestions.map((item, i) => {
                          const isHighlighted = i === highlightedIndex;
                          return (
                            <li
                              key={item.id}
                              className={cn({
                                [s.dropdownItemHighlighted]: isHighlighted,
                              })}
                              ref={(el) => {
                                itemRefs.current[i] = el;
                              }}
                              onMouseDown={(e) => {
                                // input blur 보다 먼저 동작하도록 mousedown 사용
                                e.preventDefault();
                                handleSelect(index, item);
                              }}
                              onMouseEnter={() => setHighlightedIndex(i)}
                            >
                              {/* <span style={{ color: '#888' }}>#{item.number}</span> */}
                              <span style={{ flex: 1 }}>{item.name}</span>
                              <span style={{ display: 'inline-flex', gap: 4 }}>
                                {item.types?.map((t) => (
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


              </div>
              <div className={s.abilitySection}>
                {hasAbilities && selected && currentAbility ? (
                  <>
                    <select
                      className={s.abilitySelect}
                      value={currentAbility}
                      onChange={(e) =>
                        handleSelectAbility(index, e.target.value)
                      }
                      aria-label="특성 선택"
                    >
                      {regularAbilities.map((abilityName) => (
                        <option
                          key={`ability-${abilityName}`}
                          value={abilityName}
                        >
                          {abilityName}
                        </option>
                      ))}
                      {hiddenAbilities.map((abilityName) => (
                        <option
                          key={`s-ability-${abilityName}`}
                          value={abilityName}
                        >
                          🔓 {abilityName}
                        </option>
                      ))}
                    </select>
                    <p className={s.abilitySummary}>{abilitySummary && abilitySummary}</p>
                    {/* {abilitySummary ? (
                      <p className={s.abilitySummary}>{abilitySummary}</p>
                    ) : null} */}
                  </>
                ) : (
                  <span>특성</span>
                )}
              </div>
              <div>도구</div>
              <div>기술1</div>
              <div>기술2</div>
              <div>기술3</div>
              <div>기술4</div>
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
          const counterResult = getRecommendedCounterDetails(pokemon.types);
          const { weaknesses, counters } = counterResult;
          if (counters.length === 0) return null;

          const recommended = counters.map((c) => c.type);
          const recSet = new Set(recommended);
          const minRecTypeCount = requireTwoRecTypes[idx] ? 2 : 1;
          const matchingPokemons = allPokemons.filter((p) => {
            const matches = p.types.filter((t) => recSet.has(t));
            if (matches.length < minRecTypeCount) return false;
            if (excludeMegaEvolution && isMegaDisplayName(p.name)) return false;
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
                  {counters.map((c) => (
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
                {counters.map((c) => (
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
                      checked={excludeMegaEvolution}
                      onChange={(e) =>
                        setExcludeMegaEvolution(e.target.checked)
                      }
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
