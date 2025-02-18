import { test, expect } from '@playwright/test';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('navigate wiki and check', async ({ page }) => {
  await page.goto('https://www.wikipedia.org/');

  await page.locator("id=js-link-box-uk").click();
  
  await expect(page).toHaveTitle(/Вікіпедія/);
});


test('validate string contains current date', async ({ page }) => {
  await page.goto('https://www.wikipedia.org/');

  await page.locator("id=js-link-box-uk").click();

  let dateString = await page.locator("#main-head-right > p:first-of-type").innerText();
  dateString = dateString.replace(/\u00A0/g, " ");

  const currentDate = new Date();

  const formattedDate = format(currentDate, 'eeee, d MMMM yyyy року', { locale: uk });
  
  console.log(formattedDate);

  expect(dateString).toEqual(formattedDate);
});