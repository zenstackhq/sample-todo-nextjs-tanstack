import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { FieldPath, FieldValues } from "react-hook-form";
import { List, Dashboard, Property, Lease } from "@zenstackhq/runtime/models";
import { beautifyObjectName } from "@/components/ui/auto-form/utils";

test("should navigate to the about page", async ({ page }) => {
	function getByLabel <T extends FieldValues>(label: FieldPath<T>) {
		return page.getByLabel(beautifyObjectName(label));
	}

	async function createList() {
		await page.getByText("Create a list").click();

		const title = faker.lorem.words(3);

		await getByLabel<List>("title").fill(title);
		await page.getByText("Submit", { exact: true }).click();

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

	async function createDashboard() {
		await page.getByText("Create a dashboard").click();

		const title = faker.lorem.words(3);

		await getByLabel<Dashboard>("title").fill(title);
		await page.getByText("Submit", { exact: true }).click();

		page.getByText("Dashboard created successfully!");
		page.getByText(title);
		return title;
	}

	async function createProperty() {
		await page.getByText("Create a property").click();

		const address = faker.location.streetAddress();
		const city = faker.location.city();
		const type = "COMMERCIAL";
		const postalCode = faker.location.zipCode();
		const country = faker.location.country();

		await getByLabel<Property>("type").selectOption({ label: type });
		await getByLabel<Property>("address").fill(address);
		await getByLabel<Property>("city").fill(city);
		await getByLabel<Property>("postalCode").fill(postalCode);
		await getByLabel<Property>("country").fill(country);
		await getByLabel("private").check();
		await page.getByText("Submit", { exact: true }).click();

		page.getByText("Property created successfully!");
		page.getByText(address);
		page.getByText(`sType: ${type}`);
		page.getByText(`City: ${city}`);
		page.getByText(`Postal Code: ${postalCode}`);
		return address;
	}


	async function createLease() {
		await page.getByText("Create a lease").click();

		const startDate = "2030-01-01";
		const endDate = "2050-12-31";
		const rentAmount = faker.number.bigInt({ max: 50000 });
		await getByLabel<Lease>("endDate").fill(endDate);
		await getByLabel<Lease>("startDate").fill(startDate);
		await getByLabel<Lease>("rentAmount").fill(rentAmount.toString());
		await page.getByText("Submit", { exact: true }).click();

		page.getByText("Lease created successfully!");
		page.getByText(address);
		page.getByText(`Start Date: ${startDate}`);
		page.getByText(`End Code: ${endDate}`);
		page.getByText(`$${rentAmount}`);
	}


	await page.goto("http://localhost:3000/");
	await page.getByText("Create account").click();
	await expect(page).toHaveURL("http://localhost:3000/signup");

	const email = faker.internet.email();
	const password = faker.internet.password();

	await page.getByLabel("Your email").fill(email);
	await page.getByLabel("Your password").fill(password);

	await page.getByLabel("I accept the Terms and Conditions").check();

	await page.getByText("Create account").click();
	const defaultSpaceName = `${email}'s space`;
	await page.getByText(defaultSpaceName).click();
	await createProperty();
	await createProperty();
	const address = await createProperty();

	await page.getByText(address).click();
	await createLease();
	await createLease();
	await createLease();
	await page.getByText(defaultSpaceName).click();


	await createList();
	await createList();
	const listTitle = await createList();
	await page.getByText(listTitle).click();
	await createTodo();
	await createTodo();

	await page.getByText(defaultSpaceName).click();

	const dashboardTitle = await createDashboard();
	await page.getByText(dashboardTitle).click();
	page.getByText(dashboardTitle);
});

