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
              <span style={{ fontSize: '14px' }}>{user.email}</span>
              <button onClick={logout} className="btn btn-secondary">
                Wyloguj
              </button>
            </>
          ) : (
            <Link href="/login" className="btn btn-primary">
              Zaloguj się
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
