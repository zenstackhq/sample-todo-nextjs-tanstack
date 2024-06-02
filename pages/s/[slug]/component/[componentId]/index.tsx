import { DashboardDetails } from "@/components/SpaceComponent/Dashboard/DashboardDetails";
import { PropertyDetails } from "@/components/SpaceComponent/Property/PropertyDetails";
import { useCurrentSpaceComponent } from "@/lib/context";
import { ListDetails } from "@/components/SpaceComponent/List/ListDetails";
import { WithNavBar } from "@/components/layout/WithNavBar";
import { Grid } from "@/components/Grid";

export default function SpaceComponentDetails() {
	const spaceComponent = useCurrentSpaceComponent();
	function getComponent() {
		if (!spaceComponent) {
			return <></>;
		}
		switch (spaceComponent.type) {
			case "Dashboard":
				return <DashboardDetails/>;
			case "List":
				return <ListDetails/>;
			case "Property":
				return <PropertyDetails/>;
			default:
				throw "Space component not handled";
		}
	}
	return <WithNavBar>
		<Grid/>
		{getComponent()}
	</WithNavBar>;
}
