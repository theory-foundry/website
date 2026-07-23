import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import { RJLS } from "@/constants/RJLS";
import { ArrowRightIcon, CheckIcon, FingerprintIcon } from "lucide-react";
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
    <main className={`min-h-screen ${tw.BG_PRIMARY}`} id="main-content">
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="page-grid absolute inset-0 opacity-30 dark:opacity-15" />
        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <p className={`mb-5 font-mono text-xs font-medium uppercase tracking-[0.18em] ${tw.TEXT_TERTIARY}`}>
            AI readiness audit
          </p>
          <h1
            className={`max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-0.05em] md:text-6xl ${tw.TEXT_PRIMARY}`}
          >
            Find the right first move for AI adoption.
          </h1>
          <p className={`mt-8 max-w-[62ch] text-lg leading-8 ${tw.TEXT_SECONDARY}`}>
            Understand current usage, reduce unmanaged risk, and leave with a practical roadmap for secure adoption.
          </p>
          <a
            className="mt-8 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-teal-700 px-5 py-3 text-sm font-semibold text-zinc-50 transition duration-200 hover:-translate-y-0.5 hover:bg-teal-800 active:translate-y-px dark:bg-teal-300 dark:text-zinc-950 dark:hover:bg-teal-200"
            href={`mailto:${RJLS.contactEmail}?subject=RJLS Systems AI readiness audit inquiry`}
          >
            Discuss an AI readiness audit
            <ArrowRightIcon className="size-4" strokeWidth={1.75} />
          </a>
        </div>
      </section>

      <section className="border-y border-zinc-900/10 bg-zinc-100/65 px-6 py-16 lg:px-10 lg:py-24 dark:border-white/10 dark:bg-zinc-900/65">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <h2 className={`text-4xl font-semibold tracking-[-0.04em] ${tw.TEXT_PRIMARY}`}>
              From current state to practical next steps.
            </h2>
            <p className={`mt-5 max-w-[44ch] leading-7 ${tw.TEXT_SECONDARY}`}>
              A focused process that turns scattered signals into an ordered plan.
            </p>
          </div>
          <div>
            {auditStages.map((stage) => (
              <article
                className="grid gap-3 border-b border-zinc-900/15 py-6 first:pt-0 last:border-b-0 last:pb-0 sm:grid-cols-[9rem_1fr] dark:border-white/15"
                key={stage.title}
              >
                <h3 className={`text-xl font-semibold tracking-[-0.025em] ${tw.TEXT_PRIMARY}`}>{stage.title}</h3>
                <p className={`leading-7 ${tw.TEXT_SECONDARY}`}>{stage.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[0.72fr_1.28fr] lg:px-10 lg:py-24">
        <div>
          <FingerprintIcon className="size-6 text-teal-700 dark:text-teal-300" strokeWidth={1.75} />
          <h2 className={`mt-6 text-4xl font-semibold tracking-[-0.04em] ${tw.TEXT_PRIMARY}`}>What you receive</h2>
          <p className={`mt-5 max-w-[46ch] leading-7 ${tw.TEXT_SECONDARY}`}>
            Clear evidence for leadership decisions, plus an implementation order your team can use.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {RJLS.auditDeliverables.map((deliverable) => (
            <div className="flex gap-3 rounded-xl bg-zinc-100 p-5 dark:bg-zinc-900" key={deliverable}>
              <CheckIcon className="mt-1 size-4 flex-none text-teal-700 dark:text-teal-300" strokeWidth={2} />
              <p className={`text-sm leading-6 ${tw.TEXT_SECONDARY}`}>{deliverable}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
