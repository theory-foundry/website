"use client";

import { RJLS } from "@/constants/RJLS";
import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import ThemeSwitchButton from "./ThemeSwitchButton";

const publicLinks = [
  { href: "/about", title: "About" },
  { href: "/ai-readiness-audit", title: "AI Readiness Audit" },
  { href: "/contact", title: "Contact" },
];

export default function NavBar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const links = [...publicLinks];

  if (process.env.NODE_ENV === "development") {
    links.push({ href: "/chat-test", title: "Chat Test" });
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav
      aria-label="Primary navigation"
      className="sticky top-0 z-40 border-b border-zinc-900/10 bg-zinc-50 dark:border-white/10 dark:bg-zinc-950"
    >
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-6 px-6 lg:px-10">
        <Link
          className="group inline-flex min-w-0 items-center gap-3 rounded-md font-semibold text-zinc-950 focus-visible:outline-none dark:text-zinc-100"
          href="/"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <span className="grid size-10 flex-none place-items-center rounded-md bg-teal-700 font-mono text-xs text-zinc-50 transition-transform duration-200 group-hover:-translate-y-0.5 group-active:translate-y-px dark:bg-teal-300 dark:text-zinc-950">
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
                    ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-950"
                    : "text-zinc-600 hover:bg-zinc-900/5 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-white/[0.08] dark:hover:text-zinc-100"
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
            className="grid size-10 place-items-center rounded-md border border-zinc-900/10 text-zinc-700 transition hover:bg-zinc-900/5 active:translate-y-px md:hidden dark:border-white/10 dark:text-zinc-300 dark:hover:bg-white/[0.08]"
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
          className="border-t border-zinc-900/10 bg-zinc-50 px-6 pb-6 pt-3 md:hidden dark:border-white/10 dark:bg-zinc-950"
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
                      ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-950"
                      : "text-zinc-700 hover:bg-zinc-900/5 dark:text-zinc-300 dark:hover:bg-white/[0.08]"
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
