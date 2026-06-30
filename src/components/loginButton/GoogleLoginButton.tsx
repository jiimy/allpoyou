'use client';

import { signIn } from 'next-auth/react';
import React, { useState } from 'react';

import s from './googleLoginButton.module.scss';

export default function GoogleLoginButton() {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = () => {
    setLoading(true);
    void signIn('google', { callbackUrl: '/my-info' });
  };

  return (
    <div className={s.container}>
      <button
        type="button"
        className={s.googleButton}
        onClick={handleGoogleLogin}
        disabled={loading}
      >
        <span className={s.buttonText}>
          {loading ? 'Google 로그인 중...' : 'Google 계정으로 로그인'}
        </span>
      </button>
    </div>
  );
}
