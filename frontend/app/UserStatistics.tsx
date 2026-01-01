"use client";

import { useEffect, useState } from "react";

interface UserStatisticsProps {
  userId?: number;
}

interface Statistics {
  totalTests: number;
  completedTests: number;
  testsPercentage: number;
  totalMaterials: number;
  completedMaterials: number;
  materialsPercentage: number;
}

export function UserStatistics({ userId }: UserStatisticsProps) {
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch("/api/statistics/me", {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setStatistics(data);
        }
      } catch (err) {
        console.error("Ошибка загрузки статистики:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchStatistics();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)] p-6">
        <h2 className="text-lg font-semibold text-[var(--text-main)] mb-4">
          Статистика обучения
        </h2>
        <p className="text-sm text-[var(--text-muted)]">Загрузка...</p>
      </div>
    );
  }

  if (!statistics) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)] p-6">
      <h2 className="text-lg font-semibold text-[var(--text-main)] mb-4">
        Статистика обучения
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {/* Статистика тестов */}
        <div className="rounded-xl border border-[var(--border-main)] bg-[var(--bg-secondary)] p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-[var(--text-main)]">
              Тесты
            </p>
            <p className="text-xs text-[var(--text-muted)]">
              {statistics.completedTests} / {statistics.totalTests}
            </p>
          </div>
          <div className="w-full bg-[var(--bg-card)] rounded-full h-2 mb-2">
            <div
              className="bg-[var(--button-bg)] h-2 rounded-full transition-all duration-300"
              style={{ width: `${statistics.testsPercentage}%` }}
            />
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            {statistics.testsPercentage.toFixed(1)}% пройдено
          </p>
        </div>

        {/* Статистика материалов */}
        <div className="rounded-xl border border-[var(--border-main)] bg-[var(--bg-secondary)] p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-[var(--text-main)]">
              Материалы
            </p>
            <p className="text-xs text-[var(--text-muted)]">
              {statistics.completedMaterials} / {statistics.totalMaterials}
            </p>
          </div>
          <div className="w-full bg-[var(--bg-card)] rounded-full h-2 mb-2">
            <div
              className="bg-[var(--button-bg)] h-2 rounded-full transition-all duration-300"
              style={{ width: `${statistics.materialsPercentage}%` }}
            />
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            {statistics.materialsPercentage.toFixed(1)}% прочитано
          </p>
        </div>
      </div>
    </div>
  );
}


