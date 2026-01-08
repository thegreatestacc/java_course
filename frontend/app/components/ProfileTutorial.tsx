"use client";

import { useState, useEffect, useRef } from "react";

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  targetRef: React.RefObject<HTMLDivElement>;
}

interface ProfileTutorialProps {
  steps: TutorialStep[];
  onComplete: () => void;
  onSkip: () => void;
}

export function ProfileTutorial({ steps, onComplete, onSkip }: ProfileTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [highlightStyle, setHighlightStyle] = useState<React.CSSProperties>({});
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

  // Обновление позиции подсветки и подсказки
  const updatePositions = () => {
    const currentTarget = steps[currentStep]?.targetRef.current;
    if (!currentTarget) return;

    const rect = currentTarget.getBoundingClientRect();
    
    // Обновляем позицию подсветки
    setHighlightStyle({
      top: rect.top - 8,
      left: rect.left - 8,
      width: rect.width + 16,
      height: rect.height + 16,
    });

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

    // Обновляем позицию подсказки
    if (tooltipRef.current) {
      const tooltip = tooltipRef.current;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Определяем позицию подсказки (снизу или сверху)
      const spaceBelow = viewportHeight - rect.bottom;
      const spaceAbove = rect.top;
      const showBelow = spaceBelow > spaceAbove;

      // Определяем позицию по горизонтали (слева или справа)
      const spaceRight = viewportWidth - rect.right;
      const spaceLeft = rect.left;
      const showRight = spaceRight > spaceLeft;

      let top = 0;
      let left = 0;

      if (showBelow) {
        top = rect.bottom + 16;
      } else {
        top = rect.top - tooltip.offsetHeight - 16;
      }

      if (showRight) {
        left = rect.left;
      } else {
        left = rect.right - tooltip.offsetWidth;
      }

      // Ограничиваем позицию границами экрана
      top = Math.max(16, Math.min(top, viewportHeight - tooltip.offsetHeight - 16));
      left = Math.max(16, Math.min(left, viewportWidth - tooltip.offsetWidth - 16));

      tooltip.style.top = `${top}px`;
      tooltip.style.left = `${left}px`;
      tooltip.style.transform = "none";
    }
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

    // Прокручиваем к элементу
    currentTarget.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    // Небольшая задержка перед обновлением позиций после прокрутки
    const scrollTimer = setTimeout(() => {
      updatePositions();
    }, 300);

    // Обновляем позиции при изменении размера окна или прокрутке
    window.addEventListener("resize", updatePositions);
    window.addEventListener("scroll", updatePositions, true);

    return () => {
      clearTimeout(scrollTimer);
      window.removeEventListener("resize", updatePositions);
      window.removeEventListener("scroll", updatePositions, true);
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
          className="fixed z-50 pointer-events-none transition-all duration-300 tutorial-highlight"
          style={{
            ...highlightStyle,
            borderRadius: "0.5rem", // rounded-lg = 8px, меньше чем rounded-2xl
          }}
        />
      )}

      {/* Всплывающее окно с подсказкой */}
      <div
        ref={tooltipRef}
        className="fixed z-50 bg-[var(--bg-card)] border border-[var(--border-main)] rounded-xl shadow-2xl p-6 max-w-sm pointer-events-auto transition-all duration-300"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
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

