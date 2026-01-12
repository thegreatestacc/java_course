"use client";

// app/learn/java-core/page.tsx
// Страница с обучающим материалом по Java Core

import { JetBrains_Mono } from "next/font/google";
import { Header } from "../../Header";
import { MotivationalQuotes } from "../../MotivationalQuotes";
import { useAuth } from "../../useAuth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export default function JavaCorePage() {
  const pathname = usePathname();

  return (
    <div className={mono.className}>
      <div className="min-h-dvh bg-[var(--bg-main)] text-[var(--text-main)]">
        {/* Фиксированная навигация слева */}
        <nav className="fixed left-0 top-[20vh] w-56 h-[calc(100vh-20vh)] overflow-y-auto pl-8 pr-4 py-6 z-10">
          <div className="space-y-6">
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
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                >
                  <span className="transition-opacity duration-200 opacity-70 hover:opacity-100">Личный кабинет</span>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3 px-2">
                Темы материала
              </h3>
              <div className="space-y-1">
                <Link
                  href="/learn/java-core"
                  className={`block px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                    pathname === "/learn/java-core"
                      ? "bg-[var(--bg-muted)] text-[var(--text-main)] font-medium"
                      : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                  }`}
                >
                  <span className={`inline-block transition-opacity duration-200 ${
                    pathname === "/learn/java-core" ? "opacity-100" : "opacity-70"
                  }`}>
                    Обзор материала
                  </span>
                </Link>
                <Link
                  href="/learn/java-core/basics"
                  className={`block px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                    pathname === "/learn/java-core/basics"
                      ? "bg-[var(--bg-muted)] text-[var(--text-main)] font-medium"
                      : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                  }`}
                >
                  <span className={`inline-block transition-opacity duration-200 ${
                    pathname === "/learn/java-core/basics" ? "opacity-100" : "opacity-70"
                  }`}>
                    Основы Java
                  </span>
                </Link>
                <Link
                  href="/learn/java-core/variables"
                  className={`block px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                    pathname === "/learn/java-core/variables"
                      ? "bg-[var(--bg-muted)] text-[var(--text-main)] font-medium"
                      : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                  }`}
                >
                  <span className={`inline-block transition-opacity duration-200 ${
                    pathname === "/learn/java-core/variables" ? "opacity-100" : "opacity-70"
                  }`}>
                    Переменные и типы
                  </span>
                </Link>
                <Link
                  href="/learn/java-core/control-flow"
                  className={`block px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                    pathname === "/learn/java-core/control-flow"
                      ? "bg-[var(--bg-muted)] text-[var(--text-main)] font-medium"
                      : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                  }`}
                >
                  <span className={`inline-block transition-opacity duration-200 ${
                    pathname === "/learn/java-core/control-flow" ? "opacity-100" : "opacity-70"
                  }`}>
                    Условия и циклы
                  </span>
                </Link>
                <Link
                  href="/learn/java-core/exceptions"
                  className={`block px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                    pathname === "/learn/java-core/exceptions"
                      ? "bg-[var(--bg-muted)] text-[var(--text-main)] font-medium"
                      : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                  }`}
                >
                  <span className={`inline-block transition-opacity duration-200 ${
                    pathname === "/learn/java-core/exceptions" ? "opacity-100" : "opacity-70"
                  }`}>
                    Исключения
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <Header leftButton={{ href: "/learn/junior", text: "← К Junior Java Developer" }} />
        <MotivationalQuotes />
        <main>
          <section className="mx-auto max-w-6xl px-5 py-14 md:py-20">
            <div className="space-y-6 mb-12">
              <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-main)] md:text-4xl">
                Java Core
              </h1>
              <p className="text-base leading-relaxed text-[var(--text-muted)] max-w-3xl">
                Изучи основы языка Java: переменные, типы данных, операторы, условия, циклы, методы и основы объектно-ориентированного программирования.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)] p-6 shadow-sm">
              <h2 className="text-xl font-semibold tracking-tight text-[var(--text-main)] mb-6">
                Что ты изучишь
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <LessonCard
                  materialId="learn/java-core/basics"
                  title="Основы Java"
                  href="/learn/java-core/basics"
                  topics={[
                    "Что такое Java и зачем он нужен",
                    "Установка JDK и настройка окружения",
                    "Первый Hello World",
                    "Структура Java программы"
                  ]}
                />
                <LessonCard
                  materialId="learn/java-core/variables"
                  title="Переменные и типы"
                  href="/learn/java-core/variables"
                  topics={[
                    "Примитивные типы данных",
                    "Объявление и инициализация переменных",
                    "Строки и работа с ними",
                    "Преобразование типов"
                  ]}
                />
                <LessonCard
                  materialId="learn/java-core/control-flow"
                  title="Условия и циклы"
                  href="/learn/java-core/control-flow"
                  topics={[
                    "Условные операторы if/else",
                    "Циклы for, while, do-while",
                    "Оператор switch",
                    "Управление потоком выполнения"
                  ]}
                />
                <LessonCard
                  materialId="learn/java-core/exceptions"
                  title="Исключения"
                  href="/learn/java-core/exceptions"
                  topics={[
                    "Что такое исключения",
                    "Блок try-catch-finally",
                    "Типы исключений (checked/unchecked)",
                    "Создание собственных исключений"
                  ]}
                />
              </div>
            </div>
            
            {/* Блок тестирования */}
            <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)] p-6 shadow-sm mt-8">
              <h2 className="text-xl font-semibold tracking-tight text-[var(--text-main)] mb-4">
                Тестирование по пройденному материалу
              </h2>
              <p className="text-sm leading-relaxed text-[var(--text-muted)] mb-6">
                Проверь свои знания по пройденным темам материала. Доступны два типа тестирования: теоретическое (с вариантами ответов) и практическое (нужно вписать правильный ответ).
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/learn/java-core/quiz"
                  className="inline-flex items-center justify-center rounded-xl bg-[var(--button-bg)] px-6 py-3 text-sm font-semibold text-[var(--button-text)] hover:bg-[var(--button-hover)] transition-colors"
                >
                  Теоретическое тестирование
                </Link>
                <Link
                  href="/learn/java-core/quiz-practical"
                  className="inline-flex items-center justify-center rounded-xl border border-[var(--border-main)] bg-[var(--bg-card)] px-6 py-3 text-sm font-semibold text-[var(--text-main)] hover:bg-[var(--bg-muted)] transition-colors"
                >
                  Практическое тестирование
                </Link>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}

