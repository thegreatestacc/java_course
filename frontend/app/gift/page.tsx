"use client";

// app/gift/page.tsx
// Страница с бесплатным курсом по Git

import { JetBrains_Mono } from "next/font/google";
import { ThemeToggle } from "../ThemeToggle";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                >
                  <span>Главная</span>
                </Link>
                <Link
                  href="/gift"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors bg-[var(--bg-muted)] text-[var(--text-main)] font-medium"
                >
                  <span>Подарок</span>
                </Link>
              </div>
            </div>

            {/* Навигация по темам */}
            <div>
              <h3 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3 px-2">
                Темы курса
              </h3>
              <div className="space-y-1">
                <Link
                  href="/gift"
                  className={`block px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    pathname === "/gift"
                      ? "bg-[var(--bg-muted)] text-[var(--text-main)] font-medium"
                      : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                  }`}
                >
                  Обзор курса
                </Link>
                <Link
                  href="/gift/basics"
                  className={`block px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    pathname === "/gift/basics"
                      ? "bg-[var(--bg-muted)] text-[var(--text-main)] font-medium"
                      : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                  }`}
                >
                  Основы Git
                </Link>
                <Link
                  href="/gift/branches"
                  className={`block px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    pathname === "/gift/branches"
                      ? "bg-[var(--bg-muted)] text-[var(--text-main)] font-medium"
                      : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                  }`}
                >
                  Работа с ветками
                </Link>
                <Link
                  href="/gift/remote"
                  className={`block px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    pathname === "/gift/remote"
                      ? "bg-[var(--bg-muted)] text-[var(--text-main)] font-medium"
                      : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                  }`}
                >
                  Удаленные репозитории
                </Link>
                <Link
                  href="/gift/advanced"
                  className={`block px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    pathname === "/gift/advanced"
                      ? "bg-[var(--bg-muted)] text-[var(--text-main)] font-medium"
                      : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                  }`}
                >
                  Продвинутые техники
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Основной контент без изменений */}
        <Header />
        <main>
          <Hero />
          <CourseContent />
          <Benefits />
          <HowToGet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--border-main)]/70 bg-[var(--bg-card)]/80 backdrop-blur w-full">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3">
        <Link
          href="/"
          className="rounded-xl border border-[var(--border-main)]
                     bg-[var(--bg-card)]
                     px-3 py-2 text-sm font-medium text-[var(--text-main)]
                     hover:bg-[var(--bg-muted)]"
        >
          На главную
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-14 md:py-20">
      <div className="space-y-6">
        <div className="inline-block rounded-full border border-[var(--border-main)] bg-[var(--bg-card)] px-3 py-1 text-xs font-medium text-[var(--text-muted)]">
          Бесплатный курс
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-main)] md:text-4xl">
          Бесплатный курс по работе с Git
        </h1>
        <p className="text-base leading-relaxed text-[var(--text-muted)] max-w-3xl">
          Git — это система контроля версий, которая используется практически в каждом проекте разработки.
          Этот курс поможет тебе освоить Git с нуля и научиться эффективно работать с версиями кода.
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

function CourseContent() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-14">
      <div className="space-y-8">
        <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)] p-6 shadow-sm">
          <h2 className="text-xl font-semibold tracking-tight text-[var(--text-main)] mb-6">
            Что ты изучишь
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Lesson
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
          text="После прохождения курса ты сможешь уверенно работать с Git в любом проекте."
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
              Получить доступ к курсу
            </h2>
            <p className="text-sm leading-relaxed text-[var(--text-muted)]">
              Оставь свой email, и я пришлю тебе материалы курса и доступ к практическим заданиям.
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
              Получить курс
            </button>
            <p className="text-[11px] text-[var(--text-muted)]">
              Никакого спама. Только материалы курса.
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

function Lesson({ title, topics, href }: { title: string; topics: string[]; href: string }) {
  return (
    <Link
      href={href}
      className="block rounded-2xl border border-[var(--border-main)] bg-[var(--bg-secondary)] p-4 hover:bg-[var(--bg-muted)] transition-colors cursor-pointer"
    >
      <p className="text-sm font-semibold text-[var(--text-main)] mb-3">{title}</p>
      <ul className="space-y-2 text-sm text-[var(--text-muted)]">
        {topics.map((topic, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--button-bg)] mt-1.5" />
            <span>{topic}</span>
          </li>
        ))}
      </ul>
    </Link>
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

