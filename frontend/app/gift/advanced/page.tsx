"use client";

// app/gift/advanced/page.tsx
// Страница с подробной информацией о продвинутых техниках Git

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

export default function AdvancedPage() {
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
                  className="block px-3 py-1.5 rounded-lg text-sm transition-all duration-200 text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                >
                  <span className="transition-opacity duration-200 opacity-70">Работа с ветками</span>
                </Link>
                <Link
                  href="/gift/remote"
                  className="block px-3 py-1.5 rounded-lg text-sm transition-all duration-200 text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                >
                  <span className="transition-opacity duration-200 opacity-70">Удаленные репозитории</span>
                </Link>
                <Link
                  href="/gift/advanced"
                  className="block px-3 py-1.5 rounded-lg text-sm transition-all duration-200 bg-[var(--bg-muted)] text-[var(--text-main)] font-medium"
                >
                  <span className="transition-opacity duration-200 opacity-100">Продвинутые техники</span>
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
              title="Продвинутые техники"
              description="Освой продвинутые возможности Git для эффективной работы."
              sections={[
                {
                  subtitle: "Откат изменений (reset, revert)",
                  content: [
                    "Откат последнего коммита (сохраняя изменения):",
                    "git reset --soft HEAD~1 — откатить коммит, оставить изменения в индексе",
                    "git reset --mixed HEAD~1 — откатить коммит, оставить изменения в рабочей директории",
                    "git reset HEAD~1 — то же самое, что --mixed",
                    "",
                    "Полное удаление последнего коммита:",
                    "git reset --hard HEAD~1 — ⚠️ ВНИМАНИЕ: удалит все изменения!",
                    "",
                    "Откат на несколько коммитов назад:",
                    "git reset --hard HEAD~3 — откатить последние 3 коммита",
                    "",
                    "Откат к конкретному коммиту:",
                    "git reset --hard commit-hash",
                    "",
                    "Безопасный откат (создает новый коммит):",
                    "git revert HEAD — создать новый коммит, отменяющий последний",
                    "git revert commit-hash — отменить конкретный коммит",
                    "",
                    "⚠️ Важно: reset изменяет историю, revert — безопасен для уже отправленных коммитов"
                  ]
                },
                {
                  subtitle: "Работа с тегами",
                  content: [
                    "Теги используются для пометки важных версий (релизов).",
                    "",
                    "Создание тега:",
                    "git tag v1.0.0 — создать легковесный тег",
                    "git tag -a v1.0.0 -m \"Версия 1.0.0\" — создать аннотированный тег (рекомендуется)",
                    "",
                    "Создание тега для конкретного коммита:",
                    "git tag -a v1.0.0 commit-hash -m \"Сообщение\"",
                    "",
                    "Просмотр тегов:",
                    "git tag — показать все теги",
                    "git show v1.0.0 — показать информацию о теге",
                    "",
                    "Отправка тегов на удаленный репозиторий:",
                    "git push origin v1.0.0 — отправить конкретный тег",
                    "git push --tags — отправить все теги",
                    "",
                    "Удаление тега:",
                    "git tag -d v1.0.0 — удалить локальный тег",
                    "git push origin --delete v1.0.0 — удалить удаленный тег",
                    "",
                    "Переключение на тег:",
                    "git checkout v1.0.0 — переключиться на тег (detached HEAD)"
                  ]
                },
                {
                  subtitle: "Stash для временного сохранения",
                  content: [
                    "Stash позволяет временно сохранить незакоммиченные изменения.",
                    "",
                    "Сохранение изменений:",
                    "git stash — сохранить изменения в stash",
                    "git stash save \"описание\" — сохранить с описанием",
                    "git stash push -m \"описание\" — современный вариант",
                    "",
                    "Просмотр списка stash:",
                    "git stash list — показать все сохраненные изменения",
                    "",
                    "Восстановление изменений:",
                    "git stash pop — применить последний stash и удалить его",
                    "git stash apply — применить stash, но не удалять",
                    "git stash apply stash@{0} — применить конкретный stash",
                    "",
                    "Удаление stash:",
                    "git stash drop stash@{0} — удалить конкретный stash",
                    "git stash clear — удалить все stash",
                    "",
                    "Полезные опции:",
                    "git stash --include-untracked — включить неотслеживаемые файлы",
                    "git stash show — показать изменения в последнем stash",
                    "git stash show -p — показать детальные изменения"
                  ]
                },
                {
                  subtitle: "Полезные команды и алиасы",
                  content: [
                    "Просмотр изменений:",
                    "git diff — изменения в рабочей директории",
                    "git diff --cached — изменения в индексе",
                    "git diff HEAD — все изменения относительно последнего коммита",
                    "",
                    "Поиск в истории:",
                    "git log --grep=\"текст\" — найти коммиты по сообщению",
                    "git log -S \"текст\" — найти коммиты, где изменился текст",
                    "git log --author=\"имя\" — коммиты конкретного автора",
                    "",
                    "Очистка:",
                    "git clean -n — показать что будет удалено (dry run)",
                    "git clean -f — удалить неотслеживаемые файлы",
                    "git clean -fd — удалить файлы и папки",
                    "",
                    "Создание алиасов (сокращений):",
                    "git config --global alias.st status",
                    "git config --global alias.co checkout",
                    "git config --global alias.br branch",
                    "git config --global alias.ci commit",
                    "",
                    "После этого можно использовать:",
                    "git st вместо git status",
                    "git co вместо git checkout",
                    "",
                    "Полезные алиасы:",
                    "git config --global alias.unstage 'reset HEAD --'",
                    "git config --global alias.last 'log -1 HEAD'",
                    "git config --global alias.visual '!gitk'"
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

