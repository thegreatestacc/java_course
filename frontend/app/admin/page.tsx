"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../useAuth";
import { useRouter } from "next/navigation";
import { Header } from "../Header";

interface UserInfo {
  id: number;
  email: string;
  name: string;
  createdAt: string;
  isAdmin: boolean;
  isBlocked: boolean;
  password?: string;
}

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  const [visiblePasswords, setVisiblePasswords] = useState<Set<number>>(new Set());
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    isAnimating: boolean;
    user: UserInfo | null;
    action: "block" | "unblock" | null;
  }>({
    isOpen: false,
    isAnimating: false,
    user: null,
    action: null,
  });

  useEffect(() => {
    if (!loading) {
      if (!user) {
        console.log("AdminPage: User not authenticated, redirecting to home");
        router.push("/");
        return;
      }
      console.log("AdminPage: User data:", user);
      console.log("AdminPage: isAdmin:", user.isAdmin);
      if (!user.isAdmin) {
        console.log("AdminPage: User is not admin, redirecting to home");
        router.push("/");
        return;
      }
      fetchUsers();
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (confirmModal.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [confirmModal.isOpen]);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch("/api/admin/users", {
        credentials: "include",
      });

      if (response.status === 403) {
        setError("Доступ запрещен. Требуются права администратора.");
        router.push("/");
        return;
      }

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Ошибка при загрузке пользователей");
        return;
      }

      const data = await response.json();
      if (data.success && data.users) {
        const sortedUsers = sortUsersByEmail(data.users, sortOrder);
        setUsers(sortedUsers);
        setError(null);
      } else {
        setError(data.message || "Ошибка при загрузке пользователей");
      }
    } catch (err) {
      console.error("Ошибка при загрузке пользователей:", err);
      setError("Не удалось загрузить список пользователей");
    } finally {
      setIsLoading(false);
    }
  };

  const openConfirmModal = (user: UserInfo, action: "block" | "unblock") => {
    setConfirmModal({
      isOpen: true,
      isAnimating: false,
      user,
      action,
    });
    setTimeout(() => {
      setConfirmModal(prev => ({ ...prev, isAnimating: true }));
    }, 10);
  };

  const closeConfirmModal = () => {
    setConfirmModal(prev => ({ ...prev, isAnimating: false }));
    setTimeout(() => {
      setConfirmModal({
        isOpen: false,
        isAnimating: false,
        user: null,
        action: null,
      });
    }, 300);
  };

  const handleConfirmAction = async () => {
    if (!confirmModal.user || !confirmModal.action) return;

    const userId = confirmModal.user.id;
    closeConfirmModal();

    if (confirmModal.action === "block") {
      await executeBlockUser(userId);
    } else {
      await executeUnblockUser(userId);
    }
  };

  const executeBlockUser = async (userId: number) => {
    const userToBlock = users.find(u => u.id === userId);
    if (!userToBlock) return;

    try {
      setActionLoading(userId);
      setError(null);
      setSuccess(null);
      
      const response = await fetch(`/api/admin/users/${userId}/block`, {
        method: "POST",
        credentials: "include",
      });

      if (response.status === 403) {
        setError("Доступ запрещен. Требуются права администратора.");
        return;
      }

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Ошибка при блокировке пользователя");
        return;
      }

      const data = await response.json();
      if (data.success && data.users) {
        const sortedUsers = sortUsersByEmail(data.users, sortOrder);
        setUsers(sortedUsers);
        setError(null);
        setSuccess(`Пользователь "${userToBlock.name}" успешно заблокирован`);
        setTimeout(() => setSuccess(null), 5000);
      } else {
        setError(data.message || "Ошибка при блокировке пользователя");
      }
    } catch (err) {
      console.error("Ошибка при блокировке пользователя:", err);
      setError("Не удалось заблокировать пользователя");
    } finally {
      setActionLoading(null);
    }
  };

  const handleBlockUser = (userId: number) => {
    const userToBlock = users.find(u => u.id === userId);
    if (!userToBlock) return;
    openConfirmModal(userToBlock, "block");
  };

  const handleUnblockUser = (userId: number) => {
    const userToUnblock = users.find(u => u.id === userId);
    if (!userToUnblock) return;
    openConfirmModal(userToUnblock, "unblock");
  };

  const sortUsersByEmail = (usersList: UserInfo[], order: "asc" | "desc" | null): UserInfo[] => {
    if (!order) return usersList;
    
    const sorted = [...usersList].sort((a, b) => {
      const emailA = a.email.toLowerCase();
      const emailB = b.email.toLowerCase();
      if (order === "asc") {
        return emailA.localeCompare(emailB);
      } else {
        return emailB.localeCompare(emailA);
      }
    });
    return sorted;
  };

  const handleSortByEmail = () => {
    let newOrder: "asc" | "desc" | null;
    if (sortOrder === null) {
      newOrder = "asc";
    } else if (sortOrder === "asc") {
      newOrder = "desc";
    } else {
      newOrder = null;
    }
    
    setSortOrder(newOrder);
    const sortedUsers = sortUsersByEmail(users, newOrder);
    setUsers(sortedUsers);
  };

  const togglePasswordVisibility = (userId: number) => {
    setVisiblePasswords(prev => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };

  const maskPassword = (password: string | undefined): string => {
    if (!password) return "—";
    return "•".repeat(Math.min(password.length, 64));
  };

  const executeUnblockUser = async (userId: number) => {
    const userToUnblock = users.find(u => u.id === userId);
    if (!userToUnblock) return;

    try {
      setActionLoading(userId);
      setError(null);
      setSuccess(null);
      
      const response = await fetch(`/api/admin/users/${userId}/unblock`, {
        method: "POST",
        credentials: "include",
      });

      if (response.status === 403) {
        setError("Доступ запрещен. Требуются права администратора.");
        return;
      }

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Ошибка при разблокировке пользователя");
        return;
      }

      const data = await response.json();
      if (data.success && data.users) {
        const sortedUsers = sortUsersByEmail(data.users, sortOrder);
        setUsers(sortedUsers);
        setError(null);
        setSuccess(`Пользователь "${userToUnblock.name}" успешно разблокирован`);
        setTimeout(() => setSuccess(null), 5000);
      } else {
        setError(data.message || "Ошибка при разблокировке пользователя");
      }
    } catch (err) {
      console.error("Ошибка при разблокировке пользователя:", err);
      setError("Не удалось разблокировать пользователя");
    } finally {
      setActionLoading(null);
    }
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[var(--button-bg)] border-r-transparent"></div>
          <p className="mt-4 text-sm text-[var(--text-muted)]">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)]">
        <Header />
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-4">
            <p className="text-sm text-red-500">Вы не авторизованы. Пожалуйста, войдите в систему.</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (user.isAdmin !== true) {
    return (
      <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)]">
        <Header />
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-4">
            <p className="text-sm text-red-500">
              Доступ запрещен. Требуются права администратора. 
              Ваш статус: {user.isAdmin === undefined ? "не определен" : user.isAdmin ? "админ" : "не админ"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)]">
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--text-main)] mb-2">
            Панель администратора
          </h1>
          <p className="text-sm text-[var(--text-muted)]">
            Управление пользователями системы
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-500/50 bg-red-500/10 p-4">
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 rounded-lg border border-green-500/50 bg-green-500/10 p-4">
            <p className="text-sm text-green-500">{success}</p>
          </div>
        )}

        <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[var(--bg-secondary)] border-b border-[var(--border-main)]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    <button
                      onClick={handleSortByEmail}
                      className="flex items-center gap-2 hover:text-[var(--text-main)] transition-colors"
                    >
                      Email
                      {sortOrder === "asc" && (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      )}
                      {sortOrder === "desc" && (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                      {sortOrder === null && (
                        <svg className="w-4 h-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    Имя
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    Пароль
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    Дата регистрации
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    Статус
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-main)]">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-sm text-[var(--text-muted)]">
                      Пользователи не найдены
                    </td>
                  </tr>
                ) : (
                  users.map((userInfo) => (
                    <tr
                      key={userInfo.id}
                      className="hover:bg-[var(--bg-secondary)] transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-main)]">
                        {userInfo.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-main)]">
                        <div className="flex items-center gap-2">
                          {userInfo.email}
                          {userInfo.isAdmin && (
                            <span className="inline-flex items-center rounded-full bg-blue-500/20 px-2 py-0.5 text-xs font-medium text-blue-400">
                              Админ
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-main)]">
                        {userInfo.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-[var(--text-muted)]">
                            {visiblePasswords.has(userInfo.id) 
                              ? (userInfo.password || "—")
                              : maskPassword(userInfo.password)
                            }
                          </span>
                          <button
                            onClick={() => togglePasswordVisibility(userInfo.id)}
                            className="inline-flex items-center rounded px-2 py-1 text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-muted)] transition-colors"
                            title={visiblePasswords.has(userInfo.id) ? "Скрыть пароль" : "Показать пароль"}
                          >
                            {visiblePasswords.has(userInfo.id) ? (
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.29 3.29m0 0L9.88 9.88m-3.59-3.59l3.29 3.29M14 12a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-muted)]">
                        {userInfo.createdAt
                          ? new Date(userInfo.createdAt).toLocaleDateString("ru-RU", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "—"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {userInfo.isBlocked ? (
                          <span className="inline-flex items-center rounded-full bg-red-500/20 px-2.5 py-0.5 text-xs font-medium text-red-400">
                            Заблокирован
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-green-500/20 px-2.5 py-0.5 text-xs font-medium text-green-400">
                            Активен
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {userInfo.id !== user.id ? (
                          <div className="flex items-center gap-2">
                            {userInfo.isBlocked ? (
                              <button
                                onClick={() => handleUnblockUser(userInfo.id)}
                                disabled={actionLoading === userInfo.id}
                                className="inline-flex items-center rounded-lg bg-green-500/20 px-3 py-1.5 text-xs font-medium text-green-400 hover:bg-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              >
                                {actionLoading === userInfo.id ? (
                                  <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-solid border-green-400 border-r-transparent mr-2"></span>
                                ) : null}
                                Разблокировать
                              </button>
                            ) : (
                              <button
                                onClick={() => handleBlockUser(userInfo.id)}
                                disabled={actionLoading === userInfo.id}
                                className="inline-flex items-center rounded-lg bg-red-500/20 px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              >
                                {actionLoading === userInfo.id ? (
                                  <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-solid border-red-400 border-r-transparent mr-2"></span>
                                ) : null}
                                Заблокировать
                              </button>
                            )}
                          </div>
                        ) : (
                          <span className="text-xs text-[var(--text-muted)]">Вы</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-[var(--text-muted)]">
            Всего пользователей: {users.length}
          </p>
          <button
            onClick={fetchUsers}
            className="inline-flex items-center rounded-lg border border-[var(--border-secondary)] bg-[var(--bg-card)] px-4 py-2 text-sm font-medium text-[var(--text-main)] hover:bg-[var(--bg-muted)] transition-colors"
          >
            Обновить список
          </button>
        </div>
      </div>

      {/* Модальное окно подтверждения */}
      {confirmModal.isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={closeConfirmModal}
        >
          {/* Overlay */}
          <div
            className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
              confirmModal.isAnimating ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Modal */}
          <div
            className={`relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)] shadow-xl transition-all duration-300 ${
              confirmModal.isAnimating
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-4 scale-95"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="border-b border-[var(--border-main)] px-6 py-4">
              <h3 className="text-lg font-semibold text-[var(--text-main)]">
                {confirmModal.action === "block" ? "Заблокировать пользователя" : "Разблокировать пользователя"}
              </h3>
            </div>

            {/* Content */}
            <div className="px-6 py-4">
              {confirmModal.user && (
                <>
                  <p className="text-sm text-[var(--text-muted)] mb-4">
                    {confirmModal.action === "block" ? (
                      <>
                        Вы уверены, что хотите заблокировать пользователя{" "}
                        <span className="font-semibold text-[var(--text-main)]">
                          {confirmModal.user.name}
                        </span>{" "}
                        ({confirmModal.user.email})?
                        <br />
                        <br />
                        Заблокированный пользователь не сможет войти в систему.
                      </>
                    ) : (
                      <>
                        Вы уверены, что хотите разблокировать пользователя{" "}
                        <span className="font-semibold text-[var(--text-main)]">
                          {confirmModal.user.name}
                        </span>{" "}
                        ({confirmModal.user.email})?
                        <br />
                        <br />
                        Пользователь снова сможет войти в систему.
                      </>
                    )}
                  </p>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 border-t border-[var(--border-main)] px-6 py-4">
              <button
                onClick={closeConfirmModal}
                className="rounded-lg border border-[var(--border-secondary)] bg-[var(--bg-card)] px-4 py-2 text-sm font-medium text-[var(--text-main)] hover:bg-[var(--bg-muted)] transition-colors"
              >
                Отмена
              </button>
              <button
                onClick={handleConfirmAction}
                className={`rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors ${
                  confirmModal.action === "block"
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {confirmModal.action === "block" ? "Заблокировать" : "Разблокировать"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

