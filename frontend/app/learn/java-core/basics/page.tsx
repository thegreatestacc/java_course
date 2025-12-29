"use client";

// app/learn/java-core/basics/page.tsx
// Страница с теоретическим материалом по основам Java

import { JetBrains_Mono } from "next/font/google";
import { Header } from "../../../Header";
import { MotivationalQuotes } from "../../../MotivationalQuotes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { useState, useEffect } from "react";

const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Тема IntelliJ IDEA Light
const intellijLight: any = {
  'code[class*="language-"]': {
    color: '#000000',
    background: 'transparent',
  },
  'pre[class*="language-"]': {
    color: '#000000',
    background: 'transparent',
    padding: 0,
    margin: 0,
  },
  'comment': { color: '#808080', fontStyle: 'italic' },
  'prolog': { color: '#808080', fontStyle: 'italic' },
  'doctype': { color: '#808080', fontStyle: 'italic' },
  'cdata': { color: '#808080', fontStyle: 'italic' },
  'punctuation': { color: '#000000' },
  'operator': { color: '#000000' },
  'keyword': { color: '#0000ff' }, // public, class, private, final, return, String - синие (как в Kotlin)
  'class-name': { color: '#0066cc' }, // Example, MessageChanger, CompletableFuture - голубые (как в Kotlin)
  'function': { color: '#006600' }, // updateMessage (объявления) - темно-зеленый
  'variable': { color: '#000000' }, // messageChanger, message - черный/белый
  'string': { color: '#008000' }, // строковые литералы - зеленый
  'char': { color: '#008000' },
  'number': { color: '#0000ff' }, // числа - синий
  'boolean': { color: '#0000ff' },
  'constant': { color: '#0000ff' },
  'property': { color: '#ffc800' }, // аннотации - желтый
  'tag': { color: '#ffc800' }, // @Component, @RequiredArgsConstructor - желтый
  'attr-name': { color: '#ffc800' }, // @author, @project, @date - желтый
  'attr-value': { color: '#808080' }, // значения в комментариях
  'builtin': { color: '#008000' },
  'symbol': { color: '#0000ff' },
  'deleted': { color: '#0000ff' },
  'inserted': { color: '#008000' },
  'entity': { color: '#000000' },
  'url': { color: '#000000' },
  'atrule': { color: '#0000ff' },
  'regex': { color: '#000000' },
  'important': { color: '#000000', fontWeight: 'bold' },
};

// Тема IntelliJ IDEA Darcula (Dark)
const intellijDark: any = {
  'code[class*="language-"]': {
    color: '#a9b7c6',
    background: 'transparent',
  },
  'pre[class*="language-"]': {
    color: '#a9b7c6',
    background: 'transparent',
    padding: 0,
    margin: 0,
  },
  'comment': { color: '#808080', fontStyle: 'italic' }, // комментарии - серые
  'prolog': { color: '#808080', fontStyle: 'italic' },
  'doctype': { color: '#808080', fontStyle: 'italic' },
  'cdata': { color: '#808080', fontStyle: 'italic' },
  'punctuation': { color: '#a9b7c6' }, // скобки, точки - белые/светло-серые
  'operator': { color: '#a9b7c6' }, // -> и другие операторы
  'keyword': { color: '#cc7832' }, // public, class, private, final, return, String - оранжевые (как в Kotlin)
  'class-name': { color: '#4eade5' }, // Example, MessageChanger, CompletableFuture - светло-голубые (как в Kotlin)
  'function': { color: '#e6b85c' }, // updateMessage (объявления) - темно-желтые
  'variable': { color: '#a9b7c6' }, // messageChanger - белые
  'string': { color: '#6a8759' }, // строковые литералы - зеленые
  'char': { color: '#6a8759' },
  'number': { color: '#6897bb' }, // числа - голубые
  'boolean': { color: '#6897bb' },
  'constant': { color: '#6897bb' },
  'property': { color: '#cc7832' }, // аннотации @Component, @RequiredArgsConstructor - оранжевые
  'tag': { color: '#cc7832' }, // аннотации - оранжевые
  'attr-name': { color: '#629755' }, // @author, @project, @date в комментариях - зеленые
  'attr-value': { color: '#6a8759' }, // значения аннотаций - светло-зеленые
  'builtin': { color: '#6a8759' },
  'symbol': { color: '#6897bb' },
  'deleted': { color: '#6897bb' },
  'inserted': { color: '#6a8759' },
  'entity': { color: '#a9b7c6' },
  'url': { color: '#a9b7c6' },
  'atrule': { color: '#cc7832' },
  'regex': { color: '#a9b7c6' },
  'important': { color: '#a9b7c6', fontWeight: 'bold' },
  // Для параметров в вызовах методов (message в changeMessage(message)) - фиолетовый
  'parameter': { color: '#9876aa' },
};

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

