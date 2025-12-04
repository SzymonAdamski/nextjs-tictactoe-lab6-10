import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-extrabold text-blue-600">404</h1>
        <h2 className="mt-4 text-3xl font-bold text-gray-900">Strona nie znaleziona</h2>
        <p className="mt-2 text-gray-600">
          Przepraszamy, strona której szukasz nie istnieje.
        </p>
        <div className="mt-6">
          <Link 
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            ← Powrót do strony głównej
          </Link>
        </div>
      </div>
    </div>
  );
}
