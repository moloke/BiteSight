# BiteSight - Menu Visualizer MVP

A camera-assisted menu visualizer that uses OCR, AI parsing, and image search to help users understand menu items through visual representations and translations.

## 🚀 Features

- **Camera OCR**: Point your camera at a menu to recognize text
- **Smart Translation**: Automatic translation of menu items
- **Visual Search**: Find representative images for each dish
- **Ingredient Detection**: See ingredients and allergen information
- **Favorites**: Save your favorite dishes
- **Multi-language Support**: Works with menus in multiple languages

## 📋 Prerequisites

- Node.js >= 20.19.4 (current version: 18.20.4 - **needs upgrade**)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (for testing)

## 🛠️ Tech Stack

- **Frontend**: React Native + Expo
- **Navigation**: Expo Router
- **Backend**: Firebase Cloud Functions (to be set up)
- **OCR**: Google ML Kit (on-device) + Cloud Vision API (fallback)
- **AI**: OpenAI/Anthropic for text parsing
- **Images**: Unsplash + Pexels APIs
- **Monitoring**: Sentry + Firebase Crashlytics

## 📦 Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd BiteSight
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env
# Edit .env with your Firebase and API keys
\`\`\`

4. Start the development server:
\`\`\`bash
npm start
\`\`\`

## 🔧 Configuration

### Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication (Google, Apple, Anonymous)
3. Create a Firestore database
4. Enable Cloud Storage
5. Copy your Firebase config to `.env`

### API Keys Required

- **Firebase**: Project credentials
- **OpenAI or Anthropic**: For LLM text parsing
- **Unsplash**: Free tier (50 requests/hour)
- **Pexels**: Free tier
- **Google Cloud Vision** (optional): For OCR fallback
- **Sentry** (optional): For error tracking

## 📱 Running the App

### iOS
\`\`\`bash
npm run ios
\`\`\`

### Android
\`\`\`bash
npm run android
\`\`\`

### Web
\`\`\`bash
npm run web
\`\`\`

## 🏗️ Project Structure

\`\`\`
BiteSight/
├── app/                    # Expo Router screens
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── camera.tsx     # Main camera screen
│   │   ├── history.tsx    # Scan history
│   │   └── settings.tsx   # Settings
│   ├── scan-results.tsx   # Results after OCR
│   ├── item-detail.tsx    # Detailed item view
│   └── _layout.tsx        # Root layout
├── components/            # Reusable components
├── services/              # API and service layer
│   ├── ocr/              # OCR logic
│   ├── api/              # Backend API client
│   ├── firebase/         # Firebase integration
│   └── cache/            # Caching logic
├── types/                 # TypeScript definitions
├── hooks/                 # Custom React hooks
└── constants/             # App configuration
\`\`\`

## 🎯 Development Roadmap

### Phase 1: Foundation ✅
- [x] Initialize Expo project
- [x] Create app structure
- [x] Build UI screens
- [ ] Set up Firebase

### Phase 2: Camera & OCR (In Progress)
- [ ] Implement camera functionality
- [ ] Integrate ML Kit for OCR
- [ ] Build OCR overlay UI
- [ ] Implement text grouping

### Phase 3: Backend
- [ ] Set up Cloud Functions
- [ ] Implement LLM parsing
- [ ] Integrate image search APIs
- [ ] Add caching layer

### Phase 4: Polish
- [ ] Add animations
- [ ] Implement offline support
- [ ] Add error handling
- [ ] Performance optimization

## 💰 Cost Estimates

For ~500 scans/day:
- Firebase: Free tier
- OpenAI (GPT-3.5): ~$5-10/month
- Unsplash/Pexels: Free
- Cloud Vision (10% fallback): ~$5/month
- Storage/CDN: ~$2/month

**Total: ~$12-17/month**

## 📄 License

MIT

## 🤝 Contributing

Contributions welcome! Please read our contributing guidelines first.

## ⚠️ Known Issues

- Node.js version 18.20.4 is below the recommended 20.19.4 - some features may not work optimally
- OCR functionality not yet implemented (placeholder UI only)
- Firebase integration pending
- Backend Cloud Functions not yet deployed

## 📞 Support

For issues and questions, please open a GitHub issue.
