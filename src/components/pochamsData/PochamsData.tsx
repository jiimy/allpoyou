'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  fetchPokemonList,
  getPokemonByNameKo,
  type Pokemon,
} from '@/store/PokemonStore';
import { usePochampsStore } from '@/store/PochampsStore';
import { usePochamsPickStore } from '@/store/PochamsPickStore';
import { usePokemonPickStore } from '@/store/PokemonPickStore';
import { useTeamModalStore } from '@/store/TeamModalStore';
import { getBaseEnglishNameForDex } from '@/utils/pokemonName';
import {
  resolveEvsFromBattleItem,
  resolveItemFromBattleItem,
  resolveMoveFromBattleItem,
  resolveNatureFromBattleItem,
} from '@/utils/pochamsTeamBuild';

import s from './pochamsData.module.scss';

type BattleCategoryItem = {
  rank: number;
  name: string;
  nameEn: string;
  percentage: string;
  hp_points?: string;
  attack_points?: string;
  defense_points?: string;
  sp_atk_points?: string;
  sp_def_points?: string;
  speed_points?: string;
};

type BattleCategoryKey =
  | 'move'
  | 'held_item'
  | 'ability'
  | 'teammate'
  | 'stat_alignment'
  | 'stat_points';

type SelectableCategory = Exclude<BattleCategoryKey, 'teammate'>;

type BattleCategoryGroup = {
  category: BattleCategoryKey;
  labelKo: string;
  items: BattleCategoryItem[];
};

type BattlePreview = {
  cached: boolean;
  date: string;
  pokemon: string;
  pokemonKo: string;
  showdownId: string;
  format: string;
  storagePath: string;
  byCategory: BattleCategoryGroup[];
};

type PochamsDataProps = {
  keyword: string;
};

type SelectionState = {
  moves: BattleCategoryItem[];
  held_item: BattleCategoryItem | null;
  ability: BattleCategoryItem | null;
  nature: BattleCategoryItem | null;
  evs: BattleCategoryItem | null;
};

const EMPTY_SELECTION: SelectionState = {
  moves: [],
  held_item: null,
  ability: null,
  nature: null,
  evs: null,
};

const MAX_MOVES = 4;

const SELECTABLE = new Set<BattleCategoryKey>([
  'move',
  'held_item',
  'ability',
  'stat_alignment',
  'stat_points',
]);

const CATEGORY_LABEL: Record<SelectableCategory, string> = {
  move: '기술',
  held_item: '지닌물건',
  ability: '특성',
  stat_alignment: '성격',
  stat_points: '노력치',
};

function resolvePokemonForBattle(keyword: string, list: Pokemon[]): Pokemon | null {
  const q = keyword.trim();
  if (!q) return null;

  const exact = getPokemonByNameKo(q);
  if (exact) return exact;

  const lower = q.toLowerCase();
  return (
    list.find((p) => p.nameKo === q) ??
    list.find((p) => p.name.toLowerCase() === lower) ??
    list.find((p) => p.nameKo.includes(q)) ??
    null
  );
}

function itemKey(item: BattleCategoryItem) {
  return `${item.nameEn || item.name}::${item.rank}`;
}

function isSameItem(a: BattleCategoryItem, b: BattleCategoryItem) {
  return itemKey(a) === itemKey(b);
}

function isItemSelected(
  category: BattleCategoryKey,
  item: BattleCategoryItem,
  selection: SelectionState,
): boolean {
  if (category === 'move') {
    return selection.moves.some((m) => isSameItem(m, item));
  }
  if (category === 'held_item') {
    return !!selection.held_item && isSameItem(selection.held_item, item);
  }
  if (category === 'ability') {
    return !!selection.ability && isSameItem(selection.ability, item);
  }
  if (category === 'stat_alignment') {
    return !!selection.nature && isSameItem(selection.nature, item);
  }
  if (category === 'stat_points') {
    return !!selection.evs && isSameItem(selection.evs, item);
  }
  return false;
}

function toggleSelection(
  category: BattleCategoryKey,
  item: BattleCategoryItem,
  prev: SelectionState,
): SelectionState {
  if (category === 'move') {
    const exists = prev.moves.some((m) => isSameItem(m, item));
    if (exists) {
      return {
        ...prev,
        moves: prev.moves.filter((m) => !isSameItem(m, item)),
      };
    }
    if (prev.moves.length >= MAX_MOVES) return prev;
    return { ...prev, moves: [...prev.moves, item] };
  }

  if (category === 'held_item') {
    const selected =
      prev.held_item && isSameItem(prev.held_item, item) ? null : item;
    return { ...prev, held_item: selected };
  }

  if (category === 'ability') {
    const selected =
      prev.ability && isSameItem(prev.ability, item) ? null : item;
    return { ...prev, ability: selected };
  }

  if (category === 'stat_alignment') {
    const selected =
      prev.nature && isSameItem(prev.nature, item) ? null : item;
    return { ...prev, nature: selected };
  }

  if (category === 'stat_points') {
    const selected = prev.evs && isSameItem(prev.evs, item) ? null : item;
    return { ...prev, evs: selected };
  }

  return prev;
}

