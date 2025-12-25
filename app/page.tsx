// app/page.tsx
// Next.js (App Router) + TypeScript + TailwindCSS
// Шрифт: JetBrains Mono (похоже на IntelliJ IDEA)

import { JetBrains_Mono } from "next/font/google";
import { ThemeToggle } from "./ThemeToggle";


const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export default function Page() {
  return (
    <div className={mono.className}>
      <div className="min-h-dvh bg-[var(--bg-main)] text-neutral-900">
        <Header />
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

function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-neutral-200/70 bg-[var(--bg-card)]/80 backdrop-blur">
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <a
          href="#cta"
          className="rounded-xl border border-[var(--border-main)]
                     bg-[var(--bg-card)]
                     px-3 py-2 text-sm font-medium
                     hover:bg-[var(--bg-muted)]"
        >
          Получить программу
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="mx-auto max-w-5xl px-5 py-14 md:py-20">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div className="space-y-6">
          <p className="text-xs font-medium tracking-wide text-neutral-600">
            курс для тех, кто только знакомится с программированием
          </p>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Научишься писать на Java, понимать основы и соберёшь базу для роста до Middle.
          </h1>
          <p className="text-base leading-relaxed text-neutral-700">
            Я — Java-разработчик со стажем 5+ лет. Объясняю без «магии»: как работает код,
            почему он работает именно так, и как мыслит разработчик на реальных задачах.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#cta"
              className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800"
            >
              Хочу программу курса
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center rounded-xl border border-neutral-300 px-4 py-2.5 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
            >
              Что внутри
            </a>
          </div>

          <div className="flex flex-wrap gap-2 pt-2 text-xs text-neutral-600">
            <Pill>без воды</Pill>
            <Pill>много практики</Pill>
            <Pill>тестирование с первых шагов</Pill>
            <Pill>мышление разработчика</Pill>
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 shadow-sm">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-600">Пример того, как будем учиться</span>
              <span className="text-[11px] text-neutral-500">IDE-style</span>
            </div>
            <pre className="overflow-x-auto rounded-xl border border-neutral-200 bg-[var(--bg-card)] p-4 text-[12px] leading-relaxed">
{`// маленькие шаги → понятные результаты
class Main {
  public static void main(String[] args) {
    var user = new User("Анна");
    System.out.println(user.greet());
  }
}

record User(String name) {
  String greet() { return "Привет, " + name; }
}`}
            </pre>
            <p className="text-xs leading-relaxed text-neutral-600">
              Сначала — фундамент: типы, условия, циклы, функции, ООП. Затем — практика,
              архитектурные привычки и «как думать», чтобы расти.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Proof() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-5 pb-6">
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
    <section className="mx-auto max-w-5xl px-5 py-14" aria-label="Для кого">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight">Для кого этот курс</h2>
          <p className="text-sm leading-relaxed text-neutral-700">
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
    <section className="mx-auto max-w-5xl px-5 pb-14" aria-label="Что будет на выходе">
      <div className="rounded-2xl border border-neutral-200 bg-[var(--bg-card)] p-6 shadow-sm">
        <h2 className="text-xl font-semibold tracking-tight">Что будет на выходе</h2>
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
    <section id="program" className="mx-auto max-w-5xl px-5 pb-14" aria-label="Как устроено">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight">Как устроено обучение</h2>
          <p className="text-sm leading-relaxed text-neutral-700">
            Минимум лишнего: теория → практика → проверка (тесты/разбор) → закрепление.
            Будем двигаться маленькими шагами, чтобы мозг успевал «укладывать» фундамент.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-neutral-600">
            <Pill>короткие уроки</Pill>
            <Pill>чек-листы</Pill>
            <Pill>домашки</Pill>
            <Pill>примеры кода</Pill>
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
          <p className="text-sm font-semibold text-neutral-900">Пример логики этапов</p>
          <ol className="mt-3 space-y-3 text-sm text-neutral-700">
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
    <section id="faq" className="mx-auto max-w-5xl px-5 pb-14" aria-label="Вопросы">
      <div className="rounded-2xl border border-neutral-200 bg-[var(--bg-card)] p-6 shadow-sm">
        <h2 className="text-xl font-semibold tracking-tight">FAQ</h2>
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
    <section id="cta" className="mx-auto max-w-5xl px-5 pb-20" aria-label="CTA">
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
        <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold tracking-tight">Хочешь программу и структуру этапов?</h2>
            <p className="text-sm leading-relaxed text-neutral-700">
              Оставь контакт — пришлю структуру курса и пример первых заданий.
            </p>
          </div>

          <form className="grid gap-3" action="#" method="post">
            <label className="grid gap-1">
              <span className="text-xs font-medium text-neutral-700">Email</span>
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="h-11 rounded-xl border border-neutral-300 bg-[var(--bg-card)] px-3 text-sm outline-none focus:ring-2 focus:ring-neutral-300"
              />
            </label>
            <button
              type="submit"
              className="h-11 rounded-xl bg-neutral-900 text-sm font-semibold text-white hover:bg-neutral-800"
            >
              Отправить
            </button>
            <p className="text-[11px] text-neutral-600">
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
    <footer className="border-t border-neutral-200">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-5 py-8 text-xs text-neutral-600 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Java с нуля до Middle</p>
        <div className="flex gap-4">
          <a className="hover:text-neutral-900" href="#top">Наверх</a>
          <a className="hover:text-neutral-900" href="#about">О курсе</a>
          <a className="hover:text-neutral-900" href="#cta">Программа</a>
        </div>
      </div>
    </footer>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-neutral-200 bg-[var(--bg-card)] px-2.5 py-1">
      {children}
    </span>
  );
}

function Card({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-[var(--bg-card)] p-5 shadow-sm">
      <p className="text-sm font-semibold text-neutral-900">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-neutral-700">{text}</p>
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 rounded-2xl border border-neutral-200 bg-[var(--bg-card)] p-4 shadow-sm">
      <span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-neutral-900" />
      <p className="text-sm leading-relaxed text-neutral-700">{children}</p>
    </div>
  );
}

function Result({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
      <p className="text-sm font-semibold text-neutral-900">{title}</p>
      <p className="mt-1 text-sm leading-relaxed text-neutral-700">{text}</p>
    </div>
  );
}

function Step({ title, text }: { title: string; text: string }) {
  return (
    <li className="rounded-2xl border border-neutral-200 bg-[var(--bg-card)] p-4">
      <p className="text-sm font-semibold text-neutral-900">{title}</p>
      <p className="mt-1 text-sm leading-relaxed text-neutral-700">{text}</p>
    </li>
  );
}

function QA({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
      <p className="text-sm font-semibold text-neutral-900">{q}</p>
      <p className="mt-1 text-sm leading-relaxed text-neutral-700">{a}</p>
    </div>
  );
}
