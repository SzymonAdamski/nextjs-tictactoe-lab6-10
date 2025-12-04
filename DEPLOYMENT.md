# Instrukcja wdrożenia na Vercel

## Metoda 1: Wdrożenie przez interfejs Vercel (zalecane)

### Krok 1: Utwórz repozytorium GitHub
1. Zaloguj się na [GitHub](https://github.com)
2. Kliknij "New repository"
3. Nazwa: `nextjs-tictactoe-lab6` (lub inna)
4. Wybierz "Public" lub "Private"
5. **NIE** zaznaczaj "Initialize with README" (mamy już pliki)
6. Kliknij "Create repository"

### Krok 2: Wypchnij kod do GitHub
Skopiuj i wykonaj komendy pokazane na GitHub (sekcja "…or push an existing repository from the command line"):

```bash
git remote add origin https://github.com/TWOJ-USERNAME/nextjs-tictactoe-lab6.git
git branch -M main
git push -u origin main
```

**Zamień** `TWOJ-USERNAME` na swoją nazwę użytkownika GitHub!

### Krok 3: Wdróż na Vercel
1. Przejdź na [vercel.com](https://vercel.com)
2. Kliknij "Sign Up" i wybierz "Continue with GitHub"
3. Autoryzuj Vercel do dostępu do swoich repozytoriów
4. Kliknij "Add New..." → "Project"
5. Znajdź repozytorium `nextjs-tictactoe-lab6` i kliknij "Import"
6. **Konfiguracja projektu:**
   - Framework Preset: **Next.js** (powinno być wykryte automatycznie)
   - Build Command: `npm run build` (domyślnie)
   - Output Directory: `.next` (domyślnie)
   - Install Command: `npm install` (domyślnie)
7. **Environment Variables:** Nie są potrzebne (używamy localStorage)
8. Kliknij "Deploy"

### Krok 4: Poczekaj na wdrożenie
- Vercel automatycznie zbuduje i wdroży projekt (2-3 minuty)
- Po zakończeniu otrzymasz link do aplikacji: `https://twoj-projekt.vercel.app`

### Krok 5: Sprawdź wersję live
- Kliknij "Visit" lub otwórz link w przeglądarce
- Przetestuj wszystkie funkcjonalności:
  - Rejestracja i logowanie
  - Rozpoczęcie gry
  - Zapis gry
  - Panel użytkownika
  - Responsywność (otwórz na telefonie)

---

## Metoda 2: Wdrożenie przez Vercel CLI

### Instalacja Vercel CLI
```bash
npm install -g vercel
```

### Logowanie
```bash
vercel login
```

### Wdrożenie
```bash
cd "k:\Next.js"
vercel
```

Odpowiedz na pytania:
- Set up and deploy?: **Y**
- Which scope?: Wybierz swoje konto
- Link to existing project?: **N**
- What's your project's name?: `nextjs-tictactoe-lab6`
- In which directory is your code located?: `./`
- Want to override the settings?: **N**

### Wdrożenie produkcyjne
```bash
vercel --prod
```

---

## Automatyczne wdrożenia

Po pierwszym wdrożeniu, Vercel automatycznie wdroży każdy `git push` na GitHub:
- Push na `main` → Produkcja
- Push na inne gałęzie → Preview

---

## Rozwiązywanie problemów

### Problem: Błąd kompilacji na Vercel
**Rozwiązanie:** Sprawdź logi budowania w panelu Vercel i napraw błędy TypeScript

### Problem: Strona się nie ładuje
**Rozwiązanie:** Sprawdź czy wszystkie ścieżki są względne i używają `/` (nie `\`)

### Problem: localStorage nie działa
**Rozwiązanie:** localStorage działa tylko po stronie klienta - upewnij się, że komponenty używające localStorage mają dyrektywę `'use client'`

### Problem: Nawigacja nie działa
**Rozwiązanie:** Użyj `Link` z `next/link` zamiast `<a>` dla nawigacji wewnętrznej

---

## Dodatkowe informacje

### Custom Domain
1. W panelu Vercel przejdź do Settings → Domains
2. Dodaj swoją domenę
3. Skonfiguruj DNS zgodnie z instrukcjami

### Environment Variables
Projekt nie wymaga zmiennych środowiskowych (używa localStorage), ale jeśli dodasz zewnętrzne API:
1. Settings → Environment Variables
2. Dodaj klucz i wartość
3. Wybierz środowiska (Production, Preview, Development)
4. Kliknij "Save"

### Monitoring
Vercel dostarcza:
- Analytics (ruch, wydajność)
- Logs (błędy runtime)
- Insights (Core Web Vitals)

---

## Gotowe! 🎉

Twoja aplikacja jest teraz dostępna online pod adresem:
**https://twoj-projekt.vercel.app**

Skopiuj ten link do dokumentacji projektu!
