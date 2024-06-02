import { test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { SpaceComponent } from "@zenstackhq/runtime/models";
import { clickButton, goToSpace, getByLabel } from "./utils";

test("should create List", async ({ page }) => {

	async function createList() {
		await clickButton(page, "Create List");
		const name = faker.lorem.words(3);
		await getByLabel<SpaceComponent>(page, "name").fill(name);
		await page.getByText("Save changes", { exact: true }).click();
		page.getByText("List created successfully!");
		page.getByText(name);
		return name;
	}


	async function createTodo() {
		const title = faker.lorem.words(5);

		await page.getByPlaceholder("Type a title and press enter").fill(title);
		await page.keyboard.down("Enter");

		page.getByText(title);
	}

	await goToSpace(page);


	await createList();
	await createList();
	const listTitle = await createList();
	await page.getByText(listTitle).click();
	await createTodo();
	await createTodo();

});
