import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const POKEAPI_MOVE_NAMES_CSV =
  'https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/csv/move_names.csv';
const KOREAN_LANGUAGE_ID = 3;

type PokeApiName = { language: { name: string }; name: string };

type FlavorTextEntry = {
  flavor_text: string;
  language: { name: string };
  version_group: { name: string };
};

type EffectEntry = {
  effect: string;
  short_effect: string;
  language: { name: string };
};

type MoveDetail = {
  id: number;
  names: PokeApiName[];
  type: { name: string };
  damage_class: { name: string };
  power: number | null;
  accuracy: number | null;
  pp: number;
  flavor_text_entries: FlavorTextEntry[];
  effect_entries: EffectEntry[];
};

export type MoveEntry = {
  id: number;
  englishName: string;
  koreanName: string;
  description: string;
  type: string;
  damage_class: string;
  power: number | null;
  accuracy: number | null;
  pp: number;
};

export type MoveDictionary = Record<string, MoveEntry>;

const MOVES_OUTPUT_PATH = path.join(process.cwd(), 'public', 'data', 'moves-db.json');

/** PokeAPI/PokemonDB에 한글명이 없는 최신·DLC 기술 */
const EXTRA_MOVE_KOREAN: Record<string, string> = {
  'blood-moon': '블러드문',
  'matcha-gotcha': '휘적휘적포',
  'syrup-bomb': '시럽봄',
  'ivy-cudgel': '덩굴방망이',
};

/** 공식 한글 설명 (나무위키·게임 데이터 기준) */
const EXTRA_MOVE_DESCRIPTION: Record<string, string> = {
  'blood-moon':
    '피와 같이 붉은 보름달에서 혼신의 기백을 발사한다. 이 기술은 2회 연속으로 쓸 수 없다.',
  'matcha-gotcha':
    '휘저은 차를 대포처럼 발사해 준 데미지의 절반을 HP로 회복한다. 20% 확률로 상대를 화상 상태로 만든다.',
  'syrup-bomb':
    '상대에게 물엿을 발사해 폭발시켜 공격한다. 상대를 물엿범벅 상태로 만들어 3턴 동안 매 턴 스피드를 1랭크씩 감소시킨다.',
  'ivy-cudgel':
    '덩굴을 휘감은 방망이로 때린다. 쓰고 있는 가면에 따라 타입이 바뀐다. 급소에 맞기 쉽다.',
  'blazing-torque': '타오르는 엔진으로 상대에게 부릉거린다. 화상 상태로 만들 때가 있다.',
  'wicked-torque': '악의적으로 상대를 향해 부릉거린다. 잠듦 상태로 만들 때가 있다.',
  'noxious-torque': '독성 엔진으로 상대에게 부릉거린다. 독 상태로 만들 때가 있다.',
  'combat-torque': '상대를 향해 기세 좋게 부릉거린다. 마비 상태로 만들 때가 있다.',
  'magical-torque': '메르헨틱한 엔진으로 상대에게 부릉거린다. 상대를 혼란시킬 때가 있다.',
};

/** PokeAPI/PokemonDB에 한글명이 없는 섀도 기술 (콜로세um 전용) */
const SHADOW_MOVE_KOREAN: Record<string, string> = {
  'shadow-rush': '섀도러시',
  'shadow-blast': '섀도블래스트',
  'shadow-blitz': '섀도블리츠',
  'shadow-bolt': '섀도볼트',
  'shadow-break': '섀도브레이크',
  'shadow-chill': '섀도칠',
  'shadow-end': '섀도엔드',
  'shadow-fire': '섀도파이어',
  'shadow-rave': '섀도레이브',
  'shadow-storm': '섀도스톰',
  'shadow-wave': '섀도웨이브',
  'shadow-down': '섀도다운',
  'shadow-half': '섀도하프',
  'shadow-hold': '섀도홀드',
  'shadow-mist': '섀도미스트',
  'shadow-panic': '섀도패닉',
  'shadow-shed': '섀도쉐드',
  'shadow-sky': '섀도스카이',
};

function hasHangul(text: string): boolean {
  return /[\uAC00-\uD7A3]/.test(text);
}

function looksLikeEnglishSlug(text: string): boolean {
  return /^[a-z0-9-]+$/.test(text);
}

function normalizeDescription(text: string): string {
  return text.replace(/\n/g, ' ').replace(/\f/g, ' ').replace(/\s+/g, ' ').trim();
}

const UNUSABLE_DESCRIPTION = /사용할 수 없는 기술/;

