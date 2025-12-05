const { test, expect } = require('@playwright/test');

test.describe('Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Przed każdym testem otwórz stronę główną
    await page.goto('http://localhost:3000/');
  });

  test('successful login redirects to profile', async ({ page }) => {
    // Przejdź do strony logowania
    await page.click('text=Zaloguj się');
    await expect(page).toHaveURL('http://localhost:3000/user/signin');

    // Wypełnij formularz logowania
    await page.getByLabel('Email').fill('szymonadamski6@gmail.com');
    await page.getByLabel('Hasło').fill('test123');

    // Kliknij przycisk logowania
    await page.getByRole('button', { name: 'Zaloguj się' }).click();

    // Poczekaj na przekierowanie (może być opóźnienie)
    await page.waitForTimeout(500);

    // Sprawdź czy użytkownik jest zalogowany (sprawdź nawigację)
    await expect(page.locator('text=Dashboard')).toBeVisible();
    
    // Spróbuj przejść do profilu
    await page.goto('http://localhost:3000/user/profile');
    
    // Sprawdź czy jesteśmy na stronie profilu (nie przekierowano do logowania)
    await expect(page).toHaveURL('http://localhost:3000/user/profile');
    await expect(page.locator('h1')).toContainText('Profil użytkownika');
  });

  test('login with incorrect credentials shows error', async ({ page }) => {
    // Przejdź do strony logowania
    await page.click('text=Zaloguj się');

    // Wypełnij formularz nieprawidłowymi danymi
    await page.getByLabel('Email').fill('wrong@example.com');
    await page.getByLabel('Hasło').fill('wrongpassword');

    // Kliknij przycisk logowania
    await page.getByRole('button', { name: 'Zaloguj się' }).click();

    // Sprawdź czy pojawił się komunikat o błędzie
    await expect(page.locator('text=Nieprawidłowy email lub hasło')).toBeVisible();
  });
});
