'use client'
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function VerifyEmail() {
  const { user } = useAuth();
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  
  useEffect(() => {
    if (user) {
      setUserEmail(user.email);
      // Automatyczne wylogowanie
      signOut(auth)
        .then(() => {
          console.log("User signed out after registration");
        })
        .catch((error) => {
          console.error("Error signing out:", error);
        });
    }
  }, [user]);
  
  return (
    <div style={{ maxWidth: '500px', margin: '50px auto' }}>
      <div className="card">
        <h1 className="text-center mb-3">📧 Weryfikacja adresu email</h1>
        
        <div style={{ 
          padding: '20px', 
          background: '#fff3cd', 
          borderRadius: '5px',
          marginBottom: '20px',
          border: '1px solid #ffc107'
        }}>
          <p style={{ margin: 0, lineHeight: '1.6' }}>
            <strong>Email nie został zweryfikowany.</strong>
          </p>
          <p style={{ margin: '10px 0 0 0', lineHeight: '1.6' }}>
            Wysłaliśmy wiadomość weryfikacyjną na adres: <strong>{userEmail}</strong>
          </p>
        </div>
        
        <div style={{ lineHeight: '1.8', marginBottom: '20px' }}>
          <h3>Następne kroki:</h3>
          <ol style={{ marginLeft: '20px' }}>
            <li>Sprawdź swoją skrzynkę pocztową (również folder spam)</li>
            <li>Kliknij w link weryfikacyjny w otrzymanym emailu</li>
            <li>Po weryfikacji wróć tutaj i zaloguj się</li>
          </ol>
        </div>
        
        <div style={{ 
          padding: '15px', 
          background: '#e7f3ff', 
          borderRadius: '5px',
          marginBottom: '20px'
        }}>
          <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
            💡 <strong>Wskazówka:</strong> Link weryfikacyjny jest ważny przez 24 godziny.
            Jeśli nie otrzymałeś emaila, możesz zarejestrować się ponownie.
          </p>
        </div>
        
        <Link href="/user/signin" className="btn btn-primary" style={{ width: '100%', textAlign: 'center', display: 'block' }}>
          Przejdź do logowania
        </Link>
        
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link href="/" style={{ color: '#666' }}>
            ← Powrót do strony głównej
          </Link>
        </div>
      </div>
    </div>
  );
}
