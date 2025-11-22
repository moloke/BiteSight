import { useState, useEffect } from 'react';
import { User } from '@/types/User';
import { onAuthStateChanged, signInAnonymously, signOut } from '@/services/firebase/auth';

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const signIn = async () => {
        try {
            setLoading(true);
            setError(null);
            const user = await signInAnonymously();
            setUser(user);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    const handleSignOut = async () => {
        try {
            setLoading(true);
            setError(null);
            await signOut();
            setUser(null);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    return {
        user,
        loading,
        error,
        signIn,
        signOut: handleSignOut,
        isAuthenticated: !!user,
    };
}
