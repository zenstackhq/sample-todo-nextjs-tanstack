import { test } from "vitest";
import { render, screen } from "@testing-library/react";
import { createWrapper } from "./create-wrapper";
import { SpaceHomeComponent } from "pages/space/[slug]";

test("Page", () => {
	render(<SpaceHomeComponent space={{
		id: "a",
		createdAt: new Date(),
		name: "mySpace",
		slug: "space",
		updatedAt: new Date(),
		spaceComponents: []
	}}/>, { wrapper: createWrapper() });
	screen.getByText("Create a property");
});
