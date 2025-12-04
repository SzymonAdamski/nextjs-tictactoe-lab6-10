'use client'
import { useAuth } from "@/lib/AuthContext";
import { useEffect } from "react";
import { useRouter, usePathname } from 'next/navigation';

function Protected({children}) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const returnUrl = usePathname();

    useEffect(() => {
        if (!loading && !user) {
            window.location.href = `/user/signin?returnUrl=${returnUrl}`;
        }
    }, [user, loading, returnUrl]);
    
    // Pokaż loading podczas sprawdzania auth
    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '100px' }}>
                <p>Ładowanie...</p>
            </div>
        );
    }
    
    // Jeśli nie ma użytkownika, nie renderuj dzieci (przekierowuje się w useEffect)
    if (!user) {
        return null;
    }
    
    return <>{children}</>;
}

export default Protected;
