import { ArrowRight, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fictionalDemoExamples } from '../data/demoExamples';

function DemoExamplesPage() {
  const navigate = useNavigate();

  const openExample = (content) => {
    navigate('/analyze', { state: { exampleText: content } });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">Demo examples</p>
        <h1 className="mt-3 text-4xl font-bold text-slate-900">Fictional content to demonstrate the review flow.</h1>
      </div>

      <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
        <div className="flex items-center gap-2 font-semibold">
          <ShieldAlert className="h-4 w-4" />
          Fictional demonstration content — not financial advice.
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {fictionalDemoExamples.map((example) => (
          <button
            key={example.id}
            type="button"
            onClick={() => openExample(example.content)}
            className="rounded-[2rem] border border-slate-200 bg-white p-6 text-left shadow-soft transition hover:-translate-y-1 hover:border-cyan-300 hover:shadow-lg"
          >
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">{example.title}</div>
            <p className="text-base leading-7 text-slate-700">{example.content}</p>
            <div className="mt-5 inline-flex items-center gap-2 font-semibold text-slate-900">
              Open in analyzer
              <ArrowRight className="h-4 w-4" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default DemoExamplesPage;
