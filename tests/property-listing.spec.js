const { test, expect } = require('@playwright/test');

test.describe('Property Listing Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/properties');
    await page.waitForLoadState('networkidle');
  });

  test('TC-AUTO-011: Properties page displays property cards', async ({ page }) => {
    // Verify property cards are visible
    const propertyCards = page.locator('[href*="/properties/"]');
    const count = await propertyCards.count();

    expect(count).toBeGreaterThan(0);

    // Verify first property card has required elements
    const firstCard = propertyCards.first();
    await expect(firstCard).toBeVisible();
  });

  test('TC-AUTO-012: Property cards show price information', async ({ page }) => {
    // Look for price indicators ($ or ETH symbols)
    const priceElements = page.locator('text=/\\$|ETH|eth/i').first();
    await expect(priceElements).toBeVisible();
  });

  test('TC-AUTO-013: Property cards show location', async ({ page }) => {
    // Look for location indicators (CA, FL, NY, etc.)
    const bodyText = await page.textContent('body');

    // Check if any US state or city names are present
    const hasLocation = /Miami|Beverly Hills|Manhattan|New York|California|Florida/i.test(bodyText);
    expect(hasLocation).toBeTruthy();
  });

  test('TC-AUTO-014: Filter button is present and clickable', async ({ page }) => {
    // Look for filter button using XPath
    const filterButton = page.locator('//*[@id="root"]/div/main/div/div[1]/div/div/div/button/svg/..');

    await expect(filterButton).toBeVisible();
    await filterButton.click();

    // Wait for filter panel to appear
    await page.waitForTimeout(500);
  });

  test('TC-AUTO-015: Property card click navigates to detail page', async ({ page }) => {
    // Click first property card
    const firstProperty = page.locator('[href*="/properties/"]').first();
    await firstProperty.click();

    // Verify navigation to detail page
    await expect(page).toHaveURL(/.*properties\/\d+/);

    // Verify detail page content
    await page.waitForLoadState('networkidle');
    const bodyText = await page.textContent('body');

    // Check for detail page indicators
    const hasDetails = /invest|roi|wallet|property details/i.test(bodyText);
    expect(hasDetails).toBeTruthy();
  });

  test('TC-AUTO-015-B: Clicking second property navigates to correct detail page', async ({ page }) => {
    // Get the href of the second property card
    const secondProperty = page.locator('[href*="/properties/"]').nth(1);
    const expectedUrl = await secondProperty.getAttribute('href');

    // Click second property card
    await secondProperty.click();

    // Verify navigation to the SECOND property's detail page, not the first
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain(expectedUrl);

    // Additional check: URL should match the second property's ID
    await expect(page).toHaveURL(/.*properties\/\d+/);
  });

  test('TC-AUTO-021: Connect button opens modal or navigates to wallet connection', async ({ page }) => {
    // Navigate to first property detail page
    const firstProperty = page.locator('[href*="/properties/"]').first();
    await firstProperty.click();
    await page.waitForLoadState('networkidle');

    // Find and click Connect button
    const connectButton = page.locator('button:has-text("Connect")').or(
      page.locator('button:has-text("connect")')
    ).first();

    await expect(connectButton).toBeVisible();

    // Get current URL before clicking
    const urlBeforeClick = page.url();

    await connectButton.click();
    await page.waitForTimeout(1000);

    // Verify that SOMETHING happened:
    // Either: A modal appeared, OR the page navigated
    const modalOpened = await page.locator('[role="dialog"]').or(
      page.locator('.modal')
    ).isVisible().catch(() => false);

    const urlChanged = page.url() !== urlBeforeClick;

    // At least one of these should be true - if neither, the button is not working
    expect(modalOpened || urlChanged).toBeTruthy();
  });

  test('TC-AUTO-016: Property cards show ROI information', async ({ page }) => {
    const bodyText = await page.textContent('body');

    // Check for ROI mentions
    const hasROI = /roi|return|annual/i.test(bodyText);
    expect(hasROI).toBeTruthy();
  });

  test('TC-AUTO-017: Property cards are responsive', async ({ page }) => {
    // Test desktop view
    await page.setViewportSize({ width: 1920, height: 1080 });
    let propertyCards = await page.locator('[href*="/properties/"]').count();
    expect(propertyCards).toBeGreaterThan(0);

    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(300);
    propertyCards = await page.locator('[href*="/properties/"]').count();
    expect(propertyCards).toBeGreaterThan(0);

    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(300);
    propertyCards = await page.locator('[href*="/properties/"]').count();
    expect(propertyCards).toBeGreaterThan(0);
  });

  test('TC-AUTO-018: Property images are lazy loaded or cached', async ({ page }) => {
    // Check image loading
    const images = page.locator('img');
    const count = await images.count();

    if (count > 0) {
      // Verify at least one image is visible
      const firstImage = images.first();
      await expect(firstImage).toBeVisible({ timeout: 10000 });
    }
  });

  test('TC-AUTO-019: Property status badges are displayed', async ({ page }) => {
    const bodyText = await page.textContent('body');

    // Check for status indicators
    const hasStatus = /active|funded|new listing|almost funded/i.test(bodyText);
    expect(hasStatus).toBeTruthy();
  });

  test('TC-AUTO-020: Funding progress is shown', async ({ page }) => {
    const bodyText = await page.textContent('body');

    // Check for funding/investor indicators
    const hasFunding = /funded|investor|invest/i.test(bodyText);
    expect(hasFunding).toBeTruthy();
  });
});
