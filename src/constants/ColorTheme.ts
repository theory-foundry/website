export interface ITailWindColorThemeClasses {
  TEXT_PRIMARY: string;
  TEXT_SECONDARY: string;
  TEXT_TERTIARY: string;
  BG_PRIMARY: string;
  BG_SECONDARY: string;
  BG_TERTIARY: string;
  BTN_PRIMARY: string;
  BTN_SECONDARY: string;
  BTN_DANGER: string;
  BTN_WARN: string;
  BTN_NONE: string;
}

export const _TailWindColorThemeClasses: {
  light: ITailWindColorThemeClasses;
  dark: ITailWindColorThemeClasses;
} = {
  light: {
    TEXT_PRIMARY: "text-zinc-950",
    TEXT_SECONDARY: "text-zinc-600",
    TEXT_TERTIARY: "text-teal-800",
    BG_PRIMARY: "bg-zinc-50",
    BG_SECONDARY: "bg-zinc-100",
    BG_TERTIARY: "bg-teal-700",
    BTN_PRIMARY: "bg-teal-700 text-zinc-50",
    BTN_SECONDARY: "bg-zinc-900 text-zinc-50",
    BTN_DANGER: "bg-red-700 text-zinc-50",
    BTN_WARN: "bg-amber-100 text-amber-950",
    BTN_NONE: "bg-transparent text-zinc-950",
  },
  dark: {
    TEXT_PRIMARY: "text-zinc-100",
    TEXT_SECONDARY: "text-zinc-400",
    TEXT_TERTIARY: "text-teal-300",
    BG_PRIMARY: "bg-zinc-950",
    BG_SECONDARY: "bg-zinc-900",
    BG_TERTIARY: "bg-teal-600",
    BTN_PRIMARY: "bg-teal-500 text-zinc-950",
    BTN_SECONDARY: "bg-zinc-100 text-zinc-950",
    BTN_DANGER: "bg-red-500 text-zinc-950",
    BTN_WARN: "bg-amber-300 text-amber-950",
    BTN_NONE: "bg-transparent text-zinc-100",
  },
};

export const TailWindColorThemeClasses: ITailWindColorThemeClasses = {
  TEXT_PRIMARY: "text-zinc-950 dark:text-zinc-100",
  TEXT_SECONDARY: "text-zinc-600 dark:text-zinc-400",
  TEXT_TERTIARY: "text-teal-800 dark:text-teal-300",
  BG_PRIMARY: "bg-zinc-50 dark:bg-zinc-950",
  BG_SECONDARY: "bg-zinc-100 dark:bg-zinc-900",
  BG_TERTIARY: "bg-teal-700 dark:bg-teal-600",
  BTN_PRIMARY: "bg-teal-700 text-zinc-50 hover:bg-teal-800 dark:bg-teal-400 dark:text-zinc-950 dark:hover:bg-teal-300",
  BTN_SECONDARY: "bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white",
  BTN_DANGER: "bg-red-700 text-zinc-50 dark:bg-red-400 dark:text-zinc-950",
  BTN_WARN: "bg-amber-100 text-amber-950 dark:bg-amber-300 dark:text-amber-950",
  BTN_NONE: "bg-transparent text-zinc-950 dark:bg-transparent dark:text-zinc-100",
};
