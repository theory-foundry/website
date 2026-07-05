import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import { RJLS } from "@/constants/RJLS";

export default function About() {
  return (
    <main className={`${tw.BG_PRIMARY} min-h-screen px-6 py-16`}>
      <section className="mx-auto max-w-5xl">
        <p className={`mb-3 text-sm font-semibold uppercase tracking-widest ${tw.TEXT_TERTIARY}`}>About</p>
        <h1 className={`max-w-3xl text-4xl font-bold ${tw.TEXT_PRIMARY}`}>
          AI integration built for business control.
        </h1>
        <p className={`mt-5 max-w-3xl text-lg leading-8 ${tw.TEXT_PRIMARY}`}>{RJLS.about}</p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {["Governed AI adoption", "Secure integration patterns", "Cost and output control"].map((item) => (
            <div key={item} className={`rounded-md border border-slate-900/10 p-5 dark:border-white/10 ${tw.BG_SECONDARY}`}>
              <p className={`font-semibold ${tw.TEXT_PRIMARY}`}>{item}</p>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <h2 className={`text-2xl font-bold ${tw.TEXT_PRIMARY}`}>What clients get</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {RJLS.clientOutcomes.map((outcome) => (
              <div key={outcome} className="border-t border-slate-900/20 pt-5 dark:border-white/20">
                <p className={`leading-7 ${tw.TEXT_PRIMARY}`}>{outcome}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h2 className={`text-2xl font-bold ${tw.TEXT_PRIMARY}`}>Team</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {RJLS.team.map((member) => (
              <article
                key={member.name}
                className={`rounded-md border border-slate-900/10 p-6 dark:border-white/10 ${tw.BG_SECONDARY}`}
              >
                <div className="flex items-start gap-5">
                  <div
                    aria-label={member.photoAlt}
                    className="flex h-24 w-24 flex-none items-center justify-center rounded-md border border-dashed border-slate-900/30 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:border-white/30 dark:text-slate-400"
                  >
                    Photo
                  </div>
                  <div>
                    <h3 className={`text-xl font-semibold ${tw.TEXT_PRIMARY}`}>{member.name}</h3>
                    <p className={`mt-1 text-sm font-semibold uppercase tracking-wider ${tw.TEXT_SECONDARY}`}>
                      {member.role}
                    </p>
                    <p className={`mt-4 leading-7 ${tw.TEXT_PRIMARY}`}>{member.bio}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
