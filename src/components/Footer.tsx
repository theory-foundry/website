import { RJLS } from "@/constants/RJLS";
import Link from "next/link";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/ai-readiness-audit", label: "AI Readiness Audit" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-zinc-900/10 bg-zinc-50 px-6 py-10 lg:px-10 dark:border-white/10 dark:bg-zinc-950">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <Link className="inline-flex items-center gap-3 font-semibold text-zinc-950 dark:text-zinc-100" href="/">
            <span className="grid size-9 place-items-center rounded-md bg-teal-700 font-mono text-xs text-zinc-50 dark:bg-teal-300 dark:text-zinc-950">
              RJ
            </span>
            {RJLS.companyName}
          </Link>
          <p className="mt-4 max-w-md text-sm leading-6 text-zinc-600 dark:text-zinc-400">{RJLS.tagline}</p>
          <p className="mt-6 font-mono text-xs text-zinc-500 dark:text-zinc-500">
            © {new Date().getFullYear()} {RJLS.companyName}
          </p>
        </div>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-3">
          {footerLinks.map((link) => (
            <Link
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-teal-800 active:translate-y-px dark:text-zinc-400 dark:hover:text-teal-300"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
