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

export default function KissPage() {
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
              materialId="learn/clean-architecture/kiss"
              title="KISS (Keep It Simple, Stupid)"
              description="Изучи принцип простоты в программировании. Научись выбирать простые решения вместо сложных, избегать преждевременной оптимизации и писать понятный код."
              sections={[
                {
                  subtitle: "KISS (Keep It Simple, Stupid)",
                  content: [
                    "KISS — принцип, который гласит: \"Делай проще\". Большинство систем работают лучше всего, если они остаются простыми, а не усложняются.",
                    "",
                    "Правила KISS:",
                    "• Не усложняй решение без необходимости",
                    "• Простое решение часто лучше сложного",
                    "• Избегай преждевременной оптимизации",
                    "• Пиши код так, чтобы его мог понять любой разработчик",
                    "",
                    "Пример нарушения KISS:",
                    "public boolean isEven(int number) {",
                    "  return number % 2 == 0 ? true : false;",
                    "}",
                    "",
                    "Правильный подход:",
                    "public boolean isEven(int number) {",
                    "  return number % 2 == 0;",
                    "}",
                    "",
                    "KISS не означает, что нужно писать плохой код. Это означает, что нужно выбирать самое простое решение, которое решает задачу."
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






