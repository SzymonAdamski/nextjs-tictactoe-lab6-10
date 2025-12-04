'use client'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    const email = e.target["email"].value;
    const password = e.target["password"].value;
    const confirmPassword = e.target["confirmPassword"].value;
    
    if (password !== confirmPassword) {
      setError("Hasła nie są identyczne");
      setLoading(false);
      return;
    }
    
    if (password.length < 6) {
      setError("Hasło musi mieć minimum 6 znaków");
      setLoading(false);
      return;
    }
    
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert('Konto utworzone! Teraz możesz się zalogować.');
        router.push("/user/signin");
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        
        if (errorCode === 'auth/email-already-in-use') {
          setError('Ten adres email jest już używany');
        } else if (errorCode === 'auth/invalid-email') {
          setError('Nieprawidłowy adres email');
        } else if (errorCode === 'auth/weak-password') {
          setError('Hasło jest zbyt słabe');
        } else {
          setError(error.message);
        }
      });
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <div className="card">
        <h1 className="text-center mb-3">Rejestracja</h1>
        <p className="text-center mb-2" style={{ color: '#666' }}>
          Masz już konto?{' '}
          <Link href="/user/signin" style={{ color: 'var(--primary-color)' }}>
            Zaloguj się
          </Link>
        </p>
        
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="form-input"
              placeholder="twoj@email.com"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Hasło</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="form-input"
              placeholder="••••••••"
              minLength={6}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Potwierdź hasło</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              className="form-input"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div style={{ 
              padding: '10px', 
              background: '#fee', 
              color: '#c33',
              borderRadius: '5px',
              marginBottom: '15px'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%' }}
          >
            {loading ? 'Tworzenie konta...' : 'Zarejestruj się'}
          </button>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Link href="/" style={{ color: '#666' }}>
              ← Powrót do strony głównej
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
