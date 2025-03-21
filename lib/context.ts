'use client';

import { Space } from '@prisma/client';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { createContext } from 'react';
import { useFindManySpace } from './hooks';

export const UserContext = createContext<User | undefined>(undefined);

export function useCurrentUser() {
    const { data: session } = useSession();
    return session?.user;
}

export const SpaceContext = createContext<Space | undefined>(undefined);

export function useCurrentSpace() {
    const params = useParams<{ slug: string }>();
    const { data: spaces } = useFindManySpace(
        {
            where: { slug: params.slug },
        },
        {
            enabled: !!params.slug,
        }
    );

    return spaces?.[0];
}
