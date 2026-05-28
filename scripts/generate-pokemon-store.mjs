import fs from 'fs';

const csvPath = '/public/data/pokemon.csv';
const outPath = '/src/store/PokemonStore.ts';

function parseCSVLine(line) {
  const fields = [];
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

function parseJsonArray(s) {
  const t = (s || '').trim();
  if (!t || t === '[]') return [];
  try {
    return JSON.parse(t);
  } catch {
    return [];
  }
}

const raw = fs.readFileSync(csvPath, 'utf8');
const lines = raw.split(/\r?\n/).filter(Boolean);
const pokemons = [];

for (let li = 1; li < lines.length; li++) {
  const f = parseCSVLine(lines[li]);
  if (f.length < 15) continue;
  const [
    id,
    number,
    name,
    types,
    H,
    A,
    B,
    C,
    D,
    S,
    total,
    form,
    image,
    ability,
    s_ability,
  ] = f;
  pokemons.push({
    id: Number(id),
    number: Number(number),
    name,
    types: parseJsonArray(types),
    H: Number(H),
    A: Number(A),
    B: Number(B),
    C: Number(C),
    D: Number(D),
    S: Number(S),
    total: Number(total),
    ...(form ? { form } : {}),
    ...(image ? { image } : {}),
    ability: parseJsonArray(ability),
    s_ability: parseJsonArray(s_ability),
  });
}

const ts = `/** 포켓몬 마스터 데이터 (engrit-origin/public/data/pokemon.csv 기준) */
export type Pokemon = {
  id: number;
  number: number;
  name: string;
  types: string[];
  H: number;
  A: number;
  B: number;
  C: number;
  D: number;
  S: number;
  total: number;
  form?: string;
  image?: string;
  ability: string[];
  s_ability: string[];
};

export const POKEMON_LIST: Pokemon[] = ${JSON.stringify(pokemons, null, 2)};

const byId = new Map<number, Pokemon>();
const byNumber = new Map<number, Pokemon[]>();

for (const p of POKEMON_LIST) {
  byId.set(p.id, p);
  const list = byNumber.get(p.number) ?? [];
  list.push(p);
  byNumber.set(p.number, list);
}

export function getPokemonById(id: number): Pokemon | undefined {
  return byId.get(id);
}

export function getPokemonsByNumber(number: number): Pokemon[] {
  return byNumber.get(number) ?? [];
}

export function searchPokemonByName(keyword: string, limit = 50): Pokemon[] {
  const q = keyword.trim();
  if (!q) return [];
  const lower = q.toLowerCase();
  const results: Pokemon[] = [];
  for (const p of POKEMON_LIST) {
    if (p.name.includes(q) || p.name.toLowerCase().includes(lower)) {
      results.push(p);
      if (results.length >= limit) break;
    }
  }
  return results.sort((a, b) => a.number - b.number);
}
`;

fs.writeFileSync(outPath, ts, 'utf8');
console.log(`Written ${pokemons.length} pokemon entries`);
console.log(`File size: ${(fs.statSync(outPath).size / 1024 / 1024).toFixed(2)} MB`);
