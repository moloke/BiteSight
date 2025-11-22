# Google Cloud Vision API Setup

## Quick Setup Guide

### Step 1: Access Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. In the top bar, click the project dropdown
3. Select your Firebase project: **bitesight-dc416**
   - Firebase automatically creates a Google Cloud project with the same name

### Step 2: Enable Cloud Vision API

1. In the search bar at the top, type: **Cloud Vision API**
2. Click on "Cloud Vision API" in the results
3. Click the **"Enable"** button
4. Wait for it to enable (~30 seconds)

### Step 3: Create API Key

1. In the left sidebar, click **"APIs & Services"** → **"Credentials"**
2. Click **"+ CREATE CREDENTIALS"** at the top
3. Select **"API key"**
4. A popup will show your new API key - **Copy it!**
5. Click **"RESTRICT KEY"** (recommended for security)

### Step 4: Restrict the API Key (Recommended)

1. Give it a name: **"BiteSight OCR Key"**
2. Under **"API restrictions"**:
   - Select **"Restrict key"**
   - Check **"Cloud Vision API"**
3. Under **"Application restrictions"** (optional):
   - Select **"iOS apps"**
   - Add bundle ID: `com.bitesight.app`
4. Click **"Save"**

### Step 5: Add to .env File

1. Open `/Users/mayowaoloke/BiteSight/.env`
2. Replace the placeholder:
   ```bash
   GOOGLE_CLOUD_VISION_API_KEY=your_actual_api_key_here
   ```

### Step 6: Verify Setup

Your `.env` should now have all these values filled in:
```bash
EXPO_PUBLIC_FIREBASE_API_KEY=AIzaSyAxQIb6N1h4DV_o1ZdzZQN2LIdJhuttqGs
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=bitesight-dc416.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=bitesight-dc416
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=bitesight-dc416.firebasestorage.app
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1001647028140
EXPO_PUBLIC_FIREBASE_APP_ID=1:1001647028140:ios:da98ee83a8b0c56ec7ec09
EXPO_PUBLIC_API_BASE_URL=https://us-central1-bitesight-dc416.cloudfunctions.net
GOOGLE_CLOUD_VISION_API_KEY=AIza... (your actual key)
FIREBASE_FUNCTIONS_URL=https://us-central1-bitesight-dc416.cloudfunctions.net/api
```

## Pricing Information

**Cloud Vision API Free Tier:**
- **1,000 units/month FREE**
- After that: $1.50 per 1,000 units

**What's a unit?**
- 1 text detection request = 1 unit
- So you get 1,000 free OCR scans per month

**For MVP testing:** You'll stay well within the free tier!

## Troubleshooting

### "API key not valid"
- Make sure you copied the entire key
- Check that Cloud Vision API is enabled
- Verify the key isn't restricted to wrong bundle ID

### "Quota exceeded"
- You've used more than 1,000 requests this month
- Wait until next month or enable billing

### "Permission denied"
- Make sure the API key has Cloud Vision API enabled in restrictions

---

**Once you have the API key, add it to your `.env` file and we'll proceed with testing!**
