import { NavLink, Link } from 'react-router-dom';
import { ShieldCheck, Sparkles, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Analyze Content', to: '/analyze' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Safety & Privacy', to: '/safety' },
  { label: 'About', to: '/about' },
  { label: 'Demo Examples', to: '/demo-examples' },
];

function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-800">
      <header className="sticky top-0 z-50 border-b border-slate-700/70 bg-slate-950/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3 text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-indigo-500 to-indigo-700 shadow-lg shadow-cyan-500/20">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="text-lg font-bold">FinGuard AI</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-slate-300">Pause. Check. Understand.</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition ${isActive ? 'text-cyan-300' : 'text-slate-300 hover:text-white'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link
              to="/analyze"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02]"
            >
              <Sparkles className="h-4 w-4" />
              Analyze Content
            </Link>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            className="rounded-lg border border-slate-600 p-2 text-slate-200 lg:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-slate-700 bg-slate-950 px-4 py-4 lg:hidden">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2 text-sm font-medium ${isActive ? 'bg-slate-800 text-cyan-300' : 'text-slate-300'}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </header>

      <main>{children}</main>

      <footer className="border-t border-slate-700 bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-slate-300 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <div className="font-semibold text-white">FinGuard AI</div>
            <p className="mt-1 text-slate-400">FinGuard AI provides educational and verification guidance. It does not provide investment recommendations.</p>
          </div>
          <div className="text-slate-400">SANGYAN Investor Resilience Hackathon 2026</div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
