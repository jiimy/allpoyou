import { normalizePokemon } from '@/utils/pokemonNormalize';
import type { Pokemon } from '@/store/PokemonStore';

export function parseCSVLine(line: string): string[] {
  const fields: string[] = [];
  let i = 0;

  while (i < line.length) {
    if (line[i] === '"') {
      let j = i + 1;
      let val = '';
      while (j < line.length) {
        if (line[j] === '"') {
          if (line[j + 1] === '"') {
            val += '"';
            j += 2;
            continue;
          }
          break;
        }
        val += line[j++];
      }
      fields.push(val);
      i = j + 1;
      if (line[i] === ',') i++;
    } else {
      let j = i;
      while (j < line.length && line[j] !== ',') j++;
      fields.push(line.slice(i, j));
      i = j + 1;
    }
  }

  return fields;
}

function parseJsonArrayField(raw: string | undefined): string[] {
  const t = (raw ?? '').trim();
  if (!t || t === '[]') return [];
  try {
    const parsed = JSON.parse(t) as unknown;
    if (Array.isArray(parsed)) return parsed.map((v) => String(v));
  } catch {
    return [];
  }
  return [];
}

function fieldAt(fields: string[], headers: string[], name: string): string {
  const index = headers.indexOf(name);
  return index >= 0 ? (fields[index] ?? '') : '';
}

/** public/data/pokemon.csv 본문을 Pokemon[]로 변환 */
export function parsePokemonCsv(csv: string): Pokemon[] {
  const lines = csv.split(/\r?\n/).filter((line) => line.trim().length > 0);
  if (lines.length < 2) return [];

  const headers = parseCSVLine(lines[0]).map((h) => h.trim());
  const pokemons: Pokemon[] = [];

  for (let li = 1; li < lines.length; li++) {
    const f = parseCSVLine(lines[li]);
    if (f.length < 3) continue;

    const get = (name: string) => fieldAt(f, headers, name);

    pokemons.push(
      normalizePokemon({
        id: Number(get('id')),
        number: Number(get('number')),
        name: get('name'),
        nameKo: get('nameKo'),
        types: parseJsonArrayField(get('types')),
        H: Number(get('H')),
        A: Number(get('A')),
        B: Number(get('B')),
        C: Number(get('C')),
        D: Number(get('D')),
        S: Number(get('S')),
        total: Number(get('total')),
        images: parseJsonArrayField(get('images')),
        ability: parseJsonArrayField(get('ability')),
        s_ability: parseJsonArrayField(get('s_ability')),
        grade: Number(get('grade')),
        prevEvolutions: parseJsonArrayField(get('prevEvolutions')),
        nextEvolutions: parseJsonArrayField(get('nextEvolutions')),
      }),
    );
  }

  return pokemons;
}
