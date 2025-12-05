const { test, expect } = require('@playwright/test');

test.describe('Protected Routes Tests', () => {
  test('unauthenticated user redirected from game page to login', async ({ page }) => {
    // Spróbuj przejść bezpośrednio na chronioną stronę gry
    await page.goto('http://localhost:3000/game');

    // Poczekaj na przekierowanie
    await page.waitForURL(/\/user\/signin/);

    // Sprawdź czy zostaliśmy przekierowani do logowania
    await expect(page).toHaveURL(/\/user\/signin\?returnUrl=/);
    
    // Sprawdź czy jest formularz logowania
    await expect(page.locator('h1')).toContainText('Zaloguj się');
  });

  test('unauthenticated user redirected from dashboard to login', async ({ page }) => {
    // Spróbuj przejść bezpośrednio na chroniony dashboard
    await page.goto('http://localhost:3000/dashboard');

    // Poczekaj na przekierowanie
    await page.waitForURL(/\/user\/signin/);

    // Sprawdź czy zostaliśmy przekierowani do logowania
    await expect(page).toHaveURL(/\/user\/signin\?returnUrl=/);
  });

  test('unauthenticated user redirected from profile to login', async ({ page }) => {
    // Spróbuj przejść bezpośrednio na chroniony profil
    await page.goto('http://localhost:3000/user/profile');

    // Poczekaj na przekierowanie
    await page.waitForURL(/\/user\/signin/);

    // Sprawdź czy zostaliśmy przekierowani do logowania z returnUrl
    await expect(page).toHaveURL(/\/user\/signin\?returnUrl=.*profile/);
  });

  test('unauthenticated user can access public pages', async ({ page }) => {
    // Strona główna powinna być dostępna
    await page.goto('http://localhost:3000/');
    await expect(page).toHaveURL('http://localhost:3000/');

    // Strona "O projekcie" powinna być dostępna
    await page.goto('http://localhost:3000/about');
    await expect(page).toHaveURL('http://localhost:3000/about');

    // Strona rejestracji powinna być dostępna
    await page.goto('http://localhost:3000/user/register');
    await expect(page).toHaveURL('http://localhost:3000/user/register');
  });
});
