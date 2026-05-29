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

/** public/data/pokemon.csv 본문을 Pokemon[]로 변환 */
export function parsePokemonCsv(csv: string): Pokemon[] {
  const lines = csv.split(/\r?\n/).filter(Boolean);
  const pokemons: Pokemon[] = [];

  for (let li = 1; li < lines.length; li++) {
    const f = parseCSVLine(lines[li]);
    if (f.length < 15) continue;

    const [
      id,
      number,
      name,
      nameKo,
      types,
      H,
      A,
      B,
      C,
      D,
      S,
      total,
      ,
      images,
      ability,
      s_ability,
    ] = f;

    pokemons.push(
      normalizePokemon({
        id: Number(id),
        number: Number(number),
        name,
        nameKo,
        types: parseJsonArrayField(types),
        H: Number(H),
        A: Number(A),
        B: Number(B),
        C: Number(C),
        D: Number(D),
        S: Number(S),
        total: Number(total),
        images: parseJsonArrayField(images),
        ability: parseJsonArrayField(ability),
        s_ability: parseJsonArrayField(s_ability),
      }),
    );
  }

  return pokemons;
}
