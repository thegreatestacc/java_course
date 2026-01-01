"use client";

import { useEffect } from "react";

export function ThemeScript() {
  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme");
      const theme = saved || "dark";
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } catch (e) {
      // Ignore errors
    }
  }, []);

  return null;
}