function pickFlavorText(entries: FlavorTextEntry[], lang: string): string | null {
  const filtered = entries.filter((e) => e.language.name === lang);
  if (filtered.length === 0) return null;

  const valid = filtered.filter((e) => !UNUSABLE_DESCRIPTION.test(e.flavor_text));
  const pool = valid.length > 0 ? valid : filtered;
  return normalizeDescription(pool[pool.length - 1].flavor_text);
}

async function loadKoreanNamesByMoveId(): Promise<Map<number, string>> {
  const res = await fetch(POKEAPI_MOVE_NAMES_CSV);
  if (!res.ok) {
    throw new Error(`move_names.csv 요청 실패: ${res.status} ${res.statusText}`);
  }

  const map = new Map<number, string>();
  for (const line of (await res.text()).split(/\r?\n/)) {
    if (!line || line.startsWith('move_id')) continue;
    const [moveIdRaw, langIdRaw, ...nameParts] = line.split(',');
    if (Number(langIdRaw) !== KOREAN_LANGUAGE_ID) continue;
    const moveId = Number(moveIdRaw);
    if (!Number.isFinite(moveId)) continue;
    map.set(moveId, nameParts.join(',').trim());
  }
  return map;
}

async function fetchKoreanNameFromPokemonDb(englishSlug: string): Promise<string | null> {
  const res = await fetch(`https://pokemondb.net/move/${englishSlug}`, {
    headers: { accept: 'text/html' },
  });
  if (!res.ok) return null;

  const html = await res.text();
  const match = html.match(/<th>\s*Korean\s*<\/th>\s*<td[^>]*>([^<]+)<\/td>/i);
  const name = match?.[1]?.trim();
  return name && hasHangul(name) ? name : null;
}

async function fetchEnglishDescriptionFromPokemonDb(englishSlug: string): Promise<string | null> {
  const res = await fetch(`https://pokemondb.net/move/${englishSlug}`, {
    headers: { accept: 'text/html' },
  });
  if (!res.ok) return null;

  const html = await res.text();

  const gameMatch = html.match(
    /<h2[^>]*>\s*Game descriptions\s*<\/h2>[\s\S]*?<td[^>]*>([\s\S]*?)<\/td>/i,
  );
  if (gameMatch?.[1]) {
    return normalizeDescription(gameMatch[1].replace(/<[^>]+>/g, ''));
  }

  const effectsMatch = html.match(/<h2>\s*Effects\s*<\/h2>[\s\S]*?<p>([\s\S]*?)<\/p>/i);
  if (effectsMatch?.[1]) {
    return normalizeDescription(effectsMatch[1].replace(/<[^>]+>/g, ''));
  }

  return null;
}

