# Fix Ruby Version Issue for iOS Development

## Problem
Your system Ruby (2.6.10) is too old for the latest CocoaPods. We need Ruby 3.1.0 or newer.

## Solution: Install Homebrew, Ruby, and CocoaPods

### Step 1: Install Homebrew (if not already installed)

Run this command and follow the prompts:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

**After installation**, you may need to add Homebrew to your PATH. The installer will show you the exact commands, which will look like:

```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

### Step 2: Install Ruby via Homebrew

```bash
brew install ruby
```

### Step 3: Add Homebrew Ruby to your PATH

Add this to your `~/.zshrc` or `~/.bash_profile`:

```bash
echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

Verify Ruby version (should be 3.x):
```bash
ruby --version
```

### Step 4: Install CocoaPods

```bash
gem install cocoapods
```

**No sudo needed** when using Homebrew Ruby!

### Step 5: Install iOS Dependencies

```bash
cd /Users/mayowaoloke/BiteSight/ios
pod install
cd ..
```

### Step 6: Run the iOS App

```bash
npm run ios
```

---

## Alternative: Use rbenv (Ruby Version Manager)

If you prefer more control over Ruby versions:

### Install rbenv via Homebrew
```bash
brew install rbenv ruby-build
```

### Initialize rbenv
```bash
echo 'eval "$(rbenv init - zsh)"' >> ~/.zshrc
source ~/.zshrc
```

### Install Ruby 3.3
```bash
rbenv install 3.3.0
rbenv global 3.3.0
```

### Verify
```bash
ruby --version  # Should show 3.3.0
```

### Install CocoaPods
```bash
gem install cocoapods
```

---

## Quick Alternative: Use Expo Go (No Native Build Required)

If you want to test the app quickly without dealing with Ruby/CocoaPods:

1. **On your Mac**, open the iOS Simulator:
   ```bash
   open -a Simulator
   ```

2. **In the Simulator**, open Safari and go to:
   - App Store → Search for "Expo Go" → Install

3. **In your terminal** (where `npm start` is running), press:
   ```
   i
   ```

4. This will open the app in Expo Go

**Limitations of Expo Go:**
- Some native modules won't work (camera permissions, etc.)
- Good for testing UI and navigation
- Not suitable for production

---

## Recommended Approach

**For development**: Install Homebrew + Ruby + CocoaPods (Steps 1-6 above)
- Takes ~15-20 minutes
- Full native functionality
- Required for production builds

**For quick testing**: Use Expo Go
- Takes ~2 minutes
- Limited functionality
- Good for UI testing

---

## After CocoaPods is Working

Once you successfully run `pod install`, you'll see output like:

```
Installing dependencies...
Analyzing dependencies
Downloading dependencies
Installing [various pods]...
Generating Pods project
Pod installation complete! There are X dependencies from the Podfile.
```

Then you can run:
```bash
npm run ios
```

And the app will build and launch in the iOS Simulator!

---

## Need Help?

If you encounter any errors during these steps, let me know the exact error message and I'll help troubleshoot.
