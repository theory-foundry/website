export default class ThemeService {
  setTheme(theme: string) {
    if (theme === "light") {
      localStorage.theme = "light";
      document.documentElement.classList.remove("dark");
    } else {
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
    }
  }

  getThemeFromLocalStorage() {
    if (localStorage?.theme === "light" || localStorage?.theme === "dark") {
      return localStorage.theme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
}
