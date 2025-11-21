// App configuration constants
export const Config = {
    // API endpoints
    API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL || 'https://us-central1-bitesight.cloudfunctions.net',

    // Firebase config (will be populated from environment)
    FIREBASE_CONFIG: {
        apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
    },

    // OCR settings
    OCR: {
        MIN_CONFIDENCE: 0.6,
        AUTO_OCR_THROTTLE_MS: 500, // Run auto-OCR at most every 500ms
        FALLBACK_TO_CLOUD_THRESHOLD: 0.7, // If confidence < 0.7, use Cloud Vision
    },

    // Image settings
    IMAGES: {
        MAX_CANDIDATES: 6,
        MIN_SCORE_THRESHOLD: 0.5,
        THUMBNAIL_SIZE: 300,
        CACHE_DURATION_DAYS: 7,
    },

    // Rate limiting
    RATE_LIMITS: {
        SCANS_PER_DAY: 100,
        API_CALLS_PER_HOUR: 1000,
    },

    // Default settings
    DEFAULT_LANGUAGE: 'en',
    SUPPORTED_LANGUAGES: ['en', 'es', 'fr', 'it', 'de', 'pl', 'pt', 'ja', 'zh', 'ko'],

    // Sentry DSN
    SENTRY_DSN: process.env.EXPO_PUBLIC_SENTRY_DSN,
} as const;

export const Colors = {
    primary: '#6366F1',
    secondary: '#8B5CF6',
    accent: '#EC4899',
    background: '#FFFFFF',
    surface: '#F9FAFB',
    text: '#111827',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
    error: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B',
} as const;
