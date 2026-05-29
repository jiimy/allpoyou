import { type NextRequest } from 'next/server';
import { cookies } from 'next/headers';

import { fetchAllPokemonKr, type PokemonAbility, type PokemonKr } from '@/utils/pokeapi';
import { normalizePokemon } from '@/utils/pokemonNormalize';
import {
  getBaseEnglishNameForDex,
  isGmaxEnglishName,
  isMegaEvolutionEnglishName,
} from '@/utils/pokemonName';
import { createClient } from '@/utils/supabase/server';

// 1주일(604800초). 값은 정적 리터럴이어야 Next.js 빌드가 통과함.
export const revalidate = 604800;

type DbPokemonRow = {
  id?: number;
  number: number;
  name: string;
  nameKo: string;
  images: string[] | null;
  types: string[];
  H: number;
  A: number;
  B: number;
  C: number;
  D: number;
  S: number;
  total: number;
  ability: string[] | null;
  s_ability: string[] | null;
};

/**
 * GET /api/pokemon
 *
 * 쿼리 파라미터:
 *   - source=db  Supabase `pokemon` 테이블 (프론트엔드용)
 *   - limit      (PokeAPI 모드) 가져올 개수
 *   - offset     (PokeAPI 모드) 건너뛸 개수, 기본 0
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    if (searchParams.get('source') === 'db') {
      const cookieStore = await cookies();
      const supabase = createClient(cookieStore);

      const { data, error } = await fetchAllPokemonRowsFromDb(supabase);

      if (error) {
        return Response.json({ error: error.message }, { status: 500 });
      }

      const results = ((data ?? []) as DbPokemonRow[]).map((row, index) =>
        normalizePokemon({
          id: row.id ?? row.number * 10000 + index,
          number: row.number,
          name: row.name,
          nameKo: row.nameKo,
          images: row.images,
          types: row.types,
          H: row.H,
          A: row.A,
          B: row.B,
          C: row.C,
          D: row.D,
          S: row.S,
          total: row.total,
          ability: row.ability,
          s_ability: row.s_ability,
        }),
      );

      return Response.json({ total: results.length, results });
    }

    const limit = parsePositiveInt(searchParams.get('limit'));
    const offset = parsePositiveInt(searchParams.get('offset')) ?? 0;

    const all = await fetchAllPokemonKr();

    const sliced =
      typeof limit === 'number' ? all.slice(offset, offset + limit) : all.slice(offset);

    return Response.json({
      total: all.length,
      count: sliced.length,
      results: sliced,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ error: message }, { status: 500 });
  }
}

function parsePositiveInt(value: string | null): number | undefined {
  if (value == null) return undefined;
  const n = Number.parseInt(value, 10);
  if (!Number.isFinite(n) || n < 0) return undefined;
  return n;
}

const DB_POKEMON_SELECT =
  'id, number, name, nameKo, images, types, H, A, B, C, D, S, total, ability, s_ability';

/** Supabase 기본 행 제한(1000)을 넘는 전체 목록을 페이지 단위로 조회 */
async function fetchAllPokemonRowsFromDb(
  supabase: ReturnType<typeof createClient>,
): Promise<{ data: DbPokemonRow[] | null; error: { message: string } | null }> {
  const pageSize = 1000;
  const all: DbPokemonRow[] = [];
  let from = 0;

  while (true) {
    const { data, error } = await supabase
      .from('pokemon')
      .select(DB_POKEMON_SELECT)
      .order('number', { ascending: true })
      .order('name', { ascending: true })
      .range(from, from + pageSize - 1);

    if (error) return { data: null, error };

    const page = (data ?? []) as DbPokemonRow[];
    all.push(...page);

    if (page.length < pageSize) break;
    from += pageSize;
  }

  return { data: all, error: null };
}

/** PokeAPI 영문 name 기준으로 -cap(이벤트 모자) 폼은 저장하지 않음 */
function shouldSkipPokemon(name: string): boolean {
  return name.includes('-cap');
}

/**
 * 기준 영문명(메가/거다이 접미사 제거)별 최소 PokeAPI id → 전국도감 number.
 * 예: venusaur, venusaur-mega, venusaur-gmax → 모두 venusaur의 min id(3).
 */
