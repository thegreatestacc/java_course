"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { LEVEL_MATERIALS } from "../utils/levelMaterials";
import { useCompletedMaterials } from "../hooks/useCompletedMaterials";

export type TaskStatus = "backlog" | "todo" | "doing" | "done";

export interface Task {
  id: string;
  title: string;
  type: "material" | "practice";
  href: string;
  status: TaskStatus;
  topic?: string; // Тема для группировки
}

const PRACTICAL_TASKS: Omit<Task, "status">[] = [
  {
    id: "gift/quiz",
    title: "Тест по Git (теоретический)",
    type: "practice",
    href: "/gift/quiz",
  },
  {
    id: "gift/quiz-practical",
    title: "Тест по Git (практический)",
    type: "practice",
    href: "/gift/quiz-practical",
  },
];

const getMaterialName = (materialId: string): string => {
  const materialNames: Record<string, string> = {
    "gift/basics": "Основы Git",
    "gift/branches": "Работа с ветками",
    "gift/remote": "Удаленные репозитории",
    "gift/advanced": "Продвинутые техники Git",
    "learn/java-core/basics": "Java Core: Основы",
    "learn/java-core/variables": "Java Core: Переменные",
    "learn/java-core/control-flow": "Java Core: Управляющие конструкции",
    "learn/java-oop": "Java OOP",
    "learn/java-oop/equals-hashcode": "equals() и hashCode()",
    "learn/java-collections/list": "Java Collections: List",
    "learn/java-collections/set": "Java Collections: Set",
    "learn/java-collections/map": "Java Collections: Map",
    "learn/junior": "Обзор Junior Java Developer",
    "learn/middle": "Обзор Middle Java Developer",
    "learn/clean-architecture": "Чистая архитектура сервисов",
    "learn/clean-architecture/introduction": "Что такое чистая архитектура",
    "learn/clean-architecture/solid": "Принципы SOLID",
    "learn/clean-architecture/kiss": "KISS (Keep It Simple, Stupid)",
    "learn/clean-architecture/dry": "DRY (Don't Repeat Yourself)",
    "learn/clean-architecture/yagni": "YAGNI (You Aren't Gonna Need It)",
    "learn/clean-architecture/layers": "Слои архитектуры сервисов",
    "learn/clean-architecture/practice": "Практические советы",
  };
  return materialNames[materialId] || materialId;
};

interface TaskBoardProps {
  userId: number;
}

