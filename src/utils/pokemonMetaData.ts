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

  (data.learnableMoveNames ?? []).forEach((move, index) => {
    rows.push({
      category: 'move',
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
 * - 기본: 당일(KST) CSV가 있고 battle_summary가 있으면 재사용
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
      if (hasBattleSummary) {
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
