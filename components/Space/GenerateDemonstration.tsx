import { faker } from '@faker-js/faker';
import { useCurrentSpace } from '@/lib/context';
import {
    useCreateManyCharge,
    useCreateManyDashboard,
    useCreateManyLease,
    useCreateManyList,
    useCreateManyPayment,
    useCreateManyProperty,
    useCreateManySpaceComponent,
    useCreateManyTable,
} from '@/zmodel/lib/hooks';
import { PropertyType, ChargeType } from '@prisma/client';

const fakeProperty = () => {
    return {
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        propertyType: PropertyType.COMMERCIAL,
        postalCode: faker.location.zipCode(),
        country: faker.location.country(),
        createdAt: faker.date.past(),
    };
};

const fakeLease = (propertyId: string) => {
    return {
        propertyId,
        startDate: faker.date.past(),
        endDate: faker.date.future(),
        rentAmount: faker.number.float({ min: 5, max: 50 }),
        createdAt: faker.date.past(),
    };
};
const fakePayment = (leaseId: string) => {
    return {
        leaseId,
        amount: faker.number.bigInt({ min: 500, max: 5000 }),
        date: faker.date.past(),
        createdAt: faker.date.past(),
    };
};

const fakeCharge = ({ propertyId, leaseId }: { propertyId: string; leaseId: string }) => {
    return {
        propertyId,
        leaseId,
        chargeType: ChargeType.UTILITIES,
        amount: faker.number.bigInt({ min: 5, max: 100 }),
        dueDate: faker.date.future(),
        description: faker.lorem.sentence(),
        createdAt: faker.date.past(),
    };
};

export const GenerateDemonstration = () => {
    const space = useCurrentSpace();

    const createManySpaceComponent = useCreateManySpaceComponent();
    const createManyTable = useCreateManyTable();

    const createManyProperty = useCreateManyProperty();
    const createManyDashboard = useCreateManyDashboard();
    const createManyList = useCreateManyList();

    const createManyLease = useCreateManyLease();
    const createManyPayment = useCreateManyPayment();
    const createManyCharge = useCreateManyCharge();

    const generateDemonstration = async () => {
        if (!space) {
            throw 'not space';
        }
        const prefix = `demo_${Date.now()}_`;

        await createManySpaceComponent.mutateAsync({
            data: Array.from({ length: 5 }).map((_, index) => ({
                spaceId: space.id,
                id: `${prefix}Dashboard${index}`,
                type: 'Dashboard',
                name: `${prefix}Dashboard${index}`,
            })),
        });

        await createManyTable.mutateAsync({
            data: Array.from({ length: 5 }).map((_, index) => ({
                id: `${prefix}Dashboard${index}`,
                type: 'Dashboard',
            })),
        });

        await createManyDashboard.mutateAsync({
            data: Array.from({ length: 5 }).map((_, index) => ({
                spaceComponentId: `${prefix}Dashboard${index}`,
                tableId: `${prefix}Dashboard${index}`,
            })),
        });

        await createManySpaceComponent.mutateAsync({
            data: Array.from({ length: 5 }).map((_, index) => ({
                spaceId: space.id,
                id: `${prefix}List${index}`,
                type: 'List',
                name: `${prefix}List${index}`,
            })),
        });

        await createManyTable.mutateAsync({
            data: Array.from({ length: 5 }).map((_, index) => ({
                id: `${prefix}List${index}`,
                type: 'List',
            })),
        });

        await createManyList.mutateAsync({
            data: Array.from({ length: 5 }).map((_, index) => ({
                spaceComponentId: `${prefix}List${index}`,
                tableId: `${prefix}List${index}`,
            })),
        });

        await createManySpaceComponent.mutateAsync({
            data: Array.from({ length: 5 }).map((_, index) => ({
                spaceId: space.id,
                id: `${prefix}Property${index}`,
                type: 'Property',
                name: `${prefix}Property${index}`,
            })),
        });

        await createManyTable.mutateAsync({
            data: Array.from({ length: 5 }).map((_, index) => ({
                id: `${prefix}Property${index}`,
                type: 'Property',
            })),
        });

        await createManyProperty.mutateAsync({
            data: Array.from({ length: 5 }).map((_, index) => ({
                ...fakeProperty(),
                tableId: `${prefix}Property${index}`,
                spaceComponentId: `${prefix}Property${index}`,
                id: `${prefix}Property${index}`,
            })),
        });

        const propertyId = `${prefix}Property${0}`;
        await createManyLease.mutateAsync({
            data: Array.from({ length: 5 }).map((_, index) => ({
                ...fakeLease(propertyId),
                id: `${prefix}Lease${index}`,
            })),
        });

        const leaseId = `${prefix}Lease${0}`;
        await createManyPayment.mutateAsync({ data: Array.from({ length: 5 }, () => fakePayment(leaseId)) });
        await createManyCharge.mutateAsync({
            data: Array.from({ length: 5 }, () => fakeCharge({ propertyId, leaseId })),
        });
    };

    return <button onClick={generateDemonstration}>Generate Demonstration</button>;
};
