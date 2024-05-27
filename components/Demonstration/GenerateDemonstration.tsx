import { faker } from "@faker-js/faker";
import { useCurrentSpace } from "@lib/context";
import { useCreateLease, useCreateManyCharge, useCreateManyLease, useCreateManyPayment, useCreateManyProperty, useCreateProperty } from "@lib/hooks";
import { Property, PropertyType, SpaceElementType, Space, Lease, ChargeType } from "@prisma/client";


const fakeProperty = (space?: Space)  => {
	if (!space) {
		throw "not space";
	}
	return {
		address: faker.location.streetAddress(),
		city: faker.location.city(),
		type: PropertyType.COMMERCIAL,
		postalCode: faker.location.zipCode(),
		country: faker.location.country(),
		spaceId: space.id,
		createdAt: faker.date.past(),
		spaceElementType: SpaceElementType.Property
	};
};

const fakeLease = (property: Property) => {
	return {
		propertyId: property.id,
		startDate: faker.date.past(),
		endDate: faker.date.future(),
		rentAmount: faker.number.bigInt({ min: 1000, max: 10000 }),
		createdAt: faker.date.past()
	};
};
const fakePayment = (lease: Lease) => {
	return {
		leaseId: lease.id,
		amount: faker.number.bigInt({ min: 500, max: 5000 }),
		date: faker.date.past(),
		createdAt: faker.date.past()
	};
};

const fakeCharge = ({ property, lease }: {property: Property; lease: Lease;}) => {
	return {
		propertyId: property.id,
		leaseId: lease.id,
		type: ChargeType.UTILITIES,
		amount: faker.number.bigInt({ min: 100, max: 1000 }),
		dueDate: faker.date.future(),
		description: faker.lorem.sentence(),
		createdAt: faker.date.past()
	};
};


export const GenerateDemonstration = () => {
	const space = useCurrentSpace();

	const createManyProperty = useCreateManyProperty();
	const createManyLease = useCreateManyLease();
	const createManyPayment = useCreateManyPayment();
	const createManyCharge = useCreateManyCharge();

	const createProperty = useCreateProperty();
	const createLease = useCreateLease();

	const generateDemonstration = async() => {

		await createManyProperty.mutateAsync({
			data: Array.from({ length: 1000 }, () => fakeProperty(space))
		});

		const property = await createProperty.mutateAsync({ data: fakeProperty(space) });

		if (!property?.id) {
			throw "not property id";
		}
		await createManyLease.mutateAsync({ data: Array.from({ length: 1000 }, () => fakeLease(property)) });

		const lease = await createLease.mutateAsync({ data: fakeLease(property) });

		if (!lease?.id) {
			throw "not lease id";
		}
		await createManyPayment.mutateAsync({ data: Array.from({ length: 1000 }, () => fakePayment(lease)) });
		await createManyCharge.mutateAsync({ data: Array.from({ length: 1000 }, () => fakeCharge({ property, lease })) });

	};
	return <button onClick={generateDemonstration}>Generate Demonstration</button>;
};
