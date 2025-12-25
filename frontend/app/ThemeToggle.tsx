"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    const initial = saved ?? "light";

    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
  }

  return (
    <button
      onClick={toggleTheme}
      className="
        flex items-center gap-2 rounded-xl
        border border-[var(--border-main)]
        bg-[var(--bg-card)]
        px-3 py-2 text-sm
        hover:bg-[var(--bg-muted)]
        transition
      "
      aria-label="Toggle theme"
    >
      <span className="text-xs">
        {theme === "light" ? "☀️ Light" : "🌙 Dark"}
      </span>
    </button>
  );
}
