import { ITEM_GROUPS } from '@/constants/itemCategoryGroups';
import type { ItemKr } from '@/types/item';
import itemsData from '../../public/data/item.json';

const ALL_ITEMS = itemsData as ItemKr[];

const HELD_CATEGORIES =
  ITEM_GROUPS.find((group) => group.id === 'held')?.categories ?? [];

export const HELD_ITEMS: ItemKr[] = ALL_ITEMS.filter((item) =>
  HELD_CATEGORIES.includes(item.categoryKo),
);

export function searchHeldItems(keyword: string, limit = 50): ItemKr[] {
  const q = keyword.trim();
  if (!q) return HELD_ITEMS.slice(0, limit);

  const qLower = q.toLowerCase();
  return HELD_ITEMS.filter(
    (item) =>
      item.nameKo.includes(q) ||
      item.description.includes(q) ||
      item.name.toLowerCase().includes(qLower),
  ).slice(0, limit);
}

export function getItemNameKoById(id: number | null): string | null {
  if (id == null) return null;
  return ALL_ITEMS.find((item) => item.id === id)?.nameKo ?? null;
}

export function getItemById(id: number | null): ItemKr | null {
  if (id == null) return null;
  return ALL_ITEMS.find((item) => item.id === id) ?? null;
}
