export type ItemGroupId =
  | 'all'
  | 'ball'
  | 'healing'
  | 'held'
  | 'growth'
  | 'life'
  | 'other';

export type ItemGroup = {
  id: ItemGroupId;
  label: string;
  categories: string[] | null;
};

export const ITEM_GROUPS: ItemGroup[] = [
  { id: 'all', label: '전체', categories: null },
  {
    id: 'ball',
    label: '볼',
    categories: [
      'standard-balls',
      'special-balls',
      'apricorn-balls',
      'apricorn-box',
      'catching-bonus',
    ],
  },
  {
    id: 'healing',
    label: '회복/상태',
    categories: [
      'healing',
      'status-cures',
      'revival',
      'pp-recovery',
      'vitamins',
      'picky-healing',
      'medicine',
      'in-a-pinch',
    ],
  },
  {
    id: 'held',
    label: '지참/전투',
    categories: [
      'held-items',
      'bad-held-items',
      'choice',
      'stat-boosts',
      'type-enhancement',
      'type-protection',
      'plates',
      'mega-stones',
      'z-crystals',
      'tera-shard',
      'jewels',
      'scarves',
      'dynamax-crystals',
    ],
  },
  {
    id: 'growth',
    label: '진화/성장',
    categories: [
      'evolution',
      'effort-training',
      'effort-drop',
      'species-candies',
      'species-specific',
      'nature-mints',
      'training',
      'tm-materials',
    ],
  },
  {
    id: 'life',
    label: '생활',
    categories: [
      'picnic',
      'sandwich-ingredients',
      'curry-ingredients',
      'baking-only',
      'mulch',
      'all-mail',
    ],
  },
  {
    id: 'other',
    label: '기타',
    categories: [
      'other',
      'unused',
      'event-items',
      'plot-advancement',
      'collectibles',
      'loot',
      'gameplay',
      'all-machines',
      'memories',
      'miracle-shooter',
      'spelunking',
      'flutes',
      'dex-completion',
      'data-cards',
    ],
  },
];

const categoryToGroup = new Map<string, ItemGroupId>();

for (const group of ITEM_GROUPS) {
  if (!group.categories) continue;
  for (const category of group.categories) {
    categoryToGroup.set(category, group.id);
  }
}

export function getItemGroupId(categoryKo: string): ItemGroupId {
  return categoryToGroup.get(categoryKo) ?? 'other';
}

/** 포챔스 ON + 지참/전투 하위 분류 */
export type PochamsHeldSubGroupId = 'all' | 'tool' | 'mega' | 'berry';

export type PochamsHeldSubGroup = {
  id: PochamsHeldSubGroupId;
  label: string;
};

export const POCHAMS_HELD_SUB_GROUPS: PochamsHeldSubGroup[] = [
  { id: 'all', label: '전체' },
  { id: 'tool', label: '도구' },
  { id: 'mega', label: '메가스톤' },
  { id: 'berry', label: '열매' },
];

/** nameKo 끝글자 기준: 나이트→메가스톤, 열매→열매, 그 외→도구 */
export function getPochamsHeldSubGroupId(nameKo: string): Exclude<
  PochamsHeldSubGroupId,
  'all'
> {
  if (nameKo.endsWith('나이트')) return 'mega';
  if (nameKo.endsWith('열매')) return 'berry';
  return 'tool';
}

export const ITEM_SPRITE_BASE =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items';

/** PokeAPI 스프라이트 404 시 사용할 OP.GG 포챔스 아이템 CDN */
export const ITEM_SPRITE_OPGG_BASE =
  'https://s-stats-platform-cdn.op.gg/pokemon-champions/images/items';

const FAIRY_FEATHER_SPRITE_URL =
  'https://etbddsmzchzwmidplocy.supabase.co/storage/v1/object/public/pokemon_champions/images/fairy-father.png';

/** OP.GG 경로용 슬러그: sitrus_berry → sitrus-berry */
export function toOpggItemSlug(name: string): string {
  return name.trim().toLowerCase().replace(/_/g, '-');
}

export function getItemSpriteUrl(name: string) {
  if (name === 'fairy_feather') {
    return FAIRY_FEATHER_SPRITE_URL;
  }
  return `${ITEM_SPRITE_BASE}/${name}.png`;
}

export function getItemSpriteFallbackUrl(name: string) {
  return `${ITEM_SPRITE_OPGG_BASE}/${toOpggItemSlug(name)}.png`;
}
