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
      order_by: { id: asc }
    ) {
      id
      name
      is_default
      
      pokemonspecy {
        pokemonspeciesnames(where: { language_id: { _eq: ${KOREAN_LANGUAGE_ID} } }) {
          name
        }
      }
      
      pokemonforms {
        pokemonformnames(where: { language_id: { _eq: ${KOREAN_LANGUAGE_ID} } }) {
          name
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

      # ★ 여기에 특성(Abilities) 데이터를 추가합니다.
      pokemonabilities {
        is_hidden # true면 숨겨진 특성(드림특성), false면 일반 특성
        slot      # 특성 슬롯 (1번 특성, 2번 특성 구분용)
        ability {
          id
          name    # 영문 특성명
          # 특성의 한글 이름 추출
          abilitynames(where: { language_id: { _eq: ${KOREAN_LANGUAGE_ID} } }) {
            name
          }
        }
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
  pokemonabilities: {
    is_hidden: boolean;
    slot: number;
    ability: {
      id: number;
      name: string;
      abilitynames: { name: string }[];
    };
  }[];
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

export type PokemonAbility = {
  /** 특성 ID */
  id: number;
  /** 영문 특성명 (예: "overgrow") */
  en: string;
  /** 한글 특성명 (예: "심록") */
  ko: string;
  /** 숨겨진 특성(드림특성) 여부 */
  isHidden: boolean;
  /** 특성 슬롯 (1·2번 일반, 3번 숨겨진) */
  slot: number;
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
  /** 특성 (일반 1~2개 + 숨겨진 특성) */
  abilities: PokemonAbility[];
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
 * 번호 / 이름(한글) / 타입(한글) / 종족값 / 특성(한글) / 이미지 URL을 가져옵니다.
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

  const abilities: PokemonAbility[] = [...(raw.pokemonabilities ?? [])]
    .sort((a, b) => a.slot - b.slot)
    .map((entry) => ({
      id: entry.ability.id,
      en: entry.ability.name,
      ko: entry.ability.abilitynames?.[0]?.name ?? entry.ability.name,
      isHidden: entry.is_hidden,
      slot: entry.slot,
    }));

  return {
    id: raw.id,
    name: raw.name,
    nameKo,
    types,
    stats,
    images: toPokemonImages(raw),
    abilities,
  };
}
