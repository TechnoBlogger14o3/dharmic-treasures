const MODEL = process.env.HF_MODEL || 'Suru/Bhagvad-Gita-LLM'
const HF_API_TOKEN = process.env.HF_API_TOKEN

const buildPrompt = (query: string) => `<s>[INST] Hello Krishna, ${query} [/INST]`

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    res.status(204).end()
    return
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  if (!HF_API_TOKEN) {
    res.status(500).json({ error: 'HF_API_TOKEN is not configured' })
    return
  }

  const query = typeof req.body?.query === 'string' ? req.body.query.trim() : ''
  if (!query) {
    res.status(400).json({ error: 'Query is required' })
    return
  }

  try {
    const response = await fetch('https://router.huggingface.co/v1/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HF_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        prompt: buildPrompt(query),
        max_tokens: 300,
        temperature: 0.7,
      }),
    })

    const data = await response.json()
    if (!response.ok) {
      res.status(502).json({ error: data?.error || 'Inference failed' })
      return
    }

    const generatedText =
      typeof data?.choices?.[0]?.text === 'string'
        ? data.choices[0].text
        : Array.isArray(data) && typeof data[0]?.generated_text === 'string'
          ? data[0].generated_text
          : typeof data?.generated_text === 'string'
            ? data.generated_text
            : ''

    res.status(200).json({
      reply: generatedText.trim(),
      model: MODEL,
    })
  } catch (error: any) {
    res.status(500).json({ error: error?.message || 'Unexpected error' })
  }
}
