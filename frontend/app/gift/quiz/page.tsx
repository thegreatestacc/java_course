"use client";

import { useState, useEffect, useRef } from "react";
import { JetBrains_Mono } from "next/font/google";
import { Header } from "../../Header";
import { MotivationalQuotes } from "../../MotivationalQuotes";
import { useAuth } from "../../useAuth";
import { recordActivity, triggerActivityUpdate } from "../../utils/activityTracker";
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
  {
    id: 1,
    question: "Что такое Git?",
    options: [
      "Система контроля версий",
      "Язык программирования",
      "База данных",
      "Текстовый редактор"
    ],
    correctAnswer: 0,
    theory: "Git — это распределенная система контроля версий, которая позволяет отслеживать изменения в коде. Он сохраняет историю всех изменений, позволяет откатываться к предыдущим версиям и работать в команде. Каждый коммит — это снимок состояния проекта в определенный момент времени."
  },
  {
    id: 2,
    question: "Какая команда используется для инициализации нового репозитория?",
    options: [
      "git start",
      "git init",
      "git create",
      "git new"
    ],
    correctAnswer: 1,
    theory: "Команда `git init` инициализирует новый репозиторий в текущей папке. Она создает скрытую папку `.git`, в которой хранится вся информация о репозитории: история коммитов, ветки, настройки и т.д.\n\nПример использования:\n```bash\ngit init\n```\n\nПосле выполнения этой команды текущая папка становится Git-репозиторием, и можно начинать отслеживать изменения в файлах."
  },
  {
    id: 3,
    question: "Что делает команда 'git add .'?",
    options: [
      "Удаляет все файлы",
      "Добавляет все изменения в staging area",
      "Создает новый коммит",
      "Отправляет изменения на сервер"
    ],
    correctAnswer: 1,
    theory: "Команда `git add .` добавляет все измененные файлы в staging area (индекс). Staging area — это промежуточная область, где файлы готовятся к коммиту.\n\nВарианты использования:\n- `git add .` — добавить все измененные файлы в текущей директории\n- `git add file.txt` — добавить конкретный файл\n- `git add *.java` — добавить все Java файлы\n\nПосле `git add` файлы находятся в staging area, но еще не закоммичены. Для создания коммита нужно выполнить `git commit`."
  },
  {
    id: 4,
    question: "Какая команда создает новый коммит?",
    options: [
      "git save",
      "git commit",
      "git push",
      "git create"
    ],
    correctAnswer: 1,
    theory: "Команда `git commit` создает новый коммит с изменениями, которые находятся в staging area.\n\nОсновной синтаксис:\n```bash\ngit commit -m \"Описание изменений\"\n```\n\nПолезные варианты:\n- `git commit -m \"Сообщение\"` — создать коммит с сообщением\n- `git commit -am \"Сообщение\"` — добавить все измененные файлы и закоммитить (только для уже отслеживаемых файлов)\n- `git commit --amend` — изменить последний коммит\n\nКоммит — это снимок состояния проекта в определенный момент времени. Каждый коммит имеет уникальный хеш и сохраняется в истории."
  },
  {
    id: 5,
    question: "Что такое ветка (branch) в Git?",
    options: [
      "Файл с настройками",
      "Отдельная линия разработки",
      "Команда для удаления",
      "Сервер для хранения кода"
    ],
    correctAnswer: 1,
    theory: "Ветка (branch) в Git — это отдельная линия разработки, которая позволяет работать над разными задачами параллельно, не мешая друг другу.\n\nОсновные команды для работы с ветками:\n- `git branch` — показать все локальные ветки\n- `git branch branch-name` — создать новую ветку\n- `git checkout branch-name` — переключиться на ветку\n- `git checkout -b branch-name` — создать и переключиться на ветку\n- `git switch branch-name` — современная альтернатива checkout\n\nПо умолчанию создается ветка `main` (или `master` в старых версиях). Ветки позволяют изолировать изменения и работать над разными функциями одновременно."
  },
  {
    id: 6,
    question: "Какая команда создает новую ветку?",
    options: [
      "git new branch",
      "git create branch",
      "git branch",
      "git add branch"
    ],
    correctAnswer: 2,
    theory: "Команда `git branch` используется для создания новой ветки.\n\nСоздание ветки:\n```bash\ngit branch feature-name\n```\n\nПереключение на новую ветку:\n```bash\ngit checkout feature-name\n```\n\nИли создать и сразу переключиться:\n```bash\ngit checkout -b feature-name\n# или современный вариант:\ngit switch -c feature-name\n```\n\nПросмотр веток:\n- `git branch` — показать все локальные ветки\n- `git branch -a` — показать все ветки (включая удаленные)\n- `git branch -v` — показать ветки с последним коммитом"
  },
  {
    id: 7,
    question: "Что делает команда 'git merge'?",
    options: [
      "Удаляет ветку",
      "Создает новую ветку",
      "Объединяет изменения из разных веток",
      "Отправляет изменения на сервер"
    ],
    correctAnswer: 2,
    theory: "Команда `git merge` объединяет изменения из одной ветки в другую.\n\nПроцесс слияния:\n1. Переключись на ветку, в которую хочешь влить изменения (обычно main):\n```bash\ngit checkout main\n```\n\n2. Выполни слияние:\n```bash\ngit merge feature-name\n```\n\n3. Если конфликтов нет, Git создаст merge commit автоматически.\n\nТипы слияния:\n- **Fast-forward merge** — когда нет новых коммитов в основной ветке\n- **Merge commit** — создается новый коммит, объединяющий две ветки\n\nОтмена слияния (если еще не закоммитил):\n```bash\ngit merge --abort\n```"
  },
  {
    id: 8,
    question: "Что такое 'git push'?",
    options: [
      "Скачивание изменений с сервера",
      "Отправка изменений на удаленный репозиторий",
      "Создание новой ветки",
      "Удаление файлов"
    ],
    correctAnswer: 1,
    theory: "Команда `git push` отправляет изменения из локального репозитория на удаленный репозиторий (например, на GitHub или GitLab).\n\nОсновные варианты использования:\n- `git push origin branch-name` — отправить ветку на сервер\n- `git push -u origin branch-name` — отправить и установить upstream (при первом push)\n- `git push` — отправить текущую ветку (если upstream установлен)\n- `git push --all` — отправить все ветки\n\nПеред первым push нужно добавить удаленный репозиторий:\n```bash\ngit remote add origin https://github.com/username/repo-name.git\ngit push -u origin main\n```\n\nПосле этого можно просто использовать `git push` для отправки изменений."
  },
  {
    id: 9,
    question: "Что делает команда 'git pull'?",
    options: [
      "Отправляет изменения на сервер",
      "Скачивает и объединяет изменения с удаленного репозитория",
      "Создает новую ветку",
      "Удаляет локальные изменения"
    ],
    correctAnswer: 1,
    theory: "Команда `git pull` скачивает изменения с удаленного репозитория и автоматически объединяет их с текущей веткой.\n\nПо сути, `git pull` = `git fetch` + `git merge`\n\nИспользование:\n- `git pull origin branch-name` — скачать и влить изменения из указанной ветки\n- `git pull` — скачать и влить изменения из upstream ветки\n\nЕсли нужно только скачать изменения без слияния:\n```bash\ngit fetch origin\n```\n\nПосле fetch можно посмотреть изменения:\n- `git log origin/branch-name` — посмотреть коммиты в удаленной ветке\n- `git diff origin/branch-name` — сравнить с удаленной веткой\n\nЕсли есть конфликты при pull, их нужно разрешить так же, как при merge."
  },
  {
    id: 10,
    question: "Что такое конфликт слияния (merge conflict)?",
    options: [
      "Ошибка в коде",
      "Ситуация, когда Git не может автоматически объединить изменения",
      "Проблема с сетью",
      "Удаление файла"
    ],
    correctAnswer: 1,
    theory: "Конфликт слияния (merge conflict) возникает, когда Git не может автоматически объединить изменения из разных веток. Это происходит, когда в одной и той же части файла были сделаны разные изменения.\n\nКак разрешить конфликт:\n\n1. Git помечает конфликтующие участки в файле:\n```\n<<<<<<< HEAD\nТвой код\n=======\nКод из другой ветки\n>>>>>>> branch-name\n```\n\n2. Отредактируй файл, оставив нужный код или объединив оба варианта.\n\n3. Удали маркеры конфликта (<<<<<<<, =======, >>>>>>>).\n\n4. Добавь файл в staging area:\n```bash\ngit add file.txt\n```\n\n5. Заверши слияние:\n```bash\ngit commit\n```\n\nОтмена слияния (если нужно начать заново):\n```bash\ngit merge --abort\n```\n\nКонфликты — это нормальная часть работы с Git, особенно при работе в команде."
  }
];

