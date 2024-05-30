import { Page, expect } from "@playwright/test";
import { FieldPath, FieldValues } from "react-hook-form";
import { beautifyObjectName } from "@/components/ui/auto-form/utils";
import { faker } from "@faker-js/faker";

export async function clickButton(page: Page, name: string) {
	await page.getByRole("button", { name }).click();
}

export function getByLabel<T extends FieldValues>(page: Page, label: FieldPath<T>) {
	return page.getByLabel(beautifyObjectName(label));
}

export async function createAccount(page: Page) {
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
}
