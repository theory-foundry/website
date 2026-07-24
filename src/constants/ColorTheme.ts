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
    TEXT_PRIMARY: "text-navy",
    TEXT_SECONDARY: "text-forest",
    TEXT_TERTIARY: "text-forest",
    BG_PRIMARY: "bg-cream",
    BG_SECONDARY: "bg-mist",
    BG_TERTIARY: "bg-forest",
    BTN_PRIMARY: "bg-forest text-cream",
    BTN_SECONDARY: "bg-forest text-cream",
    BTN_DANGER: "bg-red-700 text-cream",
    BTN_WARN: "bg-amber-100 text-amber-950",
    BTN_NONE: "bg-transparent text-navy",
  },
  dark: {
    TEXT_PRIMARY: "text-cream",
    TEXT_SECONDARY: "text-sage",
    TEXT_TERTIARY: "text-mint",
    BG_PRIMARY: "bg-night",
    BG_SECONDARY: "bg-night-surface",
    BG_TERTIARY: "bg-forest-deep",
    BTN_PRIMARY: "bg-forest text-cream",
    BTN_SECONDARY: "bg-mist text-navy",
    BTN_DANGER: "bg-red-500 text-navy",
    BTN_WARN: "bg-amber-300 text-amber-950",
    BTN_NONE: "bg-transparent text-cream",
  },
};

export const TailWindColorThemeClasses: ITailWindColorThemeClasses = {
  TEXT_PRIMARY: "text-navy dark:text-cream",
  TEXT_SECONDARY: "text-forest dark:text-sage",
  TEXT_TERTIARY: "text-forest dark:text-mint",
  BG_PRIMARY: "bg-cream dark:bg-night",
  BG_SECONDARY: "bg-mist dark:bg-night-surface",
  BG_TERTIARY: "bg-forest dark:bg-forest-deep",
  BTN_PRIMARY:
    "bg-forest text-cream hover:bg-navy dark:bg-forest dark:text-cream dark:hover:bg-mist dark:hover:text-navy",
  BTN_SECONDARY: "bg-forest text-cream hover:bg-navy dark:bg-mist dark:text-navy dark:hover:bg-cream",
  BTN_DANGER: "bg-red-700 text-cream dark:bg-red-400 dark:text-navy",
  BTN_WARN: "bg-amber-100 text-amber-950 dark:bg-amber-300 dark:text-amber-950",
  BTN_NONE: "bg-transparent text-navy dark:bg-transparent dark:text-cream",
};
