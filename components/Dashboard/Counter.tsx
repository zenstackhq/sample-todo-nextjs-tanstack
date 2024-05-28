import { useCurrentSpace } from "@lib/context";
import { useAggregateSpaceComponent } from "@lib/hooks";
import { PanelComponentCounter } from "@zenstackhq/runtime/models";

export const Counter = ({ counter }: {counter: PanelComponentCounter;}) => {

	const space = useCurrentSpace();
	if (!space) {
		throw "!spaceId";
	}
	const aggregatePanelComponentCounter = useAggregateSpaceComponent(
		{
			where: {
				type: counter.spaceComponentType,
				spaceId: space.id
			},
			_count: true
		}
	);

	return <>{aggregatePanelComponentCounter.data?._count}</>;
};