function LessonCard({ materialId, title, topics, href }: { materialId: string; title: string; topics: string[]; href: string }) {
  const { user } = useAuth();
  const [completed, setCompleted] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      if (!user) {
        setChecking(false);
        return;
      }

      try {
        const encodedMaterialId = encodeURIComponent(materialId);
        const response = await fetch(`/api/statistics/materials/status?materialId=${encodedMaterialId}`, {
          credentials: "include",
        });

        if (response.ok) {
          const isCompleted = await response.json();
          setCompleted(isCompleted);
        }
      } catch (err) {
        console.error("Ошибка проверки статуса:", err);
      } finally {
        setChecking(false);
      }
    };

    checkStatus();
    
    // Подписываемся на обновления через интервал
    const interval = setInterval(checkStatus, 3000);
    return () => clearInterval(interval);
  }, [user, materialId]);

  return (
    <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-secondary)] p-4 relative">
      {completed && (
        <div className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20">
          <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
      <p className="text-sm font-semibold text-[var(--text-main)] mb-3 pr-10">{title}</p>
      <ul className="space-y-2 text-sm text-[var(--text-muted)] mb-4">
        {topics.map((topic, index) => (
          <li key={index} className="flex gap-2 items-start">
            <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--button-bg)] mt-1.5" />
            <span>{topic}</span>
          </li>
        ))}
      </ul>
      <Link
        href={href}
        className="inline-flex items-center justify-center rounded-xl bg-[var(--button-bg)] px-4 py-2 text-xs font-semibold text-[var(--button-text)] hover:bg-[var(--button-hover)] transition-colors w-full"
      >
        Изучить
      </Link>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[var(--border-main)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-xs text-[var(--text-muted)] md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Java с нуля до Middle</p>
        <div className="flex gap-4">
          <Link className="hover:text-[var(--text-main)]" href="/learn">
            К темам
          </Link>
          <Link className="hover:text-[var(--text-main)]" href="/">
            На главную
          </Link>
        </div>
      </div>
    </footer>
  );
}

