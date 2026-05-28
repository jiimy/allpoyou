// PokeAPI GraphQL 클라이언트 — 도구(아이템) 데이터
// 엔드포인트: https://pokeapi.co/docs/graphql

const POKEAPI_GRAPHQL_ENDPOINT = 'https://graphql.pokeapi.co/v1beta2';

// PokeAPI 언어 ID. 한국어는 3.
const KOREAN_LANGUAGE_ID = 3;

// 캐시 수명 (1주). 도구 데이터는 거의 변하지 않음.
const DEFAULT_REVALIDATE_SECONDS = 60 * 60 * 24 * 7;

const ALL_ITEMS_KOREAN_QUERY = /* GraphQL */ `
  query AllItemsKr {
    item(order_by: { id: asc }) {
      id
      name
      cost
      itemnames(where: { language_id: { _eq: ${KOREAN_LANGUAGE_ID} } }) {
        name
      }
      itemflavortexts(where: { language_id: { _eq: ${KOREAN_LANGUAGE_ID} } }) {
        flavor_text
      }
      itemcategory {
        name
        itemcategorynames(where: { language_id: { _eq: ${KOREAN_LANGUAGE_ID} } }) {
          name
        }
      }
    }
  }
`;

type RawItem = {
  id: number;
  name: string;
  cost: number;
  itemnames: { name: string }[];
  itemflavortexts: { flavor_text: string }[];
  itemcategory: {
    name: string;
    itemcategorynames: { name: string }[];
  } | null;
};

type GraphQLResponse<T> = { data: T } | { errors: { message: string }[] };

export type ItemKr = {
  /** 도구 ID */
  id: number;
  /** 영문 이름 (예: "master-ball") */
  name: string;
  /** 한글 이름 (예: "마스터볼") */
  nameKo: string;
  /** 도감 설명 */
  description: string;
  /** 구매 가격 */
  cost: number;
  /** 영문 카테고리 (예: "standard-balls") */
  categoryEn: string;
  /** 한글 카테고리 */
  categoryKo: string;
};

/**
 * PokeAPI GraphQL에 질의해 모든 도구의
 * ID / 이름(한글) / 설명 / 가격 / 카테고리를 가져옵니다.
 */
export async function fetchAllItemsKr(): Promise<ItemKr[]> {
  const res = await fetch(POKEAPI_GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      query: ALL_ITEMS_KOREAN_QUERY,
      operationName: 'AllItemsKr',
    }),
    next: {
      revalidate: DEFAULT_REVALIDATE_SECONDS,
      tags: ['item-kr'],
    },
  });

  if (!res.ok) {
    throw new Error(`PokeAPI 요청 실패: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as GraphQLResponse<{
    item: RawItem[];
  }>;

  if ('errors' in json) {
    const message = json.errors.map((e) => e.message).join(', ');
    throw new Error(`PokeAPI GraphQL 오류: ${message}`);
  }

  return json.data.item.map(toItemKr);
}

function toItemKr(raw: RawItem): ItemKr {
  const description =
    raw.itemflavortexts[0]?.flavor_text.replace(/\n/g, ' ').replace(/\f/g, ' ') ?? '';

  return {
    id: raw.id,
    name: raw.name,
    nameKo: raw.itemnames[0]?.name ?? raw.name,
    description,
    cost: raw.cost,
    categoryEn: raw.itemcategory?.name ?? '',
    categoryKo: raw.itemcategory?.itemcategorynames[0]?.name ?? raw.itemcategory?.name ?? '',
  };
}
