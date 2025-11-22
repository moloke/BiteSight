import firestore from '@react-native-firebase/firestore';
import { Scan, ParsedScan } from '@/types/Scan';
import { MenuItem } from '@/types/MenuItem';
import { UserSettings } from '@/types/User';

/**
 * Save a scan to user's history
 */
export async function saveScan(userId: string, scan: Scan): Promise<string> {
    try {
        const docRef = await firestore()
            .collection('users')
            .doc(userId)
            .collection('scans')
            .add({
                ...scan,
                createdAt: firestore.FieldValue.serverTimestamp(),
            });

        return docRef.id;
    } catch (error) {
        console.error('Error saving scan:', error);
        throw error;
    }
}

/**
 * Get user's scan history
 */
export async function getScans(userId: string, limit: number = 50): Promise<Scan[]> {
    try {
        const snapshot = await firestore()
            .collection('users')
            .doc(userId)
            .collection('scans')
            .orderBy('createdAt', 'desc')
            .limit(limit)
            .get();

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate().toISOString(),
        })) as Scan[];
    } catch (error) {
        console.error('Error getting scans:', error);
        throw error;
    }
}

/**
 * Subscribe to user's scans in real-time
 */
export function subscribeToScans(
    userId: string,
    callback: (scans: Scan[]) => void,
    limit: number = 50
): () => void {
    return firestore()
        .collection('users')
        .doc(userId)
        .collection('scans')
        .orderBy('createdAt', 'desc')
        .limit(limit)
        .onSnapshot(
            (snapshot) => {
                const scans = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    createdAt: doc.data().createdAt?.toDate().toISOString(),
                })) as Scan[];
                callback(scans);
            },
            (error) => {
                console.error('Error subscribing to scans:', error);
            }
        );
}

/**
 * Save a favorite menu item
 */
export async function saveFavorite(userId: string, item: MenuItem): Promise<void> {
    try {
        await firestore()
            .collection('users')
            .doc(userId)
            .collection('favorites')
            .doc(item.id)
            .set({
                ...item,
                favoritedAt: firestore.FieldValue.serverTimestamp(),
            });
    } catch (error) {
        console.error('Error saving favorite:', error);
        throw error;
    }
}

/**
 * Remove a favorite menu item
 */
export async function removeFavorite(userId: string, itemId: string): Promise<void> {
    try {
        await firestore()
            .collection('users')
            .doc(userId)
            .collection('favorites')
            .doc(itemId)
            .delete();
    } catch (error) {
        console.error('Error removing favorite:', error);
        throw error;
    }
}

/**
 * Get user's favorite items
 */
export async function getFavorites(userId: string): Promise<MenuItem[]> {
    try {
        const snapshot = await firestore()
            .collection('users')
            .doc(userId)
            .collection('favorites')
            .orderBy('favoritedAt', 'desc')
            .get();

        return snapshot.docs.map(doc => doc.data()) as MenuItem[];
    } catch (error) {
        console.error('Error getting favorites:', error);
        throw error;
    }
}

/**
 * Update user settings
 */
export async function updateUserSettings(
    userId: string,
    settings: Partial<UserSettings>
): Promise<void> {
    try {
        await firestore()
            .collection('users')
            .doc(userId)
            .set(
                { settings },
                { merge: true }
            );
    } catch (error) {
        console.error('Error updating user settings:', error);
        throw error;
    }
}

/**
 * Get user settings
 */
export async function getUserSettings(userId: string): Promise<UserSettings | null> {
    try {
        const doc = await firestore()
            .collection('users')
            .doc(userId)
            .get();

        return doc.data()?.settings || null;
    } catch (error) {
        console.error('Error getting user settings:', error);
        throw error;
    }
}
