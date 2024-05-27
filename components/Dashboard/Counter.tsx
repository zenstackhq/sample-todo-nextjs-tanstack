import { PanelComponentCounter } from "@prisma/client";
import React from "react";

export const Counter = ({ panelComponentCounter }: {panelComponentCounter: PanelComponentCounter;}) => {
	return <>{panelComponentCounter.id.toString()}</>;
};
