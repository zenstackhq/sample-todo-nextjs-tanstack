import { assert, it } from 'vitest';
import { fakeProperty } from '@/components/Space/GenerateDemonstration';
import { getEnhancedPrisma } from '../../mock/enhanced-prisma';
import { SpaceComponentType } from '@prisma/client';

it('Should not allow a user to create leases or payments for properties they do not own', async () => {
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
                    name: 'Other User Property',
                    spaceId: user2.space.id,
                },
            },
        },
    });

    let error;
    try {
        await user1.prisma.lease.create({
            data: {
                startDate: new Date(),
                rentAmount: 1000,
                propertyId: newProperty.id,
            },
        });
    } catch (e) {
        error = e;
    }

    // @ts-ignore
    assert.equal(error.meta.reason, 'ACCESS_POLICY_VIOLATION');
});

it('Should allow a user to create leases and payments for properties in their space', async () => {
    const { user1, user2, user3 } = await getEnhancedPrisma();

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

    const lease2 = await user2.prisma.lease.create({
        data: {
            startDate: new Date(),
            rentAmount: 1000,
            propertyId: newProperty.id,
        },
    });
    assert.equal(lease2.propertyId, newProperty.id);

    const lease3 = await user3.prisma.lease.create({
        data: {
            startDate: new Date(),
            rentAmount: 1000,
            propertyId: newProperty.id,
        },
    });
    assert.equal(lease3.propertyId, newProperty.id);

    const payment2 = await user2.prisma.payment.create({
        data: {
            leaseId: lease2.id,
            amount: 1000,
            date: new Date(),
        },
    });
    assert.equal(payment2.leaseId, lease2.id);

    const payment2bis = await user2.prisma.payment.create({
        data: {
            leaseId: lease3.id,
            amount: 1000,
            date: new Date(),
        },
    });
    assert.equal(payment2bis.leaseId, lease3.id);

    const payment3 = await user2.prisma.payment.create({
        data: {
            leaseId: lease2.id,
            amount: 1000,
            date: new Date(),
        },
    });
    assert.equal(payment3.leaseId, lease2.id);

    const payment3Bis = await user2.prisma.payment.create({
        data: {
            leaseId: lease3.id,
            amount: 1000,
            date: new Date(),
        },
    });
    assert.equal(payment3Bis.leaseId, lease3.id);

    const include = {
        include: {
            leases: {
                include: {
                    payments: true,
                },
            },
            charges: true,
        },
    };
    const properties1 = await user1.prisma.property.findMany(include);
    assert.notOk(properties1.length);

    const properties2 = await user2.prisma.property.findMany(include);
    assert.equal(properties2.length, 1);
    assert.equal(properties2[0].id, newProperty.id);
    assert.equal(properties2[0].leases.length, 2);
    assert.equal(properties2[0].leases[0].payments.length, 2);
    assert.equal(properties2[0].leases[1].payments.length, 2);
    assert.equal(properties2[0].charges.length, 0);

    const properties3 = await user2.prisma.property.findMany(include);
    assert.equal(properties3.length, 1);
    assert.equal(properties3[0].id, newProperty.id);
    assert.equal(properties3[0].leases.length, 2);
    assert.equal(properties3[0].leases[0].payments.length, 2);
    assert.equal(properties3[0].leases[1].payments.length, 2);
    assert.equal(properties3[0].charges.length, 0);

    const leases1 = await user1.prisma.lease.findMany();
    assert.notOk(leases1.length);

    const leases2 = await user2.prisma.lease.findMany();
    assert.equal(leases2.length, 2);

    const leases3 = await user3.prisma.lease.findMany();
    assert.equal(leases3.length, 2);

    const payments1 = await user1.prisma.payment.findMany();
    assert.notOk(payments1.length);

    const payments2 = await user2.prisma.payment.findMany();
    assert.equal(payments2.length, 4);

    const payments3 = await user3.prisma.payment.findMany();
    assert.equal(payments3.length, 4);
});
