import { useFindUniqueGrid } from '@/zmodel/lib/hooks';

export const useFindGridDetails = (gridId: string) => {
    const { data: grid } = useFindUniqueGrid(
        {
            where: {
                id: gridId,
            },
            include: {
                elements: {
                    include: {
                        card: {
                            include: {
                                table: true,
                                footer: {
                                    include: {
                                        button: true,
                                        progress: true,
                                    },
                                },
                            },
                        },
                        tabs: {
                            include: {
                                tabsContent: {
                                    include: {
                                        elements: {
                                            include: {
                                                card: {
                                                    include: {
                                                        table: true,
                                                        footer: {
                                                            include: {
                                                                button: true,
                                                                progress: true,
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
            },
        },
        {
            enabled: !!gridId,
        },
    );
    return grid;
};
