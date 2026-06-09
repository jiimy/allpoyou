'use server';

import { getCurrentUser } from '@/utils/auth/dal';
import { createAdminClient } from '@/utils/supabase/admin';
import {
  normalizeTeamsFromDb,
  type TeamPokemonSlot,
} from '@/store/teamDbMappers';
import { normalizeDbId } from '@/utils/teamDb';

export type PublicTeam = {
  id: string;
  ownerDbId: string;
  ownerUsername: string;
  teamName: string;
  teamSlot: number;
  pokemons: (TeamPokemonSlot | null)[];
  updatedAt: string;
  likeCount: number;
};

type TeamDbPublicRow = {
  id: string;
  user_id: unknown;
  team_slot: number;
  team_name: string | null;
  pokemon_data: unknown;
  updated_at: string;
};

async function fetchUsernamesByDbIds(
  userDbIds: string[],
): Promise<Map<string, string>> {
  const usernames = new Map<string, string>();
  if (userDbIds.length === 0) return usernames;

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('users')
    .select('id, user_id')
    .in('id', userDbIds);

  if (error) {
    console.error('[fetchUsernamesByDbIds]', error);
    return usernames;
  }

  for (const row of data ?? []) {
    usernames.set(normalizeDbId(row.id), row.user_id as string);
  }

  return usernames;
}

function mapPublicTeamRow(
  row: TeamDbPublicRow,
  likeCount: number,
  ownerUsername: string,
): PublicTeam {
  const ownerDbId = normalizeDbId(row.user_id);
  const team = normalizeTeamsFromDb(row.team_slot, {
    team_name: row.team_name,
    pokemon_data: row.pokemon_data,
    is_public: true,
  });

  return {
    id: row.id,
    ownerDbId,
    ownerUsername,
    teamName: team.teamName,
    teamSlot: row.team_slot,
    pokemons: team.pokemons,
    updatedAt: row.updated_at,
    likeCount,
  };
}

async function fetchLikeCountsByTeamIds(
  teamIds: string[],
): Promise<Map<string, number>> {
  const counts = new Map<string, number>();
  if (teamIds.length === 0) return counts;

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('team_likes')
    .select('team_id')
    .in('team_id', teamIds);

  if (error) {
    console.error('[fetchLikeCountsByTeamIds]', error);
    return counts;
  }

  for (const row of data ?? []) {
    const teamId = row.team_id as string;
    counts.set(teamId, (counts.get(teamId) ?? 0) + 1);
  }

  return counts;
}

async function mapPublicTeamRows(
  rows: TeamDbPublicRow[],
): Promise<PublicTeam[]> {
  const ownerDbIds = [...new Set(rows.map((row) => normalizeDbId(row.user_id)))];
  const [likeCounts, usernames] = await Promise.all([
    fetchLikeCountsByTeamIds(rows.map((row) => row.id)),
    fetchUsernamesByDbIds(ownerDbIds),
  ]);

  return rows.map((row) =>
    mapPublicTeamRow(
      row,
      likeCounts.get(row.id) ?? 0,
      usernames.get(normalizeDbId(row.user_id)) ?? '알 수 없음',
    ),
  );
}

export async function getPublicTeamsFromDb(): Promise<PublicTeam[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('teams')
    .select('id, user_id, team_slot, team_name, pokemon_data, updated_at')
    .eq('is_public', true)
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('[getPublicTeamsFromDb]', error);
    return [];
  }

  return mapPublicTeamRows((data ?? []) as TeamDbPublicRow[]);
}

export async function getUserLikedTeamIds(
  userDbId: string,
): Promise<string[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('team_likes')
    .select('team_id')
    .eq('user_id', userDbId);

  if (error) {
    console.error('[getUserLikedTeamIds]', error);
    return [];
  }

  return (data ?? []).map((row) => row.team_id as string);
}

export async function getLikedTeamsForUser(): Promise<PublicTeam[]> {
  const user = await getCurrentUser();
  if (!user) return [];

  const supabase = createAdminClient();
  const { data: likes, error: likesError } = await supabase
    .from('team_likes')
    .select('team_id, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (likesError) {
    console.error('[getLikedTeamsForUser] likes', likesError);
    return [];
  }

  const teamIds = (likes ?? []).map((row) => row.team_id as string);
  if (teamIds.length === 0) return [];

  const { data: teams, error: teamsError } = await supabase
    .from('teams')
    .select('id, user_id, team_slot, team_name, pokemon_data, updated_at')
    .in('id', teamIds)
    .eq('is_public', true);

  if (teamsError) {
    console.error('[getLikedTeamsForUser] teams', teamsError);
    return [];
  }

  const rows = (teams ?? []) as TeamDbPublicRow[];
  const mapped = await mapPublicTeamRows(rows);
  const teamById = new Map(mapped.map((team) => [team.id, team]));

  return teamIds
    .map((id) => teamById.get(id))
    .filter((team): team is PublicTeam => team != null);
}

export async function getMyPublicTeamsWithLikes(): Promise<PublicTeam[]> {
  const user = await getCurrentUser();
  if (!user) return [];

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('teams')
    .select('id, user_id, team_slot, team_name, pokemon_data, updated_at')
    .eq('user_id', user.id)
    .eq('is_public', true)
    .order('team_slot', { ascending: true });

  if (error) {
    console.error('[getMyPublicTeamsWithLikes]', error);
    return [];
  }

  return mapPublicTeamRows((data ?? []) as TeamDbPublicRow[]);
}

export type ToggleLikeResult =
  | { ok: true; liked: boolean; likeCount: number }
  | { error: string };

export async function toggleTeamLike(
  teamId: string,
): Promise<ToggleLikeResult> {
  const user = await getCurrentUser();
  if (!user) return { error: '로그인이 필요합니다.' };

  const supabase = createAdminClient();

  const { data: team, error: teamError } = await supabase
    .from('teams')
    .select('id, user_id, is_public')
    .eq('id', teamId)
    .maybeSingle();

  if (teamError || !team) {
    return { error: '팀을 찾을 수 없습니다.' };
  }

  if (!team.is_public) {
    return { error: '공개된 팀만 좋아요할 수 있습니다.' };
  }

  if (normalizeDbId(team.user_id) === user.id) {
    return { error: '자신이 공개한 팀은 좋아요할 수 없습니다.' };
  }

  const { data: existing, error: lookupError } = await supabase
    .from('team_likes')
    .select('id')
    .eq('user_id', user.id)
    .eq('team_id', teamId)
    .maybeSingle();

  if (lookupError) {
    console.error('[toggleTeamLike] lookup', lookupError);
    return { error: '좋아요 처리에 실패했습니다.' };
  }

  if (existing) {
    const { error: deleteError } = await supabase
      .from('team_likes')
      .delete()
      .eq('id', existing.id);

    if (deleteError) {
      console.error('[toggleTeamLike] delete', deleteError);
      return { error: '좋아요 취소에 실패했습니다.' };
    }
  } else {
    const { error: insertError } = await supabase.from('team_likes').insert({
      user_id: user.id,
      team_id: teamId,
    });

    if (insertError) {
      console.error('[toggleTeamLike] insert', insertError);
      return { error: '좋아요에 실패했습니다.' };
    }
  }

  const { count, error: countError } = await supabase
    .from('team_likes')
    .select('*', { count: 'exact', head: true })
    .eq('team_id', teamId);

  if (countError) {
    console.error('[toggleTeamLike] count', countError);
  }

  return {
    ok: true,
    liked: !existing,
    likeCount: count ?? 0,
  };
}
