import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import { THEORY_FOUNDRY } from "@/constants/TheoryFoundry";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Process | Theory Foundry",
  description:
    "Theory Foundry helps small product companies add focused AI capabilities that work with their applications' data and workflows.",
};

const capabilities = [
  "Focused around a valuable workflow",
  "Built into your existing product",
  "Tailored to your mission",
];

const openingStage = [
  {
    title: "Identify the right problem",
    summary:
      "We learn who needs help, what they are trying to accomplish, and where an AI integration could make the workflow more useful.",
  },
  {
    title: "Understand your product",
    summary:
      "We look at the application, technical stack, data, workflows, and operating constraints the integration needs to work with.",
  },
  {
    title: "Choose a focused starting point",
    summary:
      "Together, we narrow the opportunity to a useful first workflow that is specific enough to design, build, and evaluate.",
  },
  {
    title: "Shape the plan together",
    summary:
      "We define an approach that fits your company, works with your existing systems, and gives your team a clear path forward.",
  },
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
        <div className="mx-auto max-w-7xl">
          <p className={`mb-4 font-mono text-xs font-medium uppercase tracking-[0.18em] ${tw.TEXT_TERTIARY}`}>
            A focused place to start
          </p>
          <h2 className={`max-w-3xl text-4xl font-semibold tracking-[-0.04em] md:text-5xl ${tw.TEXT_PRIMARY}`}>
            How We Integrate with Your Mission
          </h2>
          <p className={`mt-5 max-w-[68ch] text-lg leading-8 ${tw.TEXT_SECONDARY}`}>
            Our first step is to understand the problems you want an AI integration to solve and how the work happens
            today. We work closely with your team to investigate your product and technical stack before working
            together to find the best solutions for you.
          </p>
          <p className={`mt-4 max-w-[76ch] leading-7 ${tw.TEXT_SECONDARY}`}>
            The result is a focused plan shaped with your team. It should reflect your company, your workflow, your
            existing systems, and the people who will use and support what we build.
          </p>

          <div className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {openingStage.map((step, index) => (
              <article className="grid gap-3 border-l-2 border-forest/40 pl-6 dark:border-mint/40" key={step.title}>
                <p className={`font-mono text-xs font-medium ${tw.TEXT_TERTIARY}`}>0{index + 1}</p>
                <h3 className={`text-xl font-semibold tracking-[-0.025em] ${tw.TEXT_PRIMARY}`}>{step.title}</h3>
                <p className={`max-w-[55ch] leading-7 ${tw.TEXT_SECONDARY}`}>{step.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-forest/10 bg-forest px-6 py-16 lg:px-10 lg:py-24 dark:border-cream/20 dark:bg-night">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-4xl font-semibold tracking-[-0.04em] text-cream">The team</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {THEORY_FOUNDRY.team.map((member) => (
              <article
                className="flex items-center gap-5 rounded-xl bg-cream p-6 dark:bg-night-surface"
                key={member.name}
              >
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
          <p className="mt-10 max-w-[76ch] text-lg leading-8 text-sage">
            Ralph brings decades of experience across engineering, DevOps, and security. Lukas brings substantial
            engineering and recent hands-on AI-integration experience, including work integrating AI & MCP with startups
            and complex environments. This breadth informs practical choices about workflow boundaries, API and backend
            integration, model evaluation, testing, observability, cost controls, and a handoff that an internal
            engineering team can understand and take forward.
          </p>
        </div>
      </section>
    </main>
  );
}
