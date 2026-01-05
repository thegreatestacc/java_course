"use client";

import { JetBrains_Mono } from "next/font/google";
import { useAuth } from "../useAuth";
import { Header } from "../Header";
import { MotivationalQuotes } from "../MotivationalQuotes";
import { TaskBoard } from "../components/TaskBoard";
import { Footer } from "../components/Footer";
import Link from "next/link";

const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export default function TasksPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className={mono.className}>
        <div className="min-h-dvh bg-[var(--bg-main)] text-[var(--text-main)]">
          <Header />
          <div className="mx-auto max-w-6xl px-5 py-20">
            <p className="text-[var(--text-muted)]">Загрузка...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={mono.className}>
        <div className="min-h-dvh bg-[var(--bg-main)] text-[var(--text-main)]">
          <Header />
          <div className="mx-auto max-w-6xl px-5 py-20">
            <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)] p-6">
              <h1 className="text-xl font-semibold text-[var(--text-main)] mb-4">
                Доступ запрещен
              </h1>
              <p className="text-sm text-[var(--text-muted)] mb-4">
                Для доступа к доске задач необходимо войти в систему.
              </p>
              <Link
                href="/"
                className="inline-block rounded-xl bg-[var(--button-bg)] px-4 py-2 text-sm font-semibold text-[var(--button-text)] hover:bg-[var(--button-hover)] transition-colors"
              >
                Вернуться на главную
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={mono.className}>
      <div className="min-h-dvh bg-[var(--bg-main)] text-[var(--text-main)]">
        <Header />
        <MotivationalQuotes />
        <main className="mx-auto max-w-6xl px-5 py-20">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-semibold text-[var(--text-main)] mb-2">
                Доска задач
              </h1>
              <p className="text-sm text-[var(--text-muted)]">
                Управляйте своими задачами по изучению материалов
              </p>
            </div>

            <TaskBoard userId={user.id} />
          </div>
        </main>
        <Footer backLink={{ href: "/profile", text: "Вернуться в личный кабинет" }} />
      </div>
    </div>
  );
}

