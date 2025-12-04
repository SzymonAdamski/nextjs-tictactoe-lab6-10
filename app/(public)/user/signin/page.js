'use client'
import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

function SignInFormContent() {
  const router = useRouter();
  const [returnUrl, setReturnUrl] = useState("/");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const searchParams = new URLSearchParams(window.location.search);
    const redirectTarget = searchParams.get("returnUrl");

    if (redirectTarget) {
      setReturnUrl(redirectTarget);
    }
  }, []);
  
  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    const email = e.target["email"].value;
    const password = e.target["password"].value;
    
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Sprawdź czy email został zweryfikowany
            if (!userCredential.user.emailVerified) {
              setLoading(false);
              setError('Email nie został zweryfikowany. Sprawdź swoją skrzynkę pocztową.');
              // Przekieruj do strony weryfikacji
              router.push("/user/verify");
              return;
            }
            router.push(returnUrl);
          })
          .catch((error) => {
            setLoading(false);
            const errorCode = error.code;
            
            if (errorCode === 'auth/invalid-credential') {
              setError('Nieprawidłowy email lub hasło');
            } else if (errorCode === 'auth/user-not-found') {
              setError('Użytkownik nie istnieje');
            } else if (errorCode === 'auth/wrong-password') {
              setError('Nieprawidłowe hasło');
            } else if (errorCode === 'auth/too-many-requests') {
              setError('Zbyt wiele prób logowania. Spróbuj później');
            } else {
              setError(error.message);
            }
          });
      })
      .catch(error => {
        setLoading(false);
        setError('Wystąpił błąd podczas logowania');
      });
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <div className="card">
        <h1 className="text-center mb-3">Zaloguj się</h1>
        <p className="text-center mb-2" style={{ color: '#666' }}>
          Nie masz konta?{' '}
          <Link href="/user/register" style={{ color: 'var(--primary-color)' }}>
            Zarejestruj się
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
            {loading ? 'Logowanie...' : 'Zaloguj się'}
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

export default function SignInForm() {
  return <SignInFormContent />;
}
