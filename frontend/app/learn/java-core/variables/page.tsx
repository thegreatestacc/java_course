"use client";

// app/learn/java-core/variables/page.tsx
// Страница с теоретическим материалом по переменным и типам в Java

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
    
    // Пустые строки не являются кодом
    if (trimmed === "") return false;
    
    // Исключаем описания синтаксиса на русском языке (например, "тип имя_переменной;")
    if (trimmed.match(/^[а-яА-ЯёЁ]/) && !trimmed.startsWith("//")) {
      // Если это не комментарий с русским текстом, то это описание, а не код
      return false;
    }
    
    // Комментарии
    if (trimmed.startsWith("//")) return true;
    
    // Аннотации
    if (trimmed.startsWith("@")) return true;
    
    // Ключевые слова Java в начале строки
    const javaKeywords = ["public", "private", "protected", "static", "final", "class", "interface", 
                          "enum", "abstract", "extends", "implements", "import", "package", "return",
                          "if", "else", "for", "while", "do", "switch", "case", "break", "continue",
                          "try", "catch", "finally", "throw", "throws", "new", "this", "super"];
    if (javaKeywords.some(keyword => trimmed.startsWith(keyword + " ") || trimmed.startsWith(keyword + "("))) {
      return true;
    }
    
    // Типы данных Java с объявлением переменной (int age, String name, double price = 99.99, и т.д.)
    const javaTypes = ["int", "String", "double", "boolean", "char", "byte", "short", "long", "float",
                       "Integer", "Double", "Boolean", "Character", "Byte", "Short", "Long", "Float",
                       "List", "ArrayList", "Map", "HashMap", "Set", "HashSet"];
    if (javaTypes.some(type => {
      const typePattern = new RegExp(`^${type}\\s+\\w+`);
      return typePattern.test(trimmed);
    })) {
      return true;
    }
    
    // Присваивание с типом (int x = 10, String name = "test", и т.д.)
    if (javaTypes.some(type => {
      const assignPattern = new RegExp(`${type}\\s+\\w+\\s*=`);
      return assignPattern.test(trimmed);
    })) {
      return true;
    }
    
    // Вызовы методов (System.out.println, name.length(), и т.д.)
    if (!!trimmed.match(/^\w+\.\w+\(/) || trimmed.includes("System.out") || trimmed.includes(".length()") ||
        trimmed.includes(".equals(") || trimmed.includes(".substring(") || trimmed.includes(".toUpperCase()") ||
        trimmed.includes(".toLowerCase()") || trimmed.includes("Integer.parseInt") || 
        trimmed.includes("String.valueOf")) {
      return true;
    }
    
    // Операторы и синтаксис Java
    if (trimmed.includes("->") || trimmed.includes("++") || trimmed.includes("--") ||
        trimmed.startsWith("}") || trimmed.startsWith("{") || trimmed.endsWith(";") ||
        !!trimmed.match(/^\w+\s*=\s*[^=]/) || !!trimmed.match(/\(.*\)\s*->/) ||
        !!trimmed.match(/^\w+\s*\(.*\)\s*\{/) || !!trimmed.match(/^\w+\s*\(.*\)\s*;/)) {
      return true;
    }
    
    // Строки с кавычками (строковые литералы)
    if (!!trimmed.match(/["']/) && (trimmed.includes("=") || trimmed.includes("String"))) {
      return true;
    }
    
    // Синтаксис объявления переменных (тип имя_переменной; или тип имя_переменной = значение;)
    // Это общий паттерн, который может быть кодом
    if (!!trimmed.match(/^\w+\s+\w+\s*[=;]/) && !trimmed.startsWith("•")) {
      return true;
    }
    
    return false;
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
                          ".toLowerCase()", "new ", "class ", "interface ", "enum "
                        ];
                        if (javaIndicators.some(indicator => code.includes(indicator))) {
                          language = "java";
                        } else {
                          // По умолчанию для страницы о переменных - это Java
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

