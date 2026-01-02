"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { onActivityUpdate } from "@/app/utils/activityTracker";
import { useAuth } from "@/app/useAuth";

interface ActivityData {
  date: string;
  count: number;
}

interface ActivityTrackerProps {
  userId?: number;
  refreshTrigger?: number; // Триггер для обновления данных
}

export function ActivityTracker({ userId, refreshTrigger }: ActivityTrackerProps) {
  const { user } = useAuth();
  const [activityData, setActivityData] = useState<ActivityData[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Получаем год регистрации пользователя
  const registrationYear = useMemo(() => {
    if (user?.createdAt) {
      const registrationDate = new Date(user.createdAt);
      return registrationDate.getFullYear();
    }
    return new Date().getFullYear(); // По умолчанию текущий год
  }, [user?.createdAt]);
  
  const currentYear = new Date().getFullYear();
  const initialYear = useMemo(() => Math.max(registrationYear, currentYear), [registrationYear]);
  
  const [selectedYear, setSelectedYear] = useState(initialYear);

  const loadActivityData = useCallback(async () => {
    try {
      const response = await fetch(`/api/activity/me?year=${selectedYear}`, {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        if (data.activities && Array.isArray(data.activities)) {
          const formattedData: ActivityData[] = data.activities.map((item: { date: string; count: number }) => ({
            date: item.date,
            count: item.count || 0,
          }));
          setActivityData(formattedData);
        } else {
          setActivityData([]);
        }
      } else {
        setActivityData([]);
      }
    } catch (error) {
      console.error("Ошибка загрузки данных активности:", error);
      setActivityData([]);
    } finally {
      setLoading(false);
    }
  }, [selectedYear]);

  // Обновляем selectedYear, когда пользователь загружается
  useEffect(() => {
    if (user?.createdAt) {
      const currYear = new Date().getFullYear();
      const validYear = Math.max(registrationYear, currYear);
      setSelectedYear(prevYear => {
        if (prevYear < registrationYear) {
          return validYear;
        }
        return prevYear;
      });
    }
  }, [user?.createdAt, registrationYear]);

  useEffect(() => {
    if (userId) {
      loadActivityData();
    } else {
      setLoading(false);
    }
  }, [userId, refreshTrigger, selectedYear, loadActivityData]);

  // Подписываемся на обновления активности
  useEffect(() => {
    if (!userId) return;

    const unsubscribe = onActivityUpdate(() => {
      loadActivityData();
    });

    return unsubscribe;
  }, [userId, loadActivityData]);

  const getIntensityColor = (count: number): string => {
    if (count === 0) return "bg-[var(--bg-muted)]";
    if (count === 1) return "bg-green-500/30";
    if (count === 2) return "bg-green-500/50";
    if (count === 3) return "bg-green-500/70";
    return "bg-green-500";
  };

  const getTooltipText = (date: string, count: number): string => {
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    
    if (count === 0) {
      return `Нет активности: ${formattedDate}`;
    }
    const taskWord = count === 1 ? 'задание' : count < 5 ? 'задания' : 'заданий';
    return `${count} ${taskWord} выполнено: ${formattedDate}`;
  };

  // Функция для правильного склонения слова "день"
  const getDayWord = (count: number): string => {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;
    
    // Исключения для 11-14
    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return 'дней';
    }
    
    // Проверяем последнюю цифру
    if (lastDigit === 1) {
      return 'день';
    } else if (lastDigit >= 2 && lastDigit <= 4) {
      return 'дня';
    } else {
      return 'дней';
    }
  };

  // Если данных нет, создаем пустую сетку за выбранный год
  const displayData = activityData.length > 0 ? activityData : (() => {
    const emptyData: ActivityData[] = [];
    const startDate = new Date(selectedYear, 0, 1); // 1 января выбранного года
    const endDate = new Date(selectedYear, 11, 31); // 31 декабря выбранного года
    
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      emptyData.push({
        date: currentDate.toISOString().split('T')[0],
        count: 0
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return emptyData;
  })();

  // Группируем данные по месяцам
  interface MonthData {
    year: number;
    month: number;
    label: string;
    days: (ActivityData | null)[];
    weeks: (ActivityData | null)[][];
  }

  const months: MonthData[] = [];
  const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  const monthNamesShort = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
  const daysInWeek = 7;

  // Создаем карту данных по датам для быстрого доступа
  const dataMap = new Map<string, ActivityData>();
  displayData.forEach(day => {
    dataMap.set(day.date, day);
  });

  // Генерируем данные по месяцам за выбранный год
  const startDate = new Date(selectedYear, 0, 1); // 1 января выбранного года
  const endDate = new Date(selectedYear, 11, 31); // 31 декабря выбранного года

  let currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const monthKey = `${year}-${month}`;
    
    // Проверяем, есть ли уже этот месяц
    let monthData = months.find(m => m.year === year && m.month === month);
    
    if (!monthData) {
      // Создаем новый месяц
      monthData = {
        year,
        month,
        label: monthNamesShort[month],
        days: [],
        weeks: []
      };
      months.push(monthData);
    }

    // Получаем данные для этого дня
    const dateStr = currentDate.toISOString().split('T')[0];
    const dayData = dataMap.get(dateStr) || { date: dateStr, count: 0 };
    monthData.days.push(dayData);

    // Переходим к следующему дню
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Группируем дни каждого месяца по неделям
  months.forEach(monthData => {
    if (monthData.days.length === 0) return;

    const firstDayData = monthData.days[0];
    if (!firstDayData) return;
    
    const firstDay = new Date(firstDayData.date);
    const dayOfWeek = firstDay.getDay();
    const adjustedDayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Понедельник = 0

    // Добавляем пустые дни для первой недели
    const firstWeek: (ActivityData | null)[] = [];
    for (let i = 0; i < adjustedDayOfWeek; i++) {
      firstWeek.push(null);
    }

    let currentWeek = [...firstWeek];

    monthData.days.forEach(day => {
      currentWeek.push(day);

      if (currentWeek.length === daysInWeek) {
        monthData.weeks.push(currentWeek);
        currentWeek = [];
      }
    });

    // Добавляем последнюю неделю, если она неполная
    if (currentWeek.length > 0) {
      while (currentWeek.length < daysInWeek) {
        currentWeek.push(null);
      }
      monthData.weeks.push(currentWeek);
    }
  });

  // Генерируем список доступных годов (начиная с года регистрации до текущего года)
  const availableYears = useMemo(() => {
    const years = [];
    for (let year = currentYear; year >= registrationYear; year--) {
      years.push(year);
    }
    return years;
  }, [registrationYear, currentYear]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)] p-6">
        <h2 className="text-lg font-semibold text-[var(--text-main)] mb-4">
          Трекер активности
        </h2>
        <div className="flex items-center justify-center py-12">
          <p className="text-sm text-[var(--text-muted)]">Загрузка данных...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)] p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-[var(--text-main)]">
          Трекер активности
        </h2>
        <div className="flex items-center gap-2">
          <label className="text-sm text-[var(--text-muted)]">Год:</label>
          <select
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(parseInt(e.target.value));
              setLoading(true);
            }}
            className="rounded-xl border border-[var(--border-main)] bg-[var(--bg-card)] px-3 py-1.5 text-sm text-[var(--text-main)] outline-none focus:ring-2 focus:ring-[var(--border-secondary)]"
          >
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="overflow-hidden">
        <div className="inline-block min-w-full" style={{ transform: 'scale(0.95)', transformOrigin: 'top left' }}>
          <div className="flex gap-1">
            {/* Дни недели (фиксированные слева) */}
            <div className="flex flex-col gap-1 mr-2 flex-shrink-0">
              {/* Пустая ячейка для заголовка месяца */}
              <div className="h-[52px] mb-1"></div>
              {/* Дни недели - выровнены с ячейками (h-3 = 12px + gap-1 = 4px = 16px общая высота) */}
              <div className="h-3 flex items-center text-xs text-[var(--text-muted)]">Пн</div>
              <div className="h-3 flex items-center text-xs text-[var(--text-muted)]">Вт</div>
              <div className="h-3 flex items-center text-xs text-[var(--text-muted)]">Ср</div>
              <div className="h-3 flex items-center text-xs text-[var(--text-muted)]">Чт</div>
              <div className="h-3 flex items-center text-xs text-[var(--text-muted)]">Пт</div>
              <div className="h-3 flex items-center text-xs text-[var(--text-muted)]">Сб</div>
              <div className="h-3 flex items-center text-xs text-[var(--text-muted)]">Вс</div>
            </div>

            {/* Месяцы с данными */}
            <div className="flex gap-2">
              {months.map((monthData, monthIndex) => (
                <div key={`${monthData.year}-${monthData.month}`} className="flex flex-col">
                  {/* Название месяца */}
                  <div className="mb-2 h-[52px]">
                    <div className="text-xs font-medium text-[var(--text-muted)]">
                      {monthData.label} {monthData.year}
                    </div>
                    <div className="text-[10px] text-[var(--text-muted)] mt-0.5">
                      {monthData.days.length} {getDayWord(monthData.days.length)}
                    </div>
                  </div>

                  {/* Сетка активности для месяца */}
                  <div className="flex gap-1">
                    {monthData.weeks.map((week, weekIndex) => (
                      <div key={weekIndex} className="flex flex-col gap-1">
                        {week.map((day, dayIndex) => {
                          if (!day) {
                            return <div key={dayIndex} className="w-3 h-3" />;
                          }
                          
                          return (
                            <div
                              key={day.date}
                              className={`w-3 h-3 rounded-sm ${getIntensityColor(day.count)} cursor-pointer hover:ring-2 hover:ring-[var(--border-main)] transition-all`}
                              title={getTooltipText(day.date, day.count)}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Легенда */}
      <div className="flex items-center gap-4 mt-4 text-xs text-[var(--text-muted)]">
        <span>Меньше</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-sm bg-[var(--bg-muted)]" />
          <div className="w-3 h-3 rounded-sm bg-green-500/30" />
          <div className="w-3 h-3 rounded-sm bg-green-500/50" />
          <div className="w-3 h-3 rounded-sm bg-green-500/70" />
          <div className="w-3 h-3 rounded-sm bg-green-500" />
        </div>
        <span>Больше</span>
      </div>

      <div className="mt-4 text-xs text-[var(--text-muted)]">
        <p>Показывает выполнение заданий за {selectedYear} год</p>
      </div>
    </div>
  );
}

