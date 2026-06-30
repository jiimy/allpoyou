'use client';

import { useEffect } from 'react';

import { dismissGoogleLinkFlash } from '@/app/my-info/actions';

type Props = {
  flash: { type: 'success' | 'error'; message: string };
  successClassName: string;
  errorClassName: string;
};

export default function GoogleLinkFlashMessage({
  flash,
  successClassName,
  errorClassName,
}: Props) {
  useEffect(() => {
    void dismissGoogleLinkFlash();
  }, []);

  return (
    <p className={flash.type === 'success' ? successClassName : errorClassName}>
      {flash.message}
    </p>
  );
}
