/**
 * Утилита для записи активности пользователя
 * Вызывается при выполнении заданий (квизов, упражнений и т.д.)
 */

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

export async function recordActivity(tasksCompleted: number, date?: string): Promise<boolean> {
  try {
    const activityDate = date || new Date().toISOString().split('T')[0];
    
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

