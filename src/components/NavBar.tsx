"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { THEORY_FOUNDRY } from "@/constants/TheoryFoundry";
import { ChevronDownIcon, MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import ThemeSwitchButton from "./ThemeSwitchButton";

const publicLinks = [
  { href: "/our-process", title: "Our Process" },
  { href: "/contact", title: "Contact" },
];

export default function NavBar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const links = publicLinks;

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const isProductsActive = isActive("/products");
  const isAiIntegrationMcpActive = pathname === "/products/ai-integration-mcp";
  const isResumeAgentActive = pathname === "/products/resume-agent";

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
          <span className="whitespace-nowrap tracking-[-0.02em]">{THEORY_FOUNDRY.companyName}</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={`group inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition duration-200 focus-visible:outline-none active:translate-y-px ${
                  isProductsActive
                    ? "bg-forest text-cream dark:bg-mist dark:text-navy"
                    : "text-forest hover:bg-forest/5 hover:text-navy focus-visible:bg-forest/5 focus-visible:text-navy dark:text-sage dark:hover:bg-cream/[0.12] dark:hover:text-cream dark:focus-visible:bg-cream/[0.12] dark:focus-visible:text-cream"
                }`}
                type="button"
              >
                Products
                <ChevronDownIcon className="size-3.5 transition-transform group-data-[state=open]:rotate-180" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-56 border-0 bg-cream p-1.5 text-navy shadow-none ring-0 dark:bg-night-surface dark:text-cream"
              sideOffset={8}
            >
              <DropdownMenuItem asChild className="cursor-pointer p-0 focus:bg-forest/10 dark:focus:bg-cream/[0.12]">
                <Link
                  aria-current={isAiIntegrationMcpActive ? "page" : undefined}
                  className={`w-full rounded-md px-3 py-2.5 font-medium outline-none ${
                    isAiIntegrationMcpActive ? "bg-forest/10 dark:bg-cream/[0.12]" : ""
                  }`}
                  href="/products/ai-integration-mcp"
                >
                  AI Integration &amp; MCP
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer p-0 focus:bg-forest/10 dark:focus:bg-cream/[0.12]">
                <Link
                  aria-current={isResumeAgentActive ? "page" : undefined}
                  className={`w-full rounded-md px-3 py-2.5 font-medium outline-none ${
                    isResumeAgentActive ? "bg-forest/10 dark:bg-cream/[0.12]" : ""
                  }`}
                  href="/products/resume-agent"
                >
                  Resume Agent
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

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
            <div className="mb-2 border-b border-forest/10 pb-3 dark:border-cream/20">
              <p
                className={`px-3 pb-1 pt-2 font-mono text-xs font-medium uppercase tracking-[0.16em] ${
                  isProductsActive ? "text-navy dark:text-cream" : "text-forest dark:text-mint"
                }`}
              >
                Products
              </p>
              <Link
                aria-current={isAiIntegrationMcpActive ? "page" : undefined}
                className={`block rounded-md px-3 py-3 text-base font-medium transition active:translate-y-px ${
                  isAiIntegrationMcpActive
                    ? "bg-forest text-cream dark:bg-mist dark:text-navy"
                    : "text-navy hover:bg-forest/5 dark:text-sage dark:hover:bg-cream/[0.12]"
                }`}
                href="/products/ai-integration-mcp"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                AI Integration &amp; MCP
              </Link>
              <Link
                aria-current={isResumeAgentActive ? "page" : undefined}
                className={`block rounded-md px-3 py-3 text-base font-medium transition active:translate-y-px ${
                  isResumeAgentActive
                    ? "bg-forest text-cream dark:bg-mist dark:text-navy"
                    : "text-navy hover:bg-forest/5 dark:text-sage dark:hover:bg-cream/[0.12]"
                }`}
                href="/products/resume-agent"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Resume Agent
              </Link>
            </div>

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
