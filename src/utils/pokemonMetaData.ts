import 'server-only';

import { createAdminClient } from '@/utils/supabase/admin';
import {
  BATTLE_STORAGE_BUCKET,
  csvToRows,
  getSeoulDateString,
  normalizePokemonSlug,
  rowsToCsv,
  type BattleRow,
} from '@/utils/battleData';
import { resolvePokemonNameKo } from '@/utils/battleLocalize';
import { POCHAMS_POKEMON_DATA } from '@/components/pochamsData/PochamsPokemonData';
import { resolvePochampsStorageSlug } from '@/utils/pochampsMoves';

const CHAMPIONS_POKEMON_BASE = 'https://championsbattledata.com/api/pokemon';
const CHAMPIONS_ASSET_BASE = 'https://championsbattledata.com';

export type ChampionsPokemonBattleCsv = {
  season?: string;
  format?: string;
  path?: string;
  date?: string;
  daily?: boolean;
};

export type ChampionsPokemonPrimary = {
  pokemon_name?: string;
  title?: string;
  form_name?: string;
  saved_name?: string;
  slug?: string;
  form_kind?: string;
  types?: string[];
  types_raw?: string;
  abilities?: string;
  hidden_ability?: string;
  hp?: number;
  attack?: number;
  defense?: number;
  sp_attack?: number;
  sp_defense?: number;
  speed?: number;
  base_stat_total?: number;
  image_path?: string;
};

export type ChampionsBattleSummaryTopItem = {
  pokemon?: string;
  column_position?: number;
  position?: number;
  category?: string;
  rank?: number;
  name?: string;
};

export type ChampionsBattleSummaryFormat = {
  top?: Partial<
    Record<
      'move' | 'held_item' | 'teammate' | 'stat_alignment' | 'stat_points' | 'ability',
      ChampionsBattleSummaryTopItem
    >
  >;
};

export type ChampionsPokemonResponse = {
  name?: string;
  battleName?: string;
  slug?: string;
  showdownId?: string;
  showdownName?: string;
  metadataCsv?: string;
  battleDataCsvs?: ChampionsPokemonBattleCsv[];
  learnableMoveNames?: string[];
  summary?: {
    dex?: number | null;
    sprite?: string;
    types?: string[];
    primary?: ChampionsPokemonPrimary;
    forms?: ChampionsPokemonPrimary[];
    battleSummary?: {
      Current?: {
        Doubles?: ChampionsBattleSummaryFormat;
        Singles?: ChampionsBattleSummaryFormat;
      };
    };
  };
};

export type PokemonPositionEntry = {
  position: number;
  name: string;
  slug: string;
  showdownId: string;
  nameKo?: string;
};

export type PokemonPositionRankings = {
  date: string;
  cached: boolean;
  doubles: PokemonPositionEntry[];
  singles: PokemonPositionEntry[];
};

export type PokemonMetaResult = {
  cached: boolean;
  date: string;
  pokemon: string;
  slug: string;
  showdownId: string;
  storagePath: string;
  columns: string[];
  rows: BattleRow[];
};

const POKEMON_META_CSV_COLUMNS = [
  'category',
  'rank',
  'name',
  'slug',
  'showdown_id',
  'battle_name',
  'types',
  'abilities',
  'hidden_ability',
  'form_kind',
  'hp',
  'attack',
  'defense',
  'sp_attack',
  'sp_defense',
  'speed',
  'base_stat_total',
  'sprite',
  'season',
  'format',
  'battle_date',
  'path',
  'daily',
] as const;

export function buildPokemonMetaStoragePath(
  pokemonSlug: string,
  date: string,
): string {
  return `Pokemon/${pokemonSlug}/${date}.csv`;
}

export function buildPokemonRankingsStoragePath(date: string): string {
  return `Pokemon/rankings/${date}.csv`;
}

const RANKINGS_CSV_COLUMNS = [
  'format',
  'position',
  'name',
  'slug',
  'showdown_id',
  'name_ko',
] as const;

/** battleSummary.Current.{Doubles|Singles}.top.*.position */
export function extractCurrentPositions(data: ChampionsPokemonResponse): {
  doubles: number | null;
  singles: number | null;
} {
  const current = data.summary?.battleSummary?.Current;

  const readPos = (format: ChampionsBattleSummaryFormat | undefined): number | null => {
    if (!format?.top) return null;
    for (const key of [
      'move',
      'held_item',
      'ability',
      'teammate',
      'stat_alignment',
      'stat_points',
    ] as const) {
      const pos = format.top[key]?.position ?? format.top[key]?.column_position;
      if (typeof pos === 'number' && Number.isFinite(pos) && pos > 0) {
        return pos;
      }
    }
    return null;
  };

  return {
    doubles: readPos(current?.Doubles),
    singles: readPos(current?.Singles),
  };
}

