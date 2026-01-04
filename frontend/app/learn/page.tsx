"use client";

// app/learn/page.tsx
// Страница с обзором блоков обучения (Junior, Middle)

import { JetBrains_Mono } from "next/font/google";
import { Header } from "../Header";
import { MotivationalQuotes } from "../MotivationalQuotes";
import Link from "next/link";

const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

interface LevelBlock {
  id: string;
  title: string;
  description: string;
  href: string;
  topics: string[];
  skills: string[];
  color: string;
  comingSoon?: boolean;
}

const levelBlocks: LevelBlock[] = [
  {
    id: "junior",
    title: "Junior Java Developer",
    description: "Фундаментальные знания для начала карьеры Java-разработчика. Изучи основы языка, работу с данными и объектно-ориентированное программирование.",
    href: "/learn/junior",
    color: "from-blue-500 to-cyan-500",
    topics: [
      "Git — система контроля версий",
      "Java Core — основы языка (переменные, типы, условия, циклы)",
      "Java Collections — работа с данными (List, Set, Map)",
      "Java OOP — объектно-ориентированное программирование"
    ],
    skills: [
      "Писать простые программы на Java",
      "Работать с Git и системой контроля версий",
      "Использовать коллекции для хранения данных",
      "Применять принципы ООП в коде",
      "Понимать структуру Java-приложений"
    ]
  },
  {
    id: "middle",
    title: "Middle Java Developer",
    description: "Углубленное изучение Java и переход к профессиональной разработке. Изучи продвинутые темы, фреймворки и инструменты для создания реальных приложений.",
    href: "/learn/middle",
    color: "from-purple-500 to-pink-500",
    comingSoon: true,
    topics: [
      "Продвинутые темы Java Core (Streams, Lambda, Optional)",
      "Spring Framework — создание веб-приложений",
      "Работа с базами данных (JDBC, JPA, Hibernate)",
      "Тестирование (JUnit, Mockito)",
      "Многопоточность и асинхронность",
      "Архитектура приложений и паттерны проектирования"
    ],
    skills: [
      "Создавать REST API с помощью Spring",
      "Работать с базами данных через JPA",
      "Писать unit и integration тесты",
      "Применять паттерны проектирования",
      "Оптимизировать производительность приложений",
      "Работать в команде над реальными проектами"
    ]
  },
  {
    id: "clean-architecture",
    title: "Чистая архитектура сервисов",
    description: "Изучи принципы SOLID, KISS, DRY и другие подходы к проектированию чистого, поддерживаемого и масштабируемого кода. Научись создавать архитектуру, которая легко тестируется и расширяется.",
    href: "/learn/clean-architecture",
    color: "from-green-500 to-emerald-500",
    topics: [
      "Принципы SOLID — основа чистого кода",
      "KISS (Keep It Simple, Stupid) — простота решений",
      "DRY (Don't Repeat Yourself) — избегание дублирования",
      "YAGNI (You Aren't Gonna Need It) — не добавляй лишнего",
      "Слои архитектуры сервисов (Domain, Application, Infrastructure, Presentation)",
      "Практическое применение принципов в реальных проектах"
    ],
    skills: [
      "Применять принципы SOLID в проектировании",
      "Создавать чистую и поддерживаемую архитектуру",
      "Проектировать масштабируемые сервисы",
      "Писать тестируемый код",
      "Избегать типичных архитектурных ошибок",
      "Рефакторить код с применением принципов чистой архитектуры"
    ]
  }
];

