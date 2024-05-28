import { TrashIcon } from "@heroicons/react/24/outline";
import { Counter } from "./Counter";
import { useDeletePanelComponent } from "@lib/hooks";
import { PanelComponent, PanelComponentCounter, PanelComponentReport } from "@zenstackhq/runtime/models";

export const PanelComponentRender = ({ panelComponent }: {
	panelComponent: PanelComponent & {
		panelComponentCounter?: PanelComponentCounter | null;
		panelComponenentReport?: PanelComponentReport | null;
	};
}) => {
	const deletePanelComponent = useDeletePanelComponent();
	console.log(panelComponent);
	return <div key={panelComponent.id} className="flex justify-between w-full mb-4">
		<div className="border rounded-lg px-8 py-4 shadow-lg flex flex-col items-center">
			<h2>{panelComponent.title}</h2>
			<h2>{panelComponent.type}</h2>
			<h2>{JSON.stringify(panelComponent.panelComponentCounter)}</h2>
			<h2>{JSON.stringify(panelComponent.panelComponenentReport)}</h2>
			{panelComponent.panelComponenentReport && <div>AAAAA</div>}
			{panelComponent.panelComponentCounter && <Counter counter={panelComponent.panelComponentCounter}/>}
			<TrashIcon className="w-6 h-6 text-gray-500 cursor-pointer" onClick={() => deletePanelComponent.mutate({ where: { id: panelComponent.id } })}/>
		</div>
	</div>;

};
