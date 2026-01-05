"use client";

import { JetBrains_Mono } from "next/font/google";
import { useAuth } from "../useAuth";
import { Header } from "../Header";
import { ActivityTracker } from "../ActivityTracker";
import { TestResults } from "../TestResults";
import { CompletedMaterials } from "../CompletedMaterials";
import { MotivationalQuotes } from "../MotivationalQuotes";
import Link from "next/link";
import { useMemo } from "react";
import { useCompletedMaterials } from "../hooks/useCompletedMaterials";
import { LEVEL_MATERIALS } from "../utils/levelMaterials";
import { StarRating } from "../components/StarRating";

const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export default function ProfilePage() {
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
                Для доступа к личному кабинету необходимо войти в систему.
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
        {/* Фиксированная навигация слева */}
        <nav className="fixed left-0 top-[20vh] w-56 h-[calc(100vh-20vh)] overflow-y-auto pl-8 pr-4 py-6 z-10">
          <div className="space-y-6">
            {/* Основная навигация */}
            <div>
              <h3 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3 px-2">
                Навигация
              </h3>
              <div className="space-y-1">
                <Link
                  href="/"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                >
                  <span className="transition-opacity duration-200 opacity-70 hover:opacity-100">Главная</span>
                </Link>
                <Link
                  href="/learn"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                >
                  <span className="transition-opacity duration-200 opacity-70 hover:opacity-100">Начать учиться</span>
                </Link>
                <Link
                  href="/compiler"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                >
                  <span className="transition-opacity duration-200 opacity-70 hover:opacity-100">Компилятор</span>
                </Link>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 bg-[var(--bg-muted)] text-[var(--text-main)] font-medium"
                >
                  <span className="transition-opacity duration-200 opacity-100">Личный кабинет</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <Header />
        <MotivationalQuotes />
        <main className="mx-auto max-w-6xl px-5 py-20">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-semibold text-[var(--text-main)] mb-2">
                Личный кабинет
              </h1>
              <p className="text-sm text-[var(--text-muted)]">
                Добро пожаловать, {user.name}!
              </p>
            </div>

            <UserInfoWithTopics userId={user.id} userName={user.name} userEmail={user.email} />

            <ActivityTracker userId={user.id} />

            <CompletedMaterials userId={user.id} />

            <TestResults userId={user.id} />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[var(--border-main)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-xs text-[var(--text-muted)] md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Java с нуля до Middle</p>
        <div className="flex gap-4">
          <Link className="hover:text-[var(--text-main)]" href="/">
            На главную
          </Link>
          <Link className="hover:text-[var(--text-main)]" href="/learn">
            Начать учиться
          </Link>
          <Link className="hover:text-[var(--text-main)]" href="/compiler">
            Компилятор
          </Link>
        </div>
      </div>
    </footer>
  );
}

function UserInfoWithTopics({ userId, userName, userEmail }: { userId: number; userName: string; userEmail: string }) {
  const { materials, loading } = useCompletedMaterials();

  const levelStats = useMemo(() => {
    const completedMaterialIds = new Set(materials.map(m => m.materialId));
    
    return Object.entries(LEVEL_MATERIALS).map(([level, materialIds]) => {
      const completed = materialIds.filter(id => completedMaterialIds.has(id));
      
      return {
        level,
        totalCount: materialIds.length,
        completedCount: completed.length,
      };
    });
  }, [materials]);

  // Вычисляем максимальную ширину названия темы
  const maxLevelNameWidth = useMemo(() => {
    if (levelStats.length === 0) return 0;
    const maxLength = Math.max(...levelStats.map(s => s.level.length));
    // Примерно 9-10px на символ для text-sm с учетом кириллицы
    return Math.max(280, maxLength * 10);
  }, [levelStats]);

  return (
    <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)] p-6">
      <h2 className="text-lg font-semibold text-[var(--text-main)] mb-4">
        Информация о пользователе
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] gap-6">
        {/* Левая часть - информация о пользователе */}
        <div className="space-y-3">
          <div>
            <p className="text-xs font-medium text-[var(--text-muted)] mb-1">
              Имя
            </p>
            <p className="text-sm text-[var(--text-main)]">{userName}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-[var(--text-muted)] mb-1">
              Email
            </p>
            <p className="text-sm text-[var(--text-main)]">{userEmail}</p>
          </div>
        </div>

        {/* Вертикальная линия */}
        <div className="hidden md:block w-px bg-[var(--border-main)]" />

        {/* Правая часть - темы с результатами */}
        <div className="space-y-4">
          {loading ? (
            <p className="text-sm text-[var(--text-muted)]">Загрузка...</p>
          ) : levelStats.length === 0 ? (
            <p className="text-sm text-[var(--text-muted)]">Нет данных о темах</p>
          ) : (
            <div className="space-y-4">
              {levelStats.map(({ level, totalCount, completedCount }) => {
                const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
                
                return (
                  <div key={level} className="grid grid-cols-[auto_auto_1fr] gap-x-3 items-center">
                    <h3 className="text-sm font-semibold text-[var(--text-main)] whitespace-nowrap" style={{ minWidth: `${maxLevelNameWidth}px` }}>
                      {level}
                    </h3>
                    {/* Звезды для всех тем */}
                    <StarRating progressPercentage={progressPercentage} className="flex-shrink-0" />
                    <span className="text-xs font-medium text-[var(--text-muted)] whitespace-nowrap justify-self-end">
                      {progressPercentage}%
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

