import {
  EV_TOTAL_MAX,
  TEAM_SLOT_COUNT,
  type SavedTeam,
  type TeamPokemonSlot,
} from '@/store/PokemonTeamStore';

const MOVE_SLOT_COUNT = 4;

export function isPokemonSlotComplete(slot: TeamPokemonSlot | null): boolean {
  if (!slot) return false;
  if (slot.itemId == null) return false;
  if (!slot.nature) return false;
  if (slot.moves.length !== MOVE_SLOT_COUNT) return false;
  if (!slot.evs || slot.evs.total !== EV_TOTAL_MAX) return false;
  return true;
}

/** 6마리 모두 도구·성격·기술4·노력치66을 채웠을 때만 공유 가능 */
export function isTeamShareable(team: SavedTeam | undefined): boolean {
  if (!team) return false;
  if (team.pokemons.length !== TEAM_SLOT_COUNT) return false;
  return team.pokemons.every(isPokemonSlotComplete);
}
