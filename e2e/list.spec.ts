import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { List } from "@zenstackhq/runtime/models";
import { clickButton, createAccount, getByLabel } from "./utils";

test("should create List", async ({ page }) => {

	async function createList() {
		await clickButton(page, "Create List");
		const title = faker.lorem.words(3);
		await getByLabel<List>(page, "title").fill(title);
		await page.getByText("Save changes", { exact: true }).click();
		page.getByText("List created successfully!");
		page.getByText(title);
		return title;
	}


	async function createTodo() {
		const title = faker.lorem.words(5);

		await page.getByPlaceholder("Type a title and press enter").fill(title);
		await page.keyboard.down("Enter");

		page.getByText(title);
	}

	await createAccount(page);


	await createList();
	await createList();
	const listTitle = await createList();
	await page.getByText(listTitle).click();
	await createTodo();
	await createTodo();

});
