import type { MoveDbEntry } from '@/types/move';
import type { Pokemon } from '@/store/PokemonStore';
import { POCHAMS_POKEMON_DATA } from '@/components/pochamsData/PochamsPokemonData';

/** "Electro Shot" / "electro-shot" → 동일 키 */
export function toChampionsMoveLookupKey(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Pokemon CSV 저장 경로용 슬러그 (공백/특수문자 제거) */
export function toPokemonMetaSlug(name: string): string {
  return name.trim().toLowerCase().replace(/[^a-z0-9.-]/g, '');
}

function compactKey(value: string): string {
  return value.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * 포챔스 표시명 → 우리 pokemon.csv 영문명 후보
 * 예: "Alolan Ninetales" → ninetales-alola / ninetalesalola
 */
export function pochampsDisplayToNameCandidates(displayName: string): string[] {
  const raw = displayName.trim();
  if (!raw) return [];

  const out = new Set<string>();
  out.add(raw);
  out.add(raw.toLowerCase());
  out.add(toPokemonMetaSlug(raw));

  const regional = raw.match(/^(Alolan|Galarian|Hisuian)\s+(.+)$/i);
  if (regional) {
    const region = regional[1].toLowerCase();
    const base = regional[2].trim();
    const regionKey =
      region === 'alolan' ? 'alola' : region === 'galarian' ? 'galar' : 'hisui';
    out.add(`${base}-${regionKey}`);
    out.add(`${base}${regionKey}`);
    out.add(`${region}-${base}`);
    out.add(`${region}${base}`);
  }

  const forme = raw.match(
    /^(.+?)\s+(Shield|Blade|Midday|Midnight|Dusk|Male|Female|Red|Natural)(?:\s+(?:Forme?|Flower|Form))?$/i,
  );
  if (forme) {
    const base = forme[1].trim();
    const kind = forme[2].toLowerCase();
    out.add(`${base}-${kind}`);
    out.add(`${base}${kind}`);
    out.add(base);
  }

  // 포챔스 목록의 bare "Lycanroc"은 Midday 기본폼
  if (/^Lycanroc$/i.test(raw)) {
    out.add('lycanroc-midday');
    out.add('lycanrocmidday');
  }

  return [...out];
}

let storageSlugByCompact: Map<string, string> | null = null;

function getStorageSlugIndex(): Map<string, string> {
  if (storageSlugByCompact) return storageSlugByCompact;

  const map = new Map<string, string>();
  for (const displayName of POCHAMS_POKEMON_DATA) {
    const storageSlug = toPokemonMetaSlug(displayName);
    map.set(compactKey(displayName), storageSlug);
    map.set(compactKey(storageSlug), storageSlug);
    for (const candidate of pochampsDisplayToNameCandidates(displayName)) {
      map.set(compactKey(candidate), storageSlug);
    }
  }
  storageSlugByCompact = map;
  return map;
}

/**
 * 임의 입력(도감 영문명/표시명/슬러그) → Storage `Pokemon/{slug}/` 경로 슬러그
 */
export function resolvePochampsStorageSlug(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return '';

  const index = getStorageSlugIndex();
  const hit = index.get(compactKey(trimmed));
  if (hit) return hit;

  return toPokemonMetaSlug(trimmed);
}

export function buildPochampsMoveKeySet(names: string[]): Set<string> {
  const keys = new Set<string>();
  for (const name of names) {
    const key = toChampionsMoveLookupKey(name);
    if (key) keys.add(key);
  }
  return keys;
}

export function filterMovesByPochampsNames(
  moves: MoveDbEntry[],
  names: string[],
): MoveDbEntry[] {
  if (names.length === 0) return [];
  const keys = buildPochampsMoveKeySet(names);
  return moves.filter((move) => {
    const en = toChampionsMoveLookupKey(move.englishName);
    const ko = toChampionsMoveLookupKey(move.koreanName);
    return keys.has(en) || keys.has(ko);
  });
}

export function resolvePokemonFromPochampsLearner(
  learner: { pokemonName: string; pokemonSlug: string },
  list: Pokemon[],
): Pokemon | null {
  const slugCompact = compactKey(learner.pokemonSlug);
  const nameLower = learner.pokemonName.toLowerCase();
  const candidates = pochampsDisplayToNameCandidates(learner.pokemonName).map(
    compactKey,
  );

  return (
    list.find((p) => compactKey(p.name) === slugCompact) ??
    list.find((p) => compactKey(toPokemonMetaSlug(p.name)) === slugCompact) ??
    list.find((p) => candidates.includes(compactKey(p.name))) ??
    list.find((p) => p.name.toLowerCase() === nameLower) ??
    list.find((p) => p.nameKo === learner.pokemonName) ??
    list.find((p) => compactKey(p.nameKo) === slugCompact) ??
    null
  );
}

/**
 * POCHAMS_POKEMON_DATA 에 대응하는 도감 포켓몬만 남깁니다.
 * (표시명 ↔ csv 영문명 슬러그 매칭)
 */
export function filterPokemonByPochampsData(list: Pokemon[]): Pokemon[] {
  if (list.length === 0) return [];

  const ids = new Set<number>();
  for (const displayName of POCHAMS_POKEMON_DATA) {
    const slug = toPokemonMetaSlug(displayName);
    const pokemon = resolvePokemonFromPochampsLearner(
      { pokemonName: displayName, pokemonSlug: slug },
      list,
    );
    if (pokemon) ids.add(pokemon.id);
  }

  return list.filter((p) => ids.has(p.id));
}
