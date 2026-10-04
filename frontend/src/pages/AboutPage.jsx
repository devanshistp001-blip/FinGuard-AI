import { Target, Users, Globe2 } from 'lucide-react';

function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">About / mission</p>
        <h1 className="mt-3 text-4xl font-bold text-slate-900">Don't tell people what to invest in. Help them understand what they're being told.</h1>
        <p className="mt-6 text-lg text-slate-700">
          FinGuard AI is built to improve financial content literacy and resilience across a broad set of users. The product is designed to help first-time investors, learners, and social-media users understand whether a message is promotional, educational, mixed, or uncertain before acting on it.
        </p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <Target className="h-10 w-10 rounded-2xl bg-cyan-50 p-2 text-cyan-700" />
          <h2 className="mt-4 text-xl font-semibold text-slate-900">Mission</h2>
          <p className="mt-3 text-slate-600">Improve understanding of financial claims and reduce harm caused by pressure, misinformation, and vague promises.</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <Users className="h-10 w-10 rounded-2xl bg-indigo-50 p-2 text-indigo-700" />
          <h2 className="mt-4 text-xl font-semibold text-slate-900">Users</h2>
          <p className="mt-3 text-slate-600">Built for first-time investors, Tier-2/Tier-3 users, Hindi/Hinglish speakers, and consumers of social-media financial content.</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <Globe2 className="h-10 w-10 rounded-2xl bg-emerald-50 p-2 text-emerald-700" />
          <h2 className="mt-4 text-xl font-semibold text-slate-900">Reach</h2>
          <p className="mt-3 text-slate-600">Designed to work in English and Hindi/Hinglish so that more people can evaluate messages with clarity and confidence.</p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
