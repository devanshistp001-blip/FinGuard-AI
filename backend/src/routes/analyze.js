import express from 'express';
import { analyzeWithGemini } from '../services/geminiService.js';
import { buildDemoAnalysis } from '../data/demoFallback.js';

const router = express.Router();

router.post('/analyze', async (req, res) => {
  try {
    const { text, imageDataUrl } = req.body || {};
    const userText = typeof text === 'string' ? text.trim() : '';
    const contentText = userText || (typeof imageDataUrl === 'string' ? imageDataUrl : '');

    if (!contentText) {
      return res.status(400).json({ message: 'Please provide some content or upload a screenshot before analyzing.' });
    }

    try {
      const analysis = await analyzeWithGemini(contentText);
      return res.json({ analysis, demoMode: false, warning: '' });
    } catch (geminiError) {
      const apiKeyMissing = !process.env.GEMINI_API_KEY || !process.env.GEMINI_API_KEY.trim();
      const fallbackAnalysis = buildDemoAnalysis(contentText);

      return res.status(200).json({
        analysis: fallbackAnalysis,
        demoMode: true,
        warning: apiKeyMissing
          ? 'Live Gemini analysis is unavailable because GEMINI_API_KEY is not configured. Demo mode is being used as a safe fallback.'
          : 'Live Gemini analysis failed. Demo mode is being used as a safe fallback while the API is unavailable.',
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Unable to analyze the content right now. Please try again later.',
    });
  }
});

export default router;
