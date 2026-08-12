import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import { THEORY_FOUNDRY } from "@/constants/TheoryFoundry";
import { ArrowRightIcon, CheckIcon, FingerprintIcon } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `AI Readiness Roadmap | ${THEORY_FOUNDRY.companyName}`,
  description:
    "Review current AI usage, identify practical risks and opportunities, and receive a prioritized roadmap for controls and implementation.",
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
            Turn scattered AI activity into a practical next-step plan.
          </h1>
          <p className={`mt-8 max-w-[62ch] text-lg leading-8 ${tw.TEXT_SECONDARY}`}>
            If your team is using AI but the right integration is not yet clear, the audit maps current usage, control
            gaps, and implementation opportunities into an ordered roadmap.
          </p>
          <a
            className="mt-8 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-forest px-5 py-3 text-sm font-semibold text-cream transition duration-200 hover:-translate-y-0.5 hover:bg-navy active:translate-y-px dark:bg-forest dark:text-cream dark:hover:bg-mist dark:hover:text-navy"
            href={`mailto:${THEORY_FOUNDRY.contactEmail}?subject=Theory Foundry AI readiness audit inquiry`}
          >
            Email us about an AI readiness audit
            <ArrowRightIcon className="size-4" strokeWidth={1.75} />
          </a>
        </div>
      </section>

      <section className="border-y border-forest/10 bg-mist/65 px-6 py-16 lg:px-10 lg:py-24 dark:border-cream/20 dark:bg-night-surface/65">
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
                className="grid gap-3 border-b border-forest/15 py-6 first:pt-0 last:border-b-0 last:pb-0 sm:grid-cols-[9rem_1fr] dark:border-cream/25"
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
          <FingerprintIcon className="size-6 text-forest dark:text-mint" strokeWidth={1.75} />
          <h2 className={`mt-6 text-4xl font-semibold tracking-[-0.04em] ${tw.TEXT_PRIMARY}`}>What you receive</h2>
          <p className={`mt-5 max-w-[46ch] leading-7 ${tw.TEXT_SECONDARY}`}>
            Clear evidence for leadership decisions, plus an implementation order your team can use.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {THEORY_FOUNDRY.auditDeliverables.map((deliverable) => (
            <div className="flex gap-3 rounded-xl bg-mist p-5 dark:bg-night-surface" key={deliverable}>
              <CheckIcon className="mt-1 size-4 flex-none text-forest dark:text-mint" strokeWidth={2} />
              <p className={`text-sm leading-6 ${tw.TEXT_SECONDARY}`}>{deliverable}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
