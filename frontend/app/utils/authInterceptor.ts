// Утилита для перехвата fetch запросов и обработки 401 ошибок

let logoutCallback: (() => Promise<void>) | null = null;
let showMessageCallback: ((message: string) => void) | null = null;
let isHandling401 = false; // Флаг для предотвращения множественных обработок

export function setAuthCallbacks(
  onLogout: () => Promise<void>,
  onShowMessage: (message: string) => void
) {
  logoutCallback = onLogout;
  showMessageCallback = onShowMessage;
}

// Перехватываем fetch для обработки 401 (только на клиенте)
if (typeof window !== "undefined") {
  const originalFetch = window.fetch;

  window.fetch = async function(...args) {
    const response = await originalFetch.apply(this, args);
    
    // Проверяем, если это запрос с credentials и получили 401
    if (response.status === 401 && args[1]?.credentials === "include" && !isHandling401) {
      // Игнорируем запросы к /api/auth/me и /api/auth/logout, чтобы избежать бесконечного цикла
      let url = "";
      if (typeof args[0] === "string") {
        url = args[0];
      } else if (args[0] instanceof URL) {
        url = args[0].toString();
      } else if (args[0] instanceof Request) {
        url = args[0].url;
      }
      
      if (url && !url.includes("/api/auth/me") && !url.includes("/api/auth/logout")) {
        isHandling401 = true;
        
        // Вызываем колбэки асинхронно
        if (showMessageCallback) {
          showMessageCallback("Ваша сессия истекла. Пожалуйста, войдите в систему заново.");
        }
        
        if (logoutCallback) {
          try {
            await logoutCallback();
          } catch (err) {
            console.error("Ошибка при автоматическом выходе:", err);
          }
        }
        
        // Сбрасываем флаг через небольшую задержку
        setTimeout(() => {
          isHandling401 = false;
        }, 1000);
      }
    }
    
    return response;
  };
}

