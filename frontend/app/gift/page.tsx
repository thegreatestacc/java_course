"use client";

// app/gift/page.tsx
// Страница с бесплатным обучающим материалом по Git

import { JetBrains_Mono } from "next/font/google";
import { Header } from "../Header";
import { MotivationalQuotes } from "../MotivationalQuotes";
import { useAuth } from "../useAuth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export default function GiftPage() {
  const pathname = usePathname();

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
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                >
                  <span className="transition-opacity duration-200 opacity-70 hover:opacity-100">Личный кабинет</span>
                </Link>
              </div>
            </div>

            {/* Навигация по темам */}
            <div>
              <h3 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3 px-2">
                Темы материала
              </h3>
              <div className="space-y-1">
                <Link
                  href="/gift"
                  className={`block px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                    pathname === "/gift"
                      ? "bg-[var(--bg-muted)] text-[var(--text-main)] font-medium"
                      : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                  }`}
                >
                  <span className={`inline-block transition-opacity duration-200 ${
                    pathname === "/gift" ? "opacity-100" : "opacity-70"
                  }`}>
                    Обзор материала
                  </span>
                </Link>
                <Link
                  href="/gift/basics"
                  className={`block px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                    pathname === "/gift/basics"
                      ? "bg-[var(--bg-muted)] text-[var(--text-main)] font-medium"
                      : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                  }`}
                >
                  <span className={`inline-block transition-opacity duration-200 ${
                    pathname === "/gift/basics" ? "opacity-100" : "opacity-70"
                  }`}>
                    Основы Git
                  </span>
                </Link>
                <Link
                  href="/gift/branches"
                  className={`block px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                    pathname === "/gift/branches"
                      ? "bg-[var(--bg-muted)] text-[var(--text-main)] font-medium"
                      : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                  }`}
                >
                  <span className={`inline-block transition-opacity duration-200 ${
                    pathname === "/gift/branches" ? "opacity-100" : "opacity-70"
                  }`}>
                    Работа с ветками
                  </span>
                </Link>
                <Link
                  href="/gift/remote"
                  className={`block px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                    pathname === "/gift/remote"
                      ? "bg-[var(--bg-muted)] text-[var(--text-main)] font-medium"
                      : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                  }`}
                >
                  <span className={`inline-block transition-opacity duration-200 ${
                    pathname === "/gift/remote" ? "opacity-100" : "opacity-70"
                  }`}>
                    Удаленные репозитории
                  </span>
                </Link>
                <Link
                  href="/gift/advanced"
                  className={`block px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                    pathname === "/gift/advanced"
                      ? "bg-[var(--bg-muted)] text-[var(--text-main)] font-medium"
                      : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                  }`}
                >
                  <span className={`inline-block transition-opacity duration-200 ${
                    pathname === "/gift/advanced" ? "opacity-100" : "opacity-70"
                  }`}>
                    Продвинутые техники
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Основной контент без изменений */}
        <Header leftButton={{ href: "/", text: "На главную" }} />
        <MotivationalQuotes />
        <main>
          <Hero />
          <MaterialContent />
          <Benefits />
          <HowToGet />
        </main>
        <Footer />
      </div>
    </div>
  );
}


function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-14 md:py-20">
      <div className="space-y-6">
        <div className="inline-block rounded-full border border-[var(--border-main)] bg-[var(--bg-card)] px-3 py-1 text-xs font-medium text-[var(--text-muted)]">
          Бесплатный материал
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-main)] md:text-4xl">
          Бесплатный обучающий материал по работе с Git
        </h1>
        <p className="text-base leading-relaxed text-[var(--text-muted)] max-w-3xl">
          Git — это система контроля версий, которая используется практически в каждом проекте разработки.
          Этот материал поможет тебе освоить Git с нуля и научиться эффективно работать с версиями кода.
        </p>
        <div className="flex flex-wrap gap-2 pt-2 text-xs text-[var(--text-muted)]">
          <Pill>для начинающих</Pill>
          <Pill>практические примеры</Pill>
          <Pill>реальные сценарии</Pill>
          <Pill>бесплатно</Pill>
        </div>
      </div>
    </section>
  );
}

