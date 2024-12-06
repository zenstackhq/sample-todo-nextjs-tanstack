import { enhance } from '@zenstackhq/runtime';
import { NextRequestHandler } from '@zenstackhq/server/next';
import { auth } from 'server/auth';
import { prisma } from 'server/db';

// create an enhanced Prisma client with user context
async function getPrisma() {
    const authObj = await auth();
    return enhance(prisma, { user: authObj?.user });
}

const handler = NextRequestHandler({ getPrisma, useAppDir: true });

export { handler as DELETE, handler as GET, handler as PATCH, handler as POST, handler as PUT };
