# FinGuard AI

Tagline: Pause. Check. Understand.

## Problem

Retail and first-time investors often receive financial content through WhatsApp, Instagram, YouTube, Telegram and social posts. These messages can sound convincing, urgent, or educational, but they may hide exaggerated claims, promotional pressure, missing evidence, or misleading promises.

## Solution

FinGuard AI is a financial-content safety assistant that helps users review financial claims before acting on them. It identifies the likely claim being made, highlights red flags, explains whether the content looks educational or promotional, and points users to the evidence they should verify independently.

It does not provide investment recommendations, stock picks, trading signals, or buy/sell guidance.

## Key Features

- Paste text or upload a screenshot containing financial content
- AI-powered claim and red-flag analysis
- Educational vs promotional classification
- Evidence checklist and uncertainty notes
- Beginner-friendly explanation in English and Hindi/Hinglish
- Safe demo fallback when the AI service is unavailable
- Privacy-conscious design focused on education and verification

## User Journey

1. Open the landing page
2. Click Analyze Content
3. Paste a message or upload a screenshot
4. Review the detected claim and red flags
5. Read the guidance and safe next steps
6. Switch to Hindi/Hinglish explanation if needed

## Tech Stack

- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express.js
- AI: Google Gemini API
- OCR: Tesseract.js (browser-based fallback for image text extraction)

## Architecture

Frontend -> Backend API -> Gemini AI -> Structured JSON Response -> Result Page

## Safety Guardrails

FinGuard AI is designed to provide educational and verification guidance only. The app:

- does not give buy/sell/hold advice
- does not predict prices
- does not recommend stocks, mutual funds, ETFs, brokers, or financial products
- does not ask for OTP, bank account details, UPI PIN, passwords, or brokerage credentials
- clearly identifies uncertainty and missing evidence
- avoids pretending to be official verification or regulatory approval

## Local Setup

### 1) Copy environment example

```bash
cd backend
cp .env.example .env
```

Windows PowerShell:

```powershell
cd backend
Copy-Item .env.example .env
```

### 2) Add your Gemini API key locally

Open `backend/.env` and set a real key only on your machine. Do not commit a real key to GitHub or the project files.

```env
GEMINI_API_KEY=your_key_here
```

If no valid key is available, the app automatically runs in demo mode with a clearly labeled warning.

### 3) Install dependencies

Frontend:

```bash
cd frontend
npm install
```

Backend:

```bash
cd backend
npm install
```

### 4) Start backend

```bash
cd backend
npm run dev
```

### 5) Start frontend

In a new terminal:

```bash
cd frontend
npm run dev
```

Then open the frontend URL shown in the terminal.

## Demo Mode

If `GEMINI_API_KEY` is missing or the Gemini API fails, the app runs in demo mode using predefined fictional analysis results. The UI clearly labels this as Demo mode so it is not mistaken for live AI output.

## Deploy to Render

The root `render.yaml` defines a Node web service for the backend and a static site for the frontend. To deploy:

1. Push this project to a GitHub repository and connect that repository in the Render Dashboard using **New > Blueprint**.
2. Set `GEMINI_API_KEY` for the backend when prompted, or leave it empty to use clearly labeled demo mode. Keep this key only in the backend environment; never add it to the frontend. If `CORS_ORIGINS` or `VITE_API_URL` are requested before service URLs exist, leave them empty for the initial deployment.
3. After Render assigns public URLs, set the backend's `CORS_ORIGINS` to the frontend origin (for example, `https://your-frontend.onrender.com`, with no trailing slash).
4. Set the frontend's `VITE_API_URL` to the backend base URL (for example, `https://your-api.onrender.com`, with no `/api` suffix), then trigger a new frontend deploy so Vite includes the setting in its build.
5. Verify the backend health check at `https://your-api.onrender.com/health`, then test Analyze Content on the deployed frontend.

The Render environment variables are intentionally not committed. Local development continues to use the ignored `.env` files.

## Project Structure

```text
FinGuard/
├── .gitignore
├── README.md
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx
│       ├── data/
│       ├── index.css
│       ├── main.jsx
│       ├── pages/
│       ├── services/
│       └── components/
├── backend/
│   ├── .env.example
│   ├── package.json
│   ├── server.js
│   └── src/
│       ├── app.js
│       ├── data/
│       ├── prompts/
│       ├── routes/
│       └── services/
└── .gitignore
```

## Future Scope

- stronger multilingual finance literacy prompts
- more contextual verification guidance
- broader image extraction and multi-language OCR support
- export/share summaries for users and community awareness campaigns

## Hackathon Track

SANGYAN Investor Resilience Hackathon 2026
Track E — Misinformation & Financial Content Literacy

## Important Disclaimer

This project is a hackathon MVP prototype designed for demo and educational use. It does not claim regulatory approval, partnership, or live market verification. It is intended to help users evaluate financial content more critically.
