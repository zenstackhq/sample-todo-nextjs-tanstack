import { useFindUniqueSpace, useFindUniqueSpaceComponent } from '@/zmodel/lib/hooks';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export function useCurrentUser() {
    const { data: session } = useSession();
    return session?.user;
}
export function useSpaceSlug() {
    const router = useRouter();
    return router.query.slug as string;
}

export function useCurrentSpace() {
    const slug = useSpaceSlug();
    const { data } = useFindUniqueSpace(
        {
            where: {
                slug,
            },
        },
        {
            enabled: !!slug,
        }
    );

    return data;
}

export function useCurrentSpaceComponent() {
    const router = useRouter();
    const { data } = useFindUniqueSpaceComponent(
        {
            where: {
                id: router.query.componentId as string,
            },
        },
        {
            enabled: !!router.query.componentId,
        }
    );

    return data;
}
