import { ITailWindColorThemeClasses, TailWindColorThemeClasses } from "./src/constants/ColorTheme";
import type { Config } from "tailwindcss";

const reduceClasses = (obj: ITailWindColorThemeClasses) => {
  return Object.values(obj).reduce((acc: string[], curr: string) => {
    acc.push(...curr.split(" "));
    return acc;
  }, []);
};

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        cream: "#F5FBE6",
        mist: "#EDF5DD",
        sage: "#C5D7B8",
        "sage-muted": "#A8BEA1",
        mint: "#8FB6A0",
        forest: "#215E61",
        "forest-soft": "#477B76",
        "forest-deep": "#1B5053",
        navy: "#233D4D",
        night: "#08151D",
        "night-panel": "#061219",
        "night-raised": "#102A33",
        "night-surface": "#123039",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgba(35, 61, 77, 0.08)",
        md: "0 4px 6px -1px rgba(35, 61, 77, 0.12), 0 2px 4px -2px rgba(35, 61, 77, 0.08)",
        lg: "0 10px 18px -5px rgba(35, 61, 77, 0.16), 0 4px 7px -4px rgba(35, 61, 77, 0.1)",
      },
    },
  },
  safelist: [...reduceClasses(TailWindColorThemeClasses)],
  plugins: [],
  darkMode: "selector",
};
export default config;
