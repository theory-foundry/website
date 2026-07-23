"use client";

import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import Articles from "@/example-data/Articles";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function BlogArticle() {
  const params = useParams<{ id: string }>();
  const article = Articles.find((candidate) => candidate.id === params.id);

  if (!article) {
    return (
      <main className={`min-h-[calc(100dvh-4.5rem)] ${tw.BG_PRIMARY}`} id="main-content">
        <div className="mx-auto max-w-3xl px-6 py-20 lg:px-10">
          <p className={`font-mono text-xs ${tw.TEXT_SECONDARY}`}>Article not found</p>
          <h1 className={`mt-5 text-5xl font-semibold tracking-[-0.05em] ${tw.TEXT_PRIMARY}`}>
            This article is not available.
          </h1>
          <Link
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-teal-800 underline underline-offset-4 dark:text-teal-300"
            href="/blog"
          >
            <ArrowLeftIcon className="size-4" strokeWidth={1.75} />
            Back to insights
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={`min-h-screen ${tw.BG_PRIMARY}`} id="main-content">
      <article className="mx-auto max-w-3xl px-6 py-14 lg:px-10 lg:py-20">
        <Link
          className={`inline-flex items-center gap-2 text-sm font-semibold underline decoration-zinc-400 underline-offset-4 transition hover:text-teal-800 dark:decoration-zinc-600 dark:hover:text-teal-300 ${tw.TEXT_PRIMARY}`}
          href="/blog"
        >
          <ArrowLeftIcon className="size-4" strokeWidth={1.75} />
          Back to insights
        </Link>
        <header className="mt-12 border-b border-zinc-900/15 pb-10 dark:border-white/15">
          <time className={`font-mono text-xs tabular-nums ${tw.TEXT_SECONDARY}`}>
            {article.createdDate.toLocaleDateString("en-US", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </time>
          <h1
            className={`mt-5 text-4xl font-semibold leading-tight tracking-[-0.045em] md:text-5xl ${tw.TEXT_PRIMARY}`}
          >
            {article.title}
          </h1>
          {article.articleDescription && (
            <p className={`mt-6 text-lg leading-8 ${tw.TEXT_SECONDARY}`}>{article.articleDescription}</p>
          )}
        </header>
        <div className={`${tw.TEXT_PRIMARY} markdown mt-10 leading-8`}>
          <Markdown remarkPlugins={[remarkGfm]}>{decodeURIComponent(article.articleText)}</Markdown>
        </div>
      </article>
    </main>
  );
}
