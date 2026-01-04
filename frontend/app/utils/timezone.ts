/**
 * Утилиты для работы с временными поясами
 */

/**
 * Получает временной пояс пользователя через браузер API
 * @returns IANA timezone string (например, "Europe/Moscow", "America/New_York")
 */
export function getUserTimezone(): string {
  try {
    // Используем встроенный API браузера для получения временного пояса
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (error) {
    console.warn("Не удалось определить временной пояс, используется UTC", error);
    return "UTC";
  }
}

/**
 * Получает временной пояс пользователя через IP-геолокацию (fallback)
 * @returns Promise с IANA timezone string
 */
export async function getUserTimezoneByIP(): Promise<string> {
  try {
    // Используем бесплатный API для определения временного пояса по IP
    const response = await fetch("https://ipapi.co/json/");
    if (response.ok) {
      const data = await response.json();
      if (data.timezone) {
        return data.timezone;
      }
    }
  } catch (error) {
    console.warn("Не удалось определить временной пояс по IP", error);
  }
  
  // Fallback на браузерный API
  return getUserTimezone();
}

/**
 * Форматирует дату с учетом временного пояса пользователя
 * @param dateString - строка с датой в ISO формате
 * @param timezone - IANA timezone string (опционально, если не указан, используется временной пояс пользователя)
 * @param options - опции форматирования (опционально)
 * @returns отформатированная строка с датой
 */
export function formatDateWithTimezone(
  dateString: string,
  timezone?: string,
  options?: Intl.DateTimeFormatOptions
): string {
  const date = new Date(dateString);
  const userTimezone = timezone || getUserTimezone();
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: userTimezone,
  };
  
  const formatOptions = { ...defaultOptions, ...options };
  
  return new Intl.DateTimeFormat("ru-RU", formatOptions).format(date);
}

/**
 * Получает смещение временного пояса в минутах
 * @param timezone - IANA timezone string (опционально)
 * @returns смещение в минутах от UTC
 */
export function getTimezoneOffset(timezone?: string): number {
  const tz = timezone || getUserTimezone();
  const now = new Date();
  const utcDate = new Date(now.toLocaleString("en-US", { timeZone: "UTC" }));
  const tzDate = new Date(now.toLocaleString("en-US", { timeZone: tz }));
  return (tzDate.getTime() - utcDate.getTime()) / (1000 * 60);
}

/**
 * Получает текущую дату в локальном часовом поясе пользователя в формате YYYY-MM-DD
 * @param timezone - IANA timezone string (опционально)
 * @returns строка с датой в формате YYYY-MM-DD
 */
export function getLocalDateString(timezone?: string): string {
  const tz = timezone || getUserTimezone();
  const now = new Date();
  
  // Используем Intl.DateTimeFormat для получения даты в нужном часовом поясе
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  
  return formatter.format(now);
}

/**
 * Конвертирует дату из UTC в локальный часовой пояс пользователя
 * @param utcDateString - дата в формате YYYY-MM-DD (предполагается UTC, полночь UTC)
 * @param timezone - IANA timezone string (опционально)
 * @returns строка с датой в формате YYYY-MM-DD в локальном часовом поясе
 */
export function convertUTCToLocalDate(utcDateString: string, timezone?: string): string {
  const tz = timezone || getUserTimezone();
  
  try {
    // Парсим UTC дату как полночь UTC
    const [year, month, day] = utcDateString.split("-").map(Number);
    const utcDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
    
    // Конвертируем в локальный часовой пояс
    const formatter = new Intl.DateTimeFormat("en-CA", {
      timeZone: tz,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    
    return formatter.format(utcDate);
  } catch (error) {
    console.warn("Ошибка конвертации даты из UTC в локальный часовой пояс:", error);
    return utcDateString; // Возвращаем исходную дату в случае ошибки
  }
}

/**
 * Конвертирует дату из локального часового пояса в UTC
 * @param localDateString - дата в формате YYYY-MM-DD в локальном часовом поясе
 * @param timezone - IANA timezone string (опционально)
 * @returns строка с датой в формате YYYY-MM-DD в UTC
 */
export function convertLocalToUTCDate(localDateString: string, timezone?: string): string {
  const tz = timezone || getUserTimezone();
  
  // Парсим локальную дату как полночь в локальном часовом поясе
  const [year, month, day] = localDateString.split("-").map(Number);
  const localDate = new Date(year, month - 1, day);
  
  // Получаем смещение для этой даты в указанном часовом поясе
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    timeZoneName: "longOffset",
  });
  
  // Простой способ: создаем дату в UTC и корректируем
  const utcDate = new Date(localDate.toLocaleString("en-US", { timeZone: "UTC" }));
  const tzDate = new Date(localDate.toLocaleString("en-US", { timeZone: tz }));
  const offset = tzDate.getTime() - utcDate.getTime();
  
  const adjustedDate = new Date(localDate.getTime() - offset);
  
  return adjustedDate.toISOString().split("T")[0];
}

