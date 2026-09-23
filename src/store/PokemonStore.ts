import { TYPE_COLOR } from '@/constants/pokemonTypeColor';
import { parsePokemonCsv } from '@/utils/pokemonCsv';

export type Pokemon = {
  /** pokemon.csv row id */
  id: number;
  number: number;
  /** 영문 포켓몬명 */
  name: string;
  /** 한글 표시명 */
  nameKo: string;
  types: string[];
  H: number;
  A: number;
  B: number;
  C: number;
  D: number;
  S: number;
  total: number;
  /** [공식 일러스트, Showdown 애니 GIF] */
  images: string[];
  ability: string[];
  s_ability: string[];
  /** 1=1단, 2=2단, 3=최종 진화 */
  grade: number;
  /** 이전 진화 한글명 (직계 1단계) */
  prevEvolutions: string[];
  /** 이후 진화 한글명 (분기 포함) */
  nextEvolutions: string[];
  /** 비고 (예: 준전설, 초전설) */
  note: string;
  /** 등장 세대 (1~9) */
  generation: number;
  /** 분류 태그 (예: 전설의 새) */
  tag: string;
};

let cachedList: Pokemon[] | null = null;
const byId = new Map<number, Pokemon>();
const byEnglishName = new Map<string, Pokemon>();
const byNameKo = new Map<string, Pokemon>();
const byNumber = new Map<number, Pokemon[]>();

function indexPokemon(list: Pokemon[]) {
  byId.clear();
  byEnglishName.clear();
  byNameKo.clear();
  byNumber.clear();
  for (const p of list) {
    byId.set(p.id, p);
    byEnglishName.set(p.name, p);
    byNameKo.set(p.nameKo, p);
    const group = byNumber.get(p.number) ?? [];
    group.push(p);
    byNumber.set(p.number, group);
  }
}

function isValidCachedList(list: Pokemon[] | null): list is Pokemon[] {
  const sample = list?.[0];
  if (!sample) return false;
  const hasEvolutionData = list.some(
    (p) => p.prevEvolutions.length > 0 || p.nextEvolutions.length > 0,
  );
  return (
    !sample.nameKo.startsWith('[') &&
    sample.images.some((url) => url.startsWith('http')) &&
    Number.isFinite(sample.grade) &&
    Array.isArray(sample.prevEvolutions) &&
    Array.isArray(sample.nextEvolutions) &&
    hasEvolutionData
  );
}

/** public/data/pokemon.csv에서 목록을 가져옵니다 (메모리 캐시, 클라이언트 전용). */
export async function fetchPokemonList(force = false): Promise<Pokemon[]> {
  if (typeof window === 'undefined') return [];

  if (!force && isValidCachedList(cachedList)) return cachedList;

  const res = await fetch('/data/pokemon.csv', {
    cache: force ? 'no-store' : 'no-cache',
  });
  if (!res.ok) {
    throw new Error(`포켓몬 목록 로드 실패 (${res.status})`);
  }

  const csv = await res.text();
  cachedList = parsePokemonCsv(csv);
  indexPokemon(cachedList);
  return cachedList;
}

export function getCachedPokemonList(): Pokemon[] {
  return cachedList ?? [];
}

export function getPokemonById(id: number): Pokemon | undefined {
  return byId.get(id);
}

export function getPokemonByEnglishName(name: string): Pokemon | undefined {
  return byEnglishName.get(name);
}

export function getPokemonByNameKo(nameKo: string): Pokemon | undefined {
  return byNameKo.get(nameKo);
}

export function getPokemonsByNumber(number: number): Pokemon[] {
  return byNumber.get(number) ?? [];
}

function sortPokemonList(list: Pokemon[]): Pokemon[] {
  return [...list].sort(
    (a, b) => a.number - b.number || a.nameKo.localeCompare(b.nameKo, 'ko'),
  );
}

/** 이름 또는 타입(공백 구분 AND)으로 포켓몬 목록을 필터링합니다. */
export function filterPokemonList(list: Pokemon[], keyword: string): Pokemon[] {
  const q = keyword.trim();
  if (!q) return sortPokemonList(list);

  const tokens = q.split(/\s+/).filter(Boolean);
  const isTypeSearch = tokens.every((token) => token in TYPE_COLOR);

  const filtered = isTypeSearch
    ? list.filter((p) => tokens.every((type) => p.types.includes(type)))
    : list.filter((p) => {
        const lower = q.toLowerCase();
        return (
          p.nameKo.includes(q) ||
          p.name.includes(q) ||
          p.name.toLowerCase().includes(lower)
        );
      });

  return sortPokemonList(filtered);
}

