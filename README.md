# Kółko i krzyżyk - Next.js (Temat 5)

Projekt gry w kółko i krzyżyk stworzony dla Laboratorium 6 - zawiera wszystkie wymagane funkcjonalności.

## 🌐 Wersja Live

**Demo dostępne na:** [https://szymonadamski.github.io/nextjs-tictactoe-lab6-10/](https://szymonadamski.github.io/nextjs-tictactoe-lab6-10/)

Pełna instrukcja wdrożenia znajduje się w pliku [DEPLOYMENT.md](./DEPLOYMENT.md)

## Funkcje

- ✅ Uwierzytelnianie użytkowników (localStorage + React Context)
- ✅ Autoryzacja - chronione ścieżki (/dashboard, /game wymagają logowania)
- ✅ Responsywny design (mobile, tablet, desktop)
- ✅ Strona informacyjna o autorze i projekcie
- ✅ Zapis danych gier do localStorage
- ✅ Plansza o konfigurowalnym rozmiarze (nxn)
- ✅ Wykrywanie wygranej (5 kolejnych symboli)
- ✅ Pełna konfiguracja wyglądu planszy
- ✅ Statystyki zapisanych gier

## Uruchomienie projektu

1. Zainstaluj zależności:
```bash
npm install
```

2. Uruchom serwer deweloperski:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=wpisz-losowy-sekret-tutaj

NEXT_PUBLIC_FIREBASE_API_KEY=twoj-api-key
npm run dev
```

3. Otwórz [http://localhost:3000](http://localhost:3000) w przeglądarce

4. Utwórz testowe konto w formularzu rejestracji

**Uwaga**: Projekt korzysta z localStorage, więc dane są przechowywane lokalnie w przeglądarce. Nie wymaga żadnej konfiguracji serwera back-end ani bazy danych.

## Wdrożenie na Vercel

Szczegółowa instrukcja wdrożenia znajduje się w pliku [DEPLOYMENT.md](./DEPLOYMENT.md)

**Krótka instrukcja:**
1. Wypchnij kod do repozytorium GitHub
2. Zaloguj się na [vercel.com](https://vercel.com)
3. Kliknij "Add New..." → "Project"
4. Zaimportuj repozytorium z GitHub
5. Kliknij "Deploy" (brak dodatkowych zmiennych środowiskowych)
6. Skopiuj link do wersji live i wklej powyżej w sekcji "Wersja Live"

## Funkcjonalności gry

### Podstawowe
- Plansza o konfigurowalnym rozmiarze (domyślnie 10×10)
- Wstawianie symboli X i O przez kliknięcie
- Automatyczna zmiana gracza po każdym ruchu
- Wykrywanie wygranej (5 symboli w linii - poziomo, pionowo, przekątnie)
- Wykrywanie remisu (brak wolnych pól)
- Blokada ruchu po zakończeniu gry

### Statystyki
- Liczba ruchów gracza X
- Liczba ruchów gracza O
- Liczba pozostałych wolnych pól
- Informacja o aktualnym graczu
- Komunikat o wygranej/remisie

### Zapis gry
- Zapis lokalny w przeglądarce (localStorage)
- Wczytywanie zapisanych gier
- Historia gier w panelu użytkownika (wymaga logowania)
- Usuwanie zapisanych gier
- Statystyki: wygrane X/O, remisky, liczba zapisanych gier

### Konfiguracja wyglądu
- Rozmiar planszy (3-20)
- Rozmiar pojedynczego pola (30-100px)
- Rozmiar symboli (10-80px)
- Długość wygranej (3-10 symboli)
- Kolor tła planszy
- Kolor krawędzi
- Kolor symbolu X
- Kolor symbolu O

## Struktura projektu

```
├── app/
│   ├── about/          # Strona o projekcie i autorze
│   ├── dashboard/      # Panel użytkownika (chroniony)
│   ├── game/           # Strona z grą (chroniona)
│   ├── login/          # Strona logowania i rejestracji
│   ├── layout.tsx      # Layout główny z AuthProvider i nawigacją
│   ├── page.tsx        # Strona główna
│   └── globals.css     # Style globalne (responsywne)
├── components/
│   ├── TicTacToe.tsx   # Główny komponent gry (SVG)
│   └── Navigation.tsx  # Komponent nawigacji
└── lib/
    └── auth.tsx        # Context API z localStorage auth
```

## Technologie

- **Next.js 14** - Framework React z App Router
- **TypeScript** - Typowany JavaScript
- **React Context API** - Zarządzanie stanem uwierzytelniania
- **localStorage** - Przechowywanie danych użytkowników i gier
- **CSS3** - Stylowanie responsywne (mobile-first)
- **SVG** - Renderowanie planszy i symboli

## Symbole SVG

Symbole X i O są renderowane za pomocą SVG:
- **X**: Dwie przecinające się linie
- **O**: Okrąg z przezroczystym wypełnieniem

## Autor

Wpisz swoje dane w pliku `app/about/page.tsx` w sekcji "Autor"

## Licencja

Projekt edukacyjny dla Laboratorium 6-10
