import { useMemo } from "react";
import { useCreatePanelComponent } from "@lib/hooks";
import { PanelComponentCounter, PanelComponentType, SpaceComponentType, Panel } from "@prisma/client";
import { CreateForm } from "components/Form/CreateForm";
import { PanelComponentReport } from "@zenstackhq/runtime/models";


export function ComponentModal({ type, onClose, panel }: {type: PanelComponentType; onClose: () => void; panel: Panel;}) {
	const create = useCreatePanelComponent();
	const formContent = useMemo(() => {
		switch (type) {
			case "Counter":
			{
				return <CreateForm<PanelComponentCounter> fields={[
					{
						id: "spaceComponentType",
						type: "select",
						values: SpaceComponentType
					}
				]} onSubmitData={async ({ data }) => {
					await create.mutateAsync({
						data: {
							title: "New counter",
							panelId: panel.id,
							type,
							panelComponentCounter: {
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
				return <CreateForm<PanelComponentReport> fields={[
					{
						id: "spaceComponentType",
						type: "select",
						values: SpaceComponentType
					}
				]} onSubmitData={async ({ data }) => {
					await create.mutateAsync({
						data: {
							title: "New report",
							panelId: panel.id,
							type,
							panelComponentReport: {
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
	}, [onClose]);
	return formContent;
}
