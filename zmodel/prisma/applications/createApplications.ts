import { PrismaClient } from '@prisma/client';
import { application } from './applications';

export async function createApplications(prisma: PrismaClient) {
    await prisma.application.deleteMany();

    await prisma.application.create({ data: application });
}
