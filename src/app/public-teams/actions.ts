'use server';

import { revalidatePath } from 'next/cache';

import { getCurrentUser } from '@/utils/auth/dal';
import { createAdminClient } from '@/utils/supabase/admin';
import {
  normalizeTeamsFromDb,
  type TeamPokemonSlot,
} from '@/store/teamDbMappers';
import { normalizeDbId } from '@/utils/teamDb';
import { areTeamPokemonsEqual } from '@/utils/teamShare';

export type PublicTeam = {
  /** 목록 key (public_teams.id 또는 team_likes.id) */
  id: string;
  /** 좋아요 토글용 public_teams.id (원본 삭제 시 null) */
  likeTargetId: string | null;
  /** team_likes.id — 보관함 전용 */
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

type PublicTeamDbRow = {
  id: string;
  author_id: unknown;
  team_name: string;
  pokemon_data: unknown;
  likes_count: number;
  created_at: string;
};

type TeamLikeSnapshotRow = {
  id: unknown;
  public_team_id: string | null;
  team_name: string;
  pokemon_data: unknown;
  created_at: string;
  public_teams?: { author_id: unknown } | { author_id: unknown }[] | null;
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
  });
  return team.pokemons;
}

function mapPublicTeamRow(
  row: PublicTeamDbRow,
  ownerUsername: string,
): PublicTeam {
  return {
    id: row.id,
    likeTargetId: row.id,
    ownerDbId: normalizeDbId(row.author_id),
    ownerUsername,
    teamName: row.team_name,
    teamSlot: 0,
    pokemons: parsePokemonsFromJson(row.pokemon_data, row.team_name),
    updatedAt: row.created_at,
    likeCount: row.likes_count ?? 0,
  };
}

async function mapPublicTeamRows(
  rows: PublicTeamDbRow[],
): Promise<PublicTeam[]> {
  const ownerDbIds = [
    ...new Set(rows.map((row) => normalizeDbId(row.author_id))),
  ];
  const usernames = await fetchUsernamesByDbIds(ownerDbIds);

  return rows.map((row) =>
    mapPublicTeamRow(
      row,
      usernames.get(normalizeDbId(row.author_id)) ?? '알 수 없음',
    ),
  );
}

function resolveJoinedAuthorDbId(
  publicTeams: TeamLikeSnapshotRow['public_teams'],
): string | null {
  if (!publicTeams) return null;
  const row = Array.isArray(publicTeams) ? publicTeams[0] : publicTeams;
  if (!row?.author_id) return null;
  return normalizeDbId(row.author_id);
}

async function mapSnapshotRows(
  rows: TeamLikeSnapshotRow[],
): Promise<PublicTeam[]> {
  const ownerDbIds = rows
    .map((row) => resolveJoinedAuthorDbId(row.public_teams))
    .filter((id): id is string => id != null);

  const usernames = await fetchUsernamesByDbIds([...new Set(ownerDbIds)]);

  return rows.map((row) => {
    const ownerDbId = resolveJoinedAuthorDbId(row.public_teams);
    const likeRowId = normalizeDbId(row.id);

    return {
      id: likeRowId,
      likeTargetId: row.public_team_id,
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
    .from('public_teams')
    .select('id, author_id, team_name, pokemon_data, likes_count, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[getPublicTeamsFromDb]', error);
    return [];
  }

  return mapPublicTeamRows((data ?? []) as PublicTeamDbRow[]);
}

/** 좋아요한 public_teams.id 목록 (홈 피드 하이라이트용) */
export async function getUserLikedTeamIds(
  userDbId: string,
): Promise<string[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('team_likes')
    .select('public_team_id')
    .eq('user_id', userDbId);

  if (error) {
    console.error('[getUserLikedTeamIds]', error);
    return [];
  }

  return (data ?? [])
    .map((row) => row.public_team_id as string | null)
    .filter((id): id is string => id != null);
}

/** 마이페이지 — team_likes 보관함 */
export async function getLikedTeamsForUser(): Promise<PublicTeam[]> {
  const user = await getCurrentUser();
  if (!user) return [];

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('team_likes')
    .select(
      'id, public_team_id, team_name, pokemon_data, created_at, public_teams(author_id)',
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
    .from('public_teams')
    .select('id, author_id, team_name, pokemon_data, likes_count, created_at')
    .eq('author_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[getMyPublicTeamsWithLikes]', error);
    return [];
  }

  return mapPublicTeamRows((data ?? []) as PublicTeamDbRow[]);
}

export type ToggleLikeResult =
  | { ok: true; liked: boolean; likeCount: number }
  | { error: string };

async function readLikeCount(publicTeamId: string): Promise<number> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('public_teams')
    .select('likes_count')
    .eq('id', publicTeamId)
    .maybeSingle();

  if (error || !data) {
    console.error('[readLikeCount]', error);
    return 0;
  }

  return data.likes_count ?? 0;
}

async function adjustLikeCount(
  publicTeamId: string,
  delta: number,
): Promise<number> {
  const current = await readLikeCount(publicTeamId);
  const next = Math.max(0, current + delta);
  const supabase = createAdminClient();

  const { error } = await supabase
    .from('public_teams')
    .update({ likes_count: next })
    .eq('id', publicTeamId);

  if (error) {
    console.error('[adjustLikeCount]', error);
    return current;
  }

  return next;
}

export async function toggleTeamLike(
  publicTeamId: string,
): Promise<ToggleLikeResult> {
  const user = await getCurrentUser();
  if (!user) return { error: '로그인이 필요합니다.' };

  const supabase = createAdminClient();

  const { data: post, error: postError } = await supabase
    .from('public_teams')
    .select('id, author_id, team_name, pokemon_data, likes_count')
    .eq('id', publicTeamId)
    .maybeSingle();

  if (postError || !post) {
    return { error: '팀을 찾을 수 없습니다.' };
  }

  if (normalizeDbId(post.author_id) === user.id) {
    return { error: '자신이 공개한 팀은 좋아요할 수 없습니다.' };
  }

  const { data: existing, error: lookupError } = await supabase
    .from('team_likes')
    .select('id')
    .eq('user_id', user.id)
    .eq('public_team_id', publicTeamId)
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
      likeCount: await adjustLikeCount(publicTeamId, -1),
    };
  }

  const { error: insertError } = await supabase.from('team_likes').insert({
    user_id: user.id,
    public_team_id: publicTeamId,
    team_name: post.team_name,
    pokemon_data: post.pokemon_data,
  });

  if (insertError) {
    console.error('[toggleTeamLike] insert', insertError);
    return { error: '좋아요에 실패했습니다.' };
  }

  return {
    ok: true,
    liked: true,
    likeCount: await adjustLikeCount(publicTeamId, 1),
  };
}

