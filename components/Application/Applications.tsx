import { useCurrentSpace } from '@/lib/context';
import {
    useCreateSpaceApplication,
    useDeleteSpaceApplication,
    useFindManyApplication,
    useFindManySpaceApplication,
} from '@/zmodel/lib/hooks';
import { Button } from '@/components/ui/button';
import { ApplicationScalarSchema, SpaceApplicationScalarSchema } from '@zenstackhq/runtime/zod/models';
import { AutoTable } from '../ui/auto-table';
import { format } from 'date-fns';
import { flat } from 'flatten';

import * as z from 'zod';
import { transformWithParentDetails } from '@/lib/utils';

export const Applications = () => {
    const space = useCurrentSpace();
    const { data: applications } = useFindManyApplication(
        {
            include: {
                activations: {
                    include: {
                        space: true,
                    },
                },
            },
        },
        {
            enabled: !!space,
        }
    );

    console.log(applications);

    const flatApplications = transformWithParentDetails(applications);
    console.log(flatApplications);
    const activate = useCreateSpaceApplication();
    const desactivate = useDeleteSpaceApplication();
    const { data: spaceApplications } = useFindManySpaceApplication({ where: { spaceId: space?.id } });
    if (!applications || !space) {
        return <>Loading...</>;
    }
    const applicationsData = applications.map((application) => {
        const activated = spaceApplications?.find(
            (spaceApplication) => spaceApplication.applicationId === application.id
        );
        const onClick = () => {
            if (activated) {
                return desactivate.mutateAsync({ where: { id: activated.id } });
            }
            return activate.mutateAsync({ data: { applicationId: application.id, spaceId: space.id } });
        };
        return (
            <div key={application.id}>
                {
                    <Button onClick={onClick} variant={activated ? 'default' : 'outline'}>
                        {activated ? 'Disable' : 'Enable'} {application.slug}
                    </Button>
                }
            </div>
        );
    });

    return (
        <AutoTable
            formSchema={z.object({ details: ApplicationScalarSchema, activations: SpaceApplicationScalarSchema })}
            data={flatApplications}
        />
    );
};
