'use client'
import { updateProfile } from "firebase/auth";
import { useAuth } from "@/lib/AuthContext";
import { useState, useEffect } from "react";
import Link from "next/link";
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function ProfileForm() {
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [address, setAddress] = useState({
    street: "",
    city: "",
    zipCode: ""
  });

  // Wczytaj dane adresowe z Firestore
  useEffect(() => {
    if (user) {
      loadUserAddress();
    }
  }, [user]);

  const loadUserAddress = async () => {
    setDataLoading(true);
    try {
      const snapshot = await getDoc(doc(db, "users", user.uid));
      if (snapshot.exists()) {
        const data = snapshot.data();
        if (data.address) {
          setAddress(data.address);
        }
      }
    } catch (error) {
      console.error("Error loading address:", error);
    } finally {
      setDataLoading(false);
    }
  };
  
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
  
  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    
    const displayName = e.target["displayName"].value;
    const photoURL = e.target["photoURL"].value;
    const street = e.target["street"].value;
    const city = e.target["city"].value;
    const zipCode = e.target["zipCode"].value;
    
    try {
      // Aktualizuj profil w Firebase Auth
      await updateProfile(user, {
        displayName: displayName,
        photoURL: photoURL,
      });
      
      // Zapisz adres w Firestore
      await setDoc(doc(db, "users", user.uid), {
        address: {
          city: city,
          street: street,
          zipCode: zipCode
        },
        displayName: displayName,
        photoURL: photoURL,
        email: user.email,
        updatedAt: new Date().toISOString()
      });
      
      console.log("Profile and address updated");
      setSuccess("Profil i adres zostały zaktualizowane pomyślnie!");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.code === 'permission-denied') {
        setError('Brak uprawnień do zapisu danych. Zaloguj się ponownie.');
      } else {
        setError(error.message);
      }
      console.error("Error updating profile:", error);
    }
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
              disabled={dataLoading}
            />
            <small style={{ color: '#666', fontSize: '12px' }}>
              Wklej link do swojego zdjęcia profilowego
            </small>
          </div>

          <h3 style={{ marginTop: '20px', marginBottom: '10px' }}>📍 Adres</h3>

          <div className="form-group">
            <label className="form-label">Ulica</label>
            <input
              id="street"
              name="street"
              type="text"
              className="form-input"
              placeholder="np. Kwiatowa 15"
              value={address.street}
              onChange={(e) => setAddress({ ...address, street: e.target.value })}
              disabled={dataLoading}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Miasto</label>
            <input
              id="city"
              name="city"
              type="text"
              className="form-input"
              placeholder="np. Warszawa"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              disabled={dataLoading}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Kod pocztowy</label>
            <input
              id="zipCode"
              name="zipCode"
              type="text"
              className="form-input"
              placeholder="np. 00-001"
              value={address.zipCode}
              onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
              disabled={dataLoading}
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
            disabled={loading || dataLoading}
            className="btn btn-primary"
            style={{ width: '100%' }}
          >
            {dataLoading ? 'Ładowanie danych...' : loading ? 'Zapisywanie...' : 'Zapisz zmiany'}
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
