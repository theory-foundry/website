import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className={`grid min-h-[calc(100dvh-4.5rem)] place-items-center px-6 py-16 ${tw.BG_PRIMARY}`}
      id="main-content"
    >
      <div className="w-full max-w-2xl">
        <p className={`font-mono text-xs ${tw.TEXT_SECONDARY}`}>Page not found</p>
        <h1 className={`mt-5 text-5xl font-semibold tracking-[-0.05em] md:text-6xl ${tw.TEXT_PRIMARY}`}>
          There is nothing at this address.
        </h1>
        <p className={`mt-6 max-w-[52ch] text-lg leading-8 ${tw.TEXT_SECONDARY}`}>
          The page may have moved, or the address may be incomplete.
        </p>
        <Link
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-forest px-5 py-3 text-sm font-semibold text-cream transition hover:-translate-y-0.5 hover:bg-navy active:translate-y-px dark:bg-forest dark:text-cream dark:hover:bg-mist dark:hover:text-navy"
          href="/"
        >
          <ArrowLeftIcon className="size-4" strokeWidth={1.75} />
          Back home
        </Link>
      </div>
    </main>
  );
}
