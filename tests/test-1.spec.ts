import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('a').filter({ hasText: '2' }).click();
  await page.getByRole('link', { name: 'Sauce Labs Backpack' }).click();
  await page.locator('a').filter({ hasText: '2' }).click();
  await page.getByRole('link', { name: 'Sauce Labs Bike Light' }).click();
  await page.locator('a').filter({ hasText: '2' }).click();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').fill('Gustavo');
  await page.locator('[data-test="lastName"]').click();
  await page.locator('[data-test="lastName"]').fill('Caton');
  await page.locator('[data-test="postalCode"]').click();
  await page.locator('[data-test="postalCode"]').fill('2972');
  await page.locator('[data-test="continue"]').click();
  await page.locator('[data-test="finish"]').click();
  await page.getByRole('heading', { name: 'Thank you for your order!' }).click();
  await page.locator('[data-test="back-to-products"]').click();
});