/**
 * PokeAPI 기준으로 pokemon.csv 전체 생성/갱신
 * - name: 영문, nameKo: 한글 표시명, images: [공식일러스트, Showdown GIF]
 *
 * 실행: node scripts/migrate-pokemon-csv.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const csvPath = path.join(__dirname, '../public/data/pokemon.csv');
const POKEAPI_GRAPHQL = 'https://graphql.pokeapi.co/v1beta2';
const KOREAN_LANGUAGE_ID = 3;

const QUERY = /* GraphQL */ `
  query AllPokemonKr {
    pokemon(order_by: { id: asc }) {
      id
      name
      pokemonspecy {
        pokemonspeciesnames(where: { language_id: { _eq: ${KOREAN_LANGUAGE_ID} } }) {
          name
        }
      }
      pokemonstats {
        base_stat
        stat { name }
      }
      pokemontypes {
        slot
        type {
          typenames(where: { language_id: { _eq: ${KOREAN_LANGUAGE_ID} } }) {
            name
          }
        }
      }
      pokemonsprites {
        sprites
      }
      pokemonabilities {
        is_hidden
        slot
        ability {
          abilitynames(where: { language_id: { _eq: ${KOREAN_LANGUAGE_ID} } }) {
            name
          }
        }
      }
    }
  }
`;

const STAT_KEY_MAP = {
  hp: 'H',
  attack: 'A',
  defense: 'B',
  'special-attack': 'C',
  'special-defense': 'D',
  speed: 'S',
};

function isMegaEvolutionEnglishName(englishName) {
  return /-mega(-[xyz])?$/.test(englishName);
}

function isGmaxEnglishName(englishName) {
  return englishName.endsWith('-gmax');
}

function getBaseEnglishNameForDex(englishName) {
  if (isMegaEvolutionEnglishName(englishName)) {
    return englishName.replace(/-mega(-[xyz])?$/, '');
  }
  if (isGmaxEnglishName(englishName)) {
    return englishName.replace(/-gmax$/, '');
  }
  return englishName;
}

function buildDisplayName(englishName, nameKo) {
  let baseName = nameKo;

  if (nameKo === '테오키스') {
    if (englishName.includes('-attack')) baseName = `${nameKo} 공격폼`;
    else if (englishName.includes('-defense')) baseName = `${nameKo} 방어폼`;
    else if (englishName.includes('-speed')) baseName = `${nameKo} 스피드폼`;
    else baseName = `${nameKo} 노말폼`;
  } else if (nameKo === '메로엣타') {
    if (englishName.includes('-aria')) baseName = `${nameKo} 보이스폼`;
    else if (englishName.includes('-pirouette')) baseName = `${nameKo} 스텝폼`;
  } else if (nameKo === '그란돈') {
    if (englishName.includes('-primal')) baseName = `원시 ${nameKo}`;
  } else if (nameKo === '가이오가') {
    if (englishName.includes('-primal')) baseName = `원시 ${nameKo}`;
  } else if (nameKo === '켄타로스') {
    if (englishName.includes('-combat-breed')) baseName = `${nameKo} 격투종`;
    else if (englishName.includes('-blaze-breed')) baseName = `${nameKo} 불꽃종`;
    else if (englishName.includes('-aqua-breed')) baseName = `${nameKo} 물종`;
  } else if (nameKo === '우라오스') {
    if (englishName.includes('-rapid-strike')) baseName = `${nameKo} 연격의 태세`;
    else if (englishName.includes('-single-strike')) baseName = `${nameKo} 일격의 태세`;
  } else if (nameKo === '로토무') {
    if (englishName.includes('-heat')) baseName = `히트 ${nameKo}`;
    else if (englishName.includes('-wash')) baseName = `워시 ${nameKo}`;
    else if (englishName.includes('-frost')) baseName = `프로스트 ${nameKo}`;
    else if (englishName.includes('-fan')) baseName = `스핀 ${nameKo}`;
    else if (englishName.includes('-mow')) baseName = `커트 ${nameKo}`;
  } else if (nameKo === '오거폰') {
    if (englishName.includes('-wellspring-mask')) baseName = `${nameKo} 우물의 가면`;
    else if (englishName.includes('-hearthflame-mask')) baseName = `${nameKo} 화덕의 가면`;
    else if (englishName.includes('-cornerstone-mask')) baseName = `${nameKo} 주춧돌의 가면`;
  } else if (nameKo === '버드렉스') {
    if (englishName.includes('-ice')) baseName = `백마 ${nameKo}`;
    else if (englishName.includes('-shadow')) baseName = `흑마 ${nameKo}`;
  }

  let megaSuffix = '';
  if (englishName.includes('-mega-x')) megaSuffix = ' X';
  else if (englishName.includes('-mega-y')) megaSuffix = ' Y';
  else if (englishName.includes('-mega-z')) megaSuffix = ' Z';

  let prefix = '';
  if (isGmaxEnglishName(englishName)) prefix = '거다이 ';
  else if (isMegaEvolutionEnglishName(englishName)) prefix = '메가 ';
  else if (englishName.includes('-galar')) prefix = '가라르 ';
  else if (englishName.includes('-paldea')) prefix = '팔데아 ';
  else if (englishName.includes('-hisui')) prefix = '히스이 ';
  else if (englishName.includes('-alola')) prefix = '알로라 ';

  return `${prefix}${baseName}${megaSuffix}`;
}

