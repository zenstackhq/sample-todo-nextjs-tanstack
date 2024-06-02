import { PrismaClient } from '@prisma/client';
import { createApplications } from './applications/createApplications';

const prisma = new PrismaClient();
async function main() {
    createApplications(prisma);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        // eslint-disable-next-line no-console
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
