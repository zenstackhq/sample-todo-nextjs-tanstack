import { Page } from '@playwright/test';
import { FieldPath, FieldValues } from 'react-hook-form';
import { beautifyObjectName } from '@/components/ui/auto-form/utils';
import { userDemo } from '@/components/Auth/UserAuthForm';

export async function clickButton(page: Page, name: string) {
    await page.getByRole('button', { name }).click();
}

export function getByLabel<T extends FieldValues>(page: Page, label: FieldPath<T>) {
    return page.getByLabel(beautifyObjectName(label));
}

export async function selectFromCombo<T extends FieldValues>(page: Page, label: FieldPath<T>, type: string) {
    await page.getByTestId(`${beautifyObjectName(label)}-button-combo`).click();
    await page.locator(`span:has-text("${type}")`).click();
}

export async function openSpace(page: Page) {
    await page.getByText(`${userDemo.email}'s space`).click();
}

export async function goToSpace(page: Page) {
    await page.goto('http://localhost:3000/');
    await openSpace(page);
}