function selectionChips(selection: SelectionState): Array<{
  category: SelectableCategory;
  label: string;
  item: BattleCategoryItem;
}> {
  const chips: Array<{
    category: SelectableCategory;
    label: string;
    item: BattleCategoryItem;
  }> = [];

  for (const item of selection.moves) {
    chips.push({ category: 'move', label: CATEGORY_LABEL.move, item });
  }
  if (selection.held_item) {
    chips.push({
      category: 'held_item',
      label: CATEGORY_LABEL.held_item,
      item: selection.held_item,
    });
  }
  if (selection.ability) {
    chips.push({
      category: 'ability',
      label: CATEGORY_LABEL.ability,
      item: selection.ability,
    });
  }
  if (selection.nature) {
    chips.push({
      category: 'stat_alignment',
      label: CATEGORY_LABEL.stat_alignment,
      item: selection.nature,
    });
  }
  if (selection.evs) {
    chips.push({
      category: 'stat_points',
      label: CATEGORY_LABEL.stat_points,
      item: selection.evs,
    });
  }

  return chips;
}

function getCategoryItems(
  groups: BattleCategoryGroup[],
  category: BattleCategoryKey,
): BattleCategoryItem[] {
  return groups.find((group) => group.category === category)?.items ?? [];
}

/** 카테고리별 상위 항목으로 자동 선택 */
function buildTopSelection(groups: BattleCategoryGroup[]): SelectionState {
  const moves = getCategoryItems(groups, 'move').slice(0, MAX_MOVES);
  return {
    moves,
    held_item: getCategoryItems(groups, 'held_item')[0] ?? null,
    ability: getCategoryItems(groups, 'ability')[0] ?? null,
    nature: getCategoryItems(groups, 'stat_alignment')[0] ?? null,
    evs: getCategoryItems(groups, 'stat_points')[0] ?? null,
  };
}

