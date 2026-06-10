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
import {
  EV_STAT_KEYS,
  EV_STAT_MAX,
  EV_TOTAL_MAX,
  usePokemonTeamStore,
  type EvStatKey,
  type TeamPokemonEvs,
} from '@/store/PokemonTeamStore';
import type { ItemKr } from '@/types/item';
import type { MoveDbEntry } from '@/types/move';
import type { ActiveMoveSlot, EvAdjustAction } from '@/hooks/useTeamEditor';
import { getMoveTypeKo } from '@/utils/moveDisplay';
import { getNatureEffectLabel, type NatureEntry } from '@/utils/natureList';
import s from '@/app/make-team/maekTeam.module.scss';

const MOVE_SLOT_PLACEHOLDERS = ['기술1', '기술2', '기술3', '기술4'] as const;

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

const MEGA_NAME_PREFIX = '메가 ';

/** 메가 포켓몬이면 기술 목록 조회용 이름에서 '메가 ' 접두어를 제거합니다. */
export function getMoveLookupNameKo(nameKo: string): string {
  return nameKo.startsWith(MEGA_NAME_PREFIX)
    ? nameKo.slice(MEGA_NAME_PREFIX.length)
    : nameKo;
}

/** 배울 수 있는 기술 조회에 사용할 포켓몬 id (메가 → 일반 형태) */
export function resolveMoveLookupPokemonId(
  pokemon: Pokemon,
  pokemonList: Pokemon[],
): number {
  const lookupName = getMoveLookupNameKo(pokemon.nameKo);
  if (lookupName === pokemon.nameKo) {
    return pokemon.id;
  }

  const baseForm = pokemonList.find((entry) => entry.nameKo === lookupName);
  return baseForm?.id ?? pokemon.id;
}

export function isMegaPokemonName(nameKo: string): boolean {
  return nameKo.startsWith(MEGA_NAME_PREFIX);
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
  /** store → editor 복원 중에는 true — 빈 에디터 상태가 store를 덮어쓰지 않도록 함 */
  isHydratingFromStore?: boolean;
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
  selectedNatures: (string | null)[];
  natureSearchValues: string[];
  activeNatureIndex: number | null;
  natureSuggestions: NatureEntry[];
  natureHighlightedIndex: number;
  pendingNaturePick?: string | null;
  onNatureSearchChange: (index: number, value: string) => void;
  onSelectNature: (index: number, nature: string) => void;
  onClearNature: (index: number) => void;
  onActiveNatureIndexChange: (index: number | null) => void;
  onNatureHighlightedIndexChange: (index: number) => void;
  onNatureSectionActivate: (index: number) => void;
  onNatureKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => void;
  selectedMoveIds: (number | null)[][];
  moveSearchValues: string[][];
  activeMoveSlot: ActiveMoveSlot;
  moveSuggestions: MoveDbEntry[];
  moveHighlightedIndex: number;
  pokemonMoveIdSets: Record<number, Set<number>>;
  pendingMovePick?: MoveDbEntry | null;
  onMoveSearchChange: (
    pokemonIndex: number,
    moveIndex: number,
    value: string,
  ) => void;
  onSelectMove: (
    pokemonIndex: number,
    moveIndex: number,
    move: MoveDbEntry,
  ) => void;
  onClearMove: (pokemonIndex: number, moveIndex: number) => void;
  onMoveSlotActivate: (pokemonIndex: number, moveIndex: number) => void;
  onActiveMoveSlotChange: (slot: ActiveMoveSlot) => void;
  onMoveHighlightedIndexChange: (index: number) => void;
  onMoveKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    pokemonIndex: number,
    moveIndex: number,
  ) => void;
  selectedEvs: TeamPokemonEvs[];
  onAdjustEv: (
    pokemonIndex: number,
    statKey: EvStatKey,
    action: EvAdjustAction,
  ) => void;
};

