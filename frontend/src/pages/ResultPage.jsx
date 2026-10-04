import { useMemo, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, BadgeCheck, CheckCircle2, FileText, ShieldAlert, ShieldCheck, TriangleAlert } from 'lucide-react';

const defaultAnalysis = {
  claim: 'No claim detected from the provided content.',
  summary: 'The content could not be reliably interpreted from the submitted message.',
  redFlags: [],
  contentType: 'uncertain',
  contentTypeExplanation: 'This content is uncertain because no clear claim was identified.',
  evidenceChecklist: ['Identify the original source.', 'Look for supporting evidence and context.', 'Check whether the claims are backed by reliable documentation.'],
  uncertainty: ['The system cannot determine the full context from the provided content alone.'],
  simpleExplanation: 'This message is too unclear to trust as a reliable financial claim. Check the source and seek clear evidence before taking action.',
  hindiExplanation: 'Yeh message itna clear nahi hai ki is par trust kiya ja sake. Source ko check kijiye aur evidence dhoondo before any action.',
  safeNextSteps: ['Find the original source.', 'Check whether the claim provides evidence.', 'Compare the statement with reliable official information.'],
};

const severityStyles = {
  low: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  medium: 'border-amber-200 bg-amber-50 text-amber-700',
  high: 'border-red-200 bg-red-50 text-red-700',
};

function ResultPage() {
  const location = useLocation();
  const result = location.state?.analysis || defaultAnalysis;
  const demoMode = Boolean(location.state?.demoMode);
  const warning = location.state?.warning || '';
  const [language, setLanguage] = useState('en');

  const status = useMemo(() => {
    if (result.contentType === 'promotion') return 'Verification Recommended';
    return 'Review Needed';
  }, [result.contentType]);

  const explanationText = language === 'hi' ? result.hindiExplanation || result.simpleExplanation : result.simpleExplanation;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <Link to="/analyze" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            <ArrowLeft className="h-4 w-4" />
            Back to analysis
          </Link>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1 shadow-sm">
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${language === 'en' ? 'bg-slate-900 text-white' : 'text-slate-600'}`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => setLanguage('hi')}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${language === 'hi' ? 'bg-slate-900 text-white' : 'text-slate-600'}`}
          >
            Hindi / Hinglish
          </button>
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">Content analysis</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">{status}</h1>
          </div>
          <div className="flex flex-col gap-2 md:items-end">
            <div className="flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-medium text-amber-700">
              <ShieldAlert className="h-4 w-4" />
              FinGuard AI provides educational and verification guidance. It does not provide investment recommendations.
            </div>
            {demoMode && (
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">
                <BadgeCheck className="h-3.5 w-3.5" />
                Demo mode
              </div>
            )}
          </div>
        </div>

        {demoMode && warning && (
          <div className="mt-4 rounded-2xl border border-violet-200 bg-violet-50 p-3 text-sm text-violet-700">
            {warning}
          </div>
        )}

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              <FileText className="h-4 w-4 text-cyan-600" />
              Claim identified
            </div>
            <p className="text-xl font-bold text-slate-900">{result.claim}</p>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              <BadgeCheck className="h-4 w-4 text-indigo-600" />
              What this content is doing
            </div>
            <p className="text-base text-slate-700">{result.contentTypeExplanation || result.summary}</p>
          </section>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="rounded-3xl border border-slate-200 bg-white p-5">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              Red flags
            </div>
            {result.redFlags && result.redFlags.length > 0 ? (
              <div className="space-y-4">
                {result.redFlags.map((flag) => (
                  <div key={flag.title} className={`rounded-2xl border p-4 ${severityStyles[flag.severity] || severityStyles.medium}`}>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <h3 className="font-semibold">{flag.title}</h3>
                      <span className="rounded-full bg-white/80 px-2 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold">{flag.severity}</span>
                    </div>
                    <p className="text-sm">{flag.explanation}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-600">No clear red flags were identified in the provided content. However, the message still needs evidence and context to be trusted.</p>
            )}
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-5">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              Education vs promotion
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-slate-700">Classification</span>
                <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">
                  {result.contentType}
                </span>
              </div>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">
                <div
                  className={`h-full rounded-full ${
                    result.contentType === 'education'
                      ? 'w-1/4 bg-emerald-500'
                      : result.contentType === 'promotion'
                        ? 'w-2/3 bg-orange-500'
                        : result.contentType === 'mixed'
                          ? 'w-1/2 bg-amber-500'
                          : 'w-full bg-slate-400'
                  }`}
                />
              </div>
              <p className="mt-3 text-sm text-slate-600">{result.contentTypeExplanation}</p>
            </div>
          </section>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="rounded-3xl border border-slate-200 bg-white p-5">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Evidence to verify
            </div>
            <ul className="space-y-3">
              {(result.evidenceChecklist || []).map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-cyan-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-5">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              <TriangleAlert className="h-4 w-4 text-slate-500" />
              Uncertainty
            </div>
            <ul className="space-y-3">
              {(result.uncertainty || []).map((item) => (
                <li key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-8 rounded-3xl border border-indigo-100 bg-indigo-50 p-5">
          <div className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-indigo-700">
            {language === 'en' ? 'Simple explanation' : 'Hindi / Hinglish explanation'}
          </div>
          <p className="text-lg leading-8 text-slate-800">{explanationText}</p>
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <div className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Hindi / Hinglish explanation</div>
          <p className="text-lg leading-8 text-slate-800">{result.hindiExplanation || result.simpleExplanation}</p>
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-5">
          <div className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Safe next steps</div>
          <ul className="space-y-3">
            {(result.safeNextSteps || []).map((step) => (
              <li key={step} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
                <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-700">✓</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
