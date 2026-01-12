"use client";

import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { UserMenu } from "./UserMenu";
import { AuthModal } from "./AuthModal";
import { ErrorReporter } from "./components/ErrorReporter";
import { useAuth } from "./useAuth";
import { useSnow } from "./SnowProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderProps {
  leftButton?: {
    href: string;
    text: string;
  };
}

export function Header({ leftButton }: HeaderProps) {
  const { isSnowActive, setIsSnowActive } = useSnow();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [errorReporterOpen, setErrorReporterOpen] = useState(false);
  const { user, setUser, logout } = useAuth();
  const pathname = usePathname();

  const handleAuthSuccess = (userData: { id: number; email: string; name: string; isAdmin?: boolean; isBlocked?: boolean; tooltipsEnabled?: boolean }) => {
    setUser(userData);
  };

  const handleLogout = async () => {
    await logout();
  };

  const openLogin = () => {
    setAuthMode("login");
    setAuthModalOpen(true);
  };

  const openRegister = () => {
    setAuthMode("register");
    setAuthModalOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-[var(--border-main)]/70 bg-[var(--bg-card)]/80 backdrop-blur w-full relative">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3 relative z-10">
          <div className="flex items-center gap-3">
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
          </div>
          <div className="flex items-center gap-3">
            {user ? (
              <>
                {user.isAdmin && (
                  <Link
                    href="/admin"
                    className="rounded-xl border border-[var(--border-main)]
                               bg-[var(--bg-card)]
                               px-3 py-2 text-sm font-medium text-[var(--text-main)]
                               hover:bg-[var(--bg-muted)] transition-colors"
                  >
                    Админка
                  </Link>
                )}
                <Link
                  href="/profile"
                  className="rounded-xl border border-[var(--border-main)]
                             bg-[var(--bg-card)]
                             px-3 py-2 text-sm font-medium text-[var(--text-main)]
                             hover:bg-[var(--bg-muted)] transition-colors"
                >
                  Личный кабинет
                </Link>
                <UserMenu user={user} onLogout={handleLogout} />
              </>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={openLogin}
                  className="rounded-xl border border-[var(--border-main)]
                             bg-[var(--bg-card)]
                             px-3 py-2 text-sm font-medium text-[var(--text-main)]
                             hover:bg-[var(--bg-muted)] transition-colors"
                >
                  Войти
                </button>
                <button
                  onClick={openRegister}
                  className="rounded-xl bg-[var(--button-bg)]
                             px-3 py-2 text-sm font-semibold text-[var(--button-text)]
                             hover:bg-[var(--button-hover)] transition-colors"
                >
                  Регистрация
                </button>
              </div>
            )}
            <button
              onClick={() => setIsSnowActive(!isSnowActive)}
              className="rounded-xl border border-[var(--border-main)]
                         bg-[var(--bg-card)]
                         px-3 py-2 text-sm font-medium text-[var(--text-main)]
                         hover:bg-[var(--bg-muted)] transition-colors"
            >
              {isSnowActive ? "Выключить снег" : "Включить снег"}
            </button>
            {user && (
              <button
                onClick={() => setErrorReporterOpen(true)}
                className="rounded-xl border border-[var(--border-main)]
                           bg-[var(--bg-card)]
                           px-3 py-2 text-sm font-medium text-[var(--text-main)]
                           hover:bg-[var(--bg-muted)] transition-colors"
                title="Сообщить об ошибке"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </button>
            )}
            <ThemeToggle />
          </div>
        </div>
      </header>
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        mode={authMode}
      />
      <ErrorReporter
        isOpen={errorReporterOpen}
        onClose={() => setErrorReporterOpen(false)}
        initialErrorMessage={null}
      />
    </>
  );
}

