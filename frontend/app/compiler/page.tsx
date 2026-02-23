"use client";

import { useState, useEffect } from "react";
import { JetBrains_Mono } from "next/font/google";
import Editor from "react-simple-code-editor";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import Link from "next/link";
import { Header } from "../Header";
import { MotivationalQuotes } from "../MotivationalQuotes";

const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const DEFAULT_CODE = `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`;

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
  'parameter': { color: '#9876aa' },
};

export default function CompilerPage() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [isRunning, setIsRunning] = useState(false);
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

  const handleRun = async () => {
    setIsRunning(true);
    setOutput("");
    setError("");

    try {
      const response = await fetch("/api/compile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.output) {
          setOutput(data.output);
        }
        if (data.error) {
          setError(data.error);
        }
      } else {
        setError(data.error || "Ошибка при выполнении кода");
      }
    } catch (err) {
      setError(`Ошибка соединения: ${err instanceof Error ? err.message : "Неизвестная ошибка"}`);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className={mono.className}>
      <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)]">
        {/* Фиксированная навигация слева */}
        <nav className="hidden lg:block fixed left-0 top-[20vh] w-56 h-[calc(100vh-20vh)] overflow-y-auto pl-8 pr-4 py-6 z-10">
          <div className="space-y-6">
            {/* Основная навигация */}
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
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 bg-[var(--bg-muted)] text-[var(--text-main)] font-medium"
                >
                  <span className="transition-opacity duration-200 opacity-100">Компилятор</span>
                </Link>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                >
                  <span className="transition-opacity duration-200 opacity-70 hover:opacity-100">Личный кабинет</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <Header leftButton={{ href: "/", text: "← На главную" }} />
        <MotivationalQuotes />

        {/* Main Content */}
        <main className="mx-auto max-w-6xl px-5 py-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
            {/* Code Editor */}
            <div className="space-y-3 flex flex-col">
              <div className="flex items-center justify-between min-h-[40px]">
                <h2 className="text-sm font-semibold text-[var(--text-main)]">Код</h2>
                <button
                  onClick={handleRun}
                  disabled={isRunning}
                  className="rounded-lg bg-[var(--button-bg)] px-4 py-2 text-sm font-semibold text-[var(--button-text)] hover:bg-[var(--button-hover)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isRunning ? "Выполняется..." : "▶ Запустить"}
                </button>
              </div>
              <div className="rounded-xl border border-[var(--border-main)] bg-[var(--bg-card)] overflow-hidden flex flex-col h-[600px]">
                <Editor
                  value={code}
                  onValueChange={setCode}
                  highlight={(code) => (
                    <SyntaxHighlighter
                      language="java"
                      style={isDark ? intellijDark : intellijLight}
                      PreTag="span"
                      customStyle={{
                        margin: 0,
                        padding: '16px',
                        background: 'transparent',
                        fontSize: '13px',
                        lineHeight: '1.6',
                        fontFamily: 'inherit',
                        whiteSpace: 'pre',
                        letterSpacing: 'normal',
                        wordSpacing: 'normal',
                      }}
                      codeTagProps={{
                        style: {
                          fontFamily: 'inherit',
                          fontSize: '13px',
                          lineHeight: '1.6',
                          letterSpacing: 'normal',
                          wordSpacing: 'normal',
                        }
                      }}
                    >
                      {code}
                    </SyntaxHighlighter>
                  )}
                  padding={16}
                  style={{
                    fontFamily: 'inherit',
                    fontSize: '13px',
                    lineHeight: '1.6',
                    outline: 'none',
                    backgroundColor: 'var(--bg-card)',
                    color: 'var(--text-main)',
                    width: '100%',
                    height: '100%',
                    overflow: 'auto',
                    whiteSpace: 'pre',
                    letterSpacing: 'normal',
                    wordSpacing: 'normal',
                    margin: 0,
                    textAlign: 'left',
                  }}
                  textareaClassName="editor-textarea"
                  placeholder="Введите Java код..."
                />
              </div>
            </div>

            {/* Output */}
            <div className="space-y-3 flex flex-col">
              <div className="flex items-center justify-between min-h-[40px]">
                <h2 className="text-sm font-semibold text-[var(--text-main)]">Результат</h2>
                <div className="w-24"></div>
              </div>
              <div className="rounded-xl border border-[var(--border-main)] bg-[var(--bg-card)] overflow-hidden flex flex-col h-[600px]">
                <div className="flex-1 p-4 overflow-auto">
                  {isRunning ? (
                    <div className="flex items-center gap-2 text-[var(--text-muted)]">
                      <div className="animate-spin h-4 w-4 border-2 border-[var(--text-muted)] border-t-transparent rounded-full"></div>
                      <span>Компиляция и выполнение...</span>
                    </div>
                  ) : error ? (
                    <pre className="text-sm text-red-600 dark:text-red-400 whitespace-pre-wrap font-mono">
                      {error}
                    </pre>
                  ) : output ? (
                    <pre className="text-sm text-[var(--text-main)] whitespace-pre-wrap font-mono">
                      {output}
                    </pre>
                  ) : (
                    <p className="text-sm text-[var(--text-muted)]">
                      Результат выполнения появится здесь...
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="mt-6 rounded-xl border border-[var(--border-main)] bg-[var(--bg-secondary)] p-4">
            <p className="text-sm text-[var(--text-muted)]">
              <strong className="text-[var(--text-main)]">Примечание:</strong> Код выполняется в
              изолированной среде с ограничениями по времени и ресурсам. Для работы требуется класс
              с методом <code className="px-1.5 py-0.5 rounded bg-[var(--bg-card)]">main</code>.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

