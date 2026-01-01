"use client";

// app/learn/java-core/control-flow/page.tsx
// Страница с теоретическим материалом по условиям и циклам в Java

import { JetBrains_Mono } from "next/font/google";
import { Header } from "../../../Header";
import { MotivationalQuotes } from "../../../MotivationalQuotes";
import { DetailedLesson } from "../../../DetailedLesson";
import Link from "next/link";
import { usePathname } from "next/navigation";

const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export default function JavaCoreControlFlowPage() {
  const pathname = usePathname();

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
            <div>
              <h3 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3 px-2">
                Темы материала
              </h3>
              <div className="space-y-1">
                <Link
                  href="/learn/java-core"
                  className={`block px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                    pathname === "/learn/java-core"
                      ? "bg-[var(--bg-muted)] text-[var(--text-main)] font-medium"
                      : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                  }`}
                >
                  <span className={`inline-block transition-opacity duration-200 ${
                    pathname === "/learn/java-core" ? "opacity-100" : "opacity-70"
                  }`}>
                    Обзор материала
                  </span>
                </Link>
                <Link
                  href="/learn/java-core/basics"
                  className={`block px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                    pathname === "/learn/java-core/basics"
                      ? "bg-[var(--bg-muted)] text-[var(--text-main)] font-medium"
                      : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                  }`}
                >
                  <span className={`inline-block transition-opacity duration-200 ${
                    pathname === "/learn/java-core/basics" ? "opacity-100" : "opacity-70"
                  }`}>
                    Основы Java
                  </span>
                </Link>
                <Link
                  href="/learn/java-core/variables"
                  className={`block px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                    pathname === "/learn/java-core/variables"
                      ? "bg-[var(--bg-muted)] text-[var(--text-main)] font-medium"
                      : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                  }`}
                >
                  <span className={`inline-block transition-opacity duration-200 ${
                    pathname === "/learn/java-core/variables" ? "opacity-100" : "opacity-70"
                  }`}>
                    Переменные и типы
                  </span>
                </Link>
                <Link
                  href="/learn/java-core/control-flow"
                  className={`block px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                    pathname === "/learn/java-core/control-flow"
                      ? "bg-[var(--bg-muted)] text-[var(--text-main)] font-medium"
                      : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                  }`}
                >
                  <span className={`inline-block transition-opacity duration-200 ${
                    pathname === "/learn/java-core/control-flow" ? "opacity-100" : "opacity-70"
                  }`}>
                    Условия и циклы
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <Header leftButton={{ href: "/learn/java-core", text: "← Назад к Java Core" }} />
        <MotivationalQuotes />
        <main>
          <section className="mx-auto max-w-6xl px-5 py-14 md:py-20">
            <DetailedLesson
              materialId="learn/java-core/control-flow"
              title="Условия и циклы"
              description="Изучи условные операторы и циклы для управления потоком выполнения программы. Это основа логики любого приложения."
              sections={[
                {
                  subtitle: "Условные операторы if/else",
                  content: [
                    "Условные операторы позволяют выполнять код только при определенных условиях.",
                    "",
                    "Базовый синтаксис:",
                    "",
                    "if (условие) {",
                    "    // код выполнится, если условие true",
                    "}",
                    "",
                    "С else:",
                    "",
                    "if (age >= 18) {",
                    "    System.out.println(\"Совершеннолетний\");",
                    "} else {",
                    "    System.out.println(\"Несовершеннолетний\");",
                    "}",
                    "",
                    "Множественные условия:",
                    "",
                    "if (score >= 90) {",
                    "    System.out.println(\"Отлично\");",
                    "} else if (score >= 70) {",
                    "    System.out.println(\"Хорошо\");",
                    "} else if (score >= 50) {",
                    "    System.out.println(\"Удовлетворительно\");",
                    "} else {",
                    "    System.out.println(\"Неудовлетворительно\");",
                    "}",
                    "",
                    "Логические операторы:",
                    "• && — И (оба условия должны быть true)",
                    "• || — ИЛИ (хотя бы одно условие true)",
                    "• ! — НЕ (инверсия)"
                  ]
                },
                {
                  subtitle: "Циклы for, while, do-while",
                  content: [
                    "Циклы позволяют повторять выполнение кода несколько раз.",
                    "",
                    "Цикл for:",
                    "",
                    "for (int i = 0; i < 10; i++) {",
                    "    System.out.println(i);",
                    "}",
                    "",
                    "Сокращенный синтаксис цикла for:",
                    "// String[] names = {\"Анна\", \"Иван\", \"Мария\"};",
                    "for (String name : names) {",
                    "    System.out.println(name);",
                    "}",
                    "",
                    "Цикл while:",
                    "",
                    "int count = 0;",
                    "while (count < 5) {",
                    "    System.out.println(count);",
                    "    count++;",
                    "}",
                    "",
                    "Цикл do-while:",
                    "",
                    "int number;",
                    "do {",
                    "    number = getUserInput();",
                    "} while (number < 0);",
                    "",
                    "Разница: do-while выполнится минимум один раз, даже если условие false."
                  ]
                },
                {
                  subtitle: "Оператор switch",
                  content: [
                    "Switch позволяет выбирать один из множества вариантов.",
                    "",
                    "Синтаксис:",
                    "",
                    "switch (переменная) {",
                    "    case значение1:",
                    "        // код",
                    "        break;",
                    "    case значение2:",
                    "        // код",
                    "        break;",
                    "    default:",
                    "        // код по умолчанию",
                    "}",
                    "",
                    "Пример:",
                    "",
                    "int day = 3;",
                    "switch (day) {",
                    "    case 1:",
                    "        System.out.println(\"Понедельник\");",
                    "        break;",
                    "    case 2:",
                    "        System.out.println(\"Вторник\");",
                    "        break;",
                    "    case 3:",
                    "        System.out.println(\"Среда\");",
                    "        break;",
                    "    default:",
                    "        System.out.println(\"Другой день\");",
                    "}",
                    "",
                    "Современный switch (Java 14+):",
                    "",
                    "switch (day) {",
                    "    case 1 -> System.out.println(\"Понедельник\");",
                    "    case 2 -> System.out.println(\"Вторник\");",
                    "    case 3 -> System.out.println(\"Среда\");",
                    "    default -> System.out.println(\"Другой день\");",
                    "}"
                  ]
                },
                {
                  subtitle: "Управление потоком выполнения",
                  content: [
                    "Иногда нужно прервать или продолжить выполнение цикла.",
                    "",
                    "break — прерывает выполнение цикла или switch:",
                    "",
                    "for (int i = 0; i < 10; i++) {",
                    "    if (i == 5) {",
                    "        break; // выйдет из цикла при i = 5",
                    "    }",
                    "    System.out.println(i);",
                    "}",
                    "",
                    "continue — пропускает текущую итерацию:",
                    "",
                    "for (int i = 0; i < 10; i++) {",
                    "    if (i % 2 == 0) {",
                    "        continue; // пропустит четные числа",
                    "    }",
                    "    System.out.println(i); // выведет только нечетные",
                    "}",
                    "",
                    "Метки для вложенных циклов:",
                    "",
                    "outer: for (int i = 0; i < 3; i++) {",
                    "    inner: for (int j = 0; j < 3; j++) {",
                    "        if (i == 1 && j == 1) {",
                    "            break outer; // выйдет из обоих циклов",
                    "        }",
                    "    }",
                    "}"
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
          <Link className="hover:text-[var(--text-main)]" href="/learn/java-core">
            К Java Core
          </Link>
          <Link className="hover:text-[var(--text-main)]" href="/">
            На главную
          </Link>
        </div>
      </div>
    </footer>
  );
}

