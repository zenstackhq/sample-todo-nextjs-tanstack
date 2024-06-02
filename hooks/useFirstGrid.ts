import { useActivatedApplications } from './useActivatedApplications';

export function useFirstGrid() {
    const activatedApplications = useActivatedApplications();
    const firstActivation = activatedApplications?.[0];
    if (firstActivation) {
        const firstFolder = firstActivation.application.folders[0];
        if (firstFolder) {
            const firstTab = firstFolder.tabs[0];
            if (firstTab) {
                const firstSubTab = firstTab.subTabs[0];
                if (firstSubTab && firstSubTab.grids.length) {
                    return firstSubTab.grids[0];
                }
            }
        }
    }
    return null;
}
