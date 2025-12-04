'use client'
import { updateProfile } from "firebase/auth";
import { useAuth } from "@/lib/AuthContext";
import { useState } from "react";
import Link from "next/link";

export default function ProfileForm() {
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  
  if (!user) {
    return (
      <div style={{ maxWidth: '500px', margin: '50px auto' }}>
        <div className="card">
          <h1 className="text-center mb-3">Brak dostępu</h1>
          <p className="text-center" style={{ color: '#666' }}>
            Musisz być zalogowany, aby zobaczyć profil.
          </p>
          <Link href="/user/signin" className="btn btn-primary" style={{ width: '100%', textAlign: 'center', display: 'block' }}>
            Zaloguj się
          </Link>
        </div>
      </div>
    );
  }
  
  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    
    const displayName = e.target["displayName"].value;
    const photoURL = e.target["photoURL"].value;
    
    updateProfile(user, {
      displayName: displayName,
      photoURL: photoURL,
    })
      .then(() => {
        console.log("Profile updated");
        setSuccess("Profil został zaktualizowany pomyślnie!");
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
        console.error("Error updating profile:", error);
      });
  };
  
  return (
    <div style={{ maxWidth: '500px', margin: '50px auto' }}>
      <div className="card">
        <h1 className="text-center mb-3">👤 Profil użytkownika</h1>
        
        {user.photoURL && (
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <img 
              src={user.photoURL} 
              alt="Zdjęcie profilowe" 
              style={{ 
                width: '100px', 
                height: '100px', 
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid var(--primary-color)'
              }}
            />
          </div>
        )}
        
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label className="form-label">Email (tylko odczyt)</label>
            <input
              type="email"
              className="form-input"
              value={user.email || ""}
              disabled
              style={{ background: '#f5f5f5', cursor: 'not-allowed' }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Nazwa wyświetlana</label>
            <input
              id="displayName"
              name="displayName"
              type="text"
              className="form-input"
              placeholder="Twoja nazwa"
              defaultValue={user.displayName || ""}
            />
          </div>

          <div className="form-group">
            <label className="form-label">URL zdjęcia profilowego</label>
            <input
              id="photoURL"
              name="photoURL"
              type="url"
              className="form-input"
              placeholder="https://example.com/photo.jpg"
              defaultValue={user.photoURL || ""}
            />
            <small style={{ color: '#666', fontSize: '12px' }}>
              Wklej link do swojego zdjęcia profilowego
            </small>
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
            {loading ? 'Zapisywanie...' : 'Zapisz zmiany'}
          </button>

          <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
            <Link href="/user/changepassword" className="btn btn-secondary" style={{ flex: 1, textAlign: 'center' }}>
              Zmień hasło
            </Link>
            <Link href="/user/signout" className="btn btn-secondary" style={{ flex: 1, textAlign: 'center' }}>
              Wyloguj się
            </Link>
          </div>

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
