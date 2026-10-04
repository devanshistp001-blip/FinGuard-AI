import { ArrowDown, Camera, CheckCircle2, CircleDashed, Search, ShieldCheck } from 'lucide-react';

const steps = [
  { icon: Search, title: 'Submit Content', text: 'Paste a message or upload a screenshot from WhatsApp, Telegram, Instagram, YouTube, or a social post.' },
  { icon: CircleDashed, title: 'Identify Claims', text: 'The system separates the main claim, urgency cues, and any promotional language.' },
  { icon: ShieldCheck, title: 'Detect Risk Signals', text: 'It highlights red flags like guaranteed returns, pressure, missing evidence, and vague promises.' },
  { icon: CheckCircle2, title: 'Verify Before Acting', text: 'You get a plain-language explanation and a checklist for checking the claim independently.' },
];

function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600">How it works</p>
        <h1 className="mt-3 text-4xl font-bold text-slate-900">A quick, beginner-friendly review flow.</h1>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-4">
        {steps.map(({ icon: Icon, title, text }, index) => (
          <div key={title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <Icon className="h-5 w-5" />
            </div>
            <div className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">Step {index + 1}</div>
            <h2 className="text-xl font-bold text-slate-900">{title}</h2>
            <p className="mt-3 text-slate-600">{text}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
        <div className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">Architecture</div>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 text-center text-slate-700 lg:flex-row">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium">Input</div>
          <ArrowDown className="h-5 w-5 text-slate-400" />
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium">Text / Screenshot</div>
          <ArrowDown className="h-5 w-5 text-slate-400" />
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium">Extraction</div>
          <ArrowDown className="h-5 w-5 text-slate-400" />
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium">AI Analysis</div>
          <ArrowDown className="h-5 w-5 text-slate-400" />
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium">Safety Checks</div>
          <ArrowDown className="h-5 w-5 text-slate-400" />
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium">Explainable Result</div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorksPage;
