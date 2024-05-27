import { PanelComponentReport } from "@prisma/client";
import React from "react";

export const Report = ({ panelComponentReport }: {panelComponentReport: PanelComponentReport;}) => {
	return <>{panelComponentReport.id.toString()}</>;
};
