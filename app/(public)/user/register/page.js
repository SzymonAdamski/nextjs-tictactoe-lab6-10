'use client'
import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";

export default function RegisterForm() {
  const router = useRouter();
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Jeśli użytkownik już zalogowany, przekieruj
  if (user) {
    router.push("/");
    return null;
  }
  
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
        console.log("User registered!");
        // Wyślij email weryfikacyjny
        sendEmailVerification(userCredential.user)
          .then(() => {
            console.log("Email verification sent!");
            // Przekieruj do strony weryfikacji
            router.push("/user/verify");
          })
          .catch((error) => {
            console.error("Error sending verification email:", error);
            setError("Nie udało się wysłać emaila weryfikacyjnego");
            setLoading(false);
          });
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        
        if (errorCode === 'auth/email-already-in-use') {
          setError('Ten adres email jest już używany. Użyj innego adresu lub zaloguj się.');
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
