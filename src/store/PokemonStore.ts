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
};

let cachedList: Pokemon[] | null = null;
const byId = new Map<number, Pokemon>();
const byEnglishName = new Map<string, Pokemon>();
const byNumber = new Map<number, Pokemon[]>();

function indexPokemon(list: Pokemon[]) {
  byId.clear();
  byEnglishName.clear();
  byNumber.clear();
  for (const p of list) {
    byId.set(p.id, p);
    byEnglishName.set(p.name, p);
    const group = byNumber.get(p.number) ?? [];
    group.push(p);
    byNumber.set(p.number, group);
  }
}

/** public/data/pokemon.csv에서 목록을 가져옵니다 (메모리 캐시, 클라이언트 전용). */
export async function fetchPokemonList(force = false): Promise<Pokemon[]> {
  if (typeof window === 'undefined') return [];

  if (!force && cachedList) return cachedList;

  const res = await fetch('/data/pokemon.csv', { cache: 'force-cache' });
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

export function searchPokemonByName(
  keyword: string,
  list: Pokemon[],
  limit = 50,
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