function parseSprites(value) {
  if (value == null) return {};
  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch {
      return {};
    }
  }
  return value;
}

function toRow(raw) {
  const nameKo = raw.pokemonspecy?.pokemonspeciesnames?.[0]?.name ?? raw.name;
  const types = [...raw.pokemontypes]
    .sort((a, b) => a.slot - b.slot)
    .map((t) => t.type.typenames?.[0]?.name ?? t.type.name)
    .sort((a, b) => a.localeCompare(b, 'ko'));

  const stats = { H: 0, A: 0, B: 0, C: 0, D: 0, S: 0, total: 0 };
  for (const s of raw.pokemonstats) {
    const key = STAT_KEY_MAP[s.stat.name];
    if (!key) continue;
    stats[key] = s.base_stat;
    stats.total += s.base_stat;
  }

  const ability = [];
  const s_ability = [];
  for (const entry of [...(raw.pokemonabilities ?? [])].sort((a, b) => a.slot - b.slot)) {
    const ko = entry.ability.abilitynames?.[0]?.name ?? '';
    if (entry.is_hidden) s_ability.push(ko);
    else ability.push(ko);
  }

  const sprites = parseSprites(raw.pokemonsprites?.[0]?.sprites);
  const official =
    sprites.other?.['official-artwork']?.front_default ??
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${raw.id}.png`;

  const images = [
    official,
    `https://play.pokemonshowdown.com/sprites/ani/${raw.name}.gif`,
  ];

  return {
    id: raw.id,
    name: raw.name,
    nameKo: buildDisplayName(raw.name, nameKo),
    types,
    ...stats,
    ability,
    s_ability,
    images,
    baseEnglish: getBaseEnglishNameForDex(raw.name),
  };
}

function csvJsonField(value) {
  return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
}

function escapeCsvField(value) {
  if (value == null || value === '') return '';
  const s = String(value);
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

async function fetchPokemon() {
  const res = await fetch(POKEAPI_GRAPHQL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query: QUERY }),
  });
  if (!res.ok) throw new Error(`PokeAPI ${res.status}`);
  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join(', '));
  }
  return json.data.pokemon;
}

async function main() {
  const rawList = await fetchPokemon();
  const rows = rawList
    .filter((p) => !p.name.includes('-cap'))
    .map(toRow);

  const minIdByBase = new Map();
  for (const r of rows) {
    const cur = minIdByBase.get(r.baseEnglish);
    if (cur === undefined || r.id < cur) minIdByBase.set(r.baseEnglish, r.id);
  }

  const header = [
    'id',
    'number',
    'name',
    'nameKo',
    'types',
    'H',
    'A',
    'B',
    'C',
    'D',
    'S',
    'total',
    'form',
    'images',
    'ability',
    's_ability',
  ];

  const lines = [header.join(',')];

  for (const r of rows) {
    const number = minIdByBase.get(r.baseEnglish) ?? r.id;
    const line = [
      r.id,
      number,
      r.name,
      escapeCsvField(r.nameKo),
      csvJsonField(r.types),
      r.H,
      r.A,
      r.B,
      r.C,
      r.D,
      r.S,
      r.total,
      '',
      csvJsonField(r.images),
      csvJsonField(r.ability),
      csvJsonField(r.s_ability),
    ];
    lines.push(line.join(','));
  }

  fs.writeFileSync(csvPath, `${lines.join('\n')}\n`, 'utf8');
  console.log(`Wrote ${rows.length} rows to ${csvPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
