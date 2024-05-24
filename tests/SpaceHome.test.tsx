import { test } from "vitest";
import { render, screen } from "@testing-library/react";
import { Space } from "@zenstackhq/runtime/models";
import { SpaceHome } from "components/Space/SpaceHome";
import { createWrapper } from "./create-wrapper";

const space: Space = {
	id: "a",
	createdAt: new Date(),
	name: "mySpace",
	slug: "space",
	updatedAt: new Date()
};

test("Page renders with 'Create' buttons", () => {
	render(<SpaceHome space={space} />, { wrapper: createWrapper() });
	screen.getByText("Create a property");
	screen.getByText("Create a list");

});
/*
test("Lists and properties are displayed", () => {

	render(<SpaceHome space={space} />, { wrapper: createWrapper() });

	fireEvent.click(screen.getByText("Create a property"));
	screen.getByText("Property Details");


	fireEvent.change(screen.getByLabelText("Type"), { target: { value: "APARTMENT" } });
	fireEvent.change(screen.getByLabelText("Address"), { target: { value: "456 Elm St" } });
	fireEvent.change(screen.getByLabelText("City"), { target: { value: "Sample City" } });
	fireEvent.change(screen.getByLabelText("Postal Code"), { target: { value: "12345" } });
	fireEvent.change(screen.getByLabelText("Country"), { target: { value: "Sample Country" } });

	debug();
	fireEvent.click(screen.getByText("Create Property"));

	screen.getByText("Sample City");
});
*/
