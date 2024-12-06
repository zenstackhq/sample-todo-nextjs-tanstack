import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient, SpaceUserRole } from '@prisma/client';
import { compare } from 'bcryptjs';
import { nanoid } from 'nanoid';
import NextAuth, { User, type NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import { prisma } from 'server/db';

const authOptions: NextAuthConfig = {
    adapter: PrismaAdapter(prisma),

    session: {
        strategy: 'jwt',
    },

    pages: {
        signIn: '/signin',
    },

    providers: [
        CredentialsProvider({
            credentials: {
                email: { type: 'email' },
                password: { type: 'password' },
            },
            authorize: authorize(prisma),
        }),

        GitHubProvider,
    ],

    callbacks: {
        session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.sub!,
                },
            };
        },
    },

    events: {
        async signIn({ user }: { user: User }) {
            if (!user.id) {
                return;
            }

            const spaceCount = await prisma.spaceUser.count({
                where: {
                    userId: user.id,
                },
            });
            if (spaceCount > 0) {
                return;
            }

            console.log(`User ${user.id} doesn't belong to any space. Creating one.`);
            const space = await prisma.space.create({
                data: {
                    name: `${user.name || user.email}'s space`,
                    slug: nanoid(8),
                    members: {
                        create: [
                            {
                                userId: user.id,
                                role: SpaceUserRole.ADMIN,
                            },
                        ],
                    },
                },
            });
            console.log(`Space created:`, space);
        },
    },
};

function authorize(prisma: PrismaClient) {
    return async (credentials: Partial<Record<string, unknown>>) => {
        if (!credentials) {
            throw new Error('Missing credentials');
        }

        if (typeof credentials.email !== 'string') {
            throw new Error('"email" is required in credentials');
        }

        if (typeof credentials.password !== 'string') {
            throw new Error('"password" is required in credentials');
        }

        const maybeUser = await prisma.user.findFirst({
            where: {
                email: credentials.email,
            },
            select: {
                id: true,
                email: true,
                password: true,
            },
        });

        if (!maybeUser || !maybeUser.password) {
            return null;
        }

        const isValid = await compare(credentials.password, maybeUser.password);

        if (!isValid) {
            return null;
        }

        return {
            id: maybeUser.id,
            email: maybeUser.email,
        };
    };
}

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