function resolveKoreanName(
  englishSlug: string,
  moveId: number,
  restNames: PokeApiName[],
  csvNames: Map<number, string>,
): string | null {
  const fromExtra = EXTRA_MOVE_KOREAN[englishSlug];
  if (fromExtra) return fromExtra;

  const fromRest = restNames.find((n) => n.language.name === 'ko')?.name;
  if (fromRest && hasHangul(fromRest)) return fromRest;

  const fromCsv = csvNames.get(moveId);
  if (fromCsv && hasHangul(fromCsv)) return fromCsv;

  return null;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const translationCache = new Map<string, string>();

async function translateToKorean(text: string): Promise<string> {
  const normalized = normalizeDescription(text);
  if (!normalized) return '';

  const cached = translationCache.get(normalized);
  if (cached) return cached;

  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ko&dt=t&q=${encodeURIComponent(normalized)}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`번역 요청 실패: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as [Array<[string]>, unknown];
  const translated = json[0]?.map((part) => part[0]).join('') ?? normalized;
  translationCache.set(normalized, translated);
  await sleep(120);
  return translated;
}

async function resolveDescription(
  englishSlug: string,
  detail: MoveDetail,
): Promise<string> {
  const fromExtra = EXTRA_MOVE_DESCRIPTION[englishSlug];
  if (fromExtra) return fromExtra;

  const koFlavor = pickFlavorText(detail.flavor_text_entries, 'ko');
  if (koFlavor && hasHangul(koFlavor)) return koFlavor;

  const enFlavor = pickFlavorText(detail.flavor_text_entries, 'en');
  if (enFlavor) return translateToKorean(enFlavor);

  const shortEffect = detail.effect_entries.find((e) => e.language.name === 'en')?.short_effect;
  if (shortEffect) return translateToKorean(shortEffect);

  const fromPokemonDb = await fetchEnglishDescriptionFromPokemonDb(englishSlug);
  if (fromPokemonDb) return translateToKorean(fromPokemonDb);

  const effect = detail.effect_entries.find((e) => e.language.name === 'en')?.effect;
  if (effect) return translateToKorean(effect);

  return '';
}

/**
 * PokeAPI REST + move_names.csv + PokemonDB 보조 소스로
 * 모든 기술 데이터를 수집해 JSON 파일로 저장합니다.
 * 실행: npx tsx src/utils/skillapi.ts
 */
export async function downloadAllMoves(): Promise<MoveDictionary> {
  console.log('포켓몬 기술 데이터 수집 시작...');

  const [response, csvNames] = await Promise.all([
    fetch('https://pokeapi.co/api/v2/move/?limit=1000'),
    loadKoreanNamesByMoveId(),
  ]);

  if (!response.ok) {
    throw new Error(`기술 목록 요청 실패: ${response.status} ${response.statusText}`);
  }

  const moveList = (await response.json()) as {
    results: { name: string; url: string }[];
  };

  const moveDictionary: MoveDictionary = {};
  const needsPokemonDb: { slug: string; id: number }[] = [];

  for (const item of moveList.results) {
    try {
      const detailRes = await fetch(item.url);
      if (!detailRes.ok) {
        throw new Error(`${detailRes.status} ${detailRes.statusText}`);
      }

      const detail = (await detailRes.json()) as MoveDetail;
      const koreanName =
        resolveKoreanName(item.name, detail.id, detail.names, csvNames) ?? item.name;
      const description = await resolveDescription(item.name, detail);

      if (looksLikeEnglishSlug(koreanName)) {
        needsPokemonDb.push({ slug: item.name, id: detail.id });
      }

      moveDictionary[item.name] = {
        id: detail.id,
        englishName: item.name,
        koreanName,
        description,
        type: detail.type.name,
        damage_class: detail.damage_class.name,
        power: detail.power,
        accuracy: detail.accuracy,
        pp: detail.pp,
      };
    } catch (error) {
      console.error(`${item.name} 데이터 가져오기 실패`, error);
    }
  }

  if (needsPokemonDb.length > 0) {
    console.log(`한글명 보완 대상 ${needsPokemonDb.length}개 — PokemonDB 조회 중...`);

    for (const { slug } of needsPokemonDb) {
      const override = EXTRA_MOVE_KOREAN[slug] ?? SHADOW_MOVE_KOREAN[slug];
      const koreanName = override ?? (await fetchKoreanNameFromPokemonDb(slug));
      if (koreanName) {
        moveDictionary[slug].koreanName = koreanName;
        console.log(`한글 보완: ${slug} → ${koreanName}`);
      } else {
        console.warn(`한글명 없음: ${slug}`);
      }

      if (!moveDictionary[slug].description || !hasHangul(moveDictionary[slug].description)) {
        const extraDesc = EXTRA_MOVE_DESCRIPTION[slug];
        if (extraDesc) {
          moveDictionary[slug].description = extraDesc;
        } else {
          const enDesc = await fetchEnglishDescriptionFromPokemonDb(slug);
          if (enDesc) {
            moveDictionary[slug].description = await translateToKorean(enDesc);
          }
        }
      }

      await sleep(150);
    }
  }

  if (fs.existsSync(MOVES_OUTPUT_PATH)) {
    fs.unlinkSync(MOVES_OUTPUT_PATH);
  }

  fs.mkdirSync(path.dirname(MOVES_OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(MOVES_OUTPUT_PATH, JSON.stringify(moveDictionary, null, 2), 'utf8');

  const unresolvedNames = Object.values(moveDictionary).filter((m) =>
    looksLikeEnglishSlug(m.koreanName),
  );
  const unresolvedDesc = Object.values(moveDictionary).filter(
    (m) => !m.description || !hasHangul(m.description),
  );

  console.log(`저장 완료: ${MOVES_OUTPUT_PATH}`);
  console.log(`총 ${Object.keys(moveDictionary).length}개`);
  console.log(`한글명 미번역 ${unresolvedNames.length}개 / 설명 미번역 ${unresolvedDesc.length}개`);

  if (unresolvedNames.length > 0) {
    console.log('미번역 이름:', unresolvedNames.map((m) => m.englishName).join(', '));
  }
  if (unresolvedDesc.length > 0) {
    console.log('미번역 설명:', unresolvedDesc.map((m) => m.englishName).join(', '));
  }

  return moveDictionary;
}

const isDirectRun =
  process.argv[1] != null &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirectRun) {
  downloadAllMoves().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
