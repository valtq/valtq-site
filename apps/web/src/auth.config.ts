import type { NextAuthConfig } from 'next-auth';

/**
 * Edge-safe Auth.js config shared by middleware and the Node runtime.
 * Credential providers (Node-only) are merged in `auth.ts`.
 */
export const authConfig: NextAuthConfig = {
  trustHost: true,
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/en/admin/login',
  },
  providers: [],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = 'admin';
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? 'admin';
      }
      return session;
    },
  },
};