function buildMinIdByBaseEnglish(pokemon: PokemonKr[]): Map<string, number> {
  const minIdByBase = new Map<string, number>();

  for (const p of pokemon) {
    const base = getBaseEnglishNameForDex(p.name);
    const current = minIdByBase.get(base);
    if (current === undefined || p.id < current) {
      minIdByBase.set(base, p.id);
    }
  }

  return minIdByBase;
}

/**
 * PokeAPI name / nameKo를 DB 표시용 한글 이름으로 변환.
 * 폼 접미사 → 메가 X/Y/Z 접미사 → 리전·거다이·메가 접두사 순으로 조합.
 */
function buildDisplayName(englishName: string, nameKo: string): string {
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
    else baseName = nameKo;
  } else if (nameKo === '가이오가') {
    if (englishName.includes('-primal')) baseName = `원시 ${nameKo}`;
    else baseName = nameKo;
  } else if (nameKo === '켄타로스') {
    if (englishName.includes('-combat-breed')) baseName = `${nameKo} 격투종`;
    else if (englishName.includes('-blaze-breed')) baseName = `${nameKo} 불꽃종`;
    else if (englishName.includes('-aqua-breed')) baseName = `${nameKo} 물종`;
    else baseName = nameKo;
  } else if (nameKo === '우라오스') {
    if (englishName.includes('-rapid-strike')) baseName = `${nameKo} 연격의 태세`;
    else if (englishName.includes('-single-strike')) baseName = `${nameKo} 일격의 태세`;
    else baseName = nameKo;
  } else if (nameKo === '로토무') {
    if (englishName.includes('-heat')) baseName = `히트 ${nameKo}`;
    else if (englishName.includes('-wash')) baseName = `워시 ${nameKo}`;
    else if (englishName.includes('-frost')) baseName = `프로스트 ${nameKo}`;
    else if (englishName.includes('-fan')) baseName = `스핀 ${nameKo}`;
    else if (englishName.includes('-mow')) baseName = `커트 ${nameKo}`;
    else baseName = nameKo;
  } else if (nameKo === '오거폰') {
    if (englishName.includes('-wellspring-mask')) baseName = `${nameKo} 우물의 가면`;
    else if (englishName.includes('-hearthflame-mask')) baseName = `${nameKo} 화덕의 가면`;
    else if (englishName.includes('-cornerstone-mask')) baseName = `${nameKo} 주춧돌의 가면`;
    else baseName = nameKo;
  } else if (nameKo === '버드렉스') {
    if (englishName.includes('-ice')) baseName = `백마 ${nameKo}`;
    else if (englishName.includes('-shadow')) baseName = `흑마 ${nameKo}`;
    else baseName = nameKo;
  }

  let megaSuffix = '';
  if (englishName.includes('-mega-x')) megaSuffix = ' X';
  else if (englishName.includes('-mega-y')) megaSuffix = ' Y';
  else if (englishName.includes('-mega-z')) megaSuffix = ' Z';

  let prefix = '';
  // 거다이/메가는 endsWith 기준 (blastoise-mega 등 -mega로 끝나는 이름 포함)
  if (isGmaxEnglishName(englishName)) prefix = '거다이 ';
  else if (isMegaEvolutionEnglishName(englishName)) prefix = '메가 ';
  else if (englishName.includes('-galar')) prefix = '가라르 ';
  else if (englishName.includes('-paldea')) prefix = '팔데아 ';
  else if (englishName.includes('-hisui')) prefix = '히스이 ';
  else if (englishName.includes('-alola')) prefix = '알로라 ';

  return `${prefix}${baseName}${megaSuffix}`;
}

/** 한글 타입명을 ㄱ~ㅎ 오름차순으로 정렬 */
function sortTypesKo(types: string[]): string[] {
  return [...types].sort((a, b) => a.localeCompare(b, 'ko'));
}

/** [공식 일러스트, Showdown 애니 GIF] */
function buildImages(p: PokemonKr): string[] {
  const official =
    p.images.official ??
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`;
  const animated = `https://play.pokemonshowdown.com/sprites/ani/${p.name}.gif`;
  return [official, animated];
}

/** isHidden=false → ability, isHidden=true → s_ability (한글명 배열) */
function splitAbilities(abilities: PokemonAbility[]): {
  ability: string[];
  s_ability: string[];
} {
  const ability: string[] = [];
  const s_ability: string[] = [];

  for (const entry of abilities) {
    if (entry.isHidden) s_ability.push(entry.ko);
    else ability.push(entry.ko);
  }

  return { ability, s_ability };
}

