'use client';

import '~/styles/globals.css';

import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import AuthGuard from '~/components/AuthGuard';
import { SpaceContext, UserContext, useCurrentSpace, useCurrentUser } from '~/lib/context';
import Providers from './providers';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-sans',
});

function AppContent(props: { children: ReactNode }) {
    const user = useCurrentUser();
    const space = useCurrentSpace();

    return (
        <AuthGuard>
            <UserContext.Provider value={user}>
                <SpaceContext.Provider value={space}>
                    <div className="h-screen flex flex-col">{props.children}</div>
                </SpaceContext.Provider>
            </UserContext.Provider>
        </AuthGuard>
    );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`font-sans ${inter.variable}`}>
                <Providers>
                    <AppContent>
                        <div className="flex-grow h-100">{children}</div>
                    </AppContent>
                </Providers>
            </body>
        </html>
    );
}
