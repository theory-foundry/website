import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import Articles from "@/example-data/Articles";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

export default function Blog() {
  return (
    <main className={`min-h-screen ${tw.BG_PRIMARY}`} id="main-content">
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <p className={`mb-5 font-mono text-xs font-medium uppercase tracking-[0.18em] ${tw.TEXT_TERTIARY}`}>Insights</p>
        <h1
          className={`max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-0.05em] md:text-6xl ${tw.TEXT_PRIMARY}`}
        >
          Practical notes on systems and infrastructure.
        </h1>

        <div className="mt-16 border-t border-forest/15 dark:border-cream/25">
          {Articles.map((article) => (
            <article className="group border-b border-forest/15 dark:border-cream/25" key={article.id}>
              <Link
                className="grid gap-5 py-8 transition duration-200 hover:translate-x-1 sm:grid-cols-[9rem_1fr_auto] sm:items-center"
                href={`/blog/${article.id}`}
              >
                <time className={`font-mono text-xs tabular-nums ${tw.TEXT_SECONDARY}`}>
                  {article.createdDate.toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </time>
                <div>
                  <h2 className={`text-2xl font-semibold tracking-[-0.03em] ${tw.TEXT_PRIMARY}`}>{article.title}</h2>
                  <p className={`mt-3 max-w-[65ch] leading-7 ${tw.TEXT_SECONDARY}`}>{article.articleDescription}</p>
                </div>
                <ArrowUpRightIcon
                  className="size-5 text-forest transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 dark:text-mint"
                  strokeWidth={1.75}
                />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
