import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import { RJLS } from "@/constants/RJLS";
import { HomeChat } from "@/components/chat/HomeChat";
import { ArrowRightIcon, CheckCircle2Icon, ShieldCheckIcon } from "lucide-react";

export default function Home() {
  return (
    <main className={`min-h-screen ${tw.BG_PRIMARY}`}>
      <section className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[0.95fr_1.05fr] lg:px-10 lg:py-16">
        <div className="flex flex-col justify-center">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-cyan-700 text-lg font-bold text-white">
            RJ
          </div>
          <p className={`mb-4 text-sm font-semibold uppercase tracking-widest ${tw.TEXT_TERTIARY}`}>
            {RJLS.companyName}
          </p>
          <h1 className={`max-w-3xl text-4xl font-bold leading-tight md:text-6xl ${tw.TEXT_PRIMARY}`}>
            Secure, reliable AI integration for your business.
          </h1>
          <p className={`mt-6 max-w-2xl text-lg leading-8 ${tw.TEXT_PRIMARY}`}>{RJLS.heroSummary}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              className="inline-flex items-center justify-center gap-2 rounded-md bg-cyan-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-800"
              href={`mailto:${RJLS.contactEmail}?subject=RJLS Systems inquiry`}
            >
              {RJLS.primaryCta}
              <ArrowRightIcon className="h-4 w-4" />
            </a>
            <a
              className={`inline-flex items-center justify-center rounded-md border border-slate-900/10 px-5 py-3 text-sm font-semibold transition hover:bg-slate-900/5 dark:border-white/10 dark:hover:bg-white/5 ${tw.TEXT_PRIMARY}`}
              href="#ai-assistant"
            >
              Ask the AI assistant
            </a>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {RJLS.problems.map((problem) => (
              <div key={problem} className="flex gap-3">
                <CheckCircle2Icon className="mt-1 h-5 w-5 flex-none text-cyan-700 dark:text-cyan-500" />
                <p className={`text-sm leading-6 ${tw.TEXT_PRIMARY}`}>{problem}</p>
              </div>
            ))}
          </div>
        </div>

        <div id="ai-assistant" className="flex min-h-[70vh] w-full flex-col">
          <HomeChat />
        </div>
      </section>

      <section className={`${tw.BG_SECONDARY} px-6 py-14 lg:px-10`}>
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className={`mb-3 text-sm font-semibold uppercase tracking-widest ${tw.TEXT_TERTIARY}`}>
              Lead offer
            </p>
            <h2 className={`text-3xl font-bold ${tw.TEXT_PRIMARY}`}>AI readiness audit</h2>
            <p className={`mt-4 text-lg leading-8 ${tw.TEXT_PRIMARY}`}>
              A practical first step for leaders who need to understand current AI usage, reduce risk, and create a
              roadmap for secure adoption.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {RJLS.auditDeliverables.map((deliverable) => (
              <div key={deliverable} className={`rounded-md border border-slate-900/10 p-5 dark:border-white/10 ${tw.BG_PRIMARY}`}>
                <ShieldCheckIcon className="mb-4 h-6 w-6 text-cyan-700 dark:text-cyan-500" />
                <p className={`${tw.TEXT_PRIMARY}`}>{deliverable}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {RJLS.services.map((service) => (
            <article key={service.title} className="border-t border-slate-900/20 pt-5 dark:border-white/20">
              <h3 className={`text-xl font-semibold ${tw.TEXT_PRIMARY}`}>{service.title}</h3>
              <p className={`mt-3 leading-7 ${tw.TEXT_PRIMARY}`}>{service.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
