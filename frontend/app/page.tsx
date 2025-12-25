"use client";

// app/page.tsx
// Next.js (App Router) + TypeScript + TailwindCSS
// Шрифт: JetBrains Mono (похоже на IntelliJ IDEA)

import { JetBrains_Mono } from "next/font/google";
import { ThemeToggle } from "./ThemeToggle";
import { CodeExample } from "./CodeExample";
import { MotivationalQuotes } from "./MotivationalQuotes";
import { Header } from "./Header";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";


const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export default function Page() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const sections = ["about", "for-who", "what-you-get", "program", "faq", "cta"];

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  const homePageSections = [
    { label: "О курсе", href: "#about" },
    { label: "Для кого", href: "#for-who" },
    { label: "Что получишь", href: "#what-you-get" },
    { label: "Как устроено", href: "#program" },
    { label: "FAQ", href: "#faq" },
    { label: "Получить программу", href: "#cta" }
  ];

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
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 bg-[var(--bg-muted)] text-[var(--text-main)] font-medium"
                >
                  <span className="transition-opacity duration-200 opacity-100">Главная</span>
                </Link>
                <Link
                  href="/gift"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                >
                  <span className="transition-opacity duration-200 opacity-70 hover:opacity-100">Подарок</span>
                </Link>
              </div>
            </div>

            {/* Оглавление */}
            <div>
              <h3 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3 px-2">
                Оглавление
              </h3>
              <div className="space-y-1">
                {homePageSections.map((item) => {
                  const sectionId = item.href.substring(1);
                  const isActive = activeSection === sectionId;
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById(sectionId);
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth", block: "start" });
                        }
                      }}
                      className={`block px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                        isActive
                          ? "bg-[var(--bg-muted)] text-[var(--text-main)] font-medium"
                          : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                      }`}
                    >
                      <span className={`inline-block transition-all duration-200 ${
                        isActive ? "opacity-100" : "opacity-70"
                      }`}>
                        {item.label}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </nav>

        {/* Основной контент без изменений */}
        <Header />
        <MotivationalQuotes />
        <main>
          <Hero />
          <Proof />
          <ForWho />
          <WhatYouGet />
          <HowItWorks />
          <FAQ />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </div>
  );
}


function Hero() {
  return (
    <section id="top" className="mx-auto max-w-6xl px-5 py-14 md:py-20">
      <div className="grid gap-10 md:grid-cols-[1.1fr_1.5fr] md:items-center md:grid-cols-[1fr_630px]">
        <div className="space-y-6">
          <p className="text-xs font-medium tracking-wide text-[var(--text-muted)]">
            курс для тех, кто только знакомится с программированием
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-main)] md:text-4xl">
            Научишься писать на Java, понимать концепции языка и разработки.
          </h1>
          <p className="text-base leading-relaxed text-[var(--text-muted)]">
            Я — Java-разработчик в Yandex со стажем 5+ лет. Прошёл весь путь с нуля самостоятельно:
            набил множество шишек, сделал кучу ошибок и потратил много времени на поиск правильных решений.
            Обучение построено на максимально приближенных задачах к реальным, с которыми я работал на проектах.
            Также помогу грамотно составить резюме, что бы HR'ы не выкидывали его в мусорное ведро после прочтения первых строк, а приглашали тебя на собес.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#cta"
              className="inline-flex items-center justify-center rounded-xl bg-[var(--button-bg)] px-4 py-2.5 text-sm font-semibold text-[var(--button-text)] hover:bg-[var(--button-hover)]"
            >
              Хочу программу курса
            </a>
            <a
              href="/gift"
              className="inline-flex items-center justify-center rounded-xl border border-[var(--border-secondary)] px-4 py-2.5 text-sm font-semibold text-[var(--text-main)] hover:bg-[var(--bg-muted)]"
            >
              Подарок
            </a>
          </div>

          <div className="flex flex-wrap gap-2 pt-2 text-xs text-[var(--text-muted)]">
            <Pill>без воды</Pill>
            <Pill>много практики</Pill>
            <Pill>тестирование с первых шагов</Pill>
            <Pill>мышление разработчика</Pill>
          </div>
        </div>

        <CodeExample />
      </div>
      <div className="mx-auto max-w-6xl px-5 mt-10 flex justify-center">
        <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)] p-5 shadow-sm max-w-2xl w-full">
          <p className="text-sm font-semibold text-[var(--text-main)] mb-2">Этот курс поможет:</p>
          <ul className="text-sm leading-relaxed text-[var(--text-muted)] list-disc list-inside space-y-1 ml-4">
            <li>сократить время от начала обучения до трудоустройства.</li>
            <li>избежать тех ошибок, которые я встретил на своём пути.</li>
            <li>упростить процесс трудоустройства.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Proof() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 pb-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card
          title="С нуля — нормально"
          text="Курс рассчитан на новичков: объясняю терминологию, логику, и даю понятные упражнения."
        />
        <Card
          title="5+ лет коммерции"
          text="Опора на практику: как пишут код на проектах, как избегать типичных ошибок и хаоса."
        />
        <Card
          title="Тесты сразу"
          text="С первых этапов прививаем привычку проверять код и мыслить в терминах поведения."
        />
      </div>
    </section>
  );
}

function ForWho() {
  return (
    <section id="for-who" className="mx-auto max-w-6xl px-5 py-14" aria-label="Для кого">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight text-[var(--text-main)]">Для кого этот курс</h2>
          <p className="text-sm leading-relaxed text-[var(--text-muted)]">
            Для тех, кто только знакомится с программированием и хочет выстроить правильную базу,
            чтобы дальше уверенно идти в сторону Spring и коммерческой разработки.
          </p>
        </div>
        <div className="grid gap-3">
          <Bullet>Никогда не писал(а) код или пробовал(а) немного</Bullet>
          <Bullet>Хочешь понимать, а не копировать</Bullet>
          <Bullet>Нужна структура: что учить, в каком порядке и зачем</Bullet>
          <Bullet>Хочешь выйти на собеседования и понимать требования</Bullet>
        </div>
      </div>
    </section>
  );
}

