"use client";

// app/learn/java-collections/page.tsx
// Страница с обучающим материалом по Java Collections

import { JetBrains_Mono } from "next/font/google";
import { Header } from "../../Header";
import { MotivationalQuotes } from "../../MotivationalQuotes";
import Link from "next/link";
import { usePathname } from "next/navigation";

const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export default function JavaCollectionsPage() {
  const pathname = usePathname();

  return (
    <div className={mono.className}>
      <div className="min-h-dvh bg-[var(--bg-main)] text-[var(--text-main)]">
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
              </div>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3 px-2">
                Темы материала
              </h3>
              <div className="space-y-1">
                <Link
                  href="/learn/java-collections"
                  className={`block px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                    pathname === "/learn/java-collections"
                      ? "bg-[var(--bg-muted)] text-[var(--text-main)] font-medium"
                      : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                  }`}
                >
                  <span className={`inline-block transition-opacity duration-200 ${
                    pathname === "/learn/java-collections" ? "opacity-100" : "opacity-70"
                  }`}>
                    Обзор материала
                  </span>
                </Link>
                <Link
                  href="/learn/java-collections/list"
                  className={`block px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                    pathname === "/learn/java-collections/list"
                      ? "bg-[var(--bg-muted)] text-[var(--text-main)] font-medium"
                      : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                  }`}
                >
                  <span className={`inline-block transition-opacity duration-200 ${
                    pathname === "/learn/java-collections/list" ? "opacity-100" : "opacity-70"
                  }`}>
                    List и его реализации
                  </span>
                </Link>
                <Link
                  href="/learn/java-collections/set"
                  className={`block px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                    pathname === "/learn/java-collections/set"
                      ? "bg-[var(--bg-muted)] text-[var(--text-main)] font-medium"
                      : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                  }`}
                >
                  <span className={`inline-block transition-opacity duration-200 ${
                    pathname === "/learn/java-collections/set" ? "opacity-100" : "opacity-70"
                  }`}>
                    Set и его реализации
                  </span>
                </Link>
                <Link
                  href="/learn/java-collections/map"
                  className={`block px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                    pathname === "/learn/java-collections/map"
                      ? "bg-[var(--bg-muted)] text-[var(--text-main)] font-medium"
                      : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                  }`}
                >
                  <span className={`inline-block transition-opacity duration-200 ${
                    pathname === "/learn/java-collections/map" ? "opacity-100" : "opacity-70"
                  }`}>
                    Map и его реализации
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <Header leftButton={{ href: "/learn", text: "← К темам" }} />
        <MotivationalQuotes />
        <main>
          <section className="mx-auto max-w-6xl px-5 py-14 md:py-20">
            <div className="space-y-6 mb-12">
              <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-main)] md:text-4xl">
                Java Collections
              </h1>
              <p className="text-base leading-relaxed text-[var(--text-muted)] max-w-3xl">
                Изучи коллекции в Java: List, Set, Map и их реализации. Научись эффективно работать со структурами данных.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)] p-6 shadow-sm">
              <h2 className="text-xl font-semibold tracking-tight text-[var(--text-main)] mb-6">
                Что ты изучишь
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <LessonCard
                  title="List и его реализации"
                  href="/learn/java-collections/list"
                  topics={[
                    "ArrayList и LinkedList",
                    "Когда использовать какую реализацию",
                    "Методы работы со списками",
                    "Итерация по элементам"
                  ]}
                />
                <LessonCard
                  title="Set и его реализации"
                  href="/learn/java-collections/set"
                  topics={[
                    "HashSet, LinkedHashSet, TreeSet",
                    "Уникальность элементов",
                    "Операции над множествами",
                    "Сравнение реализаций"
                  ]}
                />
                <LessonCard
                  title="Map и его реализации"
                  href="/learn/java-collections/map"
                  topics={[
                    "HashMap, LinkedHashMap, TreeMap",
                    "Работа с ключами и значениями",
                    "Итерация по Map",
                    "Выбор правильной реализации"
                  ]}
                />
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}

function LessonCard({ title, topics, href }: { title: string; topics: string[]; href: string }) {
  return (
    <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-secondary)] p-4">
      <p className="text-sm font-semibold text-[var(--text-main)] mb-3">{title}</p>
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
        Читать
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

