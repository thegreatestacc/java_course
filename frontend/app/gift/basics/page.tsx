"use client";

// app/gift/basics/page.tsx
// Страница с подробной информацией об основах Git

import { JetBrains_Mono } from "next/font/google";
import { ThemeToggle } from "../../ThemeToggle";
import Link from "next/link";
import { usePathname } from "next/navigation";

const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export default function BasicsPage() {
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
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                >
                  <span>Главная</span>
                </Link>
                <Link
                  href="/gift"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                >
                  <span>Подарок</span>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3 px-2">
                Темы курса
              </h3>
              <div className="space-y-1">
                <Link
                  href="/gift"
                  className="block px-3 py-1.5 rounded-lg text-sm transition-colors text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                >
                  Обзор курса
                </Link>
                <Link
                  href="/gift/basics"
                  className="block px-3 py-1.5 rounded-lg text-sm transition-colors bg-[var(--bg-muted)] text-[var(--text-main)] font-medium"
                >
                  Основы Git
                </Link>
                <Link
                  href="/gift/branches"
                  className="block px-3 py-1.5 rounded-lg text-sm transition-colors text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                >
                  Работа с ветками
                </Link>
                <Link
                  href="/gift/remote"
                  className="block px-3 py-1.5 rounded-lg text-sm transition-colors text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                >
                  Удаленные репозитории
                </Link>
                <Link
                  href="/gift/advanced"
                  className="block px-3 py-1.5 rounded-lg text-sm transition-colors text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
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
          <section className="mx-auto max-w-6xl px-5 py-14 md:py-20">
            <DetailedLesson
              title="Основы Git"
              description="Начнем с самого начала: что такое Git, как его установить и настроить, и как делать первые коммиты."
              sections={[
                {
                  subtitle: "Что такое Git и зачем он нужен",
                  content: [
                    "Git — это распределенная система контроля версий, которая позволяет отслеживать изменения в коде.",
                    "Он сохраняет историю всех изменений, позволяет откатываться к предыдущим версиям и работать в команде.",
                    "Каждый коммит — это снимок состояния проекта в определенный момент времени."
                  ]
                },
                {
                  subtitle: "Установка и настройка",
                  content: [
                    "Установка Git:",
                    "• Windows: скачай с git-scm.com или используй winget install Git.Git",
                    "• macOS: brew install git",
                    "• Linux: sudo apt install git (Ubuntu/Debian) или sudo yum install git (CentOS/RHEL)",
                    "",
                    "Первоначальная настройка:",
                    "git config --global user.name \"Твое Имя\"",
                    "git config --global user.email \"твой@email.com\"",
                    "",
                    "Проверка настроек:",
                    "git config --list"
                  ]
                },
                {
                  subtitle: "Первые команды: init, add, commit",
                  content: [
                    "Создание репозитория:",
                    "git init — инициализирует новый репозиторий в текущей папке",
                    "",
                    "Добавление файлов в индекс (staging area):",
                    "git add file.txt — добавить конкретный файл",
                    "git add . — добавить все измененные файлы",
                    "git add *.java — добавить все Java файлы",
                    "",
                    "Создание коммита:",
                    "git commit -m \"Описание изменений\" — создать коммит с сообщением",
                    "git commit -am \"Сообщение\" — добавить все измененные файлы и закоммитить (только для уже отслеживаемых файлов)",
                    "",
                    "Просмотр статуса:",
                    "git status — показать какие файлы изменены, добавлены или удалены",
                    "git log — показать историю коммитов"
                  ]
                },
                {
                  subtitle: "Понятие репозитория и истории",
                  content: [
                    "Репозиторий — это папка с проектом, в которой Git отслеживает изменения.",
                    "История коммитов показывает все изменения в хронологическом порядке.",
                    "",
                    "Полезные команды для просмотра истории:",
                    "git log — полная история коммитов",
                    "git log --oneline — компактный вид истории",
                    "git log --graph --oneline --all — визуализация всех веток",
                    "git show HEAD — показать последний коммит",
                    "git diff — показать изменения в рабочей директории",
                    "git diff --staged — показать изменения в индексе"
                  ]
                }
              ]}
            />
          </section>
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
          href="/gift"
          className="rounded-xl border border-[var(--border-main)]
                     bg-[var(--bg-card)]
                     px-3 py-2 text-sm font-medium text-[var(--text-main)]
                     hover:bg-[var(--bg-muted)]"
        >
          ← Назад к курсу
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[var(--border-main)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-xs text-[var(--text-muted)] md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Java с нуля до Middle</p>
        <div className="flex gap-4">
          <Link className="hover:text-[var(--text-main)]" href="/gift">
            К курсу
          </Link>
          <Link className="hover:text-[var(--text-main)]" href="/">
            На главную
          </Link>
        </div>
      </div>
    </footer>
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