const Team: React.FC<TeamProps> = ({
  editorReady = true,
  isHydratingFromStore = false,
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
  selectedNatures,
  natureSearchValues,
  activeNatureIndex,
  natureSuggestions,
  natureHighlightedIndex,
  pendingNaturePick = null,
  onNatureSearchChange,
  onSelectNature,
  onClearNature,
  onActiveNatureIndexChange,
  onNatureHighlightedIndexChange,
  onNatureSectionActivate,
  onNatureKeyDown,
  selectedMoveIds,
  moveSearchValues,
  activeMoveSlot,
  moveSuggestions,
  moveHighlightedIndex,
  pokemonMoveIdSets,
  pendingMovePick = null,
  onMoveSearchChange,
  onSelectMove,
  onClearMove,
  onMoveSlotActivate,
  onActiveMoveSlotChange,
  onMoveHighlightedIndexChange,
  onMoveKeyDown,
  selectedEvs,
  onAdjustEv,
}) => {
  const syncActiveTeamPokemons = usePokemonTeamStore(
    (state) => state.syncActiveTeamPokemons,
  );

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const itemDropdownRefs = useRef<(HTMLLIElement | null)[]>([]);
  const natureDropdownRefs = useRef<(HTMLLIElement | null)[]>([]);
  const moveDropdownRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (!editorReady || isHydratingFromStore) return;
    const existing =
      usePokemonTeamStore.getState().getActiveTeam()?.pokemons ?? [];
    const pokemons = buildPokemonsFromEditor(
      selectedPokemons,
      selectedAbilities,
      selectedItemIds,
      existing,
      selectedMoveIds,
      selectedNatures,
      selectedEvs,
    );
    syncActiveTeamPokemons(pokemons);
  }, [
    editorReady,
    isHydratingFromStore,
    selectedPokemons,
    selectedAbilities,
    selectedItemIds,
    selectedMoveIds,
    selectedNatures,
    selectedEvs,
    syncActiveTeamPokemons,
  ]);

  const handleOutsideClick = useCallback(() => {
    onActiveIndexChange(null);
    onActiveItemIndexChange(null);
    onActiveNatureIndexChange(null);
    onActiveMoveSlotChange(null);
  }, [
    onActiveIndexChange,
    onActiveItemIndexChange,
    onActiveNatureIndexChange,
    onActiveMoveSlotChange,
  ]);

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

  useEffect(() => {
    natureDropdownRefs.current = [];
  }, [natureSuggestions]);

  useEffect(() => {
    const el = natureDropdownRefs.current[natureHighlightedIndex];
    if (el) el.scrollIntoView({ block: 'nearest' });
  }, [natureHighlightedIndex, natureSuggestions]);

  useEffect(() => {
    moveDropdownRefs.current = [];
  }, [moveSuggestions]);

  useEffect(() => {
    const el = moveDropdownRefs.current[moveHighlightedIndex];
    if (el) el.scrollIntoView({ block: 'nearest' });
  }, [moveHighlightedIndex, moveSuggestions]);

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
        const isNatureActive = activeNatureIndex === index;
        const showNatureDropdown =
          isClient && isNatureActive && selected != null;
        const hasSelectedNature = selectedNatures[index] != null;
        const highestStatLabels = selected
          ? new Set(
              [...getRowMaxStatKeys(selected)].map(
                (key) => STAT_LABEL_BY_KEY[key],
              ),
            )
          : new Set<string>();
        const pendingMoveLearnable =
          pendingMovePick != null &&
          selected != null &&
          (pokemonMoveIdSets[selected.id]?.has(pendingMovePick.id) ?? false) &&
          !selectedMoveIds[index].includes(pendingMovePick.id);

        return (
          <div key={index}>
            <div
              className={cn(s.thumbnail, {
                [s.thumbnailPickable]: pendingPokemonPick != null,
                [s.thumbnailMoveLearnable]: pendingMoveLearnable,
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
              {pendingMoveLearnable && pendingMovePick ? (
                <span className={s.moveLearnableBadge}>
                  + {pendingMovePick.koreanName}
                </span>
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
            <div
              className={cn(s.itemSection, {
                [s.itemSectionPickable]:
                  pendingNaturePick != null && selected != null,
              })}
              onClick={(e) => {
                if (!pendingNaturePick || !selected) return;
                const target = e.target as HTMLElement;
                if (target.closest('button, li')) return;
                onNatureSectionActivate(index);
              }}
            >
              {selected ? (
                <div className={s.inputWrap}>
                  <input
                    type="text"
                    className={s.fieldInput}
                    placeholder="성격 검색"
                    value={natureSearchValues[index]}
                    onChange={(e) =>
                      onNatureSearchChange(index, e.target.value)
                    }
                    onFocus={() => onNatureSectionActivate(index)}
                    onKeyDown={(e) => onNatureKeyDown(e, index)}
                    autoComplete="off"
                    data-1p-ignore
                    data-lpignore="true"
                    data-form-type="other"
                    aria-label="성격 선택"
                    suppressHydrationWarning
                  />
                  {hasSelectedNature || natureSearchValues[index] ? (
                    <button
                      type="button"
                      className={s.clearBtn}
                      onClick={() => onClearNature(index)}
                      aria-label="성격 선택 초기화"
                      tabIndex={-1}
                    >
                      ×
                    </button>
                  ) : null}
                  {showNatureDropdown && (
                    <ul className={s.dropdown}>
                      {natureSuggestions.length === 0 && (
                        <li>검색 결과 없음</li>
                      )}
                      {natureSuggestions.map((nature, i) => {
                        const isHighlighted = i === natureHighlightedIndex;
                        return (
                          <li
                            key={nature.name}
                            title={getNatureEffectLabel(nature)}
                            className={cn({
                              [s.dropdownItemHighlighted]: isHighlighted,
                            })}
                            ref={(el) => {
                              natureDropdownRefs.current[i] = el;
                            }}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              onSelectNature(index, nature.name);
                            }}
                            onMouseEnter={() =>
                              onNatureHighlightedIndexChange(i)
                            }
                          >
                            <span>{nature.name}</span>
                            <span className={s.itemDropdownDesc}>
                              {nature.up ? (
                                <span
                                  style={
                                    highestStatLabels.has(nature.up)
                                      ? { color: '#e53935', fontWeight: 700 }
                                      : undefined
                                  }
                                >
                                  {nature.up}↑
                                </span>
                              ) : null}
                              {nature.down ? <span> {nature.down}↓</span> : null}
                              {!nature.up && !nature.down ? '보정 없음' : null}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              ) : (
                <span>성격</span>
              )}
            </div>
            {MOVE_SLOT_PLACEHOLDERS.map((movePlaceholder, moveIndex) => {
              const isMoveActive =
                activeMoveSlot?.pokemon === index &&
                activeMoveSlot.move === moveIndex;
              const showMoveDropdown =
                isClient && isMoveActive && selected != null;
              const moveValue = moveSearchValues[index][moveIndex];
              const moveListLoading =
                selected != null && !(selected.id in pokemonMoveIdSets);

              return (
                <div
                  key={`move-${moveIndex}`}
                  className={cn(s.moveSection, {
                    [s.moveSectionPickable]: pendingMoveLearnable,
                  })}
                  onClick={(e) => {
                    if (!pendingMoveLearnable || !selected) return;
                    const target = e.target as HTMLElement;
                    if (target.closest('button, li')) return;
                    onMoveSlotActivate(index, moveIndex);
                  }}
                >
                  {selected ? (
                    <div className={s.inputWrap}>
                      <input
                        type="text"
                        className={s.fieldInput}
                        placeholder={movePlaceholder}
                        value={moveValue}
                        onChange={(e) =>
                          onMoveSearchChange(index, moveIndex, e.target.value)
                        }
                        onFocus={() => onMoveSlotActivate(index, moveIndex)}
                        onKeyDown={(e) => onMoveKeyDown(e, index, moveIndex)}
                        autoComplete="off"
                        data-1p-ignore
                        data-lpignore="true"
                        data-form-type="other"
                        aria-label={`${movePlaceholder} 선택`}
                        suppressHydrationWarning
                      />
                      {moveValue ? (
                        <button
                          type="button"
                          className={s.clearBtn}
                          onClick={() => onClearMove(index, moveIndex)}
                          aria-label={`${movePlaceholder} 선택 초기화`}
                          tabIndex={-1}
                        >
                          ×
                        </button>
                      ) : null}
                      {showMoveDropdown && (
                        <ul className={s.dropdown}>
                          {moveListLoading && <li>기술 목록 불러오는 중…</li>}
                          {!moveListLoading &&
                            moveSuggestions.length === 0 && (
                              <li>검색 결과 없음</li>
                            )}
                          {moveSuggestions.map((move, i) => {
                            const isHighlighted = i === moveHighlightedIndex;
                            const moveTypeKo = getMoveTypeKo(move.type);
                            return (
                              <li
                                key={move.id}
                                title={move.description ?? ''}
                                className={cn({
                                  [s.dropdownItemHighlighted]: isHighlighted,
                                })}
                                ref={(el) => {
                                  moveDropdownRefs.current[i] = el;
                                }}
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                  onSelectMove(index, moveIndex, move);
                                }}
                                onMouseEnter={() =>
                                  onMoveHighlightedIndexChange(i)
                                }
                              >
                                <span>{move.koreanName}</span>
                                <span
                                  style={{
                                    background:
                                      TYPE_COLOR[moveTypeKo] ?? '#999',
                                    color: '#fff',
                                    padding: '1px 8px',
                                    borderRadius: 10,
                                    fontSize: 11,
                                    fontWeight: 600,
                                  }}
                                >
                                  {moveTypeKo}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <span>{movePlaceholder}</span>
                  )}
                </div>
              );
            })}
            <div className={s.evSection}>
              {selected ? (
                (() => {
                  const evs = selectedEvs[index] ?? {
                    H: 0,
                    A: 0,
                    B: 0,
                    C: 0,
                    D: 0,
                    S: 0,
                    total: 0,
                  };
                  const remaining = EV_TOTAL_MAX - evs.total;
                  return (
                    <div className={s.evWrap}>
                      <div className={s.evHeader}>
                        <span className={s.evTitle}>노력치</span>
                        <span
                          className={cn(s.evTotal, {
                            [s.evTotalFull]: evs.total >= EV_TOTAL_MAX,
                          })}
                        >
                          {evs.total} / {EV_TOTAL_MAX}
                        </span>
                      </div>
                      {EV_STAT_KEYS.map((statKey) => {
                        const value = evs[statKey];
                        const canDec = value > 0;
                        const canInc =
                          value < EV_STAT_MAX && remaining > 0;
                        return (
                          <div key={statKey} className={s.evRow}>
                            <span className={s.evLabel}>
                              {STAT_LABEL_BY_KEY[statKey]}
                            </span>
                            <div className={s.evControls}>
                              <button
                                type="button"
                                className={s.evBtn}
                                disabled={!canDec}
                                onClick={() => onAdjustEv(index, statKey, 'min')}
                                aria-label={`${STAT_LABEL_BY_KEY[statKey]} 최소로`}
                                title="0으로"
                              >
                                ⏬
                              </button>
                              <button
                                type="button"
                                className={s.evBtn}
                                disabled={!canDec}
                                onClick={() => onAdjustEv(index, statKey, 'dec')}
                                aria-label={`${STAT_LABEL_BY_KEY[statKey]} 1 감소`}
                                title="-1"
                              >
                                ▼
                              </button>
                              <span className={s.evValue}>{value}</span>
                              <button
                                type="button"
                                className={s.evBtn}
                                disabled={!canInc}
                                onClick={() => onAdjustEv(index, statKey, 'inc')}
                                aria-label={`${STAT_LABEL_BY_KEY[statKey]} 1 증가`}
                                title="+1"
                              >
                                ▲
                              </button>
                              <button
                                type="button"
                                className={s.evBtn}
                                disabled={!canInc}
                                onClick={() => onAdjustEv(index, statKey, 'max')}
                                aria-label={`${STAT_LABEL_BY_KEY[statKey]} 최대로`}
                                title="최대로"
                              >
                                ⏫
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()
              ) : (
                <span>노력치</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Team;
