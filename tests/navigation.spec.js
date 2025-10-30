const { test, expect } = require('@playwright/test');

test.describe('BestCity Navigation Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('TC-AUTO-001: Home page loads successfully', async ({ page }) => {
    // Verify page title or main heading
    await expect(page).toHaveTitle(/BestCity/i);

    // Verify main navigation is present
    const navbar = page.locator('nav');
    await expect(navbar).toBeVisible();

    // Verify BestCity logo/brand is present
    await expect(page.getByText('BestCity')).toBeVisible();

    // Verify main CTA or hero section
    const heroSection = page.locator('main').first();
    await expect(heroSection).toBeVisible();
  });

  test('TC-AUTO-002: Navigation links are functional', async ({ page }) => {
    // Test Properties link
    await page.click('text=Properties');
    await expect(page).toHaveURL(/.*properties/);
    await expect(page.locator('h1, h2').filter({ hasText: /properties/i }).first()).toBeVisible();

    // Test About link
    await page.click('text=About');
    await expect(page).toHaveURL(/.*about/);

    // Test FAQ link
    await page.click('text=FAQ');
    await expect(page).toHaveURL(/.*faq/);

    // Test Blog link
    await page.click('text=Blog');
    await expect(page).toHaveURL(/.*blog/);

    // Return to home
    await page.click('text=Home');
    await expect(page).toHaveURL(/^(?!.*\/(about|faq|blog|properties))/);
  });

  test('TC-AUTO-004: 404 page displays for invalid routes', async ({ page }) => {
    await page.goto('/invalid-page-that-does-not-exist');

    // Check for 404 indicators
    const body = await page.textContent('body');
    expect(body.toLowerCase()).toMatch(/not found|404/);
  });

  test('TC-AUTO-005: Property detail page navigation', async ({ page }) => {
    // Navigate to properties page
    await page.goto('/properties');

    // Wait for property cards to load
    await page.waitForSelector('a[href*="/properties/"]', { timeout: 5000 });

    // Click on first property card
    const firstProperty = page.locator('a[href*="/properties/"]').first();
    await firstProperty.click();

    // Verify we're on property detail page
    await expect(page).toHaveURL(/.*properties\/\d+/);

    // Verify property details are displayed
    await expect(page.locator('text=/ROI|Investment|Invest/i').first()).toBeVisible();
  });

  test('TC-AUTO-006: Breadcrumb navigation on property detail', async ({ page }) => {
    await page.goto('/properties/1');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Verify breadcrumbs
    await expect(page.locator('text=Home')).toBeVisible();
    await expect(page.locator('text=Properties')).toBeVisible();

    // Click breadcrumb to go back
    await page.click('a:has-text("Properties")');
    await expect(page).toHaveURL(/.*properties$/);
  });

  test('TC-AUTO-007: Footer links are present', async ({ page }) => {
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Verify footer is visible
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Check for common footer elements
    const footerText = await footer.textContent();
    expect(footerText.toLowerCase()).toContain('bestcity');
  });

  test('TC-AUTO-008: Page loads without console errors', async ({ page }) => {
    const consoleErrors = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Navigate to a few pages
    await page.click('text=Properties');
    await page.waitForLoadState('networkidle');

    await page.click('text=About');
    await page.waitForLoadState('networkidle');

    // Check for errors (excluding expected ones)
    const criticalErrors = consoleErrors.filter(error =>
      !error.includes('favicon') &&
      !error.includes('source map')
    );

    expect(criticalErrors).toHaveLength(0);
  });

  test('TC-AUTO-009: Connect button is visible and clickable', async ({ page }) => {
    // Locate Connect button
    const connectButton = page.locator('button:has-text("Connect")').first();
    await expect(connectButton).toBeVisible();
    await expect(connectButton).toBeEnabled();

    // Click the button (even though it's not functional)
    await connectButton.click();

    // Note: Since wallet connection is not implemented,
    // we just verify the button exists and is clickable
  });

  test('TC-AUTO-010: Property images load correctly', async ({ page }) => {
    await page.goto('/properties');

    // Wait for images to load
    await page.waitForSelector('img', { timeout: 5000 });

    // Get all property images
    const images = await page.locator('img').all();

    // Verify at least some images are present
    expect(images.length).toBeGreaterThan(0);

    // Check first image has loaded
    const firstImage = page.locator('img').first();
    await expect(firstImage).toBeVisible();

    // Verify image has valid src
    const src = await firstImage.getAttribute('src');
    expect(src).toBeTruthy();
    expect(src.length).toBeGreaterThan(0);
  });
});
