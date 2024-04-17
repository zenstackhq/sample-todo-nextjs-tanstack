import { PrismaAdapter } from '@auth/prisma-adapter';
import type { PrismaClient } from '@prisma/client';
import { compareSync } from 'bcryptjs';
import NextAuth, { type DefaultSession, type NextAuthConfig } from 'next-auth';
import { type Adapter } from 'next-auth/adapters';
import CredentialsProvider from 'next-auth/providers/credentials';
import { createPrisma } from './db';
// import { prisma } from './db';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
    interface Session extends DefaultSession {
        user: {
            id: string;
        } & DefaultSession['user'];
    }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthConfig = {
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        session({ session, token }) {
            if (session.user) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                session.user.id = token.sub!;
            }
            return session;
        },
    },
    adapter: PrismaAdapter(createPrisma()) as Adapter,
    providers: [
        CredentialsProvider({
            credentials: {
                email: { type: 'email' },
                password: { type: 'password' },
            },
            authorize: authorize(createPrisma()),
        }),
    ],
};

function authorize(prisma: PrismaClient) {
    return async (credentials: Partial<Record<'email' | 'password', unknown>>) => {
        if (!credentials.email || typeof credentials.email !== 'string')
            throw new Error('"email" is required in credentials');
        if (!credentials.password || typeof credentials.password !== 'string')
            throw new Error('"password" is required in credentials');

        const maybeUser = await prisma.user.findFirst({
            where: { email: credentials.email },
            select: { id: true, email: true, password: true },
        });
        if (!maybeUser?.password) return null;

        // verify the input password with stored hash
        const isValid = compareSync(credentials.password, maybeUser.password);
        if (!isValid) return null;
        return { id: maybeUser.id, email: maybeUser.email };
    };
}

export const {
    handlers: { GET, POST },
    auth,
} = NextAuth(authOptions);
