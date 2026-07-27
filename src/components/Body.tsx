"use client";
import { useThemeContext } from "@/providers/ThemeProvider";
import { ReactNode } from "react";

export function Body({ children }: { children: ReactNode }) {
  const { theme } = useThemeContext();
  return (
    <div className={`${theme === "dark" ? "dark" : "light"} min-h-[100dvh] bg-cream dark:bg-night`}>
      {children}
    </div>
  );
}
