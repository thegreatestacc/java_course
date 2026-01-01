"use client";

// app/learn/java-core/basics/page.tsx
// Страница с теоретическим материалом по основам Java

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

export default function JavaCoreBasicsPage() {
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
              materialId="learn/java-core/basics"
              title="Основы Java"
              description="Начнем с самого начала: что такое Java, как установить JDK, создать первую программу и понять структуру Java-приложения."
              sections={[
                {
                  subtitle: "Что такое Java и зачем он нужен",
                  content: [
                    "Java — это объектно-ориентированный язык программирования, созданный компанией Sun Microsystems (теперь Oracle).",
                    "Java работает по принципу \"напиши один раз, запускай везде\" (Write Once, Run Anywhere) благодаря виртуальной машине Java (JVM).",
                    "Java используется для создания:",
                    "• Серверных приложений и веб-сервисов",
                    "• Мобильных приложений (Android)",
                    "• Десктопных приложений",
                    "• Встраиваемых систем",
                    "",
                    "Почему Java популярен:",
                    "• Кроссплатформенность — код работает на любой ОС",
                    "• Безопасность и надежность",
                    "• Большое сообщество и множество библиотек",
                    "• Хорошая производительность"
                  ]
                },
                {
                  subtitle: "Установка JDK и настройка окружения",
                  content: [
                    "JDK (Java Development Kit) — это набор инструментов для разработки на Java.",
                    "",
                    "Установка JDK:",
                    "• Windows: скачай с oracle.com/java или используй OpenJDK",
                    "• macOS: brew install openjdk@17",
                    "• Linux: sudo apt install openjdk-17-jdk (Ubuntu/Debian)",
                    "",
                    "Проверка установки:",
                    "java -version — показать версию Java",
                    "javac -version — показать версию компилятора",
                    "",
                    "Настройка переменных окружения (если нужно):",
                    "• JAVA_HOME — путь к папке JDK",
                    "• PATH — добавить путь к bin папке JDK"
                  ]
                },
                {
                  subtitle: "Первый Hello World",
                  content: [
                    "Создай файл HelloWorld.java:",
                    "",
                    "public class HelloWorld {",
                    "    public static void main(String[] args) {",
                    "        System.out.println(\"Hello, World!\");",
                    "    }",
                    "}",
                    "",
                    "Компиляция:",
                    "javac HelloWorld.java — создаст файл HelloWorld.class",
                    "",
                    "Запуск:",
                    "java HelloWorld — запустит программу",
                    "",
                    "Важные моменты:",
                    "• Имя файла должно совпадать с именем класса",
                    "• Класс с методом main — точка входа в программу",
                    "• System.out.println() — вывод текста в консоль"
                  ]
                },
                {
                  subtitle: "Структура Java программы",
                  content: [
                    "Каждая Java программа состоит из классов.",
                    "",
                    "Основные элементы:",
                    "• class — ключевое слово для создания класса",
                    "• public — модификатор доступа (класс доступен везде)",
                    "• static — метод принадлежит классу, а не объекту",
                    "• void — метод ничего не возвращает",
                    "• main — имя метода, точка входа в программу",
                    "• String[] args — параметры командной строки",
                    "",
                    "Пример структуры:",
                    "",
                    "public class Example {",
                    "    // Поля класса",
                    "    private String name;",
                    "    ",
                    "    // Метод main",
                    "    public static void main(String[] args) {",
                    "        // Код программы",
                    "    }",
                    "    ",
                    "    // Другие методы",
                    "    public void doSomething() {",
                    "        // Код метода",
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


