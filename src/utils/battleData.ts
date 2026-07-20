import 'server-only';

import { createAdminClient } from '@/utils/supabase/admin';
import {
  groupBattleByCategory,
  localizeBattleRows,
  resolvePokemonNameKo,
  type BattleCategoryGroup,
} from '@/utils/battleLocalize';

export const BATTLE_FORMATS = ['Doubles', 'Singles'] as const;
export type BattleFormat = (typeof BATTLE_FORMATS)[number];

/** Supabase Storage 버킷명. 대시보드에서 public/private 생성 필요. */
export const BATTLE_STORAGE_BUCKET =
  process.env.SUPABASE_BATTLE_BUCKET ?? 'pokemon_champions';

const CHAMPIONS_BATTLE_BASE = 'https://championsbattledata.com/api/battle';

export type BattleRow = Record<string, string | number | null | undefined>;

export type ChampionsBattleResponse = {
  pokemon: string;
  showdownId?: string;
  format: string;
  season?: string;
  date?: string | null;
  source?: string;
  columns: string[];
  rows: BattleRow[];
};

export type BattleDataResult = {
  cached: boolean;
  date: string;
  pokemon: string;
  pokemonKo: string;
  showdownId: string;
  format: BattleFormat;
  columns: string[];
  rows: BattleRow[];
  byCategory: BattleCategoryGroup[];
  storagePath: string;
};

const LOCALIZED_CSV_COLUMNS = [
  'pokemon',
  'pokemon_en',
  'column_position',
  'category',
  'rank',
  'name',
  'name_en',
  'percentage',
  'stat_up',
  'stat_down',
  'hp_points',
  'attack_points',
  'defense_points',
  'sp_atk_points',
  'sp_def_points',
  'speed_points',
] as const;

/** 한국(Asia/Seoul) 기준 YYYY-MM-DD */
export function getSeoulDateString(now = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
}

export function normalizeBattleFormat(raw: string): BattleFormat | null {
  const key = raw.trim().toLowerCase();
  if (key === 'doubles') return 'Doubles';
  if (key === 'singles') return 'Singles';
  return null;
}

/** 영문 showdown id 형태 (소문자, 공백/특수문자 제거에 가깝게) */
export function normalizePokemonSlug(raw: string): string {
  return raw.trim().toLowerCase().replace(/[^a-z0-9.-]/g, '');
}

export function buildStoragePath(
  format: BattleFormat,
  pokemonSlug: string,
  date: string,
): string {
  return `${format}/${pokemonSlug}/${date}.csv`;
}

function escapeCsvCell(value: unknown): string {
  if (value == null) return '';
  const s = String(value);
  if (/[",\n\r]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export function rowsToCsv(columns: string[], rows: BattleRow[]): string {
  const header = columns.map(escapeCsvCell).join(',');
  const body = rows
    .map((row) => columns.map((col) => escapeCsvCell(row[col])).join(','))
    .join('\n');
  return body.length > 0 ? `${header}\n${body}\n` : `${header}\n`;
}

function splitCsvLine(line: string): string[] {
  const cells: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          current += '"';
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        current += ch;
      }
      continue;
    }

    if (ch === '"') {
      inQuotes = true;
      continue;
    }
    if (ch === ',') {
      cells.push(current);
      current = '';
      continue;
    }
    current += ch;
  }

  cells.push(current);
  return cells;
}

export function csvToRows(csv: string): { columns: string[]; rows: BattleRow[] } {
  const lines = csv.split(/\r?\n/).filter((line) => line.trim().length > 0);
  if (lines.length === 0) {
    return { columns: [], rows: [] };
  }

  const columns = splitCsvLine(lines[0]!);
  const rows = lines.slice(1).map((line) => {
    const cells = splitCsvLine(line);
    const row: BattleRow = {};
    columns.forEach((col, index) => {
      row[col] = cells[index] ?? '';
    });
    return row;
  });

  return { columns, rows };
}

