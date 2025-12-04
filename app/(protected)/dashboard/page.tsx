'use client';

import { useAuth } from '@/lib/AuthContext';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface SavedGame {
  id: string;
  timestamp: string;
  gameState: {
    xMoves: number;
    oMoves: number;
    winner: string | null;
    config: {
      boardSize: number;
    };
  };
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [games, setGames] = useState<SavedGame[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadGames();
    }
  }, [user]);

  const loadGames = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Pobierz gry z Firestore (bez orderBy - nie wymaga indeksu)
      const q = query(
        collection(db, 'games'),
        where('userId', '==', user.uid)
      );
      
      const querySnapshot = await getDocs(q);
      const firestoreGames = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          timestamp: data.createdAt,
          gameState: {
            xMoves: data.xMoves,
            oMoves: data.oMoves,
            winner: data.winner,
            config: data.config || { boardSize: data.boardSize },
          },
        };
      });
      
      // Sortuj lokalnie
      firestoreGames.sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      
      setGames(firestoreGames);
      setLoading(false);
    } catch (error) {
      console.error('Error loading games:', error);
      // Fallback do localStorage jeśli Firestore nie działa
      const savedGames = JSON.parse(localStorage.getItem('savedGames') || '[]');
      setGames(savedGames);
      setLoading(false);
    }
  };

  const deleteGame = async (gameId: string) => {
    if (!confirm('Czy na pewno chcesz usunąć tę grę?')) return;

    try {
      // Usuń z Firestore
      await deleteDoc(doc(db, 'games', gameId));
      
      // Odśwież listę
      setGames(games.filter(g => g.id !== gameId));
      alert('Gra usunięta!');
    } catch (error) {
      console.error('Error deleting game:', error);
      alert('Błąd podczas usuwania gry');
    }
  };

  return (
    <div>
      <h1 className="text-center mb-3">Panel użytkownika</h1>
      
      <div className="card mb-2">
        <h3>👋 Witaj, {user?.displayName || user?.email}!</h3>
        <p>To jest chroniona strona dostępna tylko po zalogowaniu.</p>
      </div>

      <div className="card mb-2">
        <h3 className="mb-2">🎮 Twoje zapisane gry ({games.length})</h3>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '30px' }}>
            <p>Ładowanie gier z Firebase...</p>
          </div>
        ) : games.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px', color: '#666' }}>
            <p>Nie masz jeszcze żadnych zapisanych gier.</p>
            <Link href="/game" className="btn btn-primary mt-2">
              Rozpocznij nową grę
            </Link>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #ddd' }}>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Data</th>
                  <th style={{ padding: '10px', textAlign: 'center' }}>Rozmiar</th>
                  <th style={{ padding: '10px', textAlign: 'center' }}>Ruchy X</th>
                  <th style={{ padding: '10px', textAlign: 'center' }}>Ruchy O</th>
                  <th style={{ padding: '10px', textAlign: 'center' }}>Status</th>
                  <th style={{ padding: '10px', textAlign: 'center' }}>Akcje</th>
                </tr>
              </thead>
              <tbody>
                {games.map((game) => (
                  <tr key={game.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '10px' }}>
                      {new Date(game.timestamp).toLocaleString('pl-PL')}
                    </td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>
                      {game.gameState.config.boardSize}×{game.gameState.config.boardSize}
                    </td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>
                      {game.gameState.xMoves}
                    </td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>
                      {game.gameState.oMoves}
                    </td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>
                      {game.gameState.winner 
                        ? game.gameState.winner === 'draw' 
                          ? '🤝 Remis' 
                          : `🏆 Wygrana: ${game.gameState.winner}`
                        : '⏳ W trakcie'
                      }
                    </td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>
                      <Link 
                        href={`/game?loadGameId=${game.id}`}
                        className="btn btn-primary"
                        style={{ fontSize: '12px', padding: '5px 10px', marginRight: '5px' }}
                      >
                        📂 Wczytaj
                      </Link>
                      <button 
                        onClick={() => deleteGame(game.id)}
                        className="btn btn-secondary"
                        style={{ fontSize: '12px', padding: '5px 10px' }}
                      >
                        🗑️ Usuń
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="card">
        <h3 className="mb-2">Statystyki</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
          <div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--primary-color)' }}>
              {games.length}
            </div>
            <div style={{ color: '#666' }}>Zapisanych gier</div>
          </div>
          <div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#e74c3c' }}>
              {games.filter(g => g.gameState.winner === 'X').length}
            </div>
            <div style={{ color: '#666' }}>Wygranych X</div>
          </div>
          <div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#3498db' }}>
              {games.filter(g => g.gameState.winner === 'O').length}
            </div>
            <div style={{ color: '#666' }}>Wygranych O</div>
          </div>
          <div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#95a5a6' }}>
              {games.filter(g => g.gameState.winner === 'draw').length}
            </div>
            <div style={{ color: '#666' }}>Remisów</div>
          </div>
        </div>
      </div>
    </div>
  );
}
