import { useState, useEffect } from "react";
import { getUserTimezone, getUserTimezoneByIP } from "../utils/timezone";

/**
 * Хук для получения и управления временным поясом пользователя
 */
export function useTimezone() {
  const [timezone, setTimezone] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const detectTimezone = async () => {
      try {
        // Сначала пытаемся получить через браузер API (быстро и надежно)
        const browserTimezone = getUserTimezone();
        
        if (browserTimezone && browserTimezone !== "UTC") {
          setTimezone(browserTimezone);
          setLoading(false);
          return;
        }

        // Если браузерный API не сработал, пытаемся через IP
        const ipTimezone = await getUserTimezoneByIP();
        setTimezone(ipTimezone);
      } catch (err) {
        console.error("Ошибка определения временного пояса:", err);
        setError("Не удалось определить временной пояс");
        // Fallback на UTC
        setTimezone("UTC");
      } finally {
        setLoading(false);
      }
    };

    detectTimezone();
  }, []);

  return { timezone, loading, error };
}






