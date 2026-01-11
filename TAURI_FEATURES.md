# Tauri Features in Dharmic Treasures

This document explains how Tauri is leveraged in the Dharmic Treasures application to enhance the user experience beyond what's possible in a web-only app.

## 🎯 Key Benefits

### 1. **Single Codebase for Web & Desktop**
- ✅ Same React/TypeScript code works for both web and native desktop
- ✅ Automatic detection of Tauri environment
- ✅ Graceful fallbacks for web-only features

### 2. **Enhanced Features**

#### 📑 Bookmarks & Favorites
- Save favorite verses for quick access
- Persistent storage (localStorage for web, can be enhanced with file system in Tauri)
- View all bookmarks in one place
- Quick navigation to bookmarked verses

**Usage:**
- Click the bookmark button on any verse
- Access bookmarks from the main menu (when implemented)

#### 💾 Export Functionality
- **Save to File**: Export verses as text files (native file dialog in Tauri)
- **Print**: Print verses with formatted layout
- Works in both web (download) and desktop (native save dialog)

**Usage:**
- Click "Save" or "Download" button on any verse
- Click "Print" button for printing

#### 📊 Reading Progress Tracking
- Automatically saves your reading progress
- Restores to last read position when you return
- Tracks progress per text type

**How it works:**
- Progress is saved automatically as you read
- When you return to a text, it opens at your last position

#### ⚙️ Persistent Settings
- Font size preferences saved
- Background theme preferences saved
- Settings persist across sessions

#### 🔔 Native Notifications (Ready for Implementation)
- Daily verse reminders
- Reading goal notifications
- System-level notifications (better than web notifications)

#### 📁 File System Access (Ready for Implementation)
- Save PDFs locally
- Export bookmarks as backup
- Import/export settings

## 🛠️ Technical Implementation

### Tauri Detection
```typescript
import { isTauri } from './utils/tauri'

if (isTauri()) {
  // Use native Tauri APIs
} else {
  // Use web fallbacks
}
```

### Storage Utilities
Located in `src/utils/storage.ts`:
- `getBookmarks()` / `saveBookmark()` / `removeBookmark()`
- `getProgress()` / `saveProgress()`
- `getSettings()` / `saveSettings()`

### Tauri Utilities
Located in `src/utils/tauri.ts`:
- `saveTextToFile()` - Native file save dialog
- `showNotification()` - System notifications
- `printContent()` - Print functionality
- `openFileDialog()` - File picker

## 📦 Components Added

1. **BookmarkButton** (`src/components/BookmarkButton.tsx`)
   - Toggle bookmark on/off
   - Visual feedback for bookmarked state

2. **ExportButton** (`src/components/ExportButton.tsx`)
   - Save verse to file
   - Print verse

3. **BookmarksView** (`src/components/BookmarksView.tsx`)
   - View all saved bookmarks
   - Navigate to bookmarked verses
   - Remove bookmarks

## 🚀 Future Enhancements

### Ready to Implement:
1. **Daily Verse Notifications**
   - Schedule daily reminders
   - Show random verse each day

2. **System Tray Integration**
   - Quick access from system tray
   - Always available

3. **Fullscreen Reading Mode**
   - Distraction-free reading
   - Native fullscreen support

4. **Advanced Export Options**
   - Export as PDF
   - Export multiple verses
   - Export entire chapters

5. **Offline PDF Storage**
   - Download and store PDFs locally
   - Access without internet

6. **Reading Statistics**
   - Track reading time
   - Verses read count
   - Reading streaks

## 🔧 Building for Desktop

### Development
```bash
npm run tauri:dev
```

### Production Build
```bash
npm run tauri:build
```

Builds will be in `src-tauri/target/release/bundle/`

## 📱 Web vs Desktop

| Feature | Web | Desktop (Tauri) |
|---------|-----|-----------------|
| Bookmarks | ✅ localStorage | ✅ localStorage (can use file system) |
| Export | ✅ Download | ✅ Native save dialog |
| Print | ✅ Browser print | ✅ Native print dialog |
| Notifications | ⚠️ Web API (limited) | ✅ System notifications |
| File Access | ❌ | ✅ Full file system |
| Offline | ⚠️ Service Worker | ✅ Fully offline |
| Auto-update | ❌ | ✅ Built-in updater |
| System Integration | ❌ | ✅ Tray, menus, shortcuts |

## 🎨 User Experience Improvements

1. **Seamless Experience**: Features work the same way in web and desktop
2. **Better Performance**: Native app feels faster
3. **Offline First**: Desktop app works completely offline
4. **Native Feel**: Uses system dialogs, notifications, and UI patterns
5. **Smaller Size**: Much smaller than Electron apps

## 📝 Notes

- All Tauri features have web fallbacks
- The app works perfectly in web browsers without Tauri
- Tauri features are automatically enabled when running as desktop app
- No code changes needed to switch between web and desktop builds
