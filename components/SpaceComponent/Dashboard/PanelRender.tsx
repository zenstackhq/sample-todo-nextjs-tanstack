import { TrashIcon } from "@heroicons/react/24/outline";
import { useCreatePanelComponent, useDeletePanel } from "@/zmodel/lib/hooks";
import { Panel } from "@zenstackhq/runtime/models";
import { ReactNode } from "react";
import { CreateForm } from "../../Form/CreateForm";
import { PanelComponentCounterCreateScalarSchema, PanelComponentReportCreateScalarSchema } from "@zenstackhq/runtime/zod/models";

export const PanelRender = ({ panel, children }: {panel: Panel; children: ReactNode;}) => {
	const deletePanel = useDeletePanel();

	const create = useCreatePanelComponent();

	return <div className="flex w-full flex-col items-center rounded-lg border px-8 py-4 shadow-lg lg:w-[480px]">
		<div className="mb-4 flex w-full justify-between">
			<h3
				className={"line-clamp-1 flex items-center text-xl"}
			>
				{panel.title}
			</h3>
			<div className="flex">
				<CreateForm formSchema={PanelComponentCounterCreateScalarSchema} onSubmitData={async (data) => {
					await create.mutateAsync({
						data: {
							title: "New counCounterter",
							panelId: panel.id,
							type: "Counter",
							counter: {
								create: {
									...data
								}
							}

						}
					});
				}} title={"Create Counter"}/>
				<CreateForm formSchema={PanelComponentReportCreateScalarSchema} onSubmitData={async (data) => {
					await create.mutateAsync({
						data: {
							title: "New Report",
							panelId: panel.id,
							type: "Report",
							report: {
								create: {
									...data
								}
							}

						}
					});
				}} title={"Create Report"}/>
				<TrashIcon className="size-6 cursor-pointer text-gray-500" onClick={() => deletePanel.mutate({ where: { id: panel.id } })}/>
			</div>
		</div>
		<div className="flex w-full justify-end space-x-2">
			{children}
		</div>
	</div>;

};
