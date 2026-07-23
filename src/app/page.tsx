import { HomeChat } from "@/components/chat/HomeChat";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import { RJLS } from "@/constants/RJLS";
import {
  ArrowRightIcon,
  CheckIcon,
  DatabaseIcon,
  FingerprintIcon,
  KeyRoundIcon,
  MessageSquareTextIcon,
  PlugZapIcon,
} from "lucide-react";
import Image from "next/image";

const workflowIcons = [MessageSquareTextIcon, PlugZapIcon, DatabaseIcon, FingerprintIcon];

export default function Home() {
  return (
    <main className={`min-h-screen overflow-hidden ${tw.BG_PRIMARY}`} id="main-content">
      <section className="relative">
        <div aria-hidden="true" className="page-grid absolute inset-0 opacity-35 dark:opacity-20" />
        <div className="relative mx-auto grid min-h-[calc(100dvh-4.5rem)] w-full max-w-7xl items-center gap-10 px-6 py-10 lg:grid-cols-[0.82fr_1.18fr] lg:px-10 lg:py-12">
          <div className="max-w-xl">
            <p className={`mb-5 font-mono text-xs font-medium uppercase tracking-[0.18em] ${tw.TEXT_TERTIARY}`}>
              AI connected to your business
            </p>
            <h1 className={`text-5xl font-semibold leading-[0.98] tracking-[-0.055em] md:text-6xl ${tw.TEXT_PRIMARY}`}>
              Put AI to work inside the systems you already trust.
            </h1>
            <p className={`mt-6 max-w-[52ch] text-lg leading-8 ${tw.TEXT_SECONDARY}`}>
              We build secure AI chat experiences for your applications, APIs, data, and business workflows.
            </p>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-teal-700 px-5 py-3 text-sm font-semibold text-zinc-50 transition duration-200 hover:-translate-y-0.5 hover:bg-teal-800 active:translate-y-px dark:bg-teal-300 dark:text-zinc-950 dark:hover:bg-teal-200"
                href={`mailto:${RJLS.contactEmail}?subject=RJLS Systems AI integration inquiry`}
              >
                {RJLS.primaryCta}
                <ArrowRightIcon className="size-4" strokeWidth={1.75} />
              </a>
              <a
                className={`inline-flex items-center gap-2 rounded-md py-2 text-sm font-semibold underline decoration-zinc-400 underline-offset-4 transition hover:text-teal-800 active:translate-y-px dark:decoration-zinc-600 dark:hover:text-teal-300 ${tw.TEXT_PRIMARY}`}
                href="#ai-assistant"
              >
                Try the assistant
              </a>
            </div>
          </div>

          <div className="min-w-0 scroll-mt-24" id="ai-assistant">
            <div className="mb-3 flex items-center justify-between gap-4 px-1">
              <p className={`font-mono text-xs ${tw.TEXT_SECONDARY}`}>Live integration example</p>
              <p className={`hidden text-xs sm:block ${tw.TEXT_SECONDARY}`}>Ask a question or try a prompt</p>
            </div>
            <HomeChat />
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-900/10 bg-zinc-100/70 px-6 py-10 lg:px-10 dark:border-white/10 dark:bg-zinc-900/70">
        <div className="mx-auto grid max-w-7xl gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {RJLS.integrationOutcomes.map((outcome) => (
            <div className="flex items-start gap-3" key={outcome}>
              <span className="mt-1 grid size-5 flex-none place-items-center rounded bg-teal-700 text-zinc-50 dark:bg-teal-300 dark:text-zinc-950">
                <CheckIcon className="size-3" strokeWidth={2} />
              </span>
              <p className={`text-sm leading-6 ${tw.TEXT_SECONDARY}`}>{outcome}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-stretch gap-10 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="relative min-h-[24rem] overflow-hidden rounded-xl bg-zinc-200 lg:min-h-[40rem] dark:bg-zinc-900">
            <Image
              alt="Organized network connections linking secure business systems"
              className="dark:contrast-110 object-cover grayscale-[0.3] dark:brightness-75"
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              src="/rjls-systems-connections.png"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,transparent_0%,rgba(9,9,11,0.16)_100%)]"
            />
          </div>

          <div className="flex flex-col justify-center lg:pl-8">
            <h2 className={`max-w-2xl text-4xl font-semibold tracking-[-0.04em] md:text-5xl ${tw.TEXT_PRIMARY}`}>
              One conversation, connected to real work.
            </h2>
            <p className={`mt-5 max-w-[62ch] text-lg leading-8 ${tw.TEXT_SECONDARY}`}>
              We connect the assistant to the systems your business already uses, then place clear controls around every
              request and action.
            </p>

            <div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
              {RJLS.workflow.map((step, index) => {
                const Icon = workflowIcons[index];

                return (
                  <article className="border-t border-zinc-900/15 pt-5 dark:border-white/15" key={step.title}>
                    <Icon className="size-5 text-teal-700 dark:text-teal-300" strokeWidth={1.75} />
                    <h3 className={`mt-4 text-lg font-semibold tracking-[-0.02em] ${tw.TEXT_PRIMARY}`}>{step.title}</h3>
                    <p className={`mt-2 text-sm leading-6 ${tw.TEXT_SECONDARY}`}>{step.summary}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-900/10 bg-zinc-100/65 px-6 py-20 lg:px-10 lg:py-28 dark:border-white/10 dark:bg-zinc-900/65">
        <div className="mx-auto max-w-7xl">
          <p className={`mb-4 font-mono text-xs font-medium uppercase tracking-[0.18em] ${tw.TEXT_TERTIARY}`}>
            Built around your domain
          </p>
          <h2 className={`max-w-3xl text-4xl font-semibold tracking-[-0.04em] md:text-5xl ${tw.TEXT_PRIMARY}`}>
            A complete integration, shaped for your business.
          </h2>
          <p className={`mt-5 max-w-[62ch] text-lg leading-8 ${tw.TEXT_SECONDARY}`}>
            We learn the workflow, build the service, connect the systems, and deliver the interface as one working
            product.
          </p>

          <div className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {RJLS.services.map((service) => (
              <article
                className="grid gap-3 border-l-2 border-teal-700/40 pl-6 dark:border-teal-300/40"
                key={service.title}
              >
                <h3 className={`text-xl font-semibold tracking-[-0.025em] ${tw.TEXT_PRIMARY}`}>{service.title}</h3>
                <p className={`max-w-[55ch] leading-7 ${tw.TEXT_SECONDARY}`}>{service.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className={`max-w-2xl text-4xl font-semibold tracking-[-0.04em] md:text-5xl ${tw.TEXT_PRIMARY}`}>
              Useful wherever people need your systems.
            </h2>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {RJLS.useCases.map((useCase, index) => (
                <article className={index === 0 ? "md:col-span-2 md:max-w-2xl" : undefined} key={useCase.title}>
                  <h3 className={`text-xl font-semibold tracking-[-0.025em] ${tw.TEXT_PRIMARY}`}>{useCase.title}</h3>
                  <p className={`mt-3 leading-7 ${tw.TEXT_SECONDARY}`}>{useCase.summary}</p>
                </article>
              ))}
            </div>
          </div>

          <aside className="self-start rounded-xl bg-zinc-100 p-7 md:p-9 dark:bg-zinc-900">
            <KeyRoundIcon className="size-6 text-teal-700 dark:text-teal-300" strokeWidth={1.75} />
            <h2 className={`mt-6 text-3xl font-semibold tracking-[-0.035em] ${tw.TEXT_PRIMARY}`}>
              Secure by design. Controlled by you.
            </h2>
            <p className={`mt-4 leading-7 ${tw.TEXT_SECONDARY}`}>
              We define what the assistant can see, what it can do, and when a person needs to stay in the loop.
            </p>
            <div className="mt-8 space-y-5">
              {RJLS.safeguards.map((safeguard) => (
                <div className="flex gap-3" key={safeguard}>
                  <CheckIcon className="mt-1 size-4 flex-none text-teal-700 dark:text-teal-300" strokeWidth={2} />
                  <p className={`text-sm leading-6 ${tw.TEXT_SECONDARY}`}>{safeguard}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-zinc-900/10 px-6 py-16 lg:px-10 lg:py-20 dark:border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <h2 className={`max-w-3xl text-3xl font-semibold tracking-[-0.035em] md:text-4xl ${tw.TEXT_PRIMARY}`}>
            Start with one workflow that matters.
          </h2>
          <a
            className="inline-flex flex-none items-center justify-center gap-2 whitespace-nowrap rounded-md bg-teal-700 px-5 py-3 text-sm font-semibold text-zinc-50 transition duration-200 hover:-translate-y-0.5 hover:bg-teal-800 active:translate-y-px dark:bg-teal-300 dark:text-zinc-950 dark:hover:bg-teal-200"
            href={`mailto:${RJLS.contactEmail}?subject=RJLS Systems AI integration inquiry`}
          >
            {RJLS.primaryCta}
            <ArrowRightIcon className="size-4" strokeWidth={1.75} />
          </a>
        </div>
      </section>
    </main>
  );
}
