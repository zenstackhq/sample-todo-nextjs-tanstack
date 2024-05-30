import { DashboardDetails } from "@/components/Dashboard/DashboardDetails";
import ListDetails from "@/components/List/ListDetails";
import PropertyDetails from "@/components/Property/PropertyDetails";
import { useCurrentSpaceComponent } from "@/lib/context";

export default function SpaceComponentDetails() {

	const spaceComponent = useCurrentSpaceComponent();
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
			return <div>Space component not handled</div>;
	}
}
