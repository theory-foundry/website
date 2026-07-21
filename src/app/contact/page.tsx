"use client";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import { RJLS } from "@/constants/RJLS";
import { MailIcon } from "lucide-react";

export default function Contact() {
  return (
    <main className={`${tw.BG_PRIMARY} min-h-screen px-6 py-16`}>
      <div className="mx-auto max-w-3xl">
        <p className={`mb-3 text-sm font-semibold uppercase tracking-widest ${tw.TEXT_TERTIARY}`}>Contact</p>
        <h1 className={`text-4xl font-bold ${tw.TEXT_PRIMARY}`}>Talk with {RJLS.companyName}</h1>
        <p className={`mt-5 text-lg leading-8 ${tw.TEXT_PRIMARY}`}>
          Tell us who should use your AI assistant, which application or workflow it should support, and what
          information or approved updates it needs to handle. We can help shape the opportunity and build the complete
          integration.
        </p>
        <a
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-cyan-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-800"
          href={`mailto:${RJLS.contactEmail}?subject=RJLS Systems AI integration inquiry`}
        >
          <MailIcon className="h-4 w-4" />
          {RJLS.contactEmail}
        </a>
      </div>
    </main>
  );
}
