import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import { THEORY_FOUNDRY } from "@/constants/TheoryFoundry";
import { ArrowRightIcon, CheckIcon, PlugZapIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "AI Integration & MCP | Theory Foundry",
  description:
    "Theory Foundry designs focused AI integrations that work with approved application data, tools, APIs, and business workflows.",
};

export default function AiIntegrationMcpPage() {
  return (
    <main className={`${tw.BG_PRIMARY} min-h-[calc(100dvh-4.5rem)]`} id="main-content">
      <section className="border-b border-forest/10 dark:border-cream/20">
        <div className="mx-auto grid min-h-[calc(100dvh-4.5rem)] max-w-7xl items-center gap-10 px-6 py-10 lg:grid-cols-[0.86fr_1.14fr] lg:px-10 lg:py-12">
          <div className="max-w-xl">
            <p className={`mb-5 font-mono text-xs font-medium uppercase tracking-[0.18em] ${tw.TEXT_TERTIARY}`}>
              Consulting offer
            </p>
            <h1 className={`text-5xl font-semibold leading-[0.98] tracking-[-0.055em] md:text-6xl ${tw.TEXT_PRIMARY}`}>
              AI Integration &amp; MCP
            </h1>
            <p className={`mt-6 max-w-[46ch] text-lg leading-8 ${tw.TEXT_SECONDARY}`}>
              Add focused AI to an existing product using only the approved data, tools, and actions its workflow needs.
            </p>
            <a
              className="mt-8 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-forest px-5 py-3 text-sm font-semibold text-cream transition duration-200 hover:-translate-y-0.5 hover:bg-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-cream active:translate-y-px dark:bg-forest dark:text-cream dark:hover:bg-mist dark:hover:text-navy dark:focus-visible:ring-mint dark:focus-visible:ring-offset-night"
              href={`mailto:${THEORY_FOUNDRY.contactEmail}?subject=Theory Foundry AI integration inquiry`}
            >
              {THEORY_FOUNDRY.primaryCta}
              <ArrowRightIcon aria-hidden="true" className="size-4" strokeWidth={1.75} />
            </a>
          </div>

          <div className="relative min-h-[18rem] overflow-hidden rounded-xl bg-mist sm:min-h-[26rem] lg:min-h-[30rem] dark:bg-night-surface">
            <Image
              alt="Organized connections between an AI interface and approved business systems"
              className="dark:contrast-110 object-cover grayscale-[0.3] dark:brightness-75"
              fill
              priority
              sizes="(min-width: 1024px) 52vw, 100vw"
              src="/theory-foundry-connections.png"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,transparent_0%,rgba(35,61,77,0.20)_100%)]"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-forest/10 bg-mist/65 px-6 py-10 lg:px-10 dark:border-cream/20 dark:bg-night-surface/65">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-[0.68fr_1.32fr] md:items-baseline md:gap-12">
          <h2 className={`text-xl font-semibold tracking-[-0.025em] ${tw.TEXT_PRIMARY}`}>Built around your product</h2>
          <p className={`max-w-[66ch] leading-7 ${tw.TEXT_SECONDARY}`}>
            We design and build one useful AI integration around an existing product, a real workflow, and the operating
            rules your business already relies on.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <h2 className={`max-w-3xl text-4xl font-semibold tracking-[-0.04em] md:text-5xl ${tw.TEXT_PRIMARY}`}>
          Start with one valuable workflow.
        </h2>
        <p className={`mt-5 max-w-[62ch] text-lg leading-8 ${tw.TEXT_SECONDARY}`}>
          The work begins with a specific customer or employee need, then connects only the systems required to serve
          it.
        </p>

        <div className="mt-12 grid gap-x-12 gap-y-8 md:grid-cols-2">
          {THEORY_FOUNDRY.integrationOutcomes.map((outcome) => (
            <div className="flex items-start gap-4 border-t border-forest/15 pt-5 dark:border-cream/25" key={outcome}>
              <CheckIcon
                aria-hidden="true"
                className="mt-1 size-4 flex-none text-forest dark:text-mint"
                strokeWidth={2}
              />
              <p className={`max-w-[48ch] leading-7 ${tw.TEXT_SECONDARY}`}>{outcome}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-forest/10 bg-mist/65 px-6 py-16 lg:px-10 lg:py-24 dark:border-cream/20 dark:bg-night-surface/65">
        <div className="mx-auto max-w-7xl">
          <h2 className={`max-w-3xl text-4xl font-semibold tracking-[-0.04em] md:text-5xl ${tw.TEXT_PRIMARY}`}>
            What the engagement includes.
          </h2>
          <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {THEORY_FOUNDRY.services.map((service) => (
              <article className="border-l-2 border-forest/35 pl-6 dark:border-mint/40" key={service.title}>
                <h3 className={`text-xl font-semibold tracking-[-0.025em] ${tw.TEXT_PRIMARY}`}>{service.title}</h3>
                <p className={`mt-3 max-w-[52ch] leading-7 ${tw.TEXT_SECONDARY}`}>{service.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[0.72fr_1.28fr] lg:px-10 lg:py-24">
        <div>
          <PlugZapIcon aria-hidden="true" className="size-6 text-forest dark:text-mint" strokeWidth={1.75} />
          <h2 className={`mt-6 text-4xl font-semibold tracking-[-0.04em] ${tw.TEXT_PRIMARY}`}>Where MCP fits.</h2>
          <p className={`mt-5 max-w-[48ch] text-lg leading-8 ${tw.TEXT_SECONDARY}`}>
            Model Context Protocol can provide a standard connection between an AI service and approved tools or context
            when it fits the workflow. Existing APIs, permissions, validation, and business rules remain authoritative.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {THEORY_FOUNDRY.safeguards.map((safeguard) => (
            <div className="border-t border-forest/15 pt-5 dark:border-cream/25" key={safeguard}>
              <p className={`text-sm leading-6 ${tw.TEXT_SECONDARY}`}>{safeguard}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