const PochamsData = ({ keyword }: PochamsDataProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<BattlePreview | null>(null);
  const [resolvedPokemon, setResolvedPokemon] = useState<Pokemon | null>(null);
  const [selection, setSelection] = useState<SelectionState>(EMPTY_SELECTION);

  const enabled = usePochampsStore((state) => state.enabled);
  const battleFormat = usePochampsStore((state) => state.format);
  const setPendingBuild = usePochamsPickStore((state) => state.setPendingBuild);
  const setPendingPokemon = usePokemonPickStore(
    (state) => state.setPendingPokemon,
  );
  const setTeamModalOpen = useTeamModalStore((state) => state.setIsOpen);

  const q = keyword.trim();
  const shouldFetch = enabled && q.length > 0;

  useEffect(() => {
    if (!shouldFetch) return;

    let cancelled = false;

    const run = async () => {
      setLoading(true);
      setError(null);
      setSelection(EMPTY_SELECTION);
      setResolvedPokemon(null);

      try {
        const list = await fetchPokemonList();
        if (cancelled) return;

        const pokemon = resolvePokemonForBattle(q, list);
        if (!pokemon) {
          setPreview(null);
          setResolvedPokemon(null);
          setError(`"${q}"에 해당하는 포켓몬을 찾지 못했습니다.`);
          return;
        }

        setResolvedPokemon(pokemon);

        const slug = getBaseEnglishNameForDex(pokemon.name).toLowerCase();
        const res = await fetch(
          `/api/battle/${battleFormat}/${encodeURIComponent(slug)}`,
        );
        const data = (await res.json()) as BattlePreview & { error?: string };

        if (cancelled) return;

        if (!res.ok) {
          setPreview(null);
          setError(data.error ?? `배틀 데이터 조회 실패 (${res.status})`);
          return;
        }

        setPreview({
          cached: data.cached,
          date: data.date,
          pokemon: data.pokemon,
          pokemonKo: data.pokemonKo,
          showdownId: data.showdownId,
          format: data.format,
          storagePath: data.storagePath,
          byCategory: data.byCategory ?? [],
        });
        setError(null);
      } catch (err) {
        if (cancelled) return;
        setPreview(null);
        setResolvedPokemon(null);
        setError(
          err instanceof Error ? err.message : '배틀 데이터를 가져오지 못했습니다.',
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [shouldFetch, q, battleFormat]);

  const chips = useMemo(() => selectionChips(selection), [selection]);
  const moveCount = selection.moves.length;

  const handleAddToTeam = () => {
    if (!resolvedPokemon) return;

    const moves = selection.moves
      .map(resolveMoveFromBattleItem)
      .filter((move): move is NonNullable<typeof move> => move != null);

    const item = selection.held_item
      ? resolveItemFromBattleItem(selection.held_item)
      : null;
    const nature = selection.nature
      ? resolveNatureFromBattleItem(selection.nature)
      : null;
    const evs = selection.evs ? resolveEvsFromBattleItem(selection.evs) : null;
    const abilityName = selection.ability?.name?.trim() || null;

    setPendingBuild({
      pokemon: resolvedPokemon,
      abilityName,
      item,
      nature,
      moves,
      evs,
    });
    setPendingPokemon(resolvedPokemon);
    setTeamModalOpen(true);
  };

  const handleAutoSelect = () => {
    if (!preview) return;
    setSelection(buildTopSelection(preview.byCategory));
  };

  if (!shouldFetch) return null;

  return (
    <div className={s.panel}>
      {loading ? (
        <p className={s.hint}>포챔스 배틀 데이터 조회 중…</p>
      ) : error ? (
        <p className={`${s.hint} ${s.hintError}`}>{error}</p>
      ) : preview ? (
        <>
          <p className={s.meta}>
            {preview.pokemonKo || preview.pokemon} · {preview.format} ·{' '}
            {preview.date}
          </p>

          {chips.length > 0 ? (
            <div className={s.selection}>
              <div className={s.selectionHeader}>
                <span className={s.selectionTitle}>선택</span>
                <span className={s.selectionHint}>
                  기술 {moveCount}/{MAX_MOVES} · 클릭으로 해제
                </span>
                <button
                  type="button"
                  className={s.selectionAdd}
                  onClick={handleAddToTeam}
                  disabled={!resolvedPokemon}
                >
                  팀에 추가
                </button>
                <button
                  type="button"
                  className={s.selectionClear}
                  onClick={() => setSelection(EMPTY_SELECTION)}
                >
                  전체 해제
                </button>
              </div>
              <ul className={s.selectionList}>
                {chips.map(({ category, label, item }) => (
                  <li key={`${category}-${itemKey(item)}`}>
                    <button
                      type="button"
                      className={s.selectionChip}
                      onClick={() =>
                        setSelection((prev) =>
                          toggleSelection(category, item, prev),
                        )
                      }
                      title="클릭하면 선택 해제"
                    >
                      <span className={s.selectionChipCat}>{label}</span>
                      <span className={s.selectionChipName}>{item.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className={s.selectionEmptyRow}>
              <p className={s.selectionEmpty}>항목을 클릭해 선택 후 팀에 추가할 수 있습니다.</p>
              <button
                type="button"
                className={s.selectionAdd}
                onClick={handleAutoSelect}
              >
                자동 선택
              </button>
            </div>
          )}

          <div className={s.categories}>
            {preview.byCategory.map((group) => {
              const selectable = SELECTABLE.has(group.category);
              return (
                <section key={group.category} className={s.category}>
                  <h3 className={s.categoryTitle}>
                    {group.labelKo}
                    <span className={s.categoryCount}>{group.items.length}</span>
                    {group.category === 'move' ? (
                      <span className={s.categoryPick}>
                        {moveCount}/{MAX_MOVES}
                      </span>
                    ) : null}
                  </h3>
                  <ol className={s.list}>
                    {group.items.map((item) => {
                      const selected = isItemSelected(
                        group.category,
                        item,
                        selection,
                      );
                      const moveFull =
                        group.category === 'move' &&
                        !selected &&
                        moveCount >= MAX_MOVES;

                      return (
                        <li
                          key={`${group.category}-${item.rank}-${item.nameEn || item.name}`}
                        >
                          {selectable ? (
                            <button
                              type="button"
                              className={`${s.itemBtn} ${selected ? s.itemSelected : ''} ${moveFull ? s.itemDisabled : ''}`}
                              onClick={() =>
                                setSelection((prev) =>
                                  toggleSelection(group.category, item, prev),
                                )
                              }
                              disabled={moveFull}
                              title={
                                moveFull
                                  ? `기술은 최대 ${MAX_MOVES}개까지 선택 가능`
                                  : selected
                                    ? '클릭하면 선택 해제'
                                    : '클릭하면 선택'
                              }
                            >
                              <span className={s.rank}>{item.rank}</span>
                              <span
                                className={s.name}
                                title={item.nameEn || undefined}
                              >
                                {item.name}
                              </span>
                              {item.percentage ? (
                                <span className={s.pct}>{item.percentage}</span>
                              ) : null}
                            </button>
                          ) : (
                            <>
                              <span className={s.rank}>{item.rank}</span>
                              <span
                                className={s.name}
                                title={item.nameEn || undefined}
                              >
                                {item.name}
                              </span>
                              {item.percentage ? (
                                <span className={s.pct}>{item.percentage}</span>
                              ) : null}
                            </>
                          )}
                        </li>
                      );
                    })}
                  </ol>
                </section>
              );
            })}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default PochamsData;
