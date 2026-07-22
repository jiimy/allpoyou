import {
  EV_STAT_MAX,
  EV_TOTAL_MAX,
  createEmptyEvs,
  type TeamPokemonEvs,
} from '@/store/PokemonTeamStore';
import type { ItemKr } from '@/types/item';
import type { MoveDbEntry } from '@/types/move';
import { ALL_MOVES } from '@/utils/movesIndex';
import { isValidNature } from '@/utils/natureList';
import itemsData from '../../public/data/item.json';

const ALL_ITEMS = itemsData as ItemKr[];

export type BattlePickItem = {
  rank: number;
  name: string;
  nameEn: string;
  percentage: string;
  hp_points?: string;
  attack_points?: string;
  defense_points?: string;
  sp_atk_points?: string;
  sp_def_points?: string;
  speed_points?: string;
};

function toLookupSlug(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parseEvPoint(raw?: string): number {
  const n = Number(raw);
  if (!Number.isFinite(n) || n <= 0) return 0;
  if (n <= EV_STAT_MAX) return Math.floor(n);
  return Math.min(EV_STAT_MAX, Math.round(n / 8));
}

export function resolveMoveFromBattleItem(
  item: BattlePickItem,
): MoveDbEntry | null {
  const nameKo = item.name.trim();
  const nameEn = item.nameEn.trim();
  const slug = nameEn ? toLookupSlug(nameEn) : '';

  return (
    ALL_MOVES.find((move) => nameKo && move.koreanName === nameKo) ??
    ALL_MOVES.find(
      (move) => nameEn && move.englishName.toLowerCase() === nameEn.toLowerCase(),
    ) ??
    ALL_MOVES.find(
      (move) => slug && toLookupSlug(move.englishName) === slug,
    ) ??
    null
  );
}

export function resolveItemFromBattleItem(
  item: BattlePickItem,
): ItemKr | null {
  const nameKo = item.name.trim();
  const nameEn = item.nameEn.trim();
  const slug = nameEn ? toLookupSlug(nameEn) : '';

  return (
    ALL_ITEMS.find((entry) => nameKo && entry.nameKo === nameKo) ??
    ALL_ITEMS.find(
      (entry) => nameEn && entry.name.toLowerCase() === nameEn.toLowerCase(),
    ) ??
    ALL_ITEMS.find((entry) => slug && toLookupSlug(entry.name) === slug) ??
    ALL_ITEMS.find(
      (entry) =>
        nameEn &&
        entry.name.replace(/-/g, ' ').toLowerCase() === nameEn.toLowerCase(),
    ) ??
    ALL_ITEMS.find(
      (entry) =>
        nameKo &&
        (entry.nameKo.includes(nameKo) || nameKo.includes(entry.nameKo)),
    ) ??
    null
  );
}

export function resolveNatureFromBattleItem(
  item: BattlePickItem,
): string | null {
  const name = item.name.trim();
  if (name && isValidNature(name)) return name;
  return null;
}

export function resolveEvsFromBattleItem(
  item: BattlePickItem,
): TeamPokemonEvs | null {
  const evs = createEmptyEvs();
  evs.H = parseEvPoint(item.hp_points);
  evs.A = parseEvPoint(item.attack_points);
  evs.B = parseEvPoint(item.defense_points);
  evs.C = parseEvPoint(item.sp_atk_points);
  evs.D = parseEvPoint(item.sp_def_points);
  evs.S = parseEvPoint(item.speed_points);
  evs.total = evs.H + evs.A + evs.B + evs.C + evs.D + evs.S;

  if (evs.total === 0) return null;
  if (evs.total <= EV_TOTAL_MAX) return evs;

  // 합계가 한도를 넘으면 비율을 유지하며 줄입니다.
  const scale = EV_TOTAL_MAX / evs.total;
  const scaled = createEmptyEvs();
  scaled.H = Math.min(EV_STAT_MAX, Math.floor(evs.H * scale));
  scaled.A = Math.min(EV_STAT_MAX, Math.floor(evs.A * scale));
  scaled.B = Math.min(EV_STAT_MAX, Math.floor(evs.B * scale));
  scaled.C = Math.min(EV_STAT_MAX, Math.floor(evs.C * scale));
  scaled.D = Math.min(EV_STAT_MAX, Math.floor(evs.D * scale));
  scaled.S = Math.min(EV_STAT_MAX, Math.floor(evs.S * scale));
  scaled.total =
    scaled.H + scaled.A + scaled.B + scaled.C + scaled.D + scaled.S;
  return scaled;
}
