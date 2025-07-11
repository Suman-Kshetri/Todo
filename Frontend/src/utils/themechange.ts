// themechange.ts

type Theme = "light" | "dark";

// Apply dark mode
export const setDarkMode = () => {
  document.body.setAttribute("data-theme", "dark");
  localStorage.setItem("theme", "dark");
};

// Apply light mode
export const setLightMode = () => {
  document.body.setAttribute("data-theme", "light");
  localStorage.setItem("theme", "light");
};

// Toggle between light and dark
export const toggleTheme = () => {
  const currentTheme = localStorage.getItem("theme") as Theme;
  if (currentTheme === "dark") {
    setLightMode();
    return "light";
  } else {
    setDarkMode();
    return "dark";
  }
};

// Initialize theme from localStorage or system preference
export const initTheme = (): Theme => {
  const saved = localStorage.getItem("theme") as Theme | null;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const themeToSet = saved || (prefersDark ? "dark" : "light");

  if (themeToSet === "dark") {
    setDarkMode();
  } else {
    setLightMode();
  }

  return themeToSet;
};
