import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import {
  clearGoogleLinkCookie,
  resolveGoogleLinkUserId,
  setGoogleLinkFlash,
} from '@/utils/auth/googleLink';
import {
  findOrCreateGoogleUser,
  GoogleLinkError,
  linkGoogleToUser,
} from '@/utils/auth/googleUser';
import { createSession } from '@/utils/auth/session';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/my-info',
    error: '/my-info',
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider !== 'google') return false;

      const googleSub = account.providerAccountId;
      if (!googleSub) return false;

      const linkUserId = await resolveGoogleLinkUserId();

      try {
        if (linkUserId) {
          await clearGoogleLinkCookie();
          const dbUser = await linkGoogleToUser({
            userId: linkUserId,
            googleSub,
          });

          await createSession({
            userId: dbUser.id,
            user_id: dbUser.user_id,
          });
          await setGoogleLinkFlash(
            'Google 계정 연동이 완료되었습니다.',
            'success',
          );
          return true;
        }

        const dbUser = await findOrCreateGoogleUser({
          googleSub,
          name: profile?.name,
          email: profile?.email,
        });

        await createSession({
          userId: dbUser.id,
          user_id: dbUser.user_id,
        });

        return true;
      } catch (error) {
        if (linkUserId) {
          await clearGoogleLinkCookie();
          const message =
            error instanceof GoogleLinkError
              ? error.message
              : 'Google 연동 처리 중 오류가 발생했습니다.';
          await setGoogleLinkFlash(message, 'error');
        }

        console.error('[nextauth] Google signIn failed:', error);
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return `${baseUrl}/my-info`;
    },
  },
  session: {
    strategy: 'jwt',
  },
};
