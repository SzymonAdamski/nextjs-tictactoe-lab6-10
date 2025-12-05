const { test, expect } = require('@playwright/test');

test.describe('Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Przed każdym testem otwórz stronę główną
    await page.goto('/');
  });

  test('successful login redirects to profile', async ({ page }) => {
    // Przejdź do strony logowania
    await page.click('text=Zaloguj się');
    await expect(page).toHaveURL('/user/signin');

    // Wypełnij formularz logowania
    await page.fill('#email', 'szymonadamski6+testfirebase@gmail.com');
    await page.fill('#password', 'test123');

    // Kliknij przycisk logowania
    await page.click('button[type="submit"]');

    // Poczekaj aż przycisk "Wyloguj" będzie widoczny (potwierdza że użytkownik jest zalogowany)
    await expect(page.locator('text=Wyloguj')).toBeVisible({ timeout: 10000 });
    
    // Przejdź do profilu
    await page.goto('/user/profile');
    
    // Sprawdź czy jesteśmy na stronie profilu (nie przekierowano do logowania)
    await expect(page).toHaveURL('/user/profile');
    await expect(page.locator('h1')).toContainText('Profil użytkownika');
  });

  test('login with incorrect credentials shows error', async ({ page }) => {
    // Przejdź do strony logowania
    await page.click('text=Zaloguj się');

    // Wypełnij formularz nieprawidłowymi danymi
    await page.fill('#email', 'wrong@example.com');
    await page.fill('#password', 'wrongpassword');

    // Kliknij przycisk logowania
    await page.click('button[type="submit"]');

    // Sprawdź czy pojawił się komunikat o błędzie (Firebase zwraca "Nieprawidłowy email lub hasło")
    await expect(page.getByText('Nieprawidłowy email lub hasło')).toBeVisible({ timeout: 5000 });
  });
});
