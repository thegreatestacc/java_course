"use client";

import { useState, useEffect, useRef } from "react";

interface DraggableDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onSubmit?: () => void;
  submitText?: string;
  submitDisabled?: boolean;
}

export function DraggableDialog({
  isOpen,
  onClose,
  title,
  children,
  onSubmit,
  submitText = "Отправить",
  submitDisabled = false,
}: DraggableDialogProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 448, height: 400 }); // Начальный размер
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const dialogRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Центрируем диалог при открытии
      // Используем setTimeout чтобы дать элементу отрендериться
      setTimeout(() => {
        if (dialogRef.current) {
          const rect = dialogRef.current.getBoundingClientRect();
          setPosition({
            x: (window.innerWidth - rect.width) / 2,
            y: (window.innerHeight - rect.height) / 2,
          });
        } else {
          // Если элемент еще не отрендерился, используем примерные размеры
          setPosition({
            x: (window.innerWidth - 448) / 2, // max-w-md = 448px
            y: (window.innerHeight - 300) / 2,
          });
        }
      }, 10);
    }
  }, [isOpen]);

  useEffect(() => {
    // Не блокируем скролл страницы
    // document.body.style.overflow остается "unset"
  }, [isOpen]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (headerRef.current && headerRef.current.contains(e.target as Node)) {
      setIsDragging(true);
      if (dialogRef.current) {
        const rect = dialogRef.current.getBoundingClientRect();
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    }
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    if (dialogRef.current) {
      const rect = dialogRef.current.getBoundingClientRect();
      setResizeStart({
        x: e.clientX,
        y: e.clientY,
        width: rect.width,
        height: rect.height,
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        });
      } else if (isResizing) {
        const deltaX = e.clientX - resizeStart.x;
        const deltaY = e.clientY - resizeStart.y;
        setSize({
          width: Math.max(300, Math.min(1200, resizeStart.width + deltaX)),
          height: Math.max(200, Math.min(800, resizeStart.height + deltaY)),
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing, dragOffset, resizeStart]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50"
      onClick={onClose}
    >
      {/* Overlay - без размытия */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Dialog */}
      <div
        ref={dialogRef}
        className="relative z-10 overflow-hidden rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)] shadow-xl"
        style={{
          position: "absolute",
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: `${size.width}px`,
          height: `${size.height}px`,
          cursor: isDragging ? "grabbing" : "default",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - для перетаскивания */}
        <div
          ref={headerRef}
          className="border-b border-[var(--border-main)] px-6 py-4 cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[var(--text-main)]">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="ml-4 rounded-lg p-1 text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)] transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-4 flex-1 overflow-y-auto min-h-0">{children}</div>

        {/* Footer */}
        {onSubmit && (
          <div className="flex items-center justify-end gap-3 border-t border-[var(--border-main)] px-6 py-4 flex-shrink-0">
            <button
              onClick={onClose}
              className="rounded-lg border border-[var(--border-secondary)] bg-[var(--bg-card)] px-4 py-2 text-sm font-medium text-[var(--text-main)] hover:bg-[var(--bg-muted)] transition-colors"
            >
              Отмена
            </button>
            <button
              onClick={onSubmit}
              disabled={submitDisabled}
              className="rounded-lg bg-[var(--button-bg)] px-4 py-2 text-sm font-semibold text-[var(--button-text)] hover:bg-[var(--button-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {submitText}
            </button>
          </div>
        )}

        {/* Resize handle */}
        <div
          className="absolute bottom-0 right-0 w-6 h-6 cursor-nwse-resize hover:bg-[var(--bg-muted)] transition-colors rounded-tl-lg"
          onMouseDown={handleResizeStart}
        >
          <div className="absolute bottom-0.5 right-0.5 w-4 h-4">
            <svg
              className="w-full h-full text-[var(--text-muted)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 22L14 14M14 14L8 8M8 8L2 2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

