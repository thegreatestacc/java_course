"use client";

import { JetBrains_Mono } from "next/font/google";
import { Header } from "../../Header";
import { MotivationalQuotes } from "../../MotivationalQuotes";
import { Footer } from "../../components/Footer";
import { AuthModal } from "../../AuthModal";
import { useAuth } from "../../useAuth";
import Link from "next/link";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import React, { useState, useEffect } from "react";

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

interface Topic {
  id: string;
  title: string;
  description: string;
  href: string;
  color: string;
  whyLearn?: string;
  tasks?: string[];
  codeExample?: string;
}

const topics: Topic[] = [
  {
    id: "introduction",
    title: "Что такое чистая архитектура",
    description: "Изучи основы чистой архитектуры: что это такое, зачем она нужна и какие цели преследует. Пойми, как создавать код, который легко тестировать, изменять и поддерживать.",
    href: "/learn/clean-architecture/introduction",
    color: "from-green-500 to-emerald-500",
    whyLearn: "Чистая архитектура — это основа профессиональной разработки. Без понимания этих принципов невозможно создавать масштабируемые и поддерживаемые приложения. Знание чистой архитектуры требуется на большинстве позиций Middle+ уровня.",
    tasks: [
      "Понимать цели и принципы чистой архитектуры",
      "Создавать независимую от фреймворков бизнес-логику",
      "Проектировать тестируемый код",
      "Разделять ответственность между слоями приложения",
      "Создавать гибкую и расширяемую архитектуру"
    ]
  },
  {
    id: "solid",
    title: "Принципы SOLID",
    description: "Изучи пять фундаментальных принципов объектно-ориентированного программирования: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation и Dependency Inversion.",
    href: "/learn/clean-architecture/solid",
    color: "from-blue-500 to-cyan-500",
    whyLearn: "SOLID — это основа чистого кода. Эти принципы помогают создавать код, который легко понимать, тестировать и расширять. Знание SOLID обязательно для любого профессионального разработчика.",
    tasks: [
      "Применять принцип единственной ответственности",
      "Проектировать расширяемые системы без модификации",
      "Создавать правильные иерархии наследования",
      "Разделять интерфейсы по назначению",
      "Использовать инверсию зависимостей"
    ],
    codeExample: `// Пример применения SOLID
interface PaymentMethod {
  void pay();
}

class CreditCardPayment implements PaymentMethod {
  public void pay() {
    // Реализация оплаты картой
  }
}

class PaymentProcessor {
  private PaymentMethod method;
  
  public PaymentProcessor(PaymentMethod method) {
    this.method = method;
  }
  
  public void processPayment() {
    method.pay();
  }
}`
  },
  {
    id: "kiss",
    title: "KISS (Keep It Simple, Stupid)",
    description: "Изучи принцип простоты в программировании. Научись выбирать простые решения вместо сложных, избегать преждевременной оптимизации и писать понятный код.",
    href: "/learn/clean-architecture/kiss",
    color: "from-purple-500 to-pink-500",
    whyLearn: "KISS помогает избежать переусложнения кода. Простые решения легче понимать, тестировать и поддерживать. Этот принцип особенно важен для начинающих разработчиков.",
    tasks: [
      "Выбирать простые решения вместо сложных",
      "Избегать преждевременной оптимизации",
      "Писать понятный и читаемый код",
      "Упрощать сложные конструкции",
      "Балансировать между простотой и функциональностью"
    ],
    codeExample: `// Плохо - излишне сложно
public boolean isEven(int number) {
  return number % 2 == 0 ? true : false;
}

// Хорошо - просто и понятно
public boolean isEven(int number) {
  return number % 2 == 0;
}`
  },
  {
    id: "dry",
    title: "DRY (Don't Repeat Yourself)",
    description: "Изучи принцип избегания дублирования кода. Научись выявлять повторяющиеся паттерны, создавать переиспользуемые компоненты и поддерживать единый источник правды.",
    href: "/learn/clean-architecture/dry",
    color: "from-orange-500 to-red-500",
    whyLearn: "DRY уменьшает количество кода, упрощает поддержку и снижает вероятность ошибок. Нарушение DRY приводит к дублированию логики и сложности в поддержке.",
    tasks: [
      "Выявлять дублирование в коде",
      "Создавать переиспользуемые методы и классы",
      "Избегать копирования логики",
      "Поддерживать единый источник правды",
      "Балансировать между DRY и излишней абстракцией"
    ],
    codeExample: `// Плохо - дублирование
public void processOrder1(Order order) {
  validateOrder(order);
  calculateTotal(order);
  sendEmail(order.getCustomer(), "Order #1 processed");
}

// Хорошо - без дублирования
public void processOrder(Order order) {
  validateOrder(order);
  calculateTotal(order);
  sendEmail(order.getCustomer(), 
    "Order #" + order.getId() + " processed");
}`
  },
  {
    id: "yagni",
    title: "YAGNI (You Aren't Gonna Need It)",
    description: "Изучи принцип добавления функциональности только когда она действительно нужна. Научись избегать преждевременной оптимизации и переусложнения.",
    href: "/learn/clean-architecture/yagni",
    color: "from-yellow-500 to-amber-500",
    whyLearn: "YAGNI помогает сосредоточиться на реальных потребностях и избежать траты времени на ненужные функции. Этот принцип особенно важен в agile-разработке.",
    tasks: [
      "Избегать преждевременной оптимизации",
      "Добавлять функциональность только когда она нужна",
      "Фокусироваться на текущих требованиях",
      "Избегать переусложнения архитектуры",
      "Балансировать между YAGNI и проектированием"
    ],
    codeExample: `// Плохо - избыточная функциональность
class Logger {
  void logToFile() { ... }
  void logToDatabase() { ... }
  void logToCloud() { ... }
  void logToEmail() { ... }
}

// Хорошо - только то, что нужно сейчас
class Logger {
  void log(String message) {
    System.out.println(message);
  }
}`
  },
  {
    id: "layers",
    title: "Слои архитектуры сервисов",
    description: "Изучи структуру чистой архитектуры: Domain, Application, Infrastructure и Presentation слои. Научись правильно разделять ответственность между слоями.",
    href: "/learn/clean-architecture/layers",
    color: "from-indigo-500 to-blue-500",
    whyLearn: "Правильное разделение на слои — основа масштабируемой архитектуры. Понимание слоев необходимо для создания профессиональных приложений.",
    tasks: [
      "Проектировать Domain слой с бизнес-логикой",
      "Создавать Application слой с use cases",
      "Реализовывать Infrastructure слой",
      "Разделять Presentation слой",
      "Обеспечивать правильные зависимости между слоями"
    ],
    codeExample: `com.example.service
  ├── domain
  │   ├── User.java
  │   └── UserRepository.java (интерфейс)
  ├── application
  │   └── CreateUserUseCase.java
  ├── infrastructure
  │   └── JpaUserRepository.java (реализация)
  └── presentation
      └── UserController.java`
  },
  {
    id: "practice",
    title: "Практические советы",
    description: "Изучи практические рекомендации по применению принципов чистой архитектуры. Научись применять теорию на практике и избегать типичных ошибок.",
    href: "/learn/clean-architecture/practice",
    color: "from-teal-500 to-green-500",
    whyLearn: "Теория без практики бесполезна. Эти советы помогут применять принципы чистой архитектуры в реальных проектах и избежать типичных ошибок.",
    tasks: [
      "Начинать с простой архитектуры",
      "Использовать интерфейсы для абстракций",
      "Разделять ответственность классов",
      "Избегать циклических зависимостей",
      "Тестировать изолированно",
      "Рефакторить код при необходимости"
    ]
  }
];

