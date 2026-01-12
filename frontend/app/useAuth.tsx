"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { setAuthCallbacks } from "./utils/authInterceptor";

interface User {
  id: number;
  email: string;
  name: string;
  createdAt?: string;
  isAdmin?: boolean;
  isBlocked?: boolean;
  tooltipsEnabled?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  checkAuth: () => Promise<void>;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
  showMessage: (message: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  const showMessage = (msg: string) => {
    setMessage(msg);
    // Автоматически скрываем сообщение через 5 секунд
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Ошибка при выходе:", err);
    } finally {
      setUser(null);
    }
  };

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me", {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } else if (response.status === 401) {
        // Сессия истекла
        setUser(null);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Ошибка проверки аутентификации:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
    // Устанавливаем колбэки для interceptor
    setAuthCallbacks(logout, showMessage);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, checkAuth, setUser, logout, showMessage }}>
      {children}
      {message && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4">
          <div className="rounded-xl border border-orange-500/50 bg-orange-500/10 backdrop-blur-sm p-4 shadow-lg">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <div className="flex-1">
                <p className="text-sm font-medium text-orange-500">{message}</p>
              </div>
              <button
                onClick={() => setMessage(null)}
                className="text-orange-500 hover:text-orange-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

