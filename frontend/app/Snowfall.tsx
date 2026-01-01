"use client";

import { useEffect, useState, useRef } from "react";

interface Snowflake {
  id: number;
  left: number;
  animationDuration: number;
  animationDelay: number;
  size: number;
}

const SNOWFLAKES_STORAGE_KEY = "snowflakesConfig";

function generateSnowflakes(count: number = 50, baseId: number = 0): Snowflake[] {
  return Array.from({ length: count }, (_, i) => ({
    id: baseId + i,
    left: Math.random() * 100, // По всей ширине экрана (0-100%)
    animationDuration: 20 + Math.random() * 20, // 20-40 секунд
    animationDelay: Math.random() * 2,
    size: 2 + Math.random() * 3, // 2-5px (уменьшено с 4-8px)
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
  const nextIdRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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
    // Очищаем предыдущий интервал, если он существует
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (!isActive) {
      // Останавливаем создание новых снежинок, но позволяем существующим завершить анимацию
      setIsStopping(true);
      // Помечаем все текущие снежинки для остановки после завершения текущего цикла
      setSnowflakes(prev => {
        setFlakesToStop(new Set(prev.map(f => f.id)));
        return prev;
      });
      
      // Вычисляем максимальное время до завершения всех анимаций
      // Максимальная длительность анимации (40 секунд) + максимальная задержка (2 секунды)
      const maxAnimationTime = 40000 + 2000;
      
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
      // Генерируем начальные снежинки
      nextIdRef.current = 0;
      const initialFlakes = generateSnowflakes(50, 0);
      nextIdRef.current = 50;
      setSnowflakes(initialFlakes);
      
      // Периодически добавляем новые снежинки для непрерывного эффекта
      intervalRef.current = setInterval(() => {
        setSnowflakes(prev => {
          const newFlakes = generateSnowflakes(10, nextIdRef.current);
          nextIdRef.current += 10;
          return [...prev, ...newFlakes];
        });
      }, 2000); // Добавляем новые снежинки каждые 2 секунды
      
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
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
    <div 
      className="w-full h-screen overflow-hidden pointer-events-none relative"
      style={{
        maskImage: 'linear-gradient(to right, black 0%, black 18%, transparent 18%, transparent 82%, black 82%, black 100%)',
        WebkitMaskImage: 'linear-gradient(to right, black 0%, black 18%, transparent 18%, transparent 82%, black 82%, black 100%)',
      }}
    >
      {snowflakes.map((flake) => {
        const shouldUseForwards = isStopping && !flakesToStop.has(flake.id);
        const animationValue = shouldUseForwards
          ? `snowfall ${flake.animationDuration}s linear ${flake.animationDelay}s forwards`
          : `snowfall ${flake.animationDuration}s linear ${flake.animationDelay}s infinite`;
        
        return (
          <div
            key={flake.id}
            className="absolute opacity-70"
            style={{
              left: `${flake.left}%`,
              top: '-20px',
              fontSize: `${flake.size}px`,
              color: '#ffffff',
              filter: 'grayscale(100%) brightness(200%)',
              WebkitFilter: 'grayscale(100%) brightness(200%)',
              animation: animationValue,
            }}
            onAnimationIteration={() => handleAnimationIteration(flake.id)}
          >
            ❄
          </div>
        );
      })}
      
      {/* Стили анимации */}
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
            transform: translateY(calc(100vh + 20px)) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

