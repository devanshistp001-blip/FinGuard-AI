import { ShieldAlert, ShieldCheck, UserRoundX, WalletCards, LockKeyhole, TriangleAlert } from 'lucide-react';

const blocks = [
  { icon: ShieldCheck, title: 'No investment recommendations', text: 'FinGuard AI is designed to provide educational and verification guidance only. It does not tell users what to buy, sell, or hold.' },
  { icon: WalletCards, title: 'No broker or product promotion', text: 'The app does not recommend brokers, mutual funds, ETFs, or other financial products.' },
  { icon: LockKeyhole, title: 'No OTP or credential collection', text: 'FinGuard AI never asks for OTP, passwords, bank account credentials, UPI PIN, or brokerage login details.' },
  { icon: TriangleAlert, title: 'AI outputs can be uncertain', text: 'The result may highlight missing evidence or uncertainty because the provided content may be incomplete or promotional.' },
  { icon: UserRoundX, title: 'Users verify claims independently', text: 'Users should verify important claims with original sources, official records, and trustworthy information before acting.' },
];

function SafetyPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">Safety & privacy</p>
        <h1 className="mt-3 text-4xl font-bold text-slate-900">A safety-first assistant for financial content literacy.</h1>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {blocks.map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <Icon className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
            <p className="mt-3 text-slate-600">{text}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-[2rem] border border-slate-200 bg-slate-900 p-8 text-slate-200 shadow-soft">
        <div className="flex items-start gap-3">
          <ShieldAlert className="mt-1 h-6 w-6 text-cyan-300" />
          <p className="text-lg leading-8">
            FinGuard AI helps users evaluate financial content. It does not replace official sources, professional advice, or regulatory processes. It is a literacy and verification tool designed to support safer decision-making and critical thinking.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SafetyPage;
