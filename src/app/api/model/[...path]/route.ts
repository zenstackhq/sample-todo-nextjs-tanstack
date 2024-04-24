import { enhance } from '@zenstackhq/runtime/edge';
import { NextRequestHandler } from '@zenstackhq/server/next';
import { auth } from '~/server/auth';
import { createPrisma } from '~/server/db';

// create an enhanced Prisma client with user context
async function getPrisma() {
    const prisma = createPrisma();
    const session = await auth();
    return enhance(
        prisma,
        {
            user: session?.user?.id ? { id: session.user.id } : undefined,
        },
        {
            transactionMaxWait: 10000,
            transactionTimeout: 10000,
            logPrismaQuery: true,
        }
    );
}

const handler = NextRequestHandler({ getPrisma, useAppDir: true });

export { handler as DELETE, handler as GET, handler as PATCH, handler as POST, handler as PUT };

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
