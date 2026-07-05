"use client";

import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import { RJLS } from "@/constants/RJLS";
import { RESUME } from "@/example-data/Resume";

function renderHighlight(highlight: string) {
  return highlight.split(/(\*\*.*?\*\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`${highlight}-bold-${index}`}>{part.slice(2, -2)}</strong>;
    }

    return <span key={`${highlight}-text-${index}`}>{part}</span>;
  });
}

export default function About() {
  const relevantExperience = RESUME.experience.slice(0, 3);

  return (
    <main className={`${tw.BG_PRIMARY} min-h-screen px-6 py-16`}>
      <section className="mx-auto max-w-5xl">
        <p className={`mb-3 text-sm font-semibold uppercase tracking-widest ${tw.TEXT_TERTIARY}`}>About</p>
        <h1 className={`max-w-3xl text-4xl font-bold ${tw.TEXT_PRIMARY}`}>{RJLS.founder.title}</h1>
        <p className={`mt-5 max-w-3xl text-lg leading-8 ${tw.TEXT_PRIMARY}`}>{RJLS.founder.summary}</p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {["Production AI systems", "Secure full-stack architecture", "Developer workflow integration"].map((item) => (
            <div key={item} className={`rounded-md border border-slate-900/10 p-5 dark:border-white/10 ${tw.BG_SECONDARY}`}>
              <p className={`font-semibold ${tw.TEXT_PRIMARY}`}>{item}</p>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <h2 className={`text-2xl font-bold ${tw.TEXT_PRIMARY}`}>Relevant background</h2>
          <div className="mt-6 space-y-8">
            {relevantExperience.map(({ company, title, period, highlights }) => (
              <article key={`${company}-${title}-${period}`} className="border-t border-slate-900/20 pt-6 dark:border-white/20">
                <h3 className={`text-xl font-semibold ${tw.TEXT_PRIMARY}`}>
                  {company} - {title}
                </h3>
                <time className={`text-xs uppercase tracking-wide ${tw.TEXT_SECONDARY}`}>{period}</time>
                <ul className={`mt-3 list-disc space-y-2 pl-5 leading-7 ${tw.TEXT_PRIMARY}`}>
                  {highlights.slice(0, 3).map((highlight) => (
                    <li key={highlight}>{renderHighlight(highlight)}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