export default function QuizPage() {
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
    // Перемешиваем вопросы и варианты ответов заново при перезапуске
    window.location.reload(); // Перезагружаем страницу для нового перемешивания
  };

  const handleShowTheory = (questionIndex: number) => {
    // Находим исходный вопрос по ID для отображения теории
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
      
      // Записываем активность только если тест пройден успешно (>= 80%)
      if (percentage >= 80) {
        activityRecorded.current = true; // Помечаем, что активность записана
        recordActivity(1).catch((error) => {
          console.error("Ошибка при записи активности:", error);
          activityRecorded.current = false; // Сбрасываем флаг при ошибке
        });
      }

      // Сохраняем результат теста
      const saveTestResult = async () => {
        try {
          const requestBody = {
            testType: "quiz",
            topic: "git",
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
            // Обновляем трекер активности после успешного сохранения
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

    // Определяем сообщение в зависимости от результата
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
          {/* Фиксированная навигация слева */}
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

          <Header leftButton={{ href: "/gift", text: "← К материалу" }} />
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
                    href="/learn"
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
              {/* Затемнение фона */}
              <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
                style={{ animation: "fadeIn 0.3s ease-out" }}
              />
              
              {/* Модальное окно */}
              <div
                className="relative bg-[var(--bg-card)] rounded-2xl border border-[var(--border-main)] shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
                style={{ animation: "slideUp 0.3s ease-out" }}
              >
                {/* Заголовок */}
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

                {/* Содержимое */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="text-sm text-[var(--text-main)] leading-relaxed space-y-3">
                    {theoryContent.split('\n').map((line, index) => {
                      const trimmedLine = line.trim();
                      
                      // Блоки кода (между ```)
                      if (trimmedLine.startsWith('```')) {
                        return null;
                      }
                      
                      // Команды Git или команды терминала
                      if (trimmedLine.startsWith('git ') || 
                          trimmedLine.match(/^[a-z-]+\s+[a-z]/i) ||
                          trimmedLine.match(/^[a-z-]+:/i)) {
                        return (
                          <div key={index} className="font-mono text-xs bg-[var(--bg-secondary)] border border-[var(--border-main)] rounded-lg px-4 py-2 text-[var(--text-main)] my-2">
                            {line}
                          </div>
                        );
                      }
                      
                      // Нумерованные списки
                      if (trimmedLine.match(/^\d+\./)) {
                        return (
                          <div key={index} className="flex items-start gap-2 ml-2">
                            <span className="font-semibold text-[var(--text-main)] shrink-0">{trimmedLine.match(/^\d+\./)?.[0]}</span>
                            <span className="text-[var(--text-main)]">{trimmedLine.replace(/^\d+\.\s*/, '')}</span>
                          </div>
                        );
                      }
                      
                      // Маркированные списки
                      if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-')) {
                        return (
                          <div key={index} className="flex items-start gap-2 ml-2">
                            <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--button-bg)] mt-1.5" />
                            <span className="text-[var(--text-main)]">{trimmedLine.replace(/^[•-]\s*/, '')}</span>
                          </div>
                        );
                      }
                      
                      // Пустые строки
                      if (trimmedLine === '') {
                        return <div key={index} className="h-2" />;
                      }
                      
                      // Обычный текст
                      return (
                        <p key={index} className="text-[var(--text-main)]">
                          {line}
                        </p>
                      );
                    })}
                  </div>
                </div>

                {/* Кнопка закрытия */}
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
        {/* Фиксированная навигация слева */}
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
                  <span className="transition-opacity duration-200 opacity-70 hover:opacity-100">Подарок</span>
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

        <Header leftButton={{ href: "/gift", text: "← К материалу" }} />
        <MotivationalQuotes />

        <main className="mx-auto max-w-6xl px-5 py-6">
          <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)] p-8 shadow-sm">
            {/* Прогресс */}
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

            {/* Вопрос */}
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

            {/* Навигация */}
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

