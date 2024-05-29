import { useMemo } from "react";
import { useCreatePanelComponent } from "@lib/hooks";
import { PanelComponentType, Panel } from "@prisma/client";
import { CreateForm } from "components/Form/CreateForm";
import { PanelComponentReportCreateScalarSchema, PanelComponentCounterCreateScalarSchema } from "@zenstackhq/runtime/zod/models";

export function ComponentModal({ type, onClose, panel }: {type: PanelComponentType; onClose: () => void; panel: Panel;}) {
	const create = useCreatePanelComponent();
	const formContent = useMemo(() => {
		switch (type) {
			case "Counter":
			{
				return <CreateForm formSchema={PanelComponentCounterCreateScalarSchema} onSubmitData={async (data) => {
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
				}} onClose={onClose} title={type}/>;
			}
			case "Report":
			{
				return <CreateForm formSchema={PanelComponentReportCreateScalarSchema} onSubmitData={async (data) => {
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
				}} onClose={onClose} title={type}/>;
			}
			default:
				throw "unsupported propertyElementType";
		}
	}, [create, onClose, panel.id, type]);
	return formContent;
}
