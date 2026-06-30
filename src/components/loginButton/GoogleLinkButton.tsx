'use client';

import { signIn } from 'next-auth/react';
import React, { useState } from 'react';

import { prepareGoogleLink } from '@/app/my-info/actions';
import s from './googleLoginButton.module.scss';

type Props = {
  className?: string;
  errorClassName?: string;
};

export default function GoogleLinkButton({ className, errorClassName }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);

    const result = await prepareGoogleLink();
    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    void signIn('google', { callbackUrl: '/my-info' });
  };

  return (
    <div className={s.linkWrap}>
      <button
        type="button"
        className={className}
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? '연동 중...' : 'Google 연동'}
      </button>
      {error && (
        <p className={errorClassName ?? s.linkError}>{error}</p>
      )}
    </div>
  );
}
