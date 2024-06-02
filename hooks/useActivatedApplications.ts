import { useSpaceSlug } from '@/lib/context';
import { useFindUniqueSpace } from '@/zmodel/lib/hooks';

export function useActivatedApplications() {
    const slug = useSpaceSlug();
    const { data } = useFindUniqueSpace(
        {
            where: {
                slug,
            },
            include: {
                applications: {
                    include: {
                        application: {
                            include: {
                                folders: {
                                    include: {
                                        tabs: {
                                            include: {
                                                subTabs: {
                                                    include: {
                                                        grids: true,
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        {
            enabled: !!slug,
        },
    );
    return data?.applications;
}
