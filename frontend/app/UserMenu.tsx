"use client";

import { useState, useEffect } from "react";

interface User {
  id: number;
  email: string;
  name: string;
}

interface UserMenuProps {
  user: User | null;
  onLogout: () => void;
}

export function UserMenu({ user, onLogout }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      onLogout();
    } catch (err) {
      console.error("Ошибка при выходе:", err);
      onLogout(); // Выходим локально даже при ошибке
    }
    setIsOpen(false);
  };

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-xl border border-[var(--border-main)] bg-[var(--bg-card)] px-3 py-2 text-sm font-medium text-[var(--text-main)] hover:bg-[var(--bg-muted)] transition-colors"
      >
        <span>{user.name}</span>
        <svg
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 z-20 w-48 rounded-xl border border-[var(--border-main)] bg-[var(--bg-card)] shadow-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-[var(--border-main)]">
              <p className="text-sm font-medium text-[var(--text-main)]">{user.name}</p>
              <p className="text-xs text-[var(--text-muted)] mt-1">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-[var(--text-main)] hover:bg-[var(--bg-muted)] transition-colors"
            >
              Выйти
            </button>
          </div>
        </>
      )}
    </div>
  );
}



