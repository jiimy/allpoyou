'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  fetchPokemonList,
  getPokemonByNameKo,
  type Pokemon,
} from '@/store/PokemonStore';
import { usePochampsStore, type PochampsBattleFormat } from '@/store/PochampsStore';
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

type PositionEntry = {
  position: number;
  name: string;
  slug: string;
  showdownId: string;
  nameKo?: string;
};

type PositionRankings = {
  date: string;
  doubles: PositionEntry[];
  singles: PositionEntry[];
};

type RankingsProgressStep = {
  id: string;
  message: string;
  current?: number;
  total?: number;
  at: number;
};

type PochamsDataProps = {
  keyword: string;
  onKeywordChange?: (value: string) => void;
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
const BATTLE_FORMATS: PochampsBattleFormat[] = ['Singles', 'Doubles'];

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

const PochamsData = ({ keyword, onKeywordChange }: PochamsDataProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<BattlePreview | null>(null);
  const [resolvedPokemon, setResolvedPokemon] = useState<Pokemon | null>(null);
  const [selection, setSelection] = useState<SelectionState>(EMPTY_SELECTION);
  const [rankings, setRankings] = useState<PositionRankings | null>(null);
  const [rankingsLoading, setRankingsLoading] = useState(false);
  const [rankingsError, setRankingsError] = useState<string | null>(null);
  const [rankingsSteps, setRankingsSteps] = useState<RankingsProgressStep[]>(
    [],
  );
  const [rankingsElapsedSec, setRankingsElapsedSec] = useState(0);

  const enabled = usePochampsStore((state) => state.enabled);
  const battleFormat = usePochampsStore((state) => state.format);
  const setFormat = usePochampsStore((state) => state.setFormat);
  const setPendingBuild = usePochamsPickStore((state) => state.setPendingBuild);
  const setPendingPokemon = usePokemonPickStore(
    (state) => state.setPendingPokemon,
  );
  const setTeamModalOpen = useTeamModalStore((state) => state.setIsOpen);

  const q = keyword.trim();
  const shouldFetch = enabled && q.length > 0;
  const shouldShowRankings = enabled && q.length === 0;

  // 포켓몬(검색어)이 바뀌면 이전 미리보기를 비워 초기 로딩으로 전환
  const [prevQuery, setPrevQuery] = useState(q);
  if (prevQuery !== q) {
    setPrevQuery(q);
    if (preview) setPreview(null);
    if (selection !== EMPTY_SELECTION) setSelection(EMPTY_SELECTION);
    if (resolvedPokemon) setResolvedPokemon(null);
  }

  useEffect(() => {
    if (!shouldShowRankings) return;

    let cancelled = false;
    const startedAt = Date.now();

    const run = async () => {
      setRankingsLoading(true);
      setRankingsError(null);
      setRankingsSteps([
        {
          id: 'start',
          message: '포챔스 랭킹 불러오기 시작…',
          at: Date.now(),
        },
      ]);
      setRankingsElapsedSec(0);

      try {
        const res = await fetch(
          '/api/pokemon-meta/rankings?limit=15&stream=1',
          { cache: 'no-store' },
        );
        if (cancelled) return;

        if (!res.ok || !res.body) {
          let message = `랭킹 조회 실패 (${res.status})`;
          try {
            const data = (await res.json()) as { error?: string };
            if (data.error) message = data.error;
          } catch {
            // ignore
          }
          setRankings(null);
          setRankingsError(message);
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let gotResult = false;

        while (true) {
          const { done, value } = await reader.read();
          if (cancelled) {
            await reader.cancel().catch(() => undefined);
            return;
          }
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() ?? '';

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed) continue;

            let event: {
              type: string;
              stage?: string;
              message?: string;
              current?: number;
              total?: number;
              data?: PositionRankings;
            };
            try {
              event = JSON.parse(trimmed) as typeof event;
            } catch {
              continue;
            }

            if (event.type === 'progress' && event.message) {
              const step: RankingsProgressStep = {
                id: `${event.stage ?? 'step'}-${Date.now()}`,
                message: event.message,
                current: event.current,
                total: event.total,
                at: Date.now(),
              };
              setRankingsSteps((prev) => {
                const last = prev[prev.length - 1];
                if (
                  last &&
                  last.message === step.message &&
                  last.current === step.current
                ) {
                  return prev;
                }
                return [...prev.slice(-12), step];
              });
              continue;
            }

            if (event.type === 'result' && event.data) {
              gotResult = true;
              setRankings({
                date: event.data.date,
                doubles: event.data.doubles ?? [],
                singles: event.data.singles ?? [],
              });
              continue;
            }

            if (event.type === 'error') {
              setRankings(null);
              setRankingsError(
                event.message ?? '랭킹을 가져오지 못했습니다.',
              );
            }
          }
        }

        if (!gotResult && !cancelled) {
          setRankings(null);
          setRankingsError('랭킹 응답이 비어 있습니다. 잠시 후 다시 시도해 주세요.');
        }
      } catch (err) {
        if (cancelled) return;
        setRankings(null);
        setRankingsError(
          err instanceof Error ? err.message : '랭킹을 가져오지 못했습니다.',
        );
      } finally {
        if (!cancelled) {
          setRankingsElapsedSec(
            Math.max(1, Math.round((Date.now() - startedAt) / 1000)),
          );
          setRankingsLoading(false);
        }
      }
    };

    const timer = window.setInterval(() => {
      setRankingsElapsedSec(
        Math.max(0, Math.floor((Date.now() - startedAt) / 1000)),
      );
    }, 500);

    void run();

    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [shouldShowRankings]);

  useEffect(() => {
    if (!shouldFetch) return;

    let cancelled = false;

    const run = async () => {
      setLoading(true);
      setError(null);

      try {
        const list = await fetchPokemonList();
        if (cancelled) return;

        const pokemon = resolvePokemonForBattle(q, list);
        if (!pokemon) {
          setPreview(null);
          setResolvedPokemon(null);
          setSelection(EMPTY_SELECTION);
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
          setSelection(EMPTY_SELECTION);
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
        setSelection(EMPTY_SELECTION);
        setError(null);
      } catch (err) {
        if (cancelled) return;
        setPreview(null);
        setResolvedPokemon(null);
        setSelection(EMPTY_SELECTION);
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

  const handleSelectRanking = (entry: PositionEntry) => {
    onKeywordChange?.(entry.nameKo || entry.name);
  };

  const renderRankingList = (title: string, items: PositionEntry[]) => (
    <section className={s.category}>
      <h3 className={s.categoryTitle}>
        {title}
        <span className={s.categoryCount}>{items.length}</span>
      </h3>
      <ol className={s.list}>
        {Array.from({ length: 15 }, (_, i) => {
          const position = i + 1;
          const entry = items.find((item) => item.position === position);
          return (
            <li key={`${title}-${position}`}>
              {entry ? (
                <button
                  type="button"
                  className={s.itemBtn}
                  onClick={() => handleSelectRanking(entry)}
                  title="클릭하면 상세 검색"
                >
                  <span className={s.rank}>{position}</span>
                  <span className={s.name}>{entry.nameKo || entry.name}</span>
                </button>
              ) : (
                <>
                  <span className={s.rank}>{position}</span>
                  <span className={s.nameMuted}>—</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );

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

  if (!enabled) return null;

  if (shouldShowRankings) {
    const activeStep = rankingsSteps[rankingsSteps.length - 1] ?? null;
    const progressRatio =
      activeStep?.current != null &&
      activeStep.total != null &&
      activeStep.total > 0
        ? Math.min(1, activeStep.current / activeStep.total)
        : null;

    return (
      <div className={s.panel}>
        {rankingsLoading ? (
          <div className={s.progressPanel} aria-live="polite">
            <div className={s.progressHeader}>
              <p className={s.progressTitle}>랭킹 순위(1–15) 불러오는 중</p>
              <span className={s.progressElapsed}>{rankingsElapsedSec}초</span>
            </div>
            <p className={s.progressNote}>
              처음 불러올 때는 시간이 걸릴 수 있어요. 새로고침하지 말고 잠시만
              기다려 주세요.
            </p>
            {progressRatio != null ? (
              <div className={s.progressBarTrack} aria-hidden>
                <div
                  className={s.progressBarFill}
                  style={{ width: `${Math.round(progressRatio * 100)}%` }}
                />
              </div>
            ) : (
              <div className={`${s.progressBarTrack} ${s.progressBarIndeterminate}`} aria-hidden>
                <div className={s.progressBarFill} />
              </div>
            )}
            <ol className={s.progressSteps}>
              {rankingsSteps.map((step, index) => {
                const isLatest = index === rankingsSteps.length - 1;
                return (
                  <li
                    key={step.id}
                    className={`${s.progressStep} ${isLatest ? s.progressStepActive : ''}`}
                  >
                    <span className={s.progressStepMark} aria-hidden>
                      {isLatest ? '…' : '✓'}
                    </span>
                    <span>
                      {step.message}
                      {step.current != null && step.total != null
                        ? ` · ${Math.round((step.current / step.total) * 100)}%`
                        : ''}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        ) : rankingsError ? (
          <p className={`${s.hint} ${s.hintError}`}>{rankingsError}</p>
        ) : rankings ? (
          <>
            <p className={s.meta}>랭킹 순위 · {rankings.date}</p>
            <div className={s.categories}>
              {renderRankingList('Singles', rankings.singles)}
              {renderRankingList('Doubles', rankings.doubles)}
            </div>
          </>
        ) : (
          <p className={s.hint}>순위 데이터가 없습니다. 잠시 후 다시 시도해 주세요.</p>
        )}
      </div>
    );
  }

  if (!shouldFetch) return null;

  const showInitialLoading = loading && !preview && !error;

  return (
    <div className={`${s.panel} ${loading && preview ? s.panelRefreshing : ''}`}>
      <div className={s.metaRow}>
        <p className={s.meta}>
          {preview
            ? `${preview.pokemonKo || preview.pokemon} · ${preview.date}`
            : resolvedPokemon
              ? resolvedPokemon.nameKo
              : q}
        </p>
        <div className={s.formatToggle} role="group" aria-label="배틀 포맷">
          {BATTLE_FORMATS.map((item) => (
            <button
              key={item}
              type="button"
              className={`${s.formatBtn} ${battleFormat === item ? s.formatBtnActive : ''}`}
              aria-pressed={battleFormat === item}
              disabled={loading}
              onClick={() => setFormat(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {showInitialLoading ? (
        <p className={s.hint}>포챔스 배틀 데이터 조회 중…</p>
      ) : error && !preview ? (
        <p className={`${s.hint} ${s.hintError}`}>{error}</p>
      ) : preview ? (
        <>
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
