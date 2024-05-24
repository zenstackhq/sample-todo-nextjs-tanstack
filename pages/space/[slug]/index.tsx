/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SpaceContext } from '@lib/context';
import { useCreateList, useCreateProperty, useFindManyList, useFindManyProperty } from '@lib/hooks';
import { List, Space, User } from '@prisma/client';
import { PropertyType } from '@zenstackhq/runtime/models';
import BreadCrumb from 'components/BreadCrumb';
import SpaceMembers from 'components/SpaceMembers';
import TodoList from 'components/TodoList';
import WithNavBar from 'components/WithNavBar';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useContext, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { getEnhancedPrisma } from 'server/enhanced-db';
import { LockClosedIcon } from '@heroicons/react/24/outline';

function CreateListDialog() {
    const space = useContext(SpaceContext);

    const [modalOpen, setModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [_private, setPrivate] = useState(false);

    const create = useCreateList();

    const inputRef = useRef<HTMLInputElement>(null);

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();

        try {
            await create.mutateAsync({
                data: {
                    title,
                    private: _private,
                    space: { connect: { id: space!.id } },
                },
            });
        } catch (err: any) {
            toast.error(`Failed to create list: ${err.info?.message || err.message}`);
            return;
        }

        toast.success('List created successfully!');

        // reset states
        setTitle('');
        setPrivate(false);

        // close modal
        setModalOpen(false);
    };

    return (
        <>
            <input
                type="checkbox"
                id="create-list-modal"
                className="modal-toggle"
                checked={modalOpen}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setModalOpen(e.currentTarget.checked);
                }}
            />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-xl mb-8">Create a Todo list</h3>
                    <form onSubmit={(e) => void onSubmit(e)}>
                        <div className="flex flex-col space-y-4">
                            <div className="flex items-center">
                                <label htmlFor="title" className="text-lg inline-block w-20">
                                    Title
                                </label>
                                <input
                                    id="title"
                                    type="text"
                                    required
                                    placeholder="Title of your list"
                                    ref={inputRef}
                                    className="input input-bordered w-full max-w-xs mt-2"
                                    value={title}
                                    onChange={(e: FormEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)}
                                />
                            </div>
                            <div className="flex items-center">
                                <label htmlFor="private" className="text-lg inline-block w-20">
                                    Private
                                </label>
                                <input
                                    id="private"
                                    type="checkbox"
                                    className="checkbox"
                                    onChange={(e: FormEvent<HTMLInputElement>) => setPrivate(e.currentTarget.checked)}
                                />
                            </div>
                        </div>
                        <div className="modal-action">
                            <input className="btn btn-primary" type="submit" value="Create" />
                            <label htmlFor="create-list-modal" className="btn btn-outline">
                                Cancel
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}


