import { useCurrentSpace, useCurrentSpaceComponent } from '@/lib/context';
import { useCreateLease, useFindUniqueProperty } from '@/zmodel/lib/hooks';
import LeaseDetail from 'components/Lease/LeaseList';
import { LeaseCreateScalarSchema } from '@zenstackhq/runtime/zod/models';
import { CreateForm } from '@/components/Form/CreateForm';

export function PropertyDetails() {
    const space = useCurrentSpace();
    const spaceComponent = useCurrentSpaceComponent();

    const { data: property } = useFindUniqueProperty(
        {
            where: {
                spaceComponentId: spaceComponent?.id,
            },
            include: {
                leases: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                    include: {
                        owner: true,
                    },
                },
            },
        },
        {
            enabled: !!spaceComponent?.id,
        },
    );

    const createLease = useCreateLease();

    if (!space || !property) {
        return <></>;
    }

    return (
        <>
            <h1 className="mb-4 text-2xl font-semibold">{property?.address}</h1>
            <div className="flex space-x-2">
                <div className="mb-8 flex w-full flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                    <CreateForm
                        formSchema={LeaseCreateScalarSchema}
                        onSubmitData={async (data) => {
                            await createLease.mutateAsync({
                                data: {
                                    ...data,
                                    propertyId: property.id,
                                },
                            });
                        }}
                        title={'Create Lease'}
                    />
                </div>
            </div>
            <ul className="flex w-11/12 flex-col space-y-4 py-8 md:w-auto">
                {property.leases?.map((lease) => <LeaseDetail key={lease.id} {...{ lease }} />)}
            </ul>
        </>
    );
}
