"use client";

import { useState, useEffect } from "react";

interface Quote {
  text: string;
  author: string;
}

const quotes: Quote[] = [
  {
    text: "Успех — это способность идти от неудачи к неудаче, не теряя энтузиазма.",
    author: "Уинстон Черчилль"
  },
  {
    text: "Единственный способ делать великую работу — это любить то, что ты делаешь.",
    author: "Стив Джобс"
  },
  {
    text: "Не важно, как медленно ты идешь, до тех пор, пока ты не останавливаешься.",
    author: "Конфуций"
  },
  {
    text: "Будущее принадлежит тем, кто верит в красоту своих мечтаний.",
    author: "Элеонора Рузвельт"
  },
  {
    text: "Единственное, что стоит между тобой и твоей целью — это история, которую ты продолжаешь себе рассказывать о том, почему ты не можешь её достичь.",
    author: "Джордан Белфорт"
  },
  {
    text: "Трудности готовят обычных людей к необычной судьбе.",
    author: "К.С. Льюис"
  },
  {
    text: "Не ждите идеального момента. Начните прямо сейчас.",
    author: "Наполеон Хилл"
  },
  {
    text: "Успех — это сумма небольших усилий, повторяемых изо дня в день.",
    author: "Роберт Кольер"
  },
  {
    text: "Единственный человек, которым вы должны стать лучше, — это тот, кем вы были вчера.",
    author: "Мэтт Малленвег"
  },
  {
    text: "Путь в тысячу миль начинается с одного шага.",
    author: "Лао-цзы"
  }
];

// Функция для получения случайного индекса, отличного от текущего
function getRandomIndex(excludeIndex: number | null): number {
  if (quotes.length <= 1) return 0;
  
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * quotes.length);
  } while (newIndex === excludeIndex);
  
  return newIndex;
}

export function MotivationalQuotes() {
  // Начальные значения одинаковы для сервера и клиента (избегаем hydration mismatch)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Загружаем состояние видимости и выбираем случайную цитату после монтирования на клиенте
  useEffect(() => {
    setIsMounted(true);
    
    const savedVisibility = localStorage.getItem("quotesVisible");
    if (savedVisibility !== null) {
      setIsVisible(savedVisibility === "true");
    }

    // Выбираем случайную цитату при монтировании
    const randomIndex = getRandomIndex(null);
    setCurrentIndex(randomIndex);
  }, []);

  // Сохраняем состояние видимости в localStorage при изменении
  useEffect(() => {
    localStorage.setItem("quotesVisible", isVisible.toString());
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible || !isMounted) return; // Останавливаем смену фраз, если они скрыты или компонент еще не смонтирован
    
    // Устанавливаем интервал для регулярной смены цитат
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => {
          // Выбираем случайную цитату, отличную от текущей
          const nextIndex = getRandomIndex(prev);
          return nextIndex;
        });
        setProgressKey((prev) => prev + 1); // Перезапуск анимации
        setTimeout(() => setIsTransitioning(false), 50);
      }, 200);
    }, 15000); // 15 секунд

    return () => clearInterval(interval);
  }, [isVisible, isMounted]);

  const currentQuote = quotes[currentIndex];

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="fixed right-8 top-[20vh] w-64 max-w-sm z-10" suppressHydrationWarning>
      <div className="rounded-lg p-6">
        <div className="space-y-4">
          <div className="mb-2">
            <button
              onClick={toggleVisibility}
              className="pl-0 pr-3 py-1.5 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider hover:text-[var(--text-main)] transition-all duration-200"
            >
              {isVisible ? "Скрыть" : "Показать"}
            </button>
          </div>
          
          {isVisible ? (
            <div suppressHydrationWarning>
              <blockquote className="space-y-3">
                <p
                  className={`text-sm leading-relaxed text-[var(--text-main)] transition-opacity duration-200 ${
                    isTransitioning ? "opacity-0" : "opacity-100"
                  }`}
                >
                  "{currentQuote.text}"
                </p>
                <footer
                  className={`text-xs text-[var(--text-muted)] italic transition-opacity duration-200 ${
                    isTransitioning ? "opacity-0" : "opacity-100"
                  }`}
                >
                  — {currentQuote.author}
                </footer>
              </blockquote>

              {/* Индикатор прогресса */}
              <div className="pt-2">
                <div className="h-1 bg-[var(--bg-muted)] rounded-full overflow-hidden">
                  {!isTransitioning && (
                    <div
                      key={progressKey}
                      className="h-full bg-[var(--text-accent)] animate-progress"
                      style={{
                        animation: "progress 15s linear"
                      }}
                    />
                  )}
                </div>
                <style jsx global>{`
                  @keyframes progress {
                    from {
                      width: 100%;
                    }
                    to {
                      width: 0%;
                    }
                  }
                `}</style>
              </div>
            </div>
          ) : (
            <div className="text-sm text-[var(--text-muted)]">
              ...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