export async function fetchChampionsPokemonData(
  pokemonSlug: string,
): Promise<ChampionsPokemonResponse> {
  const url = `${CHAMPIONS_POKEMON_BASE}/${encodeURIComponent(pokemonSlug)}`;
  const res = await fetch(url, {
    headers: { Accept: 'application/json' },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(
      `championsbattledata pokemon 요청 실패: ${res.status} ${res.statusText} (${url})`,
    );
  }

  return (await res.json()) as ChampionsPokemonResponse;
}

/** API JSON → CSV 행 (summary / move / battle_csv) */
export function championsPokemonToRows(
  data: ChampionsPokemonResponse,
): BattleRow[] {
  const rows: BattleRow[] = [];
  const primary = data.summary?.primary;
  const types =
    primary?.types_raw ||
    primary?.types?.join('/') ||
    data.summary?.types?.join('/') ||
    '';

  rows.push({
    category: 'summary',
    rank: 1,
    name: data.name ?? primary?.pokemon_name ?? '',
    slug: data.slug ?? primary?.slug ?? '',
    showdown_id: data.showdownId ?? '',
    battle_name: data.battleName ?? data.showdownName ?? '',
    types,
    abilities: primary?.abilities ?? '',
    hidden_ability: primary?.hidden_ability ?? '',
    form_kind: primary?.form_kind ?? '',
    hp: primary?.hp ?? '',
    attack: primary?.attack ?? '',
    defense: primary?.defense ?? '',
    sp_attack: primary?.sp_attack ?? '',
    sp_defense: primary?.sp_defense ?? '',
    speed: primary?.speed ?? '',
    base_stat_total: primary?.base_stat_total ?? '',
    sprite: data.summary?.sprite ?? primary?.image_path ?? '',
    season: '',
    format: '',
    battle_date: '',
    path: data.metadataCsv ?? '',
    daily: '',
  });

  const positions = extractCurrentPositions(data);
  if (positions.doubles != null) {
    rows.push({
      category: 'battle_summary',
      rank: positions.doubles,
      name: data.name ?? '',
      slug: data.slug ?? '',
      showdown_id: data.showdownId ?? '',
      battle_name: data.battleName ?? '',
      types: '',
      abilities: '',
      hidden_ability: '',
      form_kind: '',
      hp: '',
      attack: '',
      defense: '',
      sp_attack: '',
      sp_defense: '',
      speed: '',
      base_stat_total: '',
      sprite: '',
      season: 'Current',
      format: 'Doubles',
      battle_date: '',
      path: '',
      daily: '',
    });
  }
  if (positions.singles != null) {
    rows.push({
      category: 'battle_summary',
      rank: positions.singles,
      name: data.name ?? '',
      slug: data.slug ?? '',
      showdown_id: data.showdownId ?? '',
      battle_name: data.battleName ?? '',
      types: '',
      abilities: '',
      hidden_ability: '',
      form_kind: '',
      hp: '',
      attack: '',
      defense: '',
      sp_attack: '',
      sp_defense: '',
      speed: '',
      base_stat_total: '',
      sprite: '',
      season: 'Current',
      format: 'Singles',
      battle_date: '',
      path: '',
      daily: '',
    });
  }

  (data.summary?.forms ?? []).forEach((form, index) => {
    rows.push({
      category: 'form',
      rank: index + 1,
      name: form.title ?? form.form_name ?? form.pokemon_name ?? '',
      slug: form.slug ?? '',
      showdown_id: data.showdownId ?? '',
      battle_name: form.saved_name ?? '',
      types: form.types_raw || form.types?.join('/') || '',
      abilities: form.abilities ?? '',
      hidden_ability: form.hidden_ability ?? '',
      form_kind: form.form_kind ?? '',
      hp: form.hp ?? '',
      attack: form.attack ?? '',
      defense: form.defense ?? '',
      sp_attack: form.sp_attack ?? '',
      sp_defense: form.sp_defense ?? '',
      speed: form.speed ?? '',
      base_stat_total: form.base_stat_total ?? '',
      sprite: form.image_path ?? '',
      season: '',
      format: '',
      battle_date: '',
      path: '',
      daily: '',
    });
  });

  // API 응답의 learnableMoveNames → CSV category=learnable_move
  (data.learnableMoveNames ?? []).forEach((move, index) => {
    rows.push({
      category: 'learnable_move',
      rank: index + 1,
      name: move,
      slug: data.slug ?? '',
      showdown_id: data.showdownId ?? '',
      battle_name: '',
      types: '',
      abilities: '',
      hidden_ability: '',
      form_kind: '',
      hp: '',
      attack: '',
      defense: '',
      sp_attack: '',
      sp_defense: '',
      speed: '',
      base_stat_total: '',
      sprite: '',
      season: '',
      format: '',
      battle_date: '',
      path: '',
      daily: '',
    });
  });

  (data.battleDataCsvs ?? []).forEach((item, index) => {
    rows.push({
      category: 'battle_csv',
      rank: index + 1,
      name: data.name ?? '',
      slug: data.slug ?? '',
      showdown_id: data.showdownId ?? '',
      battle_name: '',
      types: '',
      abilities: '',
      hidden_ability: '',
      form_kind: '',
      hp: '',
      attack: '',
      defense: '',
      sp_attack: '',
      sp_defense: '',
      speed: '',
      base_stat_total: '',
      sprite: '',
      season: item.season ?? '',
      format: item.format ?? '',
      battle_date: item.date ?? '',
      path: item.path ?? '',
      daily: item.daily == null ? '' : String(item.daily),
    });
  });

  return rows;
}

async function downloadTodayCsv(storagePath: string): Promise<string | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase.storage
    .from(BATTLE_STORAGE_BUCKET)
    .download(storagePath);

  if (error || !data) return null;
  return data.text();
}

