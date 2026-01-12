"use client";

import { useState } from "react";
import { DraggableDialog } from "./DraggableDialog";

interface ErrorReporterProps {
  isOpen: boolean;
  onClose: () => void;
  initialErrorMessage?: string | null;
}

export function ErrorReporter({ isOpen, onClose, initialErrorMessage }: ErrorReporterProps) {
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!description.trim()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);
    try {
      const errorMessage = initialErrorMessage || "";
      const pageUrl = typeof window !== "undefined" ? window.location.href : "";
      const userAgent = typeof navigator !== "undefined" ? navigator.userAgent : "";

      const response = await fetch("/api/error-reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          errorMessage,
          userDescription: description.trim(),
          pageUrl,
          userAgent,
        }),
      });

      if (response.ok) {
        setDescription("");
        setError(null);
        onClose();
      } else {
        let errorText = "Ошибка при отправке сообщения об ошибке";
        try {
          const errorData = await response.json();
          errorText = errorData.message || errorText;
        } catch {
          errorText = `Ошибка ${response.status}: ${response.statusText || "Неизвестная ошибка"}`;
        }
        console.error("Ошибка при отправке сообщения об ошибке:", errorText, response.status);
        setError(errorText);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Ошибка соединения с сервером";
      console.error("Ошибка при отправке сообщения об ошибке:", err);
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setDescription("");
    setError(null);
    onClose();
  };

  return (
    <DraggableDialog
      isOpen={isOpen}
      onClose={handleClose}
      title="Сообщить об ошибке"
      onSubmit={handleSubmit}
      submitText="Отправить"
      submitDisabled={!description.trim() || isSubmitting}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 flex flex-col min-h-0">
          <label className="block text-sm font-medium text-[var(--text-main)] mb-2 flex-shrink-0">
            Опишите, что произошло:
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Введите описание ошибки..."
            className="w-full flex-1 rounded-lg border border-[var(--border-main)] bg-[var(--bg-main)] px-3 py-2 text-sm text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)] focus:border-transparent resize-none min-h-0"
          />
        </div>
        {error && (
          <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-3 mt-4 flex-shrink-0">
            <p className="text-xs font-medium text-red-400 mb-1">
              Ошибка отправки:
            </p>
            <p className="text-xs text-red-300 break-all">
              {error}
            </p>
          </div>
        )}
        {initialErrorMessage && (
          <div className="rounded-lg border border-[var(--border-main)] bg-[var(--bg-muted)] p-3 mt-4 flex-shrink-0">
            <p className="text-xs font-medium text-[var(--text-muted)] mb-1">
              Техническая информация (если есть):
            </p>
            <p className="text-xs text-[var(--text-secondary)] font-mono break-all">
              {initialErrorMessage}
            </p>
          </div>
        )}
      </div>
    </DraggableDialog>
  );
}
