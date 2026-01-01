"use client";

// app/learn/page.tsx
// Страница со списком тем для обучения

import { JetBrains_Mono } from "next/font/google";
import { Header } from "../Header";
import { MotivationalQuotes } from "../MotivationalQuotes";
import { AuthModal } from "../AuthModal";
import { useAuth } from "../useAuth";
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

const topicCategories = [
  {
    id: "git",
    name: "Git",
    description: "Git — это система контроля версий, которая используется практически в каждом проекте разработки. Без знания Git невозможно эффективно работать в команде и управлять кодом.",
    skills: [
      "Работа с репозиториями и историей изменений",
      "Создание и слияние веток",
      "Работа с удаленными репозиториями (GitHub, GitLab)",
      "Разрешение конфликтов и откат изменений"
    ],
    topics: [
      {
        id: "git",
        title: "Git",
        description: "Система контроля версий. Научись работать с репозиториями, ветками, коммитами и удаленными серверами.",
        href: "/learn/git",
        color: "from-orange-500 to-red-500",
        whyLearn: "Git — обязательный инструмент для любого разработчика. Без него невозможно работать в команде, отслеживать изменения в коде и управлять версиями проекта. Знание Git требуется на 100% вакансий разработчика.",
        tasks: [
          "Создавать и управлять репозиториями",
          "Работать с ветками и слиянием изменений",
          "Синхронизировать код с удаленными репозиториями",
          "Разрешать конфликты при совместной работе",
          "Откатывать изменения и восстанавливать код"
        ],
        codeExample: `# Инициализация репозитория
git init

# Добавление файлов в индекс
git add .

# Создание коммита
git commit -m "Добавлена новая функция"

# Создание и переключение на ветку
git checkout -b feature/new-feature

# Слияние веток
git merge feature/new-feature

# Отправка на удаленный репозиторий
git push origin main`
      }
    ]
  },
  {
    id: "java",
    name: "Java",
    description: "Java — один из самых популярных языков программирования для создания enterprise-приложений. Изучение Java открывает путь к разработке серверных приложений, веб-сервисов и мобильных приложений.",
    skills: [
      "Понимание основ программирования и синтаксиса Java",
      "Работа с коллекциями и структурами данных",
      "Объектно-ориентированное программирование",
      "Подготовка к изучению фреймворков (Spring, Hibernate)"
    ],
    topics: [
      {
        id: "java-core",
        title: "Java Core",
        description: "Основы языка Java: переменные, типы данных, операторы, условия, циклы, методы и основы ООП.",
        href: "/learn/java-core",
        color: "from-blue-500 to-cyan-500",
        whyLearn: "Java Core — это фундамент всего программирования на Java. Без понимания основ невозможно двигаться дальше к изучению фреймворков и созданию реальных приложений. Это база, на которой строится вся дальнейшая карьера Java-разработчика.",
        tasks: [
          "Писать простые программы на Java",
          "Работать с переменными и типами данных",
          "Использовать условия и циклы для логики программы",
          "Создавать и вызывать методы",
          "Понимать основы объектно-ориентированного подхода"
        ],
        codeExample: `class Main {
  public static void main(String[] args) {
    // Переменные и типы
    String name = "Анна";
    int age = 25;
    
    // Условия
    if (age >= 18) {
      System.out.println(name + " - совершеннолетний");
    } else {
      System.out.println(name + " - несовершеннолетний");
    }
    
    // Циклы
    for (int i = 1; i <= 5; i++) {
      System.out.println("Итерация: " + i);
    }
    
    // Вызов метода
    greet(name);
  }
  
  static void greet(String name) {
    System.out.println("Привет, " + name + "!");
  }
}`
      },
      {
        id: "java-collections",
        title: "Java Collections",
        description: "Коллекции в Java: List, Set, Map. Изучи структуры данных и научись эффективно работать с ними.",
        href: "/learn/java-collections",
        color: "from-purple-500 to-pink-500",
        whyLearn: "Коллекции используются в 99% Java-приложений. Без понимания List, Set и Map невозможно эффективно работать с данными. Это критически важный навык для решения реальных задач в разработке.",
        tasks: [
          "Хранить и обрабатывать списки данных (List)",
          "Работать с уникальными наборами данных (Set)",
          "Создавать пары ключ-значение (Map)",
          "Выбирать правильную коллекцию для задачи",
          "Эффективно итерироваться по данным"
        ],
        codeExample: `import java.util.*;

class CollectionsExample {
  public static void main(String[] args) {
    // List - упорядоченный список
    List<String> names = new ArrayList<>();
    names.add("Анна");
    names.add("Иван");
    names.add("Мария");
    
    // Set - уникальные элементы
    Set<Integer> numbers = new HashSet<>();
    numbers.add(1);
    numbers.add(2);
    numbers.add(1); // дубликат не добавится
    
    // Map - пары ключ-значение
    Map<String, Integer> ages = new HashMap<>();
    ages.put("Анна", 25);
    ages.put("Иван", 30);
    
    // Итерация по коллекциям
    for (String name : names) {
      System.out.println(name);
    }
  }
}`
      },
      {
        id: "java-oop",
        title: "Java OOP",
        description: "Объектно-ориентированное программирование: классы, наследование, полиморфизм, инкапсуляция, абстракция.",
        href: "/learn/java-oop",
        color: "from-green-500 to-emerald-500",
        whyLearn: "ООП — это основа современной разработки на Java. Все фреймворки и библиотеки построены на принципах ООП. Без глубокого понимания классов, наследования и полиморфизма невозможно писать качественный и поддерживаемый код.",
        tasks: [
          "Создавать классы и объекты",
          "Использовать наследование для переиспользования кода",
          "Применять полиморфизм для гибкости программ",
          "Инкапсулировать данные и методы",
          "Проектировать архитектуру приложений"
        ],
        codeExample: `// Базовый класс
class Animal {
  private String name; // инкапсуляция
  
  public Animal(String name) {
    this.name = name;
  }
  
  public void makeSound() {
    System.out.println("Животное издает звук");
  }
}

// Наследование
class Dog extends Animal {
  public Dog(String name) {
    super(name);
  }
  
  // Полиморфизм - переопределение метода
  @Override
  public void makeSound() {
    System.out.println("Гав-гав!");
  }
}

// Использование
Animal animal = new Dog("Бобик");
animal.makeSound(); // Гав-гав!`
      }
    ]
  }
  // В будущем добавим блок Spring
];

