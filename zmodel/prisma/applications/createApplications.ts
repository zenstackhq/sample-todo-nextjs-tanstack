import { PrismaClient } from '@prisma/client';
import { coreApplication } from './coreApplication';

export async function createApplications(prisma: PrismaClient) {
    await prisma.application.deleteMany();

    await prisma.application.create({ data: coreApplication });
    await prisma.application.create({ data: { slug: 'app2' } });
}
