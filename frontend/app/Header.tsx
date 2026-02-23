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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    setMobileMenuOpen(false);
  };

  const openRegister = () => {
    setAuthMode("register");
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-[var(--border-main)]/70 bg-[var(--bg-card)]/80 backdrop-blur w-full relative">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-3 md:gap-3 md:px-5 relative z-10 min-w-0">
          <div className="flex items-center gap-2 min-w-0 shrink">
            {leftButton ? (
              <Link
                href={leftButton.href}
                className="rounded-xl border border-[var(--border-main)]
                           bg-[var(--bg-card)]
                           px-2 py-2 text-xs md:px-3 md:text-sm font-medium text-[var(--text-main)]
                           hover:bg-[var(--bg-muted)] truncate"
              >
                {leftButton.text}
              </Link>
            ) : (
              <a
                href="#cta"
                className="rounded-xl border border-[var(--border-main)]
                           bg-[var(--bg-card)]
                           px-2 py-2 text-xs md:px-3 md:text-sm font-medium text-[var(--text-main)]
                           hover:bg-[var(--bg-muted)] truncate"
              >
                Получить программу
              </a>
            )}
          </div>

          {/* Desktop buttons */}
          <div className="hidden md:flex items-center gap-3">
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

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden shrink-0 rounded-xl border border-[var(--border-main)]
                       bg-[var(--bg-card)]
                       p-2 text-[var(--text-main)]
                       hover:bg-[var(--bg-muted)] transition-colors"
            aria-label="Меню"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 z-20 border-b border-[var(--border-main)] bg-[var(--bg-card)] shadow-lg">
            <div className="flex flex-col gap-2 px-5 py-4">
              {user ? (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-xl border border-[var(--border-main)]
                               bg-[var(--bg-card)]
                               px-3 py-2 text-sm font-medium text-[var(--text-main)]
                               hover:bg-[var(--bg-muted)] transition-colors text-center"
                  >
                    Личный кабинет
                  </Link>
                  {user.isAdmin && (
                    <Link
                      href="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="rounded-xl border border-[var(--border-main)]
                                 bg-[var(--bg-card)]
                                 px-3 py-2 text-sm font-medium text-[var(--text-main)]
                                 hover:bg-[var(--bg-muted)] transition-colors text-center"
                    >
                      Админка
                    </Link>
                  )}
                  <button
                    onClick={() => { setErrorReporterOpen(true); setMobileMenuOpen(false); }}
                    className="rounded-xl border border-[var(--border-main)]
                               bg-[var(--bg-card)]
                               px-3 py-2 text-sm font-medium text-[var(--text-main)]
                               hover:bg-[var(--bg-muted)] transition-colors"
                  >
                    Сообщить об ошибке
                  </button>
                  <UserMenu user={user} onLogout={handleLogout} />
                </>
              ) : (
                <>
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
                </>
              )}
              <button
                onClick={() => { setIsSnowActive(!isSnowActive); setMobileMenuOpen(false); }}
                className="rounded-xl border border-[var(--border-main)]
                           bg-[var(--bg-card)]
                           px-3 py-2 text-sm font-medium text-[var(--text-main)]
                           hover:bg-[var(--bg-muted)] transition-colors"
              >
                {isSnowActive ? "Выключить снег" : "Включить снег"}
              </button>
              <div className="flex justify-center">
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
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
