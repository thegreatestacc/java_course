/**
 * Утилита для записи активности пользователя
 * Вызывается при выполнении заданий (квизов, упражнений и т.д.)
 */

import { getLocalDateString, getUserTimezone } from "./timezone";

// Глобальное событие для обновления трекера активности
let activityUpdateListeners: (() => void)[] = [];

export function onActivityUpdate(callback: () => void) {
  activityUpdateListeners.push(callback);
  return () => {
    activityUpdateListeners = activityUpdateListeners.filter(listener => listener !== callback);
  };
}

export function triggerActivityUpdate() {
  activityUpdateListeners.forEach(listener => listener());
}

export async function recordActivity(tasksCompleted: number, date?: string, timezone?: string): Promise<boolean> {
  try {
    // Используем локальную дату пользователя, если не указана конкретная дата
    const activityDate = date || getLocalDateString(timezone || getUserTimezone());
    
    const response = await fetch("/api/activity/record", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        tasksCompleted,
        date: activityDate,
      }),
    });

    if (response.ok) {
      // Триггерим обновление трекера активности
      triggerActivityUpdate();
      return true;
    }

    return false;
  } catch (error) {
    console.error("Ошибка записи активности:", error);
    return false;
  }
}