function getSeoulDateDaysAgo(daysAgo: number, now = new Date()): string {
  return getSeoulDateString(new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000));
}

function parseRankingsCsv(
  csv: string,
  date: string,
  limit: number,
): PokemonPositionRankings | null {
  const { rows } = csvToRows(csv);
  const doubles: PokemonPositionEntry[] = [];
  const singles: PokemonPositionEntry[] = [];

  for (const row of rows) {
    const position = Number(row.position);
    if (!Number.isFinite(position) || position < 1 || position > limit) continue;
    const entry: PokemonPositionEntry = {
      position,
      name: String(row.name ?? ''),
      slug: String(row.slug ?? ''),
      showdownId: String(row.showdown_id ?? ''),
      nameKo: String(row.name_ko || '') || undefined,
    };
    if (String(row.format) === 'Doubles') doubles.push(entry);
    if (String(row.format) === 'Singles') singles.push(entry);
  }

  doubles.sort((a, b) => a.position - b.position);
  singles.sort((a, b) => a.position - b.position);

  if (doubles.length === 0 && singles.length === 0) return null;

  return {
    date,
    cached: true,
    doubles: doubles.slice(0, limit),
    singles: singles.slice(0, limit),
  };
}

async function findLatestRankingsCsv(
  limit: number,
): Promise<PokemonPositionRankings | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase.storage
    .from(BATTLE_STORAGE_BUCKET)
    .list('Pokemon/rankings', {
      limit: 30,
      sortBy: { column: 'name', order: 'desc' },
    });

  if (error || !data) return null;

  const files = data
    .map((item) => item.name)
    .filter((name): name is string => !!name && /^\d{4}-\d{2}-\d{2}\.csv$/.test(name))
    .sort((a, b) => b.localeCompare(a));

  for (const fileName of files) {
    const date = fileName.replace(/\.csv$/, '');
    const csv = await downloadTodayCsv(buildPokemonRankingsStoragePath(date));
    if (!csv) continue;
    const parsed = parseRankingsCsv(csv, date, limit);
    if (parsed) return parsed;
  }

  return null;
}

async function deleteStorageFiles(paths: string[]): Promise<void> {
  const targets = paths.filter((path) => path.trim().length > 0);
  if (targets.length === 0) return;

  const supabase = createAdminClient();
  const { error } = await supabase.storage
    .from(BATTLE_STORAGE_BUCKET)
    .remove(targets);

  if (error) {
    // 파일이 없어도 무시 — 없거나 권한 이슈만 로그
    console.warn('[pokemonMetaData] storage remove:', error.message, targets);
  }
}

async function uploadCsv(storagePath: string, csv: string): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase.storage
    .from(BATTLE_STORAGE_BUCKET)
    .upload(storagePath, csv, {
      contentType: 'text/csv; charset=utf-8',
      upsert: true,
      cacheControl: '86400',
    });

  if (error) {
    throw new Error(`Supabase Storage 업로드 실패: ${error.message}`);
  }
}

/**
 * championsbattledata `/api/pokemon/:slug` 호출 후 CSV를 Storage에 저장합니다.
 *
 * - 기본: 당일(KST) CSV에 battle_summary + learnable_move 가 있으면 재사용
 * - forceRefresh: 기존 당일 CSV를 지우고 항상 새로 받아 덮어씀 (일일 cron용)
 */
