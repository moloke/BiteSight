import { useState, useEffect } from 'react';
import { Scan } from '@/types/Scan';
import { MenuItem } from '@/types/MenuItem';
import { subscribeToScans, getFavorites } from '@/services/firebase/firestore';

/**
 * Hook to subscribe to user's scans in real-time
 */
export function useScans(userId: string | undefined) {
    const [scans, setScans] = useState<Scan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!userId) {
            setScans([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        const unsubscribe = subscribeToScans(
            userId,
            (scans) => {
                setScans(scans);
                setLoading(false);
            }
        );

        return unsubscribe;
    }, [userId]);

    return { scans, loading, error };
}

/**
 * Hook to get user's favorite items
 */
export function useFavorites(userId: string | undefined) {
    const [favorites, setFavorites] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!userId) {
            setFavorites([]);
            setLoading(false);
            return;
        }

        const loadFavorites = async () => {
            try {
                setLoading(true);
                const items = await getFavorites(userId);
                setFavorites(items);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        loadFavorites();
    }, [userId]);

    return { favorites, loading, error, refetch: () => { } };
}
