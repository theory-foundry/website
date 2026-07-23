import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "../styles/index.scss";
import { ThemeProvider } from "@/providers/ThemeProvider";
import NavBar from "@/components/NavBar";
import { Body } from "@/components/Body";
import { Footer } from "@/components/Footer";
import { cn } from "@/lib/utils";
import { RJLS } from "@/constants/RJLS";

const geist = localFont({
  display: "swap",
  src: "./fonts/geist-latin.woff2",
  variable: "--font-sans",
});

const geistMono = localFont({
  display: "swap",
  src: "./fonts/geist-mono-latin.woff2",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${RJLS.website}`),
  title: RJLS.companyName,
  description: RJLS.tagline,
  openGraph: {
    title: RJLS.companyName,
    description: RJLS.tagline,
    images: [{ alt: "RJLS Systems, AI connected to your business.", height: 630, url: "/og.png", width: 1200 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: RJLS.companyName,
    description: RJLS.tagline,
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable, geistMono.variable)} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Body>
            <a
              className="fixed left-4 top-4 z-50 -translate-y-24 rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-zinc-50 transition-transform focus:translate-y-0 dark:bg-teal-300 dark:text-zinc-950"
              href="#main-content"
            >
              Skip to content
            </a>
            <NavBar />
            {children}
            <Footer />
          </Body>
        </ThemeProvider>
      </body>
    </html>
  );
}
