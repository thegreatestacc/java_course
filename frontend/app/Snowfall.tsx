"use client";

import { useEffect, useState } from "react";

interface Snowflake {
  id: number;
  left: number;
  animationDuration: number;
  animationDelay: number;
  size: number;
}

const SNOWFLAKES_STORAGE_KEY = "snowflakesConfig";

function generateSnowflakes(): Snowflake[] {
  return Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    animationDuration: 3 + Math.random() * 4, // 3-7 секунд
    animationDelay: Math.random() * 2,
    size: 4 + Math.random() * 4, // 4-8px
  }));
}

function getSnowflakesConfig(): Snowflake[] {
  if (typeof window === "undefined") {
    return generateSnowflakes();
  }

  const saved = localStorage.getItem(SNOWFLAKES_STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      const flakes = generateSnowflakes();
      localStorage.setItem(SNOWFLAKES_STORAGE_KEY, JSON.stringify(flakes));
      return flakes;
    }
  }

  const flakes = generateSnowflakes();
  localStorage.setItem(SNOWFLAKES_STORAGE_KEY, JSON.stringify(flakes));
  return flakes;
}

export function Snowfall({ isActive }: { isActive: boolean }) {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);
  const [isDark, setIsDark] = useState(false);
  const [isStopping, setIsStopping] = useState(false);
  const [flakesToStop, setFlakesToStop] = useState<Set<number>>(new Set());

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isActive) {
      // Останавливаем создание новых снежинок, но позволяем существующим завершить анимацию
      setIsStopping(true);
      // Помечаем все текущие снежинки для остановки после завершения текущего цикла
      setFlakesToStop(new Set(snowflakes.map(f => f.id)));
      
      // Вычисляем максимальное время до завершения всех анимаций
      // Максимальная длительность анимации (7 секунд) + максимальная задержка (2 секунды)
      const maxAnimationTime = 7000 + 2000;
      
      // Удаляем снежинки после того, как все анимации завершатся
      const timer = setTimeout(() => {
        setSnowflakes([]);
        setIsStopping(false);
        setFlakesToStop(new Set());
      }, maxAnimationTime);
      
      return () => clearTimeout(timer);
    } else {
      // Сбрасываем состояние остановки при включении
      setIsStopping(false);
      setFlakesToStop(new Set());
      // Генерируем новые снежинки, чтобы анимация начиналась сначала
      const flakes = generateSnowflakes();
      // Сохраняем новую конфигурацию
      if (typeof window !== "undefined") {
        localStorage.setItem(SNOWFLAKES_STORAGE_KEY, JSON.stringify(flakes));
      }
      setSnowflakes(flakes);
    }
  }, [isActive]);

  // Обработчик завершения итерации анимации - переключаем на forwards после завершения текущего цикла
  const handleAnimationIteration = (flakeId: number) => {
    if (isStopping && flakesToStop.has(flakeId)) {
      // После завершения текущего цикла меняем на forwards для последнего падения
      setFlakesToStop((prev) => {
        const newSet = new Set(prev);
        newSet.delete(flakeId);
        return newSet;
      });
    }
  };

  if (snowflakes.length === 0) {
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {snowflakes.map((flake) => {
        // Если снег останавливается и эта снежинка уже завершила текущий цикл, используем forwards
        // Иначе продолжаем infinite или forwards в зависимости от состояния
        const shouldUseForwards = isStopping && !flakesToStop.has(flake.id);
        const animationValue = shouldUseForwards
          ? `snowfall ${flake.animationDuration}s linear ${flake.animationDelay}s forwards`
          : `snowfall ${flake.animationDuration}s linear ${flake.animationDelay}s infinite`;
        
        return (
          <div
            key={flake.id}
            className={`absolute top-0 opacity-70 ${
              isDark ? "text-white" : "text-gray-500"
            }`}
            style={{
              left: `${flake.left}%`,
              fontSize: `${flake.size}px`,
              animation: animationValue,
            }}
            onAnimationIteration={() => handleAnimationIteration(flake.id)}
          >
            ❄
          </div>
        );
      })}
      <style jsx>{`
        @keyframes snowfall {
          0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(80px) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

