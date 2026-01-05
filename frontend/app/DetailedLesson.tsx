"use client";

import { useAuth } from "./useAuth";
import { useState, useEffect, useCallback } from "react";
import { triggerActivityUpdate } from "./utils/activityTracker";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

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
  'keyword': { color: '#0000ff' },
  'span[class*="keyword"]': { color: '#0000ff' },
  'code[class*="language-"] span[class*="keyword"]': { color: '#0000ff' },
  'class-name': { color: '#0066cc' },
  'function': { color: '#006600' },
  'variable': { color: '#000000' },
  'string': { color: '#008000' },
  'char': { color: '#008000' },
  'number': { color: '#0000ff' },
  'boolean': { color: '#0000ff' },
  'constant': { color: '#0000ff' },
  'property': { color: '#ffc800' },
  'tag': { color: '#ffc800' },
  'attr-name': { color: '#ffc800' },
  'attr-value': { color: '#808080' },
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
  'comment': { color: '#808080', fontStyle: 'italic' },
  'prolog': { color: '#808080', fontStyle: 'italic' },
  'doctype': { color: '#808080', fontStyle: 'italic' },
  'cdata': { color: '#808080', fontStyle: 'italic' },
  'punctuation': { color: '#a9b7c6' },
  'operator': { color: '#a9b7c6' },
  'keyword': { color: '#cc7832' },
  'span[class*="keyword"]': { color: '#cc7832' },
  'code[class*="language-"] span[class*="keyword"]': { color: '#cc7832' },
  'class-name': { color: '#4eade5' },
  'function': { color: '#e6b85c' },
  'variable': { color: '#a9b7c6' },
  'string': { color: '#6a8759' },
  'char': { color: '#6a8759' },
  'number': { color: '#6897bb' },
  'boolean': { color: '#6897bb' },
  'constant': { color: '#6897bb' },
  'property': { color: '#cc7832' },
  'tag': { color: '#cc7832' },
  'attr-name': { color: '#629755' },
  'attr-value': { color: '#6a8759' },
  'builtin': { color: '#6a8759' },
  'symbol': { color: '#6897bb' },
  'deleted': { color: '#6897bb' },
  'inserted': { color: '#6a8759' },
  'entity': { color: '#a9b7c6' },
  'url': { color: '#a9b7c6' },
  'atrule': { color: '#cc7832' },
  'regex': { color: '#a9b7c6' },
  'important': { color: '#a9b7c6', fontWeight: 'bold' },
};

interface DetailedLessonProps {
  materialId: string;
  title: string;
  description: string;
  sections: Array<{ subtitle: string; content: string[] }>;
}

