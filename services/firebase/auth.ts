import auth from '@react-native-firebase/auth';
import { User, AuthState } from '@/types/User';

/**
 * Sign in anonymously for quick access
 */
export async function signInAnonymously(): Promise<User | null> {
    try {
        const userCredential = await auth().signInAnonymously();
        return mapFirebaseUser(userCredential.user);
    } catch (error) {
        console.error('Anonymous sign-in error:', error);
        throw error;
    }
}

/**
 * Sign out current user
 */
export async function signOut(): Promise<void> {
    try {
        await auth().signOut();
    } catch (error) {
        console.error('Sign out error:', error);
        throw error;
    }
}

/**
 * Get current authenticated user
 */
export function getCurrentUser(): User | null {
    const firebaseUser = auth().currentUser;
    return firebaseUser ? mapFirebaseUser(firebaseUser) : null;
}

/**
 * Listen to authentication state changes
 */
export function onAuthStateChanged(callback: (user: User | null) => void): () => void {
    return auth().onAuthStateChanged((firebaseUser) => {
        callback(firebaseUser ? mapFirebaseUser(firebaseUser) : null);
    });
}

/**
 * Map Firebase user to our User type
 */
function mapFirebaseUser(firebaseUser: any): User {
    return {
        id: firebaseUser.uid,
        email: firebaseUser.email || undefined,
        displayName: firebaseUser.displayName || undefined,
        photoURL: firebaseUser.photoURL || undefined,
        isAnonymous: firebaseUser.isAnonymous,
        createdAt: firebaseUser.metadata.creationTime || new Date().toISOString(),
        settings: {
            translationLanguage: 'en',
            uploadImages: true,
            autoOCR: false,
        },
    };
}

/**
 * Future: Google Sign In
 * Requires additional setup with Google OAuth
 */
export async function signInWithGoogle(): Promise<User | null> {
    // TODO: Implement Google Sign In
    // Requires @react-native-google-signin/google-signin
    throw new Error('Google Sign In not implemented yet');
}

/**
 * Future: Apple Sign In
 * Requires additional setup with Apple
 */
export async function signInWithApple(): Promise<User | null> {
    // TODO: Implement Apple Sign In
    // Requires @invertase/react-native-apple-authentication
    throw new Error('Apple Sign In not implemented yet');
}