/** 원본 게시물이 삭제된 보관함 항목 제거 */
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

export type UnpublishResult = { ok: true } | { error: string };

/** 내가 공개한 팀을 비공개로 전환 (전시 게시물 삭제 + teams.is_public 해제) */
export async function unpublishPublicTeam(
  publicTeamId: string,
): Promise<UnpublishResult> {
  const user = await getCurrentUser();
  if (!user) return { error: '로그인이 필요합니다.' };

  const supabase = createAdminClient();

  const { data: post, error: postError } = await supabase
    .from('public_teams')
    .select('id, author_id, pokemon_data')
    .eq('id', publicTeamId)
    .maybeSingle();

  if (postError || !post) {
    return { error: '팀을 찾을 수 없습니다.' };
  }

  if (normalizeDbId(post.author_id) !== user.id) {
    return { error: '권한이 없습니다.' };
  }

  const pokemonData = post.pokemon_data;

  const { error: deleteError } = await supabase
    .from('public_teams')
    .delete()
    .eq('id', publicTeamId)
    .eq('author_id', user.id);

  if (deleteError) {
    console.error('[unpublishPublicTeam]', deleteError);
    return { error: '비공개 처리에 실패했습니다.' };
  }

  const { data: remainingPosts, error: remainingError } = await supabase
    .from('public_teams')
    .select('pokemon_data')
    .eq('author_id', user.id);

  if (remainingError) {
    console.error('[unpublishPublicTeam] remaining lookup', remainingError);
  } else {
    const stillPublished = (remainingPosts ?? []).some((row) =>
      areTeamPokemonsEqual(
        parsePokemonsFromJson(pokemonData, ''),
        row.pokemon_data,
      ),
    );

    if (!stillPublished) {
      const { data: teamRows, error: teamsError } = await supabase
        .from('teams')
        .select('team_slot, pokemon_data')
        .eq('user_id', user.id)
        .eq('is_public', true);

      if (teamsError) {
        console.error('[unpublishPublicTeam] teams lookup', teamsError);
      } else {
        for (const row of teamRows ?? []) {
          if (
            areTeamPokemonsEqual(
              parsePokemonsFromJson(row.pokemon_data, ''),
              pokemonData,
            )
          ) {
            const { error: flagError } = await supabase
              .from('teams')
              .update({
                is_public: false,
                updated_at: new Date().toISOString(),
              })
              .eq('user_id', user.id)
              .eq('team_slot', row.team_slot);

            if (flagError) {
              console.error('[unpublishPublicTeam] is_public flag', flagError);
            }
          }
        }
      }
    }
  }

  revalidatePath('/my-info');
  revalidatePath('/');
  revalidatePath('/make-team');

  return { ok: true };
}

/** @deprecated unpublishPublicTeam 사용 */
export async function deletePublicTeam(
  publicTeamId: string,
): Promise<ToggleLikeResult> {
  const result = await unpublishPublicTeam(publicTeamId);
  if ('error' in result) return result;
  return { ok: true, liked: false, likeCount: 0 };
}
