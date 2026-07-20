import 'server-only';

import fs from 'node:fs/promises';
import path from 'node:path';

import { parsePokemonCsv } from '@/utils/pokemonCsv';

type BattleRow = Record<string, string | number | null | undefined>;

const POKEAPI_CSV_BASE =
  'https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/csv';

export const BATTLE_CATEGORY_ORDER = [
  'move',
  'held_item',
  'ability',
  'teammate',
  'stat_alignment',
  'stat_points',
] as const;

export type BattleCategoryKey = (typeof BATTLE_CATEGORY_ORDER)[number];

export const BATTLE_CATEGORY_LABEL_KO: Record<BattleCategoryKey, string> = {
  move: '기술',
  held_item: '지닌물건',
  ability: '특성',
  teammate: '동료',
  stat_alignment: '성격',
  stat_points: '노력치',
};

/** 영문 성격 → 한글 */
const NATURE_EN_TO_KO: Record<string, string> = {
  hardy: '노력',
  lonely: '외로움',
  adamant: '고집',
  naughty: '개구쟁이',
  brave: '용감',
  bold: '대담',
  docile: '온순',
  impish: '장난꾸러기',
  lax: '촐량',
  relaxed: '무사태평',
  modest: '조심',
  mild: '의젓',
  bashful: '수줍음',
  rash: '덜렁',
  quiet: '냉정',
  calm: '차분',
  gentle: '얌전',
  careful: '신중',
  quirky: '변덕',
  sassy: '건방',
  timid: '겁쟁이',
  hasty: '성급',
  jolly: '명랑',
  naive: '천진난만',
  serious: '성실',
};

const STAT_POINT_LABELS = [
  ['hp_points', '체력'],
  ['attack_points', '공격'],
  ['defense_points', '방어'],
  ['sp_atk_points', '특공'],
  ['sp_def_points', '특방'],
  ['speed_points', '스피드'],
] as const;

