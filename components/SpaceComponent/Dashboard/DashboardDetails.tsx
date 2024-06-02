import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useCurrentSpace, useCurrentSpaceComponent } from '@/lib/context';
import { PanelComponentRender } from '@/components/SpaceComponent/Dashboard/PanelComponentRender';
import { PanelRender } from '@/components/SpaceComponent/Dashboard/PanelRender';
import { useFindUniqueDashboard, useCreatePanel, useCreatePanelRow, useDeletePanelRow } from '@/zmodel/lib/hooks';
import { UserAvatar } from '@/components/UserAvatar';

export function DashboardDetails() {
    const space = useCurrentSpace();
    const spaceComponent = useCurrentSpaceComponent();

    const { data: dashboard } = useFindUniqueDashboard(
        {
            where: {
                spaceComponentId: spaceComponent?.id,
            },
            include: {
                owner: true,
                panelRows: {
                    include: {
                        panels: {
                            include: {
                                panelComponents: {
                                    include: {
                                        report: true,
                                        counter: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        {
            enabled: !!spaceComponent?.id,
        },
    );

    const createPanel = useCreatePanel();
    const createPanelRow = useCreatePanelRow();
    const deletePanelRow = useDeletePanelRow();

    if (!space || !dashboard) {
        return <></>;
    }
    return (
        <>
            <h1 className="mb-4 text-2xl font-semibold">{spaceComponent?.name}</h1>
            <UserAvatar user={dashboard.owner} size={18} />
            <ul className="flex w-11/12 flex-col space-y-4 py-8 md:w-auto">
                {dashboard.panelRows.map((panelRow) => (
                    <div key={panelRow.id}>
                        {panelRow.title}
                        {panelRow.panels.map((panel) => (
                            <PanelRender key={panel.id} panel={panel}>
                                {panel.panelComponents.map((panelComponent) => (
                                    <PanelComponentRender key={panelComponent.id} panelComponent={panelComponent} />
                                ))}
                            </PanelRender>
                        ))}
                        <PlusIcon
                            className="size-6 cursor-pointer text-gray-500"
                            onClick={() =>
                                createPanel.mutate({ data: { title: 'new panel', panelRowId: panelRow.id } })
                            }
                        />
                        <TrashIcon
                            className="size-6 cursor-pointer text-gray-500"
                            onClick={() => deletePanelRow.mutate({ where: { id: panelRow.id } })}
                        />
                    </div>
                ))}
                <PlusIcon
                    className="size-6 cursor-pointer text-gray-500"
                    onClick={() =>
                        createPanelRow.mutate({ data: { title: 'new panel row', dashboardId: dashboard.id } })
                    }
                />
            </ul>
        </>
    );
}
