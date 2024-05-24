import { useFindManyList, useFindManyProperty } from '@lib/hooks';
import { List, Space, User } from '@prisma/client';
import BreadCrumb from 'components/BreadCrumb';
import SpaceMembers from 'components/SpaceMembers';
import TodoList from 'components/TodoList';
import WithNavBar from 'components/WithNavBar';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { getEnhancedPrisma } from 'server/enhanced-db';
import PropertyList from 'components/Property/PropertyList';
import { CreateListDialog } from 'components/List/CreateListDialog';
import { CreatePropertyDialog } from 'components/Property/CreatePropertyDialog';


type Props = {
    space: Space;
};

export default function SpaceHome(props: Props) {
    const router = useRouter();

    const { data: lists } = useFindManyList(
        {
            where: {
                space: {
                    slug: router.query.slug as string,
                },
            },
            include: {
                owner: true,
            },
            orderBy: {
                updatedAt: 'desc',
            },
        },
        {
            enabled: !!router.query.slug
        }
    );

    
    const { data: properties } = useFindManyProperty(
        {
            where: {
                space: {
                    slug: router.query.slug as string,
                },
            },
            include: {
                owner: true,
                leases: true,
            },
            orderBy: {
                updatedAt: 'desc',
            },
        },
        {
            enabled: !!router.query.slug
        }
    );

    return (
        <WithNavBar>
            <div className="px-8 py-2">
                <BreadCrumb space={props.space} />
            </div>
            <div className="p-8">
                <div className="w-full flex flex-col md:flex-row mb-8 space-y-4 md:space-y-0 md:space-x-4">
                    <label htmlFor="create-list-modal" className="btn btn-primary btn-wide modal-button">
                        Create a list
                    </label>
                    <label htmlFor="create-property-modal" className="btn btn-primary btn-wide modal-button">
                        Create a property
                    </label>
                    <SpaceMembers />
                </div>

                <h2 className="text-xl font-semibold mb-4">Lists</h2>
                <ul className="flex flex-wrap gap-6 mb-8">
                    {lists?.map((list) => (
                        <li key={list.id}>
                            <TodoList value={list} />
                        </li>
                    ))}
                </ul>

                <h2 className="text-xl font-semibold mb-4">Properties</h2>
                <ul className="flex flex-wrap gap-6 mb-8">
                    {properties?.map((property) => (
                        <li key={property.id}>
                            <PropertyList value={property}/>

                        </li>
                    ))}
                </ul>

                <CreateListDialog />
                <CreatePropertyDialog />
            </div>
        </WithNavBar>
    );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ req, res, params }) => {
    const db = await getEnhancedPrisma({ req, res });

    const space = await db.space.findUnique({
        where: { slug: params!.slug as string },
    });
    if (!space) {
        return {
            notFound: true,
        };
    }


    return {
        props: { space },
    };
};
