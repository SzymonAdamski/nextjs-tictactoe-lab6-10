'use client'
import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function SignInForm() {
  const params = useSearchParams();
  const router = useRouter();
  const returnUrl = params.get("returnUrl") || "/";
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
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
            router.push(returnUrl);
          })
          .catch((error) => {
            setLoading(false);
            const errorCode = error.code;
            const errorMessage = error.message;
            
            if (errorCode === 'auth/invalid-credential') {
              setError('Nieprawidłowy email lub hasło');
            } else if (errorCode === 'auth/user-not-found') {
              setError('Użytkownik nie istnieje');
            } else if (errorCode === 'auth/wrong-password') {
              setError('Nieprawidłowe hasło');
            } else if (errorCode === 'auth/too-many-requests') {
              setError('Zbyt wiele prób logowania. Spróbuj później');
            } else {
              setError(errorMessage);
            }
          });
      })
      .catch(error => {
        setLoading(false);
        setError('Wystąpił błąd podczas logowania');
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Zaloguj się do konta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Lub{' '}
            <Link href="/user/register" className="font-medium text-blue-600 hover:text-blue-500">
              utwórz nowe konto
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Adres email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Adres email"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Hasło
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Hasło"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    {error}
                  </h3>
                </div>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logowanie...' : 'Zaloguj się'}
            </button>
          </div>

          <div className="text-center">
            <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
              ← Powrót do strony głównej
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