/** 포켓몬덱스 태그 필터 옵션 (표시 순서) */
export const POKEDEX_TAGS: string[] = [
  ...Array.from({ length: 9 }, (_, i) => `${i + 1}세대`),
  '전설',
  '초전설',
  '준전설',
  '환상',
];

export type PokedexTagMode = 'include' | 'exclude';

export type PokedexTagSelection = {
  tag: string;
  mode: PokedexTagMode;
};

/** 단일 태그에 포켓몬이 해당하는지 */
export function pokemonMatchesPokedexTag(pokemon: Pokemon, tag: string): boolean {
  const genMatch = /^(\d+)세대$/.exec(tag);
  if (genMatch) {
    return pokemon.generation === Number(genMatch[1]);
  }

  if (tag === '전설') return pokemon.note.includes('전설');
  if (tag === '초전설') return pokemon.note.includes('초전설');
  if (tag === '준전설') return pokemon.note.includes('준전설');
  if (tag === '환상') return pokemon.note.includes('환상');

  return false;
}

/**
 * 태그 선택(포함/제외, 복수 AND)으로 필터링합니다.
 * - include: 해당 태그에 반드시 속해야 함
 * - exclude: 해당 태그에 속하면 제외
 */
export function filterPokemonByTagSelections(
  list: Pokemon[],
  selections: PokedexTagSelection[],
): Pokemon[] {
  if (selections.length === 0) return list;

  return list.filter((pokemon) => {
    for (const { tag, mode } of selections) {
      const matched = pokemonMatchesPokedexTag(pokemon, tag);
      if (mode === 'include' && !matched) return false;
      if (mode === 'exclude' && matched) return false;
    }
    return true;
  });
}

/**
 * 태그(세대/전설 계열)로 포켓몬 목록을 필터링합니다.
 * - `N세대`: generation === N
 * - `전설`: note에 '전설' 포함 (초전설·준전설 모두 포함, 환상 제외)
 * - `초전설` / `준전설` / `환상`: 해당 note만
 */
export function filterPokemonByTag(list: Pokemon[], tag: string | null): Pokemon[] {
  if (!tag) return list;
  return filterPokemonByTagSelections(list, [{ tag, mode: 'include' }]);
}

/** URL `tags` 쿼리 직렬화. 예: `전설,-1세대` (앞에 - 는 제외) */
export function serializePokedexTagSelections(
  selections: PokedexTagSelection[],
): string | null {
  if (selections.length === 0) return null;
  return selections
    .map(({ tag, mode }) => (mode === 'exclude' ? `-${tag}` : tag))
    .join(',');
}

/** URL `tags` (또는 구버전 `tag`) 파싱 */
export function parsePokedexTagSelections(
  tagsParam: string | null,
  legacyTagParam: string | null = null,
): PokedexTagSelection[] {
  const raw = tagsParam?.trim() || legacyTagParam?.trim() || '';
  if (!raw) return [];

  const allowed = new Set(POKEDEX_TAGS);
  const result: PokedexTagSelection[] = [];
  const seen = new Set<string>();

  for (const part of raw.split(',')) {
    const token = part.trim();
    if (!token) continue;
    const exclude = token.startsWith('-');
    const tag = exclude ? token.slice(1).trim() : token;
    if (!allowed.has(tag) || seen.has(tag)) continue;
    seen.add(tag);
    result.push({ tag, mode: exclude ? 'exclude' : 'include' });
  }

  return result;
}

/** off → include → exclude → off */
export function cyclePokedexTagSelection(
  selections: PokedexTagSelection[],
  tag: string,
): PokedexTagSelection[] {
  const index = selections.findIndex((entry) => entry.tag === tag);
  if (index < 0) {
    return [...selections, { tag, mode: 'include' }];
  }

  const current = selections[index];
  if (current.mode === 'include') {
    const next = [...selections];
    next[index] = { tag, mode: 'exclude' };
    return next;
  }

  return selections.filter((entry) => entry.tag !== tag);
}

export function searchPokemonByName(
  keyword: string,
  list: Pokemon[],
  limit = 1000,
): Pokemon[] {
  const q = keyword.trim();
  if (!q) return [];
  const lower = q.toLowerCase();
  return list
    .filter(
      (p) =>
        p.nameKo.includes(q) ||
        p.name.includes(q) ||
        p.name.toLowerCase().includes(lower),
    )
    .sort(
      (a, b) =>
        a.number - b.number || a.nameKo.localeCompare(b.nameKo, 'ko'),
    )
    .slice(0, limit);
}
