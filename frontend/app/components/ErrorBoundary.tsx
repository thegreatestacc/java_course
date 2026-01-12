"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    // Ошибка логируется, но не показывается автоматически
    // Пользователь может использовать кнопку "Сообщить об ошибке" в Header
  }

  render() {
    if (this.state.hasError) {
      // Показываем fallback UI, но не ErrorReporter автоматически
      return (
        <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-2xl border border-red-500/50 bg-red-500/10 p-6">
            <h2 className="text-xl font-bold text-red-400 mb-2">Произошла ошибка</h2>
            <p className="text-sm text-[var(--text-muted)] mb-4">
              Что-то пошло не так. Пожалуйста, обновите страницу или используйте кнопку "Сообщить об ошибке" в верхней панели.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-lg bg-[var(--button-bg)] px-4 py-2 text-sm font-medium text-[var(--button-text)] hover:bg-[var(--button-hover)] transition-colors"
            >
              Обновить страницу
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

