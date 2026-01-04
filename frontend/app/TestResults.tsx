"use client";

import { useState, useEffect } from "react";
import { useTimezone } from "./hooks/useTimezone";
import { formatDateWithTimezone } from "./utils/timezone";

interface TestResult {
  id: number;
  testType: string;
  topic?: string;
  correctAnswers: number;
  totalQuestions: number;
  percentage: number;
  completedAt: string;
}

interface TestResultsProps {
  userId?: number;
}

interface BestResult {
  testType: string;
  topic: string;
  result: TestResult;
}

export function TestResults({ userId }: TestResultsProps) {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAllResults, setShowAllResults] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { timezone } = useTimezone();

  useEffect(() => {
    if (userId) {
      loadTestResults();
    } else {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (showAllResults) {
      document.body.style.overflow = "hidden";
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      document.body.style.overflow = "unset";
      setIsAnimating(false);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showAllResults]);

  const loadTestResults = async () => {
    try {
      const response = await fetch("/api/test-results/me", {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        if (data.results && Array.isArray(data.results)) {
          setTestResults(data.results);
        } else {
          setTestResults([]);
        }
      } else {
        setTestResults([]);
      }
    } catch (error) {
      console.error("Ошибка загрузки результатов тестов:", error);
      setTestResults([]);
    } finally {
      setLoading(false);
    }
  };

  const getBestResults = (): BestResult[] => {
    const bestResultsMap = new Map<string, TestResult>();

    testResults.forEach((result) => {
      // Используем комбинацию типа теста и темы как ключ
      const topic = result.topic || "unknown";
      const key = `${result.testType}-${topic}`;
      const existing = bestResultsMap.get(key);
      if (!existing || result.percentage > existing.percentage) {
        bestResultsMap.set(key, result);
      }
    });

    return Array.from(bestResultsMap.entries()).map(([key, result]) => {
      const parts = key.split('-');
      const testType = parts[0];
      const topic = parts.slice(1).join('-') || result.topic || "unknown";
      return {
        testType,
        topic,
        result,
      };
    });
  };

  const getTestTypeName = (testType: string): string => {
    switch (testType) {
      case "quiz":
        return "Теоретический тест";
      case "quiz-practical":
        return "Практический тест";
      default:
        return testType;
    }
  };

  const getTopicName = (topic: string | undefined | null): string => {
    if (!topic || topic === "unknown") {
      return "Неизвестная тема";
    }
    switch (topic) {
      case "git":
        return "Git";
      case "java-core":
        return "Java Core";
      case "java-oop":
        return "Java OOP";
      case "java-collections":
        return "Java Collections";
      default:
        return topic;
    }
  };

  const formatDate = (dateString: string): string => {
    if (!timezone) {
      // Fallback на стандартное форматирование, если временной пояс еще не определен
      const date = new Date(dateString);
      return date.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return formatDateWithTimezone(dateString, timezone);
  };

  const getPercentageColor = (percentage: number): string => {
    if (percentage >= 95) return "text-green-600 dark:text-green-400";
    if (percentage >= 80) return "text-green-500 dark:text-green-500";
    if (percentage >= 60) return "text-yellow-500 dark:text-yellow-500";
    return "text-red-500 dark:text-red-500";
  };

  const handleCloseModal = () => {
    setIsAnimating(false);
    setTimeout(() => setShowAllResults(false), 300);
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)] p-6">
        <h2 className="text-lg font-semibold text-[var(--text-main)] mb-4">
          Результаты тестирования
        </h2>
        <div className="flex items-center justify-center py-12">
          <p className="text-sm text-[var(--text-muted)]">Загрузка данных...</p>
        </div>
      </div>
    );
  }

  const bestResults = getBestResults();

  if (testResults.length === 0) {
    return (
      <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)] p-6">
        <h2 className="text-lg font-semibold text-[var(--text-main)] mb-4">
          Результаты тестирования
        </h2>
        <div className="flex items-center justify-center py-12">
          <p className="text-sm text-[var(--text-muted)]">
            Пока нет результатов тестирования
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)] p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[var(--text-main)]">
            Результаты тестирования
          </h2>
          {testResults.length > bestResults.length && (
            <button
              onClick={() => setShowAllResults(true)}
              className="text-sm text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
            >
              Все результаты ({testResults.length})
            </button>
          )}
        </div>
        <div className="space-y-3">
          {bestResults.map(({ testType, topic, result }) => (
            <div
              key={`best-${testType}-${topic}`}
              className="rounded-xl border border-[var(--border-main)] bg-[var(--bg-secondary)] p-4"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-sm font-semibold text-[var(--text-main)]">
                    {getTopicName(topic)} - {getTestTypeName(testType)} (лучший результат)
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    {formatDate(result.completedAt)}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className={`text-lg font-semibold ${getPercentageColor(
                      result.percentage
                    )}`}
                  >
                    {result.percentage}%
                  </p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-[var(--border-main)]">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--text-muted)]">
                    Правильных ответов:
                  </span>
                  <span className="text-[var(--text-main)] font-medium">
                    {result.correctAnswers} из {result.totalQuestions}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Модальное окно со всеми результатами */}
      {showAllResults && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleCloseModal}
        >
          {/* Overlay */}
          <div
            className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
              isAnimating ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Modal */}
          <div
            className={`relative z-10 w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)] shadow-xl transition-all duration-300 ${
              isAnimating
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-4 scale-95"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--border-main)] bg-[var(--bg-card)] px-6 py-4">
              <h2 className="text-xl font-semibold text-[var(--text-main)]">
                Все результаты тестирования
              </h2>
              <button
                onClick={handleCloseModal}
                className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)] transition-colors"
                aria-label="Закрыть"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-80px)] px-6 py-6">
              <div className="space-y-3">
                {testResults.map((result) => (
                  <div
                    key={result.id}
                    className="rounded-xl border border-[var(--border-main)] bg-[var(--bg-secondary)] p-4"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-sm font-semibold text-[var(--text-main)]">
                          {getTopicName(result.topic || "unknown")} - {getTestTypeName(result.testType)}
                        </h3>
                        <p className="text-xs text-[var(--text-muted)] mt-1">
                          {formatDate(result.completedAt)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-lg font-semibold ${getPercentageColor(
                            result.percentage
                          )}`}
                        >
                          {result.percentage}%
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-[var(--border-main)]">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[var(--text-muted)]">
                          Правильных ответов:
                        </span>
                        <span className="text-[var(--text-main)] font-medium">
                          {result.correctAnswers} из {result.totalQuestions}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

