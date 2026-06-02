'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import cn from 'classnames';
import { useOutOfClick } from '@/hooks/useOutOfClick';
import type { Pokemon } from '@/store/PokemonStore';
import { PokemonSpriteImage } from '@/components/PokemonSpriteImage';
import { hasPokemonImage } from '@/utils/pokemonDisplay';
import { ensureStringArray } from '@/utils/pokemonNormalize';
import abilitiesData from '@/constants/abilities.json';
import { TYPE_COLOR } from '@/constants/pokemonTypeColor';
import { buildPokemonsFromEditor } from '@/store/pokemonTeamMappers';
import { usePokemonTeamStore } from '@/store/PokemonTeamStore';
import type { ItemKr } from '@/types/item';
import s from '@/app/make-team/maekTeam.module.scss';

type AbilityEntry = { nameKo: string; summary: string };

const ABILITY_SUMMARY_BY_NAME = Object.values(
  abilitiesData as Record<string, AbilityEntry>,
).reduce<Record<string, string>>((acc, entry) => {
  acc[entry.nameKo] = entry.summary;
  return acc;
}, {});

export function getAbilitySummary(abilityName: string | null): string | null {
  if (!abilityName) return null;
  return ABILITY_SUMMARY_BY_NAME[abilityName] ?? null;
}

export function getDefaultAbility(pokemon: Pokemon): string | null {
  const ability = ensureStringArray(pokemon.ability);
  const sAbility = ensureStringArray(pokemon.s_ability);
  return ability[0] ?? sAbility[0] ?? null;
}

const STAT_HIGHLIGHT_KEYS = ['H', 'A', 'B', 'C', 'D', 'S'] as const;
const STAT_LABEL_BY_KEY: Record<(typeof STAT_HIGHLIGHT_KEYS)[number], string> = {
  H: '체력',
  A: '공격',
  B: '방어',
  C: '특공',
  D: '특방',
  S: '스피드',
};

function getRowMaxStatKeys(p: Pokemon): Set<(typeof STAT_HIGHLIGHT_KEYS)[number]> {
  let max = -Infinity;
  for (const key of STAT_HIGHLIGHT_KEYS) {
    const v = p[key];
    if (typeof v === 'number' && v > max) max = v;
  }
  if (max === -Infinity) return new Set();

  const keys = new Set<(typeof STAT_HIGHLIGHT_KEYS)[number]>();
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

const PLACEHOLDERS = [
  '첫번째 포켓몬',
  '두번째 포켓몬',
  '세번째 포켓몬',
  '네번째 포켓몬',
  '다섯번째 포켓몬',
  '여섯번째 포켓몬',
] as const;

export type TeamProps = {
  /** 로컬 persist 복원 전에는 false — 복원 데이터를 빈 슬롯으로 덮어쓰지 않음 */
  editorReady?: boolean;
  values: string[];
  selectedPokemons: (Pokemon | null)[];
  selectedAbilities: (string | null)[];
  abilitySummaries: (string | null)[];
  selectedItemIds: (number | null)[];
  itemSearchValues: string[];
  activeItemIndex: number | null;
  itemSuggestions: ItemKr[];
  itemHighlightedIndex: number;
  activeIndex: number | null;
  isClient: boolean;
  searchLoading: boolean;
  suggestions: Pokemon[];
  highlightedIndex: number;
  onActiveIndexChange: (index: number | null) => void;
  onHighlightedIndexChange: (index: number) => void;
  onChange: (index: number, value: string) => void;
  onClear: (index: number) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, index: number) => void;
  onSelect: (index: number, item: Pokemon) => void;
  onSelectAbility: (index: number, abilityName: string) => void;
  onItemSearchChange: (index: number, value: string) => void;
  onSelectItem: (index: number, item: ItemKr) => void;
  onClearItem: (index: number) => void;
  onActiveItemIndexChange: (index: number | null) => void;
  onItemHighlightedIndexChange: (index: number) => void;
  onItemKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, index: number) => void;
  pendingItemPick?: ItemKr | null;
  pendingPokemonPick?: Pokemon | null;
  onItemSectionActivate: (index: number) => void;
  onThumbnailActivate: (index: number) => void;
};

