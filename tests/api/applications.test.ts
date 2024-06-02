import { assert, it } from 'vitest';
import { prisma } from '../mock/enhanced-prisma';
import { enhance } from '@zenstackhq/runtime';
import { userDemo } from '@/components/Auth/UserAuthForm';

it('Should list apps', async () => {
    const user = await prisma.user.create({ data: userDemo });
    const enhancedPrisma = enhance(prisma, { user });
    const apps = await enhancedPrisma.application.findMany();
    assert.deepEqual(
        apps.map((app) => app.slug),
        ['assets'],
    );
});