/**
 * POST /api
 *
 * 1) Supabase 연결을 확인하고
 * 2) PokeAPI 한국어 데이터를 가공해 `pokemon` 테이블에 upsert.
 *
 * 컬럼 매핑:
 *   minId(baseEnglish) -> number  (메가/거다이는 접미사 제거 후 같은 기준명끼리 min id)
 *   p.name        -> name  (영문 포켓몬명)
 *   buildDisplayName -> nameKo  (폼/리전/메가 등 한글 표시명)
 *   types[].ko (ㄱ~ㅎ 정렬) -> types (text[])
 *   stats.hp      -> H
 *   stats.attack  -> A
 *   stats.defense -> B
 *   stats.specialAttack  -> C
 *   stats.specialDefense -> D
 *   stats.speed   -> S
 *   stats.total   -> total
 *   abilities(isHidden=false)[].ko -> ability (text[])
 *   abilities(isHidden=true)[].ko  -> s_ability (text[])
 *   [official, showdown ani] -> images (text[])
 */
export async function POST() {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    // 1) 연결 확인 - pokemon 테이블에 가벼운 count 쿼리
    const { error: pingError } = await supabase
      .from('pokemon')
      .select('number', { count: 'exact', head: true });

    if (pingError) {
      return Response.json(
        {
          ok: false,
          stage: 'connect',
          error: `Supabase 연결 실패: ${pingError.message}`,
        },
        { status: 500 },
      );
    }

    // 2) PokeAPI에서 한국어 데이터 가져오기
    const all = await fetchAllPokemonKr();
    const minIdByBaseEnglish = buildMinIdByBaseEnglish(all);

    const rows = all
      .filter((p) => !shouldSkipPokemon(p.name))
      .map((p) => {
        const { ability, s_ability } = splitAbilities(p.abilities);
        const baseEnglish = getBaseEnglishNameForDex(p.name);

        return {
          sourceId: p.id,
          number: minIdByBaseEnglish.get(baseEnglish) ?? p.id,
          name: p.name,
          nameKo: buildDisplayName(p.name, p.nameKo),
          images: buildImages(p),
          types: sortTypesKo(p.types.map((t) => t.ko)),
          ability,
          s_ability,
          H: p.stats.hp,
          A: p.stats.attack,
          B: p.stats.defense,
          C: p.stats.specialAttack,
          D: p.stats.specialDefense,
          S: p.stats.speed,
          total: p.stats.total,
        };
      });

    // upsert 배치 내 name 중복 시 Postgres 오류 방지 — 같은 이름이면 id가 낮은 것만 유지
    const uniqueByName = new Map<string, (typeof rows)[number]>();
    for (const row of rows) {
      const existing = uniqueByName.get(row.name);
      if (!existing || row.sourceId < existing.sourceId) {
        uniqueByName.set(row.name, row);
      }
    }
    const uniqueRows = [...uniqueByName.values()].map((row) => {
      const { sourceId, ...rest } = row;
      void sourceId;
      return rest;
    });

    // 3) upsert (name 컬럼 기준 충돌 시 덮어쓰기 — 같은 number를 공유하는 폼이 있음)
    const { error: upsertError } = await supabase
      .from('pokemon')
      .upsert(uniqueRows, { onConflict: 'name' });

    if (upsertError) {
      return Response.json(
        {
          ok: false,
          stage: 'upsert',
          error: `pokemon 테이블 upsert 실패: ${upsertError.message}`,
        },
        { status: 500 },
      );
    }

    const megaSamples = uniqueRows.filter((r) => r.nameKo.startsWith('메가 ')).slice(0, 3);
    const gmaxSamples = uniqueRows.filter((r) => r.nameKo.startsWith('거다이 ')).slice(0, 3);

    return Response.json({
      ok: true,
      total: uniqueRows.length,
      skippedDuplicates: rows.length - uniqueRows.length,
      sample: uniqueRows[0],
      megaCount: uniqueRows.filter((r) => isMegaEvolutionEnglishName(r.name)).length,
      gmaxCount: uniqueRows.filter((r) => isGmaxEnglishName(r.name)).length,
      megaSamples,
      gmaxSamples,
      blastoiseMega: uniqueRows.find((r) => r.name === 'blastoise-mega'),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ ok: false, error: message }, { status: 500 });
  }
}
