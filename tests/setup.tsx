import { vi } from 'vitest';
import { ReactNode } from 'react';
import { PrismockClient } from 'prismock';

vi.mock('next-auth/react', () => ({
    SessionProvider: ({ children }: { children: ReactNode }) => <>{children}</>,
    useSession: () => ({
        user: 'test-user',
    }),
}));
