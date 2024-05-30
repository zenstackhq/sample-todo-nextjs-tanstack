import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useCurrentSpace, useCurrentSpaceComponent } from "@/lib/context";
import { PanelComponentRender } from "components/Dashboard/PanelComponentRender";
import { PanelRender } from "components/Dashboard/PanelRender";
import BreadCrumb from "@/components/BreadCrumb";
import { useFindUniqueDashboard, useCreatePanel, useCreatePanelRow, useDeletePanelRow } from "@/lib/hooks";
import WithNavBar from "@/components/WithNavBar";
import UserAvatar from "@/components/Avatar";

export function DashboardDetails() {
	const space = useCurrentSpace();
	const spaceComponent = useCurrentSpaceComponent();

	const { data: dashboard } = useFindUniqueDashboard(
		{
			where: {
				spaceComponentId: spaceComponent?.id
			},
			include: {
				spaceComponent: {
					include: {
						owner: true
					}
				},
				panelRows: {
					include: {
						panels: {
							include: {
								panelComponents: {
									include: {
										report: true,
										counter: true
									}
								}
							}
						}
					}
				}
			}
		},
		{
			enabled: !!spaceComponent?.id
		}
	);

	const createPanel = useCreatePanel();
	const createPanelRow = useCreatePanelRow();
	const deletePanelRow = useDeletePanelRow();

	if (!space || !dashboard) {
		return <></>;
	}
	return <WithNavBar>
		<div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
			<BreadCrumb />
			<div className="container w-full flex flex-col items-center py-12 mx-auto">
				<h1 className="text-2xl font-semibold mb-4">{spaceComponent?.name}</h1>
				<UserAvatar user={dashboard.spaceComponent.owner} size={18} />
				<ul className="flex flex-col space-y-4 py-8 w-11/12 md:w-auto">
					{dashboard.panelRows.map(panelRow =>
						<div key={panelRow.id}>
							{panelRow.title}
							{panelRow.panels.map(panel => <PanelRender key={panel.id} panel={panel}>
								{panel.panelComponents.map(panelComponent =>
									<PanelComponentRender key={panelComponent.id} panelComponent={panelComponent} />
								)}
							</PanelRender>)}
							<PlusIcon className="w-6 h-6 text-gray-500 cursor-pointer" onClick={() => createPanel.mutate({ data: { title: "new panel", panelRowId: panelRow.id } })}/>
							<TrashIcon className="w-6 h-6 text-gray-500 cursor-pointer" onClick={() => deletePanelRow.mutate({ where: { id: panelRow.id } })}/>
						</div>
					)}
					<PlusIcon className="w-6 h-6 text-gray-500 cursor-pointer" onClick={() => createPanelRow.mutate({ data: { title: "new panel row", dashboardId: dashboard.id } })}/>
				</ul>
			</div>
		</div>
	</WithNavBar>;
}

