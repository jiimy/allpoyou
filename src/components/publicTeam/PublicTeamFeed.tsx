'use client';

import { useMemo, useState } from 'react';
import SearchBar from '@/components/searchBar/SearchBar';
import { teamMatchesPokemonQuery } from '@/utils/publicTeamDisplay';
import type { PublicTeam } from '@/app/public-teams/actions';
import PublicTeamItem from './PublicTeamItem';
import s from './publicTeam.module.scss';

type PublicTeamFeedProps = {
  teams: PublicTeam[];
  likedTeamIds: string[];
  currentUserDbId: string | null;
  emptyMessage?: string;
  showLikeButton?: boolean;
  showSearch?: boolean;
};

function getLikeTargetId(team: PublicTeam): string {
  return team.likeTargetId ?? team.id;
}

export default function PublicTeamFeed({
  teams: initialTeams,
  likedTeamIds,
  currentUserDbId,
  emptyMessage = '표시할 공개 팀이 없습니다.',
  showLikeButton = true,
  showSearch = true,
}: PublicTeamFeedProps) {
  const [keyword, setKeyword] = useState('');
  const [teams, setTeams] = useState(initialTeams);
  const [likedMap, setLikedMap] = useState(() => new Set(likedTeamIds));
  const [likeCounts, setLikeCounts] = useState(() =>
    Object.fromEntries(
      initialTeams.map((team) => [getLikeTargetId(team), team.likeCount]),
    ),
  );

  const filteredTeams = useMemo(() => {
    return teams.filter((team) =>
      teamMatchesPokemonQuery(team.pokemons, keyword),
    );
  }, [teams, keyword]);

  const handleLikeChange = (
    likeTargetId: string,
    liked: boolean,
    likeCount: number,
  ) => {
    setLikedMap((prev) => {
      const next = new Set(prev);
      if (liked) next.add(likeTargetId);
      else next.delete(likeTargetId);
      return next;
    });
    setLikeCounts((prev) => ({ ...prev, [likeTargetId]: likeCount }));
  };

  const handleSnapshotRemoved = (likeRowId: string) => {
    setTeams((prev) => prev.filter((team) => team.id !== likeRowId));
  };

  return (
    <div className={s.feed}>
      {showSearch ? (
        <SearchBar
          keyword={keyword}
          onKeywordChange={setKeyword}
          placeholderType="pokemon"
        />
      ) : null}

      {filteredTeams.length === 0 ? (
        <p className={s.empty}>
          {keyword.trim()
            ? `"${keyword.trim()}"(으)로 검색된 팀이 없습니다.`
            : emptyMessage}
        </p>
      ) : (
        <div className={s.listWrap}>
          {filteredTeams.map((team) => {
            const likeTargetId = getLikeTargetId(team);
            const isLiked = team.isSnapshot
              ? true
              : likedMap.has(likeTargetId);

            return (
              <PublicTeamItem
                key={team.id}
                team={{
                  ...team,
                  likeCount: likeCounts[likeTargetId] ?? team.likeCount,
                }}
                liked={isLiked}
                isOwnTeam={
                  !team.isSnapshot &&
                  currentUserDbId != null &&
                  team.ownerDbId === currentUserDbId
                }
                isLoggedIn={currentUserDbId != null}
                showLikeButton={showLikeButton}
                onLikeChange={handleLikeChange}
                onSnapshotRemoved={handleSnapshotRemoved}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
