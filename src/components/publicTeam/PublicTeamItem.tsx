'use client';

import Image from 'next/image';
import { useCallback, useOptimistic, useState, useTransition } from 'react';
import cn from 'classnames';
import { toggleTeamLike, type PublicTeam } from '@/app/public-teams/actions';
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
  onLikeChange?: (teamId: string, liked: boolean, likeCount: number) => void;
};

export default function PublicTeamItem({
  team,
  liked,
  isOwnTeam,
  isLoggedIn,
  showLikeButton = true,
  onLikeChange,
}: PublicTeamItemProps) {
  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const [optimisticLike, setOptimisticLike] = useOptimistic<
    LikeState,
    'toggle'
  >({ liked, likeCount: team.likeCount }, (state) => ({
    liked: !state.liked,
    likeCount: state.liked
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

      const result = await toggleTeamLike(team.id);
      if ('error' in result) {
        setError(result.error);
        return;
      }

      onLikeChange?.(team.id, result.liked, result.likeCount);
    });
  }, [
    isLoggedIn,
    isOwnTeam,
    onLikeChange,
    setOptimisticLike,
    team.id,
  ]);

  return (
    <article className={s.listItem}>
      {showLikeButton ? (
        <div className={s.likeArea}>
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
                  ? '좋아요 취소'
                  : '좋아요'
            }
          >
            <span className={s.likeCount}>{optimisticLike.likeCount}</span>
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
          {error ? <p className={s.likeError}>{error}</p> : null}
        </div>
      ) : null}

      <div className={s.teamBody}>
        <header className={s.teamHeader}>
          <h3 className={s.teamName}>{team.teamName || `팀 ${team.teamSlot}`}</h3>
          <span className={s.teamOwner}>{team.ownerUsername}</span>
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
