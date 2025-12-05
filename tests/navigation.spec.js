const { test, expect } = require('@playwright/test');

test.describe('Navigation Tests', () => {
  test('has link to login page', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    
    // Symulacja kliknięcia na link z tekstem "Zaloguj się"
    await page.click('text=Zaloguj się');
    
    // Sprawdzenie, czy została otwarta strona ze ścieżką do formularza logowania
    await expect(page).toHaveURL('http://localhost:3000/user/signin');
    
    // Sprawdzenie, czy na stronie logowania jest nagłówek z tekstem "Zaloguj się"
    await expect(page.locator('h1')).toContainText('Zaloguj się');
  });

  test('has link to game page', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    
    // Kliknięcie w link "Gra"
    await page.click('text=Gra');
    
    // Sprawdzenie czy przeszliśmy na stronę logowania (bo gra jest chroniona)
    await expect(page).toHaveURL(/\/user\/signin/);
  });

  test('has link to about page', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    
    // Kliknięcie w link "O projekcie"
    await page.click('text=O projekcie');
    
    // Sprawdzenie URL
    await expect(page).toHaveURL('http://localhost:3000/about');
  });
});
