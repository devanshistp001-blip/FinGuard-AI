import { ArrowRight, BadgeCheck, CheckCircle2, FileText, ShieldCheck, Sparkles, TrendingUp, TriangleAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

const checkItems = [
  'Claims being made and whether they sound guaranteed',
  'Urgency, pressure, and emotional manipulation',
  'Evidence gaps and missing source details',
  'Whether the content is educational, promotional, mixed, or uncertain',
  'Simple explanations for beginners and first-time investors',
  'Safe next steps for verification before acting',
];

const steps = [
  { number: '01', title: 'Submit Content', text: 'Paste a message or upload a screenshot from WhatsApp, Telegram, Instagram, YouTube, or a social post.' },
  { number: '02', title: 'Identify Claims', text: 'FinGuard AI highlights the main claim, the stated promise, and any pressure language being used.' },
  { number: '03', title: 'Detect Risk Signals', text: 'The review checks urgency, guarantees, missing evidence, and promotional behaviour.' },
  { number: '04', title: 'Verify Before Acting', text: 'You get a plain-language explanation, red flags, and practical steps to verify the content.' },
];

function HomePage() {
  return (
    <div className="bg-slate-950 text-slate-100">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.15),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(79,70,229,0.18),_transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:pb-24 lg:pt-20">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-cyan-200">
              <ShieldCheck className="h-3.5 w-3.5" />
              Financial content literacy
            </div>
            <h1 className="max-w-xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Before you trust a financial claim, check it.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-300">
              FinGuard AI helps you understand financial content, spot red flags, and verify claims before acting on them.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link to="/analyze" className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 px-6 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02]">
                Analyze Content
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/how-it-works" className="inline-flex items-center justify-center rounded-full border border-slate-600 bg-slate-900/70 px-6 py-3 font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-200">
                See How It Works
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-slate-300">
              <span className="inline-flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-cyan-400" /> Beginner-friendly</span>
              <span className="inline-flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-cyan-400" /> Hindi/Hinglish ready</span>
              <span className="inline-flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-cyan-400" /> Safety-focused</span>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-700/80 bg-slate-900/80 p-5 shadow-soft backdrop-blur-sm">
            <div className="rounded-[1.5rem] border border-slate-700 bg-slate-900 p-4">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  Content Analysis
                </div>
                <span className="rounded-full border border-amber-400/30 bg-amber-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-200">
                  Review Needed
                </span>
              </div>

              <div className="rounded-2xl border border-slate-700 bg-slate-800 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Claim identified</p>
                <p className="mt-2 text-lg font-semibold text-white">Guaranteed 30% return in 30 days.</p>
                <div className="mt-4 space-y-2 text-sm text-slate-300">
                  <div className="flex items-start gap-2"><TriangleAlert className="mt-0.5 h-4 w-4 text-amber-400" /> Pressure and urgency language is present.</div>
                  <div className="flex items-start gap-2"><FileText className="mt-0.5 h-4 w-4 text-cyan-400" /> Evidence is missing from the content.</div>
                  <div className="flex items-start gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 text-indigo-400" /> This appears promotional and needs verification.</div>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-700 bg-slate-800 p-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Type</p>
                  <p className="mt-2 font-semibold text-cyan-300">Promotion</p>
                </div>
                <div className="rounded-2xl border border-slate-700 bg-slate-800 p-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Check</p>
                  <p className="mt-2 font-semibold text-orange-300">Needs verification</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">The problem</p>
          <h2 className="mt-3 text-3xl font-bold text-white">Financial content can look credible even when it is vague, urgent, or unsupported.</h2>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-700 bg-slate-900 p-6">
            <TrendingUp className="h-10 w-10 rounded-2xl bg-cyan-500/10 p-2 text-cyan-300" />
            <h3 className="mt-4 text-xl font-semibold text-white">High-pressure language</h3>
            <p className="mt-2 text-slate-300">Messages often create urgency, fear, or excitement to push quick action.</p>
          </div>
          <div className="rounded-3xl border border-slate-700 bg-slate-900 p-6">
            <Sparkles className="h-10 w-10 rounded-2xl bg-indigo-500/10 p-2 text-indigo-300" />
            <h3 className="mt-4 text-xl font-semibold text-white">Confusing claims</h3>
            <p className="mt-2 text-slate-300">Promises can sound impressive but lack the evidence needed to verify them.</p>
          </div>
          <div className="rounded-3xl border border-slate-700 bg-slate-900 p-6">
            <ShieldCheck className="h-10 w-10 rounded-2xl bg-emerald-500/10 p-2 text-emerald-300" />
            <h3 className="mt-4 text-xl font-semibold text-white">No clear safety check</h3>
            <p className="mt-2 text-slate-300">People need a neutral way to inspect the message before they trust or share it.</p>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-800 bg-slate-900/90">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">What FinGuard AI checks</p>
            <h2 className="mt-3 text-3xl font-bold text-white">A simple review for content that may be convincing but incomplete.</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {checkItems.map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl border border-slate-700 bg-slate-950 p-4 text-slate-200">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-cyan-300" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">How it works</p>
          <h2 className="mt-3 text-3xl font-bold text-white">A clear four-step review flow.</h2>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.number} className="rounded-3xl border border-slate-700 bg-slate-900 p-6">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">{step.number}</div>
              <h3 className="mt-4 text-xl font-semibold text-white">{step.title}</h3>
              <p className="mt-3 text-slate-300">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-cyan-500/10 via-slate-900 to-indigo-500/10">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Built for Bharat</p>
            <h2 className="mt-3 text-3xl font-bold text-white">Designed for first-time investors, Tier-2/Tier-3 users, and social-media content consumers.</h2>
          </div>
          <div className="mt-8 rounded-3xl border border-slate-700 bg-slate-900 p-8 text-slate-200">
            <p>
              FinGuard AI is built to be simple, readable, and useful in English, Hindi, and Hinglish. The goal is not to tell people what to invest in. The goal is to help them understand what they are being told.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-700 bg-slate-900 p-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Safety first</p>
            <h2 className="mt-3 text-3xl font-bold text-white">FinGuard AI provides educational and verification guidance. It does not provide investment recommendations.</h2>
          </div>
          <div className="mt-8 flex flex-col gap-4 md:flex-row">
            <div className="flex-1 rounded-2xl border border-slate-700 bg-slate-950 p-5">
              <p className="font-semibold text-white">What it avoids</p>
              <ul className="mt-3 space-y-2 text-slate-300">
                <li>• Buy/sell/hold advice</li>
                <li>• Stock or fund recommendations</li>
                <li>• Broker or product promotion</li>
                <li>• OTP or login credential requests</li>
              </ul>
            </div>
            <div className="flex-1 rounded-2xl border border-slate-700 bg-slate-950 p-5">
              <p className="font-semibold text-white">What it does</p>
              <ul className="mt-3 space-y-2 text-slate-300">
                <li>• Explains the claim clearly</li>
                <li>• Flags missing evidence</li>
                <li>• Highlights uncertainty</li>
                <li>• Suggests verification steps</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-slate-900 p-8 text-center shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Final CTA</p>
          <h2 className="mt-4 text-3xl font-bold text-white">Pause before you act. Check the claim. Understand the risk.</h2>
          <Link to="/analyze" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-100">
            Analyze Content
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
