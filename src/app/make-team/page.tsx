'use client';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
import { createPortal } from 'react-dom';
import { useOutOfClick } from '@/hooks/useOutOfClick';
import {
  formatCounterProduct,
  getRecommendedCounterDetails,
} from '@/hooks/useType';
import cn from 'classnames';
import {
  fetchPokemonList,
  searchPokemonByName,
  type Pokemon,
} from '@/store/PokemonStore';
import { PokemonSpriteImage } from '@/components/PokemonSpriteImage';
import { hasPokemonImage } from '@/utils/pokemonDisplay';
import { ensureStringArray, normalizePokemon } from '@/utils/pokemonNormalize';
import { isMegaDisplayName } from '@/utils/pokemonName';
import abilitiesData from '@/constants/abilities.json';
import s from './maekTeam.module.scss';
import { TYPE_COLOR } from '@/constants/pokemonTypeColor';

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

const TEAM_SIZE = 6;

const subscribeNoop = () => () => {};

/** SSR/CSR HTML 불일치 방지 — 클라이언트에서만 true */
function useIsClient() {
  return useSyncExternalStore(subscribeNoop, () => true, () => false);
}

const PLACEHOLDERS = [
  '첫번째 포켓몬',
  '두번째 포켓몬',
  '세번째 포켓몬',
  '네번째 포켓몬',
  '다섯번째 포켓몬',
  '여섯번째 포켓몬',
];