export function DetailedLesson({ 
  materialId,
  title, 
  description, 
  sections 
}: DetailedLessonProps) {
  const { user } = useAuth();
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [isDark, setIsDark] = useState(false);

  const checkCompletionStatus = useCallback(async () => {
    if (!user || !materialId) {
      setCheckingStatus(false);
      return;
    }

    try {
      // Используем query parameter вместо path variable
      const encodedMaterialId = encodeURIComponent(materialId);
      const response = await fetch(`/api/statistics/materials/status?materialId=${encodedMaterialId}`, {
        credentials: "include",
      });

      if (response.ok) {
        const isCompleted = await response.json();
        setCompleted(isCompleted);
      }
    } catch (err) {
      console.error("Ошибка проверки статуса:", err);
    } finally {
      setCheckingStatus(false);
    }
  }, [user, materialId]);

  // Проверяем статус завершения материала при загрузке
  useEffect(() => {
    checkCompletionStatus();
  }, [checkCompletionStatus]);

  // Перепроверяем статус при возврате на страницу (например, после отката материала)
  useEffect(() => {
    const handleFocus = () => {
      if (user && materialId) {
        checkCompletionStatus();
      }
    };
    
    // Слушаем события обновления статуса материала с доски задач
    const handleMaterialUncompleted = (event: CustomEvent) => {
      const eventMaterialId = event.detail?.materialId;
      console.log('Material uncompleted event received:', { eventMaterialId, currentMaterialId: materialId });
      if (eventMaterialId === materialId) {
        console.log('Material uncompleted - updating status for:', materialId);
        // Сразу обновляем состояние
        setCompleted(false);
        // Перепроверяем статус через API для надежности
        setTimeout(() => {
          checkCompletionStatus();
        }, 200);
      }
    };
    
    const handleMaterialCompleted = (event: CustomEvent) => {
      const eventMaterialId = event.detail?.materialId;
      console.log('Material completed event received:', { eventMaterialId, currentMaterialId: materialId });
      if (eventMaterialId === materialId) {
        console.log('Material completed - updating status for:', materialId);
        // Сразу обновляем состояние
        setCompleted(true);
        // Перепроверяем статус через API для надежности
        setTimeout(() => {
          checkCompletionStatus();
        }, 200);
      } else {
        console.log('Material ID mismatch:', { eventMaterialId, currentMaterialId: materialId });
      }
    };
    
    // Добавляем обработчики событий
    window.addEventListener('focus', handleFocus);
    window.addEventListener('materialUncompleted', handleMaterialUncompleted as EventListener);
    window.addEventListener('materialCompleted', handleMaterialCompleted as EventListener);
    
    // Глобальный слушатель для отладки
    const debugListener = (event: Event) => {
      const customEvent = event as CustomEvent;
      console.log('Global event listener:', {
        type: event.type,
        materialId: customEvent.detail?.materialId,
        currentMaterialId: materialId
      });
    };
    window.addEventListener('materialCompleted', debugListener);
    window.addEventListener('materialUncompleted', debugListener);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('materialUncompleted', handleMaterialUncompleted as EventListener);
      window.removeEventListener('materialCompleted', handleMaterialCompleted as EventListener);
      window.removeEventListener('materialCompleted', debugListener);
      window.removeEventListener('materialUncompleted', debugListener);
    };
  }, [user, materialId, checkCompletionStatus]);

  // Определяем тему (светлая/темная)
  useEffect(() => {
    const checkTheme = () => {
      const html = document.documentElement;
      const isDarkMode = html.classList.contains('dark') || 
                        html.getAttribute('data-theme') === 'dark' ||
                        window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(isDarkMode);
    };

    checkTheme();

    // Отслеживаем изменения темы
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    });

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', checkTheme);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener('change', checkTheme);
    };
  }, []);

  const isCodeLine = (line: string): boolean => {
    const trimmed = line.trim();
    
    if (trimmed === "") return false;
    
    // Строки, начинающиеся с маркера "•", не являются кодом
    if (trimmed.startsWith("•")) return false;
    
    // Строки с отступом (4+ пробела)
    if (line.match(/^\s{4,}/)) return true;
    
    // Комментарии
    if (trimmed.startsWith("//")) return true;
    
    // Фигурные скобки
    if (trimmed === "}" || trimmed === "{" || trimmed.startsWith("}") || trimmed.startsWith("{")) {
      return true;
    }
    
    // Ключевые слова Java
    const javaKeywords = ["public", "private", "protected", "static", "final", "class", "interface", 
                          "enum", "abstract", "extends", "implements", "import", "package", "return",
                          "if", "else", "for", "while", "do", "switch", "case", "break", "continue",
                          "try", "catch", "finally", "throw", "throws", "new", "this", "super", "void",
                          "default"];
    
    // Специальная проверка для switch с круглыми скобками (должна быть до общей проверки ключевых слов)
    if (/^switch\s*\(/.test(trimmed)) return true;
    
    // Специальная проверка для case с двоеточием (может быть с отступом или без)
    if (/^\s*case\s+.*:/.test(line) || /^case\s+.*:/.test(trimmed)) return true;
    
    // Специальная проверка для default с двоеточием (может быть с отступом или без)
    if (/^\s*default:/.test(line) || trimmed === "default:" || trimmed.startsWith("default:")) return true;
    
    // Проверяем ключевые слова более точно
    if (javaKeywords.some(keyword => {
      // Точное совпадение
      if (trimmed === keyword) return true;
      // Начинается с ключевого слова и пробела или скобки
      if (trimmed.startsWith(keyword + " ") || trimmed.startsWith(keyword + "(") || trimmed.startsWith(keyword + "<")) return true;
      return false;
    })) {
      return true;
    }
    
    // Типы данных и классы
    const javaTypePattern = /^(int|String|double|boolean|char|byte|short|long|float|List|ArrayList|LinkedList|Iterator|Collections|Arrays|Integer|User|Task)\s*[<\(=]/;
    if (javaTypePattern.test(trimmed)) return true;
    
    // Объявления переменных с типами
    if (/^(List|ArrayList|LinkedList|Iterator|Collections|Arrays|Integer|String|int|double|boolean|char|byte|short|long|float)\s*<.*>\s*\w+\s*=/.test(trimmed)) {
      return true;
    }
    
    // System.out
    if (line.includes("System.out")) return true;
    
    // Вызовы методов
    if (/^[a-zA-Z_][a-zA-Z0-9_]*\s*\(/.test(trimmed) || /^[a-zA-Z_][a-zA-Z0-9_]*\.[a-zA-Z_][a-zA-Z0-9_]*\s*\(/.test(trimmed)) {
      return true;
    }
    
    // Присваивания с типами
    if (line.includes("=") && (line.includes("int ") || line.includes("String ") || line.includes("double ") || 
        line.includes("boolean ") || line.includes("char ") || line.includes("List<") || line.includes("ArrayList<") || 
        line.includes("LinkedList<") || line.includes("Iterator<") || line.includes("Collections.") || line.includes("Arrays."))) {
      return true;
    }
    
    // Лямбда-выражения и операторы
    if (line.includes("->") || line.includes("++") || line.includes("--") || trimmed.startsWith("@")) {
      return true;
    }
    
    // Строки с точкой с запятой в конце (обычно код)
    if (trimmed.endsWith(";") && !trimmed.startsWith("•")) {
      return true;
    }
    
    // Строки с угловыми скобками (generics)
    if (line.includes("<") && line.includes(">")) {
      return true;
    }
    
    // Строки с квадратными скобками (массивы, индексы)
    if (line.includes("[") && line.includes("]") && !line.startsWith("•")) {
      return true;
    }
    
    // Вызовы методов через точку
    if (/\.\w+\s*\(/.test(line) || /\.\w+\s*\[/.test(line)) {
      return true;
    }
    
    return false;
  };

  const isCommandLine = (line: string): boolean => {
    return line.startsWith("java ") || line.startsWith("javac ") || line.startsWith("brew ") || 
           line.startsWith("sudo ") || line.startsWith("cd ") || line.startsWith("git ");
  };

  const handleComplete = async () => {
    if (!user) {
      alert("Для завершения материала необходимо войти в систему");
      return;
    }

    setLoading(true);
    try {
      // Используем query parameter вместо path variable
      const encodedMaterialId = encodeURIComponent(materialId);
      const response = await fetch(`/api/statistics/materials/complete?materialId=${encodedMaterialId}`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        // Устанавливаем статус как завершенный
        console.log("Материал успешно завершен, обновляем UI");
        setCompleted(true);
        // Обновляем трекер активности
        triggerActivityUpdate();
        console.log("Статус completed установлен в:", true);
      } else {
        const errorText = await response.text();
        console.error("Ошибка сохранения прогресса:", errorText);
        alert(errorText || "Ошибка при сохранении прогресса");
      }
    } catch (err) {
      console.error("Ошибка:", err);
      alert("Ошибка при сохранении прогресса");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)] p-6 shadow-sm">
      <h3 className="text-lg font-semibold tracking-tight text-[var(--text-main)] mb-2">
        {title}
      </h3>
      <p className="text-sm text-[var(--text-muted)] mb-6">
        {description}
      </p>
      
      {/* Информационное сообщение о завершении материала */}
      {!completed && (
        <div className="mb-6 p-4 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <span className="font-semibold">Важно:</span> После изучения материала нажмите кнопку <span className="font-semibold">"Завершить материал"</span> внизу страницы, чтобы статистика по пройденному материалу отображалась в вашем личном кабинете.
            </p>
          </div>
        </div>
      )}
      
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
                  let currentTreeStructure: string[] = [];
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

                  const flushTreeStructure = () => {
                    if (currentTreeStructure.length > 0) {
                      const tree = currentTreeStructure.join("\n");
                      elements.push(
                        <div key={keyIndex++} className="rounded-lg border border-[var(--border-main)] bg-[var(--bg-card)] p-3 overflow-x-auto my-2">
                          <pre className="text-xs text-[var(--text-main)] whitespace-pre m-0 leading-relaxed font-mono" style={{ 
                            fontFamily: '"Courier New", Courier, "Lucida Console", Monaco, "Consolas", "Liberation Mono", monospace',
                            letterSpacing: '0',
                            tabSize: 2,
                            whiteSpace: 'pre',
                            wordSpacing: '0'
                          }}>
                            {tree}
                          </pre>
                        </div>
                      );
                      currentTreeStructure = [];
                    }
                  };

                  const flushCodeBlock = () => {
                    if (currentCodeBlock.length > 0) {
                      const code = currentCodeBlock.join("\n");
                      // Определяем язык: если есть Java-специфичные конструкции, то Java, иначе bash
                      const isJava = code.includes("public class") || 
                                    code.includes("System.out") || 
                                    code.includes("List<") || 
                                    code.includes("ArrayList<") || 
                                    code.includes("LinkedList<") ||
                                    code.includes("import java") ||
                                    code.includes("Collections.") ||
                                    code.includes("Arrays.") ||
                                    code.includes("Iterator<") ||
                                    code.includes("for (") ||
                                    code.includes("while (") ||
                                    code.includes("if (") ||
                                    code.includes("switch (") ||
                                    code.includes("switch(") ||
                                    code.includes("case ") ||
                                    code.includes("default:") ||
                                    code.includes("break;") ||
                                    code.includes("new ") ||
                                    code.includes("int ") ||
                                    code.includes("String ") ||
                                    code.includes("boolean ") ||
                                    code.includes("void ") ||
                                    code.includes("return ") ||
                                    code.includes("public ") ||
                                    code.includes("private ") ||
                                    code.includes("static ");
                      // Определяем язык более точно: если есть switch, case, default - точно Java
                      const hasSwitch = code.includes("switch") || code.includes("case") || code.includes("default:");
                      const language = (isJava || hasSwitch) ? "java" : "bash";
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
                    
                    if (trimmedLine === "") {
                      if (currentTreeStructure.length > 0) {
                        currentTreeStructure.push("");
                        return;
                      }
                      if (currentCodeBlock.length > 0) {
                        currentCodeBlock.push("");
                        return;
                      }
                      if (isCodeLine(nextLine) || isCommandLine(nextLine)) {
                        flushParagraph();
                        return;
                      }
                      // Проверяем структуру папок
                      if (nextLine.includes("├──") || nextLine.includes("│") || nextLine.includes("└──")) {
                        flushParagraph();
                        flushCodeBlock();
                        return;
                      }
                      // Игнорируем пустые строки между нумерованными пунктами или маркированными списками
                      if (nextLineTrimmed.match(/^\d+\.\s/) || nextLineTrimmed.startsWith("•")) {
                        flushParagraph();
                        return;
                      }
                      flushParagraph();
                      flushCodeBlock();
                      elements.push(<div key={keyIndex++} className="h-2" />);
                      return;
                    }
                    
                    if (line.trim() === "" && line.length > 0 && currentCodeBlock.length > 0) {
                      currentCodeBlock.push("");
                      return;
                    }

                    if (trimmedLine.includes("⚠️") || trimmedLine.includes("ВНИМАНИЕ")) {
                      flushParagraph();
                      elements.push(
                        <p key={keyIndex++} className="text-xs font-medium text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg px-3 py-2">
                          {trimmedLine}
                        </p>
                      );
                      return;
                    }

                    if (isCommandLine(line)) {
                      flushParagraph();
                      if (currentCodeBlock.length > 0) {
                        currentCodeBlock.push(line);
                      } else {
                        flushCodeBlock();
                        currentCodeBlock.push(line);
                      }
                      return;
                    }

                    // Проверяем нумерованный список ДО проверки isCodeLine, чтобы избежать ложных срабатываний
                    if (line.match(/^\d+\.\s/)) {
                      flushParagraph();
                      flushCodeBlock();
                      const match = line.match(/^(\d+)\.\s(.+)/);
                      elements.push(
                        <div key={keyIndex++} className="flex items-start gap-2 ml-2 mb-2">
                          <span className="font-semibold text-[var(--text-main)] shrink-0">{match?.[1]}.</span>
                          <span>{match?.[2]}</span>
                        </div>
                      );
                      return;
                    }

                    // Проверяем структуру папок (символы ├──, │, └──)
                    const isTreeStructure = line.includes("├──") || line.includes("│") || line.includes("└──");
                    
                    if (isTreeStructure) {
                      flushParagraph();
                      flushCodeBlock();
                      if (currentTreeStructure.length > 0) {
                        currentTreeStructure.push(line);
                      } else {
                        flushTreeStructure();
                        currentTreeStructure.push(line);
                      }
                      return;
                    }

                    if (isCodeLine(line)) {
                      flushParagraph();
                      if (currentCodeBlock.length > 0) {
                        currentCodeBlock.push(line);
                      } else {
                        flushCodeBlock();
                        currentCodeBlock.push(line);
                      }
                      return;
                    }

                    if (currentTreeStructure.length > 0) {
                      flushTreeStructure();
                    }
                    if (currentCodeBlock.length > 0) {
                      flushCodeBlock();
                    }

                    if (line.endsWith(":") && !line.includes("•") && line.length < 50) {
                      flushParagraph();
                      elements.push(
                        <p key={keyIndex++} className="font-semibold text-[var(--text-main)] mt-3 first:mt-0">
                          {line}
                        </p>
                      );
                      return;
                    }

                    if (line.startsWith("•")) {
                      flushParagraph();
                      elements.push(
                        <div key={keyIndex++} className="flex items-start gap-2 ml-2 mb-2">
                          <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--button-bg)] mt-1.5" />
                          <span>{line.replace(/^•\s*/, "")}</span>
                        </div>
                      );
                      return;
                    }

                    currentParagraph.push(trimmedLine);
                  });

                  flushParagraph();
                  flushTreeStructure();
                  flushCodeBlock();
                  return elements;
                })()}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Кнопка завершения */}
      <div className="mt-6 pt-6 border-t border-[var(--border-main)]">
        {completed ? (
          <div className="flex items-center gap-2 text-sm text-green-500">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Материал завершен</span>
          </div>
        ) : (
          <button
            onClick={handleComplete}
            disabled={loading || !user}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-[var(--button-bg)] px-6 py-2.5 text-sm font-semibold text-[var(--button-text)] hover:bg-[var(--button-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Сохранение..." : "Завершить материал"}
          </button>
        )}
      </div>
    </div>
  );
}

