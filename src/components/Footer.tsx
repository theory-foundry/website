import { THEORY_FOUNDRY } from "@/constants/TheoryFoundry";
import Link from "next/link";

import { TheoryFoundryLogo } from "./TheoryFoundryLogo";

const footerLinks = [
  { href: "/our-process", label: "Our Process" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-forest/10 bg-cream px-6 py-10 lg:px-10 dark:border-cream/20 dark:bg-night">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <Link
            className="inline-flex rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-cream dark:focus-visible:ring-mint dark:focus-visible:ring-offset-night"
            href="/"
          >
            <TheoryFoundryLogo className="h-16 w-48" />
          </Link>
          <p className="mt-4 max-w-md text-sm leading-6 text-forest dark:text-sage">
            Add AI that works with your app&apos;s data and workflows, with access and actions scoped to the job.
          </p>
          <a
            className="mt-4 inline-flex text-sm font-semibold text-forest underline decoration-forest/40 underline-offset-4 transition-colors hover:text-night dark:text-mint dark:hover:text-mist"
            href={`mailto:${THEORY_FOUNDRY.contactEmail}?subject=Theory Foundry AI integration inquiry`}
          >
            Start an exploratory conversation
          </a>
          <p className="mt-6 font-mono text-xs text-forest-soft dark:text-sage">
            © {new Date().getFullYear()} {THEORY_FOUNDRY.companyName}
          </p>
        </div>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-3">
          {footerLinks.map((link) => (
            <Link
              className="text-sm font-medium text-forest transition-colors hover:text-forest active:translate-y-px dark:text-sage dark:hover:text-mint"
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
