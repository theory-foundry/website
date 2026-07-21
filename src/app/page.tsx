import { HomeChat } from "@/components/chat/HomeChat";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import { RJLS } from "@/constants/RJLS";
import {
  ArrowRightIcon,
  CheckCircle2Icon,
  DatabaseIcon,
  KeyRoundIcon,
  MessageSquareTextIcon,
  PlugZapIcon,
  ShieldCheckIcon,
} from "lucide-react";

const workflowIcons = [MessageSquareTextIcon, PlugZapIcon, DatabaseIcon, ShieldCheckIcon];

export default function Home() {
  return (
    <main className={`min-h-screen ${tw.BG_PRIMARY}`}>
      <section className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[0.95fr_1.05fr] lg:px-10 lg:py-16">
        <div className="flex flex-col justify-center">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-cyan-700 text-lg font-bold text-white">
            RJ
          </div>
          <p className={`mb-4 text-sm font-semibold uppercase tracking-widest ${tw.TEXT_TERTIARY}`}>
            AI connected to your business
          </p>
          <h1 className={`max-w-3xl text-4xl font-bold leading-tight md:text-6xl ${tw.TEXT_PRIMARY}`}>
            Bring a secure AI chat interface to your business.
          </h1>
          <p className={`mt-6 max-w-2xl text-lg leading-8 ${tw.TEXT_PRIMARY}`}>{RJLS.heroSummary}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              className="inline-flex items-center justify-center gap-2 rounded-md bg-cyan-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-800"
              href={`mailto:${RJLS.contactEmail}?subject=RJLS Systems AI integration inquiry`}
            >
              {RJLS.primaryCta}
              <ArrowRightIcon className="h-4 w-4" />
            </a>
            <a
              className={`inline-flex items-center justify-center rounded-md border border-slate-900/10 px-5 py-3 text-sm font-semibold transition hover:bg-slate-900/5 dark:border-white/10 dark:hover:bg-white/5 ${tw.TEXT_PRIMARY}`}
              href="#ai-assistant"
            >
              Try the example assistant
            </a>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {RJLS.integrationOutcomes.map((outcome) => (
              <div key={outcome} className="flex gap-3">
                <CheckCircle2Icon className="mt-1 h-5 w-5 flex-none text-cyan-700 dark:text-cyan-500" />
                <p className={`text-sm leading-6 ${tw.TEXT_PRIMARY}`}>{outcome}</p>
              </div>
            ))}
          </div>
        </div>

        <div id="ai-assistant" className="flex min-h-[70vh] w-full scroll-mt-20 flex-col">
          <div className="mb-3 flex items-center gap-2">
            <span className="rounded-full bg-cyan-700/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-800 dark:bg-cyan-400/10 dark:text-cyan-400">
              Live example
            </span>
            <p className={`text-sm ${tw.TEXT_PRIMARY}`}>
              See the kind of AI experience we can build for your business.
            </p>
          </div>
          <HomeChat />
        </div>
      </section>

      <section className={`${tw.BG_SECONDARY} px-6 py-16 lg:px-10`}>
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className={`mb-3 text-sm font-semibold uppercase tracking-widest ${tw.TEXT_TERTIARY}`}>
              One conversation, connected to real work
            </p>
            <h2 className={`text-3xl font-bold md:text-4xl ${tw.TEXT_PRIMARY}`}>
              Your applications and data become easier to use.
            </h2>
            <p className={`mt-4 text-lg leading-8 ${tw.TEXT_PRIMARY}`}>
              We connect the assistant to the systems your business already trusts. Users can ask for information, work
              with documents and records, and complete approved updates without navigating every system by hand.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {RJLS.workflow.map((step, index) => {
              const Icon = workflowIcons[index];

              return (
                <article
                  key={step.title}
                  className={`rounded-md border border-slate-900/10 p-5 dark:border-white/10 ${tw.BG_PRIMARY}`}
                >
                  <div className="mb-5 flex items-center justify-between">
                    <Icon className="h-6 w-6 text-cyan-700 dark:text-cyan-500" />
                    <span className={`text-sm font-semibold ${tw.TEXT_TERTIARY}`}>0{index + 1}</span>
                  </div>
                  <h3 className={`text-lg font-semibold ${tw.TEXT_PRIMARY}`}>{step.title}</h3>
                  <p className={`mt-2 text-sm leading-6 ${tw.TEXT_PRIMARY}`}>{step.summary}</p>
                </article>
              );
            })}
          </div>
          <p className={`mt-8 max-w-4xl text-sm leading-6 ${tw.TEXT_PRIMARY}`}>
            Behind the scenes, we can use MCP—a standard way for AI to work with approved business tools—to build a
            clean, controlled connection. You get a complete solution, not another piece of infrastructure your team has
            to assemble.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className={`mb-3 text-sm font-semibold uppercase tracking-widest ${tw.TEXT_TERTIARY}`}>
              Built around your domain
            </p>
            <h2 className={`text-3xl font-bold md:text-4xl ${tw.TEXT_PRIMARY}`}>
              A complete integration, shaped for your business.
            </h2>
            <p className={`mt-4 text-lg leading-8 ${tw.TEXT_PRIMARY}`}>
              We come in as consultants and builders, learn how your business works, and deliver the service and
              interface together.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {RJLS.services.map((service) => (
              <article key={service.title} className="border-t border-slate-900/20 pt-5 dark:border-white/20">
                <h3 className={`text-xl font-semibold ${tw.TEXT_PRIMARY}`}>{service.title}</h3>
                <p className={`mt-3 leading-7 ${tw.TEXT_PRIMARY}`}>{service.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${tw.BG_SECONDARY} px-6 py-16 lg:px-10`}>
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div>
            <p className={`mb-3 text-sm font-semibold uppercase tracking-widest ${tw.TEXT_TERTIARY}`}>Where it fits</p>
            <h2 className={`text-3xl font-bold ${tw.TEXT_PRIMARY}`}>Useful wherever people need your systems.</h2>
            <div className="mt-8 space-y-6">
              {RJLS.useCases.map((useCase) => (
                <article key={useCase.title}>
                  <h3 className={`text-lg font-semibold ${tw.TEXT_PRIMARY}`}>{useCase.title}</h3>
                  <p className={`mt-2 leading-7 ${tw.TEXT_PRIMARY}`}>{useCase.summary}</p>
                </article>
              ))}
            </div>
          </div>
          <div className={`rounded-lg border border-slate-900/10 p-7 dark:border-white/10 ${tw.BG_PRIMARY}`}>
            <KeyRoundIcon className="h-7 w-7 text-cyan-700 dark:text-cyan-500" />
            <h2 className={`mt-5 text-2xl font-bold ${tw.TEXT_PRIMARY}`}>Secure by design. Controlled by you.</h2>
            <p className={`mt-3 leading-7 ${tw.TEXT_PRIMARY}`}>
              Connecting AI to business data requires more than a chatbot. We design the boundaries around what it can
              see, what it can do, and when a person needs to stay in the loop.
            </p>
            <div className="mt-7 space-y-4">
              {RJLS.safeguards.map((safeguard) => (
                <div key={safeguard} className="flex gap-3">
                  <ShieldCheckIcon className="mt-0.5 h-5 w-5 flex-none text-cyan-700 dark:text-cyan-500" />
                  <p className={`leading-6 ${tw.TEXT_PRIMARY}`}>{safeguard}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-10">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 rounded-lg bg-cyan-800 p-8 md:flex-row md:items-center md:p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-100">Start with your workflow</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold text-white">
              Let’s identify where a connected AI assistant can create real value.
            </h2>
          </div>
          <a
            className="inline-flex flex-none items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-cyan-900 transition hover:bg-cyan-50"
            href={`mailto:${RJLS.contactEmail}?subject=RJLS Systems AI integration inquiry`}
          >
            {RJLS.primaryCta}
            <ArrowRightIcon className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
