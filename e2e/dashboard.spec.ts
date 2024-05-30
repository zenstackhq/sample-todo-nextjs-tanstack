import { test, expect, Page } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { Dashboard } from "@zenstackhq/runtime/models";
import { clickButton, createAccount, getByLabel } from "./utils";

test("should navigate to the about page", async ({ page }) => {
	async function createDashboard() {
		await clickButton(page, "Create Dashboard");

		const title = faker.lorem.words(3);

		await getByLabel<Dashboard>(page, "title").fill(title);
		await page.getByText("Save changes", { exact: true }).click();

		page.getByText("Dashboard created successfully!");
		page.getByText(title);
		return title;
	}

	await createAccount(page);
	const dashboardTitle = await createDashboard();
	await page.getByText(dashboardTitle).click();
	page.getByText(dashboardTitle);
});
