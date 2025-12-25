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

export function MotivationalQuotes() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!isVisible) return; // Останавливаем смену фраз, если они скрыты
    
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % quotes.length);
        setProgressKey((prev) => prev + 1); // Перезапуск анимации
        setTimeout(() => setIsTransitioning(false), 50);
      }, 200);
    }, 15000); // 15 секунд

    return () => clearInterval(interval);
  }, [isVisible]);

  const currentQuote = quotes[currentIndex];

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="fixed right-8 top-[20vh] w-64 max-w-sm z-10">
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
            <>
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
            </>
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

