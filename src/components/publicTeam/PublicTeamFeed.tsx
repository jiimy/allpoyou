'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import SearchBar from '@/components/searchBar/SearchBar';
import { teamMatchesPokemonQuery } from '@/utils/publicTeamDisplay';
import type { PublicTeam } from '@/app/public-teams/actions';
import PublicTeamItem from './PublicTeamItem';
import CloneTeamModal from './CloneTeamModal';
import s from './publicTeam.module.scss';

const PAGE_SIZE = 8;

type PublicTeamFeedProps = {
  teams: PublicTeam[];
  likedTeamIds: string[];
  currentUserDbId: string | null;
  emptyMessage?: string;
  showLikeButton?: boolean;
  showLikeCount?: boolean;
  showSearch?: boolean;
  enableTeamClone?: boolean;
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
  showLikeCount = false,
  showSearch = true,
  enableTeamClone = false,
}: PublicTeamFeedProps) {
  const [keyword, setKeyword] = useState('');
  const [teams, setTeams] = useState(initialTeams);
  const [cloneTarget, setCloneTarget] = useState<PublicTeam | null>(null);
  const [likedMap, setLikedMap] = useState(() => new Set(likedTeamIds));
  const [likeCounts, setLikeCounts] = useState(() =>
    Object.fromEntries(
      initialTeams.map((team) => [getLikeTargetId(team), team.likeCount]),
    ),
  );
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const filteredTeams = useMemo(() => {
    return teams.filter((team) =>
      teamMatchesPokemonQuery(team.pokemons, keyword),
    );
  }, [teams, keyword]);

  const visibleTeams = useMemo(
    () => filteredTeams.slice(0, visibleCount),
    [filteredTeams, visibleCount],
  );

  const hasMore = visibleCount < filteredTeams.length;

  const [prevKeyword, setPrevKeyword] = useState(keyword);
  if (prevKeyword !== keyword) {
    setPrevKeyword(keyword);
    setVisibleCount(PAGE_SIZE);
  }

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount((prev) =>
            Math.min(prev + PAGE_SIZE, filteredTeams.length),
          );
        }
      },
      { rootMargin: '240px' },
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [filteredTeams.length, hasMore]);

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
    <div className={s.publicTeamFeed}>
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
            {visibleTeams.map((team) => {
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
                  showLikeCount={showLikeCount}
                  onLikeChange={handleLikeChange}
                  onSnapshotRemoved={handleSnapshotRemoved}
                  onTeamSelect={
                    enableTeamClone ? (selectedTeam) => setCloneTarget(selectedTeam) : undefined
                  }
                />
              );
            })}
            {hasMore ? (
              <div ref={sentinelRef} className={s.sentinel} aria-hidden />
            ) : null}
          </div>
        )}
      </div>
      {cloneTarget ? (
        <CloneTeamModal team={cloneTarget} onClose={() => setCloneTarget(null)} />
      ) : null}
    </div>
  );
}
