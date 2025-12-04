'use client'
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { useAuth } from "@/lib/AuthContext";
import { useState } from "react";
import Link from "next/link";

export default function ChangePasswordForm() {
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  
  if (!user) {
    return (
      <div style={{ maxWidth: '400px', margin: '50px auto' }}>
        <div className="card">
          <h1 className="text-center mb-3">Brak dostępu</h1>
          <p className="text-center" style={{ color: '#666' }}>
            Musisz być zalogowany, aby zmienić hasło.
          </p>
          <Link href="/user/signin" className="btn btn-primary" style={{ width: '100%', textAlign: 'center', display: 'block' }}>
            Zaloguj się
          </Link>
        </div>
      </div>
    );
  }
  
  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    
    const currentPassword = e.target["currentPassword"].value;
    const newPassword = e.target["newPassword"].value;
    const confirmPassword = e.target["confirmPassword"].value;
    
    // Walidacja
    if (newPassword !== confirmPassword) {
      setError("Nowe hasła nie są identyczne");
      setLoading(false);
      return;
    }
    
    if (newPassword.length < 6) {
      setError("Nowe hasło musi mieć minimum 6 znaków");
      setLoading(false);
      return;
    }
    
    if (currentPassword === newPassword) {
      setError("Nowe hasło musi być inne niż obecne");
      setLoading(false);
      return;
    }
    
    try {
      // Reautentykacja wymagana przed zmianą hasła
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      
      await reauthenticateWithCredential(user, credential);
      
      // Zmiana hasła
      await updatePassword(user, newPassword);
      
      setSuccess("Hasło zostało zmienione pomyślnie!");
      setLoading(false);
      
      // Wyczyść formularz
      e.target.reset();
      
    } catch (error) {
      setLoading(false);
      const errorCode = error.code;
      
      if (errorCode === 'auth/wrong-password') {
        setError('Obecne hasło jest nieprawidłowe');
      } else if (errorCode === 'auth/weak-password') {
        setError('Nowe hasło jest zbyt słabe');
      } else if (errorCode === 'auth/requires-recent-login') {
        setError('Zaloguj się ponownie przed zmianą hasła');
      } else {
        setError(error.message);
      }
      console.error("Error changing password:", error);
    }
  };
  
  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <div className="card">
        <h1 className="text-center mb-3">🔐 Zmiana hasła</h1>
        <p className="text-center mb-2" style={{ color: '#666' }}>
          Konto: <strong>{user.email}</strong>
        </p>
        
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label className="form-label">Obecne hasło</label>
            <input
              id="currentPassword"
              name="currentPassword"
              type="password"
              required
              className="form-input"
              placeholder="••••••••"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Nowe hasło</label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              required
              className="form-input"
              placeholder="••••••••"
              minLength={6}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Potwierdź nowe hasło</label>
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

          {success && (
            <div style={{ 
              padding: '10px', 
              background: '#d4edda', 
              color: '#155724',
              borderRadius: '5px',
              marginBottom: '15px'
            }}>
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%' }}
          >
            {loading ? 'Zmiana hasła...' : 'Zmień hasło'}
          </button>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Link href="/user/profile" style={{ color: 'var(--primary-color)' }}>
              ← Powrót do profilu
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
