import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import { RJLS } from "@/constants/RJLS";
import { ArrowRightIcon, CheckCircle2Icon, ShieldCheckIcon } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `AI Readiness Audit | ${RJLS.companyName}`,
  description:
    "Understand current AI usage, identify practical risks and opportunities, and receive a prioritized roadmap for secure adoption.",
};

const auditStages = [
  {
    title: "Discover",
    summary: "Review current employee AI usage, approved tools, policies, and existing developer integrations.",
  },
  {
    title: "Assess",
    summary: "Examine data exposure, access boundaries, output quality, operational visibility, and cost controls.",
  },
  {
    title: "Prioritize",
    summary: "Rank risk reduction and implementation opportunities by urgency, effort, and business value.",
  },
  {
    title: "Plan",
    summary: "Deliver an executive-ready summary and a practical roadmap for the next phase of work.",
  },
];

export default function AIReadinessAudit() {
  return (
    <main className={`min-h-screen ${tw.BG_PRIMARY}`}>
      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-20">
        <p className={`mb-3 text-sm font-semibold uppercase tracking-widest ${tw.TEXT_TERTIARY}`}>Separate offering</p>
        <h1 className={`max-w-4xl text-4xl font-bold leading-tight md:text-6xl ${tw.TEXT_PRIMARY}`}>
          AI readiness audit
        </h1>
        <p className={`mt-6 max-w-3xl text-lg leading-8 ${tw.TEXT_PRIMARY}`}>
          A practical first step for leaders who need to understand current AI usage, reduce risk, and create a roadmap
          for secure adoption.
        </p>
        <a
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-cyan-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-800"
          href={`mailto:${RJLS.contactEmail}?subject=RJLS Systems AI readiness audit inquiry`}
        >
          Discuss an AI readiness audit
          <ArrowRightIcon className="h-4 w-4" />
        </a>
      </section>

      <section className={`${tw.BG_SECONDARY} px-6 py-16 lg:px-10`}>
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className={`mb-3 text-sm font-semibold uppercase tracking-widest ${tw.TEXT_TERTIARY}`}>The process</p>
            <h2 className={`text-3xl font-bold ${tw.TEXT_PRIMARY}`}>From current state to practical next steps.</h2>
          </div>
          <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {auditStages.map((stage, index) => (
              <article
                key={stage.title}
                className={`rounded-md border border-slate-900/10 p-5 dark:border-white/10 ${tw.BG_PRIMARY}`}
              >
                <span className={`text-sm font-semibold ${tw.TEXT_TERTIARY}`}>0{index + 1}</span>
                <h3 className={`mt-4 text-xl font-semibold ${tw.TEXT_PRIMARY}`}>{stage.title}</h3>
                <p className={`mt-3 text-sm leading-6 ${tw.TEXT_PRIMARY}`}>{stage.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <ShieldCheckIcon className="h-7 w-7 text-cyan-700 dark:text-cyan-500" />
            <h2 className={`mt-5 text-3xl font-bold ${tw.TEXT_PRIMARY}`}>What you receive</h2>
            <p className={`mt-4 text-lg leading-8 ${tw.TEXT_PRIMARY}`}>
              A focused view of where AI is already creating value, where unmanaged risk is accumulating, and which
              improvements should happen first.
            </p>
          </div>
          <div className="space-y-4">
            {RJLS.auditDeliverables.map((deliverable) => (
              <div
                key={deliverable}
                className={`flex gap-3 rounded-md border border-slate-900/10 p-5 dark:border-white/10 ${tw.BG_SECONDARY}`}
              >
                <CheckCircle2Icon className="mt-0.5 h-5 w-5 flex-none text-cyan-700 dark:text-cyan-500" />
                <p className={`${tw.TEXT_PRIMARY}`}>{deliverable}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
