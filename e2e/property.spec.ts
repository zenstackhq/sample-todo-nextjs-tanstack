import { test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { clickButton, createAccount, getByLabel } from "./utils";
import { Lease, Property, SpaceComponent } from "@zenstackhq/runtime/models";

test("Should create property", async ({ page }) => {
	async function createProperty() {
		await clickButton(page, "Create Property");

		const address = faker.location.streetAddress();
		const city = faker.location.city();
		const type = "COMMERCIAL";
		const postalCode = faker.location.zipCode();
		const country = faker.location.country();
		const name = faker.lorem.words(3);

		await page.locator("button[role=\"combobox\"]").click();
		await page.locator(`span:has-text("${type}")`).click();
		await getByLabel<Property>(page, "address").fill(address);
		await getByLabel<Property>(page, "city").fill(city);
		await getByLabel<Property>(page, "postalCode").fill(postalCode);
		await getByLabel<Property>(page, "country").fill(country);
		await getByLabel<SpaceComponent>(page, "name").fill(name);
		await getByLabel(page, "private").check();
		await page.getByText("Save changes", { exact: true }).click();

		page.getByText("Property created successfully!");
		page.getByText(address);
		page.getByText(`Type: ${type}`);
		page.getByText(`City: ${city}`);
		page.getByText(`Postal Code: ${postalCode}`);
		return address;
	}

	async function createLease(address: string) {
		await clickButton(page, "Create Lease");

		const startDate = "2030-01-01";
		const endDate = "2050-12-31";
		const rentAmount = faker.number.bigInt({ max: 50000 });
		await getByLabel<Lease>(page, "endDate").fill(endDate);
		await getByLabel<Lease>(page, "startDate").fill(startDate);
		await getByLabel<Lease>(page, "rentAmount").fill(rentAmount.toString());
		await page.getByText("Save changes", { exact: true }).click();

		page.getByText("Lease created successfully!");
		page.getByText(address);
		page.getByText(`Start Date: ${startDate}`);
		page.getByText(`End Date: ${endDate}`);
		page.getByText(`$${rentAmount}`);
	}


	await createAccount(page);
	await createProperty();
	await createProperty();
	const address = await createProperty();

	await page.getByText(address).click();
	await createLease(address);
	await createLease(address);
	await createLease(address);
});
