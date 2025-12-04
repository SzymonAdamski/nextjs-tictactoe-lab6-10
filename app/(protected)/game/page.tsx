'use client';

import TicTacToe from '@/components/TicTacToe';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function GameContent() {
  const searchParams = useSearchParams();
  const loadGameId = searchParams.get('loadGameId');

  return (
    <div>
      <h1 className="text-center mb-3">Kółko i krzyżyk</h1>
      
      <div className="card mb-2">
        <h3>Instrukcja gry</h3>
        <ul style={{ marginLeft: '20px', lineHeight: '1.8' }}>
          <li>Kliknij na wolne pole, aby postawić swój symbol (X lub O)</li>
          <li>Gracze wykonują ruchy na zmianę</li>
          <li>Celem jest ułożenie 5 (lub innej skonfigurowanej liczby) symboli w linii</li>
          <li>Linia może być pozioma, pionowa lub po przekątnej</li>
          <li>Gra kończy się gdy jeden z graczy wygra lub wszystkie pola będą zajęte (remis)</li>
          <li>Gry są automatycznie zapisywane w przeglądarce (localStorage)</li>
        </ul>
      </div>

      <TicTacToe loadGameId={loadGameId} />
    </div>
  );
}

export default function GamePage() {
  return (
    <Suspense fallback={<div>Ładowanie...</div>}>
      <GameContent />
    </Suspense>
  );
}