export default function LearnPage() {
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
        {/* Фиксированная навигация слева */}
        <nav className="fixed left-0 top-[20vh] w-56 h-[calc(100vh-20vh)] overflow-y-auto pl-8 pr-4 py-6 z-10">
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

        <Header leftButton={{ href: "/", text: "На главную" }} />
        <MotivationalQuotes />
        <main>
          <section className="mx-auto max-w-6xl px-5 py-14 md:py-20">
            <div className="space-y-6 mb-12">
              <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-main)] md:text-4xl">
                Выбери тему для изучения
              </h1>
              <p className="text-base leading-relaxed text-[var(--text-muted)] max-w-3xl">
                Изучай материалы в удобном для тебя порядке. Каждая тема содержит теорию, практические примеры и задания.
              </p>
            </div>

            <div className="space-y-12">
              {topicCategories.map((category, categoryIndex) => (
                <div key={category.id} className="space-y-8">
                  {/* Основное описание категории - слева */}
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-main)]">
                      {category.name}
                    </h2>
                    <p className="text-base leading-relaxed text-[var(--text-muted)] max-w-4xl">
                      {category.description}
                    </p>
                    <div className="mt-4">
                      <p className="text-sm font-medium text-[var(--text-main)] mb-3">
                        После освоения ты получишь навыки:
                      </p>
                      <ul className="space-y-2">
                        {category.skills.map((skill, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                            <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--button-bg)] mt-1.5" />
                            <span>{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {/* Блоки подтем: карточка слева, описание справа */}
                  <div className="space-y-6">
                    {category.topics.map((topic) => (
                      <div key={topic.id} className="grid gap-6 md:grid-cols-[1fr_1fr] items-start">
                        {/* Карточка подтемы - слева */}
                        <TopicCard 
                          topic={topic} 
                          codeExample={topic.codeExample} 
                          language={topic.id === "git" ? "bash" : "java"}
                          onAuthRequest={(mode) => {
                            setAuthMode(mode);
                            setAuthModalOpen(true);
                          }}
                        />
                        
                        {/* Описание подтемы - справа */}
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-lg font-semibold text-[var(--text-main)] mb-2">
                              {topic.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                              {topic.description}
                            </p>
                          </div>
                          
                          {topic.whyLearn && (
                            <div>
                              <p className="text-xs font-medium text-[var(--text-main)] mb-2">
                                Для чего это нужно:
                              </p>
                              <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                                {topic.whyLearn}
                              </p>
                            </div>
                          )}
                          
                          {/* Блок "После освоения сможешь" - справа */}
                          {topic.tasks && topic.tasks.length > 0 && (
                            <div>
                              <p className="text-xs font-medium text-[var(--text-main)] mb-2">
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
                  
                  {categoryIndex < topicCategories.length - 1 && (
                    <div className="pt-6 border-t border-[var(--border-main)]"></div>
                  )}
                </div>
              ))}
              {/* Разделитель для будущего блока Spring */}
              <div className="border-t border-[var(--border-main)]"></div>
            </div>
          </section>
        </main>
        <Footer />
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
  topic: { id: string; title: string; description: string; href: string; color: string };
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

  // Обработчик клика вне уведомления
  useEffect(() => {
    if (!showAuthNotification) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsClosing(true);
        // Ждем завершения анимации перед полным скрытием
        setTimeout(() => {
          setShowAuthNotification(false);
          setIsClosing(false);
        }, 300);
      }
    };

    // Добавляем небольшую задержку, чтобы не закрыть сразу после открытия
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
      // Автоматически скрываем уведомление через 5 секунд
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
      <div className="flex items-start gap-4 mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center text-white font-semibold text-lg shrink-0`}>
          {topic.title.charAt(0)}
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold tracking-tight text-[var(--text-main)] mb-2">
            {topic.title}
          </h2>
          <p className="text-sm leading-relaxed text-[var(--text-muted)]">
            {topic.description}
          </p>
        </div>
      </div>
      
      {/* Пример кода внутри карточки */}
      {codeExample && language && (
        <div className="mb-4 rounded-xl border border-[var(--border-main)] bg-[var(--bg-secondary)] p-4">
          <div className="rounded-lg border border-[var(--border-main)] bg-[var(--bg-card)] p-3 overflow-x-auto">
            <div className="max-h-[200px] overflow-y-auto">
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
            Начать {topic.title}
          </Link>
        ) : (
          <button
            onClick={handleStartClick}
            className="inline-flex items-center justify-center rounded-xl bg-[var(--button-bg)] px-6 py-3 text-sm font-semibold text-[var(--button-text)] hover:bg-[var(--button-hover)] transition-colors w-full"
          >
            Начать {topic.title}
          </button>
        )}
        
        {/* Плавное уведомление о необходимости авторизации */}
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

function Footer() {
  return (
    <footer className="border-t border-[var(--border-main)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-xs text-[var(--text-muted)] md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Java с нуля до Middle</p>
        <div className="flex gap-4">
          <Link className="hover:text-[var(--text-main)]" href="/">
            На главную
          </Link>
        </div>
      </div>
    </footer>
  );
}

