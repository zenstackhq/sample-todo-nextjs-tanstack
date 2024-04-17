import { createPrisma } from '~/server/db';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export async function GET(_request: Request) {
    const prisma = createPrisma();
    return Response.json(await prisma.list.findMany());
}