export async function getDailyPokemonMetaData(
  pokemonSlug: string,
  options?: { forceRefresh?: boolean },
): Promise<PokemonMetaResult> {
  const slug = normalizePokemonSlug(pokemonSlug);
  const date = getSeoulDateString();
  const storagePath = buildPokemonMetaStoragePath(slug, date);
  const metaPath = `Pokemon/${slug}/${date}-metadata.csv`;

  if (!options?.forceRefresh) {
    const cachedCsv = await downloadTodayCsv(storagePath);
    if (cachedCsv) {
      const { rows } = csvToRows(cachedCsv);
      const hasBattleSummary = rows.some(
        (row) => String(row.category) === 'battle_summary',
      );
      const hasLearnable = rows.some((row) => isLearnableMoveRow(row.category));
      // learnable 이 비어 있으면 불완전 캐시로 보고 재수집
      if (hasBattleSummary && hasLearnable) {
        return {
          cached: true,
          date,
          pokemon: String(rows.find((r) => r.category === 'summary')?.name ?? slug),
          slug,
          showdownId: String(
            rows.find((r) => r.category === 'summary')?.showdown_id ?? slug,
          ),
          storagePath,
          columns: [...POKEMON_META_CSV_COLUMNS],
          rows,
        };
      }
    }
  } else {
    await deleteStorageFiles([storagePath, metaPath]);
  }

  const fresh = await fetchChampionsPokemonData(slug);
  const rows = championsPokemonToRows(fresh);
  const csv = rowsToCsv([...POKEMON_META_CSV_COLUMNS], rows);
  await uploadCsv(storagePath, csv);

  if (fresh.metadataCsv) {
    try {
      const metaUrl = `${CHAMPIONS_ASSET_BASE}/${fresh.metadataCsv.replace(/^\/+/, '')}`;
      const metaRes = await fetch(metaUrl, { cache: 'no-store' });
      if (metaRes.ok) {
        const metaCsv = await metaRes.text();
        await uploadCsv(metaPath, metaCsv);
      }
    } catch {
      // 메타 원본 CSV는 선택 사항
    }
  }

  return {
    cached: false,
    date,
    pokemon: fresh.name ?? slug,
    slug: fresh.slug ?? slug,
    showdownId: fresh.showdownId ?? slug,
    storagePath,
    columns: [...POKEMON_META_CSV_COLUMNS],
    rows,
  };
}

function sortAndSlicePositions(
  map: Map<number, PokemonPositionEntry>,
  limit: number,
): PokemonPositionEntry[] {
  return [...map.entries()]
    .filter(([pos]) => pos >= 1 && pos <= limit)
    .sort((a, b) => a[0] - b[0])
    .map(([, entry]) => entry)
    .slice(0, limit);
}

async function collectPositionsFromPokemonCsvs(
  date: string,
  limit: number,
): Promise<{ doubles: PokemonPositionEntry[]; singles: PokemonPositionEntry[] }> {
  const doubles = new Map<number, PokemonPositionEntry>();
  const singles = new Map<number, PokemonPositionEntry>();

  for (const displayName of POCHAMS_POKEMON_DATA) {
    const slug = normalizePokemonSlug(displayName);
    const csv = await downloadTodayCsv(buildPokemonMetaStoragePath(slug, date));
    if (!csv) continue;

    const { rows } = csvToRows(csv);
    for (const row of rows) {
      if (String(row.category) !== 'battle_summary') continue;
      const position = Number(row.rank);
      if (!Number.isFinite(position) || position < 1 || position > limit) continue;

      const entry: PokemonPositionEntry = {
        position,
        name: String(row.name || displayName),
        slug: String(row.slug || slug),
        showdownId: String(row.showdown_id || slug),
        nameKo: undefined,
      };

      const format = String(row.format);
      if (format === 'Doubles' && !doubles.has(position)) doubles.set(position, entry);
      if (format === 'Singles' && !singles.has(position)) singles.set(position, entry);
    }
  }

  return {
    doubles: sortAndSlicePositions(doubles, limit),
    singles: sortAndSlicePositions(singles, limit),
  };
}

async function localizeRankings(
  rankings: PokemonPositionRankings,
): Promise<PokemonPositionRankings> {
  const localize = async (list: PokemonPositionEntry[]) =>
    Promise.all(
      list.map(async (entry) => ({
        ...entry,
        nameKo: entry.nameKo ?? (await resolvePokemonNameKo(entry.name)),
      })),
    );

  return {
    ...rankings,
    doubles: await localize(rankings.doubles),
    singles: await localize(rankings.singles),
  };
}

