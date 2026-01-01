"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface SnowContextType {
  isSnowActive: boolean;
  setIsSnowActive: (active: boolean) => void;
}

const SnowContext = createContext<SnowContextType | undefined>(undefined);

export function SnowProvider({ children }: { children: ReactNode }) {
  const [isSnowActive, setIsSnowActive] = useState(false);

  // Загружаем состояние снега из localStorage при монтировании
  useEffect(() => {
    const savedSnowState = localStorage.getItem("snowActive");
    if (savedSnowState === "true") {
      setIsSnowActive(true);
    }
  }, []);

  // Сохраняем состояние снега в localStorage при изменении
  useEffect(() => {
    localStorage.setItem("snowActive", isSnowActive.toString());
  }, [isSnowActive]);

  return (
    <SnowContext.Provider value={{ isSnowActive, setIsSnowActive }}>
      {children}
    </SnowContext.Provider>
  );
}

export function useSnow() {
  const context = useContext(SnowContext);
  if (context === undefined) {
    throw new Error("useSnow must be used within a SnowProvider");
  }
  return context;
}