function CreatePropertyDialog() {
    const space = useContext(SpaceContext);

    const [modalOpen, setModalOpen] = useState(false);
    const [type, setType] = useState<PropertyType>('APARTMENT');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [_private, setPrivate] = useState(false);

    const create = useCreateProperty();

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();

        try {
            await create.mutateAsync({
                data: {
                    type,
                    address,
                    city,
                    postalCode,
                    country,
                    private: _private,
                    space: { connect: { id: space!.id } },
                },
            });
        } catch (err: any) {
            toast.error(`Failed to create property: ${err.info?.message || err.message}`);
            return;
        }

        toast.success('Property created successfully!');

        // reset states
        setType('APARTMENT');
        setAddress('');
        setCity('');
        setPostalCode('');
        setCountry('');
        setPrivate(false);

        // close modal
        setModalOpen(false);
    };

    return (
        <>
            <input
                type="checkbox"
                id="create-property-modal"
                className="modal-toggle"
                checked={modalOpen}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setModalOpen(e.currentTarget.checked);
                }}
            />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-xl mb-8">Create a Property</h3>
                    <form onSubmit={(e) => void onSubmit(e)}>
                        <div className="flex flex-col space-y-4">
                            <div className="flex items-center">
                                <label htmlFor="type" className="text-lg inline-block w-20">
                                    Type
                                </label>
                                <select
                                    id="type"
                                    required
                                    className="select select-bordered w-full max-w-xs mt-2"
                                    value={type}
                                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setType(e.currentTarget.value as PropertyType)}
                                >
                                    <option value="APARTMENT">Apartment</option>
                                    <option value="HOUSE">House</option>
                                    <option value="COMMERCIAL">Commercial</option>
                                </select>
                            </div>
                            <div className="flex items-center">
                                <label htmlFor="address" className="text-lg inline-block w-20">
                                    Address
                                </label>
                                <input
                                    id="address"
                                    type="text"
                                    required
                                    placeholder="Address of the property"
                                    className="input input-bordered w-full max-w-xs mt-2"
                                    value={address}
                                    onChange={(e: FormEvent<HTMLInputElement>) => setAddress(e.currentTarget.value)}
                                />
                            </div>
                            <div className="flex items-center">
                                <label htmlFor="city" className="text-lg inline-block w-20">
                                    City
                                </label>
                                <input
                                    id="city"
                                    type="text"
                                    required
                                    placeholder="City"
                                    className="input input-bordered w-full max-w-xs mt-2"
                                    value={city}
                                    onChange={(e: FormEvent<HTMLInputElement>) => setCity(e.currentTarget.value)}
                                />
                            </div>
                            <div className="flex items-center">
                                <label htmlFor="postalCode" className="text-lg inline-block w-20">
                                    Postal Code
                                </label>
                                <input
                                    id="postalCode"
                                    type="text"
                                    required
                                    placeholder="Postal Code"
                                    className="input input-bordered w-full max-w-xs mt-2"
                                    value={postalCode}
                                    onChange={(e: FormEvent<HTMLInputElement>) => setPostalCode(e.currentTarget.value)}
                                />
                            </div>
                            <div className="flex items-center">
                                <label htmlFor="country" className="text-lg inline-block w-20">
                                    Country
                                </label>
                                <input
                                    id="country"
                                    type="text"
                                    required
                                    placeholder="Country"
                                    className="input input-bordered w-full max-w-xs mt-2"
                                    value={country}
                                    onChange={(e: FormEvent<HTMLInputElement>) => setCountry(e.currentTarget.value)}
                                />
                            </div>
                            <div className="flex items-center">
                                <label htmlFor="private" className="text-lg inline-block w-20">
                                    Private
                                </label>
                                <input
                                    id="private"
                                    type="checkbox"
                                    className="checkbox"
                                    onChange={(e: FormEvent<HTMLInputElement>) => setPrivate(e.currentTarget.checked)}
                                />
                            </div>
                        </div>
                        <div className="modal-action">
                            <input className="btn btn-primary" type="submit" value="Create" />
                            <label htmlFor="create-property-modal" className="btn btn-outline">
                                Cancel
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

type Props = {
    space: Space;
    lists: (List & { owner: User })[];
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
            enabled: !!router.query.slug,
            initialData: props.lists,
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
                            <div className="card shadow-lg">
                                <div className="card-body">
                                    <h3 className="card-title">{property.address}</h3>
                                    <p>Type: {property.type}</p>
                                    <p>City: {property.city}</p>
                                    <p>Postal Code: {property.postalCode}</p>
                                    <p>Country: {property.country}</p>

                                    <h4 className="mt-4 font-semibold">Leases</h4>
                                    <ul className="list-disc list-inside">
                                        {property.leases.map((lease) => (
                                            <li key={lease.id}>
                                                <p>Tenant: {lease.tenantId}</p>
                                                <p>Rent Amount: {lease.rentAmount}</p>
                                                <p>Start Date: {new Date(lease.startDate).toLocaleDateString()}</p>
                                                <p>End Date: {lease.endDate ? new Date(lease.endDate).toLocaleDateString() : 'N/A'}</p>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="card-actions flex w-full justify-between">
                                    <div className="flex space-x-2">
                                        {property.private && (
                                            <div className="tooltip" data-tip="Private">
                                                <LockClosedIcon className="w-4 h-4 text-gray-500" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                </div>
                            </div>
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

    const lists = await db.list.findMany({
        where: {
            space: { slug: params?.slug as string },
        },
        include: {
            owner: true,
        },
        orderBy: {
            updatedAt: 'desc',
        },
    });

    return {
        props: { space, lists },
    };
};
