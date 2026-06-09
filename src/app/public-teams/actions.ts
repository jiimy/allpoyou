'use server';

import { getCurrentUser } from '@/utils/auth/dal';
import { createAdminClient } from '@/utils/supabase/admin';
import {
  normalizeTeamsFromDb,
  type TeamPokemonSlot,
} from '@/store/teamDbMappers';
import { normalizeDbId } from '@/utils/teamDb';

export type PublicTeam = {
  /** 목록 key (teams.id 또는 team_likes.id) */
  id: string;
  /** 좋아요 토글·중복 판별용 원본 teams.id (스냅샷만 있을 때 null) */
  likeTargetId: string | null;
  /** team_likes.id — 스냅샷 보관함 전용 */
  likeRowId?: string;
  isSnapshot?: boolean;
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

type TeamLikeSnapshotRow = {
  id: unknown;
  original_team_id: string | null;
  team_name: string;
  pokemon_data: unknown;
  created_at: string;
  teams?: { user_id: unknown } | { user_id: unknown }[] | null;
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

function parsePokemonsFromJson(
  pokemonData: unknown,
  teamName: string,
): (TeamPokemonSlot | null)[] {
  const team = normalizeTeamsFromDb(1, {
    team_name: teamName,
    pokemon_data: pokemonData,
    is_public: true,
  });
  return team.pokemons;
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
    likeTargetId: row.id,
    ownerDbId,
    ownerUsername,
    teamName: team.teamName,
    teamSlot: row.team_slot,
    pokemons: team.pokemons,
    updatedAt: row.updated_at,
    likeCount,
  };
}

async function fetchLikeCountsByOriginalTeamIds(
  teamIds: string[],
): Promise<Map<string, number>> {
  const counts = new Map<string, number>();
  if (teamIds.length === 0) return counts;

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('team_likes')
    .select('original_team_id')
    .in('original_team_id', teamIds);

  if (error) {
    console.error('[fetchLikeCountsByOriginalTeamIds]', error);
    return counts;
  }

  for (const row of data ?? []) {
    const teamId = row.original_team_id as string | null;
    if (!teamId) continue;
    counts.set(teamId, (counts.get(teamId) ?? 0) + 1);
  }

  return counts;
}

async function mapPublicTeamRows(
  rows: TeamDbPublicRow[],
): Promise<PublicTeam[]> {
  const ownerDbIds = [...new Set(rows.map((row) => normalizeDbId(row.user_id)))];
  const [likeCounts, usernames] = await Promise.all([
    fetchLikeCountsByOriginalTeamIds(rows.map((row) => row.id)),
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

function resolveJoinedOwnerDbId(
  teams: TeamLikeSnapshotRow['teams'],
): string | null {
  if (!teams) return null;
  const row = Array.isArray(teams) ? teams[0] : teams;
  if (!row?.user_id) return null;
  return normalizeDbId(row.user_id);
}

async function mapSnapshotRows(
  rows: TeamLikeSnapshotRow[],
): Promise<PublicTeam[]> {
  const ownerDbIds = rows
    .map((row) => resolveJoinedOwnerDbId(row.teams))
    .filter((id): id is string => id != null);

  const usernames = await fetchUsernamesByDbIds([...new Set(ownerDbIds)]);

  return rows.map((row) => {
    const ownerDbId = resolveJoinedOwnerDbId(row.teams);
    const likeRowId = normalizeDbId(row.id);

    return {
      id: likeRowId,
      likeTargetId: row.original_team_id,
      likeRowId,
      isSnapshot: true,
      ownerDbId: ownerDbId ?? '',
      ownerUsername: ownerDbId
        ? (usernames.get(ownerDbId) ?? '알 수 없음')
        : '원본 삭제됨',
      teamName: row.team_name,
      teamSlot: 0,
      pokemons: parsePokemonsFromJson(row.pokemon_data, row.team_name),
      updatedAt: row.created_at,
      likeCount: 0,
    };
  });
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

/** 좋아요한 원본 teams.id 목록 (홈 피드 하이라이트용) */
export async function getUserLikedTeamIds(
  userDbId: string,
): Promise<string[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('team_likes')
    .select('original_team_id')
    .eq('user_id', userDbId);

  if (error) {
    console.error('[getUserLikedTeamIds]', error);
    return [];
  }

  return (data ?? [])
    .map((row) => row.original_team_id as string | null)
    .filter((id): id is string => id != null);
}

/** 마이페이지 — team_likes 스냅샷 보관함 */
export async function getLikedTeamsForUser(): Promise<PublicTeam[]> {
  const user = await getCurrentUser();
  if (!user) return [];

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('team_likes')
    .select(
      'id, original_team_id, team_name, pokemon_data, created_at, teams(user_id)',
    )
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[getLikedTeamsForUser]', error);
    return [];
  }

  return mapSnapshotRows((data ?? []) as TeamLikeSnapshotRow[]);
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

async function countLikesForTeam(teamId: string): Promise<number> {
  const supabase = createAdminClient();
  const { count, error } = await supabase
    .from('team_likes')
    .select('*', { count: 'exact', head: true })
    .eq('original_team_id', teamId);

  if (error) {
    console.error('[countLikesForTeam]', error);
    return 0;
  }

  return count ?? 0;
}

export async function toggleTeamLike(
  originalTeamId: string,
): Promise<ToggleLikeResult> {
  const user = await getCurrentUser();
  if (!user) return { error: '로그인이 필요합니다.' };

  const supabase = createAdminClient();

  const { data: team, error: teamError } = await supabase
    .from('teams')
    .select('id, user_id, team_name, pokemon_data, is_public')
    .eq('id', originalTeamId)
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
    .eq('original_team_id', originalTeamId)
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

    return {
      ok: true,
      liked: false,
      likeCount: await countLikesForTeam(originalTeamId),
    };
  }

  const { error: insertError } = await supabase.from('team_likes').insert({
    user_id: user.id,
    original_team_id: originalTeamId,
    team_name: team.team_name,
    pokemon_data: team.pokemon_data,
  });

  if (insertError) {
    console.error('[toggleTeamLike] insert', insertError);
    return { error: '좋아요에 실패했습니다.' };
  }

  return {
    ok: true,
    liked: true,
    likeCount: await countLikesForTeam(originalTeamId),
  };
}

/** 원본 팀이 삭제된 스냅샷 보관함 항목 제거 */
export async function removeLikedTeamSnapshot(
  likeRowId: string,
): Promise<ToggleLikeResult> {
  const user = await getCurrentUser();
  if (!user) return { error: '로그인이 필요합니다.' };

  const supabase = createAdminClient();
  const { error } = await supabase
    .from('team_likes')
    .delete()
    .eq('id', likeRowId)
    .eq('user_id', user.id);

  if (error) {
    console.error('[removeLikedTeamSnapshot]', error);
    return { error: '보관함에서 제거하지 못했습니다.' };
  }

  return { ok: true, liked: false, likeCount: 0 };
}
