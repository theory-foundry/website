"use client";

import { RJLS } from "@/constants/RJLS";
import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import ThemeSwitchButton from "./ThemeSwitchButton";

const publicLinks = [
  { href: "/about", title: "About" },
  { href: "/contact", title: "Contact" },
];

export default function NavBar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const links = publicLinks;

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav
      aria-label="Primary navigation"
      className="sticky top-0 z-40 border-b border-forest/10 bg-cream dark:border-cream/20 dark:bg-night"
    >
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-6 px-6 lg:px-10">
        <Link
          className="group inline-flex min-w-0 items-center gap-3 rounded-md font-semibold text-navy focus-visible:outline-none dark:text-cream"
          href="/"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <span className="grid size-10 flex-none place-items-center rounded-md bg-forest font-mono text-xs text-cream transition-transform duration-200 group-hover:-translate-y-0.5 group-active:translate-y-px dark:bg-forest dark:text-cream">
            RJ
          </span>
          <span className="truncate tracking-[-0.02em]">{RJLS.companyName}</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = isActive(link.href);

            return (
              <Link
                aria-current={active ? "page" : undefined}
                className={`rounded-md px-3 py-2 text-sm font-medium transition duration-200 active:translate-y-px ${
                  active
                    ? "bg-forest text-cream dark:bg-mist dark:text-navy"
                    : "text-forest hover:bg-forest/5 hover:text-navy dark:text-sage dark:hover:bg-cream/[0.12] dark:hover:text-cream"
                }`}
                href={link.href}
                key={link.href}
              >
                {link.title}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <ThemeSwitchButton />
          <button
            aria-controls="mobile-menu"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Close main menu" : "Open main menu"}
            className="grid size-10 place-items-center rounded-md border border-forest/10 text-navy transition hover:bg-forest/5 active:translate-y-px md:hidden dark:border-cream/20 dark:text-sage dark:hover:bg-cream/[0.12]"
            onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
            type="button"
          >
            {isMobileMenuOpen ? (
              <XIcon className="size-5" strokeWidth={1.75} />
            ) : (
              <MenuIcon className="size-5" strokeWidth={1.75} />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="border-t border-forest/10 bg-cream px-6 pb-6 pt-3 md:hidden dark:border-cream/20 dark:bg-night"
          id="mobile-menu"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {links.map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  aria-current={active ? "page" : undefined}
                  className={`rounded-md px-3 py-3 text-base font-medium transition active:translate-y-px ${
                    active
                      ? "bg-forest text-cream dark:bg-mist dark:text-navy"
                      : "text-navy hover:bg-forest/5 dark:text-sage dark:hover:bg-cream/[0.12]"
                  }`}
                  href={link.href}
                  key={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.title}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
