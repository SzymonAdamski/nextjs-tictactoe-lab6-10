import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '100px 20px' }}>
      <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '96px', color: 'var(--primary-color)', margin: '0' }}>404</h1>
        <h2 className="mb-2">Strona nie znaleziona</h2>
        <p style={{ color: '#666', marginBottom: '30px' }}>
          Przepraszamy, strona której szukasz nie istnieje.
        </p>
        <Link href="/" className="btn btn-primary">
          ← Powrót do strony głównej
        </Link>
      </div>
    </div>
  );
}
