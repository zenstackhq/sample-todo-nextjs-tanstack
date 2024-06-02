import { enhance } from '@zenstackhq/runtime';
import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';
import { assert } from 'vitest';

const prisma = new PrismaClient();

export async function getEnhancedPrisma() {
    async function createUserWithSpace() {
        const testUser = {
            email: `${nanoid()}@gmail.com`,
            password: 'demo',
        };
        const userCreated = await prisma.user.create({ data: testUser });
        const space = await prisma.space.create({
            data: {
                slug: `${nanoid()}`,
                name: `Test spaces ${testUser.email}`,
                members: {
                    create: [
                        {
                            role: 'ADMIN',
                            userId: userCreated.id,
                        },
                    ],
                },
            },
        });
        return { userCreated, space, testUser, prisma: enhance(prisma, { user: userCreated }) };
    }

    const user1 = await createUserWithSpace();
    const user2 = await createUserWithSpace();
    const user3 = await createUserWithSpace();
    /* User3 is a member of User2's space */
    await prisma.spaceUser.create({
        data: {
            role: 'USER',
            spaceId: user2.space.id,
            userId: user3.userCreated.id,
        },
    });
    assert.notEqual(user1.userCreated.id, user2.userCreated.id);
    assert.notEqual(user1.userCreated.id, user3.userCreated.id);
    assert.notEqual(user2.userCreated.id, user3.userCreated.id);
    return {
        user1,
        user2,
        user3,
    };
}
