'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const { login, register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isRegistering) {
        const success = await register(email, password, name);
        if (success) {
          alert('Konto utworzone! Teraz możesz się zalogować.');
          setIsRegistering(false);
          setPassword('');
          setName('');
        } else {
          setError('Ten adres email jest już używany');
        }
      } else {
        const success = await login(email, password);
        if (success) {
          router.push('/game');
        } else {
          setError('Błędny email lub hasło');
        }
      }
    } catch (error) {
      setError('Wystąpił błąd. Spróbuj ponownie.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <div className="card">
        <h1 className="text-center mb-3">{isRegistering ? 'Rejestracja' : 'Logowanie'}</h1>
        
        <p className="text-center mb-2" style={{ color: '#666' }}>
          {isRegistering 
            ? 'Utwórz nowe konto, aby zapisywać gry'
            : 'Zaloguj się, aby uzyskać dostęp do zapisywania gier'
          }
        </p>

        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <div className="form-group">
              <label className="form-label">Imię</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
                required
                placeholder="Jan Kowalski"
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              required
              placeholder="twoj@email.com"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Hasło</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
              placeholder="••••••••"
              minLength={6}
            />
          </div>

          {error && (
            <div style={{ 
              padding: '10px', 
              background: '#fee', 
              color: '#c33',
              borderRadius: '5px',
              marginBottom: '15px',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            {isRegistering ? '📝 Zarejestruj się' : '🔐 Zaloguj się'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button 
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError('');
            }}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'var(--primary-color)',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            {isRegistering 
              ? 'Masz już konto? Zaloguj się'
              : 'Nie masz konta? Zarejestruj się'
            }
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
          <Link href="/" style={{ color: '#666' }}>
            ← Powrót do strony głównej
          </Link>
        </div>

        <div className="card" style={{ marginTop: '20px', background: '#f0f7ff' }}>
          <strong>💡 Wskazówka:</strong>
          <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>
            Dane są przechowywane lokalnie w przeglądarce (localStorage).
            Możesz utworzyć dowolne konto bez podawania prawdziwego emaila.
          </p>
        </div>
      </div>
    </div>
  );
}
