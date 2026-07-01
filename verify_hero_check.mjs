import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage({ viewport: { width: 1400, height: 900 } });
  
  try {
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    
    const heroSwiperElem = await page.locator('.hero-swiper');
    const backgroundStyle = await heroSwiperElem.locator('.swiper-slide').first().evaluate(el => window.getComputedStyle(el).backgroundImage);
    console.log('Background image:', backgroundStyle);
    
    await page.waitForTimeout(1000);
    await page.screenshot({ path: './hero_banner_check.png' });
    console.log('Screenshot saved');
  } catch (e) {
    console.error('Error:', e.message);
  } finally {
    await browser.close();
  }
})();
