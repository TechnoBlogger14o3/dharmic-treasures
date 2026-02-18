# Browser-Based LLM Integration Guide

## 🤖 Overview

The chatbot now supports **browser-based LLM** using Transformers.js! This means:

- ✅ **No external setup** - Works entirely in the browser
- ✅ **Privacy-focused** - All processing happens locally
- ✅ **Works offline** - After initial model download
- ✅ **No API keys** - Completely free
- ✅ **Automatic fallback** - Falls back to keyword search if LLM fails

## 🚀 How It Works

### Technology Stack
- **Transformers.js** - Runs LLMs directly in the browser using WebAssembly/WebGPU
- **Model**: Qwen2.5-0.5B-Instruct (~300MB, optimized for browser)
- **Fallback**: Keyword-based search (always available)

### Features
1. **Smart Toggle**: Click the lightbulb icon to enable/disable AI mode
2. **Progressive Loading**: Model downloads on first use (one-time)
3. **Graceful Fallback**: Automatically falls back to keyword search if LLM fails
4. **Context-Aware**: Uses relevant verses as context for better responses

## 📦 Installation

The LLM library is already added to `package.json`. Just install dependencies:

```bash
npm install
```

## 🎯 Usage

### Enabling AI Mode

1. **Open the chatbot** (click chat icon)
2. **Click the lightbulb icon** (💡) in the header
3. **Wait for initialization** - First time will download the model (~300MB)
4. **Start chatting** - AI responses will be more natural and contextual

### Model Download

- **First use**: Model downloads automatically (~300MB, one-time)
- **Subsequent uses**: Model cached in browser, loads instantly
- **Storage**: Uses browser's IndexedDB for model storage

### Performance

- **Initialization**: ~5-10 seconds (first time only)
- **Response time**: 2-5 seconds per query
- **Memory usage**: ~500MB RAM
- **WebGPU**: Automatically used if available (faster)

## 🔧 Configuration

### Model Options

You can change the model in `src/utils/browserLLM.ts`:

```typescript
// Current (recommended)
const MODEL_NAME = 'Xenova/Qwen2.5-0.5B-Instruct' // ~300MB, good balance

// Smaller (faster, less quality)
const MODEL_NAME = 'Xenova/LaMini-Flan-T5-248M' // ~100MB

// Larger (slower, better quality)
const MODEL_NAME = 'Xenova/llama-3.2-1B-instruct' // ~600MB
```

### Device Selection

The code automatically uses:
1. **WebGPU** (if available) - Fastest, GPU-accelerated
2. **CPU** (fallback) - Slower but works everywhere

## 🎨 User Experience

### With AI Enabled:
- More natural, conversational responses
- Better context understanding
- Explains verses in detail
- Still shows relevant verses below

### Without AI (Keyword Search):
- Fast responses (<1 second)
- Direct verse matching
- Works immediately, no setup

## 🐛 Troubleshooting

### Model Not Loading

**Issue**: Model download fails or takes too long

**Solutions**:
- Check internet connection (needed for first download)
- Check browser console for errors
- Try refreshing the page
- Check browser storage (IndexedDB) - clear if needed

### Slow Responses

**Issue**: AI responses take too long

**Solutions**:
- Use smaller model (LaMini-Flan-T5-248M)
- Disable AI mode for faster keyword search
- Check if WebGPU is available (faster)

### Out of Memory

**Issue**: Browser runs out of memory

**Solutions**:
- Close other tabs
- Use smaller model
- Disable AI mode
- Restart browser

### WebGPU Not Available

**Issue**: Using CPU instead of GPU

**Solutions**:
- Update browser to latest version
- Enable hardware acceleration in browser settings
- Use Chrome/Edge (best WebGPU support)

## 📊 Performance Tips

1. **First Load**: Be patient - model downloads once (~300MB)
2. **Subsequent Loads**: Much faster - model cached locally
3. **WebGPU**: Enable for 2-3x faster inference
4. **Model Size**: Smaller models = faster but less quality

## 🔒 Privacy & Security

- ✅ **100% Local**: All processing happens in your browser
- ✅ **No Data Sent**: Nothing leaves your device
- ✅ **No Tracking**: No analytics or monitoring
- ✅ **Offline Capable**: Works after initial download

## 🎯 Best Practices

1. **Enable AI for complex questions** - Better explanations
2. **Use keyword search for quick lookups** - Faster
3. **Let model download complete** - Don't interrupt first load
4. **Check browser compatibility** - Modern browsers recommended

## 📝 Technical Details

### How It Works

1. **User enables AI mode** → Click lightbulb icon
2. **Model initialization** → Downloads model (first time)
3. **User asks question** → Keyword search finds verses
4. **LLM generates response** → Uses verses as context
5. **Response displayed** → Natural explanation + verses

### Architecture

```
User Query
    ↓
Keyword Search (finds relevant verses)
    ↓
LLM Context (verses + query)
    ↓
LLM Generation (browser-based)
    ↓
Response (natural explanation + verses)
```

## 🚀 Future Enhancements

Potential improvements:
- [ ] Multiple model options in UI
- [ ] Model size selector
- [ ] Response streaming (show as it generates)
- [ ] Conversation history with LLM
- [ ] Custom prompts
- [ ] Model fine-tuning for Gita-specific knowledge

## 📚 Resources

- [Transformers.js Documentation](https://huggingface.co/docs/transformers.js)
- [Available Models](https://huggingface.co/models?library=transformers.js)
- [WebGPU Support](https://caniuse.com/webgpu)

---

**Note**: The LLM is optional - the chatbot works great with keyword search alone. AI mode enhances responses but isn't required for basic functionality.
