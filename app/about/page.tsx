'use client';

export default function AboutPage() {
  return (
    <div>
      <h1 className="text-center mb-3">O projekcie i autorze</h1>
      
      <div className="card mb-2">
        <h2 className="mb-2">📝 O projekcie</h2>
        <p style={{ lineHeight: '1.8' }}>
          Projekt stworzony w ramach <strong>Laboratorium 6 - Temat 5</strong>. 
          Aplikacja webowa z grą w kółko i krzyżyk (Tic-Tac-Toe) zbudowana przy użyciu 
          nowoczesnych technologii webowych.
        </p>
        
        <h3 className="mt-2 mb-1">✨ Zrealizowane wymagania</h3>
        <ul style={{ marginLeft: '20px', lineHeight: '1.8' }}>
          <li>✅ <strong>Uwierzytelnianie użytkowników</strong> - system rejestracji i logowania z localStorage</li>
          <li>✅ <strong>Autoryzacja</strong> - chronione ścieżki dostępne tylko po zalogowaniu (/game, /dashboard)</li>
          <li>✅ <strong>Responsywny design</strong> - optymalizacja dla urządzeń mobilnych (480px), tabletów (768px) i desktopów</li>
          <li>✅ <strong>Strona informacyjna</strong> - pełna dokumentacja projektu i informacje o autorze</li>
          <li>✅ <strong>Zapis danych</strong> - localStorage do przechowywania użytkowników i historii gier</li>
          <li>✅ <strong>Prezentacja komponentów</strong> - interaktywny komponent gry z konfiguracją wyglądu</li>
        </ul>
      </div>

      <div className="card mb-2">
        <h2 className="mb-2">🎮 Funkcjonalności gry</h2>
        
        <h3 className="mb-1">Podstawowe</h3>
        <ul style={{ marginLeft: '20px', lineHeight: '1.8' }}>
          <li>Plansza o konfigurowalnym rozmiarze (3×3 do 20×20)</li>
          <li>Konfiguracja długości wygranej (3-10 symboli w linii)</li>
          <li>Automatyczna detekcja wygranej (poziomo, pionowo, przekątnie)</li>
          <li>Detekcja remisu</li>
          <li>Licznik ruchów dla każdego gracza</li>
          <li>Wyświetlanie liczby wolnych pól</li>
        </ul>

        <h3 className="mt-2 mb-1">Zaawansowane</h3>
        <ul style={{ marginLeft: '20px', lineHeight: '1.8' }}>
          <li>Zapis i wczytywanie gier z localStorage</li>
          <li>Historia wszystkich zapisanych gier</li>
          <li>Statystyki: wygrane X/O, remisky</li>
          <li>Pełna konfiguracja wyglądu (rozmiary, kolory)</li>
          <li>Renderowanie SVG dla symboli i planszy</li>
        </ul>
      </div>

      <div className="card mb-2">
        <h2 className="mb-2">🛠️ Technologie</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
          <div>
            <h3 style={{ color: 'var(--primary-color)' }}>Frontend</h3>
            <ul style={{ marginLeft: '20px', lineHeight: '1.8' }}>
              <li><strong>Next.js 14</strong> - React framework z App Router</li>
              <li><strong>TypeScript</strong> - Typowanie statyczne</li>
              <li><strong>React 18</strong> - Biblioteka UI</li>
              <li><strong>CSS3</strong> - Stylowanie responsywne</li>
              <li><strong>SVG</strong> - Grafika wektorowa</li>
            </ul>
          </div>

          <div>
            <h3 style={{ color: 'var(--primary-color)' }}>Backend/Storage</h3>
            <ul style={{ marginLeft: '20px', lineHeight: '1.8' }}>
              <li><strong>localStorage</strong> - Przechowywanie danych</li>
              <li><strong>React Context API</strong> - Zarządzanie stanem</li>
              <li><strong>Client-side auth</strong> - Uwierzytelnianie</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="card mb-2">
        <h2 className="mb-2">👨‍💻 Autor</h2>
        <div style={{ padding: '15px', background: '#f0f7ff', borderRadius: '5px' }}>
          <p><strong>Imię i nazwisko:</strong> Szymon Adamski</p>
          <p><strong>Nr indeksu:</strong> 15223</p>
          <p><strong>Grupa:</strong> lab1/3/PROGS</p>
          <p><strong>Data utworzenia:</strong> {new Date().toLocaleDateString('pl-PL')}</p>
          <p><strong>Email:</strong> szymon.adamski@microsoft.wsei.edu.pl</p>
        </div>

        <h3 className="mt-2 mb-1">📚 Dodatkowe informacje</h3>
        <p style={{ lineHeight: '1.8' }}>
          Projekt stworzony zgodnie z wytycznymi Laboratorium 6-10. 
          Wszystkie wymagane funkcjonalności zostały zaimplementowane i przetestowane.
          Aplikacja jest w pełni responsywna i działa na wszystkich współczesnych przeglądarkach.
        </p>
      </div>

      <div className="card">
        <h2 className="mb-2">📖 Dokumentacja</h2>
        <p style={{ lineHeight: '1.8' }}>
          Szczegółowa dokumentacja dostępna w plikach:
        </p>
        <ul style={{ marginLeft: '20px', lineHeight: '1.8' }}>
          <li><strong>README.md</strong> - Dokumentacja techniczna, instalacja, uruchomienie</li>
          <li><strong>INSTRUKCJA.md</strong> - Instrukcja użytkowania dla użytkownika końcowego</li>
        </ul>

        <h3 className="mt-2 mb-1">📂 Repozytorium</h3>
        <p style={{ lineHeight: '1.8' }}>
          Kod źródłowy projektu dostępny na platformie GitHub. 
          Projekt zawiera pełną historię commitów i dokumentację kodu.
        </p>
      </div>
    </div>
  );
}
