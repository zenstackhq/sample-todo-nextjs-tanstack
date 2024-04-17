import { Pool } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';

declare global {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined;
}

export function createPrisma() {
    const pool = new Pool({ connectionString: process.env.POSTGRES_PRISMA_URL });
    const adapter = new PrismaNeon(pool);
    const prisma = new PrismaClient({ adapter, log: ['error', 'warn', 'info'] });
    return prisma;
}

export const prisma = global.prisma ?? createPrisma();

if (process.env.NODE_ENV !== 'production') {
    global.prisma = prisma;
}