/**
 * Doubles/Singles position 1~limit 랭킹.
 * 1) 오늘(KST) rankings CSV
 * 2) 어제 rankings CSV
 * 3) Storage 내 가장 최근 rankings CSV
 *
 * 페이지 로드에서 235개 개별 CSV를 순회하지 않습니다(너무 느림).
 */
export async function getDailyPositionRankings(
  limit = 15,
): Promise<PokemonPositionRankings> {
  const date = getSeoulDateString();

  const todayCsv = await downloadTodayCsv(buildPokemonRankingsStoragePath(date));
  if (todayCsv) {
    const parsed = parseRankingsCsv(todayCsv, date, limit);
    if (parsed) return localizeRankings(parsed);
  }

  const yesterday = getSeoulDateDaysAgo(1);
  const yesterdayCsv = await downloadTodayCsv(
    buildPokemonRankingsStoragePath(yesterday),
  );
  if (yesterdayCsv) {
    const parsed = parseRankingsCsv(yesterdayCsv, yesterday, limit);
    if (parsed) return localizeRankings(parsed);
  }

  const latest = await findLatestRankingsCsv(limit);
  if (latest) return localizeRankings(latest);

  return { date, cached: false, doubles: [], singles: [] };
}

export async function saveDailyPositionRankings(
  rankings: PokemonPositionRankings,
): Promise<string> {
  const path = buildPokemonRankingsStoragePath(rankings.date);
  const rows: BattleRow[] = [
    ...rankings.doubles.map((entry) => ({
      format: 'Doubles',
      position: entry.position,
      name: entry.name,
      slug: entry.slug,
      showdown_id: entry.showdownId,
      name_ko: entry.nameKo ?? '',
    })),
    ...rankings.singles.map((entry) => ({
      format: 'Singles',
      position: entry.position,
      name: entry.name,
      slug: entry.slug,
      showdown_id: entry.showdownId,
      name_ko: entry.nameKo ?? '',
    })),
  ];
  await uploadCsv(path, rowsToCsv([...RANKINGS_CSV_COLUMNS], rows));
  return path;
}

/**
 * POCHAMS_POKEMON_DATA 전수 API 조회로 position 랭킹 CSV만 빠르게 재생성합니다.
 * (개별 Pokemon CSV 전체 갱신은 하지 않음)
 */
export async function rebuildDailyPositionRankingsFromApi(options?: {
  limit?: number;
  concurrency?: number;
}): Promise<PokemonPositionRankings> {
  const limit = options?.limit ?? 15;
  const concurrency = Math.max(1, options?.concurrency ?? 8);
  const date = getSeoulDateString();
  const doubles = new Map<number, PokemonPositionEntry>();
  const singles = new Map<number, PokemonPositionEntry>();

  const names = [...POCHAMS_POKEMON_DATA];

  for (let start = 0; start < names.length; start += concurrency) {
    const chunk = names.slice(start, start + concurrency);
    const settled = await Promise.allSettled(
      chunk.map(async (displayName) => {
        const slug = normalizePokemonSlug(displayName);
        const data = await fetchChampionsPokemonData(slug);
        return { displayName, slug, data };
      }),
    );

    for (const result of settled) {
      if (result.status !== 'fulfilled') continue;
      const { data } = result.value;
      const positions = extractCurrentPositions(data);
      const base = {
        name: data.name ?? result.value.displayName,
        slug: data.slug ?? result.value.slug,
        showdownId: data.showdownId ?? result.value.slug,
      };

      if (
        positions.doubles != null &&
        positions.doubles >= 1 &&
        positions.doubles <= limit &&
        !doubles.has(positions.doubles)
      ) {
        doubles.set(positions.doubles, {
          ...base,
          position: positions.doubles,
        });
      }
      if (
        positions.singles != null &&
        positions.singles >= 1 &&
        positions.singles <= limit &&
        !singles.has(positions.singles)
      ) {
        singles.set(positions.singles, {
          ...base,
          position: positions.singles,
        });
      }
    }
  }

  const localized = await localizeRankings({
    date,
    cached: false,
    doubles: sortAndSlicePositions(doubles, limit),
    singles: sortAndSlicePositions(singles, limit),
  });
  await deleteStorageFiles([buildPokemonRankingsStoragePath(date)]);
  await saveDailyPositionRankings(localized);
  return localized;
}

const MOVES_INDEX_CSV_COLUMNS = ['name', 'slug'] as const;

