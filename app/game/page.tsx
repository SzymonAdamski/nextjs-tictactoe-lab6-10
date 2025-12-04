'use client';

import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import TicTacToe from '@/components/TicTacToe';

export default function GamePage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <div className="text-center" style={{ padding: '50px' }}>
        <h2>Przekierowywanie do logowania...</h2>
      </div>
    );
  }

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

      <TicTacToe />
    </div>
  );
}
