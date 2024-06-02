import { useFindUniqueGrid } from '@/zmodel/lib/hooks';
import { GridInclude } from './Grid';

export const useFindGridDetails = (gridId: string) => {
    const { data: grid } = useFindUniqueGrid(
        {
            where: {
                id: gridId,
            },
            include: GridInclude,
        },
        {
            enabled: !!gridId,
        }
    );
    return grid;
};
