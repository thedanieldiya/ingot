"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

const themeStorageKey = "ingot-theme";

const applyTheme = (theme: Theme) => {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
};

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const stored = window.localStorage.getItem(themeStorageKey) as Theme | null;
    const nextTheme = stored ?? "light";
    setTheme(nextTheme);
    applyTheme(nextTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    window.localStorage.setItem(themeStorageKey, nextTheme);
    applyTheme(nextTheme);
  };

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className="inline-flex h-8 items-center rounded-lg border border-gray-200 bg-gray-50 p-0.5 text-xs font-medium text-gray-600 transition dark:border-neutral-700 dark:bg-neutral-900 dark:text-gray-300"
    >
      <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 transition ${theme === "light" ? "bg-white text-gray-950 shadow-sm dark:bg-neutral-800 dark:text-gray-100" : ""}`}>
        <Sun className="h-3.5 w-3.5" aria-hidden="true" />
        Light
      </span>
      <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 transition ${theme === "dark" ? "bg-accent text-white shadow-sm dark:bg-purple-300 dark:text-neutral-950" : ""}`}>
        <Moon className="h-3.5 w-3.5" aria-hidden="true" />
        Dark
      </span>
    </button>
  );
}