export async function fetchChampionsBattleData(
  format: BattleFormat,
  pokemonSlug: string,
): Promise<ChampionsBattleResponse> {
  const url = `${CHAMPIONS_BATTLE_BASE}/${format}/${encodeURIComponent(pokemonSlug)}`;
  const res = await fetch(url, {
    headers: { Accept: 'application/json' },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(
      `championsbattledata 요청 실패: ${res.status} ${res.statusText} (${url})`,
    );
  }

  const data = (await res.json()) as ChampionsBattleResponse;
  if (!Array.isArray(data.columns) || !Array.isArray(data.rows)) {
    throw new Error('championsbattledata 응답 형식이 올바르지 않습니다.');
  }

  return data;
}

async function downloadTodayCsv(
  storagePath: string,
): Promise<string | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase.storage
    .from(BATTLE_STORAGE_BUCKET)
    .download(storagePath);

  if (error || !data) {
    return null;
  }

  return data.text();
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

async function toLocalizedResult(
  rows: BattleRow[],
  meta: {
    cached: boolean;
    date: string;
    pokemonEn: string;
    showdownId: string;
    format: BattleFormat;
    storagePath: string;
  },
): Promise<BattleDataResult> {
  const localizedRows = await localizeBattleRows(rows);
  const pokemonKo = await resolvePokemonNameKo(meta.pokemonEn);
  const byCategory = groupBattleByCategory(localizedRows, 10);

  return {
    cached: meta.cached,
    date: meta.date,
    pokemon: meta.pokemonEn,
    pokemonKo,
    showdownId: meta.showdownId,
    format: meta.format,
    columns: [...LOCALIZED_CSV_COLUMNS],
    rows: localizedRows,
    byCategory,
    storagePath: meta.storagePath,
  };
}

/**
 * 당일(KST) CSV가 Storage에 있으면 재사용하고,
 * 없으면 외부 API → 한글 번역 CSV 저장 후 반환합니다.
 * 응답의 byCategory는 category별 상위 10개입니다.
 */
export async function getDailyBattleData(
  format: BattleFormat,
  pokemonSlug: string,
): Promise<BattleDataResult> {
  const date = getSeoulDateString();
  const storagePath = buildStoragePath(format, pokemonSlug, date);

  const cachedCsv = await downloadTodayCsv(storagePath);
  if (cachedCsv) {
    const { rows } = csvToRows(cachedCsv);
    const hasKoreanSchema = rows.some((row) => row.name_en != null && row.name_en !== '');
    const pokemonEn =
      String(rows[0]?.pokemon_en ?? rows[0]?.pokemon ?? pokemonSlug) || pokemonSlug;

    // 예전 영문 CSV 캐시면 한글 번역본으로 한 번 갱신
    if (!hasKoreanSchema) {
      const localizedRows = await localizeBattleRows(rows);
      await uploadCsv(
        storagePath,
        rowsToCsv([...LOCALIZED_CSV_COLUMNS], localizedRows),
      );
      const pokemonKo = await resolvePokemonNameKo(pokemonEn);
      return {
        cached: true,
        date,
        pokemon: pokemonEn,
        pokemonKo,
        showdownId: pokemonSlug,
        format,
        columns: [...LOCALIZED_CSV_COLUMNS],
        rows: localizedRows,
        byCategory: groupBattleByCategory(localizedRows, 10),
        storagePath,
      };
    }

    return toLocalizedResult(rows, {
      cached: true,
      date,
      pokemonEn,
      showdownId: pokemonSlug,
      format,
      storagePath,
    });
  }

  const fresh = await fetchChampionsBattleData(format, pokemonSlug);
  const localizedRows = await localizeBattleRows(fresh.rows);
  const csv = rowsToCsv([...LOCALIZED_CSV_COLUMNS], localizedRows);
  await uploadCsv(storagePath, csv);

  const pokemonEn = fresh.pokemon ?? pokemonSlug;
  const pokemonKo = await resolvePokemonNameKo(pokemonEn);
  const byCategory = groupBattleByCategory(localizedRows, 10);

  return {
    cached: false,
    date,
    pokemon: pokemonEn,
    pokemonKo,
    showdownId: fresh.showdownId ?? pokemonSlug,
    format,
    columns: [...LOCALIZED_CSV_COLUMNS],
    rows: localizedRows,
    byCategory,
    storagePath,
  };
}
