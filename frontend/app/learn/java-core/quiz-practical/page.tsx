"use client";

import { useState, useEffect, useRef } from "react";
import { JetBrains_Mono } from "next/font/google";
import { Header } from "../../../Header";
import { MotivationalQuotes } from "../../../MotivationalQuotes";
import { useAuth } from "../../../useAuth";
import { recordActivity, triggerActivityUpdate } from "../../../utils/activityTracker";
import Link from "next/link";

const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

interface PracticalQuestion {
  id: number;
  question: string;
  correctAnswer: string;
  theory: string;
}

// Функция для перемешивания массива (алгоритм Fisher-Yates)
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const originalQuestions: PracticalQuestion[] = [
  // Основы Java (basics) - 10 вопросов
  {
    id: 1,
    question: "Как объявить метод main в Java?",
    correctAnswer: "public static void main(String[] args)",
    theory: "Метод main — это точка входа в Java программу. Он должен быть объявлен как `public static void main(String[] args)`. Модификаторы `public` и `static` обязательны, `void` означает, что метод ничего не возвращает, `String[] args` — массив аргументов командной строки."
  },
  {
    id: 2,
    question: "Как вывести текст в консоль в Java?",
    correctAnswer: "System.out.println",
    theory: "Для вывода текста в консоль используется `System.out.println(\"текст\");`. Метод `println` выводит текст и переходит на новую строку. Для вывода без перевода строки используется `System.out.print(\"текст\");`"
  },
  {
    id: 3,
    question: "Как объявить класс в Java?",
    correctAnswer: "public class MyClass",
    theory: "Класс объявляется с помощью ключевого слова `class`. Синтаксис: `public class ИмяКласса { }`. Имя класса должно совпадать с именем файла (без расширения .java)."
  },
  {
    id: 4,
    question: "Какая команда компилирует Java файл Main.java?",
    correctAnswer: "javac Main.java",
    theory: "Команда `javac` компилирует Java исходный код в байт-код. Например, `javac Main.java` создаст файл `Main.class`, который затем можно запустить с помощью команды `java Main`."
  },
  {
    id: 5,
    question: "Какая команда запускает скомпилированную Java программу с классом Main?",
    correctAnswer: "java Main",
    theory: "Команда `java` запускает скомпилированную Java программу. Важно: указывается имя класса без расширения .class. Например, `java Main` запустит класс Main."
  },
  {
    id: 6,
    question: "Как объявить пакет com.example в Java?",
    correctAnswer: "package com.example;",
    theory: "Пакет объявляется в начале файла с помощью ключевого слова `package` и точки с запятой в конце. Например: `package com.example;`"
  },
  {
    id: 7,
    question: "Как объявить публичный статический метод без параметров и возвращаемого значения?",
    correctAnswer: "public static void methodName()",
    theory: "Публичный статический метод без параметров и возвращаемого значения объявляется как `public static void methodName()`. `public` — доступен везде, `static` — принадлежит классу, `void` — ничего не возвращает."
  },
  {
    id: 8,
    question: "Как объявить публичную переменную типа int с именем count?",
    correctAnswer: "public int count;",
    theory: "Публичная переменная типа int объявляется как `public int count;`. Можно также инициализировать значение: `public int count = 0;`"
  },
  {
    id: 9,
    question: "Как объявить константу типа int со значением 100?",
    correctAnswer: "final int MAX = 100;",
    theory: "Константа объявляется с ключевым словом `final`. По соглашению, имена констант пишутся заглавными буквами. Например: `final int MAX = 100;`"
  },
  {
    id: 10,
    question: "Как объявить строковую переменную name со значением \"Java\"?",
    correctAnswer: "String name = \"Java\";",
    theory: "Строковая переменная объявляется с типом `String` (с заглавной буквы, так как это класс) и значением в двойных кавычках. Например: `String name = \"Java\";`"
  },
  
  // Переменные и типы (variables) - 10 вопросов
  {
    id: 11,
    question: "Как объявить переменную типа int с именем age и значением 25?",
    correctAnswer: "int age = 25;",
    theory: "Переменная типа int объявляется и инициализируется так: `int age = 25;`. Тип `int` используется для целых чисел."
  },
  {
    id: 12,
    question: "Как объявить переменную типа double с именем price и значением 99.99?",
    correctAnswer: "double price = 99.99;",
    theory: "Переменная типа double объявляется так: `double price = 99.99;`. Тип `double` используется для чисел с плавающей точкой."
  },
  {
    id: 13,
    question: "Как объявить переменную типа boolean с именем isActive и значением true?",
    correctAnswer: "boolean isActive = true;",
    theory: "Переменная типа boolean объявляется так: `boolean isActive = true;`. Тип `boolean` может иметь только два значения: `true` или `false`."
  },
  {
    id: 14,
    question: "Как объявить переменную типа char с именем grade и значением 'A'?",
    correctAnswer: "char grade = 'A';",
    theory: "Переменная типа char объявляется так: `char grade = 'A';`. Важно: для char используются одинарные кавычки, а не двойные."
  },
  {
    id: 15,
    question: "Как преобразовать переменную типа double в int?",
    correctAnswer: "(int) value",
    theory: "Для преобразования double в int используется явное приведение типов (casting): `int x = (int) 3.14;`. Это приведет к обрезке дробной части (x будет равен 3)."
  },
  {
    id: 16,
    question: "Как объявить константу типа String со значением \"Hello\"?",
    correctAnswer: "final String GREETING = \"Hello\";",
    theory: "Константа типа String объявляется так: `final String GREETING = \"Hello\";`. Ключевое слово `final` делает переменную неизменяемой."
  },
  {
    id: 17,
    question: "Как объявить переменную типа long с именем bigNumber и значением 1000000?",
    correctAnswer: "long bigNumber = 1000000L;",
    theory: "Переменная типа long объявляется так: `long bigNumber = 1000000L;`. Буква `L` в конце указывает, что это значение типа long."
  },
  {
    id: 18,
    question: "Как объявить переменную типа float с именем pi и значением 3.14?",
    correctAnswer: "float pi = 3.14f;",
    theory: "Переменная типа float объявляется так: `float pi = 3.14f;`. Буква `f` в конце указывает, что это значение типа float."
  },
  {
    id: 19,
    question: "Как объявить переменную типа byte с именем b и значением 10?",
    correctAnswer: "byte b = 10;",
    theory: "Переменная типа byte объявляется так: `byte b = 10;`. Тип `byte` может хранить значения от -128 до 127."
  },
  {
    id: 20,
    question: "Как объявить переменную с автоматическим определением типа (var) со значением \"Java\"?",
    correctAnswer: "var language = \"Java\";",
    theory: "Начиная с Java 10, можно использовать `var` для автоматического определения типа: `var language = \"Java\";`. Компилятор определит, что это String."
  },
  
  // Условия и циклы (control-flow) - 10 вопросов
  {
    id: 21,
    question: "Как написать условие if для проверки, что переменная age больше или равна 18?",
    correctAnswer: "if (age >= 18)",
    theory: "Условие if записывается так: `if (age >= 18) { }`. Оператор `>=` означает \"больше или равно\". Для \"больше\" используется `>`, для \"меньше или равно\" — `<=`, для \"меньше\" — `<`."
  },
  {
    id: 22,
    question: "Как написать цикл for, который выполнится 10 раз (от 0 до 9)?",
    correctAnswer: "for (int i = 0; i < 10; i++)",
    theory: "Цикл for записывается так: `for (int i = 0; i < 10; i++) { }`. Он выполнится 10 раз: когда i = 0, 1, 2, 3, 4, 5, 6, 7, 8, 9."
  },
  {
    id: 23,
    question: "Как написать цикл while с условием count < 5?",
    correctAnswer: "while (count < 5)",
    theory: "Цикл while записывается так: `while (count < 5) { }`. Цикл будет выполняться, пока условие `count < 5` истинно."
  },
  {
    id: 24,
    question: "Как написать оператор switch для переменной day?",
    correctAnswer: "switch (day)",
    theory: "Оператор switch записывается так: `switch (day) { case 1: break; default: break; }`. Начиная с Java 7, switch может работать со строками."
  },
  {
    id: 25,
    question: "Как написать тернарный оператор для выбора максимума из двух чисел a и b?",
    correctAnswer: "a > b ? a : b",
    theory: "Тернарный оператор записывается так: `условие ? значение_если_true : значение_если_false`. Например: `int max = a > b ? a : b;`"
  },
  {
    id: 26,
    question: "Как написать условие if-else для проверки, что число положительное?",
    correctAnswer: "if (number > 0) else",
    theory: "Условие if-else записывается так: `if (number > 0) { } else { }`. Если число больше 0, выполнится первый блок, иначе — второй."
  },
  {
    id: 27,
    question: "Как написать цикл do-while с условием x < 10?",
    correctAnswer: "do { } while (x < 10);",
    theory: "Цикл do-while записывается так: `do { } while (x < 10);`. Отличие от while в том, что тело цикла выполнится минимум один раз."
  },
  {
    id: 28,
    question: "Как написать оператор break для выхода из цикла?",
    correctAnswer: "break;",
    theory: "Оператор `break;` прерывает выполнение цикла и передает управление следующей инструкции после цикла. Также используется в switch для предотвращения fall-through."
  },
  {
    id: 29,
    question: "Как написать оператор continue для пропуска текущей итерации цикла?",
    correctAnswer: "continue;",
    theory: "Оператор `continue;` пропускает оставшуюся часть текущей итерации цикла и переходит к следующей итерации."
  },
  {
    id: 30,
    question: "Как написать условие if с проверкой, что переменная name не равна null?",
    correctAnswer: "if (name != null)",
    theory: "Условие для проверки на null записывается так: `if (name != null) { }`. Оператор `!=` означает \"не равно\". Для проверки на равенство используется `==` для примитивов и `equals()` для объектов."
  },
  
  // Исключения (exceptions) - 10 вопросов
  {
    id: 31,
    question: "Как написать блок try-catch для обработки исключений?",
    correctAnswer: "try { } catch (Exception e) { }",
    theory: "Блок try-catch записывается так: `try { } catch (Exception e) { }`. Код в блоке try выполняется, а если возникает исключение, оно перехватывается блоком catch."
  },
  {
    id: 32,
    question: "Как добавить блок finally к try-catch?",
    correctAnswer: "try { } catch (Exception e) { } finally { }",
    theory: "Блок finally добавляется после catch: `try { } catch (Exception e) { } finally { }`. Блок finally выполняется всегда, независимо от того, возникло исключение или нет."
  },
  {
    id: 33,
    question: "Как выбросить исключение IllegalArgumentException с сообщением \"Неверный аргумент\"?",
    correctAnswer: "throw new IllegalArgumentException(\"Неверный аргумент\");",
    theory: "Для выброса исключения используется ключевое слово `throw`: `throw new IllegalArgumentException(\"Неверный аргумент\");`"
  },
  {
    id: 34,
    question: "Как объявить метод, который может выбросить IOException?",
    correctAnswer: "public void method() throws IOException",
    theory: "Метод, который может выбросить исключение, объявляется с ключевым словом `throws`: `public void method() throws IOException { }`"
  },
  {
    id: 35,
    question: "Как написать try-with-resources для FileReader с файлом \"data.txt\"?",
    correctAnswer: "try (FileReader file = new FileReader(\"data.txt\")) { }",
    theory: "Try-with-resources записывается так: `try (FileReader file = new FileReader(\"data.txt\")) { }`. Ресурс автоматически закроется в блоке finally, даже если возникло исключение."
  },
  {
    id: 36,
    question: "Как обработать несколько типов исключений в разных catch блоках?",
    correctAnswer: "try { } catch (IOException e) { } catch (NullPointerException e) { }",
    theory: "Можно использовать несколько catch блоков: `try { } catch (IOException e) { } catch (NullPointerException e) { }`. Каждый catch обрабатывает свой тип исключения."
  },
  {
    id: 37,
    question: "Как обработать любое исключение в catch блоке?",
    correctAnswer: "catch (Exception e)",
    theory: "Для обработки любого исключения используется базовый класс `Exception`: `catch (Exception e) { }`. Это перехватит все исключения, наследующиеся от Exception."
  },
  {
    id: 38,
    question: "Как создать собственный класс исключения, наследующийся от Exception?",
    correctAnswer: "class MyException extends Exception",
    theory: "Собственное исключение создается так: `class MyException extends Exception { }`. Для checked исключения наследуемся от Exception, для unchecked — от RuntimeException."
  },
  {
    id: 39,
    question: "Как обработать исключение ArithmeticException?",
    correctAnswer: "catch (ArithmeticException e)",
    theory: "Для обработки конкретного типа исключения используется соответствующий catch блок: `catch (ArithmeticException e) { }`. Это исключение возникает при делении на ноль."
  },
  {
    id: 40,
    question: "Как обработать исключение и выбросить новое исключение?",
    correctAnswer: "catch (Exception e) { throw new MyException(); }",
    theory: "В блоке catch можно выбросить новое исключение: `catch (Exception e) { throw new MyException(); }`. Это полезно для преобразования одного типа исключения в другой или для добавления дополнительной информации."
  }
];

