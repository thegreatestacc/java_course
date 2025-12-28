import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // важно для Docker production (standalone сборка)
  output: "standalone",

  // allowedDevOrigins — только для next dev (локальная разработка)
  // В проде это не используется, но можно оставить как есть.
  allowedDevOrigins: ["localhost", "127.0.0.1", "5.129.200.192", "devcours.ru"],

  // НЕ рекомендую отдавать Access-Control-Allow-Origin: *
  // из Next на все пути — это может ломать кэш/безопасность.
  // Лучше настроить CORS на бэкенде /api или на reverse-proxy (nginx).

  // Проксирование API запросов на backend
  async rewrites() {
    // В Docker используем имя сервиса, локально - localhost
    const backendUrl = 
      process.env.BACKEND_URL || 
      (process.env.NODE_ENV === "production" 
        ? "http://backend:8080" 
        : "http://localhost:8080");
    
    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
