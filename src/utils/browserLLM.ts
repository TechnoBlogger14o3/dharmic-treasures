/**
 * Browser-based LLM using Transformers.js
 * Runs entirely in the browser - no external API needed
 */

export interface LLMResponse {
  text: string
  error?: string
}

let pipeline: any = null
let isInitializing = false
let initializationPromise: Promise<void> | null = null

// Use a small, efficient model suitable for browser
const MODEL_NAME = 'Xenova/Qwen2.5-0.5B-Instruct' // Small, fast model (~300MB)
// Alternative models:
// - 'Xenova/LaMini-Flan-T5-248M' (even smaller, ~100MB)
// - 'Xenova/llama-3.2-1B-instruct' (better quality, ~600MB)

/**
 * Initialize the Transformers.js pipeline
 */
async function initializePipeline(): Promise<void> {
  if (pipeline) {
    return // Already initialized
  }

  if (isInitializing && initializationPromise) {
    return initializationPromise // Wait for ongoing initialization
  }

  isInitializing = true
  initializationPromise = (async () => {
    try {
      // Dynamically import transformers.js only when needed
      const transformers = await import('@xenova/transformers')
      const createPipeline = transformers.pipeline
      
      pipeline = await createPipeline('text-generation', MODEL_NAME, {
        quantized: true, // Use quantized model for smaller size
        // WebGPU/CPU selection is automatic based on availability
      })
      
      isInitializing = false
    } catch (error: any) {
      isInitializing = false
      initializationPromise = null
      throw new Error(`Failed to initialize LLM: ${error.message}`)
    }
  })()

  return initializationPromise
}

/**
 * Generate response using browser-based LLM
 */
export async function generateLLMResponse(
  userQuery: string,
  relevantVerses: Array<{ chapter: number; verse: number; meaning: string; chapterName: string }>
): Promise<LLMResponse> {
  try {
    // Initialize pipeline if needed
    if (!pipeline) {
      await initializePipeline()
    }

    // Build context from relevant verses
    const context = relevantVerses
      .slice(0, 5) // Limit to top 5 verses for context
      .map(
        (v) =>
          `Chapter ${v.chapter} (${v.chapterName}), Verse ${v.verse}:\n${v.meaning}`
      )
      .join('\n\n')

    const systemPrompt = `You are a helpful assistant that explains verses from the Bhagavad Gita. 
You provide clear, insightful explanations that help users understand the spiritual wisdom.
Always be respectful, accurate, and encouraging.
When relevant verses are provided, reference them naturally in your response.
Keep responses concise (2-3 sentences) and focused.`

    const prompt = `<|im_start|>system
${systemPrompt}<|im_end|>
<|im_start|>user
Context from Bhagavad Gita:
${context}

User Question: ${userQuery}

Provide a helpful response that explains the relevant verses and answers the user's question:<|im_end|>
<|im_start|>assistant
`

    // Generate response
    const result = await pipeline(prompt, {
      max_new_tokens: 200, // Limit response length
      temperature: 0.7,
      top_p: 0.9,
      do_sample: true,
    })

    const responseText = result[0]?.generated_text || ''
    
    // Extract only the assistant's response (remove prompt)
    const assistantResponse = responseText
      .split('<|im_start|>assistant')[1]
      ?.split('<|im_end|>')[0]
      ?.trim() || responseText.trim()

    if (!assistantResponse) {
      return {
        text: '',
        error: 'Empty response from LLM',
      }
    }

    return {
      text: assistantResponse,
    }
  } catch (error: any) {
    console.error('LLM generation error:', error)
    return {
      text: '',
      error: `LLM error: ${error.message}. Falling back to keyword search.`,
    }
  }
}

/**
 * Check if LLM is available/initialized
 */
export function isLLMAvailable(): boolean {
  return pipeline !== null
}

/**
 * Check if browser supports WebGPU (for better performance)
 */
export function supportsWebGPU(): boolean {
  return 'gpu' in navigator
}

/**
 * Get model info
 */
export function getModelInfo() {
  return {
    name: MODEL_NAME,
    supportsWebGPU: supportsWebGPU(),
    isInitialized: isLLMAvailable(),
  }
}
