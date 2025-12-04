# Instrukcja użytkowania - Gra w kółko i krzyżyk

## Spis treści
1. [Logowanie](#logowanie)
2. [Rozpoczęcie gry](#rozpoczęcie-gry)
3. [Zasady gry](#zasady-gry)
4. [Konfiguracja planszy](#konfiguracja-planszy)
5. [Zapisywanie i wczytywanie gry](#zapisywanie-i-wczytywanie-gry)
6. [Panel użytkownika](#panel-użytkownika)

## Logowanie

### Rejestracja nowego konta
1. Kliknij "Zaloguj się" w nawigacji
2. Kliknij "Nie masz konta? Zarejestruj się"
3. Wpisz imię, email i hasło (min. 6 znaków)
4. Kliknij "Zarejestruj się"
5. Po utworzeniu konta automatycznie przełączysz się na formularz logowania

### Logowanie
1. Kliknij "Zaloguj się" w nawigacji
2. Wpisz email i hasło
3. Kliknij "Zaloguj się"
4. Po zalogowaniu zostaniesz przekierowany do strony z grą

**Uwaga:** Dane są przechowywane lokalnie w przeglądarce (localStorage), więc możesz użyć dowolnego emaila bez konieczności weryfikacji.

## Rozpoczęcie gry

1. Przejdź do strony "Gra" w menu nawigacji
2. Zobaczysz planszę 10×10 gotową do gry
3. Gracz X zaczyna (czerwony symbol)
4. Kliknij na dowolne wolne pole, aby postawić symbol

## Zasady gry

### Cel gry
Ułóż 5 (lub inną skonfigurowaną liczbę) swoich symboli w linii:
- Poziomej ←→
- Pionowej ↕
- Przekątnej ↗ lub ↖

### Przebieg gry
1. Gracze na zmianę stawiają swoje symbole (X i O)
2. Po każdym ruchu następuje automatyczna zmiana gracza
3. Gra kończy się gdy:
   - Jeden z graczy ułoży wymaganą liczbę symboli w linii (wygrana)
   - Wszystkie pola zostaną zajęte bez wygranej (remis)

### Status gry
Na górze ekranu widzisz:
- **Gracz X:** Liczba wykonanych ruchów
- **Gracz O:** Liczba wykonanych ruchów
- **Wolne pola:** Liczba pozostałych pustych pól
- **Teraz gra:** Kto ma teraz ruch

### Po zakończeniu gry
- Wyświetla się komunikat o wygranej lub remisie
- Ruchy zostają zablokowane
- Możesz rozpocząć nową grę przyciskiem "Nowa gra"

## Konfiguracja planszy

### Dostępne opcje

#### Rozmiar planszy (3-20)
Określa wymiary planszy (np. 10×10)
- Mniejsze plansze: szybsze rozgrywki
- Większe plansze: dłuższe, bardziej strategiczne gry

#### Rozmiar pola (30-100px)
Wielkość pojedynczego pola na planszy
- Mniejsze wartości: kompaktowa plansza
- Większe wartości: lepiej widoczne symbole

#### Rozmiar symbolu (10-80px)
Wielkość symboli X i O
- Dostosuj do rozmiaru pola dla najlepszej czytelności

#### Długość wygranej (3-10)
Ile symboli w linii potrzeba do wygranej
- 3: klasyczne kółko i krzyżyk
- 5: standardowa wersja (domyślnie)
- 10: bardzo trudna wersja na dużych planszach

#### Kolory
- **Kolor tła:** Tło planszy
- **Kolor krawędzi:** Linie siatki
- **Kolor X:** Kolor symbolu X
- **Kolor O:** Kolor symbolu O

### Jak zmienić konfigurację
1. Przewiń w dół do sekcji "Konfiguracja planszy"
2. Zmień wartości suwakami lub poleami numerycznymi
3. Wybierz kolory klikając na pola kolorów
4. Zmiany są widoczne natychmiast
5. **Uwaga:** Zmiana rozmiaru planszy resetuje grę!

## Zapisywanie i wczytywanie gry

### Zapis gry w localStorage
1. Kliknij przycisk "💾 Zapisz grę"
2. Gra zostanie zapisana w przeglądarce (localStorage)
3. Zapisana gra pojawi się na liście w Panelu użytkownika
4. Kliknij "📂 Wczytaj grę" aby przywrócić ostatnio zapisaną grę

**Uwagi:**
- Gry są zapisywane lokalnie w przeglądarce
- Dane zostaną utracone po wyczyszczeniu historii/danych przeglądarki
- Każdy zapis gry dodaje nowy wpis do historii
- Możesz mieć wiele zapisanych gier jednocześnie

**Zalety:**
- Nie wymaga połączenia z internetem
- Szybki dostęp do zapisanych gier
- Wszystkie dane pozostają na Twoim urządzeniu

## Panel użytkownika

### Dostęp
1. Zaloguj się
2. Kliknij "Dashboard" w menu nawigacji

### Funkcje

#### Lista zapisanych gier
Tabela ze wszystkimi grami zawierająca:
- **Data:** Kiedy gra została zapisana
- **Rozmiar:** Wymiary planszy
- **Ruchy X/O:** Liczba ruchów każdego gracza
- **Status:** Czy gra zakończona (wygrana/remis) czy w trakcie
- **Akcje:** Przycisk usuwania gry

#### Statystyki
- Liczba zapisanych gier
- Liczba wygranych gracza X
- Liczba wygranych gracza O
- Liczba remisów

#### Usuwanie gier
1. Znajdź grę w tabeli
2. Kliknij "🗑️ Usuń"
3. Potwierdź usunięcie

## Wskazówki i strategie

### Dla początkujących
1. Staraj się blokować przeciwnika gdy ma 3-4 symbole w linii
2. Buduj własne linie w wielu kierunkach jednocześnie
3. Zwracaj uwagę na przekątne - często są pomijane

### Dla zaawansowanych
1. Twórz "widelce" - sytuacje gdzie masz dwie groźby jednocześnie
2. Kontroluj centrum planszy na większych planszach
3. Planuj kilka ruchów do przodu
4. Śledź wolne pola - gdy ich mało, graj obronnie

### Na dużych planszach (10×10+)
1. Gra jest bardziej strategiczna
2. Trudniej wygrać szybko
3. Ważna jest pozycja początkowa
4. Warto zajmować centralne obszary

## Rozwiązywanie problemów

### Gra nie zapisuje się do Firebase
- Sprawdź czy jesteś zalogowany
- Sprawdź połączenie z internetem
- Sprawdź konfigurację Firebase w `.env.local`

### Nie mogę się zalogować
- Sprawdź poprawność email i hasła
- Hasło musi mieć min. 6 znaków
- Upewnij się że konto zostało utworzone

### Plansza jest za duża/mała
- Zmień "Rozmiar pola" w konfiguracji
- Zmień "Rozmiar planszy" dla mniej/więcej pól
- Na urządzeniach mobilnych używaj mniejszych wartości

### Symbole są niewidoczne
- Sprawdź kolory - mogą być zbyt jasne
- Zwiększ "Rozmiar symbolu"
- Zmień kontrastujące kolory

## Urządzenia mobilne

### Optymalne ustawienia
- Rozmiar planszy: 5-7
- Rozmiar pola: 40-60px
- Rozmiar symbolu: 25-40px

### Wskazówki
- Trzymaj urządzenie poziomo dla większej planszy
- Używaj gestów przewijania jeśli plansza wykracza poza ekran
- Menu konfiguracji automatycznie dostosowuje się do rozmiaru ekranu

## Skróty klawiszowe

Obecnie brak, ale możesz zaproponować dodanie!

## Kontakt i zgłaszanie błędów

Jeśli znajdziesz błąd lub masz sugestie:
1. Zobacz sekcję "O projekcie" dla informacji o autorze
2. Zgłoś przez repozytorium GitHub
3. Napisz email do autora (zobacz app/about/page.tsx)

---

**Miłej gry! 🎮**
