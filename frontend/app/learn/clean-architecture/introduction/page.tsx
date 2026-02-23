"use client";

import { JetBrains_Mono } from "next/font/google";
import { Header } from "../../../Header";
import { MotivationalQuotes } from "../../../MotivationalQuotes";
import { DetailedLesson } from "../../../DetailedLesson";
import { Footer } from "../../../components/Footer";
import Link from "next/link";

const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export default function IntroductionPage() {
  return (
    <div className={mono.className}>
      <div className="min-h-dvh bg-[var(--bg-main)] text-[var(--text-main)]">
        <nav className="hidden lg:block fixed left-0 top-[20vh] w-56 h-[calc(100vh-20vh)] overflow-y-auto pl-8 pr-4 py-6 z-10">
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
          </div>
        </nav>

        <Header leftButton={{ href: "/learn/clean-architecture", text: "← Назад к подтемам" }} />
        <MotivationalQuotes />
        <main>
          <section className="mx-auto max-w-6xl px-5 py-14 md:py-20">
            <DetailedLesson
              materialId="learn/clean-architecture/introduction"
              title="Что такое чистая архитектура"
              description="Изучи основы чистой архитектуры: что это такое, зачем она нужна и какие цели преследует. Пойми, как создавать код, который легко тестировать, изменять и поддерживать."
              sections={[
                {
                  subtitle: "Что такое чистая архитектура",
                  content: [
                    "Чистая архитектура — это подход к проектированию программного обеспечения, который делает код более понятным, тестируемым и поддерживаемым.",
                    "",
                    "Основные цели чистой архитектуры:",
                    "• Независимость от фреймворков — бизнес-логика не зависит от внешних библиотек",
                    "• Тестируемость — код легко тестировать без UI, БД и других внешних зависимостей",
                    "• Независимость от UI — можно легко заменить веб-интерфейс на консольный или мобильный",
                    "• Независимость от БД — можно перейти с MySQL на PostgreSQL без изменения бизнес-логики",
                    "• Независимость от внешних сервисов — бизнес-правила не зависят от внешних API",
                    "",
                    "Чистая архитектура помогает создавать код, который легко изменять, расширять и поддерживать."
                  ]
                }
              ]}
            />
          </section>
        </main>
        <Footer backLink={{ href: "/learn/clean-architecture", text: "Назад к подтемам" }} />
      </div>
    </div>
  );
}










