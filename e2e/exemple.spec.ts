import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test("should navigate to the about page", async ({ page }) => {

	async function createProperty() {
		await page.getByText("Create a property").click();

		const address = faker.location.streetAddress();
		const city = faker.location.city();
		const type = "COMMERCIAL";
		const postalCode = faker.location.zipCode();
		const country = faker.location.country();
		await page.getByLabel("Type").selectOption({ label: type });
		await page.getByLabel("Address").fill(address);
		await page.getByLabel("City").fill(city);
		await page.getByLabel("Postal Code").fill(postalCode);
		await page.getByLabel("Country").fill(country);
		await page.getByLabel("Private").check();
		await page.getByText("Create", { exact: true }).click();

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
		const rentAmount = faker.number.bigInt();
		await page.getByLabel("Start Date").fill(startDate);
		await page.getByLabel("End Date").fill(endDate);
		await page.getByLabel("Rent amount").fill(rentAmount.toString());
		await page.getByText("Create", { exact: true }).click();

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
	await page.getByText(`${email}'s space`).click();
	await createProperty();
	await createProperty();
	const address = await createProperty();

	await page.getByText(address).click();
	await createLease();
	await createLease();
	await createLease();
});
