import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './config';

/**
 * Upload an image to Firebase Storage
 * Works on both web and native platforms
 */
export async function uploadImage(
    userId: string,
    imageUri: string,
    path: string
): Promise<string> {
    try {
        const filename = `${Date.now()}.jpg`;
        const storagePath = `users/${userId}/${path}/${filename}`;
        const storageRef = ref(storage, storagePath);

        // Fetch the image as a blob
        const response = await fetch(imageUri);
        const blob = await response.blob();

        // Upload the blob
        await uploadBytes(storageRef, blob);

        // Get download URL
        const url = await getDownloadURL(storageRef);
        return url;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
}

/**
 * Get download URL for an image
 */
export async function getImageUrl(path: string): Promise<string> {
    try {
        const storageRef = ref(storage, path);
        return await getDownloadURL(storageRef);
    } catch (error) {
        console.error('Error getting image URL:', error);
        throw error;
    }
}

/**
 * Delete an image from storage
 */
export async function deleteImage(url: string): Promise<void> {
    try {
        // Extract path from URL
        const storageRef = ref(storage, url);
        await deleteObject(storageRef);
    } catch (error) {
        console.error('Error deleting image:', error);
        throw error;
    }
}

/**
 * Upload multiple images for a scan
 */
export async function uploadScanImages(
    userId: string,
    imageUris: string[],
    scanId: string
): Promise<string[]> {
    try {
        const uploadPromises = imageUris.map(uri =>
            uploadImage(userId, uri, `scans/${scanId}`)
        );
        return await Promise.all(uploadPromises);
    } catch (error) {
        console.error('Error uploading scan images:', error);
        throw error;
    }
}
