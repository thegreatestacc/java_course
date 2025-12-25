"use client";

// app/gift/branches/page.tsx
// Страница с подробной информацией о работе с ветками

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

export default function BranchesPage() {
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
                  href="/gift"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                >
                  <span className="transition-opacity duration-200 opacity-70 hover:opacity-100">Подарок</span>
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
                  className="block px-3 py-1.5 rounded-lg text-sm transition-all duration-200 text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                >
                  <span className="transition-opacity duration-200 opacity-70">Обзор курса</span>
                </Link>
                <Link
                  href="/gift/basics"
                  className="block px-3 py-1.5 rounded-lg text-sm transition-all duration-200 text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                >
                  <span className="transition-opacity duration-200 opacity-70">Основы Git</span>
                </Link>
                <Link
                  href="/gift/branches"
                  className="block px-3 py-1.5 rounded-lg text-sm transition-all duration-200 bg-[var(--bg-muted)] text-[var(--text-main)] font-medium"
                >
                  <span className="transition-opacity duration-200 opacity-100">Работа с ветками</span>
                </Link>
                <Link
                  href="/gift/remote"
                  className="block px-3 py-1.5 rounded-lg text-sm transition-all duration-200 text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                >
                  <span className="transition-opacity duration-200 opacity-70">Удаленные репозитории</span>
                </Link>
                <Link
                  href="/gift/advanced"
                  className="block px-3 py-1.5 rounded-lg text-sm transition-all duration-200 text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                >
                  <span className="transition-opacity duration-200 opacity-70">Продвинутые техники</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Основной контент без изменений */}
        <Header leftButton={{ href: "/gift", text: "← Назад к курсу" }} />
        <MotivationalQuotes />
        <main>
          <section className="mx-auto max-w-6xl px-5 py-14 md:py-20">
            <DetailedLesson
              title="Работа с ветками"
              description="Ветки позволяют работать над разными задачами параллельно, не мешая друг другу."
              sections={[
                {
                  subtitle: "Создание и переключение веток",
                  content: [
                    "Создание новой ветки:",
                    "git branch feature-name — создать новую ветку",
                    "git checkout -b feature-name — создать и сразу переключиться на ветку",
                    "git switch -c feature-name — современная альтернатива (Git 2.23+)",
                    "",
                    "Переключение между ветками:",
                    "git checkout branch-name — переключиться на ветку",
                    "git switch branch-name — современная альтернатива",
                    "",
                    "Просмотр веток:",
                    "git branch — показать все локальные ветки",
                    "git branch -a — показать все ветки (включая удаленные)",
                    "git branch -v — показать ветки с последним коммитом"
                  ]
                },
                {
                  subtitle: "Слияние изменений (merge)",
                  content: [
                    "Слияние веток — это объединение изменений из одной ветки в другую.",
                    "",
                    "Процесс слияния:",
                    "1. Переключись на ветку, в которую хочешь влить изменения (обычно main/master):",
                    "   git checkout main",
                    "",
                    "2. Выполни слияние:",
                    "   git merge feature-name",
                    "",
                    "3. Если конфликтов нет, Git создаст merge commit автоматически.",
                    "",
                    "Типы слияния:",
                    "• Fast-forward merge — когда нет новых коммитов в основной ветке",
                    "• Merge commit — создается новый коммит, объединяющий две ветки",
                    "",
                    "Отмена слияния (если еще не закоммитил):",
                    "git merge --abort"
                  ]
                },
                {
                  subtitle: "Разрешение конфликтов",
                  content: [
                    "Конфликты возникают, когда Git не может автоматически объединить изменения.",
                    "",
                    "Как разрешить конфликт:",
                    "1. Git покажет файлы с конфликтами в git status",
                    "",
                    "2. Открой файл с конфликтом. Ты увидишь маркеры:",
                    "   <<<<<<< HEAD",
                    "   код из текущей ветки",
                    "   =======",
                    "   код из вливаемой ветки",
                    "   >>>>>>> feature-name",
                    "",
                    "3. Выбери нужный код или объедини оба варианта, удалив маркеры",
                    "",
                    "4. После разрешения всех конфликтов:",
                    "   git add . — добавить разрешенные файлы",
                    "   git commit — завершить слияние",
                    "",
                    "Полезные команды:",
                    "git diff — показать конфликты",
                    "git status — показать файлы с конфликтами"
                  ]
                },
                {
                  subtitle: "Стратегии работы с ветками",
                  content: [
                    "Git Flow — популярная стратегия:",
                    "• main/master — стабильная версия для продакшена",
                    "• develop — ветка разработки",
                    "• feature/название — новые функции",
                    "• hotfix/название — срочные исправления",
                    "",
                    "GitHub Flow (проще):",
                    "• main — основная ветка",
                    "• feature/название — каждая задача в отдельной ветке",
                    "• После завершения — Pull Request и merge в main",
                    "",
                    "Удаление веток:",
                    "git branch -d branch-name — удалить ветку (безопасно, только если изменения влиты)",
                    "git branch -D branch-name — принудительное удаление",
                    "",
                    "Переименование ветки:",
                    "git branch -m old-name new-name"
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

