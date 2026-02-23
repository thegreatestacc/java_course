"use client";

// app/learn/java-core/exceptions/page.tsx
// Страница с теоретическим материалом по исключениям в Java

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

export default function JavaCoreExceptionsPage() {
  const pathname = usePathname();

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
                <Link
                  href="/learn/java-core/exceptions"
                  className={`block px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                    pathname === "/learn/java-core/exceptions"
                      ? "bg-[var(--bg-muted)] text-[var(--text-main)] font-medium"
                      : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                  }`}
                >
                  <span className={`inline-block transition-opacity duration-200 ${
                    pathname === "/learn/java-core/exceptions" ? "opacity-100" : "opacity-70"
                  }`}>
                    Исключения
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <Header leftButton={{ href: "/learn/java-core", text: "← К Java Core" }} />
        <MotivationalQuotes />
        <main>
          <section className="mx-auto max-w-6xl px-5 py-14 md:py-20">
            <DetailedLesson
              materialId="learn/java-core/exceptions"
              title="Исключения"
              description="Изучи механизм обработки исключений в Java. Научись правильно обрабатывать ошибки и создавать надежные приложения."
              sections={[
                {
                  subtitle: "Что такое исключения",
                  content: [
                    "Исключение (Exception) — это событие, которое возникает во время выполнения программы и нарушает нормальный поток выполнения.",
                    "",
                    "Примеры ситуаций, когда возникают исключения:",
                    "• Деление на ноль",
                    "• Обращение к несуществующему элементу массива",
                    "• Попытка открыть несуществующий файл",
                    "• Преобразование строки в число, когда строка не является числом",
                    "",
                    "Без обработки исключений программа завершится с ошибкой. Java предоставляет механизм try-catch для безопасной обработки таких ситуаций."
                  ]
                },
                {
                  subtitle: "Блок try-catch",
                  content: [
                    "Блок try-catch позволяет перехватывать и обрабатывать исключения.",
                    "",
                    "Базовый синтаксис:",
                    "",
                    "try {",
                    "    // код, который может вызвать исключение",
                    "    int result = 10 / 0;",
                    "} catch (ArithmeticException e) {",
                    "    // код обработки исключения",
                    "    System.out.println(\"Ошибка: деление на ноль\");",
                    "}",
                    "",
                    "Пример с несколькими catch блоками:",
                    "",
                    "try {",
                    "    int[] numbers = {1, 2, 3};",
                    "    System.out.println(numbers[5]); // IndexOutOfBoundsException",
                    "    int result = 10 / 0; // ArithmeticException",
                    "} catch (ArrayIndexOutOfBoundsException e) {",
                    "    System.out.println(\"Индекс выходит за границы массива\");",
                    "} catch (ArithmeticException e) {",
                    "    System.out.println(\"Ошибка арифметики\");",
                    "}",
                    "",
                    "Блок finally выполняется всегда, независимо от того, возникло исключение или нет:",
                    "",
                    "try {",
                    "    // код",
                    "} catch (Exception e) {",
                    "    // обработка",
                    "} finally {",
                    "    // этот код выполнится всегда",
                    "    System.out.println(\"Очистка ресурсов\");",
                    "}"
                  ]
                },
                {
                  subtitle: "Типы исключений",
                  content: [
                    "В Java исключения делятся на два типа:",
                    "",
                    "1. Checked исключения (проверяемые):",
                    "• Должны быть обработаны или объявлены в сигнатуре метода",
                    "• Компилятор требует их обработки",
                    "• Примеры: IOException, FileNotFoundException, SQLException",
                    "",
                    "Пример:",
                    "",
                    "public void readFile() throws IOException {",
                    "    FileReader file = new FileReader(\"file.txt\");",
                    "    // код чтения файла",
                    "}",
                    "",
                    "2. Unchecked исключения (непроверяемые):",
                    "• Не требуют обязательной обработки",
                    "• Наследуются от RuntimeException",
                    "• Примеры: NullPointerException, ArrayIndexOutOfBoundsException, ArithmeticException",
                    "",
                    "Пример:",
                    "",
                    "int[] arr = null;",
                    "int length = arr.length; // NullPointerException (не требует обработки, но лучше обработать)"
                  ]
                },
                {
                  subtitle: "Создание собственных исключений",
                  content: [
                    "Можно создавать собственные классы исключений.",
                    "",
                    "Создание checked исключения:",
                    "",
                    "class MyException extends Exception {",
                    "    public MyException(String message) {",
                    "        super(message);",
                    "    }",
                    "}",
                    "",
                    "Создание unchecked исключения:",
                    "",
                    "class MyRuntimeException extends RuntimeException {",
                    "    public MyRuntimeException(String message) {",
                    "        super(message);",
                    "    }",
                    "}",
                    "",
                    "Использование:",
                    "",
                    "public void validateAge(int age) throws MyException {",
                    "    if (age < 0) {",
                    "        throw new MyException(\"Возраст не может быть отрицательным\");",
                    "    }",
                    "}",
                    "",
                    "Вызов:",
                    "",
                    "try {",
                    "    validateAge(-5);",
                    "} catch (MyException e) {",
                    "    System.out.println(e.getMessage());",
                    "}"
                  ]
                },
                {
                  subtitle: "Ключевое слово throw",
                  content: [
                    "Ключевое слово throw используется для явного выброса исключения.",
                    "",
                    "Синтаксис:",
                    "",
                    "throw new ТипИсключения(\"Сообщение об ошибке\");",
                    "",
                    "Примеры:",
                    "",
                    "// Выброс стандартного исключения",
                    "if (age < 0) {",
                    "    throw new IllegalArgumentException(\"Возраст не может быть отрицательным\");",
                    "}",
                    "",
                    "// Выброс собственного исключения",
                    "if (balance < 0) {",
                    "    throw new InsufficientFundsException(\"Недостаточно средств\");",
                    "}",
                    "",
                    "Метод может объявить, что он выбрасывает исключение:",
                    "",
                    "public void withdraw(double amount) throws InsufficientFundsException {",
                    "    if (balance < amount) {",
                    "        throw new InsufficientFundsException(\"Недостаточно средств\");",
                    "    }",
                    "    balance -= amount;",
                    "}"
                  ]
                },
                {
                  subtitle: "Лучшие практики обработки исключений",
                  content: [
                    "Правильная обработка исключений — важная часть написания надежного кода.",
                    "",
                    "Рекомендации:",
                    "",
                    "1. Не игнорируйте исключения:",
                    "",
                    "// Плохо",
                    "try {",
                    "    riskyOperation();",
                    "} catch (Exception e) {",
                    "    // ничего не делаем",
                    "}",
                    "",
                    "// Хорошо",
                    "try {",
                    "    riskyOperation();",
                    "} catch (Exception e) {",
                    "    logger.error(\"Ошибка при выполнении операции\", e);",
                    "    // или обработать ошибку",
                    "}",
                    "",
                    "2. Используйте конкретные типы исключений, а не общий Exception:",
                    "",
                    "// Плохо",
                    "try {",
                    "    // код",
                    "} catch (Exception e) {",
                    "    // обработка",
                    "}",
                    "",
                    "// Хорошо",
                    "try {",
                    "    // код",
                    "} catch (FileNotFoundException e) {",
                    "    // обработка",
                    "} catch (IOException e) {",
                    "    // обработка",
                    "}",
                    "",
                    "3. Используйте finally для освобождения ресурсов:",
                    "",
                    "FileReader file = null;",
                    "try {",
                    "    file = new FileReader(\"data.txt\");",
                    "    // работа с файлом",
                    "} catch (IOException e) {",
                    "    // обработка",
                    "} finally {",
                    "    if (file != null) {",
                    "        file.close();",
                    "    }",
                    "}",
                    "",
                    "4. Современный подход — try-with-resources (Java 7+):",
                    "",
                    "try (FileReader file = new FileReader(\"data.txt\")) {",
                    "    // работа с файлом",
                    "    // файл автоматически закроется",
                    "} catch (IOException e) {",
                    "    // обработка",
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

