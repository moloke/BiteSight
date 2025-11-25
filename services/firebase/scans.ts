import {
    saveScan as saveToFirestore,
    getScans,
    updateScan as updateInFirestore,
    deleteScan as deleteFromFirestore,
} from './firestore';
import { uploadImage, deleteImage } from './storage';
import { Scan, ScanInput } from '@/types/Scan';

/**
 * Save a new scan with image upload
 */
export async function saveScanWithImage(
    userId: string,
    scanInput: ScanInput,
    imageUri: string
): Promise<string> {
    // First, save the scan to Firestore
    const scanId = await saveToFirestore(userId, scanInput);

    try {
        // Upload the image to Storage
        const imageUrl = await uploadImage(userId, imageUri, `scans/${scanId}`);

        // Update the scan with the image URL
        await updateInFirestore(userId, scanId, { imageUrl });

        return scanId;
    } catch (error) {
        // If image upload fails, delete the scan
        await deleteFromFirestore(userId, scanId);
        throw error;
    }
}

/**
 * Get all scans for a user
 */
export async function getUserScans(userId: string): Promise<Scan[]> {
    return await getScans(userId);
}

/**
 * Update a scan
 */
export async function updateScan(
    userId: string,
    scanId: string,
    updates: Partial<Scan>
): Promise<void> {
    await updateInFirestore(userId, scanId, updates);
}

/**
 * Delete a scan and its image
 */
export async function deleteScan(
    userId: string,
    scanId: string,
    imageUrl?: string
): Promise<void> {
    // Delete from Firestore
    await deleteFromFirestore(userId, scanId);

    // Delete image from Storage if it exists
    if (imageUrl) {
        try {
            await deleteImage(imageUrl);
        } catch (error) {
            console.error('Failed to delete image:', error);
            // Don't throw - scan is already deleted from Firestore
        }
    }
}
