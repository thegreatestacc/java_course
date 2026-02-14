import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // важно для Docker production (standalone сборка)
  output: "standalone",

  // TypeScript проверки при сборке
  typescript: {
    ignoreBuildErrors: false,
  },

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
