'use client';

import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";

export default function Navigation() {
  const { user, logout } = useAuth();

  return (
    <nav className="nav">
      <div className="nav-container">
        <div>
          <Link href="/" style={{ fontWeight: 'bold', fontSize: '18px' }}>
            Kółko i krzyżyk
          </Link>
        </div>
        
        <ul className="nav-links">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/game">Gra</Link>
          </li>
          <li>
            <Link href="/about">O projekcie</Link>
          </li>
          {user && (
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
          )}
        </ul>

        <div className="nav-auth">
          {user ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {user.photoURL && (
                  <img 
                    src={user.photoURL} 
                    alt="Profile" 
                    style={{ 
                      width: '32px', 
                      height: '32px', 
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }}
                  />
                )}
                <span style={{ fontSize: '14px' }}>
                  {user.displayName || user.email}
                </span>
                <Link href="/user/profile" className="btn btn-secondary">
                  Profil
                </Link>
                <Link href="/user/signout" className="btn btn-secondary">
                  Wyloguj
                </Link>
              </div>
            </>
          ) : (
            <>
              <Link href="/user/signin" className="btn btn-primary">
                Zaloguj się
              </Link>
              <Link href="/user/register" className="btn btn-secondary">
                Zarejestruj
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
