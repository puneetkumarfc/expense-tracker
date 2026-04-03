import trackifyLogo from "../../assets/trackify-logo.svg";

export default function AuthSidePanel() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-800 px-6 py-8 text-white lg:w-2/5 lg:px-10 lg:py-12">
      <div className="relative z-10 mx-auto max-w-md">
        <div className="mb-7 flex items-center gap-3">
          <img src={trackifyLogo} alt="Trackify logo" className="h-11 w-11 rounded-xl ring-2 ring-white/30" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Trackify</h1>
            <p className="text-sm text-blue-100">Smart expense tracking</p>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 lg:mt-16">
          <div className="flex cursor-default items-center gap-4 rounded-2xl border border-white/20 bg-white/10 px-5 py-4 backdrop-blur-sm transition-all duration-200 hover:bg-white/20">
            <div className="flex shrink-0 items-center justify-center rounded-xl bg-white/20 p-2.5">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 3V9m0 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white">Track every rupee</p>
              <p className="text-xs text-blue-200">Every transaction, categorised</p>
            </div>
          </div>
          <div className="flex cursor-default items-center gap-4 rounded-2xl border border-white/20 bg-white/10 px-5 py-4 backdrop-blur-sm transition-all duration-200 hover:bg-white/20">
            <div className="flex shrink-0 items-center justify-center rounded-xl bg-white/20 p-2.5">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M4 19V5M4 19h16M8 15V9m4 6V7m4 8v-4"
                  stroke="white"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white">Visual spending reports</p>
              <p className="text-xs text-blue-200">Monthly trends at a glance</p>
            </div>
          </div>
          <div className="flex cursor-default items-center gap-4 rounded-2xl border border-white/20 bg-white/10 px-5 py-4 backdrop-blur-sm transition-all duration-200 hover:bg-white/20">
            <div className="flex shrink-0 items-center justify-center rounded-xl bg-white/20 p-2.5">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.75" />
                <circle cx="12" cy="12" r="5" stroke="white" strokeWidth="1.75" />
                <circle cx="12" cy="12" r="1.5" fill="white" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white">Set &amp; manage budgets</p>
              <p className="text-xs text-blue-200">Never overspend again</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -bottom-6 -right-8 h-40 w-40 rounded-3xl bg-white/10 backdrop-blur-md" />
      <div className="pointer-events-none absolute bottom-16 right-20 h-24 w-24 rounded-2xl bg-white/20 backdrop-blur-md" />
    </section>
  );
}