export type LocalizedBattleEntry = {
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

export type BattleCategoryGroup = {
  category: BattleCategoryKey;
  labelKo: string;
  items: LocalizedBattleEntry[];
};

type Dicts = {
  move: Map<string, string>;
  item: Map<string, string>;
  pokemon: Map<string, string>;
  ability: Map<string, string>;
};

let dictsPromise: Promise<Dicts> | null = null;

/** "Dragon Claw" / "Life Orb" → "dragon-claw" / "life-orb" */
export function toLookupSlug(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function cell(row: BattleRow, key: string): string {
  const v = row[key];
  return v == null ? '' : String(v).trim();
}

function formatStatPointsName(row: BattleRow): string {
  const parts: string[] = [];
  for (const [key, label] of STAT_POINT_LABELS) {
    const raw = cell(row, key);
    if (!raw || raw === '0') continue;
    parts.push(`${label}${raw}`);
  }
  return parts.length > 0 ? parts.join(' ') : '노력치 배분';
}

async function loadMoveDict(): Promise<Map<string, string>> {
  const filePath = path.join(process.cwd(), 'public', 'data', 'moves-db.json');
  const raw = await fs.readFile(filePath, 'utf8');
  const json = JSON.parse(raw) as Record<
    string,
    { koreanName?: string; englishName?: string }
  >;
  const map = new Map<string, string>();
  for (const [slug, entry] of Object.entries(json)) {
    const ko = entry.koreanName?.trim();
    if (!ko) continue;
    map.set(slug, ko);
    if (entry.englishName) map.set(toLookupSlug(entry.englishName), ko);
  }
  return map;
}

async function loadItemDict(): Promise<Map<string, string>> {
  const filePath = path.join(process.cwd(), 'public', 'data', 'item.json');
  const raw = await fs.readFile(filePath, 'utf8');
  const items = JSON.parse(raw) as Array<{ name?: string; nameKo?: string }>;
  const map = new Map<string, string>();
  for (const item of items) {
    if (!item.name || !item.nameKo) continue;
    map.set(item.name, item.nameKo);
    map.set(toLookupSlug(item.name), item.nameKo);
  }
  return map;
}

async function loadPokemonDict(): Promise<Map<string, string>> {
  const filePath = path.join(process.cwd(), 'public', 'data', 'pokemon.csv');
  const raw = await fs.readFile(filePath, 'utf8');
  const list = parsePokemonCsv(raw);
  const map = new Map<string, string>();
  for (const p of list) {
    map.set(p.name.toLowerCase(), p.nameKo);
    map.set(toLookupSlug(p.name), p.nameKo);
  }
  return map;
}

async function loadAbilityDict(): Promise<Map<string, string>> {
  const [abilitiesRes, namesRes] = await Promise.all([
    fetch(`${POKEAPI_CSV_BASE}/abilities.csv`, { next: { revalidate: 604800 } }),
    fetch(`${POKEAPI_CSV_BASE}/ability_names.csv`, {
      next: { revalidate: 604800 },
    }),
  ]);

  if (!abilitiesRes.ok || !namesRes.ok) {
    return new Map();
  }

  const abilitiesText = await abilitiesRes.text();
  const namesText = await namesRes.text();

  const idToSlug = new Map<number, string>();
  for (const line of abilitiesText.split(/\r?\n/).slice(1)) {
    if (!line.trim()) continue;
    const [idRaw, identifier] = line.split(',');
    const id = Number(idRaw);
    if (!Number.isFinite(id) || !identifier) continue;
    idToSlug.set(id, identifier);
  }

  const idToKo = new Map<number, string>();
  const idToEn = new Map<number, string>();
  for (const line of namesText.split(/\r?\n/).slice(1)) {
    if (!line.trim()) continue;
    const [idRaw, langRaw, ...nameParts] = line.split(',');
    const id = Number(idRaw);
    const lang = Number(langRaw);
    const name = nameParts.join(',').trim();
    if (!Number.isFinite(id) || !name) continue;
    if (lang === 3) idToKo.set(id, name);
    if (lang === 9) idToEn.set(id, name);
  }

  const map = new Map<string, string>();
  for (const [id, ko] of idToKo) {
    const slug = idToSlug.get(id);
    const en = idToEn.get(id);
    if (slug) map.set(slug, ko);
    if (en) {
      map.set(toLookupSlug(en), ko);
      map.set(en.toLowerCase(), ko);
    }
  }
  return map;
}

async function getDicts(): Promise<Dicts> {
  if (!dictsPromise) {
    dictsPromise = Promise.all([
      loadMoveDict(),
      loadItemDict(),
      loadPokemonDict(),
      loadAbilityDict(),
    ]).then(([move, item, pokemon, ability]) => ({
      move,
      item,
      pokemon,
      ability,
    }));
  }
  return dictsPromise;
}

function translateName(
  category: string,
  nameEn: string,
  row: BattleRow,
  dicts: Dicts,
): string {
  if (category === 'stat_points') {
    return formatStatPointsName(row);
  }

  const slug = toLookupSlug(nameEn);
  const lower = nameEn.trim().toLowerCase();

  if (category === 'move') {
    return dicts.move.get(slug) ?? dicts.move.get(lower) ?? nameEn;
  }
  if (category === 'held_item') {
    return dicts.item.get(slug) ?? dicts.item.get(lower) ?? nameEn;
  }
  if (category === 'ability') {
    return dicts.ability.get(slug) ?? dicts.ability.get(lower) ?? nameEn;
  }
  if (category === 'teammate') {
    return dicts.pokemon.get(slug) ?? dicts.pokemon.get(lower) ?? nameEn;
  }
  if (category === 'stat_alignment') {
    return NATURE_EN_TO_KO[slug] ?? NATURE_EN_TO_KO[lower] ?? nameEn;
  }

  return nameEn;
}

function isBattleCategory(value: string): value is BattleCategoryKey {
  return (BATTLE_CATEGORY_ORDER as readonly string[]).includes(value);
}

function hasHangul(value: string): boolean {
  return /[\uAC00-\uD7A3]/.test(value);
}

/**
 * 영문 rows → 한글 name 반영 rows.
 * `name_en`이 있으면 그걸 영문으로 보고, 없으면 `name`을 영문으로 봅니다.
 * 이미 한글인 `name`만 있는 경우(재처리)는 그대로 유지합니다.
 */
export async function localizeBattleRows(rows: BattleRow[]): Promise<BattleRow[]> {
  const dicts = await getDicts();

  return rows.map((row) => {
    const category = cell(row, 'category');
    const nameRaw = cell(row, 'name');
    const nameEnRaw = cell(row, 'name_en');
    const pokemonRaw = cell(row, 'pokemon');
    const pokemonEnRaw = cell(row, 'pokemon_en');

    const pokemonEn =
      pokemonEnRaw || (hasHangul(pokemonRaw) ? '' : pokemonRaw) || pokemonRaw;
    const pokemonKo = pokemonEn
      ? (dicts.pokemon.get(toLookupSlug(pokemonEn)) ??
        dicts.pokemon.get(pokemonEn.toLowerCase()) ??
        (hasHangul(pokemonRaw) ? pokemonRaw : pokemonEn))
      : pokemonRaw;

    let nameEn = nameEnRaw;
    let nameKo: string;

    if (category === 'stat_points') {
      nameEn = '';
      nameKo = formatStatPointsName(row);
    } else if (nameEnRaw) {
      nameKo = translateName(category, nameEnRaw, row, dicts);
    } else if (hasHangul(nameRaw)) {
      nameKo = nameRaw;
    } else {
      nameEn = nameRaw;
      nameKo = translateName(category, nameRaw, row, dicts);
    }

    return {
      ...row,
      pokemon: pokemonKo,
      pokemon_en: pokemonEn || pokemonEnRaw || '',
      name: nameKo,
      name_en: nameEn,
    };
  });
}

/** category별 상위 limit개로 묶습니다. */
export function groupBattleByCategory(
  rows: BattleRow[],
  limit = 10,
): BattleCategoryGroup[] {
  const buckets = new Map<BattleCategoryKey, LocalizedBattleEntry[]>();

  for (const row of rows) {
    const category = cell(row, 'category');
    if (!isBattleCategory(category)) continue;

    const list = buckets.get(category) ?? [];
    if (list.length >= limit) continue;

    list.push({
      rank: Number(cell(row, 'rank')) || list.length + 1,
      name: cell(row, 'name'),
      nameEn: cell(row, 'name_en'),
      percentage: cell(row, 'percentage'),
      hp_points: cell(row, 'hp_points') || undefined,
      attack_points: cell(row, 'attack_points') || undefined,
      defense_points: cell(row, 'defense_points') || undefined,
      sp_atk_points: cell(row, 'sp_atk_points') || undefined,
      sp_def_points: cell(row, 'sp_def_points') || undefined,
      speed_points: cell(row, 'speed_points') || undefined,
    });
    buckets.set(category, list);
  }

  return BATTLE_CATEGORY_ORDER.filter((key) => (buckets.get(key)?.length ?? 0) > 0).map(
    (category) => ({
      category,
      labelKo: BATTLE_CATEGORY_LABEL_KO[category],
      items: buckets.get(category) ?? [],
    }),
  );
}

export async function resolvePokemonNameKo(englishOrSlug: string): Promise<string> {
  const dicts = await getDicts();
  const slug = toLookupSlug(englishOrSlug);
  return (
    dicts.pokemon.get(slug) ??
    dicts.pokemon.get(englishOrSlug.toLowerCase()) ??
    englishOrSlug
  );
}
