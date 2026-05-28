import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const POKEAPI_CSV_BASE =
  'https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/csv';

const POKEMON_CSV_PATH = path.join(process.cwd(), 'public', 'data', 'pokemon.csv');
const OUTPUT_PATH = path.join(process.cwd(), 'public', 'data', 'pokemon-with-moves.json');

/** 8~9세대 최신 버전 그룹 (앞쪽일수록 우선) */
const ALLOWED_VERSION_GROUPS = [
  'scarlet-violet',
  'legends-arceus',
  'sword-shield',
  'brilliant-diamond-shining-pearl',
] as const;

const ALLOWED_VERSION_GROUP_SET = new Set<string>(ALLOWED_VERSION_GROUPS);

export type PokemonMoveLearnset = {
  move_id: number;
  pokemon_move_method: string;
  level: number | null;
  version_group: string;
};

export type PokemonWithMoves = {
  id: number;
  number: number;
  name: string;
  moves: PokemonMoveLearnset[];
};

type PokemonCsvEntry = Pick<PokemonWithMoves, 'id' | 'number' | 'name'> & {
  /** PokeAPI pokemon_id (image URL 기준) */
  pokeapiId: number;
  /** 기본 종 dex 번호 — 거다이·지역 폼 fallback용 */
  baseSpeciesId: number;
};

function parseCSVLine(line: string): string[] {
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

function extractPokeApiIdFromImage(image: string | undefined, fallbackId: number): number {
  if (!image) return fallbackId;

  const match = image.match(/\/(\d+)\.png(?:\?|$)/);
  if (!match) return fallbackId;

  const pokeapiId = Number(match[1]);
  return Number.isFinite(pokeapiId) ? pokeapiId : fallbackId;
}

function parsePokemonCsv(): PokemonCsvEntry[] {
  const raw = fs.readFileSync(POKEMON_CSV_PATH, 'utf8');
  const lines = raw.split(/\r?\n/).filter(Boolean);
  const rows: PokemonCsvEntry[] = [];

  for (let i = 1; i < lines.length; i++) {
    const fields = parseCSVLine(lines[i]);
    if (fields.length < 3) continue;

    const [id, number, name, , , , , , , , , , image] = fields;
    if (name.startsWith('메가')) continue;

    const csvId = Number(id);
    const dexNumber = Number(number);
    rows.push({
      id: csvId,
      number: dexNumber,
      name,
      pokeapiId: extractPokeApiIdFromImage(image, csvId),
      baseSpeciesId: dexNumber,
    });
  }

  return rows;
}

async function fetchCsv(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`CSV 요청 실패 (${url}): ${res.status} ${res.statusText}`);
  }
  return res.text();
}

function loadIdNameMap(csvText: string): Map<number, string> {
  const map = new Map<number, string>();
  const lines = csvText.split(/\r?\n/).filter(Boolean);

  for (let i = 1; i < lines.length; i++) {
    const [idRaw, identifier] = lines[i].split(',');
    const id = Number(idRaw);
    if (!Number.isFinite(id) || !identifier) continue;
    map.set(id, identifier);
  }

  return map;
}

/** version_groups.csv id가 클수록 최신 — dedupe 시 우선 적용 */
function loadVersionGroupPriority(csvText: string): Map<string, number> {
  const priority = new Map<string, number>();
  const lines = csvText.split(/\r?\n/).filter(Boolean);

  for (let i = 1; i < lines.length; i++) {
    const [idRaw, identifier] = lines[i].split(',');
    const id = Number(idRaw);
    if (!Number.isFinite(id) || !identifier) continue;
    priority.set(identifier, -id);
  }

  return priority;
}

function getVersionGroupPriority(
  versionGroup: string,
  versionGroupPriority: Map<string, number>,
): number {
  const allowedIndex = ALLOWED_VERSION_GROUPS.indexOf(
    versionGroup as (typeof ALLOWED_VERSION_GROUPS)[number],
  );
  if (allowedIndex !== -1) return allowedIndex;

  return versionGroupPriority.get(versionGroup) ?? Number.MAX_SAFE_INTEGER;
}

function dedupeMoves(
  moves: PokemonMoveLearnset[],
  versionGroupPriority: Map<string, number>,
): PokemonMoveLearnset[] {
  const byKey = new Map<string, PokemonMoveLearnset>();

  for (const move of moves) {
    const key = `${move.move_id}:${move.pokemon_move_method}:${move.level ?? 0}`;
    const existing = byKey.get(key);

    if (!existing) {
      byKey.set(key, move);
      continue;
    }

    const movePriority = getVersionGroupPriority(move.version_group, versionGroupPriority);
    const existingPriority = getVersionGroupPriority(
      existing.version_group,
      versionGroupPriority,
    );

    if (movePriority < existingPriority) {
      byKey.set(key, move);
    }
  }

  return [...byKey.values()].sort((a, b) => a.move_id - b.move_id);
}

