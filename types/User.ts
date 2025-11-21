// TypeScript type definitions for User
export interface User {
    uid: string;
    provider: 'google' | 'apple' | 'anonymous';
    email?: string;
    displayName?: string;
    photoURL?: string;
    createdAt: number;
    favoriteItems: string[];
    settings: UserSettings;
}

export interface UserSettings {
    targetLanguage: string;
    allowImageUpload: boolean;
    autoOCR: boolean;
    theme?: 'light' | 'dark' | 'auto';
}

export interface AuthState {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
}
