'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Przekieruj do nowego formularza Firebase
    router.push('/user/signin');
  }, [router]);

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
      <p>Przekierowywanie do logowania...</p>
    </div>
  );
}
