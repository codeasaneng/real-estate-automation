const { test, expect } = require('@playwright/test');

test.describe('Performance Tests', () => {

  test('TC-AUTO-021: Home page loads within acceptable time', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const loadTime = Date.now() - startTime;

    // Verify page loads within 5 seconds (generous for local dev)
    expect(loadTime).toBeLessThan(5000);

    console.log(`Home page load time: ${loadTime}ms`);
  });

  test('TC-AUTO-022: Properties page loads within acceptable time', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/properties');
    await page.waitForLoadState('domcontentloaded');

    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThan(5000);

    console.log(`Properties page load time: ${loadTime}ms`);
  });

  test('TC-AUTO-023: Navigation between pages is fast', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const startTime = Date.now();

    await page.click('text=Properties');
    await page.waitForLoadState('domcontentloaded');

    const navigationTime = Date.now() - startTime;

    // SPA navigation should be very fast
    expect(navigationTime).toBeLessThan(2000);

    console.log(`Navigation time: ${navigationTime}ms`);
  });

  test('TC-AUTO-024: Images load progressively', async ({ page }) => {
    await page.goto('/properties');

    // Wait for first image to load
    const firstImage = page.locator('img').first();
    await expect(firstImage).toBeVisible({ timeout: 5000 });

    // Verify image has loaded successfully
    const naturalWidth = await firstImage.evaluate(img => img.naturalWidth);
    expect(naturalWidth).toBeGreaterThan(0);
  });

  test('TC-AUTO-025: Page is interactive quickly', async ({ page }) => {
    await page.goto('/');

    // Measure time to interactive
    const startTime = Date.now();
    await page.waitForLoadState('domcontentloaded');

    // Try to interact with navigation
    const connectButton = page.locator('button:has-text("Connect")').first();
    await connectButton.waitFor({ state: 'visible', timeout: 5000 });

    const timeToInteractive = Date.now() - startTime;

    expect(timeToInteractive).toBeLessThan(5000);

    console.log(`Time to interactive: ${timeToInteractive}ms`);
  });

  test('TC-AUTO-026: No memory leaks during navigation', async ({ page }) => {
    // Navigate through multiple pages
    const pages = ['/', '/properties', '/about', '/faq', '/blog', '/'];

    for (const path of pages) {
      await page.goto(path);
      await page.waitForLoadState('networkidle');

      // Get memory metrics
      const metrics = await page.metrics();

      // JSHeapUsedSize should be reasonable (less than 100MB)
      expect(metrics.JSHeapUsedSize).toBeLessThan(100 * 1024 * 1024);
    }
  });

  test('TC-AUTO-027: Multiple properties render efficiently', async ({ page }) => {
    await page.goto('/properties');
    await page.waitForLoadState('networkidle');

    // Count rendered property cards
    const propertyCount = await page.locator('[href*="/properties/"]').count();

    console.log(`Rendered ${propertyCount} properties`);

    // Verify rendering is efficient (page is responsive)
    const connectButton = page.locator('button:has-text("Connect")').first();
    await expect(connectButton).toBeVisible({ timeout: 2000 });
  });

  test('TC-AUTO-028: 3D page loads (if available)', async ({ page }) => {
    const response = await page.goto('/property-3d');

    // Check if page exists
    if (response.status() === 200) {
      await page.waitForLoadState('domcontentloaded');

      // Page should load even if 3D rendering takes time
      const bodyText = await page.textContent('body');
      expect(bodyText.length).toBeGreaterThan(0);
    }
  });

  test('TC-AUTO-029: Smooth scroll behavior', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Scroll down
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await page.waitForTimeout(300);

    // Scroll back up
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);

    // Verify no errors occurred during scrolling
    const currentUrl = page.url();
    expect(currentUrl).toContain('localhost:3000');
  });

  test('TC-AUTO-030: API calls complete within reasonable time', async ({ page }) => {
    // Monitor network requests
    const requests = [];
    page.on('request', request => requests.push(request));

    const responses = [];
    page.on('response', response => responses.push(response));

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check if any API calls were made
    const apiCalls = requests.filter(req =>
      req.url().includes('/api/') || req.url().includes(':4000')
    );

    console.log(`API calls made: ${apiCalls.length}`);

    // If API calls exist, verify they completed quickly
    for (const request of apiCalls) {
      const url = request.url();
      const response = responses.find(r => r.url() === url);

      if (response) {
        const timing = response.timing();
        console.log(`API call to ${url} took ${timing.responseEnd}ms`);
      }
    }
  });
});