function getDefaultAbility(pokemon: Pokemon): string | null {
  const ability = ensureStringArray(pokemon.ability);
  const sAbility = ensureStringArray(pokemon.s_ability);
  return ability[0] ?? sAbility[0] ?? null;
}

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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const isClient = useIsClient();
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [pokemonListLoading, setPokemonListLoading] = useState(true);
  const [pokemonListError, setPokemonListError] = useState<string | null>(null);

  useEffect(() => {
    if (!isClient) return;
    let cancelled = false;
    fetchPokemonList()
      .then((list) => {
        if (!cancelled) {
          setAllPokemons(list);
          setPokemonListError(null);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setPokemonListError(
            err instanceof Error ? err.message : '포켓몬 목록을 불러오지 못했습니다.',
          );
        }
      })
      .finally(() => {
        if (!cancelled) setPokemonListLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [isClient]);
  const [excludeSameTypes, setExcludeSameTypes] = useState(true);
  const [requireTwoRecTypes, setRequireTwoRecTypes] = useState<boolean[]>(() =>
    Array.from({ length: TEAM_SIZE }, () => true),
  );
  const [excludeMegaEvolution, setExcludeMegaEvolution] = useState<boolean[]>(
    () => Array.from({ length: TEAM_SIZE }, () => false),
  );

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  // 바깥 영역 클릭 시 드롭다운 닫기
  const handleOutsideClick = useCallback(() => {
    setActiveIndex(null);
  }, []);
  useOutOfClick(wrapperRef, handleOutsideClick);

  const searchKeyword =
    activeIndex !== null ? values[activeIndex].trim() : '';

  const suggestions = useMemo(() => {
    if (!searchKeyword || pokemonListLoading || allPokemons.length === 0) {
      return [];
    }
    return searchPokemonByName(searchKeyword, allPokemons, 50);
  }, [searchKeyword, allPokemons, pokemonListLoading]);

  const searchLoading =
    searchKeyword.length > 0 &&
    (pokemonListLoading || allPokemons.length === 0);

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
    setActiveIndex(index);
    setHighlightedIndex(0);
    setValues((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
    // 사용자가 직접 텍스트를 바꾸면 그 슬롯의 선택 정보 초기화
    setSelectedPokemons((prev) => {
      if (!prev[index] || prev[index]?.nameKo === value) return prev;
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
    const pokemon = normalizePokemon(
      suggestion as unknown as Record<string, unknown>,
    );
    const defaultAbility = getDefaultAbility(pokemon);

    setValues((prev) => {
      const next = [...prev];
      next[index] = pokemon.nameKo;
      return next;
    });
    setSelectedPokemons((prev) => {
      const next = [...prev];
      next[index] = pokemon;
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
    setActiveIndex(null);
  };

  const handleSelectFromRecommendation = (index: number, suggestion: Pokemon) => {
    handleSelect(index, suggestion);
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
      !searchLoading &&
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

  /**
   * 추천 표 idx 기준 — 그 이전에 선택된 포켓몬 타입만 (기준 포켓몬 제외).
   * idx=0(2번째 선택)일 때는 빈 집합 → 카운터 목록이 잘리지 않음.
   */
  const getTeamTypesBeforeRecommendation = useCallback(
    (recommendationIdx: number) => {
      const types = new Set<string>();
      for (let i = 0; i < recommendationIdx; i++) {
        const p = selectedPokemons[i];
        if (!p) continue;
        for (const t of ensureStringArray(p.types)) types.add(t);
      }
      return types;
    },
    [selectedPokemons],
  );

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
      <div ref={wrapperRef} className={s.buildWrap}>
        {PLACEHOLDERS.map((placeholder, index) => {
          const isActive = activeIndex === index;
          const showDropdown =
            isClient &&
            isActive &&
            values[index].trim().length > 0;
          const selected = selectedPokemons[index];
          const chosenAbility = selectedAbilities[index];
          const regularAbilities = ensureStringArray(selected?.ability);
          const hiddenAbilities = ensureStringArray(selected?.s_ability);
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
                {selected && hasPokemonImage(selected.images) ? (
                  <PokemonSpriteImage
                    images={selected.images}
                    alt={selected.nameKo}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="!relative !h-auto object-contain"
                    priority
                  />
                ) : null}
              </div>
              <span className={s.types}>
                <div className={s.typesList}>
                  {ensureStringArray(selected?.types).map((t) => (
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
                      {searchLoading && (
                        <li>
                          검색중...
                        </li>
                      )}
                      {!searchLoading &&
                        suggestions.length === 0 && (
                        <li>
                          검색 결과 없음
                        </li>
                      )}
                      {!searchLoading &&
                        suggestions.map((item, i) => {
                          const isHighlighted = i === highlightedIndex;
                          return (
                            <li
                              key={item.name}
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
                              <span style={{ flex: 1 }}>{item.nameKo}</span>
                              <span style={{ display: 'inline-flex', gap: 4 }}>
                                {ensureStringArray(item.types).map((t) => (
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
                      title={abilitySummary ?? ''}
                    >
                      {regularAbilities.map((abilityName) => (
                        <option
                          key={`ability-${abilityName}`}
                          value={abilityName}
                          title={abilitySummary ?? ''}
                        >
                          {abilityName}
                        </option>
                      ))}
                      {hiddenAbilities.map((abilityName) => (
                        <option
                          key={`s-ability-${abilityName}`}
                          value={abilityName}
                          title={abilitySummary ?? ''}
                        >
                          🔓 {abilityName}
                        </option>
                      ))}
                    </select>
                    {/* <p className={s.abilitySummary}>{abilitySummary && abilitySummary}</p> */}
                    {/* {abilitySummary ? (
                      <p className={s.abilitySummary}>{abilitySummary}</p>
                    ) : null} */}
                  </>
                ) : (
                  <span>특성</span>
                )}
              </div>
              <div>도구</div>
              <div>성격</div>
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
          // 팀이 가득 찼을 때 마지막 슬롯 기준 '다음(7번째)' 추천 표만 숨김
          if (nextEmptyIndex === -1 && idx === lastSelectedIndex) return null;
          const counterResult = getRecommendedCounterDetails(
            ensureStringArray(pokemon.types),
          );
          const { weaknesses, counters } = counterResult;
          if (counters.length === 0) return null;

          const recommended = counters.map((c) => c.type);
          const recSet = new Set(recommended);
          const minRecTypeCount = requireTwoRecTypes[idx] ? 2 : 1;
          const matchingPokemons = allPokemons.filter((p) => {
            if (selectedPokemonIds.has(p.id)) return false;
            const matches = ensureStringArray(p.types).filter((t) =>
              recSet.has(t),
            );
            if (matches.length < minRecTypeCount) return false;
            if (excludeMegaEvolution[idx] && isMegaDisplayName(p.nameKo))
              return false;
            if (excludeSameTypes) {
              const teamTypes = getTeamTypesBeforeRecommendation(idx);
              // 추천 카운터 타입(강철·독·바위 등)과 겹치는 것은 허용
              const overlapsOutsideRec = ensureStringArray(p.types).some(
                (t) => teamTypes.has(t) && !recSet.has(t),
              );
              if (overlapsOutsideRec) return false;
            }
            return true;
          });

          return (
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
          );
        })}
      </div>
    </div>
  );
};

export default MakeTeam;
