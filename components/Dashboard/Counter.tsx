import { useCurrentSpace } from "@lib/context";
import { useAggregateSpaceComponent } from "@lib/hooks";

export const Counter = ({ where }: {where: Parameters<typeof useAggregateSpaceComponent>[0]["where"];}) => {

	const space = useCurrentSpace();
	if (!space) {
		throw "!spaceId";
	}
	const aggregatePanelComponentCounter = useAggregateSpaceComponent(
		{
			where: {
				...where,
				spaceId: space.id
			},
			_count: true
		}
	);

	return <>{aggregatePanelComponentCounter.data?._count}</>;
};
