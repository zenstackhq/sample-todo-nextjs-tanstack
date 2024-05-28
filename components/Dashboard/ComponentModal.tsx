import { useMemo } from "react";
import { useCreatePanelComponent } from "@lib/hooks";
import { PanelComponentType, PanelComponentReportType, PanelComponentCounterType, SpaceComponentType, Panel } from "@prisma/client";
import { CreateForm } from "components/Form/CreateForm";

export function ComponentModal({ type, onClose, panel }: {type: PanelComponentType; onClose: () => void; panel: Panel;}) {
	const create = useCreatePanelComponent();
	const formContent = useMemo(() => {
		switch (type) {
			case "Counter":
			{
				return <CreateForm fields={[
					{
						id: "spaceComponentType",
						type: "select",
						values: SpaceComponentType
					},
					{
						id: "type",
						type: "select",
						values: PanelComponentCounterType
					}
				]} onSubmitData={async ({ data }) => {
					await create.mutateAsync({
						data: {
							title: "New counter",
							panelId: panel.id,
							type,
							counter: {
								create: {
									...data
								}
							}

						}
					});
				}} onClose={onClose} showPrivate={false} title={type}/>;
			}
			case "Report":
			{
				return <CreateForm fields={[
					{
						id: "spaceComponentType",
						type: "select",
						values: SpaceComponentType
					},
					{
						id: "type",
						type: "select",
						values: PanelComponentReportType
					}
				]} onSubmitData={async ({ data }) => {
					await create.mutateAsync({
						data: {
							title: "New report",
							panelId: panel.id,
							type: "Report",
							report: {
								create: {
									...data
								}
							}

						}
					});
				}} onClose={onClose} showPrivate={false} title={type}/>;
			}
			default:
				throw "unsupported propertyElementType";
		}
	}, [create, onClose, panel.id, type]);
	return formContent;
}
