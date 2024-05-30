import { useCurrentSpace } from "@/lib/context";
import { useAggregateSpaceComponent } from "@/lib/hooks";
import { PanelComponentReport } from "@zenstackhq/runtime/models";

export const Report = ({ report }: {report: PanelComponentReport;}) => {

	const space = useCurrentSpace();
	if (!space) {
		throw "!spaceId";
	}
	const aggregation = useAggregateSpaceComponent(
		{
			where: {
				type: report.spaceComponentType,
				spaceId: space.id
			},
			_count: true
		}
	);

	return <>{aggregation.data?._count}</>;
};
