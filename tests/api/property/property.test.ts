import { assert, it } from 'vitest';
import { fakeProperty } from '@/components/Space/GenerateDemonstration';
import { getEnhancedPrisma } from '../../mock/enhanced-prisma';
import { SpaceComponentType } from '@prisma/client';

it('Should create / list properties', async () => {
    const { user1, user2, user3 } = await getEnhancedPrisma();
    let properties = await user2.prisma.property.findMany();
    assert.notOk(properties.length);
    const property = fakeProperty();

    const newProperty = await user2.prisma.property.create({
        data: {
            ...property,
            table: {
                create: {
                    type: 'Property',
                },
            },
            spaceComponent: {
                create: {
                    type: SpaceComponentType.Property,
                    name: 'Property test',
                    spaceId: user2.space.id,
                },
            },
        },
    });

    assert.equal(newProperty.address, property.address);
    assert.equal(newProperty.postalCode, property.postalCode);

    /* Properties of user2 are seen by user3 member of the space */

    properties = await user2.prisma.property.findMany();
    assert.equal(properties.length, 1);
    assert.equal(properties[0].address, property.address);
    assert.equal(properties[0].postalCode, property.postalCode);
    assert.equal(properties[0].id, newProperty.id);

    properties = await user3.prisma.property.findMany();
    assert.equal(properties.length, 1);
    assert.equal(properties[0].address, property.address);
    assert.equal(properties[0].postalCode, property.postalCode);
    assert.equal(properties[0].id, newProperty.id);

    properties = await user1.prisma.property.findMany();
    assert.equal(properties.length, 0);

    /* Private property */

    const privateProperty = await user2.prisma.property.create({
        data: {
            ...property,
            table: {
                create: {
                    type: 'Property',
                },
            },
            spaceComponent: {
                create: {
                    type: SpaceComponentType.Property,
                    name: 'Private property test',
                    private: true,
                    spaceId: user2.space.id,
                },
            },
        },
    });

    properties = await user2.prisma.property.findMany();
    assert.equal(properties.length, 2);
    assert.equal(properties[0].address, property.address);
    assert.equal(properties[0].postalCode, property.postalCode);
    assert.equal(properties[0].id, newProperty.id);
    assert.equal(properties[1].id, privateProperty.id);

    properties = await user3.prisma.property.findMany();
    assert.equal(properties.length, 1);
    assert.equal(properties[0].address, property.address);
    assert.equal(properties[0].postalCode, property.postalCode);
    assert.equal(properties[0].id, newProperty.id);

    properties = await user1.prisma.property.findMany();
    assert.equal(properties.length, 0);
});

it('Should allow a user to update properties they own', async () => {
    const { user2 } = await getEnhancedPrisma();

    const property = fakeProperty();

    const newProperty = await user2.prisma.property.create({
        data: {
            ...property,
            table: {
                create: { type: 'Property' },
            },
            spaceComponent: {
                create: {
                    type: SpaceComponentType.Property,
                    name: 'User2 Property',
                    spaceId: user2.space.id,
                },
            },
        },
    });

    const updatedProperty = await user2.prisma.property.update({
        where: { id: newProperty.id },
        data: { address: 'New Address' },
    });

    assert.equal(updatedProperty.address, 'New Address');
});

it('Should not allow a user to update properties they do not own', async () => {
    const { user1, user2 } = await getEnhancedPrisma();

    const property = fakeProperty();

    const newProperty = await user2.prisma.property.create({
        data: {
            ...property,
            table: {
                create: { type: 'Property' },
            },
            spaceComponent: {
                create: {
                    type: SpaceComponentType.Property,
                    name: 'User2 Property',
                    spaceId: user2.space.id,
                },
            },
        },
    });

    let error;
    try {
        await user1.prisma.property.update({
            where: { id: newProperty.id },
            data: { address: 'User1 Address' },
        });
    } catch (e) {
        error = e;
    }

    // @ts-ignore
    assert.equal(error.meta.reason, 'ACCESS_POLICY_VIOLATION');
});
