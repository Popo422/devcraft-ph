import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import { db } from '@/db/drizzle/db';
import { user } from '@/db/drizzle/schema/user';
import { eq } from 'drizzle-orm';

const handler = NextAuth({
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
        console.log(credentials);
        // Add logic here to look up the user from the credentials supplied
        const userExists = (
          await db.select().from(user).where(eq(user.email, email))
        )[0];
        const isPasswordValid = await compare(
          password || '',
          userExists.password,
        );
        if (isPasswordValid) {
          return { id: userExists.id, email: userExists.email };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/',
    // error: '/auth/error',
    // signOut: '/auth/signout'
  },
  callbacks: {
    async jwt({ token, user, session }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
