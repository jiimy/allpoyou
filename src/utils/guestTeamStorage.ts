import {
  hasTeamPokemonData,
  type SavedTeam,
} from '@/store/teamDbMappers';
import {
  normalizePersistedTeams,
  POKEMON_TEAM_PERSIST_KEY,
} from '@/store/PokemonTeamStore';

/** 비로그인용 localStorage 에 저장된 팀 데이터 읽기 */
export function readGuestTeamsFromLocalStorage(): SavedTeam[] | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = localStorage.getItem(POKEMON_TEAM_PERSIST_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as {
      state?: { teams?: SavedTeam[] };
      teams?: SavedTeam[];
    };
    const rawTeams = parsed?.state?.teams ?? parsed?.teams;
    if (!rawTeams?.length) return null;

    const teams = normalizePersistedTeams(rawTeams);
    if (!teams.some(hasTeamPokemonData)) return null;

    return teams;
  } catch {
    return null;
  }
}

export function hasGuestLocalTeamData(): boolean {
  return readGuestTeamsFromLocalStorage() != null;
}
