import { DashboardDetails } from "@/components/SpaceComponent/Dashboard/DashboardDetails";
import { PropertyDetails } from "@/components/SpaceComponent/Property/PropertyDetails";
import { useCurrentSpaceComponent } from "@/lib/context";
import { ListDetails } from "@/components/SpaceComponent/List/ListDetails";
import { WithNavBar } from "@/components/layout/WithNavBar";
import { BreadCrumb } from "@/components/layout/BreadCrumb";

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
		<div className="px-8 py-2">
			<BreadCrumb />
		</div>
		<div className="container w-full flex flex-col items-center py-12 mx-auto">
			{getComponent()}
		</div>
	</WithNavBar>;
}
