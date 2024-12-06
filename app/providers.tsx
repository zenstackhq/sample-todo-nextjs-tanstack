'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SpaceContext, useCurrentSpace, useCurrentUser, UserContext } from 'lib/context';
import { SessionProvider } from 'next-auth/react';
import type { ReactNode } from 'react';

const queryClient = new QueryClient();

function UserSpaceProvider({ children }: { children: ReactNode }) {
    const user = useCurrentUser();
    const space = useCurrentSpace();
    return (
        <UserContext.Provider value={user}>
            <SpaceContext.Provider value={space}>{children}</SpaceContext.Provider>
        </UserContext.Provider>
    );
}

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider>
                <UserSpaceProvider>{children}</UserSpaceProvider>
            </SessionProvider>
        </QueryClientProvider>
    );
}
