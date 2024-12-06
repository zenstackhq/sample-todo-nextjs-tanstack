'use client';

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SpaceUserRole } from '@prisma/client';
import WithNavBar from 'components/WithNavBar';
import { useCreateSpace } from 'lib/hooks';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';

const CreateSpace: NextPage = () => {
    const { data: session } = useSession();
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');

    const { mutateAsync: createAsync } = useCreateSpace();
    const router = useRouter();

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const space = await createAsync({
                data: {
                    name,
                    slug,
                    members: {
                        create: [
                            {
                                userId: session!.user.id,
                                role: SpaceUserRole.ADMIN,
                            },
                        ],
                    },
                },
            });
            console.log('Space created:', space);
            toast.success("Space created successfully! You'll be redirected.");

            setTimeout(() => {
                if (space) {
                    void router.push(`/space/${space.slug}`);
                }
            }, 2000);
        } catch (err: any) {
            console.error(err);
            if (err.info?.prisma === true) {
                if (err.info.code === 'P2002') {
                    toast.error('Space slug already in use');
                } else {
                    toast.error(`Unexpected Prisma error: ${err.info.code}`);
                }
            } else {
                toast.error(JSON.stringify(err));
            }
        }
    };

    return (
        <WithNavBar>
            <div className="flex items-center justify-center h-full">
                <form onSubmit={(e) => void onSubmit(e)}>
                    <h1 className="text-3xl mb-8">Create a space</h1>
                    <div className="flex-col space-y-4">
                        <div>
                            <label htmlFor="name" className="text-lg">
                                Space name
                            </label>
                            <input
                                id="name"
                                type="text"
                                required
                                placeholder="Name of your space"
                                className="input input-bordered w-full max-w-xs mt-2"
                                autoFocus
                                onChange={(e: FormEvent<HTMLInputElement>) => setName(e.currentTarget.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="slug" className="text-lg">
                                Space slug
                            </label>
                            <input
                                id="slug"
                                type="text"
                                required
                                placeholder="Slug of your space"
                                className="input input-bordered w-full max-w-xs mt-2"
                                onChange={(e: FormEvent<HTMLInputElement>) => setSlug(e.currentTarget.value)}
                            />
                        </div>
                    </div>

                    <div className="flex space-x-4 mt-6">
                        <input
                            type="submit"
                            disabled={name.length < 4 || name.length > 20 || !slug.match(/^[0-9a-zA-Z]{4,16}$/)}
                            value="Create"
                            className="btn btn-primary px-8"
                        />
                        <button className="btn btn-outline" onClick={() => void router.push('/')}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </WithNavBar>
    );
};

export default CreateSpace;
