"use client";

// app/gift/remote/page.tsx
// Страница с подробной информацией об удаленных репозиториях

import { JetBrains_Mono } from "next/font/google";
import { Header } from "../../Header";
import { MotivationalQuotes } from "../../MotivationalQuotes";
import { DetailedLesson } from "../../DetailedLesson";
import Link from "next/link";
import { usePathname } from "next/navigation";

const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export default function RemotePage() {
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
                  href="/learn"
                  className="block px-3 py-1.5 rounded-lg text-sm transition-all duration-200 text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                >
                  <span className="transition-opacity duration-200 opacity-70">Обзор материала</span>
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
                  className="block px-3 py-1.5 rounded-lg text-sm transition-all duration-200 bg-[var(--bg-muted)] text-[var(--text-main)] font-medium"
                >
                  <span className="transition-opacity duration-200 opacity-100">Удаленные репозитории</span>
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
        <Header leftButton={{ href: "/gift", text: "← Назад к материалу" }} />
        <MotivationalQuotes />
        <main>
          <section className="mx-auto max-w-6xl px-5 py-14 md:py-20">
            <DetailedLesson
              materialId="gift/remote"
              title="Удаленные репозитории"
              description="Научись работать с GitHub, GitLab и другими платформами для совместной работы."
              sections={[
                {
                  subtitle: "Подключение к GitHub/GitLab",
                  content: [
                    "Создание репозитория на GitHub/GitLab:",
                    "1. Зарегистрируйся на github.com или gitlab.com",
                    "2. Создай новый репозиторий через веб-интерфейс",
                    "",
                    "Подключение существующего локального репозитория:",
                    "git remote add origin https://github.com/username/repo-name.git",
                    "",
                    "Или через SSH (рекомендуется):",
                    "git remote add origin git@github.com:username/repo-name.git",
                    "",
                    "Просмотр удаленных репозиториев:",
                    "git remote -v — показать все удаленные репозитории",
                    "git remote show origin — детальная информация об origin",
                    "",
                    "Изменение URL удаленного репозитория:",
                    "git remote set-url origin новый-url"
                  ]
                },
                {
                  subtitle: "Push и Pull операции",
                  content: [
                    "Отправка изменений на удаленный репозиторий (Push):",
                    "git push origin branch-name — отправить ветку на сервер",
                    "git push -u origin branch-name — отправить и установить upstream (при первом push)",
                    "git push — отправить текущую ветку (если upstream установлен)",
                    "git push --all — отправить все ветки",
                    "",
                    "Получение изменений с удаленного репозитория (Pull):",
                    "git pull origin branch-name — скачать и влить изменения",
                    "git pull — скачать и влить изменения из upstream ветки",
                    "",
                    "Только скачать без слияния:",
                    "git fetch origin — скачать изменения, но не вливать",
                    "git fetch — скачать все изменения со всех удаленных репозиториев",
                    "",
                    "После fetch можно посмотреть изменения:",
                    "git log origin/branch-name — посмотреть коммиты в удаленной ветке",
                    "git diff origin/branch-name — сравнить с удаленной веткой"
                  ]
                },
                {
                  subtitle: "Клонирование проектов",
                  content: [
                    "Клонирование репозитория:",
                    "git clone https://github.com/username/repo-name.git — клонировать через HTTPS",
                    "git clone git@github.com:username/repo-name.git — клонировать через SSH",
                    "",
                    "Клонирование в конкретную папку:",
                    "git clone url название-папки",
                    "",
                    "Клонирование только определенной ветки:",
                    "git clone -b branch-name url",
                    "",
                    "Клонирование с ограниченной историей (shallow clone):",
                    "git clone --depth 1 url — только последний коммит (экономит место)",
                    "",
                    "После клонирования:",
                    "cd repo-name — перейди в папку проекта",
                    "git branch -a — посмотри все ветки"
                  ]
                },
                {
                  subtitle: "Работа с удаленными ветками",
                  content: [
                    "Просмотр удаленных веток:",
                    "git branch -r — показать удаленные ветки",
                    "git branch -a — показать все ветки (локальные и удаленные)",
                    "",
                    "Создание локальной ветки из удаленной:",
                    "git checkout -b local-name origin/remote-name",
                    "git switch -c local-name origin/remote-name — современный вариант",
                    "",
                    "Автоматическое отслеживание удаленной ветки:",
                    "git checkout --track origin/branch-name",
                    "git switch --track origin/branch-name",
                    "",
                    "Удаление удаленной ветки:",
                    "git push origin --delete branch-name",
                    "",
                    "Синхронизация с удаленным репозиторием:",
                    "git fetch --prune — удалить ссылки на удаленные ветки, которых больше нет",
                    "",
                    "Обновление всех удаленных веток:",
                    "git fetch --all"
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
            К материалу
          </Link>
          <Link className="hover:text-[var(--text-main)]" href="/">
            На главную
          </Link>
        </div>
      </div>
    </footer>
  );
}