function loadPokemonMoves(
  csvText: string,
  moveMethods: Map<number, string>,
  versionGroups: Map<number, string>,
  versionGroupPriority: Map<string, number>,
): Map<number, PokemonMoveLearnset[]> {
  const byPokemonId = new Map<number, PokemonMoveLearnset[]>();
  const lines = csvText.split(/\r?\n/).filter(Boolean);

  for (let i = 1; i < lines.length; i++) {
    const [pokemonIdRaw, versionGroupIdRaw, moveIdRaw, methodIdRaw, levelRaw] =
      lines[i].split(',');

    const pokemonId = Number(pokemonIdRaw);
    const versionGroupId = Number(versionGroupIdRaw);
    const moveId = Number(moveIdRaw);
    const methodId = Number(methodIdRaw);
    const level = Number(levelRaw);

    if (!Number.isFinite(pokemonId) || !Number.isFinite(moveId)) continue;

    const versionGroup = versionGroups.get(versionGroupId);
    if (!versionGroup) continue;

    const entry: PokemonMoveLearnset = {
      move_id: moveId,
      pokemon_move_method: moveMethods.get(methodId) ?? `method-${methodId}`,
      level: Number.isFinite(level) && level > 0 ? level : null,
      version_group: versionGroup,
    };

    const list = byPokemonId.get(pokemonId) ?? [];
    list.push(entry);
    byPokemonId.set(pokemonId, list);
  }

  for (const [pokemonId, moves] of byPokemonId) {
    byPokemonId.set(pokemonId, dedupeMoves(moves, versionGroupPriority));
  }

  return byPokemonId;
}

function pickMovesFromRaw(
  rawMoves: PokemonMoveLearnset[] | undefined,
  versionGroupPriority: Map<string, number>,
  allowedOnly: boolean,
): PokemonMoveLearnset[] {
  if (!rawMoves?.length) return [];

  const filtered = allowedOnly
    ? rawMoves.filter((move) => ALLOWED_VERSION_GROUP_SET.has(move.version_group))
    : rawMoves;

  return dedupeMoves(filtered, versionGroupPriority);
}

function resolvePokemonMoves(
  movesByPokemonId: Map<number, PokemonMoveLearnset[]>,
  versionGroupPriority: Map<string, number>,
  pokeapiId: number,
  baseSpeciesId: number,
): PokemonMoveLearnset[] {
  const candidateIds =
    pokeapiId === baseSpeciesId ? [pokeapiId] : [pokeapiId, baseSpeciesId];

  for (const pokemonId of candidateIds) {
    const raw = movesByPokemonId.get(pokemonId);
    const fromAllowed = pickMovesFromRaw(raw, versionGroupPriority, true);
    if (fromAllowed.length > 0) return fromAllowed;
  }

  for (const pokemonId of candidateIds) {
    const raw = movesByPokemonId.get(pokemonId);
    const fromAnyVersion = pickMovesFromRaw(raw, versionGroupPriority, false);
    if (fromAnyVersion.length > 0) return fromAnyVersion;
  }

  return [];
}

/**
 * pokemon.csv 틀을 유지한 채 PokeAPI pokemon_moves CSV 기준
 * 포켓몬별 배울 수 있는 기술을 JSON으로 생성합니다.
 * 실행: npx tsx src/utils/pokemonMovesapi.ts
 */
export async function generatePokemonWithMoves(): Promise<PokemonWithMoves[]> {
  console.log('포켓몬 기술 습득 데이터 생성 시작...');

  const pokemonRows = parsePokemonCsv();

  const [pokemonMovesCsv, moveMethodsCsv, versionGroupsCsv] = await Promise.all([
    fetchCsv(`${POKEAPI_CSV_BASE}/pokemon_moves.csv`),
    fetchCsv(`${POKEAPI_CSV_BASE}/pokemon_move_methods.csv`),
    fetchCsv(`${POKEAPI_CSV_BASE}/version_groups.csv`),
  ]);

  const moveMethods = loadIdNameMap(moveMethodsCsv);
  const versionGroups = loadIdNameMap(versionGroupsCsv);
  const versionGroupPriority = loadVersionGroupPriority(versionGroupsCsv);

  const movesByPokemonId = loadPokemonMoves(
    pokemonMovesCsv,
    moveMethods,
    versionGroups,
    versionGroupPriority,
  );

  const result: PokemonWithMoves[] = pokemonRows.map((row) => ({
    id: row.id,
    number: row.number,
    name: row.name,
    moves: resolvePokemonMoves(
      movesByPokemonId,
      versionGroupPriority,
      row.pokeapiId,
      row.baseSpeciesId,
    ),
  }));

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(result, null, 2), 'utf8');

  const withMoves = result.filter((row) => row.moves.length > 0).length;
  const withoutMoves = result.filter((row) => row.moves.length === 0);
  const totalMoves = result.reduce((sum, row) => sum + row.moves.length, 0);

  console.log(`저장 완료: ${OUTPUT_PATH}`);
  console.log(`포켓몬 ${result.length}마리 / 기술 데이터 있음 ${withMoves}마리`);
  console.log(`총 습득 기록 ${totalMoves.toLocaleString()}건`);
  console.log(`허용 버전: ${ALLOWED_VERSION_GROUPS.join(', ')}`);

  if (withoutMoves.length > 0) {
    console.warn(
      `기술 없음 ${withoutMoves.length}마리:`,
      withoutMoves.slice(0, 10).map((p) => `${p.name}(${p.id})`).join(', '),
    );
  }

  return result;
}

const isDirectRun =
  process.argv[1] != null &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirectRun) {
  generatePokemonWithMoves().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
