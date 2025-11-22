# Firebase Setup Guide for BiteSight

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: **BiteSight** (or your preference)
4. Click "Continue"
5. **Disable Google Analytics** for now (you can enable later)
6. Click "Create project"
7. Wait for project creation (~30 seconds)
8. Click "Continue"

## Step 2: Register iOS App

1. In the Firebase console, click the **iOS** icon
2. Enter iOS bundle ID: `com.bitesight.app` (must match app.json)
3. App nickname: "BiteSight iOS" (optional)
4. Click "Register app"
5. **Download `GoogleService-Info.plist`**
6. Save it to `/Users/mayowaoloke/BiteSight/ios/BiteSight/GoogleService-Info.plist`
7. Click "Next" → "Next" → "Continue to console"

## Step 3: Enable Authentication

1. In Firebase console sidebar, click **Authentication**
2. Click "Get started"
3. Click on **Sign-in method** tab
4. Enable **Anonymous**:
   - Click "Anonymous"
   - Toggle "Enable"
   - Click "Save"
5. (Optional) Enable **Google** for future:
   - Click "Google"
   - Toggle "Enable"
   - Enter support email
   - Click "Save"

## Step 4: Enable Firestore Database

1. In Firebase console sidebar, click **Firestore Database**
2. Click "Create database"
3. Select **Start in test mode** (we'll add security rules later)
4. Choose location: **us-central** (or closest to you)
5. Click "Enable"
6. Wait for database creation (~1 minute)

## Step 5: Enable Cloud Storage

1. In Firebase console sidebar, click **Storage**
2. Click "Get started"
3. Select **Start in test mode**
4. Click "Next"
5. Choose location: **us-central** (same as Firestore)
6. Click "Done"

## Step 6: Get Firebase Configuration

1. In Firebase console, click the **gear icon** (⚙️) → "Project settings"
2. Scroll down to "Your apps" section
3. You'll see your iOS app listed
4. Copy the configuration values:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "bitesight-xxxxx.firebaseapp.com",
  projectId: "bitesight-xxxxx",
  storageBucket: "bitesight-xxxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:ios:abcdef"
};
```

## Step 7: Add Configuration to .env

1. Create a `.env` file in the project root (copy from `.env.example`):

```bash
cd /Users/mayowaoloke/BiteSight
cp .env.example .env
```

2. Edit `.env` and add your Firebase configuration:

```bash
# Firebase Configuration
EXPO_PUBLIC_FIREBASE_API_KEY=AIza...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=bitesight-xxxxx.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=bitesight-xxxxx
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=bitesight-xxxxx.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
EXPO_PUBLIC_FIREBASE_APP_ID=1:123456789:ios:abcdef

# API Base URL (will be your Cloud Functions URL later)
EXPO_PUBLIC_API_BASE_URL=https://us-central1-bitesight-xxxxx.cloudfunctions.net

# Google Cloud Vision API (we'll get this next)
GOOGLE_CLOUD_VISION_API_KEY=your_key_here

# Firebase Functions URL
FIREBASE_FUNCTIONS_URL=https://us-central1-bitesight-xxxxx.cloudfunctions.net/api
```

## Step 8: Set Up Google Cloud Vision API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your Firebase project (it's automatically created in Google Cloud)
3. Enable **Cloud Vision API**:
   - Search for "Cloud Vision API" in the search bar
   - Click "Enable"
4. Create API Key:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy the API key
   - Add it to `.env`: `GOOGLE_CLOUD_VISION_API_KEY=your_key_here`
5. (Optional) Restrict the API key:
   - Click on the API key name
   - Under "API restrictions", select "Restrict key"
   - Select "Cloud Vision API"
   - Click "Save"

## Step 9: Install Firebase Dependencies

```bash
cd /Users/mayowaoloke/BiteSight
npm install
```

## Step 10: Rebuild iOS App

Since we added Firebase native modules, we need to rebuild:

```bash
# Clean and reinstall pods
rm -rf ios/Pods ios/Podfile.lock
cd ios
/opt/homebrew/lib/ruby/gems/3.4.0/bin/pod install
cd ..

# Rebuild the app
xcodebuild -workspace ios/BiteSight.xcworkspace -scheme BiteSight -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build
```

## Step 11: Test Firebase Connection

1. Start the app:
   ```bash
   npm start
   ```

2. The app should automatically sign in anonymously on first launch

3. Check Firebase console → Authentication → Users
   - You should see an anonymous user appear

## Firestore Security Rules (Optional - for Production)

Later, update Firestore rules in Firebase console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Storage Security Rules (Optional - for Production)

Later, update Storage rules in Firebase console:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Users can only read/write their own files
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Troubleshooting

### "No Firebase App '[DEFAULT]' has been created"
- Make sure `.env` file exists and has correct values
- Restart Metro bundler: `npm start`

### "GoogleService-Info.plist not found"
- Download the file from Firebase console
- Place it in `ios/BiteSight/GoogleService-Info.plist`
- Rebuild the iOS app

### Pod install fails
- Make sure CocoaPods is installed: `/opt/homebrew/lib/ruby/gems/3.4.0/bin/pod --version`
- Clean pods: `rm -rf ios/Pods ios/Podfile.lock`
- Try again: `cd ios && pod install`

## Next Steps

Once Firebase is set up:
1. Test authentication (anonymous sign-in)
2. Implement OCR functionality
3. Set up Cloud Functions for backend processing
4. Deploy and test end-to-end flow

---

**Need help?** Check the [Firebase Documentation](https://firebase.google.com/docs) or ask for assistance!
