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
  {
    id: 1,
    question: "Какая команда инициализирует новый Git репозиторий?",
    correctAnswer: "git init",
    theory: "Команда `git init` инициализирует новый репозиторий в текущей папке. Она создает скрытую папку `.git`, в которой хранится вся информация о репозитории."
  },
  {
    id: 2,
    question: "Какая команда добавляет все измененные файлы в staging area?",
    correctAnswer: "git add .",
    theory: "Команда `git add .` добавляет все измененные файлы в staging area (индекс). Staging area — это промежуточная область, где файлы готовятся к коммиту."
  },
  {
    id: 3,
    question: "Какая команда создает новый коммит с сообщением?",
    correctAnswer: "git commit -m",
    theory: "Команда `git commit -m \"сообщение\"` создает новый коммит с изменениями, которые находятся в staging area. Флаг `-m` позволяет указать сообщение коммита прямо в команде."
  },
  {
    id: 4,
    question: "Какая команда создает новую ветку с именем 'feature'?",
    correctAnswer: "git branch feature",
    theory: "Команда `git branch feature` создает новую ветку с именем 'feature'. Для переключения на эту ветку используй `git checkout feature` или `git switch feature`."
  },
  {
    id: 5,
    question: "Какая команда переключается на ветку 'main'?",
    correctAnswer: "git checkout main",
    theory: "Команда `git checkout main` переключается на ветку 'main'. Современная альтернатива — `git switch main` (доступна с Git 2.23+)."
  },
  {
    id: 6,
    question: "Какая команда объединяет изменения из ветки 'feature' в текущую ветку?",
    correctAnswer: "git merge feature",
    theory: "Команда `git merge feature` объединяет изменения из ветки 'feature' в текущую ветку. Сначала нужно переключиться на целевую ветку (обычно main), затем выполнить merge."
  },
  {
    id: 7,
    question: "Какая команда отправляет изменения на удаленный репозиторий?",
    correctAnswer: "git push",
    theory: "Команда `git push` отправляет изменения из локального репозитория на удаленный репозиторий. При первом push используй `git push -u origin branch-name` для установки upstream."
  },
  {
    id: 8,
    question: "Какая команда скачивает и объединяет изменения с удаленного репозитория?",
    correctAnswer: "git pull",
    theory: "Команда `git pull` скачивает изменения с удаленного репозитория и автоматически объединяет их с текущей веткой. По сути, это `git fetch` + `git merge`."
  },
  {
    id: 9,
    question: "Какая команда показывает статус изменений в репозитории?",
    correctAnswer: "git status",
    theory: "Команда `git status` показывает какие файлы изменены, добавлены или удалены. Она помогает понять текущее состояние рабочей директории и staging area."
  },
  {
    id: 10,
    question: "Какая команда показывает историю коммитов?",
    correctAnswer: "git log",
    theory: "Команда `git log` показывает историю коммитов. Для более компактного вида используй `git log --oneline`. Для визуализации всех веток: `git log --graph --oneline --all`."
  }
];

export default function PracticalQuizPage() {
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
    // Перезагружаем страницу для нового перемешивания
    window.location.reload();
  };

  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [theoryContent, setTheoryContent] = useState("");

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
            testType: "quiz-practical",
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
  const isAnswered = answers[currentQuestionIndex].trim() !== "";
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
                <label className="block">
                  <span className="text-sm font-medium text-[var(--text-muted)] mb-2 block">
                    Введите команду Git:
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
                  Введите команду Git в точности, как она используется в терминале
                </p>
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

