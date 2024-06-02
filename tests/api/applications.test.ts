import { assert, it } from 'vitest';
import { getEnhancedPrisma } from '../mock/enhanced-prisma';
import { coreApplication } from '@/zmodel/prisma/applications/applications';

it('Should list apps', async () => {
    const {
        user1: { prisma },
    } = await getEnhancedPrisma();
    const apps = await prisma.application.findMany();
    assert.deepEqual(
        apps.map((app) => app.slug),
        ['assets']
    );
});

it('Should enable an application in space', async () => {
    const {
        user1: { prisma, space },
    } = await getEnhancedPrisma();
    await prisma.spaceComponent.create({
        data: {
            name: 'test',
            type: 'List',
            spaceId: space.id,
        },
    });
    const application = await prisma.application.findUnique({ where: { slug: coreApplication.slug } });

    assert(application);

    const spaceApplication = await prisma.spaceApplication.create({
        data: {
            spaceId: space.id,
            applicationId: application.id,
        },
    });

    assert.equal(spaceApplication.spaceId, space.id);
    assert.equal(spaceApplication.applicationId, application.id);

    const appDetails = await prisma.space.findMany({
        include: {
            applications: {
                include: {
                    application: {
                        include: {
                            folders: true,
                        },
                    },
                },
            },
        },
    });
    assert.deepEqual(appDetails[0].applications[0].application.folders[0].path, '/properties');
});
