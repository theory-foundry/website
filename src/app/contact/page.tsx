import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import { RJLS } from "@/constants/RJLS";
import { ArrowUpRightIcon, MailIcon } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start an AI Integration Conversation | RJLS Systems",
  description:
    "Tell RJLS Systems about the existing product, people, data, and workflow behind a possible AI integration.",
};

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
            Start with the workflow you want to improve.
          </h1>
          <p className={`mt-8 max-w-[62ch] text-lg leading-8 ${tw.TEXT_SECONDARY}`}>
            Tell us about the existing product, who uses it, and the information or action they need. A rough example
            is enough to start an exploratory conversation.
          </p>
        </div>

        <aside className="self-start rounded-xl bg-mist p-7 md:p-9 dark:bg-night-surface">
          <MailIcon className="size-6 text-forest dark:text-mint" strokeWidth={1.75} />
          <h2 className={`mt-6 text-2xl font-semibold tracking-[-0.03em] ${tw.TEXT_PRIMARY}`}>Start with an email</h2>
          <p className={`mt-3 text-sm leading-6 ${tw.TEXT_SECONDARY}`}>
            The link opens an email with the right subject. We will review the context and reply to arrange an
            exploratory call if the work looks like a fit.
          </p>
          <a
            className="mt-8 inline-flex max-w-full items-center gap-2 break-all text-sm font-semibold text-forest underline decoration-forest/40 underline-offset-4 transition hover:text-night active:translate-y-px dark:text-mint dark:hover:text-mist"
            href={`mailto:${RJLS.contactEmail}?subject=RJLS Systems AI integration inquiry`}
          >
            Email RJLS to start the conversation
            <ArrowUpRightIcon className="size-4 flex-none" strokeWidth={1.75} />
          </a>
        </aside>
      </section>
    </main>
  );
}
