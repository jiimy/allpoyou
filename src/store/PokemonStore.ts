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
  '즐겨찾기',
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

export type PokedexTagFilterContext = {
  favoriteIds?: ReadonlySet<number>;
};

/** 단일 태그에 포켓몬이 해당하는지 */
export function pokemonMatchesPokedexTag(
  pokemon: Pokemon,
  tag: string,
  context?: PokedexTagFilterContext,
): boolean {
  if (tag === '즐겨찾기') {
    return context?.favoriteIds?.has(pokemon.id) ?? false;
  }

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

function isGenerationTag(tag: string): boolean {
  return /^\d+세대$/.test(tag);
}

/** 전설 계열 OR 그룹 (세대 include와 동일하게 서로 OR) */
function isLegendaryOrTag(tag: string): boolean {
  return tag === '전설' || tag === '환상';
}

/** 전설 include 아래에서 제외 토글용 하위 태그 */
function isLegendarySubTag(tag: string): boolean {
  return tag === '초전설' || tag === '준전설';
}

function hasLegendaryInclude(selections: PokedexTagSelection[]): boolean {
  return selections.some(
    (entry) => entry.tag === '전설' && entry.mode === 'include',
  );
}

function hasSubInclude(selections: PokedexTagSelection[], tag: string): boolean {
  return selections.some(
    (entry) => entry.tag === tag && entry.mode === 'include',
  );
}

/**
 * 초전설·준전설을 둘 다 include하면 전설 그룹 전체 선택으로 승격합니다.
 */
function promoteBothSubsToLegendary(
  selections: PokedexTagSelection[],
): PokedexTagSelection[] {
  if (
    !hasSubInclude(selections, '초전설') ||
    !hasSubInclude(selections, '준전설')
  ) {
    return selections;
  }
  if (hasLegendaryInclude(selections)) {
    // 이미 전설이면 하위 include는 아래에서 exclude로 정규화
    return selections;
  }
  return [
    ...selections.filter(
      (entry) => !isLegendarySubTag(entry.tag) && entry.tag !== '전설',
    ),
    { tag: '전설', mode: 'include' },
  ];
}

/**
 * 전설이 include일 때 초전설/준전설 include는
 * 「전설 중 ○○ 제외」의미의 exclude로 정규화합니다.
 * 초전설·준전설을 둘 다 제외하면 전설 그룹은 필터에서 빠진 것(미선택)으로 취급합니다.
 * 초전설·준전설을 둘 다 include하면 전설 include로 승격합니다.
 */
export function normalizePokedexTagSelections(
  selections: PokedexTagSelection[],
): PokedexTagSelection[] {
  const promoted = promoteBothSubsToLegendary(selections);
  if (!hasLegendaryInclude(promoted)) return promoted;

  const mapped = promoted.map((entry) =>
    isLegendarySubTag(entry.tag) && entry.mode === 'include'
      ? { ...entry, mode: 'exclude' as const }
      : entry,
  );

  const bothSubsExcluded =
    mapped.some((entry) => entry.tag === '초전설' && entry.mode === 'exclude') &&
    mapped.some((entry) => entry.tag === '준전설' && entry.mode === 'exclude');

  if (!bothSubsExcluded) return mapped;

  // UI상 전설 미선택과 동일: 세대 등 다른 필터만 남김
  return mapped.filter(
    (entry) =>
      entry.tag !== '전설' &&
      entry.tag !== '초전설' &&
      entry.tag !== '준전설',
  );
}

/** 전설 미선택 시 세대·초/준전설·환상 include를 하나의 OR로 묶음 */
function isLooseOrIncludeTag(tag: string): boolean {
  return (
    isGenerationTag(tag) ||
    tag === '초전설' ||
    tag === '준전설' ||
    tag === '환상'
  );
}

/**
 * 태그 선택(포함/제외)으로 필터링합니다.
 * - 1~9세대 include끼리: OR
 * - 전설이 켜진 경우: 세대 그룹 AND (전설·환상 OR), 초/준전설은 전설 중 제외
 * - 전설이 꺼진 경우: 세대·초전설·준전설·환상 include는 서로 OR
 *   (예: 9세대+준전설+환상 → 9세대 또는 준전설 또는 환상)
 * - 즐겨찾기 등 나머지·exclude: AND
 */
export function filterPokemonByTagSelections(
  list: Pokemon[],
  selections: PokedexTagSelection[],
  context?: PokedexTagFilterContext,
): Pokemon[] {
  if (selections.length === 0) return list;

  const normalized = normalizePokedexTagSelections(selections);
  const legendOn = hasLegendaryInclude(normalized);

  if (legendOn) {
    const genIncludes: PokedexTagSelection[] = [];
    const legendOrIncludes: PokedexTagSelection[] = [];
    const otherSelections: PokedexTagSelection[] = [];

    for (const selection of normalized) {
      if (selection.mode === 'include' && isGenerationTag(selection.tag)) {
        genIncludes.push(selection);
      } else if (
        selection.mode === 'include' &&
        isLegendaryOrTag(selection.tag)
      ) {
        legendOrIncludes.push(selection);
      } else {
        otherSelections.push(selection);
      }
    }

    return list.filter((pokemon) => {
      if (genIncludes.length > 0) {
        const matchesAnyGen = genIncludes.some(({ tag }) =>
          pokemonMatchesPokedexTag(pokemon, tag, context),
        );
        if (!matchesAnyGen) return false;
      }

      if (legendOrIncludes.length > 0) {
        const matchesAnyLegend = legendOrIncludes.some(({ tag }) =>
          pokemonMatchesPokedexTag(pokemon, tag, context),
        );
        if (!matchesAnyLegend) return false;
      }

      for (const { tag, mode } of otherSelections) {
        const matched = pokemonMatchesPokedexTag(pokemon, tag, context);
        if (mode === 'include' && !matched) return false;
        if (mode === 'exclude' && matched) return false;
      }
      return true;
    });
  }

  const looseOrIncludes: PokedexTagSelection[] = [];
  const otherSelections: PokedexTagSelection[] = [];

  for (const selection of normalized) {
    if (selection.mode === 'include' && isLooseOrIncludeTag(selection.tag)) {
      looseOrIncludes.push(selection);
    } else {
      otherSelections.push(selection);
    }
  }

  return list.filter((pokemon) => {
    if (looseOrIncludes.length > 0) {
      const matchesAny = looseOrIncludes.some(({ tag }) =>
        pokemonMatchesPokedexTag(pokemon, tag, context),
      );
      if (!matchesAny) return false;
    }

    for (const { tag, mode } of otherSelections) {
      const matched = pokemonMatchesPokedexTag(pokemon, tag, context);
      if (mode === 'include' && !matched) return false;
      if (mode === 'exclude' && matched) return false;
    }
    return true;
  });
}

/**
 * 태그(세대/전설 계열)로 포켓몬 목록을 필터링합니다.
 * - `N세대`: generation === N
 * - `전설`: note에 '전설' 포함 (초전설·준전설 포함)
 * - `전설`+`환상` include: OR
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

function clearLegendarySubTags(
  selections: PokedexTagSelection[],
): PokedexTagSelection[] {
  return selections.filter((entry) => !isLegendarySubTag(entry.tag));
}

function hasLegendaryExclude(selections: PokedexTagSelection[]): boolean {
  return selections.some(
    (entry) => entry.tag === '전설' && entry.mode === 'exclude',
  );
}

function hasAnyLegendarySubSelection(
  selections: PokedexTagSelection[],
): boolean {
  return selections.some((entry) => isLegendarySubTag(entry.tag));
}

/**
 * 태그 클릭 사이클.
 * - 기본: off → include → exclude → off
 * - 전설이 include일 때 초전설/준전설: off → exclude → off (전설 중 제외)
 * - 전설제외만 있을 때 초전설/준전설 클릭: 전설제외 해제 + 해당 태그 include
 * - 초전설·준전설을 둘 다 include하면 전설 include로 승격
 * - 전설을 끄면 초전설/준전설 선택도 함께 해제
 */
export function cyclePokedexTagSelection(
  selections: PokedexTagSelection[],
  tag: string,
): PokedexTagSelection[] {
  const legendOn = hasLegendaryInclude(selections);

  // 전설제외 상태 + 하위 미선택 → 초/준전설 클릭 시 전설 끄고 해당 태그만 선택
  if (
    isLegendarySubTag(tag) &&
    hasLegendaryExclude(selections) &&
    !hasAnyLegendarySubSelection(selections)
  ) {
    const withoutLegend = selections.filter((entry) => entry.tag !== '전설');
    const index = withoutLegend.findIndex((entry) => entry.tag === tag);
    if (index < 0) {
      return [...withoutLegend, { tag, mode: 'include' }];
    }
    return withoutLegend;
  }

  if (isLegendarySubTag(tag) && legendOn) {
    const index = selections.findIndex((entry) => entry.tag === tag);
    if (index < 0) {
      const next: PokedexTagSelection[] = [
        ...selections,
        { tag, mode: 'exclude' },
      ];
      const bothExcluded =
        next.some(
          (entry) => entry.tag === '초전설' && entry.mode === 'exclude',
        ) &&
        next.some(
          (entry) => entry.tag === '준전설' && entry.mode === 'exclude',
        );
      // 초·준전설을 모두 제외하면 전설 그룹 필터를 해제 (세대 필터만 남김)
      if (bothExcluded) {
        return next.filter(
          (entry) => entry.tag !== '전설' && !isLegendarySubTag(entry.tag),
        );
      }
      return next;
    }
    return selections.filter((entry) => entry.tag !== tag);
  }

  const index = selections.findIndex((entry) => entry.tag === tag);
  if (index < 0) {
    const next: PokedexTagSelection[] = [
      ...selections,
      { tag, mode: 'include' },
    ];
    // 초전설+준전설 모두 선택 → 전설 그룹 전체 선택
    if (isLegendarySubTag(tag)) {
      return promoteBothSubsToLegendary(next);
    }
    return next;
  }

  const current = selections[index];
  if (current.mode === 'include') {
    const next = [...selections];
    next[index] = { tag, mode: 'exclude' };
    // 전설 include 해제(→ exclude) 시 하위 제외 태그 정리
    if (tag === '전설') {
      return clearLegendarySubTags(next);
    }
    return next;
  }

  // exclude → off
  const removed = selections.filter((entry) => entry.tag !== tag);
  if (tag === '전설') {
    return clearLegendarySubTags(removed);
  }
  return removed;
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
