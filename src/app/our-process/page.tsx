import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import { RJLS } from "@/constants/RJLS";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Process | RJLS Systems",
  description:
    "RJLS Systems helps small product companies add focused AI capabilities that work with their applications' data and workflows.",
};

const capabilities = [
  "Focused around a valuable workflow",
  "Built into your existing product",
  "Controls matched to each action",
];

export default function OurProcess() {
  return (
    <main className={`${tw.BG_PRIMARY} min-h-screen`} id="main-content">
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <p className={`mb-5 font-mono text-xs font-medium uppercase tracking-[0.18em] ${tw.TEXT_TERTIARY}`}>
          Our Process
        </p>
        <h1
          className={`max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-0.05em] md:text-6xl ${tw.TEXT_PRIMARY}`}
        >
          Custom AI integration for products with real work to do.
        </h1>
        <p className={`mt-8 max-w-[68ch] text-lg leading-8 ${tw.TEXT_SECONDARY}`}>
          We work with founders and technical teams at small product companies whose applications already hold useful
          data and support meaningful workflows. We design the experience, connect only the approved parts of those
          systems, and build the service behind the interface.
        </p>

        <div className="mt-16 grid gap-4 md:grid-cols-[1.35fr_0.65fr]">
          <div className="rounded-xl bg-forest p-8 text-cream md:p-10 dark:bg-forest dark:text-cream">
            <p className="font-mono text-xs opacity-75">What we focus on</p>
            <p className="mt-8 max-w-xl text-3xl font-semibold leading-tight tracking-[-0.035em]">{capabilities[0]}</p>
          </div>
          <div className="grid gap-4">
            {capabilities.slice(1).map((item) => (
              <div className="rounded-xl bg-mist p-6 dark:bg-night-surface" key={item}>
                <p className={`font-semibold tracking-[-0.02em] ${tw.TEXT_PRIMARY}`}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-forest/10 bg-mist/65 px-6 py-16 lg:px-10 lg:py-24 dark:border-cream/20 dark:bg-night-surface/65">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <h2 className={`text-4xl font-semibold tracking-[-0.04em] ${tw.TEXT_PRIMARY}`}>Why custom integration</h2>
            <p className={`mt-5 max-w-[44ch] leading-7 ${tw.TEXT_SECONDARY}`}>
              A useful assistant needs the language, data, permissions, and decision points of your product—not a
              generic chat layer placed on top.
            </p>
          </div>
          <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
            {RJLS.clientOutcomes.map((outcome) => (
              <div className="border-t border-forest/15 pt-5 dark:border-cream/25" key={outcome}>
                <p className={`leading-7 ${tw.TEXT_SECONDARY}`}>{outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <h2 className={`text-4xl font-semibold tracking-[-0.04em] ${tw.TEXT_PRIMARY}`}>The team</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {RJLS.team.map((member) => (
            <article className="flex items-center gap-5 rounded-xl bg-mist p-6 dark:bg-night-surface" key={member.name}>
              <div
                aria-hidden="true"
                className="grid size-14 flex-none place-items-center rounded-md bg-navy font-mono text-sm font-semibold text-cream dark:bg-mist dark:text-navy"
              >
                {member.name
                  .split(" ")
                  .map((name) => name[0])
                  .join("")}
              </div>
              <div>
                <h3 className={`text-xl font-semibold tracking-[-0.025em] ${tw.TEXT_PRIMARY}`}>{member.name}</h3>
                <p className={`mt-1 text-sm ${tw.TEXT_SECONDARY}`}>{member.role}</p>
              </div>
            </article>
          ))}
        </div>
        <p className={`mt-10 max-w-[76ch] text-lg leading-8 ${tw.TEXT_SECONDARY}`}>
          Ralph brings decades of experience across engineering, DevOps, and security. Lukas brings substantial
          engineering and recent hands-on AI-integration experience, including work with startups and complex
          environments. This breadth informs practical choices about workflow boundaries, API and backend integration,
          model evaluation, testing, observability, cost controls, and a handoff that an internal engineering team can
          understand and take forward.
        </p>
      </section>
    </main>
  );
}
