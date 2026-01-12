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

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
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

// Функция для перемешивания вариантов ответов в вопросе
function shuffleQuestionOptions(question: Question): Question {
  const optionsWithIndices = question.options.map((option, index) => ({
    option,
    originalIndex: index
  }));
  
  const shuffled = shuffleArray(optionsWithIndices);
  const newOptions = shuffled.map(item => item.option);
  const newCorrectAnswer = shuffled.findIndex(item => item.originalIndex === question.correctAnswer);
  
  return {
    ...question,
    options: newOptions,
    correctAnswer: newCorrectAnswer
  };
}

const originalQuestions: Question[] = [
  // Основы Java (basics) - 10 вопросов
  {
    id: 1,
    question: "Что такое Java?",
    options: [
      "Язык программирования",
      "Операционная система",
      "База данных",
      "Веб-браузер"
    ],
    correctAnswer: 0,
    theory: "Java — это объектно-ориентированный язык программирования высокого уровня, созданный компанией Sun Microsystems (теперь Oracle). Java работает по принципу \"напиши один раз, запускай везде\" благодаря виртуальной машине Java (JVM)."
  },
  {
    id: 2,
    question: "Что такое JVM?",
    options: [
      "Java Virtual Machine - виртуальная машина Java",
      "Java Version Manager",
      "Java Visual Mode",
      "Java Variable Manager"
    ],
    correctAnswer: 0,
    theory: "JVM (Java Virtual Machine) — это виртуальная машина, которая выполняет Java байт-код. JVM позволяет Java программам работать на любой платформе, где установлена JVM, обеспечивая кроссплатформенность."
  },
  {
    id: 3,
    question: "Какая команда компилирует Java файл?",
    options: [
      "java Main.java",
      "javac Main.java",
      "javacompile Main.java",
      "compile Main.java"
    ],
    correctAnswer: 1,
    theory: "Команда `javac` компилирует Java исходный код в байт-код. Например, `javac Main.java` создаст файл `Main.class`, который затем можно запустить с помощью команды `java Main`."
  },
  {
    id: 4,
    question: "Какая команда запускает скомпилированную Java программу?",
    options: [
      "javac Main",
      "java Main",
      "run Main",
      "execute Main"
    ],
    correctAnswer: 1,
    theory: "Команда `java` запускает скомпилированную Java программу. Например, `java Main` запустит класс Main. Важно: указывается имя класса без расширения .class."
  },
  {
    id: 5,
    question: "Что такое JDK?",
    options: [
      "Java Development Kit - набор инструментов для разработки",
      "Java Data Kit",
      "Java Debug Kit",
      "Java Design Kit"
    ],
    correctAnswer: 0,
    theory: "JDK (Java Development Kit) — это набор инструментов для разработки Java приложений. JDK включает компилятор (javac), JVM, библиотеки и другие инструменты разработчика."
  },
  {
    id: 6,
    question: "Какое расширение имеют файлы с исходным кодом Java?",
    options: [
      ".java",
      ".class",
      ".jar",
      ".exe"
    ],
    correctAnswer: 0,
    theory: "Файлы с исходным кодом Java имеют расширение `.java`. После компиляции создаются файлы с расширением `.class`, содержащие байт-код."
  },
  {
    id: 7,
    question: "Что такое main метод в Java?",
    options: [
      "Точка входа в программу",
      "Метод для вывода текста",
      "Метод для чтения данных",
      "Метод для работы с файлами"
    ],
    correctAnswer: 0,
    theory: "Метод `main` — это точка входа в Java программу. Он должен быть объявлен как `public static void main(String[] args)`. JVM ищет этот метод при запуске программы."
  },
  {
    id: 8,
    question: "Что означает ключевое слово 'public' в Java?",
    options: [
      "Доступно из любого места",
      "Доступно только внутри класса",
      "Доступно только внутри пакета",
      "Недоступно нигде"
    ],
    correctAnswer: 0,
    theory: "Ключевое слово `public` означает, что элемент (класс, метод, переменная) доступен из любого места программы, даже из других пакетов."
  },
  {
    id: 9,
    question: "Что означает ключевое слово 'static' в Java?",
    options: [
      "Принадлежит классу, а не экземпляру",
      "Неизменяемое значение",
      "Доступно только для чтения",
      "Синхронизированный доступ"
    ],
    correctAnswer: 0,
    theory: "Ключевое слово `static` означает, что элемент принадлежит классу, а не конкретному экземпляру объекта. Статические методы и переменные можно вызывать без создания объекта класса."
  },
  {
    id: 10,
    question: "Что такое пакет (package) в Java?",
    options: [
      "Механизм организации классов",
      "Архив с файлами",
      "Тип данных",
      "Метод компиляции"
    ],
    correctAnswer: 0,
    theory: "Пакет (package) — это механизм организации классов в Java. Пакеты помогают избежать конфликтов имен и структурировать код. Например, `package com.example;` объявляет пакет для класса."
  },
  
  // Переменные и типы (variables) - 10 вопросов
  {
    id: 11,
    question: "Сколько примитивных типов данных в Java?",
    options: [
      "6",
      "7",
      "8",
      "9"
    ],
    correctAnswer: 2,
    theory: "В Java есть 8 примитивных типов: byte, short, int, long, float, double, char, boolean. Все остальные типы являются объектами (классами)."
  },
  {
    id: 12,
    question: "Какой тип данных используется для хранения целых чисел по умолчанию?",
    options: [
      "byte",
      "short",
      "int",
      "long"
    ],
    correctAnswer: 2,
    theory: "Тип `int` используется по умолчанию для целых чисел в Java. Это 32-битное число, которое может хранить значения от -2³¹ до 2³¹-1."
  },
  {
    id: 13,
    question: "Какой тип данных используется для хранения чисел с плавающей точкой по умолчанию?",
    options: [
      "float",
      "double",
      "decimal",
      "real"
    ],
    correctAnswer: 1,
    theory: "Тип `double` используется по умолчанию для чисел с плавающей точкой в Java. Это 64-битное число, которое обеспечивает большую точность, чем `float`."
  },
  {
    id: 14,
    question: "Как объявить переменную типа String?",
    options: [
      "String name = \"Java\";",
      "string name = \"Java\";",
      "String name = 'Java';",
      "str name = \"Java\";"
    ],
    correctAnswer: 0,
    theory: "В Java строки объявляются с типом `String` (с заглавной буквы, так как это класс) и значениями в двойных кавычках. Например: `String name = \"Java\";`"
  },
  {
    id: 15,
    question: "Что такое final переменная в Java?",
    options: [
      "Переменная, значение которой нельзя изменить",
      "Последняя переменная в классе",
      "Переменная с финальным типом",
      "Переменная, которая удаляется в конце программы"
    ],
    correctAnswer: 0,
    theory: "Ключевое слово `final` делает переменную константой — её значение нельзя изменить после инициализации. Например: `final int MAX_VALUE = 100;`"
  },
  {
    id: 16,
    question: "Какой тип данных используется для хранения одного символа?",
    options: [
      "char",
      "String",
      "character",
      "symbol"
    ],
    correctAnswer: 0,
    theory: "Тип `char` используется для хранения одного символа. Значения указываются в одинарных кавычках: `char grade = 'A';`"
  },
  {
    id: 17,
    question: "Что произойдет при попытке присвоить значение типа double переменной типа int?",
    options: [
      "Ошибка компиляции",
      "Автоматическое преобразование",
      "Округление до ближайшего целого",
      "Обрезка дробной части"
    ],
    correctAnswer: 0,
    theory: "В Java нельзя автоматически преобразовать `double` в `int` без явного приведения типов (casting), так как это может привести к потере данных. Нужно использовать: `int x = (int) 3.14;`"
  },
  {
    id: 18,
    question: "Что такое var в Java (начиная с Java 10)?",
    options: [
      "Ключевое слово для автоматического определения типа",
      "Сокращение от variable",
      "Тип данных для вариативных значений",
      "Модификатор доступа"
    ],
    correctAnswer: 0,
    theory: "Начиная с Java 10, ключевое слово `var` позволяет компилятору автоматически определять тип переменной на основе присваиваемого значения. Например: `var name = \"Java\";` эквивалентно `String name = \"Java\";`"
  },
  {
    id: 19,
    question: "Какой тип данных используется для хранения логических значений?",
    options: [
      "boolean",
      "bool",
      "logical",
      "true/false"
    ],
    correctAnswer: 0,
    theory: "Тип `boolean` используется для хранения логических значений `true` или `false`. Например: `boolean isActive = true;`"
  },
  {
    id: 20,
    question: "Что такое null в Java?",
    options: [
      "Отсутствие ссылки на объект",
      "Пустая строка",
      "Ноль",
      "Неопределенное значение"
    ],
    correctAnswer: 0,
    theory: "`null` в Java означает отсутствие ссылки на объект. Это значение по умолчанию для всех ссылочных типов (объектов). Примитивные типы не могут быть `null`."
  },
  
  // Условия и циклы (control-flow) - 10 вопросов
  {
    id: 21,
    question: "Какой оператор используется для проверки равенства в Java?",
    options: [
      "==",
      "=",
      "===",
      "equals"
    ],
    correctAnswer: 0,
    theory: "Оператор `==` используется для сравнения примитивных типов. Для объектов используется метод `equals()`. Оператор `=` используется для присваивания."
  },
  {
    id: 22,
    question: "Что делает оператор && в Java?",
    options: [
      "Логическое И",
      "Логическое ИЛИ",
      "Логическое НЕ",
      "Побитовое И"
    ],
    correctAnswer: 0,
    theory: "Оператор `&&` — это логическое И. Он возвращает `true` только если оба операнда `true`. Если первый операнд `false`, второй не вычисляется (short-circuit evaluation)."
  },
  {
    id: 23,
    question: "Что делает оператор || в Java?",
    options: [
      "Логическое ИЛИ",
      "Логическое И",
      "Логическое НЕ",
      "Побитовое ИЛИ"
    ],
    correctAnswer: 0,
    theory: "Оператор `||` — это логическое ИЛИ. Он возвращает `true` если хотя бы один операнд `true`. Если первый операнд `true`, второй не вычисляется (short-circuit evaluation)."
  },
  {
    id: 24,
    question: "Сколько раз выполнится цикл for (int i = 0; i < 5; i++)?",
    options: [
      "4",
      "5",
      "6",
      "Бесконечно"
    ],
    correctAnswer: 1,
    theory: "Цикл `for (int i = 0; i < 5; i++)` выполнится 5 раз: когда i = 0, 1, 2, 3, 4. Когда i станет 5, условие `i < 5` станет false, и цикл завершится."
  },
  {
    id: 25,
    question: "Что делает оператор break в цикле?",
    options: [
      "Прерывает выполнение цикла",
      "Пропускает текущую итерацию",
      "Продолжает выполнение",
      "Возвращает значение"
    ],
    correctAnswer: 0,
    theory: "Оператор `break` прерывает выполнение цикла и передает управление следующей инструкции после цикла. В отличие от `continue`, который пропускает только текущую итерацию."
  },
  {
    id: 26,
    question: "Что делает оператор continue в цикле?",
    options: [
      "Пропускает текущую итерацию и переходит к следующей",
      "Прерывает выполнение цикла",
      "Продолжает выполнение с начала",
      "Возвращает значение"
    ],
    correctAnswer: 0,
    theory: "Оператор `continue` пропускает оставшуюся часть текущей итерации цикла и переходит к следующей итерации. В отличие от `break`, который полностью прерывает цикл."
  },
  {
    id: 27,
    question: "В чем разница между циклом while и do-while?",
    options: [
      "do-while выполнится минимум один раз",
      "while выполнится минимум один раз",
      "Нет разницы",
      "do-while быстрее"
    ],
    correctAnswer: 0,
    theory: "Основное отличие: цикл `do-while` выполнится минимум один раз, так как условие проверяется после выполнения тела цикла. Цикл `while` может не выполниться ни разу, если условие изначально false."
  },
  {
    id: 28,
    question: "Можно ли использовать switch с типом String в Java?",
    options: [
      "Да, начиная с Java 7",
      "Нет, только с числами",
      "Только с char",
      "Только с enum"
    ],
    correctAnswer: 0,
    theory: "Начиная с Java 7, оператор `switch` может работать со строками (String). До этого switch работал только с примитивными типами (byte, short, int, char) и enum."
  },
  {
    id: 29,
    question: "Что произойдет, если в switch не использовать break?",
    options: [
      "Выполнение продолжится в следующем case (fall-through)",
      "Ошибка компиляции",
      "Цикл завершится",
      "Ничего не произойдет"
    ],
    correctAnswer: 0,
    theory: "Если в `switch` не использовать `break`, выполнение продолжится в следующем `case` (fall-through). Это может быть полезно, когда несколько case должны выполнять один и тот же код."
  },
  {
    id: 30,
    question: "Какой оператор используется для тернарного условия в Java?",
    options: [
      "? :",
      "if else",
      "switch case",
      "&& ||"
    ],
    correctAnswer: 0,
    theory: "Тернарный оператор `? :` позволяет записать простое условие в одну строку. Синтаксис: `условие ? значение_если_true : значение_если_false`. Например: `int max = a > b ? a : b;`"
  },
  
  // Исключения (exceptions) - 10 вопросов
  {
    id: 31,
    question: "Что такое исключение (Exception) в Java?",
    options: [
      "Событие, нарушающее нормальный поток выполнения программы",
      "Ошибка компиляции",
      "Синтаксическая ошибка",
      "Предупреждение компилятора"
    ],
    correctAnswer: 0,
    theory: "Исключение (Exception) — это событие, которое возникает во время выполнения программы и нарушает нормальный поток выполнения. Исключения позволяют обрабатывать ошибки и нештатные ситуации."
  },
  {
    id: 32,
    question: "Какие типы исключений есть в Java?",
    options: [
      "Checked и Unchecked",
      "Error и Warning",
      "Runtime и Compile-time",
      "Critical и Non-critical"
    ],
    correctAnswer: 0,
    theory: "В Java исключения делятся на два типа: Checked (проверяемые) — должны быть обработаны или объявлены, и Unchecked (непроверяемые) — наследуются от RuntimeException и не требуют обязательной обработки."
  },
  {
    id: 33,
    question: "Что такое try-catch блок?",
    options: [
      "Механизм обработки исключений",
      "Условный оператор",
      "Цикл",
      "Метод"
    ],
    correctAnswer: 0,
    theory: "Блок `try-catch` позволяет перехватывать и обрабатывать исключения. Код в блоке `try` выполняется, а если возникает исключение, оно перехватывается блоком `catch`."
  },
  {
    id: 34,
    question: "Когда выполняется блок finally?",
    options: [
      "Всегда, независимо от того, возникло исключение или нет",
      "Только при возникновении исключения",
      "Только если исключения не было",
      "Никогда"
    ],
    correctAnswer: 0,
    theory: "Блок `finally` выполняется всегда, независимо от того, возникло исключение в блоке `try` или нет. Обычно используется для освобождения ресурсов (закрытие файлов, соединений и т.д.)."
  },
  {
    id: 35,
    question: "Что такое NullPointerException?",
    options: [
      "Исключение при обращении к null объекту",
      "Исключение при делении на ноль",
      "Исключение при выходе за границы массива",
      "Исключение при неверном типе"
    ],
    correctAnswer: 0,
    theory: "`NullPointerException` — это непроверяемое исключение (RuntimeException), которое возникает при попытке вызвать метод или обратиться к полю объекта, который равен `null`. Например: `String str = null; int len = str.length();`"
  },
  {
    id: 36,
    question: "Что такое ArrayIndexOutOfBoundsException?",
    options: [
      "Исключение при обращении к несуществующему индексу массива",
      "Исключение при создании массива",
      "Исключение при сортировке массива",
      "Исключение при копировании массива"
    ],
    correctAnswer: 0,
    theory: "`ArrayIndexOutOfBoundsException` — это непроверяемое исключение, которое возникает при попытке обратиться к элементу массива по индексу, который выходит за его границы. Например: `int[] arr = {1, 2}; int x = arr[5];`"
  },
  {
    id: 37,
    question: "Что делает ключевое слово throw?",
    options: [
      "Явно выбрасывает исключение",
      "Обрабатывает исключение",
      "Игнорирует исключение",
      "Логирует исключение"
    ],
    correctAnswer: 0,
    theory: "Ключевое слово `throw` используется для явного выброса исключения. Синтаксис: `throw new ТипИсключения(\"Сообщение\");`. Например: `throw new IllegalArgumentException(\"Неверный аргумент\");`"
  },
  {
    id: 38,
    question: "Что означает throws в сигнатуре метода?",
    options: [
      "Метод может выбросить указанное исключение",
      "Метод обрабатывает исключение",
      "Метод игнорирует исключение",
      "Метод возвращает исключение"
    ],
    correctAnswer: 0,
    theory: "Ключевое слово `throws` в сигнатуре метода указывает, что метод может выбросить указанное исключение. Вызывающий код должен обработать это исключение или также объявить его в throws. Например: `public void readFile() throws IOException`"
  },
  {
    id: 39,
    question: "Что такое try-with-resources?",
    options: [
      "Механизм автоматического закрытия ресурсов",
      "Способ обработки исключений",
      "Тип цикла",
      "Метод работы с файлами"
    ],
    correctAnswer: 0,
    theory: "Try-with-resources (доступен с Java 7) — это механизм автоматического закрытия ресурсов, которые реализуют интерфейс `AutoCloseable`. Ресурсы автоматически закрываются в блоке `finally`, даже если возникло исключение. Например: `try (FileReader file = new FileReader(\"data.txt\")) { ... }`"
  },
  {
    id: 40,
    question: "Какое исключение является проверяемым (checked)?",
    options: [
      "IOException",
      "NullPointerException",
      "ArrayIndexOutOfBoundsException",
      "ArithmeticException"
    ],
    correctAnswer: 0,
    theory: "`IOException` — это проверяемое исключение (checked exception), которое наследуется от `Exception`, но не от `RuntimeException`. Компилятор требует его обработки или объявления в throws. Остальные варианты — непроверяемые исключения."
  }
];