function MaterialContent() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-14">
      <div className="space-y-8">
        <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)] p-6 shadow-sm">
          <h2 className="text-xl font-semibold tracking-tight text-[var(--text-main)] mb-6">
            Что ты изучишь
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Lesson
              materialId="gift/basics"
              title="Основы Git"
              href="/gift/basics"
              topics={[
                "Что такое Git и зачем он нужен",
                "Установка и настройка",
                "Первые команды: init, add, commit",
                "Понятие репозитория и истории"
              ]}
            />
            <Lesson
              materialId="gift/branches"
              title="Работа с ветками"
              href="/gift/branches"
              topics={[
                "Создание и переключение веток",
                "Слияние изменений (merge)",
                "Разрешение конфликтов",
                "Стратегии работы с ветками"
              ]}
            />
            <Lesson
              materialId="gift/remote"
              title="Удаленные репозитории"
              href="/gift/remote"
              topics={[
                "Подключение к GitHub/GitLab",
                "Push и Pull операции",
                "Клонирование проектов",
                "Работа с удаленными ветками"
              ]}
            />
            <Lesson
              materialId="gift/advanced"
              title="Продвинутые техники"
              href="/gift/advanced"
              topics={[
                "Откат изменений (reset, revert)",
                "Работа с тегами",
                "Stash для временного сохранения",
                "Полезные команды и алиасы"
              ]}
            />
          </div>
        </div>
        
        {/* Блок тестирования */}
        <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)] p-6 shadow-sm">
          <h2 className="text-xl font-semibold tracking-tight text-[var(--text-main)] mb-4">
            Тестирование по пройденному материалу
          </h2>
          <p className="text-sm leading-relaxed text-[var(--text-muted)] mb-6">
            Проверь свои знания по пройденным темам материала. Доступны два типа тестирования: теоретическое (с вариантами ответов) и практическое (нужно вписать правильный ответ).
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/gift/quiz"
              className="inline-flex items-center justify-center rounded-xl bg-[var(--button-bg)] px-6 py-3 text-sm font-semibold text-[var(--button-text)] hover:bg-[var(--button-hover)] transition-colors"
            >
              Теоретическое тестирование
            </Link>
            <Link
              href="/gift/quiz-practical"
              className="inline-flex items-center justify-center rounded-xl border border-[var(--border-main)] bg-[var(--bg-card)] px-6 py-3 text-sm font-semibold text-[var(--text-main)] hover:bg-[var(--bg-muted)] transition-colors"
            >
              Практическое тестирование
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-14">
      <div className="grid gap-6 md:grid-cols-3">
        <BenefitCard
          title="Практика с первого урока"
          text="Каждая тема подкреплена практическими заданиями, которые можно выполнить прямо сейчас."
        />
        <BenefitCard
          title="Реальные сценарии"
          text="Разберем ситуации, с которыми ты столкнешься в реальной работе: конфликты, откаты, работа в команде."
        />
        <BenefitCard
          title="Готовность к работе"
          text="После изучения материала ты сможешь уверенно работать с Git в любом проекте."
        />
      </div>
    </section>
  );
}

function HowToGet() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-20">
      <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-secondary)] p-6">
        <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold tracking-tight text-[var(--text-main)]">
              Получить доступ к материалу
            </h2>
            <p className="text-sm leading-relaxed text-[var(--text-muted)]">
              Оставь свой email, и я пришлю тебе материалы и доступ к практическим заданиям.
            </p>
          </div>

          <form className="grid gap-3" action="#" method="post">
            <label className="grid gap-1">
              <span className="text-xs font-medium text-[var(--text-muted)]">Email</span>
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="h-11 rounded-xl border border-[var(--border-secondary)] bg-[var(--bg-card)] px-3 text-sm text-[var(--text-main)] outline-none focus:ring-2 focus:ring-[var(--border-secondary)]"
              />
            </label>
            <button
              type="submit"
              className="h-11 rounded-xl bg-[var(--button-bg)] text-sm font-semibold text-[var(--button-text)] hover:bg-[var(--button-hover)]"
            >
              Получить материал
            </button>
            <p className="text-[11px] text-[var(--text-muted)]">
              Никакого спама. Только материалы.
            </p>
          </form>
        </div>
      </div>
    </section>
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
        </div>
      </div>
    </footer>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-[var(--border-main)] bg-[var(--bg-card)] px-2.5 py-1 text-[var(--text-muted)]">
      {children}
    </span>
  );
}

