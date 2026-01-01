"use client";

import { useEffect, useState, useRef } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [isAnimating, setIsAnimating] = useState(false);
  const [isOn, setIsOn] = useState(false); // false = темная тема (лампочка не горит)
  const [borderColor, setBorderColor] = useState("#2a2d34");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const moonSvgRef = useRef<SVGSVGElement>(null);

  // Функция для обновления цвета границы из кнопки
  const updateBorderColor = () => {
    if (buttonRef.current) {
      const computedStyle = getComputedStyle(buttonRef.current);
      const color = computedStyle.borderColor;
      if (color && color !== "rgba(0, 0, 0, 0)" && color !== "transparent") {
        setBorderColor(color);
      } else {
        // Fallback: получаем из CSS переменной или используем явные значения
        const rootStyle = getComputedStyle(document.documentElement);
        const varColor = rootStyle.getPropertyValue("--border-main").trim();
        const isDark = document.documentElement.classList.contains("dark");
        setBorderColor(varColor || (isDark ? "#2a2d34" : "#e5e5e5"));
      }
    } else {
      // Если кнопка еще не смонтирована, используем явные значения
      const isDark = document.documentElement.classList.contains("dark");
      setBorderColor(isDark ? "#2a2d34" : "#e5e5e5");
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    const initial = saved ?? "dark";

    setTheme(initial);
    setIsOn(initial === "light");
    document.documentElement.classList.toggle("dark", initial === "dark");
    
    // Получаем цвет границы после монтирования
    setTimeout(() => {
      updateBorderColor();
    }, 100);
    
    // Отслеживаем изменения темы
    const observer = new MutationObserver(() => {
      setTimeout(() => {
        updateBorderColor();
      }, 50);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    
    return () => observer.disconnect();
  }, []);

  // Обновляем цвет при изменении темы
  useEffect(() => {
    const timer = setTimeout(() => {
      updateBorderColor();
    }, 100);
    
    return () => clearTimeout(timer);
  }, [theme]);

  // Перезапускаем анимацию облаков при переключении на темную тему
  useEffect(() => {
    if (!isOn && moonSvgRef.current) {
      // Небольшая задержка для перезапуска анимации после монтирования
      const timer = setTimeout(() => {
        if (moonSvgRef.current) {
          const animations = moonSvgRef.current.querySelectorAll('animate');
          animations.forEach((anim) => {
            if (anim instanceof SVGAnimateElement) {
              anim.beginElement();
            }
          });
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isOn]);

  function toggleTheme() {
    if (isAnimating) return; // Предотвращаем повторные клики во время анимации
    
    setIsAnimating(true);
    
    // Анимация переключения темы
    // Переключаем тему в середине анимации (когда шнурок дергается)
    setTimeout(() => {
      const next = theme === "light" ? "dark" : "light";
      setTheme(next);
      setIsOn(next === "light");
      document.documentElement.classList.toggle("dark", next === "dark");
      localStorage.setItem("theme", next);
      
      // Обновляем цвет границы сразу после переключения темы
      // Используем явные значения для надежности
      const newColor = next === "dark" ? "#2a2d34" : "#e5e5e5";
      setBorderColor(newColor);
      
      // Также обновляем через функцию для проверки
      setTimeout(() => {
        updateBorderColor();
      }, 50);
    }, 300); // Переключаем в середине анимации (0.6s / 2)
    
    // Завершаем анимацию
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  }

  return (
    <button
        ref={buttonRef}
        onClick={toggleTheme}
        className="
          flex flex-col items-center justify-center
          rounded-xl border border-[var(--border-main)]
          bg-[var(--bg-card)]
          px-3 py-2
          hover:bg-[var(--bg-muted)]
          transition-colors
          relative
          overflow-visible
          disabled:opacity-70
          disabled:cursor-not-allowed
        "
        aria-label="Toggle theme"
        disabled={isAnimating}
      >
        {/* Солнце и Луна */}
        {isOn ? (
          /* Солнце (светлая тема) */
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-all duration-300"
            key="sun"
          >
            <circle cx="12" cy="12" r="5" fill="#FFD700" stroke={borderColor} strokeWidth="1.5" />
            {/* Лучи солнца */}
            <path
              d="M12 3L12 1M12 23L12 21M3 12L1 12M23 12L21 12M5.64 5.64L4.22 4.22M19.78 19.78L18.36 18.36M5.64 18.36L4.22 19.78M19.78 4.22L18.36 5.64"
              stroke="#FFD700"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          /* Луна (темная тема) */
          <svg
            ref={moonSvgRef}
            width="20"
            height="20"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-all duration-300"
            style={{ overflow: "visible" }}
            key="moon"
          >
            {/* Круглая луна */}
            <circle
              cx="8"
              cy="8"
              r="5"
              fill="#FFD700"
              stroke={borderColor}
              strokeWidth="1.5"
            />
            
            {/* Облака, плывущие слева направо */}
            <g className="clouds-animation">
              {/* Облако 1 - группа 1 */}
              <g>
                <ellipse cx="-2" cy="5" rx="1.5" ry="1" fill="#888888">
                  <animate attributeName="cx" values="-2;18" dur="8s" repeatCount="indefinite" begin="0s" />
                  <animate attributeName="opacity" values="0;0.6;0.6;0" dur="8s" repeatCount="indefinite" begin="0s" keyTimes="0;0.1;0.9;1" />
                </ellipse>
                <ellipse cx="-1" cy="5.5" rx="1" ry="0.8" fill="#888888">
                  <animate attributeName="cx" values="-1;19" dur="8s" repeatCount="indefinite" begin="0s" />
                  <animate attributeName="opacity" values="0;0.5;0.5;0" dur="8s" repeatCount="indefinite" begin="0s" keyTimes="0;0.1;0.9;1" />
                </ellipse>
              </g>
              
              {/* Облако 2 - группа 2 */}
              <g>
                <ellipse cx="-4" cy="10" rx="1.2" ry="0.9" fill="#888888">
                  <animate attributeName="cx" values="-4;20" dur="10s" repeatCount="indefinite" begin="2s" />
                  <animate attributeName="opacity" values="0;0.5;0.5;0" dur="10s" repeatCount="indefinite" begin="2s" keyTimes="0;0.1;0.9;1" />
                </ellipse>
                <ellipse cx="-3" cy="10.5" rx="0.9" ry="0.7" fill="#888888">
                  <animate attributeName="cx" values="-3;21" dur="10s" repeatCount="indefinite" begin="2s" />
                  <animate attributeName="opacity" values="0;0.4;0.4;0" dur="10s" repeatCount="indefinite" begin="2s" keyTimes="0;0.1;0.9;1" />
                </ellipse>
              </g>
              
              {/* Облако 3 - группа 3 */}
              <g>
                <ellipse cx="-3" cy="13" rx="1.3" ry="1" fill="#888888">
                  <animate attributeName="cx" values="-3;19" dur="9s" repeatCount="indefinite" begin="4s" />
                  <animate attributeName="opacity" values="0;0.6;0.6;0" dur="9s" repeatCount="indefinite" begin="4s" keyTimes="0;0.1;0.9;1" />
                </ellipse>
                <ellipse cx="-2" cy="13.5" rx="1" ry="0.8" fill="#888888">
                  <animate attributeName="cx" values="-2;20" dur="9s" repeatCount="indefinite" begin="4s" />
                  <animate attributeName="opacity" values="0;0.5;0.5;0" dur="9s" repeatCount="indefinite" begin="4s" keyTimes="0;0.1;0.9;1" />
                </ellipse>
              </g>
              
              {/* Облако 4 - группа 4 (для непрерывности) */}
              <g>
                <ellipse cx="-2" cy="6" rx="1.4" ry="1" fill="#888888">
                  <animate attributeName="cx" values="-2;18" dur="8.5s" repeatCount="indefinite" begin="6s" />
                  <animate attributeName="opacity" values="0;0.5;0.5;0" dur="8.5s" repeatCount="indefinite" begin="6s" keyTimes="0;0.1;0.9;1" />
                </ellipse>
                <ellipse cx="-1" cy="6.5" rx="1" ry="0.8" fill="#888888">
                  <animate attributeName="cx" values="-1;19" dur="8.5s" repeatCount="indefinite" begin="6s" />
                  <animate attributeName="opacity" values="0;0.4;0.4;0" dur="8.5s" repeatCount="indefinite" begin="6s" keyTimes="0;0.1;0.9;1" />
                </ellipse>
              </g>
            </g>
          </svg>
        )}
      </button>
  );
}
