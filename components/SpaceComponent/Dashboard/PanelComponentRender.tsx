import { TrashIcon } from "@heroicons/react/24/outline";
import { Counter } from "./Counter";
import { Report } from "./Report";
import { useDeletePanelComponent } from "@/zmodel/lib/hooks";
import { PanelComponent, PanelComponentCounter, PanelComponentReport } from "@zenstackhq/runtime/models";

export const PanelComponentRender = ({ panelComponent }: {
	panelComponent: PanelComponent & {
		counter: PanelComponentCounter | null;
		report: PanelComponentReport | null;
	};
}) => {
	const deletePanelComponent = useDeletePanelComponent();
	return <div key={panelComponent.id} className="mb-4 flex w-full justify-between">
		<div className="flex flex-col items-center rounded-lg border px-8 py-4 shadow-lg">
			<h2>{panelComponent.title}</h2>
			<h2>{panelComponent.type}</h2>
			{panelComponent.report && <Report report={panelComponent.report}/>}
			{panelComponent.counter && <Counter counter={panelComponent.counter}/>}
			<TrashIcon className="size-6 cursor-pointer text-gray-500" onClick={() => deletePanelComponent.mutate({ where: { id: panelComponent.id } })}/>
		</div>
	</div>;

};
