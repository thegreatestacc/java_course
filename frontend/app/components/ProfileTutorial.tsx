"use client";

import { useState, useEffect, useRef } from "react";

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  targetRef: React.RefObject<HTMLDivElement | null>;
}

interface ProfileTutorialProps {
  steps: TutorialStep[];
  onComplete: () => void;
  onSkip: () => void;
}

export function ProfileTutorial({ steps, onComplete, onSkip }: ProfileTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [highlightStyle, setHighlightStyle] = useState<React.CSSProperties>({
    opacity: 0,
  });
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({
    opacity: 0,
  });
  const [overlayStyles, setOverlayStyles] = useState<{
    top: React.CSSProperties;
    bottom: React.CSSProperties;
    left: React.CSSProperties;
    right: React.CSSProperties;
  }>({
    top: {},
    bottom: {},
    left: {},
    right: {},
  });
  const overlayRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  // Обновление позиции подсветки и подсказки (только при смене шага)
  const updatePositions = () => {
    const currentTarget = steps[currentStep]?.targetRef.current;
    if (!currentTarget) return;

    // Получаем позицию после завершения прокрутки
    const rect = currentTarget.getBoundingClientRect();
    
    // Обновляем позицию подсветки (фиксированная позиция, не меняется при прокрутке)
    setHighlightStyle({
      position: 'fixed',
      top: `${rect.top - 8}px`,
      left: `${rect.left - 8}px`,
      width: `${rect.width + 16}px`,
      height: `${rect.height + 16}px`,
      opacity: 0, // Начинаем с прозрачности 0
    });

    // Плавно показываем подсветку
    setTimeout(() => {
      setHighlightStyle(prev => ({
        ...prev,
        opacity: 1,
      }));
    }, 50);

    // Обновляем overlay - создаем 4 области затемнения вокруг блока
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const padding = 8;
    
    setOverlayStyles({
      top: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: `${rect.top - padding}px`,
        zIndex: 40,
      },
      bottom: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: `${viewportHeight - rect.bottom - padding}px`,
        zIndex: 40,
      },
      left: {
        position: 'fixed',
        top: `${rect.top - padding}px`,
        left: 0,
        width: `${rect.left - padding}px`,
        height: `${rect.height + padding * 2}px`,
        zIndex: 40,
      },
      right: {
        position: 'fixed',
        top: `${rect.top - padding}px`,
        left: `${rect.right + padding}px`,
        right: 0,
        height: `${rect.height + padding * 2}px`,
        zIndex: 40,
      },
    });

    // Обновляем позицию подсказки (только один раз при смене шага)
    // Используем requestAnimationFrame для получения актуальных размеров tooltip
    requestAnimationFrame(() => {
      if (!tooltipRef.current) return;
      
      const tooltip = tooltipRef.current;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Получаем актуальные размеры tooltip
      const tooltipWidth = tooltip.offsetWidth || 384; // max-w-sm = 384px
      const tooltipHeight = tooltip.offsetHeight || 200; // примерная высота

      // Определяем позицию по горизонтали (слева или справа от блока)
      const spaceRight = viewportWidth - rect.right;
      const spaceLeft = rect.left;
      const showRight = spaceRight > spaceLeft && spaceRight > tooltipWidth + 32;

      let top = 0;
      let left = 0;

      // Позиционируем подсказку рядом с блоком (справа или слева)
      if (showRight) {
        // Справа от блока
        left = rect.right + 16;
        // Вертикально центрируем относительно блока
        top = rect.top + (rect.height / 2) - (tooltipHeight / 2);
      } else {
        // Слева от блока
        left = rect.left - tooltipWidth - 16;
        // Вертикально центрируем относительно блока
        top = rect.top + (rect.height / 2) - (tooltipHeight / 2);
      }

      // Ограничиваем позицию границами экрана
      top = Math.max(16, Math.min(top, viewportHeight - tooltipHeight - 16));
      left = Math.max(16, Math.min(left, viewportWidth - tooltipWidth - 16));

      // Устанавливаем позицию через state для плавной анимации
      setTooltipStyle({
        top: `${top}px`,
        left: `${left}px`,
        opacity: 0, // Начинаем с прозрачности 0
      });

      // Плавно показываем подсказку после небольшой задержки
      setTimeout(() => {
        setTooltipStyle(prev => ({
          ...prev,
          opacity: 1,
        }));
      }, 150);
    });
  };

  useEffect(() => {
    if (currentStep >= steps.length) {
      setIsVisible(false);
      onComplete();
      return;
    }

    const currentTarget = steps[currentStep]?.targetRef.current;
    if (!currentTarget) {
      // Если элемент еще не загружен, ждем немного
      const timer = setTimeout(() => {
        updatePositions();
      }, 100);
      return () => clearTimeout(timer);
    }

    // Сначала скрываем подсказку и подсветку
    setTooltipStyle(prev => ({ ...prev, opacity: 0 }));
    setHighlightStyle(prev => ({ ...prev, opacity: 0 }));

    // Прокручиваем к элементу
    currentTarget.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    // Обновляем позиции после завершения прокрутки
    const scrollTimer = setTimeout(() => {
      updatePositions();
    }, 500); // Увеличиваем задержку для завершения прокрутки

    return () => {
      clearTimeout(scrollTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep, steps]);

  if (!isVisible || currentStep >= steps.length) {
    return null;
  }

  const currentStepData = steps[currentStep];
  if (!currentStepData) return null;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsVisible(false);
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    setIsVisible(false);
    onSkip();
  };

  return (
    <>
      {/* Затемнение фона с вырезом для активного блока */}
      <div
        ref={overlayRef}
        className="bg-black/50 transition-opacity duration-300 pointer-events-auto"
        style={overlayStyles.top}
        onClick={handleSkip}
      />
      <div
        className="bg-black/50 transition-opacity duration-300 pointer-events-auto"
        style={overlayStyles.bottom}
        onClick={handleSkip}
      />
      <div
        className="bg-black/50 transition-opacity duration-300 pointer-events-auto"
        style={overlayStyles.left}
        onClick={handleSkip}
      />
      <div
        className="bg-black/50 transition-opacity duration-300 pointer-events-auto"
        style={overlayStyles.right}
        onClick={handleSkip}
      />

      {/* Подсветка активного виджета */}
      {currentStepData.targetRef.current && (
        <div
          ref={highlightRef}
          className="fixed z-50 pointer-events-none tutorial-highlight"
          style={{
            ...highlightStyle,
            borderRadius: "0.5rem", // rounded-lg = 8px, меньше чем rounded-2xl
            transition: 'opacity 0.3s ease-out', // Только плавное появление/исчезновение, без движения
          }}
        />
      )}

      {/* Всплывающее окно с подсказкой */}
      <div
        ref={tooltipRef}
        className="fixed z-50 bg-[var(--bg-card)] border border-[var(--border-main)] rounded-xl shadow-2xl p-6 max-w-sm pointer-events-auto transition-all duration-500 ease-out"
        style={{
          ...tooltipStyle,
          transform: "none",
        }}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-[var(--text-main)] mb-2">
              {currentStepData.title}
            </h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              {currentStepData.description}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--text-muted)]">
              {currentStep + 1} / {steps.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {currentStep > 0 && (
              <button
                onClick={handlePrevious}
                className="px-4 py-2 text-sm font-medium text-[var(--text-main)] bg-[var(--bg-muted)] rounded-lg hover:bg-[var(--bg-secondary)] transition-colors"
              >
                Назад
              </button>
            )}
            <button
              onClick={handleSkip}
              className="px-4 py-2 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
            >
              Пропустить
            </button>
            <button
              onClick={handleNext}
              className="rounded-xl bg-[var(--button-bg)] px-4 py-2 text-sm font-semibold text-[var(--button-text)] hover:bg-[var(--button-hover)] transition-colors"
            >
              {currentStep < steps.length - 1 ? "Далее" : "Завершить"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

