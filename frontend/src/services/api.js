const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3001').replace(/\/$/, '');

export async function analyzeContent({ text, imageDataUrl = null }) {
  const response = await fetch(`${API_BASE_URL}/api/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text, imageDataUrl }),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok && !payload.analysis) {
    throw new Error(payload.message || 'Failed to analyze the content.');
  }

  return payload;
}