const Team: React.FC<TeamProps> = ({
  editorReady = true,
  values,
  selectedPokemons,
  selectedAbilities,
  abilitySummaries,
  selectedItemIds,
  itemSearchValues,
  activeItemIndex,
  itemSuggestions,
  itemHighlightedIndex,
  activeIndex,
  isClient,
  searchLoading,
  suggestions,
  highlightedIndex,
  onActiveIndexChange,
  onHighlightedIndexChange,
  onChange,
  onClear,
  onKeyDown,
  onSelect,
  onSelectAbility,
  onItemSearchChange,
  onSelectItem,
  onClearItem,
  onActiveItemIndexChange,
  onItemHighlightedIndexChange,
  onItemKeyDown,
  pendingItemPick = null,
  pendingPokemonPick = null,
  onItemSectionActivate,
  onThumbnailActivate,
}) => {
  const syncActiveTeamPokemons = usePokemonTeamStore(
    (state) => state.syncActiveTeamPokemons,
  );

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const itemDropdownRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (!editorReady) return;
    const existing =
      usePokemonTeamStore.getState().getActiveTeam()?.pokemons ?? [];
    const pokemons = buildPokemonsFromEditor(
      selectedPokemons,
      selectedAbilities,
      selectedItemIds,
      existing,
    );
    syncActiveTeamPokemons(pokemons);
  }, [
    editorReady,
    selectedPokemons,
    selectedAbilities,
    selectedItemIds,
    syncActiveTeamPokemons,
  ]);

  const handleOutsideClick = useCallback(() => {
    onActiveIndexChange(null);
    onActiveItemIndexChange(null);
  }, [onActiveIndexChange, onActiveItemIndexChange]);

  useOutOfClick(wrapperRef, handleOutsideClick);

  useEffect(() => {
    itemRefs.current = [];
  }, [suggestions]);

  useEffect(() => {
    const el = itemRefs.current[highlightedIndex];
    if (el) el.scrollIntoView({ block: 'nearest' });
  }, [highlightedIndex, suggestions]);

  useEffect(() => {
    itemDropdownRefs.current = [];
  }, [itemSuggestions]);

  useEffect(() => {
    const el = itemDropdownRefs.current[itemHighlightedIndex];
    if (el) el.scrollIntoView({ block: 'nearest' });
  }, [itemHighlightedIndex, itemSuggestions]);

  return (
    <div ref={wrapperRef} className={s.buildWrap}>
      {PLACEHOLDERS.map((placeholder, index) => {
        const isActive = activeIndex === index;
        const showDropdown =
          isClient && isActive && values[index].trim().length > 0;
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
        const isItemActive = activeItemIndex === index;
        const showItemDropdown =
          isClient && isItemActive && selected != null;
        const hasSelectedItem = selectedItemIds[index] != null;

        return (
          <div key={index}>
            <div
              className={cn(s.thumbnail, {
                [s.thumbnailPickable]: pendingPokemonPick != null,
              })}
              onClick={() => {
                if (!pendingPokemonPick) return;
                onThumbnailActivate(index);
              }}
            >
              {selected && hasPokemonImage(selected.images) ? (
                <PokemonSpriteImage
                  images={selected.images}
                  alt={selected.nameKo}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="!relative !h-auto object-contain max-h-full"
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
              <div>{selected ? getHighestStatLabel(selected) : null}</div>
            </span>
            <div className={s.buildArea}>
              <div className={s.inputWrap}>
                <input
                  type="text"
                  className={s.input}
                  placeholder={placeholder}
                  value={values[index]}
                  onChange={(e) => onChange(index, e.target.value)}
                  onFocus={() => {
                    onActiveItemIndexChange(null);
                    onActiveIndexChange(index);
                    onHighlightedIndexChange(0);
                  }}
                  onKeyDown={(e) => onKeyDown(e, index)}
                  autoComplete="off"
                  data-1p-ignore
                  data-lpignore="true"
                  data-form-type="other"
                  suppressHydrationWarning
                />
                <button
                  type="button"
                  className={s.clearBtn}
                  onClick={() => onClear(index)}
                  aria-label={`${placeholder} 입력 초기화`}
                  tabIndex={-1}
                >
                  ×
                </button>
                {showDropdown && (
                  <ul className={s.dropdown}>
                    {searchLoading && <li>검색중...</li>}
                    {!searchLoading && suggestions.length === 0 && (
                      <li>검색 결과 없음</li>
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
                              e.preventDefault();
                              onSelect(index, item);
                            }}
                            onMouseEnter={() => onHighlightedIndexChange(i)}
                          >
                            <span>{item.nameKo}</span>
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
                <select
                  className={s.abilitySelect}
                  value={currentAbility}
                  onChange={(e) => onSelectAbility(index, e.target.value)}
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
              ) : (
                <span>특성</span>
              )}
            </div>
            <div
              className={cn(s.itemSection, {
                [s.itemSectionPickable]:
                  pendingItemPick != null && selected != null,
              })}
              onClick={(e) => {
                if (!pendingItemPick || !selected) return;
                const target = e.target as HTMLElement;
                if (target.closest('button, li')) return;
                onItemSectionActivate(index);
              }}
            >
              {selected ? (
                <div className={s.inputWrap}>
                  <input
                    type="text"
                    className={s.fieldInput}
                    placeholder="도구 검색"
                    value={itemSearchValues[index]}
                    onChange={(e) => onItemSearchChange(index, e.target.value)}
                    title={itemSuggestions.find((item) => item.nameKo === itemSearchValues[index])?.description ?? ''}
                    onFocus={() => onItemSectionActivate(index)}
                    onKeyDown={(e) => onItemKeyDown(e, index)}
                    autoComplete="off"
                    data-1p-ignore
                    data-lpignore="true"
                    data-form-type="other"
                    aria-label="도구 선택"
                    suppressHydrationWarning
                  />
                  {hasSelectedItem || itemSearchValues[index] ? (
                    <button
                      type="button"
                      className={s.clearBtn}
                      onClick={() => onClearItem(index)}
                      aria-label="도구 선택 초기화"
                      tabIndex={-1}
                    >
                      ×
                    </button>
                  ) : null}
                  {showItemDropdown && (
                    <ul className={s.dropdown}>
                      {itemSuggestions.length === 0 && (
                        <li>검색 결과 없음</li>
                      )}
                      {itemSuggestions.map((item, i) => {
                        const isHighlighted = i === itemHighlightedIndex;
                        return (
                          <li
                            key={item.id}
                            title={item.description ?? ''}
                            className={cn({
                              [s.dropdownItemHighlighted]: isHighlighted,
                            })}
                            ref={(el) => {
                              itemDropdownRefs.current[i] = el;
                            }}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              onSelectItem(index, item);
                            }}
                            onMouseEnter={() =>
                              onItemHighlightedIndexChange(i)
                            }
                          >
                            <span>{item.nameKo}</span>
                            {/* <span className={s.itemDropdownDesc}>
                              {item.description}
                            </span> */}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              ) : (
                <span>도구</span>
              )}
            </div>
            <div>성격</div>
            <div>기술1</div>
            <div>기술2</div>
            <div>기술3</div>
            <div>기술4</div>
          </div>
        );
      })}
    </div>
  );
};

export default Team;
