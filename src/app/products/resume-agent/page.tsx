import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import { ArrowUpRightIcon, BracesIcon, DatabaseIcon, PanelsTopLeftIcon, ServerIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Resume Agent | RJLS Systems",
  description:
    "A reusable template for a personal resume site with an AI chat experience, available as a Next.js reference site or a framework-neutral widget with gateway and MCP service.",
};

const technicalBoundaries = [
  {
    title: "Profile data",
    description: "Validated, factual resume content stays separate from the interface and service layers.",
    icon: DatabaseIcon,
  },
  {
    title: "Browser-safe widget",
    description: "A Shadow DOM custom element provides the chat interface without requiring Next.js.",
    icon: PanelsTopLeftIcon,
  },
  {
    title: "Server-side gateway",
    description: "The gateway hosts the model interaction and connects the UI message stream to resume capabilities.",
    icon: ServerIcon,
  },
  {
    title: "MCP service",
    description: "A separate Streamable HTTP MCP service exposes the resume capabilities used by the gateway.",
    icon: BracesIcon,
  },
];

export default function ResumeAgentPage() {
  return (
    <main className={`${tw.BG_PRIMARY} min-h-[calc(100dvh-4.5rem)]`} id="main-content">
      <section className="border-b border-forest/10 dark:border-cream/20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-[0.78fr_1.22fr] lg:px-10 lg:py-20">
          <div>
            <p className={`mb-5 font-mono text-xs font-medium uppercase tracking-[0.18em] ${tw.TEXT_TERTIARY}`}>
              Open-source product
            </p>
            <h1
              className={`max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-0.05em] md:text-6xl ${tw.TEXT_PRIMARY}`}
            >
              Resume Agent
            </h1>
            <p className={`mt-7 max-w-[38ch] text-lg leading-8 ${tw.TEXT_SECONDARY}`}>
              Build a personal resume site with AI chat, or add the widget and services to an existing website.
            </p>
            <a
              aria-label="View Resume Agent on GitHub (opens in a new tab)"
              className="mt-8 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-forest px-5 py-3 text-sm font-semibold text-cream transition duration-200 hover:-translate-y-0.5 hover:bg-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-cream active:translate-y-px dark:bg-mist dark:text-navy dark:hover:bg-cream dark:focus-visible:ring-mint dark:focus-visible:ring-offset-night"
              href="https://github.com/lukasasorensen/resume-agent"
              rel="noreferrer"
              target="_blank"
            >
              View on GitHub
              <ArrowUpRightIcon aria-hidden="true" className="size-4" strokeWidth={1.75} />
            </a>
          </div>

          <div className="overflow-hidden rounded-xl border border-forest/10 bg-mist shadow-md dark:border-cream/20 dark:bg-night-surface">
            <Image
              alt="Illustration of a resume website connected to profile data, chat, gateway, and MCP modules"
              className="h-auto w-full"
              height={1024}
              priority
              sizes="(min-width: 1024px) 52vw, 100vw"
              src="/images/products/resume-agent-architecture.png"
              width={1536}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <h2 className={`max-w-3xl text-4xl font-semibold tracking-[-0.04em] ${tw.TEXT_PRIMARY}`}>
          Choose how much to adopt.
        </h2>
        <p className={`mt-5 max-w-[60ch] text-lg leading-8 ${tw.TEXT_SECONDARY}`}>
          Use the complete reference site or bring the chat stack to a site you already run.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-xl bg-forest p-7 text-cream dark:bg-forest-deep">
            <h3 className="text-xl font-semibold tracking-[-0.025em]">Customize the reference site</h3>
            <p className="mt-3 max-w-[50ch] leading-7 text-sage">
              Replace the included example profile and adapt the Next.js site as a complete personal resume experience.
            </p>
          </article>
          <article className="rounded-xl border border-forest/10 bg-mist p-7 dark:border-cream/20 dark:bg-night-surface">
            <h3 className={`text-xl font-semibold tracking-[-0.025em] ${tw.TEXT_PRIMARY}`}>
              Integrate the widget stack
            </h3>
            <p className={`mt-3 leading-7 ${tw.TEXT_SECONDARY}`}>
              Add the framework-neutral custom element to an existing site and run the gateway and MCP service behind
              it.
            </p>
          </article>
        </div>
      </section>

      <section className="border-y border-forest/10 bg-mist/65 px-6 py-16 lg:px-10 lg:py-24 dark:border-cream/20 dark:bg-night-surface/65">
        <div className="mx-auto max-w-7xl">
          <h2 className={`max-w-3xl text-4xl font-semibold tracking-[-0.04em] ${tw.TEXT_PRIMARY}`}>
            Separate layers with clear responsibilities.
          </h2>
          <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {technicalBoundaries.map(({ description, icon: Icon, title }) => (
              <article className="border-l-2 border-forest/35 pl-6 dark:border-mint/40" key={title}>
                <Icon className="size-5 text-forest dark:text-mint" strokeWidth={1.75} />
                <h3 className={`mt-5 text-lg font-semibold tracking-[-0.025em] ${tw.TEXT_PRIMARY}`}>{title}</h3>
                <p className={`mt-3 max-w-[48ch] text-sm leading-6 ${tw.TEXT_SECONDARY}`}>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <h2 className={`max-w-3xl text-4xl font-semibold tracking-[-0.04em] ${tw.TEXT_PRIMARY}`}>
          Run the reference site locally.
        </h2>
        <p className={`mt-5 max-w-[62ch] text-lg leading-8 ${tw.TEXT_SECONDARY}`}>
          Install dependencies and start the runtime before launching the site in a second terminal.
        </p>

        <div className="mt-10 grid gap-5 lg:grid-cols-[0.62fr_1.38fr]">
          <aside className="rounded-xl bg-forest p-7 text-cream dark:bg-forest-deep">
            <h3 className="text-lg font-semibold tracking-[-0.025em]">Prerequisites</h3>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-sage">
              <li>Node.js 22.9 or newer</li>
              <li>npm 10 or newer</li>
              <li>An OpenAI API key for live chat</li>
            </ul>
            <p className="mt-7 text-sm leading-6 text-sage">
              Replace every placeholder value in <code className="font-mono text-cream">.env</code> before using live
              chat.
            </p>
          </aside>

          <div className="space-y-5">
            <div className="overflow-x-auto rounded-xl bg-navy p-6 text-cream dark:bg-night-surface">
              <p className="mb-4 font-mono text-xs text-sage">Terminal 1</p>
              <pre className="font-mono text-sm leading-7">
                <code>{`npm install
npm run build:packages
cp .env.example .env
npm run dev:runtime`}</code>
              </pre>
            </div>
            <div className="overflow-x-auto rounded-xl bg-navy p-6 text-cream dark:bg-night-surface">
              <p className="mb-4 font-mono text-xs text-sage">Terminal 2</p>
              <pre className="font-mono text-sm leading-7">
                <code>npm run dev:site</code>
              </pre>
            </div>
            <p className={`text-sm leading-6 ${tw.TEXT_SECONDARY}`}>
              Open <code className="font-mono">http://localhost:3000</code>. The repository also documents widget-only
              setup and deployment configuration.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
