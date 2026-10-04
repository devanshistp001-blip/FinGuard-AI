import { AlertCircle, CheckCircle2, LoaderCircle } from 'lucide-react';

function LoadingState({ steps = [] }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
      <div className="flex items-center gap-3">
        <LoaderCircle className="h-5 w-5 animate-spin text-indigo-600" />
        <p className="text-base font-semibold text-slate-900">Reviewing the content</p>
      </div>
      <div className="mt-6 space-y-3">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center gap-3 text-sm text-slate-600">
            <div className="flex h-6 w-6 items-center justify-center rounded-full border border-indigo-200 bg-indigo-50 text-indigo-700">
              {index + 1}
            </div>
            <span>{step}</span>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700">
        <AlertCircle className="h-4 w-4" />
        This is a safety review, not an investment recommendation.
      </div>
    </div>
  );
}

export default LoadingState;
