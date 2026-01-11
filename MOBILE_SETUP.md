# Mobile App Setup (iOS & Android) with Tauri

## ✅ Current Status

Your app **CAN** work as native iOS and Android apps! Tauri v2 supports mobile platforms.

## 📱 What You Need

### For iOS:
1. **macOS** (required - iOS builds only work on Mac)
2. **Xcode** (from App Store)
3. **CocoaPods** (`sudo gem install cocoapods`)
4. **Apple Developer Account** (for App Store distribution, free for testing)

### For Android:
1. **Android Studio** (or Android SDK)
2. **Java Development Kit (JDK)**
3. **Android SDK** (via Android Studio)
4. **Rust Android targets** (installed automatically)

## 🚀 Quick Start

### 1. Install Mobile Dependencies

```bash
# Install Tauri mobile dependencies
npm install --save-dev @tauri-apps/cli

# For iOS (on macOS only)
cargo install cargo-bundle

# For Android
cargo install cargo-ndk
```

### 2. Initialize Mobile Projects

```bash
# iOS
npm run tauri ios init

# Android  
npm run tauri android init
```

### 3. Build Commands

```bash
# iOS Development
npm run tauri ios dev

# iOS Production Build
npm run tauri ios build

# Android Development
npm run tauri android dev

# Android Production Build
npm run tauri android build
```

## ⚠️ Plugin Compatibility

Not all plugins work on mobile yet. Here's the status:

| Plugin | Desktop | iOS | Android |
|--------|---------|-----|---------|
| `tauri-plugin-fs` | ✅ | ✅ | ✅ |
| `tauri-plugin-dialog` | ✅ | ⚠️ | ⚠️ |
| `tauri-plugin-notification` | ✅ | ✅ | ✅ |
| `tauri-plugin-shell` | ✅ | ❌ | ❌ |

**Note**: Your code already handles this gracefully with fallbacks!

## 📝 Configuration Needed

### Update `tauri.conf.json` for Mobile

You'll need to add mobile-specific configuration:

```json
{
  "app": {
    "ios": {
      "bundleIdentifier": "com.dharmictreasures.app",
      "deploymentTarget": "13.0"
    },
    "android": {
      "packageName": "com.dharmictreasures.app",
      "minSdkVersion": 21,
      "targetSdkVersion": 33
    }
  }
}
```

## 🎯 Your App is Mobile-Ready!

### Why it will work:

1. ✅ **Responsive Design**: Your app already uses Tailwind with mobile breakpoints
2. ✅ **Touch-Friendly**: Buttons have `touch-manipulation` classes
3. ✅ **Mobile Detection**: `isTauri()` works on mobile too
4. ✅ **Graceful Fallbacks**: All Tauri features have web fallbacks
5. ✅ **React Code**: Works the same on all platforms

### Features that work on mobile:

- ✅ All your React components
- ✅ Bookmarks (localStorage)
- ✅ Reading progress
- ✅ Settings persistence
- ✅ PDF viewer
- ✅ Maps (Leaflet)
- ✅ 3D components (Three.js)
- ✅ File system access (with Tauri)
- ✅ Notifications (native on mobile!)

## 🛠️ Next Steps

1. **Test on iOS** (requires Mac):
   ```bash
   npm run tauri ios dev
   ```

2. **Test on Android**:
   ```bash
   npm run tauri android dev
   ```

3. **Build for App Stores**:
   - iOS: Build and submit via Xcode
   - Android: Generate signed APK/AAB

## 📦 Distribution

### iOS:
- Build creates `.ipa` file
- Submit to App Store via Xcode
- Or distribute via TestFlight

### Android:
- Build creates `.apk` or `.aab`
- Upload to Google Play Console
- Or distribute directly

## 💡 Benefits of Mobile Native Apps

1. **App Store Distribution**: Reach users through official stores
2. **Native Performance**: Faster than web apps
3. **Offline First**: Works without internet
4. **System Integration**: Native notifications, file access
5. **Better UX**: Native feel, gestures, animations
6. **Push Notifications**: Native push support (with additional setup)

## 🔄 Single Codebase, Multiple Platforms

```
Your React Code
    ↓
    ├─→ Web: npm run build
    ├─→ Desktop: npm run tauri:build
    ├─→ iOS: npm run tauri ios build
    └─→ Android: npm run tauri android build
```

**Same code, 4 platforms!** 🎉

## 📚 Resources

- [Tauri Mobile Docs](https://tauri.app/v2/guides/mobile/)
- [iOS Setup Guide](https://tauri.app/v2/guides/mobile/ios/)
- [Android Setup Guide](https://tauri.app/v2/guides/mobile/android/)
