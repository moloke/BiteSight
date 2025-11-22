// App configuration constants
export const Config = {
    // API Configuration
    API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:5001',

    // Firebase Configuration (from environment variables)
    FIREBASE_CONFIG: {
        apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || '',
        authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
        projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || '',
        storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
        messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
        appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || '',
    },

    // Google Cloud Vision API
    GOOGLE_CLOUD_VISION: {
        API_KEY: process.env.EXPO_PUBLIC_GOOGLE_CLOUD_VISION_API_KEY || '',
        ENDPOINT: 'https://vision.googleapis.com/v1/images:annotate',
    },

    // Firebase Cloud Functions
    FIREBASE_FUNCTIONS: {
        BASE_URL: process.env.FIREBASE_FUNCTIONS_URL || 'http://localhost:5001/bitesight/us-central1/api',
    },

    // OCR Settings
    OCR: {
        MIN_CONFIDENCE: 0.7,
        THROTTLE_MS: 500,
        FALLBACK_THRESHOLD: 0.5,
    },

    // Image Processing
    IMAGES: {
        MAX_CANDIDATES: 5,
        MIN_SCORE: 0.6,
        THUMBNAIL_SIZE: 200,
        CACHE_DURATION_HOURS: 24,
    },

    // Rate Limiting
    RATE_LIMITS: {
        OCR_PER_MINUTE: 10,
        API_CALLS_PER_MINUTE: 30,
    },

    // Localization
    DEFAULT_LANGUAGE: 'en',
    SUPPORTED_LANGUAGES: ['en', 'es', 'fr', 'de', 'it', 'pt', 'ja', 'ko', 'zh'],

    // Monitoring
    SENTRY_DSN: process.env.SENTRY_DSN || '',

    // UI Colors
    Colors: {
        primary: '#6366F1',
        secondary: '#8B5CF6',
        accent: '#EC4899',
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
        background: '#FFFFFF',
        text: '#1F2937',
        textSecondary: '#6B7280',
        border: '#E5E7EB',
    },
} as const;