export default function CleanArchitecturePage() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const { user, setUser } = useAuth();

  const handleAuthSuccess = (userData: { id: number; email: string; name: string }) => {
    setUser(userData);
    setAuthModalOpen(false);
  };

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
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 bg-[var(--bg-muted)] text-[var(--text-main)] font-medium"
                >
                  <span className="transition-opacity duration-200 opacity-100">Начать учиться</span>
                </Link>
                <Link
                  href="/compiler"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                >
                  <span className="transition-opacity duration-200 opacity-70 hover:opacity-100">Компилятор</span>
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

        <Header leftButton={{ href: "/learn", text: "← Назад к уровням" }} />
        <MotivationalQuotes />
        <main>
          <section className="mx-auto max-w-6xl px-5 py-14 md:py-20">
            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-3 mb-2">
                <Link
                  href="/learn"
                  className="text-sm text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
                >
                  ← Назад к уровням
                </Link>
              </div>
              <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-main)] md:text-4xl">
                Чистая архитектура сервисов
              </h1>
              <p className="text-base leading-relaxed text-[var(--text-muted)] max-w-3xl">
                Изучи принципы SOLID, KISS, DRY, YAGNI и другие подходы к проектированию чистого, поддерживаемого и масштабируемого кода.
              </p>
            </div>

            <div className="space-y-6">
              {topics.map((topic) => (
                <div key={topic.id} className="grid gap-6 md:grid-cols-[1fr_1fr] items-start">
                  <TopicCard 
                    topic={topic} 
                    codeExample={topic.codeExample} 
                    language="java"
                    onAuthRequest={(mode) => {
                      setAuthMode(mode);
                      setAuthModalOpen(true);
                    }}
                  />
                  
                  <div className="space-y-4">
                    {topic.whyLearn && (
                      <div>
                        <p className="text-lg font-semibold text-[var(--text-main)] mb-2">
                          Для чего это нужно:
                        </p>
                        <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                          {topic.whyLearn}
                        </p>
                      </div>
                    )}
                    
                    {topic.tasks && topic.tasks.length > 0 && (
                      <div>
                        <p className="text-lg font-semibold text-[var(--text-main)] mb-2">
                          После освоения сможешь:
                        </p>
                        <ul className="space-y-1.5">
                          {topic.tasks.map((task, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                              <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--button-bg)] mt-1.5" />
                              <span>{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
        <Footer backLink={{ href: "/learn", text: "Назад к уровням" }} />
      </div>
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        mode={authMode}
      />
    </div>
  );
}

interface TopicCardProps {
  topic: Topic;
  codeExample?: string;
  language?: string;
  onAuthRequest?: (mode: "login" | "register") => void;
}

function TopicCard({ topic, codeExample, language, onAuthRequest }: TopicCardProps) {
  const [isDark, setIsDark] = useState(false);
  const [showAuthNotification, setShowAuthNotification] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const notificationRef = React.useRef<HTMLDivElement>(null);
  const { user } = useAuth();

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

  useEffect(() => {
    if (!showAuthNotification) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsClosing(true);
        setTimeout(() => {
          setShowAuthNotification(false);
          setIsClosing(false);
        }, 300);
      }
    };

    const timeoutId = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAuthNotification]);

  const handleStartClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      setShowAuthNotification(true);
      setIsClosing(false);
      setTimeout(() => {
        setIsClosing(true);
        setTimeout(() => {
          setShowAuthNotification(false);
          setIsClosing(false);
        }, 300);
      }, 5000);
    }
  };

  const handleGoToAuth = (mode: "login" | "register") => {
    if (onAuthRequest) {
      onAuthRequest(mode);
    }
    setIsClosing(true);
    setTimeout(() => {
      setShowAuthNotification(false);
      setIsClosing(false);
    }, 300);
  };

  return (
    <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)] p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4">
        <h2 className="text-xl font-semibold tracking-tight text-[var(--text-main)] mb-2">
          {topic.title}
        </h2>
        <p className="text-sm leading-relaxed text-[var(--text-muted)]">
          {topic.description}
        </p>
      </div>
      
      {codeExample && language && (
        <div className="mb-4 rounded-xl border border-[var(--border-main)] bg-[var(--bg-secondary)] p-4">
          <div className="rounded-lg border border-[var(--border-main)] bg-[var(--bg-card)] p-3 overflow-x-auto">
            <div className="max-h-[200px] overflow-y-auto">
              {codeExample.includes("├──") || codeExample.includes("│") || codeExample.includes("└──") ? (
                <pre className="text-xs text-[var(--text-main)] whitespace-pre m-0 leading-relaxed font-mono" style={{ 
                  fontFamily: '"Courier New", Courier, "Lucida Console", Monaco, "Consolas", "Liberation Mono", monospace',
                  letterSpacing: '0',
                  tabSize: 2,
                  whiteSpace: 'pre',
                  wordSpacing: '0'
                }}>
                  {codeExample}
                </pre>
              ) : (
                <SyntaxHighlighter
                  language={language}
                  style={isDark ? intellijDark : intellijLight}
                  customStyle={{
                    margin: 0,
                    padding: 0,
                    background: 'transparent',
                    fontSize: '12px',
                    lineHeight: '1.5',
                    fontFamily: 'inherit',
                  }}
                  codeTagProps={{
                    style: {
                      fontFamily: 'inherit',
                    },
                  }}
                >
                  {codeExample}
                </SyntaxHighlighter>
              )}
            </div>
          </div>
        </div>
      )}
      
      <div className="relative">
        {user ? (
          <Link
            href={topic.href}
            className="inline-flex items-center justify-center rounded-xl bg-[var(--button-bg)] px-6 py-3 text-sm font-semibold text-[var(--button-text)] hover:bg-[var(--button-hover)] transition-colors w-full"
          >
            Изучить {topic.title}
          </Link>
        ) : (
          <button
            onClick={handleStartClick}
            className="inline-flex items-center justify-center rounded-xl bg-[var(--button-bg)] px-6 py-3 text-sm font-semibold text-[var(--button-text)] hover:bg-[var(--button-hover)] transition-colors w-full"
          >
            Изучить {topic.title}
          </button>
        )}
        
        {showAuthNotification && (
          <div
            ref={notificationRef}
            className="absolute bottom-full left-0 right-0 mb-3 z-50"
            style={{
              animation: isClosing 
                ? "slideOutToBottom 0.3s ease-out forwards"
                : "slideInFromBottom 0.3s ease-out",
            }}
          >
            <div className="rounded-xl border border-[var(--border-main)] bg-[var(--bg-card)] p-4 shadow-lg backdrop-blur-sm">
              <p className="text-sm text-[var(--text-main)] mb-3">
                Для доступа к материалам необходимо войти в систему или зарегистрироваться.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleGoToAuth("login")}
                  className="flex-1 rounded-lg border border-[var(--border-main)] bg-[var(--bg-card)] px-4 py-2 text-sm font-semibold text-[var(--text-main)] hover:bg-[var(--bg-muted)] transition-colors"
                >
                  Войти
                </button>
                <button
                  onClick={() => handleGoToAuth("register")}
                  className="flex-1 rounded-lg bg-[var(--button-bg)] px-4 py-2 text-sm font-semibold text-[var(--button-text)] hover:bg-[var(--button-hover)] transition-colors"
                >
                  Зарегистрироваться
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