function WhatYouGet() {
  return (
    <section id="what-you-get" className="mx-auto max-w-6xl px-5 pb-14" aria-label="Что будет на выходе">
      <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)] p-6 shadow-sm">
        <h2 className="text-xl font-semibold tracking-tight text-[var(--text-main)]">Что будет на выходе</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Result
            title="Уверенная база Java"
            text="Типы, коллекции, ООП, исключения, основы дизайна кода — без «пробелов» и догадок."
          />
          <Result
            title="Практические проекты"
            text="Мини-проекты и задачи как на работе: читаемые решения, рефакторинг, небольшая архитектура."
          />
          <Result
            title="Навык писать тесты"
            text="Понимание, что и как тестировать, чтобы не бояться менять код и видеть регрессии."
          />
          <Result
            title="Подготовка к собеседованиям"
            text="Разбор частых вопросов по базе Java, типичных задач и того, как отвечать уверенно."
          />
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="program" className="mx-auto max-w-6xl px-5 pb-14" aria-label="Как устроено">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight text-[var(--text-main)]">Как устроено обучение</h2>
          <p className="text-sm leading-relaxed text-[var(--text-muted)]">
            Минимум лишнего: теория → практика → проверка (тесты/разбор) → закрепление.
            Будем двигаться маленькими шагами, чтобы мозг успевал «укладывать» фундамент.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-[var(--text-muted)]">
            <Pill>короткие уроки</Pill>
            <Pill>чек-листы</Pill>
            <Pill>домашки</Pill>
            <Pill>примеры кода</Pill>
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-secondary)] p-5">
          <p className="text-sm font-semibold text-[var(--text-main)]">Пример логики этапов</p>
          <ol className="mt-3 space-y-3 text-sm text-[var(--text-muted)]">
            <Step
              title="Этап 1 — База и мышление"
              text="Переменные, типы, условия, циклы, функции, основы ООП + первые тесты."
            />
            <Step
              title="Этап 2 — Чистый код и структуры"
              text="Коллекции, интерфейсы, исключения, базовые паттерны, рефакторинг."
            />
            <Step
              title="Этап 3 — Прикладная практика"
              text="Мини-проекты, работа с файлами/данными, простая архитектура и привычки."
            />
            <Step
              title="Этап 4 — Подготовка к рынку"
              text="Алгоритмическая база (без фанатизма), вопросы по Java, «как рассказывать про опыт»."
            />
          </ol>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-6xl px-5 pb-14" aria-label="Вопросы">
      <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)] p-6 shadow-sm">
        <h2 className="text-xl font-semibold tracking-tight text-[var(--text-main)]">FAQ</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <QA
            q="Нужен ли опыт программирования?"
            a="Нет. Курс рассчитан на новичков. Всё объясняю с понятными примерами и упражнениями."
          />
          <QA
            q="Мы сразу используем Spring?"
            a="На старте фокус на Java и мышлении. Spring будет присутствовать в проектной среде, но глубоко вернёмся к нему позже — когда база будет готова."
          />
          <QA
            q="Почему тесты с самого начала?"
            a="Это привычка, которая отличает “просто писать код” от “разрабатывать”. Тесты помогают не ломать то, что уже работает."
          />
          <QA
            q="Какая цель?"
            a="Построить фундамент и практику так, чтобы потом уверенно идти к коммерческим проектам и собеседованиям."
          />
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="cta" className="mx-auto max-w-6xl px-5 pb-20" aria-label="CTA">
      <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-secondary)] p-6">
        <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold tracking-tight text-[var(--text-main)]">Хочешь программу и структуру этапов?</h2>
            <p className="text-sm leading-relaxed text-[var(--text-muted)]">
              Оставь контакт — пришлю структуру курса и пример первых заданий.
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
              Отправить
            </button>
            <p className="text-[11px] text-[var(--text-muted)]">
              Никакого спама. Только программа курса и обновления.
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
          <a className="hover:text-[var(--text-main)]" href="#top">Наверх</a>
          <a className="hover:text-[var(--text-main)]" href="#about">О курсе</a>
          <a className="hover:text-[var(--text-main)]" href="#cta">Программа</a>
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

function Card({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)] p-5 shadow-sm">
      <p className="text-sm font-semibold text-[var(--text-main)]">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{text}</p>
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)] p-4 shadow-sm">
      <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-[var(--button-bg)]" />
      <p className="text-sm leading-relaxed text-[var(--text-muted)]">{children}</p>
    </div>
  );
}

function Result({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-secondary)] p-4">
      <p className="text-sm font-semibold text-[var(--text-main)]">{title}</p>
      <p className="mt-1 text-sm leading-relaxed text-[var(--text-muted)]">{text}</p>
    </div>
  );
}

function Step({ title, text }: { title: string; text: string }) {
  return (
    <li className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)] p-4">
      <p className="text-sm font-semibold text-[var(--text-main)]">{title}</p>
      <p className="mt-1 text-sm leading-relaxed text-[var(--text-muted)]">{text}</p>
    </li>
  );
}

function QA({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-secondary)] p-4">
      <p className="text-sm font-semibold text-[var(--text-main)]">{q}</p>
      <p className="mt-1 text-sm leading-relaxed text-[var(--text-muted)]">{a}</p>
    </div>
  );
}
