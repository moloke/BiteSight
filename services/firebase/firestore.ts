import {
    collection,
    doc,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    query,
    orderBy,
    limit,
    onSnapshot,
    setDoc,
    Timestamp,
} from 'firebase/firestore';
import { firestore } from './config';
import { Scan, ScanInput } from '@/types/Scan';
import { MenuItem } from '@/types/MenuItem';
import { UserSettings } from '@/types/User';

/**
 * Remove undefined values from an object
 */
function removeUndefined(obj: any): any {
    if (obj === null || obj === undefined) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(item => removeUndefined(item));
    }

    if (typeof obj === 'object') {
        const cleaned: any = {};
        Object.keys(obj).forEach(key => {
            const value = obj[key];
            if (value !== undefined) {
                cleaned[key] = removeUndefined(value);
            }
        });
        return cleaned;
    }

    return obj;
}

/**
 * Save a scan to user's history
 */
export async function saveScan(userId: string, scanInput: ScanInput): Promise<string> {
    try {
        const scansRef = collection(firestore, 'users', userId, 'scans');

        // Remove undefined values
        const cleanedData = removeUndefined({
            ...scanInput,
            userId,
            // Use the timestamp from scanInput (when photo was taken)
            // Only set createdAt/updatedAt if not already present
            createdAt: scanInput.timestamp || new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });

        const docRef = await addDoc(scansRef, cleanedData);

        return docRef.id;
    } catch (error) {
        console.error('Error saving scan:', error);
        throw error;
    }
}

/**
 * Update a scan
 */
export async function updateScan(
    userId: string,
    scanId: string,
    updates: Partial<Scan>
): Promise<void> {
    try {
        const scanRef = doc(firestore, 'users', userId, 'scans', scanId);
        await updateDoc(scanRef, {
            ...updates,
            updatedAt: new Date().toISOString(),
        });
    } catch (error) {
        console.error('Error updating scan:', error);
        throw error;
    }
}

/**
 * Safely convert a timestamp to ISO string
 */
function toISOString(timestamp: any): string {
    // Handle null/undefined
    if (timestamp === null || timestamp === undefined) {
        console.warn('toISOString: timestamp is null/undefined, using current time');
        return new Date().toISOString();
    }

    // Handle serverTimestamp sentinel (legacy data)
    if (typeof timestamp === 'object' && timestamp._methodName === 'serverTimestamp') {
        console.warn('toISOString: found serverTimestamp sentinel, this is legacy data');
        // We can't recover the original timestamp, so we'll use current time
        // In production, you might want to migrate this data
        return new Date().toISOString();
    }

    // Handle string timestamps
    if (typeof timestamp === 'string') {
        // Validate it's a valid ISO string
        if (timestamp.trim() === '') {
            console.warn('toISOString: empty string timestamp, using current time');
            return new Date().toISOString();
        }
        return timestamp;
    }

    // Handle Firestore Timestamp objects
    if (timestamp.toDate && typeof timestamp.toDate === 'function') {
        return timestamp.toDate().toISOString();
    }

    // Handle Date objects
    if (timestamp instanceof Date) {
        return timestamp.toISOString();
    }

    // Handle numeric timestamps (milliseconds)
    if (typeof timestamp === 'number') {
        return new Date(timestamp).toISOString();
    }

    console.warn('toISOString: unknown timestamp type:', typeof timestamp, timestamp);
    return new Date().toISOString();
}

/**
 * Get a single scan
 */
export async function getScan(userId: string, scanId: string): Promise<Scan | null> {
    try {
        const scanRef = doc(firestore, 'users', userId, 'scans', scanId);
        const scanDoc = await getDoc(scanRef);

        if (!scanDoc.exists()) {
            return null;
        }

        const data = scanDoc.data();
        console.log('getScan raw data:', {
            createdAt: data.createdAt,
            createdAtType: typeof data.createdAt,
            timestamp: data.timestamp,
            timestampType: typeof data.timestamp,
        });

        return {
            id: scanDoc.id,
            ...data,
            createdAt: toISOString(data.createdAt),
            updatedAt: toISOString(data.updatedAt),
        } as Scan;
    } catch (error) {
        console.error('Error getting scan:', error);
        throw error;
    }
}

/**
 * Get user's scan history
 */
export async function getScans(userId: string, limitCount: number = 50): Promise<Scan[]> {
    try {
        const scansRef = collection(firestore, 'users', userId, 'scans');
        const q = query(scansRef, orderBy('createdAt', 'desc'), limit(limitCount));
        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                createdAt: toISOString(data.createdAt),
                updatedAt: toISOString(data.updatedAt),
            } as Scan;
        });
    } catch (error) {
        console.error('Error getting scans:', error);
        throw error;
    }
}

/**
 * Delete a scan
 */
export async function deleteScan(userId: string, scanId: string): Promise<void> {
    try {
        const scanRef = doc(firestore, 'users', userId, 'scans', scanId);
        await deleteDoc(scanRef);
    } catch (error) {
        console.error('Error deleting scan:', error);
        throw error;
    }
}

/**
 * Subscribe to user's scans in real-time
 */
export function subscribeToScans(
    userId: string,
    callback: (scans: Scan[]) => void,
    limitCount: number = 50
): () => void {
    const scansRef = collection(firestore, 'users', userId, 'scans');
    const q = query(scansRef, orderBy('createdAt', 'desc'), limit(limitCount));

    return onSnapshot(
        q,
        (snapshot) => {
            const scans = snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    createdAt: toISOString(data.createdAt),
                    updatedAt: toISOString(data.updatedAt),
                } as Scan;
            });
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
        const favoriteRef = doc(firestore, 'users', userId, 'favorites', item.id);
        await setDoc(favoriteRef, {
            ...item,
            favoritedAt: new Date().toISOString(),
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
        const favoriteRef = doc(firestore, 'users', userId, 'favorites', itemId);
        await deleteDoc(favoriteRef);
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
        const favoritesRef = collection(firestore, 'users', userId, 'favorites');
        const q = query(favoritesRef, orderBy('favoritedAt', 'desc'));
        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => doc.data() as MenuItem);
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
        const userRef = doc(firestore, 'users', userId);
        await setDoc(userRef, { settings }, { merge: true });
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
        const userRef = doc(firestore, 'users', userId);
        const userDoc = await getDoc(userRef);

        return userDoc.data()?.settings || null;
    } catch (error) {
        console.error('Error getting user settings:', error);
        throw error;
    }
}
