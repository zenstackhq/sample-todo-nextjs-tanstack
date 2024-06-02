import { useActivatedApplications } from "./useActivatedApplications";
import { getGridUrl } from "@/lib/urls";
export interface NavItem {
	title: string;
	href: string;
}

export function useNavItems(): NavItem[] {
 
	const applications = useActivatedApplications();

	if (!applications) {
		return [];
	}
	return applications.flatMap(application => application.application.folders.flatMap(folder => folder.tabs.flatMap(tab => tab.subTabs.flatMap(subTab => {
		return subTab.grids.map(grid => ({
			title: application.application.slug,
			href: getGridUrl(grid.id)
		}));
	}))));
}

