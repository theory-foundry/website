import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import { RJLS } from "@/constants/RJLS";

const capabilities = ["Complete AI chat experiences", "Secure system connections", "Reliable, controlled operations"];

export default function About() {
  return (
    <main className={`${tw.BG_PRIMARY} min-h-screen`} id="main-content">
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <p className={`mb-5 font-mono text-xs font-medium uppercase tracking-[0.18em] ${tw.TEXT_TERTIARY}`}>About</p>
        <h1
          className={`max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-0.05em] md:text-6xl ${tw.TEXT_PRIMARY}`}
        >
          We build the connection between AI and your business.
        </h1>
        <p className={`mt-8 max-w-[68ch] text-lg leading-8 ${tw.TEXT_SECONDARY}`}>{RJLS.about}</p>

        <div className="mt-16 grid gap-4 md:grid-cols-[1.35fr_0.65fr]">
          <div className="rounded-xl bg-teal-700 p-8 text-zinc-50 md:p-10 dark:bg-teal-300 dark:text-zinc-950">
            <p className="font-mono text-xs opacity-75">What we focus on</p>
            <p className="mt-8 max-w-xl text-3xl font-semibold leading-tight tracking-[-0.035em]">{capabilities[0]}</p>
          </div>
          <div className="grid gap-4">
            {capabilities.slice(1).map((item) => (
              <div className="rounded-xl bg-zinc-100 p-6 dark:bg-zinc-900" key={item}>
                <p className={`font-semibold tracking-[-0.02em] ${tw.TEXT_PRIMARY}`}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-900/10 bg-zinc-100/65 px-6 py-16 lg:px-10 lg:py-24 dark:border-white/10 dark:bg-zinc-900/65">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <h2 className={`text-4xl font-semibold tracking-[-0.04em] ${tw.TEXT_PRIMARY}`}>What we deliver</h2>
          <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
            {RJLS.clientOutcomes.map((outcome) => (
              <div className="border-t border-zinc-900/15 pt-5 dark:border-white/15" key={outcome}>
                <p className={`leading-7 ${tw.TEXT_SECONDARY}`}>{outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <h2 className={`text-4xl font-semibold tracking-[-0.04em] ${tw.TEXT_PRIMARY}`}>The team</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {RJLS.team.map((member) => (
            <article className="flex items-center gap-5 rounded-xl bg-zinc-100 p-6 dark:bg-zinc-900" key={member.name}>
              <div
                aria-hidden="true"
                className="grid size-14 flex-none place-items-center rounded-md bg-zinc-950 font-mono text-sm font-semibold text-zinc-50 dark:bg-zinc-100 dark:text-zinc-950"
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
      </section>
    </main>
  );
}
