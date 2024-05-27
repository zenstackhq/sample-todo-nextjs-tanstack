import { TrashIcon } from "@heroicons/react/24/outline";
import { useDeletePanel } from "@lib/hooks";
import { Panel } from "@zenstackhq/runtime/models";
import { ReactNode } from "react";

export const PanelRender = ({ panel, children }: {panel: Panel; children: ReactNode;}) => {
	const deletePanel = useDeletePanel();

	return <div className="border rounded-lg px-8 py-4 shadow-lg flex flex-col items-center w-full lg:w-[480px]">
		<div className="flex justify-between w-full mb-4">
			<h3
				className={"text-xl line-clamp-1 flex items-center"}
			>
				{panel.title}
			</h3>
			<div className="flex">
				<TrashIcon className="w-6 h-6 text-gray-500 cursor-pointer" onClick={
					() => deletePanel.mutate({ where: { id: panel.id } })
				}
				/>
			</div>
		</div>
		<div className="flex justify-end w-full space-x-2">
			{children}
		</div>
	</div>;

};