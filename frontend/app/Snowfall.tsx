"use client";

import { useEffect, useState, useRef } from "react";

interface Snowflake {
  id: number;
  left: number;
  animationDuration: number;
  animationDelay: number;
  size: number;
}

function generateSnowflakes(count: number = 50, baseId: number = 0): Snowflake[] {
  return Array.from({ length: count }, (_, i) => ({
    id: baseId + i,
    left: Math.random() * 100, // По всей ширине экрана (0-100%)
    animationDuration: 20 + Math.random() * 20, // 20-40 секунд
    animationDelay: Math.random() * 2,
    size: 2 + Math.random() * 3, // 2-5px (уменьшено с 4-8px)
  }));
}

export function Snowfall({ isActive }: { isActive: boolean }) {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);
  const nextIdRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const MAX_SNOWFLAKES = 120; // Максимальное количество снежинок одновременно

  useEffect(() => {
    // Очищаем предыдущий интервал, если он существует
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (!isActive) {
      // Немедленно удаляем все снежинки при выключении
      setSnowflakes([]);
      return;
    } else {
      // Генерируем начальные снежинки (меньше для производительности)
      nextIdRef.current = 0;
      const initialFlakes = generateSnowflakes(50, 0);
      nextIdRef.current = 50;
      setSnowflakes(initialFlakes);
      
      // Периодически добавляем новые снежинки и удаляем старые для непрерывного эффекта
      intervalRef.current = setInterval(() => {
        setSnowflakes(prev => {
          // Ограничиваем общее количество снежинок, удаляя самые старые
          let current = prev.length >= MAX_SNOWFLAKES 
            ? prev.slice(-MAX_SNOWFLAKES + 6) // Удаляем старые, оставляем последние
            : prev;
          
          // Добавляем новые снежинки только если не превышен лимит
          if (current.length < MAX_SNOWFLAKES) {
            const newFlakes = generateSnowflakes(6, nextIdRef.current);
            nextIdRef.current += 6;
            current = [...current, ...newFlakes];
          }
          
          return current;
        });
      }, 4000); // Добавляем новые снежинки каждые 4 секунды (реже для производительности)
      
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    }
  }, [isActive]);


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
        const animationValue = `snowfall ${flake.animationDuration}s linear ${flake.animationDelay}s infinite`;
        
        return (
          <div
            key={flake.id}
            className="absolute opacity-70"
            style={{
              left: `${flake.left}%`,
              top: '-20px',
              fontSize: `${flake.size}px`,
              color: '#ffffff',
              filter: 'brightness(0) invert(1)',
              WebkitFilter: 'brightness(0) invert(1)',
              willChange: 'transform', // Оптимизация для браузера
              animation: animationValue,
            }}
          >
            ❄
          </div>
        );
      })}
      
      {/* Стили анимации */}
      <style jsx>{`
        @keyframes snowfall {
          0% {
            transform: translate3d(0, -20px, 0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translate3d(0, calc(100vh + 20px), 0) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

