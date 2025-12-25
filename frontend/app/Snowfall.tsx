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
      setSnowflakes([]);
      return;
    }

    // Загружаем сохраненную конфигурацию снежинок или создаем новую
    const flakes = getSnowflakesConfig();
    setSnowflakes(flakes);
  }, [isActive]);

  if (!isActive || snowflakes.length === 0) {
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className={`absolute top-0 opacity-70 ${
            isDark ? "text-white" : "text-gray-500"
          }`}
          style={{
            left: `${flake.left}%`,
            fontSize: `${flake.size}px`,
            animation: `snowfall ${flake.animationDuration}s linear ${flake.animationDelay}s infinite`,
          }}
        >
          ❄
        </div>
      ))}
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

