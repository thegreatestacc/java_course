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

export default function PracticePage() {
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
          </div>
        </nav>

        <Header leftButton={{ href: "/learn/clean-architecture", text: "← Назад к подтемам" }} />
        <MotivationalQuotes />
        <main>
          <section className="mx-auto max-w-6xl px-5 py-14 md:py-20">
            <DetailedLesson
              materialId="learn/clean-architecture/practice"
              title="Практические советы"
              description="Изучи практические рекомендации по применению принципов чистой архитектуры. Научись применять теорию на практике и избегать типичных ошибок."
              sections={[
                {
                  subtitle: "Практические советы",
                  content: [
                    "Как применять принципы чистой архитектуры на практике:",
                    "",
                    "1. Начинай с малого:",
                    "Не пытайся сразу создать идеальную архитектуру. Начни с простой структуры и улучшай её по мере необходимости.",
                    "",
                    "2. Используй интерфейсы:",
                    "Зависи от абстракций, а не от конкретных реализаций. Это упростит тестирование и замену компонентов.",
                    "",
                    "3. Разделяй ответственность:",
                    "Каждый класс должен делать одну вещь и делать её хорошо.",
                    "",
                    "4. Избегай циклических зависимостей:",
                    "Если класс A зависит от B, а B от A — это признак плохого дизайна.",
                    "",
                    "5. Тестируй изолированно:",
                    "Бизнес-логика должна тестироваться без БД, внешних API и других зависимостей.",
                    "",
                    "6. Рефакторинг — это нормально:",
                    "Не бойся переписывать код, если он становится слишком сложным или нарушает принципы.",
                    "",
                    "7. Читай чужой код:",
                    "Изучай open-source проекты, чтобы увидеть, как применяются принципы чистой архитектуры на практике.",
                    "",
                    "Помни: чистая архитектура — это не цель, а средство для создания поддерживаемого и масштабируемого кода."
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