function DetailedLesson({ 
  title, 
  description, 
  sections 
}: { 
  title: string; 
  description: string; 
  sections: Array<{ subtitle: string; content: string[] }> 
}) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    
    return () => observer.disconnect();
  }, []);

  const isCodeLine = (line: string): boolean => {
    // Строки с отступами (4+ пробелов) считаются кодом
    if (line.match(/^\s{4,}/)) return true;
    return line.startsWith("public ") || line.startsWith("private ") || line.startsWith("class ") || 
           line.startsWith("    ") || line.startsWith("}") || line.startsWith("{") ||
           line.match(/^[a-zA-Z].*\(.*\)/) || line.includes("System.out") ||
           line.match(/^(int|String|double|boolean|char|byte|short|long|float)\s+\w+/) ||
           (line.includes("=") && (line.includes("int ") || line.includes("String ") || line.includes("double "))) ||
           line.includes("->") || line.includes("++") || line.includes("--") ||
           line.startsWith("//") || line.trim().startsWith("@");
  };

  const isCommandLine = (line: string): boolean => {
    return line.startsWith("java ") || line.startsWith("javac ") || line.startsWith("brew ") || 
           line.startsWith("sudo ") || line.startsWith("cd ");
  };

  return (
    <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)] p-6 shadow-sm">
      <h3 className="text-lg font-semibold tracking-tight text-[var(--text-main)] mb-2">
        {title}
      </h3>
      <p className="text-sm text-[var(--text-muted)] mb-6">
        {description}
      </p>
      <div className="space-y-6">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-3">
            <h4 className="text-sm font-semibold text-[var(--text-main)]">
              {section.subtitle}
            </h4>
            <div className="rounded-xl border border-[var(--border-main)] bg-[var(--bg-secondary)] p-4">
              <div className="space-y-2.5 text-sm text-[var(--text-muted)] leading-relaxed">
                {(() => {
                  const elements: JSX.Element[] = [];
                  let currentParagraph: string[] = [];
                  let currentCodeBlock: string[] = [];
                  let keyIndex = 0;

                  const flushParagraph = () => {
                    if (currentParagraph.length > 0) {
                      elements.push(
                        <p key={keyIndex++}>
                          {currentParagraph.join(" ")}
                        </p>
                      );
                      currentParagraph = [];
                    }
                  };

                  const flushCodeBlock = () => {
                    if (currentCodeBlock.length > 0) {
                      const code = currentCodeBlock.join("\n");
                      const language = code.includes("public class") || code.includes("System.out") ? "java" : "bash";
                      elements.push(
                        <div key={keyIndex++} className="rounded-lg border border-[var(--border-main)] bg-[var(--bg-card)] p-3 overflow-x-auto my-2">
                          <SyntaxHighlighter
                            language={language}
                            style={isDark ? intellijDark : intellijLight}
                            customStyle={{
                              margin: 0,
                              padding: 0,
                              background: 'transparent',
                              fontSize: '12px',
                              lineHeight: '1.6',
                              fontFamily: 'inherit',
                            }}
                            codeTagProps={{
                              style: {
                                fontFamily: 'inherit',
                              },
                            }}
                          >
                            {code}
                          </SyntaxHighlighter>
                        </div>
                      );
                      currentCodeBlock = [];
                    }
                  };

                  section.content.forEach((line, lineIndex) => {
                    const trimmedLine = line.trim();
                    const nextLine = lineIndex < section.content.length - 1 ? section.content[lineIndex + 1] : "";
                    const nextLineTrimmed = nextLine.trim();
                    
                    // Если строка пустая или содержит только пробелы
                    if (trimmedLine === "") {
                      // Если мы в блоке кода, добавляем пустую строку в блок
                      if (currentCodeBlock.length > 0) {
                        currentCodeBlock.push("");
                        return;
                      }
                      // Если после пустой строки идет код, начинаем блок кода
                      if (isCodeLine(nextLine) || isCommandLine(nextLine)) {
                        flushParagraph();
                        return;
                      }
                      // Иначе это просто разделитель
                      flushParagraph();
                      flushCodeBlock();
                      elements.push(<div key={keyIndex++} className="h-2" />);
                      return;
                    }
                    
                    // Если строка содержит только пробелы (отступы), но мы в блоке кода, добавляем её
                    if (line.trim() === "" && line.length > 0 && currentCodeBlock.length > 0) {
                      currentCodeBlock.push("");
                      return;
                    }

                    // Команды терминала
                    if (isCommandLine(line)) {
                      flushParagraph();
                      // Если предыдущая строка была пустой и мы в блоке кода, продолжаем блок
                      if (currentCodeBlock.length > 0) {
                        currentCodeBlock.push(line);
                      } else {
                        flushCodeBlock();
                        currentCodeBlock.push(line);
                      }
                      return;
                    }

                    // Java код
                    if (isCodeLine(line)) {
                      flushParagraph();
                      // Если предыдущая строка была пустой и мы в блоке кода, продолжаем блок
                      if (currentCodeBlock.length > 0) {
                        currentCodeBlock.push(line);
                      } else {
                        flushCodeBlock();
                        currentCodeBlock.push(line);
                      }
                      return;
                    }

                    // Если есть накопленный блок кода, выводим его
                    if (currentCodeBlock.length > 0) {
                      flushCodeBlock();
                    }

                    // Заголовки разделов
                    if (line.endsWith(":") && !line.includes("•") && line.length < 50) {
                      flushParagraph();
                      elements.push(
                        <p key={keyIndex++} className="font-semibold text-[var(--text-main)] mt-3 first:mt-0">
                          {line}
                        </p>
                      );
                      return;
                    }

                    // Маркированные списки
                    if (line.startsWith("•")) {
                      flushParagraph();
                      elements.push(
                        <div key={keyIndex++} className="flex items-start gap-2 ml-2">
                          <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--button-bg)] mt-1.5" />
                          <span>{line.replace(/^•\s*/, "")}</span>
                        </div>
                      );
                      return;
                    }

                    // Предупреждения
                    if (line.includes("⚠️") || line.includes("ВНИМАНИЕ")) {
                      flushParagraph();
                      elements.push(
                        <p key={keyIndex++} className="text-xs font-medium text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg px-3 py-2">
                          {line}
                        </p>
                      );
                      return;
                    }

                    // Обычный текст - добавляем в текущий параграф
                    currentParagraph.push(trimmedLine);
                  });

                  flushParagraph();
                  flushCodeBlock();
                  return elements;
                })()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

