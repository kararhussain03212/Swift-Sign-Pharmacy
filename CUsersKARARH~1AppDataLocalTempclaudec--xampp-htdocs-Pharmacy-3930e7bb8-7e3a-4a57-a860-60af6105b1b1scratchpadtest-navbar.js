const { chromium } = require('playwright');

async function testNavbar() {
  const browser = await chromium.launch();
  
  const viewports = [
    { width: 375, height: 667, name: 'mobile' },
    { width: 768, height: 1024, name: 'tablet' },
    { width: 1440, height: 900, name: 'desktop' }
  ];

  for (const viewport of viewports) {
    const context = await browser.createContext({ viewport });
    const page = await context.newPage();
    await page.goto('http://localhost:5177', { waitUntil: 'networkidle' });
    
    // Take screenshot of the navbar
    const navbar = await page.locator('nav, [class*="nav"]').first();
    if (await navbar.isVisible()) {
      await page.screenshot({ 
        path: `navbar-${viewport.name}.png`,
        fullPage: false
      });
      console.log(`✅ Screenshot captured for ${viewport.name} (${viewport.width}x${viewport.height})`);
    }
    
    await context.close();
  }
  
  await browser.close();
  console.log('Testing complete!');
}

testNavbar().catch(console.error);
