import { Link } from "react-router-dom";
import trackifyLogo from "../assets/trackify-logo.svg";

function FeatureCard({ icon, title, description, tone = "light" }) {
  const base =
    tone === "glass"
      ? "border-white/20 bg-white/10 text-white"
      : "border-slate-200 bg-white text-slate-900 shadow-sm";
  return (
    <div className={`rounded-2xl border p-6 ${base}`}>
      <div
        className={`mb-4 inline-flex rounded-xl p-2.5 ${
          tone === "glass" ? "bg-white/20" : "bg-blue-50 text-blue-700"
        }`}
      >
        {icon}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className={`mt-2 text-sm ${tone === "glass" ? "text-blue-100" : "text-slate-600"}`}>{description}</p>
    </div>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-50 border-b border-white/20 bg-blue-700/55 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <img src={trackifyLogo} alt="Trackify logo" className="h-10 w-10 rounded-xl ring-2 ring-white/30" />
            <div>
              <p className="text-lg font-semibold text-white">Trackify</p>
              <p className="text-xs text-blue-200">No-stress money management</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="rounded-xl border border-white/60 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-800 text-white">
        <div className="pointer-events-none absolute -left-16 top-20 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-indigo-300/20 blur-3xl" />
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div className="self-center">
            <p className="inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium text-blue-100">
              Free forever · Built for real life
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Money clarity,
              <br />
              without spreadsheets.
            </h1>
            <p className="mt-5 max-w-xl text-base text-blue-100 sm:text-lg">
              Trackify helps you capture daily expenses, see patterns, and stick to budgets - in a clean dashboard
              you will actually use.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/signup"
                className="rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 shadow-lg shadow-blue-900/20 transition hover:-translate-y-0.5"
              >
                Get Started Free
              </Link>
              <a
                href="#how-it-works"
                className="rounded-xl border border-white/70 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                See how it works
              </a>
            </div>
            <p className="mt-4 text-sm text-blue-200">No credit card · No ads · Works on all devices</p>
          </div>

          <div className="self-center lg:pl-4">
            <div className="rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-xs text-blue-100">April spending</p>
                  <p className="mt-1 text-2xl font-semibold">Rs12,400</p>
                </div>
                <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-xs text-blue-100">Budget left</p>
                  <p className="mt-1 text-2xl font-semibold">Rs5,600</p>
                </div>
              </div>
              <div className="mt-4 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs text-blue-100">Essentials</p>
                  <p className="text-xs text-blue-100">72%</p>
                </div>
                <div className="h-2 rounded-full bg-white/25">
                  <div className="h-2 w-[72%] rounded-full bg-white" />
                </div>
              </div>
              <div className="mt-4 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-xs text-blue-100">Quick insight</p>
                <p className="mt-2 text-sm text-white/90">
                  You spend more on weekends. Set a weekend cap to save ~Rs1,200/month.
                </p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <FeatureCard
                tone="glass"
                icon={
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M4 7h16v10H4zM4 10h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                }
                title="Fast"
                description="Log in seconds"
              />
              <FeatureCard
                tone="glass"
                icon={
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M4 19V6m0 13h16M9 15V9m5 6V7m5 8v-4" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                }
                title="Clear"
                description="Visual reports"
              />
              <FeatureCard
                tone="glass"
                icon={
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                }
                title="Smart"
                description="Budget alerts"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between gap-5">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-blue-600">Core Features</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">Everything you need to manage money</h2>
            </div>
            <p className="hidden max-w-xs text-sm text-slate-500 md:block">
              Clean workflows and practical insights for daily spending control.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            <FeatureCard
              icon={
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 7h16v10H4zM4 10h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                </svg>
              }
              title="Track every rupee"
              description="Every transaction categorised automatically"
            />
            <FeatureCard
              icon={
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M4 19V6m0 13h16M9 15V9m5 6V7m5 8v-4"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                  />
                </svg>
              }
              title="Visual reports"
              description="Monthly and yearly spending trends at a glance"
            />
            <FeatureCard
              icon={
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.75" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
                </svg>
              }
              title="Budget control"
              description="Set limits per category and never overspend again"
            />
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-slate-100 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-slate-900">Up and running in minutes</h2>
          <div className="relative mt-12 grid gap-8 md:grid-cols-3">
            <div className="absolute left-1/2 top-7 hidden w-2/3 -translate-x-1/2 border-t-2 border-dashed border-blue-200 md:block" />
            {[
              ["1", "Create free account", "Sign up and set your default currency"],
              ["2", "Add your expenses", "Log entries with category, note, and date"],
              ["3", "Track & save more", "Watch trends and stay under budget limits"],
            ].map(([step, title, desc]) => (
              <div key={step} className="relative z-10 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-lg font-bold text-white">
                  {step}
                </div>
                <h3 className="font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-blue-600 to-indigo-800 py-14 text-white">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            ["100% Free", "No hidden charges"],
            ["50K Users", "Supported on free tier"],
            ["All devices", "Mobile responsive"],
          ].map(([title, subtitle]) => (
            <div
              key={title}
              className="rounded-2xl border border-white/20 bg-white/10 p-5 text-center backdrop-blur-sm transition hover:bg-white/15"
            >
              <p className="text-2xl font-semibold">{title}</p>
              <p className="mt-1 text-sm text-blue-200">{subtitle}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900">Start tracking your expenses today</h2>
          <p className="mt-2 text-slate-600">Simple, free, and designed to help you stay in control every day.</p>
          <Link
            to="/signup"
            className="mt-8 inline-flex rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-0.5"
          >
            Get Started Free →
          </Link>
        </div>
      </section>

      <footer className="bg-gray-900 py-10 text-gray-300">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 border-b border-gray-800 pb-5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <img src={trackifyLogo} alt="Trackify logo" className="h-9 w-9 rounded-lg" />
              <span className="text-lg font-semibold text-white">Trackify</span>
            </div>
            <p className="text-sm">Built with React + Supabase · Hosted on Vercel</p>
          </div>
          <p className="pt-5 text-sm text-gray-400">© 2024 Trackify · Free forever</p>
        </div>
      </footer>
    </div>
  );
}
