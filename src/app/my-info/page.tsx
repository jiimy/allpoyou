import React from 'react';

import { getCurrentUser } from '@/utils/auth/dal';
import PublicTeamFeed from '@/components/publicTeam/PublicTeamFeed';
import {
  getLikedTeamsForUser,
  getMyPublicTeamsWithLikes,
  getUserLikedTeamIds,
} from '@/app/public-teams/actions';
import { logout } from './actions';
import AuthForm from './AuthForm';
import s from './myInfo.module.scss';
import teamS from '@/components/publicTeam/publicTeam.module.scss';

const MyInfoPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className={s.wrap}>
        <AuthForm />
      </div>
    );
  }

  const [myPublicTeams, likedTeams, likedTeamIds] = await Promise.all([
    getMyPublicTeamsWithLikes(),
    getLikedTeamsForUser(),
    getUserLikedTeamIds(user.id),
  ]);

  const joinedAt = new Date(user.createdAt).toLocaleDateString('ko-KR');
  const totalReceivedLikes = myPublicTeams.reduce(
    (sum, team) => sum + team.likeCount,
    0,
  );

  return (
    <div className={s.wrapWide}>
      <div className={s.card}>
        <div className={s.profile}>
          <div className={s.profileHead}>
            <div>
              <div className={s.user_id}>{user.user_id}</div>
              <div className={s.meta}>가입일 {joinedAt}</div>
            </div>
            <form action={logout}>
              <button className={s.logout} type="submit">
                로그아웃
              </button>
            </form>
          </div>

          <div className={s.section}>
            <div className={s.sectionTitle}>내가 공유한 팀 빌드</div>
            {myPublicTeams.length === 0 ? (
              <p className={s.placeholder}>
                공개한 팀이 없습니다. 팀 만들기에서 [공개]를 눌러 전시장에 올려보세요.
              </p>
            ) : (
              <>
                <p className={s.summary}>
                  공개 팀 {myPublicTeams.length}개 · 받은 좋아요 {totalReceivedLikes}개
                </p>
                <div className={`${s.teamSection}`}>
                  <PublicTeamFeed
                    teams={myPublicTeams}
                    likedTeamIds={likedTeamIds}
                    currentUserDbId={user.id}
                    showLikeButton={false}
                    showLikeCount
                    showSearch={false}
                    enableTeamClone
                    emptyMessage="공개한 팀이 없습니다."
                  />
                </div>
              </>
            )}
          </div>

          <div className={s.section}>
            <div className={s.sectionTitle}>내가 좋아요한 팀</div>
            {likedTeams.length === 0 ? (
              <p className={s.placeholder}>
                좋아요한 팀이 없습니다. 홈에서 다른 사용자의 공개 팀에 좋아요를 눌러보세요.
              </p>
            ) : (
              <div className={`${teamS.feed} ${teamS.compactList} ${s.teamSection}`}>
                <PublicTeamFeed
                  teams={likedTeams}
                  likedTeamIds={likedTeamIds}
                  currentUserDbId={user.id}
                  showSearch={false}
                  enableTeamClone
                  emptyMessage="좋아요한 팀이 없습니다."
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyInfoPage;
