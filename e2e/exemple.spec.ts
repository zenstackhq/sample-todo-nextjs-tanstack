import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { FieldPath, FieldValues } from "react-hook-form";
import { Lease, Property } from "@zenstackhq/runtime/models";

test("should navigate to the about page", async ({ page }) => {

	function getByLabel <T extends FieldValues>(label: FieldPath<T>) {
		return page.getByLabel(label);
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
		await getByLabel<Property>("private").check();
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
		await getByLabel<Lease>("startDate").fill(startDate);
		await getByLabel<Lease>("endDate").fill(endDate);
		await getByLabel<Lease>("rentAmount").fill(rentAmount.toString());
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
