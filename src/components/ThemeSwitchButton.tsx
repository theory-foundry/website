"use client";

import { useThemeContext } from "@/providers/ThemeProvider";
import ThemeService from "@/services/ThemeService";
import { MoonIcon, SunIcon } from "lucide-react";
import { ButtonHTMLAttributes, useCallback, useEffect } from "react";

const themeService = new ThemeService();

export default function ThemeSwitchButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { theme, setTheme } = useThemeContext();

  const changeTheme = useCallback(
    (newTheme: string) => {
      setTheme(newTheme);
      themeService.setTheme(newTheme);
    },
    [setTheme],
  );

  useEffect(() => {
    changeTheme(themeService.getThemeFromLocalStorage());
  }, [changeTheme]);

  return (
    <button
      {...props}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className="group grid size-10 place-items-center rounded-md border border-zinc-900/10 text-zinc-700 transition duration-200 hover:bg-zinc-900/5 active:translate-y-px dark:border-white/10 dark:text-zinc-300 dark:hover:bg-white/[0.08]"
      onClick={() => changeTheme(theme === "light" ? "dark" : "light")}
      type="button"
    >
      {theme === "light" ? (
        <MoonIcon className="size-4 transition-transform group-hover:-rotate-6" strokeWidth={1.75} />
      ) : (
        <SunIcon className="size-4 transition-transform group-hover:rotate-12" strokeWidth={1.75} />
      )}
    </button>
  );
}
