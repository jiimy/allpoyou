'use server';

import { getCurrentUser } from '@/utils/auth/dal';
import { createAdminClient } from '@/utils/supabase/admin';
import {
  hasTeamPokemonData,
  mapTeamsFromDbRows,
  type SavedTeam,
} from '@/store/teamDbMappers';
import { isTeamShareable } from '@/utils/teamShare';
import { buildTeamRowId, normalizeDbId } from '@/utils/teamDb';

export type TeamSaveResult = { ok: true } | { error: string };

export type TeamLoadResult =
  | { teams: SavedTeam[]; hasDbRows: boolean }
  | { error: string }
  | null;

export async function getLoggedInUserId(): Promise<string | null> {
  const user = await getCurrentUser();
  return user?.user_id ?? null;
}

export async function loadUserTeamsFromDb(): Promise<TeamLoadResult> {
  const user = await getCurrentUser();
  if (!user) return null;

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('teams')
    .select('team_slot, team_name, pokemon_data, is_public, updated_at')
    .eq('user_id', user.id)
    .order('team_slot', { ascending: true });

  if (error) {
    console.error('[loadUserTeamsFromDb]', error);
    return { error: '팀 정보를 불러오지 못했습니다.' };
  }

  if (!data?.length) {
    return { teams: [], hasDbRows: false };
  }

  const teams = mapTeamsFromDbRows(data);

  return { teams, hasDbRows: true };
}

type TeamRowPayload = {
  team_name: string;
  pokemon_data: SavedTeam['pokemons'];
  is_public: boolean;
  updated_at: string;
};

async function upsertTeamRow(
  userDbId: string,
  teamSlot: number,
  payload: TeamRowPayload,
  errorMessage: string,
): Promise<TeamSaveResult> {
  const supabase = createAdminClient();

  const { error } = await supabase.from('teams').upsert(
    {
      id: buildTeamRowId(userDbId, teamSlot),
      user_id: userDbId,
      team_slot: teamSlot,
      ...payload,
    },
    { onConflict: 'user_id,team_slot' },
  );

  if (error) {
    console.error('[upsertTeamRow]', error);
    return { error: errorMessage };
  }

  return { ok: true };
}

export async function uploadTeamsToDb(
  teams: SavedTeam[],
): Promise<TeamSaveResult> {
  const user = await getCurrentUser();
  if (!user) return { error: '로그인이 필요합니다.' };

  for (const team of teams) {
    if (!hasTeamPokemonData(team)) continue;

    const result = await saveTeamToDb(team);
    if ('error' in result) return result;
  }

  return { ok: true };
}

export async function saveTeamToDb(team: SavedTeam): Promise<TeamSaveResult> {
  const user = await getCurrentUser();
  if (!user) return { error: '로그인이 필요합니다.' };

  if (!hasTeamPokemonData(team)) {
    return { ok: true };
  }

  const now = new Date().toISOString();

  return upsertTeamRow(
    user.id,
    team.teamId,
    {
      team_name: team.teamName,
      pokemon_data: team.pokemons,
      is_public: team.isPublic === true,
      updated_at: now,
    },
    '팀 저장에 실패했습니다.',
  );
}

export async function setTeamPublicOnDb(
  teamId: number,
  isPublic: boolean,
  teamSnapshot: SavedTeam,
): Promise<TeamSaveResult> {
  const user = await getCurrentUser();
  if (!user) return { error: '로그인이 필요합니다.' };

  if (teamId < 1 || teamId > 5) {
    return { error: '잘못된 팀 번호입니다.' };
  }

  if (isPublic && !isTeamShareable(teamSnapshot)) {
    return {
      error:
        '팀 이름과 6마리·도구·성격·기술 4개·노력치 66을 모두 채워야 공개할 수 있습니다.',
    };
  }

  const now = new Date().toISOString();

  return upsertTeamRow(
    user.id,
    teamId,
    {
      team_name: teamSnapshot.teamName,
      pokemon_data: teamSnapshot.pokemons,
      is_public: isPublic,
      updated_at: now,
    },
    '공개 설정 저장에 실패했습니다.',
  );
}
