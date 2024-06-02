import { CreateForm } from '@/components/Form/CreateForm';
import { Spaces } from '@/components/Home/Spaces';
import { WithNavBar } from '@/components/layout/WithNavBar';
import { useCurrentUser } from '@/lib/context';
import { useCreateSpace } from '@/zmodel/lib/hooks';
import { SpaceUserRole } from '@prisma/client';
import { SpaceCreateScalarSchema } from '@zenstackhq/runtime/zod/models';
import type { NextPage } from 'next';

export const Home: NextPage = () => {
    const createSpace = useCreateSpace();
    const user = useCurrentUser();
    if (!user) {
        return <></>;
    }
    return (
        <WithNavBar>
            <Spaces />
            <CreateForm
                formSchema={SpaceCreateScalarSchema}
                onSubmitData={async (data) => {
                    await createSpace.mutateAsync({
                        data: {
                            ...data,
                            members: {
                                create: [
                                    {
                                        userId: user.id,
                                        role: SpaceUserRole.ADMIN,
                                    },
                                ],
                            },
                        },
                    });
                }}
                title={'Create space'}
            />
        </WithNavBar>
    );
};

export default Home;
