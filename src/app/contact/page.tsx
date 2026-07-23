import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import { RJLS } from "@/constants/RJLS";
import { ArrowUpRightIcon, MailIcon } from "lucide-react";

export default function Contact() {
  return (
    <main className={`${tw.BG_PRIMARY} min-h-[calc(100dvh-4.5rem)]`} id="main-content">
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1fr_0.72fr] lg:px-10 lg:py-24">
        <div>
          <p className={`mb-5 font-mono text-xs font-medium uppercase tracking-[0.18em] ${tw.TEXT_TERTIARY}`}>
            Contact
          </p>
          <h1
            className={`max-w-3xl text-5xl font-semibold leading-[1.02] tracking-[-0.05em] md:text-6xl ${tw.TEXT_PRIMARY}`}
          >
            Tell us where AI should do real work.
          </h1>
          <p className={`mt-8 max-w-[62ch] text-lg leading-8 ${tw.TEXT_SECONDARY}`}>
            Share the people, systems, and workflow involved. We can help shape a focused opportunity and build the
            complete integration.
          </p>
        </div>

        <aside className="self-start rounded-xl bg-zinc-100 p-7 md:p-9 dark:bg-zinc-900">
          <MailIcon className="size-6 text-teal-700 dark:text-teal-300" strokeWidth={1.75} />
          <h2 className={`mt-6 text-2xl font-semibold tracking-[-0.03em] ${tw.TEXT_PRIMARY}`}>Start with an email</h2>
          <p className={`mt-3 text-sm leading-6 ${tw.TEXT_SECONDARY}`}>
            A few sentences about the workflow are enough for an initial conversation.
          </p>
          <a
            className="mt-8 inline-flex max-w-full items-center gap-2 break-all text-sm font-semibold text-teal-800 underline decoration-teal-700/40 underline-offset-4 transition hover:text-teal-950 active:translate-y-px dark:text-teal-300 dark:hover:text-teal-100"
            href={`mailto:${RJLS.contactEmail}?subject=RJLS Systems AI integration inquiry`}
          >
            {RJLS.contactEmail}
            <ArrowUpRightIcon className="size-4 flex-none" strokeWidth={1.75} />
          </a>
        </aside>
      </section>
    </main>
  );
}
