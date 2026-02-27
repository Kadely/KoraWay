export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages, system, max_tokens } = req.body;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: max_tokens || 500,
        system: system || '',
        messages: messages
      })
    });

    const data = await response.json();
    const text = data.content?.[0]?.text || null;
    res.status(200).json({ text });
  } catch (err) {
    res.status(500).json({ error: 'API error', text: null });
  }
}
