'use client'
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";

export default function LogoutForm() {
  const router = useRouter();
  const { user } = useAuth();
  
  const onSubmit = (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };
  
  if (!user) {
    return (
      <div style={{ maxWidth: '400px', margin: '50px auto' }}>
        <div className="card">
          <h1 className="text-center mb-3">Nie jesteś zalogowany</h1>
          <p className="text-center" style={{ color: '#666' }}>
            Musisz się zalogować, aby móc się wylogować.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <div className="card">
        <h1 className="text-center mb-3">Wylogowanie</h1>
        <p className="text-center mb-2" style={{ color: '#666' }}>
          Jesteś zalogowany jako: <strong>{user.email}</strong>
        </p>
        
        <form onSubmit={onSubmit}>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%' }}
          >
            Wyloguj się
          </button>
          
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <a href="/" style={{ color: '#666' }}>
              ← Powrót do strony głównej
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
