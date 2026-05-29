import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Inline minimal copy of useType logic
const typeTranslation = {
  normal: '노말', fire: '불꽃', water: '물', electric: '전기', grass: '풀', ice: '얼음',
  fighting: '격투', poison: '독', ground: '땅', flying: '비행', psychic: '에스퍼',
  bug: '벌레', rock: '바위', ghost: '고스트', dragon: '드래곤', dark: '악', steel: '강철', fairy: '페어리',
};

const KOREAN_TO_ENGLISH = Object.fromEntries(
  Object.entries(typeTranslation).map(([en, ko]) => [ko, en]),
);

// Load typeChart from TS file - parse is hard, import tsx
const { typeChart } = await import('../src/constants/pokemonType.ts');

function getWeaknessTypes(englishTypes) {
  const weaknessTypes = [];
  for (const attacker of Object.keys(typeChart)) {
    let multiplier = 1;
    for (const defender of englishTypes) {
      multiplier *= typeChart[defender][attacker] ?? 1;
    }
    if (multiplier >= 2) weaknessTypes.push(attacker);
  }
  return weaknessTypes;
}

function getRecommendedCounterDetails(koreanTypes) {
  const englishTypes = koreanTypes
    .map((t) => KOREAN_TO_ENGLISH[t])
    .filter((t) => t && t in typeChart);

  const weaknessTypes = getWeaknessTypes(englishTypes);
  const counters = [];
  for (const candidate of Object.keys(typeChart)) {
    const factors = weaknessTypes.map((weak) => ({
      weakness: typeTranslation[weak],
      multiplier: typeChart[weak][candidate] ?? 1,
    }));
    const product = factors.reduce((acc, f) => acc * f.multiplier, 1);
    if (product >= 2) {
      counters.push({ type: typeTranslation[candidate], product });
    }
  }
  counters.sort((a, b) => b.product - a.product);
  return { weaknessTypes: weaknessTypes.map((w) => typeTranslation[w]), counters };
}

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

const csv = readFileSync(path.join(__dirname, '../public/data/pokemon.csv'), 'utf8');
const lines = csv.split(/\r?\n/).filter(Boolean);
const all = [];
for (let li = 1; li < lines.length; li++) {
  const f = parseCSVLine(lines[li]);
  if (f.length < 15) continue;
  const [, , name, nameKo, types] = f;
  let typesArr = [];
  try {
    typesArr = JSON.parse(types);
  } catch {
    /* */
  }
  all.push({ name, nameKo, types: typesArr });
}

const defenderTypes = ['드래곤', '땅'];
const { counters } = getRecommendedCounterDetails(defenderTypes);
const recSet = new Set(counters.map((c) => c.type));
console.log('메가 한카리아스 약점 카운터 타입:', [...recSet].join(', '));

const pairs = ['강철+독', '독+바위', '강철+바위'];
for (const pair of pairs) {
  const [a, b] = pair.split('+');
  const found = all.filter((p) => {
    const t = new Set(p.types);
    return t.has(a) && t.has(b);
  });
  console.log(`\n${pair} 조합 포켓몬 (${found.length}마리):`);
  console.log(found.slice(0, 15).map((p) => p.nameKo).join(', '));
  if (found.length > 15) console.log(`... 외 ${found.length - 15}마리`);
}

// Simulate filter (idx=0, requireTwoRecTypes=true, excludeSameTypes=true, teamTypes empty)
const matching = all.filter((p) => {
  const matches = p.types.filter((t) => recSet.has(t));
  if (matches.length < 2) return false;
  return true;
});

const byPair = { '강철+독': [], '독+바위': [], '강철+바위': [] };
for (const p of matching) {
  const t = new Set(p.types);
  if (t.has('강철') && t.has('독')) byPair['강철+독'].push(p.nameKo);
  if (t.has('독') && t.has('바위')) byPair['독+바위'].push(p.nameKo);
  if (t.has('강철') && t.has('바위')) byPair['강철+바위'].push(p.nameKo);
}

console.log('\n=== 필터 후 목록 (idx=0 시뮬레이션) ===');
for (const [k, v] of Object.entries(byPair)) {
  console.log(`${k}: ${v.length}마리`, v.slice(0, 8).join(', '));
}
