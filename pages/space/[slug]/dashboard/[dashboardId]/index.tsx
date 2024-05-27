import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useCurrentSpace } from "@lib/context";
import { useCreatePanel, useCreatePanelRow, useDeletePanelRow, useFindUniqueDashboard } from "@lib/hooks";
import Avatar from "components/Avatar";
import BreadCrumb from "components/BreadCrumb";
import { PanelComponentRender } from "components/Dashboard/PanelComponentRender";
import { PanelRender } from "components/Dashboard/PanelRender";
import WithNavBar from "components/WithNavBar";
import { useRouter } from "next/router";

export default function DashboardDetails() {
	const space = useCurrentSpace();
	const router = useRouter();
	const { data: dashboard } = useFindUniqueDashboard(
		{
			where: {
				id: router.query.dashboardId as string
			},
			include: {
				owner: true,
				panelRows: {
					include: {
						panels: {
							include: {
								panelComponents: true
							}
						}
					}
				}
			}
		},
		{
			enabled: !!router.query.slug
		}
	);

	const createPanel = useCreatePanel();
	const createPanelRow = useCreatePanelRow();
	const deletePanelRow = useDeletePanelRow();

	if (!space || !dashboard) {
		return <></>;
	}
	return (
		<WithNavBar>
			<div className="px-8 py-2">
				<BreadCrumb dashboard={dashboard} />
			</div>
			<div className="container w-full flex flex-col items-center py-12 mx-auto">
				<h1 className="text-2xl font-semibold mb-4">{dashboard?.title}</h1>
				<Avatar user={dashboard.owner} size={18} />
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
		</WithNavBar>
	);
}