export function TaskBoard({ userId }: TaskBoardProps) {
  const { materials, reload } = useCompletedMaterials();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<TaskStatus | null>(null);

  // Функция для определения темы задачи
  const getTaskTopic = (taskId: string, taskType: "material" | "practice"): string => {
    if (taskType === "practice") {
      return "Практические задания";
    }
    
    // Ищем тему в LEVEL_MATERIALS
    for (const [topic, materialIds] of Object.entries(LEVEL_MATERIALS)) {
      if (materialIds.includes(taskId)) {
        return topic;
      }
    }
    
    // Проверяем подтемы clean-architecture
    if (taskId.startsWith("learn/clean-architecture/")) {
      return "Чистая архитектура сервисов";
    }
    
    return "Другие";
  };

  // Функция для получения краткого тега темы
  const getTopicTag = (topic?: string): string => {
    if (!topic) return "";
    
    if (topic === "Junior Java Developer") {
      return "Java Jun";
    } else if (topic === "Middle Java Developer") {
      return "Java Mid";
    } else if (topic === "Чистая архитектура сервисов") {
      return "Арх-ра";
    } else if (topic === "Практические задания") {
      return "Практика";
    }
    
    return topic;
  };

  // Генерируем все задачи из материалов и практических заданий
  const allTasks = useMemo(() => {
    const materialTasks: Omit<Task, "status">[] = [];
    
    // Добавляем все материалы из LEVEL_MATERIALS
    Object.values(LEVEL_MATERIALS).forEach((materialIds) => {
      materialIds.forEach((materialId) => {
        materialTasks.push({
          id: materialId,
          title: getMaterialName(materialId),
          type: "material",
          href: materialId.startsWith("gift/") || materialId.startsWith("learn/")
            ? `/${materialId}`
            : `/learn/${materialId}`,
          topic: getTaskTopic(materialId, "material"),
        });
      });
    });

    // Добавляем подтемы clean-architecture
    const cleanArchitectureSubtopics = [
      "learn/clean-architecture/introduction",
      "learn/clean-architecture/solid",
      "learn/clean-architecture/kiss",
      "learn/clean-architecture/dry",
      "learn/clean-architecture/yagni",
      "learn/clean-architecture/layers",
      "learn/clean-architecture/practice",
    ];

    cleanArchitectureSubtopics.forEach((materialId) => {
      materialTasks.push({
        id: materialId,
        title: getMaterialName(materialId),
        type: "material",
        href: `/${materialId}`,
        topic: "Чистая архитектура сервисов",
      });
    });

    // Добавляем практические задачи с темой
    const practicalTasksWithTopic = PRACTICAL_TASKS.map(task => ({
      ...task,
      topic: "Практические задания",
    }));

    return [...materialTasks, ...practicalTasksWithTopic];
  }, []);

  // Загружаем состояние задач из localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem(`taskBoard_${userId}`);
    if (savedTasks) {
      try {
        const parsed = JSON.parse(savedTasks);
        // Проверяем, что все задачи из allTasks присутствуют
        const taskMap = new Map<string, Task>();
        parsed.forEach((task: Task) => {
          taskMap.set(task.id, task);
        });

        // Добавляем новые задачи в backlog, если они появились
        // Также обновляем topic для существующих задач, если его нет
        allTasks.forEach((task) => {
          if (!taskMap.has(task.id)) {
            taskMap.set(task.id, { ...task, status: "backlog" });
          } else {
            // Обновляем topic для существующих задач, если его нет
            const existingTask = taskMap.get(task.id)!;
            if (!existingTask.topic && task.topic) {
              existingTask.topic = task.topic;
              taskMap.set(task.id, existingTask);
            }
          }
        });

        setTasks(Array.from(taskMap.values()));
      } catch (error) {
        console.error("Ошибка загрузки задач:", error);
        // Инициализируем все задачи в backlog
        setTasks(allTasks.map((task) => ({ ...task, status: "backlog" })));
      }
    } else {
      // Инициализируем все задачи в backlog
      setTasks(allTasks.map((task) => ({ ...task, status: "backlog" })));
    }
  }, [userId, allTasks]);

  // Сохраняем состояние задач в localStorage
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem(`taskBoard_${userId}`, JSON.stringify(tasks));
    }
  }, [tasks, userId]);

  // Обновляем статус задач на основе завершенных материалов
  useEffect(() => {
    if (materials.length > 0) {
      const completedMaterialIds = new Set(materials.map((m) => m.materialId));
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task.type === "material" && completedMaterialIds.has(task.id)) {
            // Если материал завершен, но задача не в done, перемещаем в done
            if (task.status !== "done") {
              return { ...task, status: "done" };
            }
          } else if (task.type === "material" && !completedMaterialIds.has(task.id)) {
            // Если материал не завершен, но задача в done, перемещаем в backlog
            if (task.status === "done") {
              return { ...task, status: "backlog" };
            }
          }
          return task;
        })
      );
    }
  }, [materials]);

  // Слушаем события обновления доски задач из других компонентов
  useEffect(() => {
    const handleTaskBoardUpdate = (event: CustomEvent) => {
      const { materialId, newStatus } = event.detail;
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === materialId ? { ...task, status: newStatus } : task
        )
      );
    };

    window.addEventListener('taskBoardUpdate', handleTaskBoardUpdate as EventListener);
    return () => {
      window.removeEventListener('taskBoardUpdate', handleTaskBoardUpdate as EventListener);
    };
  }, []);

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e: React.DragEvent, status: TaskStatus) => {
    e.preventDefault();
    setDragOverColumn(status);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = async (status: TaskStatus) => {
    if (draggedTask) {
      const previousStatus = draggedTask.status;
      
      // Обновляем статус задачи
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === draggedTask.id ? { ...task, status } : task
        )
      );
      setDraggedTask(null);
      setDragOverColumn(null);

      // Синхронизация с API: если перемещаем из done в другой статус - откатываем материал
      if (previousStatus === "done" && status !== "done" && draggedTask.type === "material") {
        try {
          const encodedMaterialId = encodeURIComponent(draggedTask.id);
          const response = await fetch(`/api/statistics/materials/complete?materialId=${encodedMaterialId}`, {
            method: "DELETE",
            credentials: "include",
          });
          
          // Отправляем событие только после успешного отката
          if (response.ok) {
            console.log('Material uncompleted, dispatching event for:', draggedTask.id);
            // Обновляем список материалов
            reload();
            // Отправляем событие для обновления статуса на страницах материалов
            // Используем setTimeout для гарантии, что событие обработается
            setTimeout(() => {
              window.dispatchEvent(new CustomEvent('materialUncompleted', { 
                detail: { materialId: draggedTask.id } 
              }));
            }, 100);
          }
        } catch (error) {
          console.error("Ошибка при откате материала:", error);
        }
      }
      
      // Синхронизация с API: если перемещаем в done - отмечаем материал как завершенный
      if (previousStatus !== "done" && status === "done" && draggedTask.type === "material") {
        try {
          const encodedMaterialId = encodeURIComponent(draggedTask.id);
          await fetch(`/api/statistics/materials/complete?materialId=${encodedMaterialId}`, {
            method: "POST",
            credentials: "include",
          });
          
          // Обновляем список материалов
          reload();
          // Отправляем событие для обновления статуса на страницах материалов
          console.log('Material completed, dispatching event for:', draggedTask.id);
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('materialCompleted', { 
              detail: { materialId: draggedTask.id } 
            }));
          }, 100);
        } catch (error) {
          console.error("Ошибка при отметке материала как завершенного:", error);
        }
      }
    }
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
    setDragOverColumn(null);
  };

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter((task) => task.status === status);
  };

  // Группируем задачи по темам для backlog
  const getGroupedTasksByStatus = (status: TaskStatus) => {
    const tasksByStatus = getTasksByStatus(status);
    
    if (status !== "backlog") {
      // Для других колонок возвращаем без группировки
      return { ungrouped: tasksByStatus };
    }
    
    // Группируем задачи по темам
    const grouped: Record<string, Task[]> = {};
    tasksByStatus.forEach((task) => {
      const topic = task.topic || "Другие";
      if (!grouped[topic]) {
        grouped[topic] = [];
      }
      grouped[topic].push(task);
    });
    
    return grouped;
  };

  const columns: { id: TaskStatus; title: string }[] = [
    { id: "backlog", title: "Backlog" },
    { id: "todo", title: "To Do" },
    { id: "doing", title: "Doing" },
    { id: "done", title: "Done" },
  ];

  return (
    <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)] p-6">
      <h2 className="text-lg font-semibold text-[var(--text-main)] mb-6">
        Доска задач
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((column) => {
          const columnTasks = getTasksByStatus(column.id);
          const groupedTasks = getGroupedTasksByStatus(column.id);
          const isBacklog = column.id === "backlog";
          
          return (
            <div
              key={column.id}
              className={`flex flex-col min-h-[400px] rounded-lg border p-4 transition-all ${
                dragOverColumn === column.id
                  ? "border-[var(--button-bg)] bg-[var(--button-bg)]/10 border-2"
                  : "border-[var(--border-main)] bg-[var(--bg-muted)]"
              }`}
              onDragOver={(e) => handleDragOver(e, column.id)}
              onDragLeave={handleDragLeave}
              onDrop={() => handleDrop(column.id)}
            >
              <h3 className="text-sm font-semibold text-[var(--text-main)] mb-3">
                {column.title} ({columnTasks.length})
              </h3>
              <div className="flex-1 space-y-4 overflow-y-auto">
                {columnTasks.length === 0 ? (
                  <p className="text-xs text-[var(--text-muted)] text-center py-4">
                    Нет задач
                  </p>
                ) : isBacklog ? (
                  // Для backlog показываем группировку по темам
                  Object.entries(groupedTasks).map(([topic, topicTasks]) => (
                    <div key={topic} className="space-y-2">
                      <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider px-1">
                        {topic}
                      </h4>
                      {topicTasks.map((task) => (
                        <div
                          key={task.id}
                          draggable
                          onDragStart={() => handleDragStart(task)}
                          onDragEnd={handleDragEnd}
                          className={`rounded-lg border border-[var(--border-main)] bg-[var(--bg-card)] p-3 cursor-move hover:shadow-md transition-all ${
                            draggedTask?.id === task.id ? "opacity-50" : ""
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <span
                              className={`text-xs font-medium px-2 py-1 rounded ${
                                task.type === "material"
                                  ? "bg-blue-500/20 text-blue-600 dark:text-blue-400"
                                  : "bg-purple-500/20 text-purple-600 dark:text-purple-400"
                              }`}
                            >
                              {task.type === "material" ? "Материал" : "Практика"}
                            </span>
                            {task.topic && (
                              <span className="text-xs font-medium px-2 py-1 rounded bg-[var(--bg-muted)] text-[var(--text-muted)]">
                                {getTopicTag(task.topic)}
                              </span>
                            )}
                          </div>
                          <Link
                            href={task.href}
                            className="text-sm font-medium text-[var(--text-main)] hover:text-[var(--button-bg)] transition-colors block mb-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {task.title}
                          </Link>
                        </div>
                      ))}
                    </div>
                  ))
                ) : (
                  // Для других колонок показываем без группировки
                  columnTasks.map((task) => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={() => handleDragStart(task)}
                      onDragEnd={handleDragEnd}
                      className={`rounded-lg border border-[var(--border-main)] bg-[var(--bg-card)] p-3 cursor-move hover:shadow-md transition-all ${
                        draggedTask?.id === task.id ? "opacity-50" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded ${
                            task.type === "material"
                              ? "bg-blue-500/20 text-blue-600 dark:text-blue-400"
                              : "bg-purple-500/20 text-purple-600 dark:text-purple-400"
                          }`}
                        >
                          {task.type === "material" ? "Материал" : "Практика"}
                        </span>
                        {task.topic && (
                          <span className="text-xs font-medium px-2 py-1 rounded bg-[var(--bg-muted)] text-[var(--text-muted)]">
                            {getTopicTag(task.topic)}
                          </span>
                        )}
                      </div>
                      <Link
                        href={task.href}
                        className="text-sm font-medium text-[var(--text-main)] hover:text-[var(--button-bg)] transition-colors block mb-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {task.title}
                      </Link>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

