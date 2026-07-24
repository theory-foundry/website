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
      className="group grid size-10 place-items-center rounded-md border border-forest/10 text-navy transition duration-200 hover:bg-forest/5 active:translate-y-px dark:border-cream/20 dark:text-sage dark:hover:bg-cream/[0.12]"
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