function Lesson({ materialId, title, topics, href }: { materialId: string; title: string; topics: string[]; href: string }) {
  const { user } = useAuth();
  const [completed, setCompleted] = useState(false);
  const [checking, setChecking] = useState(true);
  const lastIndex = topics.length - 1;

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
    const interval = setInterval(checkStatus, 2000);
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
      <ul className="space-y-2 text-sm text-[var(--text-muted)]">
        {topics.map((topic, index) => (
          <li 
            key={index} 
            className={`flex gap-2 ${index === lastIndex ? 'items-baseline' : 'items-start'}`}
          >
            <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--button-bg)] mt-1.5" />
            <span className="flex-1">{topic}</span>
            {index === lastIndex && (
              <Link
                href={href}
                className="inline-flex items-baseline rounded-xl bg-[var(--button-bg)] px-4 py-2 text-xs font-semibold text-[var(--button-text)] hover:bg-[var(--button-hover)] transition-colors ml-auto shrink-0"
              >
                Читать
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function DetailedLesson({ 
  title, 
  description, 
  sections 
}: { 
  title: string; 
  description: string; 
  sections: Array<{ subtitle: string; content: string[] }> 
}) {
  return (
    <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)] p-6 shadow-sm">
      <h3 className="text-lg font-semibold tracking-tight text-[var(--text-main)] mb-2">
        {title}
      </h3>
      <p className="text-sm text-[var(--text-muted)] mb-6">
        {description}
      </p>
      <div className="space-y-6">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-3">
            <h4 className="text-sm font-semibold text-[var(--text-main)]">
              {section.subtitle}
            </h4>
            <div className="rounded-xl border border-[var(--border-main)] bg-[var(--bg-secondary)] p-4">
              <div className="space-y-2.5 text-sm text-[var(--text-muted)] leading-relaxed">
                {section.content.map((line, lineIndex) => {
                  if (line.trim() === "") {
                    return <div key={lineIndex} className="h-2" />;
                  }
                  // Команды Git и другие команды терминала
                  if (line.startsWith("git ") || line.startsWith("cd ") || line.startsWith("sudo ") || line.match(/^[a-z-]+\s+[a-z]/i)) {
                    return (
                      <div key={lineIndex} className="font-mono text-xs bg-[var(--bg-card)] border border-[var(--border-main)] rounded-lg px-3 py-2 text-[var(--text-main)]">
                        <span className="text-[var(--text-muted)]">$</span> {line}
                      </div>
                    );
                  }
                  // Заголовки разделов (например, "Установка Git:")
                  if (line.endsWith(":") && !line.includes("•") && line.length < 50) {
                    return (
                      <p key={lineIndex} className="font-semibold text-[var(--text-main)] mt-3 first:mt-0">
                        {line}
                      </p>
                    );
                  }
                  // Маркированные списки
                  if (line.startsWith("•")) {
                    return (
                      <div key={lineIndex} className="flex items-start gap-2 ml-2">
                        <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--button-bg)] mt-1.5" />
                        <span>{line.replace(/^•\s*/, "")}</span>
                      </div>
                    );
                  }
                  // Нумерованные списки
                  if (line.match(/^\d+\.\s/)) {
                    const match = line.match(/^(\d+)\.\s(.+)/);
                    return (
                      <div key={lineIndex} className="flex items-start gap-2 ml-2">
                        <span className="font-semibold text-[var(--text-main)] shrink-0">{match?.[1]}.</span>
                        <span>{match?.[2]}</span>
                      </div>
                    );
                  }
                  // Предупреждения
                  if (line.includes("⚠️") || line.includes("ВНИМАНИЕ")) {
                    return (
                      <p key={lineIndex} className="text-xs font-medium text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg px-3 py-2">
                        {line}
                      </p>
                    );
                  }
                  // Обычный текст
                  return <p key={lineIndex}>{line}</p>;
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BenefitCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)] p-5 shadow-sm">
      <p className="text-sm font-semibold text-[var(--text-main)]">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{text}</p>
    </div>
  );
}