export function buildPokemonMovesIndexStoragePath(date: string): string {
  return `Pokemon/moves/${date}.csv`;
}

export type PochampsMovesIndex = {
  date: string;
  cached: boolean;
  names: string[];
};

function parseMovesIndexCsv(csv: string, date: string): PochampsMovesIndex | null {
  const { rows } = csvToRows(csv);
  const names: string[] = [];
  const seen = new Set<string>();

  for (const row of rows) {
    const name = String(row.name ?? '').trim();
    if (!name) continue;
    const key = name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    names.push(name);
  }

  if (names.length === 0) return null;
  return { date, cached: true, names };
}

async function findLatestMovesIndexCsv(): Promise<PochampsMovesIndex | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase.storage
    .from(BATTLE_STORAGE_BUCKET)
    .list('Pokemon/moves', {
      limit: 30,
      sortBy: { column: 'name', order: 'desc' },
    });

  if (error || !data) return null;

  const files = data
    .map((item) => item.name)
    .filter((name): name is string => !!name && /^\d{4}-\d{2}-\d{2}\.csv$/.test(name))
    .sort((a, b) => b.localeCompare(a));

  for (const fileName of files) {
    const date = fileName.replace(/\.csv$/, '');
    const csv = await downloadTodayCsv(buildPokemonMovesIndexStoragePath(date));
    if (!csv) continue;
    const parsed = parseMovesIndexCsv(csv, date);
    if (parsed) return parsed;
  }

  return null;
}

function isLearnableMoveRow(category: unknown): boolean {
  const value = String(category);
  // learnable_move: 신규 저장분
  // move: 기존 CSV (learnableMoveNames에서 변환해 둔 행)
  return value === 'learnable_move' || value === 'move';
}

