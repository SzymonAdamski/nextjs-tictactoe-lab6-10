# Kółko i krzyżyk - Next.js (Lab 6-10)

Projekt gry w kółko i krzyżyk z Firebase Authentication, Firestore i testami E2E.

## 🌐 Wersja Live

**Firebase Hosting:** [https://nextjs-tictactoe-92cc6.web.app](https://nextjs-tictactoe-92cc6.web.app)

## 🎯 Zaimplementowane funkcjonalności

### Lab 6-7: Firebase Authentication + Firestore
- ✅ Rejestracja z weryfikacją email (Firebase Auth)
- ✅ Logowanie z persystencją sesji (browserLocalPersistence)
- ✅ Zmiana hasła dla zalogowanych użytkowników
- ✅ Chronione ścieżki (/dashboard, /game, /user/profile)
- ✅ Zapis gier do Firestore (kolekcja `games`)
- ✅ Wczytywanie gier z Firestore (przycisk "Wczytaj" w dashboard)
- ✅ Profil użytkownika z danymi adresowymi w Firestore (kolekcja `users`)
- ✅ Synchronizacja danych między urządzeniami

### Lab 8-10: Testy E2E (Playwright)
- ✅ 27 testów E2E na 3 przeglądarkach (Chromium, Firefox, WebKit)
- ✅ Testy nawigacji (linki, routing)
- ✅ Testy logowania (poprawne/niepoprawne dane)
- ✅ Testy zabezpieczeń (przekierowania dla niezalogowanych)
- ✅ Automatyczne uruchamianie serwera dev przed testami
- ✅ GitHub Actions CI/CD workflow

### Funkcjonalności gry
- ✅ Plansza o konfigurowalnym rozmiarze (nxn)
- ✅ Wykrywanie wygranej (5 kolejnych symboli)
- ✅ Pełna konfiguracja wyglądu (kolory, rozmiary)
- ✅ Responsywny design (mobile, tablet, desktop)

## 🚀 Uruchomienie projektu

### Wymagania wstępne
- Node.js 18+ i npm
- Konto Firebase (darmowy plan wystarczy)

### Instalacja i uruchomienie

1. **Sklonuj repozytorium:**
```bash
git clone https://github.com/SzymonAdamski/nextjs-tictactoe-lab6-10.git
cd nextjs-tictactoe-lab6-10
```

2. **Zainstaluj zależności:**
```bash
npm install
```

3. **Uruchom serwer deweloperski:**
```bash
npm run dev
```

4. **Otwórz w przeglądarce:** [http://localhost:3000](http://localhost:3000)

**Uwaga:** Projekt zawiera plik `.env` z konfiguracją Firebase - nie musisz nic konfigurować!

### Konto testowe
Do testów dostępne jest konto:
- Email: `szymonadamski6+testfirebase@gmail.com`
- Hasło: `test123`

## 🧪 Uruchomienie testów E2E

Testy Playwright wymagają uruchomionej aplikacji.

### Metoda 1: Automatyczne uruchomienie
```bash
npx playwright test
```
*(Playwright automatycznie uruchomi `npm run dev` przed testami)*

### Metoda 2: Ręczne uruchomienie
```bash
# Terminal 1: Uruchom aplikację
npm run dev

# Terminal 2: Uruchom testy
npx playwright test
```

### Wyświetlenie raportu testów
```bash
npx playwright show-report
```

### Uruchomienie testów w trybie UI (debugowanie)
```bash
npx playwright test --ui
```

## 📦 Wdrożenie

### Firebase Hosting
```bash
npm run build
firebase deploy
```

Pełna instrukcja wdrożenia znajduje się w pliku [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🎮 Szczegóły implementacji

### Firebase Authentication
- Rejestracja z automatyczną weryfikacją email
- Logowanie z persystencją (`browserLocalPersistence`)
- Zmiana hasła dla zalogowanych użytkowników
- Wylogowanie z czyszczeniem sesji

### Firestore Database

**Kolekcja `games`:**
```javascript
{
  userId: "user-uid",
  board: [0, 1, 0, ...],  // Płaska tablica (n×n)
  boardSize: 10,
  currentPlayer: 0,
  gameOver: false,
  winner: null,
  timestamp: serverTimestamp()
}
```

**Kolekcja `users`:**
```javascript
{
  address: {
    street: "ul. Przykładowa 1",
    city: "Warszawa", 
    zipCode: "00-001"
  }
}
```

### Routing i ochrona
- **Publiczne:** `/`, `/about`, `/user/signin`, `/user/register`, `/user/verify`
- **Chronione:** `/dashboard`, `/game`, `/user/profile`, `/user/changepassword`, `/user/signout`
- Automatyczne przekierowanie do `/user/signin?returnUrl=...` dla niezalogowanych

### Testy E2E (Playwright)

**27 testów na 3 przeglądarkach (81 asercji):**

1. **Testy nawigacji** (`navigation.spec.js`):
   - Kliknięcie linku "Zaloguj się" → `/user/signin`
   - Kliknięcie linku "Gra" → `/game`
   - Kliknięcie linku "O projekcie" → `/about`

2. **Testy logowania** (`login.spec.js`):
   - Poprawne logowanie → widoczny przycisk "Wyloguj" + dostęp do profilu
   - Niepoprawne dane → komunikat "Nieprawidłowy email lub hasło"

3. **Testy zabezpieczeń** (`protected-routes.spec.js`):
   - `/game` → przekierowanie do `/user/signin`
   - `/dashboard` → przekierowanie do `/user/signin`
   - `/user/profile` → przekierowanie do `/user/signin`
   - Publiczne strony dostępne bez logowania

## 📁 Struktura projektu

```
├── app/
│   ├── (public)/              # Publiczne ścieżki
│   │   └── user/
│   │       ├── register/      # Rejestracja
│   │       ├── signin/        # Logowanie
│   │       └── verify/        # Weryfikacja email
│   ├── (protected)/           # Chronione ścieżki
│   │   ├── layout.jsx        # Layout z AuthGuard
│   │   ├── dashboard/        # Panel użytkownika
│   │   ├── game/             # Gra (z loadGameId)
│   │   └── user/
│   │       ├── profile/      # Profil z adresem
│   │       ├── changepassword/
│   │       └── signout/
│   ├── about/                # O projekcie
│   ├── layout.tsx            # Root layout z AuthContext
│   ├── page.tsx              # Strona główna
│   └── globals.css           # Style globalne
├── components/
│   ├── TicTacToe.tsx         # Komponent gry z Firestore
│   └── Navigation.tsx        # Nawigacja z AuthContext
├── lib/
│   ├── firebase.js           # Firebase config (auth, db)
│   └── AuthContext.js        # React Context z onAuthStateChanged
├── tests/
│   ├── navigation.spec.js    # Testy nawigacji
│   ├── login.spec.js         # Testy logowania
│   └── protected-routes.spec.js  # Testy zabezpieczeń
├── playwright.config.ts      # Konfiguracja Playwright
├── firebase.json             # Konfiguracja Firebase Hosting
└── .github/workflows/
    └── playwright.yml        # GitHub Actions CI/CD
```

## 🛠 Technologie

- **Next.js 14.2.5** - App Router, Server/Client Components, Static Export
- **React 18** - Hooks, Context API, Suspense
- **TypeScript** - Typowanie komponentów i funkcji
- **Firebase 10** - Authentication, Firestore Database
- **Playwright 1.48** - E2E testing na 3 przeglądarkach
- **CSS3** - Responsywne style (mobile-first)
- **SVG** - Renderowanie planszy i symboli

## 📝 Notatki dla oceniającego

1. **Firestore Security Rules** - projekt używa trybu testowego, w produkcji należy dodać:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /games/{gameId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

2. **Testy E2E** - wymagają konta testowego z zweryfikowanym emailem. Konto jest już utworzone i gotowe do użycia.

3. **Static Export** - projekt używa `output: 'export'` w `next.config.js`, dlatego:
   - ❌ Nie można użyć `npm run start`
   - ✅ Można użyć `npm run dev` lub `npx serve@latest out`

4. **Dodatkowe pliki dokumentacji:**
   - `DEPLOYMENT.md` - szczegółowa instrukcja wdrożenia
   - `INSTRUKCJA.md` - instrukcje w języku polskim
   - `PROJECT_INFO.md` - informacje o projekcie

## 👨‍💻 Autor

**Szymon Adamski**  
Projekt laboratoryjny - Aplikacje internetowe (Lab 6-10)
