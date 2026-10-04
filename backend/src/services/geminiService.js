import dotenv from 'dotenv';
import path from 'node:path';
import { GoogleGenAI } from '@google/genai';
import { systemPrompt } from '../prompts/systemPrompt.js';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const responseSchema = {
  type: 'OBJECT',
  properties: {
    claim: { type: 'STRING' },
    summary: { type: 'STRING' },
    redFlags: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          title: { type: 'STRING' },
          explanation: { type: 'STRING' },
          severity: { type: 'STRING', enum: ['low', 'medium', 'high'] },
        },
        required: ['title', 'explanation', 'severity'],
      },
    },
    contentType: { type: 'STRING', enum: ['education', 'promotion', 'mixed', 'uncertain'] },
    contentTypeExplanation: { type: 'STRING' },
    evidenceChecklist: { type: 'ARRAY', items: { type: 'STRING' } },
    uncertainty: { type: 'ARRAY', items: { type: 'STRING' } },
    simpleExplanation: { type: 'STRING' },
    hindiExplanation: { type: 'STRING' },
    safeNextSteps: { type: 'ARRAY', items: { type: 'STRING' } },
  },
  required: [
    'claim',
    'summary',
    'redFlags',
    'contentType',
    'contentTypeExplanation',
    'evidenceChecklist',
    'uncertainty',
    'simpleExplanation',
    'hindiExplanation',
    'safeNextSteps',
  ],
};

function ensureValidAnalysis(data) {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid analysis object returned by Gemini.');
  }

  const requiredFields = [
    'claim',
    'summary',
    'redFlags',
    'contentType',
    'contentTypeExplanation',
    'evidenceChecklist',
    'uncertainty',
    'simpleExplanation',
    'hindiExplanation',
    'safeNextSteps',
  ];

  for (const field of requiredFields) {
    if (!(field in data)) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  if (!['education', 'promotion', 'mixed', 'uncertain'].includes(data.contentType)) {
    throw new Error('Invalid contentType returned by Gemini.');
  }

  if (!Array.isArray(data.redFlags) || !Array.isArray(data.evidenceChecklist) || !Array.isArray(data.uncertainty) || !Array.isArray(data.safeNextSteps)) {
    throw new Error('Gemini returned malformed arrays.');
  }

  for (const flag of data.redFlags) {
    if (!flag || typeof flag.title !== 'string' || typeof flag.explanation !== 'string' || !['low', 'medium', 'high'].includes(flag.severity)) {
      throw new Error('Gemini returned malformed redFlags.');
    }
  }
}

export async function analyzeWithGemini(text) {
  const apiKey = process.env.GEMINI_API_KEY?.trim();

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY missing.');
  }

  const ai = new GoogleGenAI({ apiKey });

  const userMessage = `Analyze the following financial content. Output valid JSON only.\n\n${text}`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [{ role: 'user', parts: [{ text: userMessage }] }],
    config: {
      systemInstruction: systemPrompt,
      responseMimeType: 'application/json',
      responseSchema,
      temperature: 0.2,
    },
  });

  const raw = response?.text || '{}';
  const cleaned = String(raw).replace(/```json|```/g, '').trim();

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (error) {
    throw new Error('Gemini returned invalid JSON.');
  }

  ensureValidAnalysis(parsed);
  return parsed;
}
