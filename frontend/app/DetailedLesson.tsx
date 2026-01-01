"use client";

import { useAuth } from "./useAuth";
import { useState, useEffect } from "react";
import { triggerActivityUpdate } from "./utils/activityTracker";

interface DetailedLessonProps {
  materialId: string;
  title: string;
  description: string;
  sections: Array<{ subtitle: string; content: string[] }>;
}

export function DetailedLesson({ 
  materialId,
  title, 
  description, 
  sections 
}: DetailedLessonProps) {
  const { user } = useAuth();
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  // Проверяем статус завершения материала при загрузке
  useEffect(() => {
    const checkCompletionStatus = async () => {
      if (!user) {
        setCheckingStatus(false);
        return;
      }

      try {
        // Используем query parameter вместо path variable
        const encodedMaterialId = encodeURIComponent(materialId);
        const response = await fetch(`/api/statistics/materials/status?materialId=${encodedMaterialId}`, {
          credentials: "include",
        });

        if (response.ok) {
          const isCompleted = await response.json();
          setCompleted(isCompleted);
        }
      } catch (err) {
        console.error("Ошибка проверки статуса:", err);
      } finally {
        setCheckingStatus(false);
      }
    };

    checkCompletionStatus();
  }, [user, materialId]);

  const handleComplete = async () => {
    if (!user) {
      alert("Для завершения материала необходимо войти в систему");
      return;
    }

    setLoading(true);
    try {
      // Используем query parameter вместо path variable
      const encodedMaterialId = encodeURIComponent(materialId);
      const response = await fetch(`/api/statistics/materials/complete?materialId=${encodedMaterialId}`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        // Устанавливаем статус как завершенный
        console.log("Материал успешно завершен, обновляем UI");
        setCompleted(true);
        // Обновляем трекер активности
        triggerActivityUpdate();
        console.log("Статус completed установлен в:", true);
      } else {
        const errorText = await response.text();
        console.error("Ошибка сохранения прогресса:", errorText);
        alert(errorText || "Ошибка при сохранении прогресса");
      }
    } catch (err) {
      console.error("Ошибка:", err);
      alert("Ошибка при сохранении прогресса");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)] p-6 shadow-sm">
      <h3 className="text-lg font-semibold tracking-tight text-[var(--text-main)] mb-2">
        {title}
      </h3>
      <p className="text-sm text-[var(--text-muted)] mb-6">
        {description}
      </p>
      <div className="space-y-6">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-3">
            <h4 className="text-sm font-semibold text-[var(--text-main)]">
              {section.subtitle}
            </h4>
            <div className="rounded-xl border border-[var(--border-main)] bg-[var(--bg-secondary)] p-4">
              <div className="space-y-2.5 text-sm text-[var(--text-muted)] leading-relaxed">
                {section.content.map((line, lineIndex) => {
                  if (line.trim() === "") {
                    return <div key={lineIndex} className="h-2" />;
                  }
                  // Команды Git и другие команды терминала
                  if (line.startsWith("git ") || line.startsWith("cd ") || line.startsWith("sudo ") || line.match(/^[a-z-]+\s+[a-z]/i)) {
                    return (
                      <div key={lineIndex} className="font-mono text-xs bg-[var(--bg-card)] border border-[var(--border-main)] rounded-lg px-3 py-2 text-[var(--text-main)]">
                        <span className="text-[var(--text-muted)]">$</span> {line}
                      </div>
                    );
                  }
                  // Заголовки разделов (например, "Установка Git:")
                  if (line.endsWith(":") && !line.includes("•") && line.length < 50) {
                    return (
                      <p key={lineIndex} className="font-semibold text-[var(--text-main)] mt-3 first:mt-0">
                        {line}
                      </p>
                    );
                  }
                  // Маркированные списки
                  if (line.startsWith("•")) {
                    return (
                      <div key={lineIndex} className="flex items-start gap-2 ml-2">
                        <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--button-bg)] mt-1.5" />
                        <span>{line.replace(/^•\s*/, "")}</span>
                      </div>
                    );
                  }
                  // Нумерованные списки
                  if (line.match(/^\d+\.\s/)) {
                    const match = line.match(/^(\d+)\.\s(.+)/);
                    return (
                      <div key={lineIndex} className="flex items-start gap-2 ml-2">
                        <span className="font-semibold text-[var(--text-main)] shrink-0">{match?.[1]}.</span>
                        <span>{match?.[2]}</span>
                      </div>
                    );
                  }
                  // Предупреждения
                  if (line.includes("⚠️") || line.includes("ВНИМАНИЕ")) {
                    return (
                      <p key={lineIndex} className="text-xs font-medium text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg px-3 py-2">
                        {line}
                      </p>
                    );
                  }
                  // Обычный текст
                  return <p key={lineIndex}>{line}</p>;
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Кнопка завершения */}
      <div className="mt-6 pt-6 border-t border-[var(--border-main)]">
        {completed ? (
          <div className="flex items-center gap-2 text-sm text-green-500">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Материал завершен</span>
          </div>
        ) : (
          <button
            onClick={handleComplete}
            disabled={loading || !user}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-[var(--button-bg)] px-6 py-2.5 text-sm font-semibold text-[var(--button-text)] hover:bg-[var(--button-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Сохранение..." : "Завершить материал"}
          </button>
        )}
      </div>
    </div>
  );
}

