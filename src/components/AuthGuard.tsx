import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

type Props = {
    children: JSX.Element | JSX.Element[];
};

export default function AuthGuard({ children }: Props) {
    const { status } = useSession();
    const currPath = usePathname();
    const router = useRouter();

    if (currPath === '/signup' || currPath === '/signin') {
        return <>{children}</>;
    }

    if (status === 'loading') {
        return <p>Loading...</p>;
    } else if (status === 'unauthenticated') {
        router.push('/signin');
        return <></>;
    } else {
        return <>{children}</>;
    }
}
