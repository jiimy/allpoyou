'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useOptimistic, useState, useTransition } from 'react';
import cn from 'classnames';
import {
  removeLikedTeamSnapshot,
  toggleTeamLike,
  type PublicTeam,
} from '@/app/public-teams/actions';
import PublicPokemonSlot from './PublicPokemonSlot';
import s from './publicTeam.module.scss';

const LIKE_ICON = '/images/러브볼.png';

type LikeState = {
  liked: boolean;
  likeCount: number;
};

type PublicTeamItemProps = {
  team: PublicTeam;
  liked: boolean;
  isOwnTeam: boolean;
  isLoggedIn: boolean;
  showLikeButton?: boolean;
  showLikeCount?: boolean;
  onLikeChange?: (
    likeTargetId: string,
    liked: boolean,
    likeCount: number,
  ) => void;
  onSnapshotRemoved?: (likeRowId: string) => void;
};

export default function PublicTeamItem({
  team,
  liked,
  isOwnTeam,
  isLoggedIn,
  showLikeButton = true,
  showLikeCount = false,
  onLikeChange,
  onSnapshotRemoved,
}: PublicTeamItemProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const [optimisticLike, setOptimisticLike] = useOptimistic<
    LikeState,
    'toggle'
  >({ liked, likeCount: team.likeCount }, (state) => ({
    liked: !state.liked,
    likeCount: team.isSnapshot
      ? 0
      : state.liked
        ? Math.max(0, state.likeCount - 1)
        : state.likeCount + 1,
  }));

  const handleToggleLike = useCallback(() => {
    if (!isLoggedIn) {
      setError('로그인 후 좋아요할 수 있습니다.');
      return;
    }
    if (isOwnTeam) return;

    setError(null);
    startTransition(async () => {
      setOptimisticLike('toggle');

      const result =
        team.isSnapshot && !team.likeTargetId && team.likeRowId
          ? await removeLikedTeamSnapshot(team.likeRowId)
          : await toggleTeamLike(team.likeTargetId ?? team.id);

      if ('error' in result) {
        setError(result.error);
        return;
      }

      const targetId = team.likeTargetId ?? team.id;
      onLikeChange?.(targetId, result.liked, result.likeCount);

      if (team.isSnapshot && !result.liked) {
        if (team.likeRowId) {
          onSnapshotRemoved?.(team.likeRowId);
        }
        router.refresh();
      }
    });
  }, [
    isLoggedIn,
    isOwnTeam,
    onLikeChange,
    onSnapshotRemoved,
    router,
    setOptimisticLike,
    team.id,
    team.isSnapshot,
    team.likeRowId,
    team.likeTargetId,
  ]);

  const teamTitle =
    team.teamName || (team.teamSlot > 0 ? `팀 ${team.teamSlot}` : '저장된 팀');

  return (
    <article className={s.listItem}>
      {(showLikeButton || (!team.isSnapshot && showLikeCount)) ? (
        <div className={s.likeArea}>
          {showLikeButton ? (
            <button
              type="button"
              className={cn(s.likeBtn, {
                [s.likeBtnDisabled]: isOwnTeam,
              })}
              onClick={handleToggleLike}
              disabled={isOwnTeam}
              aria-pressed={optimisticLike.liked}
              aria-label={optimisticLike.liked ? '좋아요 취소' : '좋아요'}
              title={
                isOwnTeam
                  ? '내 팀은 좋아요할 수 없습니다'
                  : optimisticLike.liked
                    ? team.isSnapshot
                      ? '보관함에서 제거'
                      : '좋아요 취소'
                    : '좋아요'
              }
            >
              {!team.isSnapshot ? (
                <span className={s.likeCount}>{optimisticLike.likeCount}</span>
              ) : null}
              <Image
                src={LIKE_ICON}
                alt=""
                width={32}
                height={32}
                className={cn(s.likeIcon, {
                  [s.likeIconActive]: optimisticLike.liked,
                })}
              />
            </button>
          ) : (
            <div
              className={s.likeStat}
              aria-label={`받은 좋아요 ${optimisticLike.likeCount}개`}
            >
              <span className={s.likeCount}>{optimisticLike.likeCount}</span>
              <Image
                src={LIKE_ICON}
                alt=""
                width={32}
                height={32}
                className={cn(s.likeIcon, {
                  [s.likeIconActive]: optimisticLike.likeCount > 0,
                })}
              />
            </div>
          )}
          {error ? <p className={s.likeError}>{error}</p> : null}
        </div>
      ) : null}

      <div className={s.teamBody}>
        <header className={s.teamHeader}>
          <h3 className={s.teamName}>{teamTitle}</h3>
          <span className={s.teamOwner}>
            {team.isSnapshot ? `${team.ownerUsername} · 저장됨` : team.ownerUsername}
          </span>
        </header>
        <div className={s.slotsGrid}>
          {team.pokemons.map((slot, index) => (
            <PublicPokemonSlot key={index} slot={slot} slotIndex={index} />
          ))}
        </div>
      </div>
    </article>
  );
}
