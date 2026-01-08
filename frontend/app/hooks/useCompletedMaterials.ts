// Хук для загрузки завершенных материалов

import { useState, useEffect, useCallback } from "react";
import { MaterialProgress } from "../utils/levelMaterials";

export function useCompletedMaterials() {
  const [materials, setMaterials] = useState<MaterialProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCompletedMaterials = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/statistics/materials/completed", {
        credentials: "include",
      });
      
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          const sorted = data.sort((a, b) => 
            new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
          );
          setMaterials(sorted);
        } else {
          setMaterials([]);
        }
      } else if (response.status === 401) {
        setMaterials([]);
      } else {
        const errorText = await response.text().catch(() => response.statusText);
        console.error("Ошибка загрузки прочитанных материалов:", response.status, errorText);
        setMaterials([]);
        if (response.status !== 401) {
          setError("Не удалось загрузить прочитанные материалы");
        }
      }
    } catch (error) {
      console.error("Ошибка загрузки прочитанных материалов:", error);
      setMaterials([]);
      setError("Не удалось загрузить прочитанные материалы");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCompletedMaterials();
  }, [loadCompletedMaterials]);

  useEffect(() => {
    const handleFocus = () => {
      loadCompletedMaterials();
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [loadCompletedMaterials]);

  return { materials, loading, error, reload: loadCompletedMaterials };
}



