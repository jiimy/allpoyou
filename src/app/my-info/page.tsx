import React from 'react';

import { getCurrentUser } from '@/utils/auth/dal';
import { logout } from './actions';
import AuthForm from './AuthForm';
import s from './myInfo.module.scss';

const MyInfoPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className={s.wrap}>
        <AuthForm />
      </div>
    );
  }

  const joinedAt = new Date(user.createdAt).toLocaleDateString('ko-KR');

  return (
    <div className={s.wrap}>
      <div className={s.card}>
        <div className={s.profile}>
          <div className={s.profileHead}>
            <div>
              <div className={s.username}>{user.username}</div>
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
            <p className={s.placeholder}>
              공유한 팀 빌드와 받은 좋아요 수가 여기에 표시됩니다. (준비 중)
            </p>
          </div>

          <div className={s.section}>
            <div className={s.sectionTitle}>내가 좋아요한 팀</div>
            <p className={s.placeholder}>
              좋아요한 팀 목록이 여기에 표시됩니다. (준비 중)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyInfoPage;