function toMoveSlug(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export type PochampsMoveLearner = {
  moveName: string;
  moveSlug: string;
  pokemonName: string;
  pokemonSlug: string;
};

type LearnableMoveGraph = {
  moveNames: string[];
  learners: PochampsMoveLearner[];
};

const LEARNERS_CSV_COLUMNS = [
  'move_name',
  'move_slug',
  'pokemon_name',
  'pokemon_slug',
] as const;

export function buildPokemonMoveLearnersStoragePath(date: string): string {
  return `Pokemon/move-learners/${date}.csv`;
}

async function collectLearnableMoveGraph(
  date: string,
  concurrency = 10,
): Promise<LearnableMoveGraph> {
  const moveNames = new Set<string>();
  const learners: PochampsMoveLearner[] = [];
  const learnerKeys = new Set<string>();
  const list = [...POCHAMS_POKEMON_DATA];
  const fallbackDate = getSeoulDateDaysAgo(1);

  for (let start = 0; start < list.length; start += concurrency) {
    const chunk = list.slice(start, start + concurrency);
    const settled = await Promise.allSettled(
      chunk.map(async (displayName) => {
        const slug = normalizePokemonSlug(displayName);
        const primaryCsv = await downloadTodayCsv(
          buildPokemonMetaStoragePath(slug, date),
        );
        const primaryRows = primaryCsv ? csvToRows(primaryCsv).rows : [];
        const primaryLearnable = primaryRows.some((row) =>
          isLearnableMoveRow(row.category),
        );

        // 당일 CSV에 learnable이 없으면 어제 파일로 보완
        let rows = primaryRows;
        if (!primaryLearnable && fallbackDate !== date) {
          const fallbackCsv = await downloadTodayCsv(
            buildPokemonMetaStoragePath(slug, fallbackDate),
          );
          if (fallbackCsv) {
            const fallbackRows = csvToRows(fallbackCsv).rows;
            if (fallbackRows.some((row) => isLearnableMoveRow(row.category))) {
              rows = fallbackRows;
            }
          }
        }

        return { displayName, slug, rows };
      }),
    );

    for (const result of settled) {
      if (result.status !== 'fulfilled' || result.value.rows.length === 0) {
        continue;
      }
      const { displayName, slug, rows } = result.value;
      const summaryName = String(
        rows.find((row) => String(row.category) === 'summary')?.name ??
          displayName,
      ).trim();

      for (const row of rows) {
        if (!isLearnableMoveRow(row.category)) continue;
        const moveName = String(row.name ?? '').trim();
        if (!moveName) continue;

        moveNames.add(moveName);
        const moveSlug = toMoveSlug(moveName);
        const key = `${moveSlug}::${slug}`;
        if (learnerKeys.has(key)) continue;
        learnerKeys.add(key);
        learners.push({
          moveName,
          moveSlug,
          pokemonName: summaryName || displayName,
          pokemonSlug: slug,
        });
      }
    }
  }

  return {
    moveNames: [...moveNames].sort((a, b) => a.localeCompare(b)),
    learners,
  };
}

export async function savePochampsMovesIndex(
  index: PochampsMovesIndex,
): Promise<string> {
  const path = buildPokemonMovesIndexStoragePath(index.date);
  const rows = index.names.map((name) => ({
    name,
    slug: toMoveSlug(name),
  }));
  await uploadCsv(path, rowsToCsv([...MOVES_INDEX_CSV_COLUMNS], rows));
  return path;
}

export async function savePochampsMoveLearnersIndex(
  date: string,
  learners: PochampsMoveLearner[],
): Promise<string> {
  const path = buildPokemonMoveLearnersStoragePath(date);
  const rows = learners.map((entry) => ({
    move_name: entry.moveName,
    move_slug: entry.moveSlug,
    pokemon_name: entry.pokemonName,
    pokemon_slug: entry.pokemonSlug,
  }));
  await uploadCsv(path, rowsToCsv([...LEARNERS_CSV_COLUMNS], rows));
  return path;
}

/**
 * Pokemon/{slug}/{date}.csv 의 learnableMoveNames 행을 모아
 * 기술 인덱스 + (기술→포켓몬) learners 인덱스를 만듭니다.
 */
export async function rebuildPochampsMovesIndexFromStorage(options?: {
  concurrency?: number;
}): Promise<PochampsMovesIndex> {
  const concurrency = options?.concurrency ?? 10;
  const today = getSeoulDateString();
  const yesterday = getSeoulDateDaysAgo(1);

  let graph = await collectLearnableMoveGraph(today, concurrency);
  let date = today;

  if (graph.moveNames.length === 0) {
    graph = await collectLearnableMoveGraph(yesterday, concurrency);
    date = yesterday;
  }

  const index: PochampsMovesIndex = {
    date: today,
    cached: false,
    names: graph.moveNames,
  };

  if (graph.moveNames.length > 0) {
    await deleteStorageFiles([
      buildPokemonMovesIndexStoragePath(today),
      buildPokemonMoveLearnersStoragePath(today),
    ]);
    await savePochampsMovesIndex(index);
    await savePochampsMoveLearnersIndex(today, graph.learners);
    return index;
  }

  return { date, cached: false, names: [] };
}

async function loadMoveLearnersCsv(date: string): Promise<PochampsMoveLearner[] | null> {
  const csv = await downloadTodayCsv(buildPokemonMoveLearnersStoragePath(date));
  if (!csv) return null;

  const { rows } = csvToRows(csv);
  const learners: PochampsMoveLearner[] = [];
  for (const row of rows) {
    const moveName = String(row.move_name ?? '').trim();
    const moveSlug = String(row.move_slug ?? toMoveSlug(moveName)).trim();
    const pokemonName = String(row.pokemon_name ?? '').trim();
    const pokemonSlug = String(row.pokemon_slug ?? '').trim();
    if (!moveSlug || !pokemonSlug) continue;
    learners.push({ moveName, moveSlug, pokemonName, pokemonSlug });
  }
  return learners;
}

async function findLatestMoveLearnersCsv(): Promise<{
  date: string;
  learners: PochampsMoveLearner[];
} | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase.storage
    .from(BATTLE_STORAGE_BUCKET)
    .list('Pokemon/move-learners', {
      limit: 30,
      sortBy: { column: 'name', order: 'desc' },
    });

  if (error || !data) return null;

  const files = data
    .map((item) => item.name)
    .filter((name): name is string => !!name && /^\d{4}-\d{2}-\d{2}\.csv$/.test(name))
    .sort((a, b) => b.localeCompare(a));

  for (const fileName of files) {
    const date = fileName.replace(/\.csv$/, '');
    const learners = await loadMoveLearnersCsv(date);
    if (learners && learners.length > 0) {
      return { date, learners };
    }
  }

  return null;
}

/**
 * learnableMoveNames 기준으로 해당 기술을 가진 포켓몬 목록을 반환합니다.
 */
