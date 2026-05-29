import type { Pokemon } from '@/store/PokemonStore';

/** DB/JSON에서 text[]가 문자열로 올 때 배열로 변환 */
export function ensureStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((v) => String(v));
  }
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return [];
    if (trimmed.startsWith('[')) {
      try {
        const parsed = JSON.parse(trimmed) as unknown;
        if (Array.isArray(parsed)) return parsed.map((v) => String(v));
      } catch {
        return [];
      }
    }
    // Postgres text[] 문자열 형식: {강철,독}
    if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
      const inner = trimmed.slice(1, -1).trim();
      if (!inner) return [];
      return inner.split(',').map((v) => v.trim().replace(/^"|"$/g, ''));
    }
    if (trimmed.includes(',')) {
      return trimmed.split(',').map((v) => v.trim()).filter(Boolean);
    }
    return [trimmed];
  }
  return [];
}

export function normalizePokemon(row: Record<string, unknown>): Pokemon {
  return {
    id: Number(row.id),
    number: Number(row.number),
    name: String(row.name ?? ''),
    nameKo: String(row.nameKo ?? row.name ?? ''),
    types: ensureStringArray(row.types),
    images: ensureStringArray(row.images),
    ability: ensureStringArray(row.ability),
    s_ability: ensureStringArray(row.s_ability),
    H: Number(row.H),
    A: Number(row.A),
    B: Number(row.B),
    C: Number(row.C),
    D: Number(row.D),
    S: Number(row.S),
    total: Number(row.total),
  };
}
