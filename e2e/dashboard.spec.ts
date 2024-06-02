import { test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { SpaceComponent } from "@zenstackhq/runtime/models";
import { clickButton, goToSpace, getByLabel } from "./utils";

test("should navigate to the about page", async ({ page }) => {
	async function createDashboard() {
		await clickButton(page, "Create Dashboard");

		const name = faker.lorem.words(3);
		await getByLabel<SpaceComponent>(page, "name").fill(name);
		await page.getByText("Save changes", { exact: true }).click();

		page.getByText("Dashboard created successfully!");
		page.getByText(name);
		return name;
	}

	await goToSpace(page);
	const dashboardTitle = await createDashboard();
	await page.getByText(dashboardTitle).click();
	page.getByText(dashboardTitle);
});
