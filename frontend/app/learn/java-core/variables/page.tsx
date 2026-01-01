"use client";

// app/learn/java-core/variables/page.tsx
// Страница с теоретическим материалом по переменным и типам в Java

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

export default function JavaCoreVariablesPage() {
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
              materialId="learn/java-core/variables"
              title="Переменные и типы"
              description="Изучи примитивные типы данных в Java, научись объявлять переменные, работать со строками и преобразовывать типы."
              sections={[
                {
                  subtitle: "Примитивные типы данных",
                  content: [
                    "Java имеет 8 примитивных типов:",
                    "",
                    "Целые числа:",
                    "• byte — от -128 до 127 (1 байт)",
                    "• short — от -32,768 до 32,767 (2 байта)",
                    "• int — от -2³¹ до 2³¹-1 (4 байта) — самый используемый",
                    "• long — очень большие числа (8 байт)",
                    "",
                    "Числа с плавающей точкой:",
                    "• float — 32-битное число с плавающей точкой",
                    "• double — 64-битное число (используется чаще)",
                    "",
                    "Символы и логика:",
                    "• char — один символ (например, 'A')",
                    "• boolean — true или false",
                    "",
                    "Примеры:",
                    "int age = 25;",
                    "double price = 99.99;",
                    "char grade = 'A';",
                    "boolean isActive = true;"
                  ]
                },
                {
                  subtitle: "Объявление и инициализация переменных",
                  content: [
                    "Переменная — это именованная ячейка памяти для хранения данных.",
                    "",
                    "Синтаксис объявления:",
                    "тип имя_переменной;",
                    "",
                    "Инициализация (присвоение значения):",
                    "тип имя_переменной = значение;",
                    "",
                    "Примеры:",
                    "",
                    "// Объявление без инициализации",
                    "int count;",
                    "",
                    "// Объявление с инициализацией",
                    "String name = \"Анна\";",
                    "",
                    "// Множественное объявление",
                    "int x = 10, y = 20, z = 30;",
                    "",
                    "Правила именования:",
                    "• Имя должно начинаться с буквы, _ или $",
                    "• Может содержать буквы, цифры, _ и $",
                    "• Регистр имеет значение (age ≠ Age)",
                    "• Нельзя использовать ключевые слова Java"
                  ]
                },
                {
                  subtitle: "Строки и работа с ними",
                  content: [
                    "String — это класс для работы со строками (текстом).",
                    "",
                    "Создание строк:",
                    "",
                    "String name = \"Анна\";",
                    "String greeting = \"Привет, \" + name;",
                    "",
                    "Основные операции:",
                    "",
                    "// Длина строки",
                    "int length = name.length();",
                    "",
                    "// Объединение строк",
                    "String full = \"Имя: \" + name;",
                    "",
                    "// Проверка равенства",
                    "boolean isEqual = name.equals(\"Анна\");",
                    "",
                    "// Извлечение подстроки",
                    "String sub = name.substring(0, 2); // \"Ан\"",
                    "",
                    "// Преобразование в верхний/нижний регистр",
                    "String upper = name.toUpperCase(); // \"АННА\"",
                    "String lower = name.toLowerCase(); // \"анна\"",
                    "",
                    "Важно:",
                    "• Строки в Java неизменяемы (immutable)",
                    "• Для сравнения используй equals(), а не =="
                  ]
                },
                {
                  subtitle: "Преобразование типов",
                  content: [
                    "В Java есть два вида преобразования типов:",
                    "",
                    "1. Автоматическое (неявное) преобразование:",
                    "• Происходит при расширении типа (byte → int)",
                    "",
                    "byte b = 10;",
                    "int i = b; // автоматически",
                    "",
                    "2. Явное преобразование (приведение типов):",
                    "• Используется при сужении типа (int → byte)",
                    "• Синтаксис: (тип) значение",
                    "",
                    "int number = 100;",
                    "byte b = (byte) number; // явное приведение",
                    "",
                    "Преобразование строк:",
                    "",
                    "// String → int",
                    "String str = \"123\";",
                    "int num = Integer.parseInt(str);",
                    "",
                    "// int → String",
                    "int age = 25;",
                    "String ageStr = String.valueOf(age);",
                    "// или",
                    "String ageStr2 = \"\" + age;",
                    "",
                    "⚠️ ВНИМАНИЕ: При приведении типов может произойти потеря данных!"
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