export default function JavaCorePracticalQuizPage() {
  // Сохраняем исходные вопросы для отображения теории
  const [originalQuestionsOrder] = useState<PracticalQuestion[]>(originalQuestions);
  
  // Перемешиваем вопросы только на клиенте после монтирования
  const [shuffledQuestions, setShuffledQuestions] = useState<PracticalQuestion[]>(originalQuestions);
  const [isShuffled, setIsShuffled] = useState(false);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(() => new Array(originalQuestions.length).fill(""));
  const [showResults, setShowResults] = useState(false);
  const { user } = useAuth();
  const activityRecorded = useRef(false);
  
  // Перемешиваем вопросы только на клиенте
  useEffect(() => {
    if (!isShuffled) {
      setShuffledQuestions(shuffleArray(originalQuestions));
      setIsShuffled(true);
    }
  }, [isShuffled]);

  const handleAnswerChange = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const normalizeAnswer = (answer: string): string => {
    return answer.trim().toLowerCase().replace(/\s+/g, " ");
  };

  const calculateResults = () => {
    let correct = 0;
    let incorrect = 0;
    
    shuffledQuestions.forEach((question, index) => {
      const userAnswer = normalizeAnswer(answers[index]);
      const correctAnswer = normalizeAnswer(question.correctAnswer);
      
      if (userAnswer === correctAnswer) {
        correct++;
      } else if (answers[index].trim() !== "") {
        incorrect++;
      }
    });
    
    return { correct, incorrect, total: shuffledQuestions.length };
  };

  const handleRestart = () => {
    window.location.reload();
  };

  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [theoryContent, setTheoryContent] = useState("");

  const handleShowTheory = (questionIndex: number) => {
    const originalQuestion = originalQuestionsOrder.find(q => q.id === shuffledQuestions[questionIndex].id);
    if (originalQuestion) {
      setTheoryContent(originalQuestion.theory);
      setShowTheoryModal(true);
    }
  };

  const handleCloseTheory = () => {
    setShowTheoryModal(false);
  };

  // Закрытие модального окна по Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showTheoryModal) {
        handleCloseTheory();
      }
    };

    if (showTheoryModal) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [showTheoryModal]);

  // Записываем активность и результаты теста при завершении квиза
  useEffect(() => {
    if (showResults && user && !activityRecorded.current) {
      const results = calculateResults();
      const percentage = Math.round((results.correct / results.total) * 100);
      
      if (percentage >= 80) {
        activityRecorded.current = true;
        recordActivity(1).catch((error) => {
          console.error("Ошибка при записи активности:", error);
          activityRecorded.current = false;
        });
      }

      const saveTestResult = async () => {
        try {
          const requestBody = {
            testType: "quiz-practical",
            topic: "java-core",
            correctAnswers: results.correct,
            totalQuestions: results.total,
            percentage: percentage,
          };

          const response = await fetch("/api/test-results/save", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(requestBody),
          });

          if (response.ok) {
            triggerActivityUpdate();
          } else {
            const errorText = await response.text();
            console.error("Ошибка при сохранении результата теста:", response.status, errorText);
          }
        } catch (error) {
          console.error("Ошибка при сохранении результата теста:", error);
        }
      };

      saveTestResult();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showResults, user]);

  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const isAnswered = answers[currentQuestionIndex].trim() !== "";
  const progress = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;

  if (showResults) {
    const results = calculateResults();
    const percentage = Math.round((results.correct / results.total) * 100);

    let resultMessage = "";
    
    if (percentage < 80) {
      resultMessage = "Вам стоит повторить материал";
    } else if (percentage >= 80 && percentage < 95) {
      resultMessage = "Поздравляем! Вы успешно прошли тестирование";
    } else {
      resultMessage = "Вы отлично прошли тестирование!";
    }

    return (
      <div className={mono.className}>
        <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)]">
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
            </div>
          </nav>

          <Header leftButton={{ href: "/learn/java-core", text: "← К Java Core" }} />
          <MotivationalQuotes />

          <main className="mx-auto max-w-6xl px-5 py-6">
            <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)] p-8 shadow-sm">
              <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-main)] mb-6">
                Результаты тестирования
              </h1>
              
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-5xl font-bold text-[var(--text-main)] mb-2">
                    {percentage}%
                  </div>
                  <p className="text-sm text-[var(--text-muted)] mb-3">Правильных ответов</p>
                  <p className="text-lg font-semibold text-[var(--text-main)]">
                    {resultMessage}
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-xl border border-[var(--border-main)] bg-[var(--bg-secondary)] p-4 text-center">
                    <div className="text-2xl font-semibold text-green-600 dark:text-green-400 mb-1">
                      {results.correct}
                    </div>
                    <div className="text-sm text-[var(--text-muted)]">Правильных</div>
                  </div>
                  <div className="rounded-xl border border-[var(--border-main)] bg-[var(--bg-secondary)] p-4 text-center">
                    <div className="text-2xl font-semibold text-red-600 dark:text-red-400 mb-1">
                      {results.incorrect}
                    </div>
                    <div className="text-sm text-[var(--text-muted)]">Неправильных</div>
                  </div>
                  <div className="rounded-xl border border-[var(--border-main)] bg-[var(--bg-secondary)] p-4 text-center">
                    <div className="text-2xl font-semibold text-[var(--text-main)] mb-1">
                      {results.total}
                    </div>
                    <div className="text-sm text-[var(--text-muted)]">Всего вопросов</div>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <h2 className="text-lg font-semibold text-[var(--text-main)]">
                    Детальные результаты:
                  </h2>
                  {shuffledQuestions.map((question, index) => {
                    const userAnswer = answers[index].trim();
                    const isCorrect = normalizeAnswer(userAnswer) === normalizeAnswer(question.correctAnswer);
                    const isUnanswered = userAnswer === "";

                    return (
                      <div
                        key={question.id}
                        className={`rounded-xl border p-4 ${
                          isCorrect
                            ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                            : isUnanswered
                            ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
                            : "border-[var(--border-main)] bg-[var(--bg-card)]"
                        }`}
                      >
                        <div className="flex items-start gap-2 mb-3">
                          <span className="font-semibold text-[var(--text-main)]">
                            {index + 1}.
                          </span>
                          <span className="text-sm font-semibold text-[var(--text-main)]">
                            {question.question}
                          </span>
                        </div>
                        
                        <div className="ml-6 space-y-2">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <div className={`w-4 h-4 rounded border-2 flex-shrink-0 ${
                                isCorrect
                                  ? "border-green-500 bg-green-500"
                                  : "border-[var(--border-main)]"
                              }`} />
                              <span className="text-sm font-mono text-[var(--text-main)]">
                                Правильный ответ: {question.correctAnswer}
                              </span>
                              {isCorrect && (
                                <span className="text-xs font-medium text-green-600 dark:text-green-400 ml-auto">
                                  ✓ Правильно
                                </span>
                              )}
                            </div>
                            {!isUnanswered && (
                              <div className="flex items-center gap-2">
                                <div className={`w-4 h-4 rounded border-2 flex-shrink-0 ${
                                  isCorrect
                                    ? "border-green-500 bg-green-500"
                                    : "border-red-500 bg-red-500"
                                }`} />
                                <span className="text-sm font-mono text-[var(--text-main)]">
                                  Твой ответ: {userAnswer || "(пусто)"}
                                </span>
                                {!isCorrect && (
                                  <span className="text-xs font-medium text-red-600 dark:text-red-400 ml-auto">
                                    ✗ Неправильно
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {!isCorrect && !isUnanswered && (
                          <div className="mt-4 pt-4 border-t border-[var(--border-main)] flex justify-center">
                            <button
                              onClick={() => handleShowTheory(index)}
                              className="inline-flex items-center justify-center rounded-xl bg-[var(--button-bg)] px-6 py-3 text-sm font-semibold text-[var(--button-text)] hover:bg-[var(--button-hover)] transition-colors"
                            >
                              Читать теорию
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleRestart}
                    className="flex-1 rounded-xl bg-[var(--button-bg)] px-6 py-3 text-sm font-semibold text-[var(--button-text)] hover:bg-[var(--button-hover)] transition-colors"
                  >
                    Пройти заново
                  </button>
                  <Link
                    href="/learn/java-core"
                    className="flex-1 rounded-xl border border-[var(--border-main)] bg-[var(--bg-card)] px-6 py-3 text-sm font-semibold text-[var(--text-main)] hover:bg-[var(--bg-muted)] transition-colors text-center"
                  >
                    Вернуться к материалу
                  </Link>
                </div>
              </div>
            </div>
          </main>

          {/* Модальное окно с теорией */}
          {showTheoryModal && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={handleCloseTheory}
            >
              <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
                style={{ animation: "fadeIn 0.3s ease-out" }}
              />
              
              <div
                className="relative bg-[var(--bg-card)] rounded-2xl border border-[var(--border-main)] shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
                style={{ animation: "slideUp 0.3s ease-out" }}
              >
                <div className="flex items-center justify-between p-6 border-b border-[var(--border-main)]">
                  <h3 className="text-xl font-semibold text-[var(--text-main)]">
                    Теория по вопросу
                  </h3>
                  <button
                    onClick={handleCloseTheory}
                    className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                  <div className="text-sm text-[var(--text-main)] leading-relaxed">
                    {theoryContent.split('\n').map((line, index) => {
                      const trimmedLine = line.trim();
                      
                      if (trimmedLine.startsWith('```')) {
                        return null;
                      }
                      
                      if (trimmedLine.startsWith('git ') || 
                          trimmedLine.match(/^[a-z-]+\s+[a-z]/i) ||
                          trimmedLine.match(/^[a-z-]+:/i)) {
                        return (
                          <div key={index} className="font-mono text-xs bg-[var(--bg-secondary)] border border-[var(--border-main)] rounded-lg px-4 py-2 text-[var(--text-main)] my-2">
                            {line}
                          </div>
                        );
                      }
                      
                      if (trimmedLine.match(/^\d+\./)) {
                        return (
                          <div key={index} className="flex items-start gap-2 ml-2">
                            <span className="font-semibold text-[var(--text-main)] shrink-0">{trimmedLine.match(/^\d+\./)?.[0]}</span>
                            <span className="text-[var(--text-main)]">{trimmedLine.replace(/^\d+\.\s*/, '')}</span>
                          </div>
                        );
                      }
                      
                      if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-')) {
                        return (
                          <div key={index} className="flex items-start gap-2 ml-2">
                            <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--button-bg)] mt-1.5" />
                            <span className="text-[var(--text-main)]">{trimmedLine.replace(/^[•-]\s*/, '')}</span>
                          </div>
                        );
                      }
                      
                      if (trimmedLine === '') {
                        return <div key={index} className="h-2" />;
                      }
                      
                      return (
                        <p key={index} className="text-[var(--text-main)]">
                          {line}
                        </p>
                      );
                    })}
                  </div>
                </div>

                <div className="p-6 border-t border-[var(--border-main)]">
                  <button
                    onClick={handleCloseTheory}
                    className="w-full rounded-xl bg-[var(--button-bg)] px-6 py-3 text-sm font-semibold text-[var(--button-text)] hover:bg-[var(--button-hover)] transition-colors"
                  >
                    Закрыть
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={mono.className}>
      <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)]">
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
          </div>
        </nav>

        <Header leftButton={{ href: "/learn/java-core", text: "← К Java Core" }} />
        <MotivationalQuotes />

        <main className="mx-auto max-w-6xl px-5 py-6">
          <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)] p-8 shadow-sm">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-[var(--text-main)]">
                  Вопрос {currentQuestionIndex + 1} из {shuffledQuestions.length}
                </span>
                <span className="text-sm text-[var(--text-muted)]">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="w-full h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--button-bg)] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-[var(--text-main)] mb-6">
                {currentQuestion.question}
              </h2>
              
              <div className="space-y-3">
                <label className="block">
                  <span className="text-sm font-medium text-[var(--text-muted)] mb-2 block">
                    Введите ответ:
                  </span>
                  <input
                    type="text"
                    value={answers[currentQuestionIndex]}
                    onChange={(e) => handleAnswerChange(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && isAnswered) {
                        handleNext();
                      }
                    }}
                    className="w-full rounded-xl border border-[var(--border-main)] bg-[var(--bg-card)] px-4 py-3 text-sm font-mono text-[var(--text-main)] outline-none focus:ring-2 focus:ring-[var(--border-secondary)] focus:border-[var(--border-secondary)]"
                    autoFocus
                  />
                </label>
                <p className="text-xs text-[var(--text-muted)]">
                  Введите ответ точно, как он используется в Java
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[var(--border-main)]">
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="rounded-xl border border-[var(--border-main)] bg-[var(--bg-card)] px-6 py-2 text-sm font-semibold text-[var(--text-main)] hover:bg-[var(--bg-muted)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Назад
              </button>
              
              <button
                onClick={handleNext}
                disabled={!isAnswered}
                className="rounded-xl bg-[var(--button-bg)] px-6 py-2 text-sm font-semibold text-[var(--button-text)] hover:bg-[var(--button-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentQuestionIndex === shuffledQuestions.length - 1 ? "Завершить тест" : "Далее →"}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

