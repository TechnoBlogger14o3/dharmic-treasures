// English to Hindi transliteration mapping
const transliterationMap: Record<string, string> = {
  // Vowels
  'a': 'अ', 'aa': 'आ', 'i': 'इ', 'ee': 'ई', 'u': 'उ', 'oo': 'ऊ', 'e': 'ए', 'ai': 'ऐ', 'o': 'ओ', 'au': 'औ',
  // Consonants
  'k': 'क', 'kh': 'ख', 'g': 'ग', 'gh': 'घ', 'ng': 'ङ',
  'ch': 'च', 'chh': 'छ', 'j': 'ज', 'jh': 'झ', 'ny': 'ञ',
  't': 'त', 'th': 'थ', 'd': 'द', 'dh': 'ध', 'n': 'न',
  'p': 'प', 'ph': 'फ', 'b': 'ब', 'bh': 'भ', 'm': 'म',
  'y': 'य', 'r': 'र', 'l': 'ल', 'v': 'व', 'w': 'व',
  'sh': 'श', 'shh': 'ष', 's': 'स', 'h': 'ह',
  'ksh': 'क्ष', 'tr': 'त्र', 'gy': 'ज्ञ',
  // Common words
  'kaam': 'काम', 'karma': 'कर्म', 'dharma': 'धर्म', 'moksha': 'मोक्ष',
  'bhakti': 'भक्ति', 'yoga': 'योग', 'veda': 'वेद', 'puran': 'पुराण',
  'ram': 'राम', 'krishna': 'कृष्ण', 'shiva': 'शिव', 'vishnu': 'विष्णु',
  'gita': 'गीता', 'upanishad': 'उपनिषद', 'mantra': 'मंत्र', 'shloka': 'श्लोक',
}

// English to Hindi translation dictionary
const translationMap: Record<string, string> = {
  'success': 'सफलता',
  'happiness': 'सुख', 'sukha': 'सुख',
  'peace': 'शांति', 'shanti': 'शांति',
  'love': 'प्रेम', 'prem': 'प्रेम',
  'devotion': 'भक्ति', 'bhakti': 'भक्ति',
  'knowledge': 'ज्ञान', 'gyan': 'ज्ञान',
  'wisdom': 'बुद्धि', 'buddhi': 'बुद्धि',
  'duty': 'धर्म', 'dharma': 'धर्म',
  'action': 'कर्म', 'karma': 'कर्म',
  'desire': 'कामना', 'kamna': 'कामना',
  'anger': 'क्रोध', 'krodh': 'क्रोध',
  'fear': 'भय', 'bhay': 'भय',
  'stress': 'तनाव', 'tanav': 'तनाव',
  'sorrow': 'दुःख', 'dukh': 'दुःख',
  'joy': 'आनंद', 'anand': 'आनंद',
  'bliss': 'आनंद',
  'meditation': 'ध्यान', 'dhyan': 'ध्यान',
  'salvation': 'मोक्ष', 'moksha': 'मोक्ष',
  'liberation': 'मुक्ति', 'mukti': 'मुक्ति',
  'soul': 'आत्मा', 'atma': 'आत्मा',
  'god': 'भगवान', 'bhagwan': 'भगवान',
  'lord': 'प्रभु', 'prabhu': 'प्रभु',
  'truth': 'सत्य', 'satya': 'सत्य',
  'righteousness': 'धर्म',
  'wealth': 'धन', 'dhan': 'धन',
  'pleasure': 'सुख',
  'work': 'काम',
  'attachment': 'मोह', 'moh': 'मोह',
  'detachment': 'वैराग्य', 'vairagya': 'वैराग्य',
  'renunciation': 'त्याग', 'tyag': 'त्याग',
  'self': 'स्व', 'swa': 'स्व',
  'mind': 'मन', 'man': 'मन',
  'intellect': 'बुद्धि',
  'ego': 'अहंकार', 'ahankar': 'अहंकार',
  'nature': 'प्रकृति', 'prakriti': 'प्रकृति',
  'consciousness': 'चेतना', 'chetna': 'चेतना',
  'enlightenment': 'ज्ञान',
}

// Enhanced transliteration function
function transliterateToHindi(text: string): string {
  let result = ''
  let i = 0
  const lowerText = text.toLowerCase()
  
  while (i < lowerText.length) {
    let matched = false
    
    // Try to match longer sequences first (up to 4 chars for complex combinations)
    for (let len = 4; len >= 2; len--) {
      if (i + len <= lowerText.length) {
        const substr = lowerText.substring(i, i + len)
        if (transliterationMap[substr]) {
          result += transliterationMap[substr]
          i += len
          matched = true
          break
        }
      }
    }
    
    // Try single character
    if (!matched) {
      const char = lowerText[i]
      if (transliterationMap[char]) {
        result += transliterationMap[char]
      } else if (char === ' ') {
        result += ' ' // Preserve spaces
      } else if (/[a-z]/.test(char)) {
        // Try to map common patterns
        // Handle 'aa' as 'आ' when followed by consonant
        if (char === 'a' && i + 1 < lowerText.length && /[bcdfghjklmnpqrstvwxyz]/.test(lowerText[i + 1])) {
          result += 'आ'
        } else {
          result += char // Keep original if no mapping
        }
      } else {
        result += char // Keep non-alphabetic characters
      }
      i++
    }
  }
  
  return result
}

// Check if text contains Devanagari script
function containsDevanagari(text: string): boolean {
  return /[\u0900-\u097F]/.test(text)
}

// Check if text is primarily English (Roman script)
function isEnglishText(text: string): boolean {
  // If it contains Devanagari, it's not English
  if (containsDevanagari(text)) {
    return false
  }
  // Check if it's mostly English letters
  return /^[a-zA-Z\s]+$/.test(text)
}

// Main function to convert English to Hindi
export function convertToHindi(text: string): string[] {
  const results: string[] = [text] // Always include original
  
  if (!isEnglishText(text)) {
    return results // Return original if not English
  }
  
  const lowerText = text.toLowerCase().trim()
  
  // First check translation dictionary (for complete words)
  if (translationMap[lowerText]) {
    results.push(translationMap[lowerText])
  }
  
  // Check transliteration for common words
  if (transliterationMap[lowerText]) {
    results.push(transliterationMap[lowerText])
  }
  
  // Try transliteration for the whole word
  const transliterated = transliterateToHindi(lowerText)
  if (transliterated !== lowerText && transliterated.length > 0) {
    results.push(transliterated)
  }
  
  // Also try word-by-word translation/transliteration
  const words = lowerText.split(/\s+/)
  if (words.length > 1) {
    const convertedWords = words.map(word => {
      if (translationMap[word]) {
        return translationMap[word]
      }
      if (transliterationMap[word]) {
        return transliterationMap[word]
      }
      return transliterateToHindi(word)
    })
    const combined = convertedWords.join(' ')
    if (combined !== lowerText) {
      results.push(combined)
    }
  }
  
  return [...new Set(results)] // Remove duplicates
}

