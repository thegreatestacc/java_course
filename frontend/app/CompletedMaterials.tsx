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

// Определяем материалы для каждого уровня
const LEVEL_MATERIALS: Record<string, string[]> = {
  "Junior Java Developer": [
    "gift/basics",
    "gift/branches",
    "gift/remote",
    "gift/advanced",
    "learn/java-core/basics",
    "learn/java-core/variables",
    "learn/java-core/control-flow",
    "learn/java-oop",
    "learn/java-oop/equals-hashcode",
    "learn/java-collections/list",
    "learn/java-collections/set",
    "learn/java-collections/map",
    "learn/junior"
  ],
  "Middle Java Developer": [
    "learn/middle"
  ],
  "Чистая архитектура сервисов": [
    "learn/clean-architecture"
  ]
};

export function CompletedMaterials({ userId }: CompletedMaterialsProps) {
  const [materials, setMaterials] = useState<MaterialProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedLevels, setExpandedLevels] = useState<Set<string>>(
    new Set()
  );

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
          const sorted = data.sort((a, b) => 
            new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
          );
          setMaterials(sorted);
        } else {
          console.warn("API вернул не массив:", data);
          setMaterials([]);
        }
      } else if (response.status === 401) {
        setMaterials([]);
      } else {
        const errorText = await response.text().catch(() => response.statusText);
        console.error("Ошибка загрузки прочитанных материалов:", response.status, errorText);
        setMaterials([]);
        if (response.status !== 401) {
          setError("Не удалось загрузить прочитанные материалы");
        }
      }
    } catch (error) {
      console.error("Ошибка загрузки прочитанных материалов:", error);
      setMaterials([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCompletedMaterials();
  }, [loadCompletedMaterials]);

  useEffect(() => {
    const handleFocus = () => {
      loadCompletedMaterials();
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [loadCompletedMaterials]);

  const handleUncompleteMaterial = async (materialId: string) => {
    const previousMaterials = [...materials];
    setMaterials(prev => prev.filter(m => m.materialId !== materialId));
    
    try {
      const encodedMaterialId = encodeURIComponent(materialId);
      const response = await fetch(`/api/statistics/materials/complete?materialId=${encodedMaterialId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        const refreshResponse = await fetch("/api/statistics/materials/completed", {
          credentials: "include",
        });
        
        if (refreshResponse.ok) {
          const data = await refreshResponse.json();
          if (Array.isArray(data)) {
            const sorted = data.sort((a, b) => 
              new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
            );
            setMaterials(sorted);
          }
        }
      } else {
        setMaterials(previousMaterials);
        const errorText = await response.text();
        alert(errorText || "Ошибка при откате материала");
      }
    } catch (error) {
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
      "learn/java-oop/equals-hashcode": "equals() и hashCode()",
      "learn/java-collections/list": "Java Collections: List",
      "learn/java-collections/set": "Java Collections: Set",
      "learn/java-collections/map": "Java Collections: Map",
      "learn/junior": "Обзор Junior Java Developer",
      "learn/middle": "Обзор Middle Java Developer",
      "learn/clean-architecture": "Чистая архитектура сервисов",
    };
    return materialNames[materialId] || materialId;
  };

  const getMaterialLink = (materialId: string): string => {
    if (materialId.startsWith("gift/")) {
      return `/${materialId}`;
    } else if (materialId.startsWith("learn/")) {
      return `/${materialId}`;
    }
    return "/learn";
  };

  const getLevelLink = (level: string): string => {
    const levelLinks: Record<string, string> = {
      "Junior Java Developer": "/learn/junior",
      "Middle Java Developer": "/learn/middle",
      "Чистая архитектура сервисов": "/learn/clean-architecture",
    };
    return levelLinks[level] || "/learn";
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

  // Группируем материалы по уровням
  const levelStats = useMemo(() => {
    const completedMaterialIds = new Set(materials.map(m => m.materialId));
    
    return Object.entries(LEVEL_MATERIALS).map(([level, materialIds]) => {
      const completed = materialIds.filter(id => completedMaterialIds.has(id));
      const uncompleted = materialIds.filter(id => !completedMaterialIds.has(id));
      const completedMaterials = materials.filter(m => materialIds.includes(m.materialId));
      
      return {
        level,
        totalCount: materialIds.length,
        completedCount: completed.length,
        completedMaterials,
        uncompletedMaterialIds: uncompleted,
      };
    });
  }, [materials]);

  const toggleLevel = (level: string) => {
    setExpandedLevels(prev => {
      const newSet = new Set(prev);
      if (newSet.has(level)) {
        newSet.delete(level);
      } else {
        newSet.add(level);
      }
      return newSet;
    });
  };

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
    <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)] p-6">
      <div className="flex items-center justify-between mb-6">
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

      <div className="space-y-6">
        {levelStats.map(({ level, totalCount, completedCount, completedMaterials, uncompletedMaterialIds }) => {
          const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
          const hasProgress = completedCount > 0;
          const isExpanded = expandedLevels.has(level);

          return (
            <div
              key={level}
              className="rounded-xl border border-[var(--border-main)] bg-[var(--bg-secondary)] overflow-hidden"
            >
              {/* Заголовок уровня с прогрессом */}
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    {/* Иконка сворачивания/разворачивания */}
                    <button
                      onClick={() => toggleLevel(level)}
                      className="flex-shrink-0 p-1 hover:bg-[var(--bg-muted)] rounded transition-colors"
                      title={isExpanded ? "Свернуть" : "Развернуть"}
                    >
                      <svg
                        className={`w-5 h-5 text-[var(--text-muted)] transition-transform duration-300 ${
                          isExpanded ? "rotate-90" : "rotate-0"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                    <h3 className="text-base font-semibold text-[var(--text-main)]">
                      {level}
                    </h3>
                    <span className="text-xs text-[var(--text-muted)]">
                      {completedCount} из {totalCount}
                    </span>
                    {/* Медали для Junior Java Developer */}
                    {level === "Junior Java Developer" && progressPercentage >= 80 && (
                      <div className="flex items-center gap-1">
                        {progressPercentage >= 95 && (
                          <div className="flex items-center justify-center" title="Золотая медаль - 95%">
                            <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                            </svg>
                          </div>
                        )}
                        {progressPercentage >= 85 && progressPercentage < 95 && (
                          <div className="flex items-center justify-center" title="Серебряная медаль - 85%">
                            <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                            </svg>
                          </div>
                        )}
                        {progressPercentage >= 80 && progressPercentage < 85 && (
                          <div className="flex items-center justify-center" title="Медная медаль - 80%">
                            <svg className="w-5 h-5 text-amber-700" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                            </svg>
                          </div>
                        )}
                      </div>
                    )}
                    {/* Галочка для других уровней */}
                    {level !== "Junior Java Developer" && hasProgress && (
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
                  </div>
                  <div className="flex items-center gap-3">
                    <Link
                      href={getLevelLink(level)}
                      className="px-3 py-1.5 text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] border border-[var(--border-main)] rounded-lg hover:bg-[var(--bg-muted)] transition-colors whitespace-nowrap"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Перейти
                    </Link>
                    <div className="text-xs font-medium text-[var(--text-muted)]">
                      {progressPercentage}%
                    </div>
                  </div>
                </div>

                {/* Прогресс-бар */}
                <div className="mt-3 w-full h-2 bg-[var(--bg-muted)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[var(--button-bg)] transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              {/* Содержимое с плавной анимацией */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isExpanded ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-5 pb-5 space-y-4">

                  {/* Прочитанные материалы */}
                  {completedMaterials.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-[var(--text-muted)] mb-2 uppercase tracking-wider">
                        Прочитано
                      </h4>
                      <div className="space-y-2">
                        {completedMaterials.map((material) => (
                          <div
                            key={material.id}
                            className="rounded-lg border border-[var(--border-main)] bg-[var(--bg-card)] p-3"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-start gap-2 flex-1 min-w-0">
                                <div className="flex-shrink-0 mt-0.5">
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
                                </div>
                                <div className="flex-1 min-w-0">
                                  <Link
                                    href={getMaterialLink(material.materialId)}
                                    className="block group"
                                  >
                                    <h5 className="text-sm font-semibold text-[var(--text-main)] group-hover:text-[var(--button-bg)] transition-colors">
                                      {getMaterialName(material.materialId)}
                                    </h5>
                                  </Link>
                                  <p className="text-xs text-[var(--text-muted)] mt-1">
                                    Завершено: {formatDate(material.completedAt)}
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() => handleUncompleteMaterial(material.materialId)}
                                className="flex-shrink-0 px-2 py-1 text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] border border-[var(--border-main)] rounded-lg hover:bg-[var(--bg-muted)] transition-colors"
                                title="Откатить материал"
                              >
                                Откатить
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Непрочитанные материалы */}
                  {uncompletedMaterialIds.length > 0 && (
                    <div>
                      {completedMaterials.length > 0 && (
                        <h4 className="text-xs font-semibold text-[var(--text-muted)] mb-2 uppercase tracking-wider">
                          Осталось прочитать
                        </h4>
                      )}
                      <div className="space-y-2">
                        {uncompletedMaterialIds.map((materialId) => (
                          <div
                            key={materialId}
                            className="rounded-lg border border-[var(--border-main)] bg-[var(--bg-card)] p-3 opacity-70"
                          >
                            <Link
                              href={getMaterialLink(materialId)}
                              className="block group"
                            >
                              <h5 className="text-sm font-semibold text-[var(--text-main)] group-hover:text-[var(--button-bg)] transition-colors">
                                {getMaterialName(materialId)}
                              </h5>
                              <p className="text-xs text-[var(--text-muted)] mt-1">
                                Не прочитано
                              </p>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