export default function LearnPage() {
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
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 bg-[var(--bg-muted)] text-[var(--text-main)] font-medium"
                >
                  <span className="transition-opacity duration-200 opacity-100">Начать учиться</span>
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
          </div>
        </nav>

        <Header leftButton={{ href: "/", text: "На главную" }} />
        <MotivationalQuotes />
        <main>
          <section className="mx-auto max-w-6xl px-5 py-14 md:py-20">
            <div className="space-y-6 mb-12">
              <div className="space-y-4 max-w-4xl">
                <p className="text-base leading-relaxed text-[var(--text-muted)]">
                  Материалы разделены по уровням сложности и выстроены в строгой последовательности. Каждый уровень строится на знаниях предыдущего, поэтому важно изучать их по порядку.
                </p>
                <div className="space-y-3">
                  <p className="text-base leading-relaxed text-[var(--text-muted)]">
                    <strong className="text-[var(--text-main)]">Junior Java Developer</strong> — это фундамент всей твоей карьеры. Здесь ты изучишь основы языка Java, работу с данными через коллекции, принципы объектно-ориентированного программирования и систему контроля версий Git. Без этих знаний невозможно двигаться дальше: все темы в Middle опираются на понимание базовых концепций.
                  </p>
                  <p className="text-base leading-relaxed text-[var(--text-muted)]">
                    <strong className="text-[var(--text-main)]">Middle Java Developer</strong> — это углубленное изучение Java и переход к профессиональной разработке. Здесь ты освоишь продвинутые возможности языка, фреймворки (Spring), работу с базами данных, тестирование и архитектурные паттерны. Но все это будет понятно только после того, как ты уверенно владеешь основами из Junior.
                  </p>
                  <p className="text-base leading-relaxed text-[var(--text-muted)]">
                    <strong className="text-[var(--text-main)]">Чистая архитектура сервисов</strong> — это раздел, который можно изучать параллельно с Middle или после него. Здесь ты изучишь принципы SOLID, KISS, DRY, YAGNI и другие подходы к проектированию чистого, поддерживаемого кода. Эти знания помогут тебе создавать масштабируемые и тестируемые сервисы.
                  </p>
                </div>
                <p className="text-base leading-relaxed text-[var(--text-muted)]">
                  <strong className="text-[var(--text-main)]">Почему важен строгий порядок?</strong> Темы из Junior могут повторяться в Middle, но на более глубоком уровне. Например, в Junior ты изучишь основы ООП, а в Middle — продвинутые паттерны проектирования, которые используют эти основы. Пропуск базовых тем приведет к непониманию более сложных концепций и необходимости возвращаться назад, что замедлит обучение.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              {levelBlocks.map((block) => (
                <LevelCard key={block.id} block={block} />
              ))}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}

interface LevelCardProps {
  block: LevelBlock;
}

function LevelCard({ block }: LevelCardProps) {
  return (
    <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)] p-8 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-6 mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-main)]">
              {block.title}
            </h2>
            {block.comingSoon && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[var(--bg-muted)] text-[var(--text-muted)]">
                Скоро
              </span>
            )}
          </div>
          <p className="text-base leading-relaxed text-[var(--text-muted)]">
            {block.description}
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        {/* Темы для изучения */}
        <div>
          <h3 className="text-sm font-semibold text-[var(--text-main)] mb-3">
            Темы для изучения:
          </h3>
          <ul className="space-y-2">
            {block.topics.map((topic, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--button-bg)] mt-1.5" />
                <span>{topic}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Навыки после освоения */}
        <div>
          <h3 className="text-sm font-semibold text-[var(--text-main)] mb-3">
            После освоения сможешь:
          </h3>
          <ul className="space-y-2">
            {block.skills.map((skill, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--button-bg)] mt-1.5" />
                <span>{skill}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Кнопка перехода */}
      <div className="pt-4 border-t border-[var(--border-main)]">
        {block.comingSoon ? (
          <button
            disabled
            className="inline-flex items-center justify-center rounded-xl bg-[var(--bg-muted)] px-6 py-3 text-sm font-semibold text-[var(--text-muted)] cursor-not-allowed w-full"
          >
            Скоро будет доступно
          </button>
        ) : (
          <Link
            href={block.href}
            className="inline-flex items-center justify-center rounded-xl bg-[var(--button-bg)] px-6 py-3 text-sm font-semibold text-[var(--button-text)] hover:bg-[var(--button-hover)] transition-colors w-full"
          >
            Перейти к материалам
          </Link>
        )}
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
        </div>
      </div>
    </footer>
  );
}
