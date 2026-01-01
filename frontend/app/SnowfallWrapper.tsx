"use client";

import { Snowfall } from "./Snowfall";
import { useSnow } from "./SnowProvider";

export function SnowfallWrapper() {
  const { isSnowActive } = useSnow();

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-50"
      style={{ width: '100vw', height: '100vh' }}
    >
      <Snowfall isActive={isSnowActive} />
    </div>
  );
}

