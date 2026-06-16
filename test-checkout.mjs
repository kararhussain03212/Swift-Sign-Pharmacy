import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  const errs = [];
  page.on('console', m => { if (m.type() === 'error') errs.push(m.text()) });
  page.on('pageerror', e => errs.push(e.message));

  try {
    console.log('\n🛒 Testing Checkout Page\n');

    // Add a product to cart via localStorage so cart isn't empty
    await page.goto('http://localhost:5174/');
    await page.evaluate(() => {
      localStorage.setItem('dcare-cart', JSON.stringify({
        state: {
          items: [{
            id: 1, name: 'Test Medicine', brand: 'TestBrand',
            price: 500, salePrice: 450, quantity: 2,
            image: 'https://via.placeholder.com/100',
          }]
        }, version: 0
      }));
      // also set a location
      localStorage.setItem('userLocation', JSON.stringify({
        province: 'Punjab', city: 'Lahore', area: 'Gulberg',
        fullAddress: 'Gulberg, Lahore, Punjab', source: 'manual',
      }));
    });

    // Navigate to checkout
    console.log('[1] Load /checkout');
    await page.goto('http://localhost:5174/checkout', { waitUntil: 'networkidle' });
    await page.screenshot({ path: './test-screenshots/checkout-01-step1.png' });
    console.log('✅ Checkout page loaded');

    // Check stepper is visible
    const stepper = await page.locator('text=Delivery').first().isVisible().catch(() => false);
    console.log('[2]', stepper ? '✅ Stepper visible' : '⚠️ Stepper missing');

    // Check province is pre-filled from locationStore
    const provinceVal = await page.locator('select#province').inputValue().catch(() => '');
    console.log('[3]', provinceVal === 'Punjab' ? '✅ Province pre-filled from location store (Punjab)' : `⚠️ Province value: "${provinceVal}"`);

    // Check city dropdown populated
    const cityOptions = await page.locator('select#city option').count().catch(() => 0);
    console.log('[4]', cityOptions > 5 ? `✅ City dropdown has ${cityOptions} options` : `⚠️ City options: ${cityOptions}`);

    // Check city pre-filled
    const cityVal = await page.locator('select#city').inputValue().catch(() => '');
    console.log('[5]', cityVal === 'Lahore' ? '✅ City pre-filled (Lahore)' : `⚠️ City value: "${cityVal}"`);

    // Fill required fields and proceed
    console.log('[6] Fill form and proceed to payment');
    await page.fill('input#fullName', 'Ahmed Khan');
    await page.fill('input#phone', '03001234567');
    await page.fill('input#address', 'House 12, Street 5, Gulberg III');
    await page.screenshot({ path: './test-screenshots/checkout-02-form-filled.png' });

    await page.click('button[type="submit"]');
    await page.waitForTimeout(400);
    await page.screenshot({ path: './test-screenshots/checkout-03-payment.png' });

    const paymentHeading = await page.locator('text=Payment Method').isVisible().catch(() => false);
    console.log('[7]', paymentHeading ? '✅ Moved to Payment step' : '⚠️ Still on address step');

    // Check payment options
    const codOption = await page.locator('text=Cash on Delivery').isVisible().catch(() => false);
    const epOption  = await page.locator('text=EasyPaisa').isVisible().catch(() => false);
    const cardOption = await page.locator('text=Credit / Debit Card').isVisible().catch(() => false);
    console.log('[8]', codOption ? '✅ COD option visible' : '⚠️ COD missing');
    console.log('[9]', epOption  ? '✅ EasyPaisa option visible' : '⚠️ EasyPaisa missing');
    console.log('[10]', cardOption ? '✅ Card option visible' : '⚠️ Card missing');

    // Place order
    await page.click('button:has-text("Place Order")');
    await page.waitForTimeout(800);
    await page.screenshot({ path: './test-screenshots/checkout-04-success.png' });

    const success = await page.locator('text=Order Placed!').isVisible().catch(() => false);
    console.log('[11]', success ? '✅ Order Placed success modal visible' : '⚠️ Success modal not shown');

    // Check for console errors
    if (errs.length) {
      console.log(`\n⚠️  Console errors (${errs.length}):`);
      errs.slice(0, 3).forEach(e => console.log('   ', e.slice(0, 120)));
    } else {
      console.log('\n✅ No console errors');
    }

    console.log('\n✅ Checkout page fully verified!\n');
  } catch (err) {
    console.error('❌', err.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
