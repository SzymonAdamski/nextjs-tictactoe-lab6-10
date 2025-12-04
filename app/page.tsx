import Link from "next/link";

export default function Home() {
  return (
    <div>
      <section className="hero">
        <h1>Laboratorium 6 - Temat 5</h1>
        <p>Gra w kółko i krzyżyk na planszy nxn</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <Link href="/game" className="btn btn-primary">
            Graj teraz
          </Link>
          <Link href="/about" className="btn btn-secondary">
            O projekcie
          </Link>
        </div>
      </section>

      <section className="grid grid-3">
        <div className="card">
          <h3 className="card-title">🔐 Uwierzytelnianie</h3>
          <p className="card-content">
            System rejestracji i logowania oparty na localStorage
          </p>
        </div>

        <div className="card">
          <h3 className="card-title">📱 Responsywność</h3>
          <p className="card-content">
            Dostosowanie do urządzeń mobilnych, tabletów i monitorów
          </p>
        </div>

        <div className="card">
          <h3 className="card-title">💾 Zapis stanu gry</h3>
          <p className="card-content">
            Zapisywanie gier lokalnie w przeglądarce (localStorage)
          </p>
        </div>

        <div className="card">
          <h3 className="card-title">⭕ Plansza nxn</h3>
          <p className="card-content">
            Konfigurowalna wielkość planszy (5x5, 10x10, itp.)
          </p>
        </div>

        <div className="card">
          <h3 className="card-title">🎨 Konfiguracja wyglądu</h3>
          <p className="card-content">
            Kolory tła, symboli, krawędzi, rozmiary
          </p>
        </div>

        <div className="card">
          <h3 className="card-title">🏆 Wykrywanie wygranej</h3>
          <p className="card-content">
            Automatyczne wykrywanie 5 kolejnych symboli
          </p>
        </div>
      </section>

      <section className="mt-3">
        <div className="card">
          <h3>Funkcjonalności gry:</h3>
          <ul style={{ marginLeft: '20px', lineHeight: '1.8' }}>
            <li>Wstawianie symbolu X lub O w wolnym polu</li>
            <li>Zapisywanie i wczytywanie stanu gry</li>
            <li>Wyświetlanie liczby ruchów i wolnych pól</li>
            <li>Informacja o wygranej lub remisie</li>
            <li>Blokada ruchu po wygranej</li>
            <li>Pełna konfiguracja wyglądu planszy</li>
          </ul>
          <Link href="/game" className="btn btn-primary mt-2">
            Rozpocznij grę
          </Link>
        </div>
      </section>
    </div>
  );
}