export async function getPochampsLearnersForMoveKeys(
  moveKeys: string[],
): Promise<{ date: string; learners: PochampsMoveLearner[] }> {
  const keys = new Set(
    moveKeys.map((key) => toMoveSlug(key)).filter((key) => key.length > 0),
  );
  if (keys.size === 0) {
    return { date: getSeoulDateString(), learners: [] };
  }

  const today = getSeoulDateString();
  const yesterday = getSeoulDateDaysAgo(1);

  let date = today;
  let learners = await loadMoveLearnersCsv(today);
  if (!learners) {
    learners = await loadMoveLearnersCsv(yesterday);
    if (learners) date = yesterday;
  }

  if (!learners) {
    const latest = await findLatestMoveLearnersCsv();
    if (latest) {
      learners = latest.learners;
      date = latest.date;
    }
  }

  if (!learners) {
    const rebuilt = await rebuildPochampsMovesIndexFromStorage();
    learners = (await loadMoveLearnersCsv(rebuilt.date)) ?? [];
    date = rebuilt.date;
  }

  const matched = learners.filter((entry) => keys.has(entry.moveSlug));

  // 인덱스에 해당 기술이 없으면 재집계 (당일 CSV가 불완전했던 경우)
  if (matched.length === 0) {
    const rebuilt = await rebuildPochampsMovesIndexFromStorage();
    learners = (await loadMoveLearnersCsv(rebuilt.date)) ?? learners;
    date = rebuilt.date;
  }

  const rematched = learners.filter((entry) => keys.has(entry.moveSlug));
  // 포켓몬 단위 중복 제거 (여러 기술이 매칭돼도 한 번만)
  const seen = new Set<string>();
  const unique: PochampsMoveLearner[] = [];
  for (const entry of rematched) {
    if (seen.has(entry.pokemonSlug)) continue;
    seen.add(entry.pokemonSlug);
    unique.push(entry);
  }

  unique.sort((a, b) => a.pokemonName.localeCompare(b.pokemonName));
  return { date, learners: unique };
}

/**
 * 특정 포켓몬 CSV의 learnableMoveNames 목록을 반환합니다.
 * Storage에 없거나 learnable 행이 비면 champions API로 보충합니다.
 */
export async function getPochampsLearnableMoveNamesForPokemon(
  pokemonSlugOrName: string,
): Promise<{ date: string; slug: string; names: string[] }> {
  // 도감 영문명(ninetales-alola)과 포챔스 저장 슬러그(alolanninetales)가 다를 수 있음
  const slug = resolvePochampsStorageSlug(pokemonSlugOrName);
  const today = getSeoulDateString();
  const yesterday = getSeoulDateDaysAgo(1);
  const fallbackSlug = normalizePokemonSlug(pokemonSlugOrName);
  const slugCandidates = [...new Set([slug, fallbackSlug].filter(Boolean))];

  const extractNames = (rows: BattleRow[]): string[] =>
    rows
      .filter((row) => isLearnableMoveRow(row.category))
      .map((row) => String(row.name ?? '').trim())
      .filter(Boolean);

  for (const candidate of slugCandidates) {
    for (const date of [today, yesterday]) {
      const csv = await downloadTodayCsv(
        buildPokemonMetaStoragePath(candidate, date),
      );
      if (!csv) continue;
      const { rows } = csvToRows(csv);
      const names = extractNames(rows);
      if (names.length > 0) {
        return { date, slug: candidate, names };
      }
    }
  }

  // 오늘/어제 CSV에 learnable 이 없으면 API 재수집
  for (const candidate of slugCandidates) {
    try {
      const meta = await getDailyPokemonMetaData(candidate);
      const names = extractNames(meta.rows);
      if (names.length > 0) {
        return { date: meta.date, slug: candidate, names };
      }
    } catch (error) {
      console.warn(
        '[pokemonMetaData] learnable moves fallback 실패',
        candidate,
        error,
      );
    }
  }

  return { date: today, slug: slug || fallbackSlug, names: [] };
}

/**
 * 포챔스 기술 목록.
 * Storage `Pokemon/{slug}/{date}.csv` 안의 learnableMoveNames 기반 행만 사용합니다.
 *
 * 1) Pokemon/moves/{date}.csv
 * 2) 어제/최근 인덱스
 * 3) 개별 Pokemon CSV에서 재집계 후 캐시
 */
export async function getDailyPochampsMovesIndex(): Promise<PochampsMovesIndex> {
  const today = getSeoulDateString();

  const todayCsv = await downloadTodayCsv(buildPokemonMovesIndexStoragePath(today));
  if (todayCsv) {
    const parsed = parseMovesIndexCsv(todayCsv, today);
    if (parsed) return parsed;
  }

  const yesterday = getSeoulDateDaysAgo(1);
  const yesterdayCsv = await downloadTodayCsv(
    buildPokemonMovesIndexStoragePath(yesterday),
  );
  if (yesterdayCsv) {
    const parsed = parseMovesIndexCsv(yesterdayCsv, yesterday);
    if (parsed) return parsed;
  }

  const latest = await findLatestMovesIndexCsv();
  if (latest) return latest;

  return rebuildPochampsMovesIndexFromStorage();
}
