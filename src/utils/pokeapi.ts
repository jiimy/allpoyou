// PokeAPI GraphQL 클라이언트
// 엔드포인트: https://pokeapi.co/docs/graphql
// 주의: 공식 무료 인스턴스는 IP당 100 req/h 제한이 있으니 반드시 캐싱해서 쓸 것.

const POKEAPI_GRAPHQL_ENDPOINT = 'https://graphql.pokeapi.co/v1beta2';

// PokeAPI 언어 ID. 한국어는 3.
const KOREAN_LANGUAGE_ID = 3;

// 캐시 수명 (1주). 포켓몬 기본 데이터는 거의 변하지 않음.
const DEFAULT_REVALIDATE_SECONDS = 60 * 60 * 24 * 7;

const ALL_POKEMON_KOREAN_QUERY = /* GraphQL */ `
  query AllPokemonKr {
    pokemon(
      # 1. 기존 is_default 조건을 지우거나 필요한 만큼 범위를 넓힙니다.
      # 세대 구분이 필요 없다면 아예 비워두거나, limit을 넉넉히 줍니다.
      order_by: { id: asc }
    ) {
      id
      name
      is_default # 기본 폼 여부 확인용 (데이터 정제 시 유용)
      
      # 2. 원본 포켓몬의 한글 본명 (예: 대검귀, 리자몽)
      pokemonspecy {
        pokemonspeciesnames(where: { language_id: { _eq: ${KOREAN_LANGUAGE_ID} } }) {
          name
        }
      }
      
      # 3. ★ 핵심: 리전폼/폼체인지 전용 한글 이름 (예: 히스이의 모습, 메가X 등)
      pokemonforms {
        pokemonformnames(where: { language_id: { _eq: ${KOREAN_LANGUAGE_ID} } }) {
          name # 폼 이름을 따로 쓰거나 본명 뒤에 붙일 때 사용합니다.
        }
      }
      
      pokemonstats {
        base_stat
        stat {
          name
        }
      }
      
      pokemontypes {
        slot
        type {
          name
          typenames(where: { language_id: { _eq: ${KOREAN_LANGUAGE_ID} } }) {
            name
          }
        }
      }

      pokemonsprites {
        sprites
      }
    }
  }
`;

type RawSprites = {
  front_default?: string | null;
  other?: {
    home?: { front_default?: string | null };
    'official-artwork'?: { front_default?: string | null };
  };
};

type RawPokemon = {
  id: number;
  name: string;
  pokemonspecy: {
    pokemonspeciesnames: { name: string }[];
  } | null;
  pokemonstats: {
    base_stat: number;
    stat: { name: string };
  }[];
  pokemontypes: {
    slot: number;
    type: {
      name: string;
      typenames: { name: string }[];
    };
  }[];
  pokemonsprites: { sprites: RawSprites | string }[];
};

type GraphQLResponse<T> = { data: T } | { errors: { message: string }[] };

export type PokemonType = {
  /** 영문 타입명 (예: "grass") */
  en: string;
  /** 한글 타입명 (예: "풀") */
  ko: string;
};

export type PokemonStats = {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  /** 종족값 합계 */
  total: number;
};

export type PokemonImages = {
  /** 공식 일러스트 (official-artwork) */
  official: string | null;
  /** 기본 정면 스프라이트 */
  front: string | null;
  /** Pokémon HOME 렌더 */
  home: string | null;
  /** UI 표시용 대표 이미지 (official → home → front 순) */
  primary: string | null;
};

export type PokemonKr = {
  /** 포켓몬 번호 (전국도감 번호) */
  id: number;
  /** 영문 이름 (예: "bulbasaur") */
  name: string;
  /** 한글 이름 (예: "이상해씨") */
  nameKo: string;
  /** 타입 (1~2개) */
  types: PokemonType[];
  /** 종족값 */
  stats: PokemonStats;
  /** 스프라이트 / 일러스트 URL */
  images: PokemonImages;
};

const STAT_KEY_MAP: Record<string, keyof Omit<PokemonStats, 'total'>> = {
  hp: 'hp',
  attack: 'attack',
  defense: 'defense',
  'special-attack': 'specialAttack',
  'special-defense': 'specialDefense',
  speed: 'speed',
};

/**
 * PokeAPI GraphQL에 질의해 모든 기본형 포켓몬의
 * 번호 / 이름(한글) / 타입(한글) / 종족값 / 이미지 URL을 가져옵니다.
 */
export async function fetchAllPokemonKr(): Promise<PokemonKr[]> {
  const res = await fetch(POKEAPI_GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      query: ALL_POKEMON_KOREAN_QUERY,
      operationName: 'AllPokemonKr',
    }),
    next: {
      revalidate: DEFAULT_REVALIDATE_SECONDS,
      tags: ['pokemon-kr'],
    },
  });

  if (!res.ok) {
    throw new Error(`PokeAPI 요청 실패: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as GraphQLResponse<{
    pokemon: RawPokemon[];
  }>;

  if ('errors' in json) {
    const message = json.errors.map((e) => e.message).join(', ');
    throw new Error(`PokeAPI GraphQL 오류: ${message}`);
  }

  return json.data.pokemon.map(toPokemonKr);
}

function parseRawSprites(value: RawSprites | string | undefined): RawSprites {
  if (value == null) return {};
  if (typeof value === 'string') {
    try {
      return JSON.parse(value) as RawSprites;
    } catch {
      return {};
    }
  }
  return value;
}

function toPokemonImages(raw: RawPokemon): PokemonImages {
  const sprites = parseRawSprites(raw.pokemonsprites?.[0]?.sprites);
  const official = sprites.other?.['official-artwork']?.front_default ?? null;
  const home = sprites.other?.home?.front_default ?? null;
  const front = sprites.front_default ?? null;

  return {
    official,
    home,
    front,
    primary: official ?? home ?? front,
  };
}

function toPokemonKr(raw: RawPokemon): PokemonKr {
  const nameKo = raw.pokemonspecy?.pokemonspeciesnames?.[0]?.name ?? raw.name;

  const types: PokemonType[] = [...raw.pokemontypes]
    .sort((a, b) => a.slot - b.slot)
    .map((t) => ({
      en: t.type.name,
      ko: t.type.typenames?.[0]?.name ?? t.type.name,
    }));

  const stats: PokemonStats = {
    hp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0,
    total: 0,
  };

  for (const s of raw.pokemonstats) {
    const key = STAT_KEY_MAP[s.stat.name];
    if (!key) continue;
    stats[key] = s.base_stat;
    stats.total += s.base_stat;
  }

  return {
    id: raw.id,
    name: raw.name,
    nameKo,
    types,
    stats,
    images: toPokemonImages(raw),
  };
}
