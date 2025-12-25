"use client";

import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Snowfall } from "./Snowfall";
import Link from "next/link";

interface HeaderProps {
  leftButton?: {
    href: string;
    text: string;
  };
}

export function Header({ leftButton }: HeaderProps) {
  const [isSnowActive, setIsSnowActive] = useState(false);

  // Загружаем состояние снега из localStorage при монтировании
  useEffect(() => {
    const savedSnowState = localStorage.getItem("snowActive");
    if (savedSnowState === "true") {
      setIsSnowActive(true);
    }
  }, []);

  // Сохраняем состояние снега в localStorage при изменении
  useEffect(() => {
    localStorage.setItem("snowActive", isSnowActive.toString());
  }, [isSnowActive]);

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--border-main)]/70 bg-[var(--bg-card)]/80 backdrop-blur w-full relative">
      <Snowfall isActive={isSnowActive} />
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3 relative z-10">
        {leftButton ? (
          <Link
            href={leftButton.href}
            className="rounded-xl border border-[var(--border-main)]
                       bg-[var(--bg-card)]
                       px-3 py-2 text-sm font-medium text-[var(--text-main)]
                       hover:bg-[var(--bg-muted)]"
          >
            {leftButton.text}
          </Link>
        ) : (
          <a
            href="#cta"
            className="rounded-xl border border-[var(--border-main)]
                       bg-[var(--bg-card)]
                       px-3 py-2 text-sm font-medium text-[var(--text-main)]
                       hover:bg-[var(--bg-muted)]"
          >
            Получить программу
          </a>
        )}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSnowActive(!isSnowActive)}
            className="rounded-xl border border-[var(--border-main)]
                       bg-[var(--bg-card)]
                       px-3 py-2 text-sm font-medium text-[var(--text-main)]
                       hover:bg-[var(--bg-muted)] transition-colors"
          >
            {isSnowActive ? "Выключить снег" : "Включить снег"}
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