export default function JavaCoreQuizPage() {
  // Сохраняем исходные вопросы для отображения результатов
  const [originalQuestionsOrder] = useState<Question[]>(originalQuestions);
  
  // Перемешиваем вопросы и варианты ответов только на клиенте после монтирования
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>(originalQuestions);
  const [isShuffled, setIsShuffled] = useState(false);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(() => new Array(originalQuestions.length).fill(-1));
  const [showResults, setShowResults] = useState(false);
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [theoryContent, setTheoryContent] = useState("");
  const { user } = useAuth();
  const activityRecorded = useRef(false);
  
  // Перемешиваем вопросы и варианты ответов только на клиенте
  useEffect(() => {
    if (!isShuffled) {
      // Перемешиваем вопросы
      const shuffled = shuffleArray(originalQuestions);
      // Перемешиваем варианты ответов для каждого вопроса
      setShuffledQuestions(shuffled.map(q => shuffleQuestionOptions(q)));
      setIsShuffled(true);
    }
  }, [isShuffled]);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
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

  const calculateResults = () => {
    let correct = 0;
    let incorrect = 0;
    
    shuffledQuestions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      } else if (selectedAnswers[index] !== -1) {
        incorrect++;
      }
    });
    
    return { correct, incorrect, total: shuffledQuestions.length };
  };

  const handleRestart = () => {
    window.location.reload();
  };

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
            testType: "quiz",
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
  const isAnswered = selectedAnswers[currentQuestionIndex] !== -1;
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
                    const userAnswer = selectedAnswers[index];
                    const isCorrect = userAnswer === question.correctAnswer;
                    const isUnanswered = userAnswer === -1;

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
                        <div className="flex items-start gap-2 mb-2">
                          <span className="font-semibold text-[var(--text-main)]">
                            {index + 1}.
                          </span>
                          <span className="text-sm font-semibold text-[var(--text-main)]">
                            {question.question}
                          </span>
                        </div>
                        <div className="ml-6 space-y-2">
                          {question.options.map((option, optIndex) => {
                            let status = "";
                            if (optIndex === question.correctAnswer) {
                              status = "✓ Правильный ответ";
                            } else if (optIndex === userAnswer && !isCorrect) {
                              status = "✗ Твой ответ";
                            }

                            return (
                              <div key={optIndex} className="flex items-center gap-2">
                                <div
                                  className={`w-4 h-4 rounded border-2 flex-shrink-0 ${
                                    optIndex === question.correctAnswer
                                      ? "border-green-500 bg-green-500"
                                      : optIndex === userAnswer && !isCorrect
                                      ? "border-red-500 bg-red-500"
                                      : "border-[var(--border-main)]"
                                  }`}
                                />
                                <span className="text-sm text-[var(--text-main)]">{option}</span>
                                {status && (
                                  <span
                                    className={`text-xs font-medium ml-auto ${
                                      optIndex === question.correctAnswer
                                        ? "text-green-600 dark:text-green-400"
                                        : "text-red-600 dark:text-red-400"
                                    }`}
                                  >
                                    {status}
                                  </span>
                                )}
                              </div>
                            );
                          })}
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
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswers[currentQuestionIndex] === index;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        isSelected
                          ? "border-[var(--button-bg)] bg-[var(--bg-muted)]"
                          : "border-[var(--border-main)] bg-[var(--bg-card)] hover:border-[var(--border-secondary)] hover:bg-[var(--bg-muted)]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            isSelected
                              ? "border-[var(--button-bg)] bg-[var(--button-bg)]"
                              : "border-[var(--border-main)]"
                          }`}
                        >
                          {isSelected && (
                            <div className="w-2 h-2 rounded-full bg-[var(--button-text)]" />
                          )}
                        </div>
                        <span className="text-sm text-[var(--text-main)]">{option}</span>
                      </div>
                    </button>
                  );
                })}
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

