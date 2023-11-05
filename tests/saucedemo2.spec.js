import { test, expect } from '@playwright/test';

test('purchase 2 items and validate order details', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.locator('input[placeholder="Username"]').fill('standard_user');
    await page.locator('input[placeholder="Password"]').fill('secret_sauce');
    await page.locator('input[type="submit"]').click();

    //await page.waitForSelector('.inventory_item', { state: 'visible' });

    const items = await page.locator('#inventory_container .inventory_item').all()
    const itemsToPurchase = 2;

    // Comprar 2 artículos
    for (let i = 0; i < itemsToPurchase; i++) {
        const randomIndex = Math.floor(Math.random() * items.length);
        const randomItem = items[randomIndex];

        const expectedName = await randomItem.locator('.inventory_item_name ').innerText();
        const expectedPrice = await randomItem.locator('.inventory_item_price').innerText();

        console.log(`Item ${i + 1}: Name: ${expectedName}, Price: ${expectedPrice}`);
        await randomItem.locator('button').click();
    }

    // Ir al carrito de compras
    await page.locator('a.shopping_cart_link').click();
    await page.locator('#cart_contents_container .cart_contents_container').waitForCount(itemsToPurchase);

    // Validar nombres de los artículos en el carrito
    const cartItemNames = await page.locator('.cart_contents_container .inventory_item_name').all()
    for (let i = 0; i < itemsToPurchase; i++) {
        expect(cartItemNames[i]).toEqual(await items[i].locator('.inventory_item_name').innerText());
    }

    // Validar precio total
    const cartItemPrices = await page.locator('.cart_item .inventory_item_price').innerTexts();
    let totalPrice = 0;
    for (let i = 0; i < itemsToPurchase; i++) {
        totalPrice += parseFloat(cartItemPrices[i].replace('$', ''));
    }
    const cartTotalPrice = await page.locator('.summary_total_label').innerText();
    expect(parseFloat(cartTotalPrice.replace('Total: $', ''))).toEqual(totalPrice);

    // Hacer checkout y validar el mensaje "Thank you for your order!"
    await page.locator('.checkout_button').click();
    await page.locator('input[name="firstName"]').fill('John');
    await page.locator('input[name="lastName"]').fill('Doe');
    await page.locator('input[name="postalCode"]').fill('12345');
    await page.locator('.cart_button').click();

    await page.waitForSelector('.complete-header', { state: 'visible' });
    const orderConfirmationMessage = await page.locator('.complete-header').innerText();
    expect(orderConfirmationMessage).toEqual('THANK YOU FOR YOUR ORDER!');
});
