import storage from '@react-native-firebase/storage';

/**
 * Upload an image to Firebase Storage
 */
export async function uploadImage(
    userId: string,
    imageUri: string,
    scanId: string
): Promise<string> {
    try {
        const filename = `${Date.now()}.jpg`;
        const path = `users/${userId}/scans/${scanId}/${filename}`;
        const reference = storage().ref(path);

        // Upload file
        await reference.putFile(imageUri);

        // Get download URL
        const url = await reference.getDownloadURL();
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
        const reference = storage().ref(path);
        return await reference.getDownloadURL();
    } catch (error) {
        console.error('Error getting image URL:', error);
        throw error;
    }
}

/**
 * Delete an image from storage
 */
export async function deleteImage(path: string): Promise<void> {
    try {
        const reference = storage().ref(path);
        await reference.delete();
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
            uploadImage(userId, uri, scanId)
        );
        return await Promise.all(uploadPromises);
    } catch (error) {
        console.error('Error uploading scan images:', error);
        throw error;
    }
}
