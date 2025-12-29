"use client";

// app/learn/java-core/control-flow/page.tsx
// Страница с теоретическим материалом по условиям и циклам в Java

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
  // Дополнительные стили для Java
  '.token.keyword': { color: '#0000ff' }, // switch, case, default, break, if, else, for, while
  '.token.operator': { color: '#000000' },
  '.token.punctuation': { color: '#000000' },
  '.token.string': { color: '#008000' },
  '.token.comment': { color: '#808080', fontStyle: 'italic' },
  '.token.number': { color: '#0000ff' },
  '.token.boolean': { color: '#0000ff' },
  '.token.variable': { color: '#000000' },
  '.token.function': { color: '#006600' },
  '.token.class-name': { color: '#0066cc' },
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
  // Дополнительные стили для Java
  '.token.keyword': { color: '#cc7832' }, // switch, case, default, break, if, else, for, while
  '.token.operator': { color: '#a9b7c6' },
  '.token.punctuation': { color: '#a9b7c6' },
  '.token.string': { color: '#6a8759' },
  '.token.comment': { color: '#808080', fontStyle: 'italic' },
  '.token.number': { color: '#6897bb' },
  '.token.boolean': { color: '#6897bb' },
  '.token.variable': { color: '#a9b7c6' },
  '.token.function': { color: '#e6b85c' },
  '.token.class-name': { color: '#4eade5' },
};

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
    const trimmed = line.trim();
    // Строки с отступами (4+ пробелов) считаются кодом
    if (line.match(/^\s{4,}/)) return true;
    // Комментарии
    if (trimmed.startsWith("//")) return true;
    // switch с круглыми скобками (switch (переменная) {)
    if (trimmed.match(/^switch\s*\(/)) return true;
    // case и default с двоеточием в конце (case значение1:, default:)
    if (trimmed.match(/^(case|default)\s+.*:/)) return true;
    if (trimmed === "case" || trimmed === "default" || trimmed.startsWith("case ") || trimmed.startsWith("default ")) return true;
    // Ключевые слова Java (switch, case, default, break, continue, return, if, else, for, while, do)
    if (trimmed.match(/^(switch|case|default|break|continue|return|if|else|for|while|do)\s*[:(;{]/)) return true;
    // break, continue, return с точкой с запятой
    if (trimmed.match(/^(break|continue|return)\s*;/)) return true;
    return line.startsWith("public ") || line.startsWith("private ") || line.startsWith("class ") || 
           line.startsWith("    ") || line.startsWith("}") || line.startsWith("{") ||
           !!line.match(/^[a-zA-Z].*\(.*\)/) || line.includes("System.out") ||
           !!trimmed.match(/^(int|String|double|boolean|char|byte|short|long|float)\s+/) ||
           (line.includes("=") && (line.includes("int ") || line.includes("String ") || line.includes("double "))) ||
           line.includes("->") || line.includes("++") || line.includes("--") ||
           trimmed.startsWith("@") || trimmed.endsWith(";");
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
                  const elements: React.ReactElement[] = [];
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
                      // Определяем язык: если это команда терминала - bash, иначе Java
                      let language = "java";
                      const firstLine = currentCodeBlock[0]?.trim() || "";
                      if (isCommandLine(firstLine) || 
                          code.includes("java ") || code.includes("javac ") || 
                          code.includes("brew ") || code.includes("sudo ") || code.includes("cd ")) {
                        language = "bash";
                      } else {
                        // Проверяем признаки Java кода
                        const javaIndicators = [
                          "public class", "System.out", "String", "int ", "double ", "boolean ",
                          "char ", "byte ", "short ", "long ", "float ", "Integer.parseInt",
                          "String.valueOf", ".length()", ".equals(", ".substring(", ".toUpperCase()",
                          ".toLowerCase()", "new ", "class ", "interface ", "enum ", "switch", "case", "default", "break"
                        ];
                        if (javaIndicators.some(indicator => code.includes(indicator))) {
                          language = "java";
                        } else {
                          // По умолчанию для страницы о циклах и условиях - это Java
                          language = "java";
                        }
                      }
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
                      // Если мы в блоке кода, просто добавляем пустую строку в блок
                      // Блок будет продолжаться, пока не встретим явный разделитель (заголовок или обычный текст)
                      if (currentCodeBlock.length > 0) {
                        currentCodeBlock.push("");
                        return;
                      }
                      // Если мы не в блоке кода, но после пустой строки идет код - начинаем блок
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
                      // Если блок кода уже существует - продолжаем его (добавляем строку)
                      if (currentCodeBlock.length > 0) {
                        currentCodeBlock.push(line);
                      } else {
                        // Если блока нет - начинаем новый блок
                        flushCodeBlock(); // Сбрасываем предыдущий блок (если был)
                        currentCodeBlock.push(line);
                      }
                      return;
                    }

                    // Заголовки разделов
                    if (line.endsWith(":") && !line.includes("•") && line.length < 50) {
                      // Если есть накопленный блок кода, выводим его перед заголовком
                      if (currentCodeBlock.length > 0) {
                        flushCodeBlock();
                      }
                      flushParagraph();
                      elements.push(
                        <p key={keyIndex++} className="font-semibold text-[var(--text-main)] mt-3 first:mt-0">
                          {line}
                        </p>
                      );
                      return;
                    }

                    // Если есть накопленный блок кода и текущая строка - обычный текст (не код, не заголовок, не маркер списка), выводим блок
                    if (currentCodeBlock.length > 0 && !isCodeLine(line) && !isCommandLine(line) && 
                        !(line.endsWith(":") && !line.includes("•") && line.length < 50) && 
                        !line.startsWith("•")) {
                      flushCodeBlock();
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

