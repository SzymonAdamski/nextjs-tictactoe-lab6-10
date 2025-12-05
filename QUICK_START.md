# 🚀 Quick Start - Przewodnik dla osoby oceniającej

## Szybkie uruchomienie

### 1. Instalacja (jednorazowo)
```bash
npm install
```

### 2. Uruchomienie aplikacji
```bash
npm run dev
```
Aplikacja dostępna na: **http://localhost:3000**

### 3. Uruchomienie testów E2E
```bash
npm test
```

### 4. Wyświetlenie raportu testów
```bash
npm run test:report
```

---

## 📋 Checklist funkcjonalności do sprawdzenia

### ✅ Lab 6-7: Firebase Authentication + Firestore

1. **Rejestracja użytkownika**
   - Przejdź do: http://localhost:3000/user/register
   - Zarejestruj nowe konto
   - Sprawdź email i kliknij link weryfikacyjny

2. **Logowanie**
   - Zaloguj się na konto testowe:
     - Email: `szymonadamski6+testfirebase@gmail.com`
     - Hasło: `test123`
   - Lub użyj swojego nowo utworzonego konta

3. **Gra i zapis do Firestore**
   - Kliknij "Gra" w nawigacji
   - Rozegraj kilka ruchów
   - Kliknij "Zapisz grę" - zapisuje do Firestore

4. **Dashboard i wczytywanie gier**
   - Kliknij "Dashboard" w nawigacji
   - Zobaczysz listę zapisanych gier z Firestore
   - Kliknij "📂 Wczytaj" przy dowolnej grze
   - Gra zostanie wczytana na planszy

5. **Profil użytkownika z adresem**
   - Kliknij "Profil" w prawym górnym rogu
   - Wypełnij dane adresowe (ulica, miasto, kod pocztowy)
   - Kliknij "Zapisz profil"
   - Odśwież stronę - dane powinny się załadować z Firestore

6. **Zmiana hasła**
   - W profilu kliknij link do zmiany hasła
   - Wpisz nowe hasło (min. 6 znaków)
   - Wyloguj się i zaloguj nowym hasłem

7. **Persystencja sesji**
   - Będąc zalogowanym, zamknij przeglądarkę
   - Otwórz ponownie http://localhost:3000
   - Powinieneś nadal być zalogowany

### ✅ Lab 8-10: Testy E2E (Playwright)

8. **Uruchomienie testów**
   ```bash
   npm test
   ```
   - Powinno przejść **27 testów**
   - Na **3 przeglądarkach** (Chromium, Firefox, WebKit)
   - Łącznie **81 asercji**

9. **Podgląd raportu HTML**
   ```bash
   npm run test:report
   ```

10. **Testy w trybie UI (opcjonalnie)**
    ```bash
    npm run test:ui
    ```

---

## 🔥 Firebase Console - weryfikacja danych

### Sprawdź w Firebase Console:

1. **Authentication** → Users
   - Powinny być widoczne zarejestrowane konta
   - Email Verified = true

2. **Firestore Database** → Data
   - **Kolekcja `games`**:
     - Dokumenty z zapisanymi grami
     - Pola: `userId`, `board`, `boardSize`, `timestamp`
   
   - **Kolekcja `users`**:
     - Dokumenty z ID = userId
     - Pole `address` z danymi: `street`, `city`, `zipCode`

---

## 📊 Oczekiwane wyniki testów

```
Running 27 tests using 8 workers

  27 passed (około 20-30s)
```

### Podział testów:

**navigation.spec.js** - 3 testy × 3 przeglądarki = 9 testów
- Kliknięcie "Zaloguj się" → przekierowanie
- Kliknięcie "Gra" → przekierowanie  
- Kliknięcie "O projekcie" → przekierowanie

**login.spec.js** - 2 testy × 3 przeglądarki = 6 testów
- Poprawne logowanie → dostęp do profilu
- Niepoprawne dane → komunikat błędu

**protected-routes.spec.js** - 4 testy × 3 przeglądarki = 12 testów
- Dostęp do `/game` bez logowania → przekierowanie
- Dostęp do `/dashboard` bez logowania → przekierowanie
- Dostęp do `/user/profile` bez logowania → przekierowanie
- Publiczne strony dostępne bez logowania

---

## 🌐 Wersja Live

Jeśli nie chcesz uruchamiać lokalnie, sprawdź wersję online:

**Firebase Hosting:** https://nextjs-tictactoe-92cc6.web.app

Konto testowe:
- Email: `szymonadamski6+testfirebase@gmail.com`
- Hasło: `test123`

---

## 🐛 Troubleshooting

### Problem: Testy się nie uruchamiają
```bash
# Upewnij się, że aplikacja NIE jest już uruchomiona
# Playwright sam ją uruchomi
npm test
```

### Problem: "next start" nie działa
To normalne! Projekt używa static export:
```bash
# Zamiast tego użyj:
npm run dev
```

### Problem: Firebase connection error
Projekt zawiera plik `.env` z konfiguracją Firebase. 
Jeśli mimo to występują problemy, sprawdź konsolę przeglądarki (F12).

---

## 📞 Kontakt

W razie problemów sprawdź:
- `README.md` - pełna dokumentacja
- `DEPLOYMENT.md` - instrukcje wdrożenia
- `INSTRUKCJA.md` - instrukcje po polsku

**Autor:** Szymon Adamski  
**Projekt:** Lab 6-10 - Aplikacje internetowe
