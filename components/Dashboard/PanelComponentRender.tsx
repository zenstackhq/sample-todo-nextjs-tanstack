import { PanelComponent } from "@zenstackhq/runtime/models";

export const PanelComponentRender = ({ panelComponent }: {panelComponent: PanelComponent;}) => {
	return <div key={panelComponent.id} className="flex justify-between w-full mb-4">
		<div className="border rounded-lg px-8 py-4 shadow-lg flex flex-col items-center">
			<h2>{panelComponent.title}</h2>
			{panelComponent.type}
		</div>
	</div>;

};
