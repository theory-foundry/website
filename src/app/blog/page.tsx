"use client";
import { useRouter } from "next/navigation";
import Articles, { IArticle } from "@/example-data/Articles";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import Image from "next/image";

export default function Blog() {
  const router = useRouter();

  return (
    <main className={`flex min-h-screen flex-col items-center ${tw.BG_PRIMARY} px-8 py-14 md:px-24`}>
      <h1 className={`mb-10 text-center text-4xl font-bold ${tw.TEXT_SECONDARY}`}>Insights</h1>
      <div className="max-w-screen-lg space-y-6">
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2">
          {Articles.map((article) => (
            <ArticleListing
              article={article}
              key={`article-listing-${article.id}`}
              onClick={() => router.push(`/blog/${article.id}`)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

function ArticleListing({ article, onClick }: { article: IArticle; onClick: () => void }) {
  return (
    <article className="cursor-pointer rounded-md p-4 transition hover:bg-white/10 md:p-8" onClick={onClick}>
      {article.imageSrc && (
        <div className="relative h-52 w-full">
          <Image alt="" fill className="object-cover dark:bg-gray-500" src={article.imageSrc} />
        </div>
      )}
      <div className="flex flex-1 flex-col py-6">
        <h2 className={`text-lg font-semibold uppercase tracking-wider hover:underline ${tw.TEXT_TERTIARY}`}>
          {article.title}
        </h2>
        <p className={`py-2 leading-7 ${tw.TEXT_PRIMARY}`}>{article.articleDescription}</p>
        <time className={`pt-3 text-xs ${tw.TEXT_SECONDARY}`}>{article.createdDate?.toLocaleDateString()}</time>
      </div>
    </article>
  );
}
