import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test("should navigate to the about page", async ({ page }) => {
	await page.goto("http://localhost:3000/");
	await page.click("text=Create account");
	await expect(page).toHaveURL("http://localhost:3000/signup");

	const email = faker.internet.email();
	const password = faker.internet.password();


	await page.fill("#email", email);
	await page.fill("#password", password);

	// Check the 'I accept conditions' checkbox
	await page.check("input[name=\"remember\"]");

	await page.click("text=Create account");

});
