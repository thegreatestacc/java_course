"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";

interface MaterialProgress {
  id: number;
  materialId: string;
  completedAt: string;
}

interface CompletedMaterialsProps {
  userId?: number;
}

interface GroupedMaterials {
  [topic: string]: MaterialProgress[];
}

export function CompletedMaterials({ userId }: CompletedMaterialsProps) {
  const [materials, setMaterials] = useState<MaterialProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const loadCompletedMaterials = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/statistics/materials/completed", {
        credentials: "include",
      });
      
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          // Сортируем по дате завершения (новые сначала)
          const sorted = data.sort((a, b) => 
            new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
          );
          setMaterials(sorted);
        } else {
          console.warn("API вернул не массив:", data);
          setMaterials([]);
        }
      } else if (response.status === 401) {
        // Пользователь не авторизован - это нормально, просто показываем пустой список
        setMaterials([]);
      } else {
        const errorText = await response.text().catch(() => response.statusText);
        console.error("Ошибка загрузки прочитанных материалов:", response.status, errorText);
        setMaterials([]);
        // Не устанавливаем ошибку для 401, так как это нормальная ситуация
        if (response.status !== 401) {
          setError("Не удалось загрузить прочитанные материалы");
        }
      }
    } catch (error) {
      console.error("Ошибка загрузки прочитанных материалов:", error);
      setMaterials([]);
      // Не показываем ошибку, если это просто проблема с сетью - показываем пустой список
      // setError("Ошибка подключения к серверу");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Всегда пытаемся загрузить данные, даже если userId не передан
    // API сам проверит авторизацию через сессию
    loadCompletedMaterials();
  }, [loadCompletedMaterials]);

  // Перезагружаем материалы при фокусе на странице
  useEffect(() => {
    const handleFocus = () => {
      loadCompletedMaterials();
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [loadCompletedMaterials]);

  const handleUncompleteMaterial = async (materialId: string) => {
    // Сохраняем текущее состояние для отката в случае ошибки
    const previousMaterials = [...materials];
    
    // Оптимистичное обновление - сразу удаляем материал из списка
    // Это обновит UI мгновенно, без перезагрузки
    setMaterials(prev => prev.filter(m => m.materialId !== materialId));
    
    try {
      const encodedMaterialId = encodeURIComponent(materialId);
      const response = await fetch(`/api/statistics/materials/complete?materialId=${encodedMaterialId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        // Обновляем данные в фоне, не показывая индикатор загрузки
        // и не сбрасывая состояние модального окна
        const refreshResponse = await fetch("/api/statistics/materials/completed", {
          credentials: "include",
        });
        
        if (refreshResponse.ok) {
          const data = await refreshResponse.json();
          if (Array.isArray(data)) {
            const sorted = data.sort((a, b) => 
              new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
            );
            // Обновляем материалы, сохраняя открытое модальное окно
            setMaterials(sorted);
          }
        }
      } else {
        // В случае ошибки откатываем изменения
        setMaterials(previousMaterials);
        const errorText = await response.text();
        alert(errorText || "Ошибка при откате материала");
      }
    } catch (error) {
      // В случае ошибки откатываем изменения
      setMaterials(previousMaterials);
      console.error("Ошибка при откате материала:", error);
      alert("Ошибка при откате материала");
    }
  };

  const getMaterialName = (materialId: string): string => {
    const materialNames: Record<string, string> = {
      "gift/basics": "Основы Git",
      "gift/branches": "Работа с ветками",
      "gift/remote": "Удаленные репозитории",
      "gift/advanced": "Продвинутые техники Git",
      "learn/java-core/basics": "Java Core: Основы",
      "learn/java-core/variables": "Java Core: Переменные",
      "learn/java-core/control-flow": "Java Core: Управляющие конструкции",
      "learn/java-oop": "Java OOP",
      "learn/java-collections": "Java Collections",
      "learn/java-collections/list": "Java Collections: List и его реализации",
      "learn/java-collections/set": "Java Collections: Set и его реализации",
      "learn/java-collections/map": "Java Collections: Map и его реализации",
      "learn/git": "Основы Git",
    };
    return materialNames[materialId] || materialId;
  };

  const getMaterialLink = (materialId: string): string => {
    // Преобразуем materialId в путь
    if (materialId.startsWith("gift/")) {
      return `/${materialId}`;
    } else if (materialId.startsWith("learn/")) {
      return `/${materialId}`;
    }
    return "/learn";
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Определяем все материалы для каждого раздела
  const TOPIC_MATERIALS: Record<string, string[]> = {
    "Git": ["gift/basics", "gift/branches", "gift/remote", "gift/advanced"],
    "Java Core": ["learn/java-core/basics", "learn/java-core/variables", "learn/java-core/control-flow"],
    "Java OOP": ["learn/java-oop"],
    "Java Collections": ["learn/java-collections/list", "learn/java-collections/set", "learn/java-collections/map"],
  };

  const getTopicFromMaterialId = (materialId: string): string => {
    // Сначала проверяем точное совпадение
    for (const [topic, materials] of Object.entries(TOPIC_MATERIALS)) {
      if (materials.includes(materialId)) {
        return topic;
      }
    }
    // Если точного совпадения нет, проверяем по префиксу для подстраниц
    if (materialId.startsWith("learn/java-collections/")) {
      return "Java Collections";
    }
    if (materialId.startsWith("learn/java-core/")) {
      return "Java Core";
    }
    if (materialId.startsWith("gift/")) {
      return "Git";
    }
    if (materialId === "learn/java-oop") {
      return "Java OOP";
    }
    return "Другое";
  };

  const groupMaterialsByTopic = (materials: MaterialProgress[]): GroupedMaterials => {
    const grouped: GroupedMaterials = {};
    materials.forEach((material) => {
      const topic = getTopicFromMaterialId(material.materialId);
      if (!grouped[topic]) {
        grouped[topic] = [];
      }
      grouped[topic].push(material);
    });
    // Сортируем материалы внутри каждой группы по дате (новые сначала)
    Object.keys(grouped).forEach((topic) => {
      grouped[topic].sort((a, b) => 
        new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
      );
    });
    return grouped;
  };

  const getTopicName = (topic: string): string => {
    return topic;
  };

  const handleTopicClick = (topic: string) => {
    setSelectedTopic(topic);
    setIsAnimating(false);
    setTimeout(() => setIsAnimating(true), 10);
  };

  const handleCloseModal = () => {
    setIsAnimating(false);
    setTimeout(() => setSelectedTopic(null), 300);
  };

  useEffect(() => {
    if (selectedTopic) {
      document.body.style.overflow = "hidden";
      // Убеждаемся, что анимация активна, если модальное окно открыто
      // Используем отдельный таймер, чтобы не создавать бесконечный цикл
      const timer = setTimeout(() => {
        if (selectedTopic && !isAnimating) {
          setIsAnimating(true);
        }
      }, 10);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedTopic]);

  // Безопасная группировка материалов с обработкой ошибок
  // Используем useMemo для оптимизации и предотвращения лишних пересчетов
  // ВАЖНО: useMemo должен быть вызван ДО всех условных возвратов, чтобы соблюдать правила хуков
  const { groupedMaterials, topicStats } = useMemo(() => {
    let grouped: GroupedMaterials = {};
    let stats: Array<{ topic: string; completedCount: number; totalCount: number; hasCompleted: boolean; materials: MaterialProgress[] }> = [];
    
    try {
      grouped = groupMaterialsByTopic(materials);
      
      // Создаем объект со статистикой для всех разделов
      stats = Object.keys(TOPIC_MATERIALS).map((topic) => {
        const allMaterials = TOPIC_MATERIALS[topic];
        const completedMaterials = grouped[topic] || [];
        const completedCount = completedMaterials.length;
        const totalCount = allMaterials.length;
        const hasCompleted = completedCount > 0;
        
        return {
          topic,
          completedCount,
          totalCount,
          hasCompleted,
          materials: completedMaterials,
        };
      });
    } catch (err) {
      console.error("Ошибка при группировке материалов:", err);
      // В случае ошибки показываем пустой список, но компонент все равно отображается
      stats = [];
    }
    
    return { groupedMaterials: grouped, topicStats: stats };
  }, [materials]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)] p-6">
        <h2 className="text-lg font-semibold text-[var(--text-main)] mb-4">
          Прочитанные материалы
        </h2>
        <div className="flex items-center justify-center py-12">
          <p className="text-sm text-[var(--text-muted)]">Загрузка данных...</p>
        </div>
      </div>
    );
  }

  // Всегда показываем раздел, даже если нет материалов или есть ошибка
  if (materials.length === 0 && !error) {
    return (
      <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)] p-6">
        <h2 className="text-lg font-semibold text-[var(--text-main)] mb-4">
          Прочитанные материалы
        </h2>
        <div className="flex items-center justify-center py-12">
          <p className="text-sm text-[var(--text-muted)]">
            Пока нет прочитанных материалов
          </p>
        </div>
      </div>
    );
  }

  // Если есть ошибка, показываем её, но все равно отображаем раздел
  if (error && materials.length === 0) {
    return (
      <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)] p-6">
        <h2 className="text-lg font-semibold text-[var(--text-main)] mb-4">
          Прочитанные материалы
        </h2>
        <div className="flex flex-col items-center justify-center py-12 space-y-3">
          <p className="text-sm text-[var(--text-muted)]">
            {error}
          </p>
          <button
            onClick={loadCompletedMaterials}
            className="px-4 py-2 text-sm font-medium text-[var(--text-main)] border border-[var(--border-main)] rounded-lg hover:bg-[var(--bg-muted)] transition-colors"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)] p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[var(--text-main)]">
            Прочитанные материалы
          </h2>
          {error && (
            <button
              onClick={loadCompletedMaterials}
              className="text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] underline"
              title="Обновить данные"
            >
              Обновить
            </button>
          )}
        </div>
        {error && (
          <div className="mb-4 p-3 rounded-lg border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20">
            <p className="text-xs text-orange-700 dark:text-orange-300">
              {error}
            </p>
          </div>
        )}
        <div className="flex flex-wrap gap-3">
          {topicStats.length > 0 ? (
            topicStats.map(({ topic, completedCount, totalCount, hasCompleted }) => (
            <button
              key={topic}
              onClick={() => handleTopicClick(topic)}
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors ${
                hasCompleted
                  ? "border-[var(--border-main)] bg-[var(--bg-secondary)] text-[var(--text-main)] hover:bg-[var(--bg-muted)]"
                  : "border-[var(--border-secondary)] bg-[var(--bg-card)] text-[var(--text-muted)] hover:bg-[var(--bg-secondary)]"
              }`}
            >
              <span>{getTopicName(topic)}</span>
              <span className={`text-xs ${
                hasCompleted ? "text-[var(--text-muted)]" : "text-[var(--text-muted)] opacity-70"
              }`}>
                {completedCount} из {totalCount}
              </span>
              {hasCompleted && (
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-500/20">
                  <svg
                    className="w-3 h-3 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
            </button>
            ))
          ) : (
            <p className="text-sm text-[var(--text-muted)]">
              Нет доступных разделов
            </p>
          )}
        </div>
      </div>

      {/* Модальное окно с материалами по теме */}
      {selectedTopic && (
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
                {getTopicName(selectedTopic)} ({groupedMaterials[selectedTopic]?.length || 0} из {TOPIC_MATERIALS[selectedTopic]?.length || 0})
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
                {/* Прочитанные материалы */}
                {groupedMaterials[selectedTopic]?.length > 0 ? (
                  <>
                    {groupedMaterials[selectedTopic].map((material) => (
                      <div
                        key={material.id}
                        className="rounded-xl border border-[var(--border-main)] bg-[var(--bg-secondary)] p-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-0.5">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20">
                              <svg
                                className="w-4 h-4 text-green-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <Link
                              href={getMaterialLink(material.materialId)}
                              className="block group"
                              onClick={handleCloseModal}
                            >
                              <h3 className="text-sm font-semibold text-[var(--text-main)] group-hover:text-[var(--button-bg)] transition-colors">
                                {getMaterialName(material.materialId)}
                              </h3>
                            </Link>
                            <p className="text-xs text-[var(--text-muted)] mt-1">
                              Завершено: {formatDate(material.completedAt)}
                            </p>
                          </div>
                          <button
                            onClick={() => handleUncompleteMaterial(material.materialId)}
                            className="flex-shrink-0 ml-2 px-3 py-1.5 text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] border border-[var(--border-main)] rounded-lg hover:bg-[var(--bg-muted)] transition-colors"
                            title="Откатить материал"
                          >
                            Откатить
                          </button>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-[var(--text-muted)]">
                      Пока нет прочитанных материалов по этой теме
                    </p>
                  </div>
                )}

                {/* Разделитель и непрочитанные материалы */}
                {(() => {
                  const allMaterials = TOPIC_MATERIALS[selectedTopic] || [];
                  const completedMaterialIds = new Set(
                    groupedMaterials[selectedTopic]?.map(m => m.materialId) || []
                  );
                  const uncompletedMaterials = allMaterials.filter(
                    materialId => !completedMaterialIds.has(materialId)
                  );

                  if (uncompletedMaterials.length > 0) {
                    return (
                      <>
                        {/* Разделитель */}
                        {groupedMaterials[selectedTopic]?.length > 0 && (
                          <div className="my-4 border-t border-[var(--border-main)]" />
                        )}
                        
                        {/* Заголовок "Осталось прочитать" */}
                        <h3 className="text-sm font-semibold text-[var(--text-muted)] mb-3">
                          Осталось прочитать
                        </h3>

                        {/* Непрочитанные материалы */}
                        {uncompletedMaterials.map((materialId) => (
                          <div
                            key={materialId}
                            className="rounded-xl border border-[var(--border-main)] bg-[var(--bg-secondary)] p-4 opacity-70"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <Link
                                  href={getMaterialLink(materialId)}
                                  className="block group"
                                  onClick={handleCloseModal}
                                >
                                  <h3 className="text-sm font-semibold text-[var(--text-main)] group-hover:text-[var(--button-bg)] transition-colors">
                                    {getMaterialName(materialId)}
                                  </h3>
                                </Link>
                                <p className="text-xs text-[var(--text-muted)] mt-1">
                                  Не прочитано
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    );
                  }
                  return null;
                })()}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

