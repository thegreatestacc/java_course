"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import { Header } from "../Header";
import { useAuth } from "../useAuth";
import Link from "next/link";

// Р”РёРЅР°РјРёС‡РµСЃРєРёР№ РёРјРїРѕСЂС‚ РґР»СЏ РёР·Р±РµР¶Р°РЅРёСЏ SSR РїСЂРѕР±Р»РµРј
const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
});

interface TopicNode {
  id: string;
  name: string;
  level: number;
  category: string;
  href: string;
  completed?: boolean;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number;
  fy?: number;
}

interface TopicLink {
  source: string;
  target: string;
  type: "prerequisite" | "next";
}

// РЎС‚СЂСѓРєС‚СѓСЂР° Р·Р°РІРёСЃРёРјРѕСЃС‚РµР№ РјРµР¶РґСѓ С‚РµРјР°РјРё
const topicDependencies: Record<string, string[]> = {
  // Git - Р±Р°Р·РѕРІР°СЏ С‚РµРјР°, РЅРµ С‚СЂРµР±СѓРµС‚ Р·Р°РІРёСЃРёРјРѕСЃС‚РµР№
  "gift/basics": [],
  "gift/branches": ["gift/basics"],
  "gift/remote": ["gift/branches"],
  "gift/advanced": ["gift/remote"],
  
  // Java Core
  "learn/java-core/basics": [],
  "learn/java-core/variables": ["learn/java-core/basics"],
  "learn/java-core/control-flow": ["learn/java-core/variables"],
  "learn/java-core/exceptions": ["learn/java-core/control-flow"],
  "learn/java-core/practice": ["learn/java-core/exceptions"],
  
  // Java OOP
  "learn/java-oop": ["learn/java-core/control-flow"],
  "learn/java-oop/equals-hashcode": ["learn/java-oop"],
  
  // Java Collections
  "learn/java-collections": ["learn/java-core/control-flow"],
  "learn/java-collections/list": ["learn/java-collections"],
  "learn/java-collections/set": ["learn/java-collections/list"],
  "learn/java-collections/map": ["learn/java-collections/set"],
  "learn/java-collections/stream": ["learn/java-collections/map"],
  
  // РЈСЂРѕРІРЅРё
  "learn/junior": [
    "learn/java-core/exceptions",
    "learn/java-oop",
    "learn/java-collections/stream"
  ],
  "learn/middle": ["learn/junior"],
  "learn/clean-architecture": ["learn/middle"],
};

const topicMetadata: Record<string, { name: string; category: string; level: number }> = {
  "gift/basics": { name: "Git: Основы", category: "Git", level: 1 },
  "gift/branches": { name: "Git: Ветки", category: "Git", level: 2 },
  "gift/remote": { name: "Git: Удаленные репозитории", category: "Git", level: 3 },
  "gift/advanced": { name: "Git: Продвинутые техники", category: "Git", level: 4 },
  
  "learn/java-core/basics": { name: "Java Core: Основы", category: "Java Core", level: 1 },
  "learn/java-core/variables": { name: "Java Core: Переменные", category: "Java Core", level: 2 },
  "learn/java-core/control-flow": { name: "Java Core: Условия и циклы", category: "Java Core", level: 3 },
  "learn/java-core/exceptions": { name: "Java Core: Исключения", category: "Java Core", level: 4 },
  "learn/java-core/practice": { name: "Java Core: Практика", category: "Java Core", level: 5 },
  
  "learn/java-oop": { name: "Java OOP: Основы", category: "Java OOP", level: 1 },
  "learn/java-oop/equals-hashcode": { name: "Java OOP: equals & hashCode", category: "Java OOP", level: 2 },
  
  "learn/java-collections": { name: "Java Collections: Обзор", category: "Java Collections", level: 1 },
  "learn/java-collections/list": { name: "Java Collections: List", category: "Java Collections", level: 2 },
  "learn/java-collections/set": { name: "Java Collections: Set", category: "Java Collections", level: 3 },
  "learn/java-collections/map": { name: "Java Collections: Map", category: "Java Collections", level: 4 },
  "learn/java-collections/stream": { name: "Java Collections: Stream", category: "Java Collections", level: 5 },
  
  "learn/junior": { name: "Junior Developer", category: "Уровни", level: 1 },
  "learn/middle": { name: "Middle Developer", category: "Уровни", level: 2 },
  "learn/clean-architecture": { name: "Чистая архитектура", category: "Уровни", level: 3 },
};

const categoryColors: Record<string, string> = {
  "Git": "#f97316",
  "Java Core": "#3b82f6",
  "Java OOP": "#8b5cf6",
  "Java Collections": "#10b981",
  "Уровни": "#ec4899",
};

export default function KnowledgeGraphPage() {
  const { user, loading, showMessage } = useAuth();
  const [isMounted, setIsMounted] = useState(false);
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const graphRef = useRef<any>(null);
  const graphContainerRef = useRef<HTMLDivElement | null>(null);

  // Р—Р°РіСЂСѓР¶Р°РµРј Р·Р°РІРµСЂС€РµРЅРЅС‹Рµ С‚РµРјС‹
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const loadCompletedTopics = async () => {
      if (!user) return;

      try {
        const response = await fetch("/api/statistics/materials/completed", {
          credentials: "include",
        });

        if (response.ok) {
          const materials: Array<{ materialId: string }> = await response.json();
          setCompletedTopics(new Set(materials.map((m) => m.materialId)));
        }
      } catch (error) {
        console.error("Ошибка загрузки завершенных тем:", error);
      }
    };

    loadCompletedTopics();
  }, [user]);

  // РЎРѕР·РґР°РµРј СѓР·Р»С‹ Рё СЃРІСЏР·Рё
  const { nodes, links } = useMemo(() => {
    const nodeList: TopicNode[] = [];
    const linkList: TopicLink[] = [];
    const categoryOrder = Object.keys(categoryColors);
    const maxLevel = Math.max(...Object.values(topicMetadata).map((meta) => meta.level));
    const categorySpacing = 440;
    const levelSpacing = 180;
    const xOffset = ((categoryOrder.length - 1) * categorySpacing) / 2;
    const yOffset = ((maxLevel - 1) * levelSpacing) / 2;

    // РЎРѕР·РґР°РµРј СѓР·Р»С‹
    Object.keys(topicMetadata).forEach((topicId) => {
      const meta = topicMetadata[topicId];
      const categoryIndex = categoryOrder.indexOf(meta.category);
      const initialX = categoryIndex * categorySpacing - xOffset;
      const initialY = (meta.level - 1) * levelSpacing - yOffset;

      nodeList.push({
        id: topicId,
        name: meta.name,
        level: meta.level,
        category: meta.category,
        href: `/${topicId}`,
        completed: completedTopics.has(topicId),
        x: initialX,
        y: initialY,
        fx: initialX,
        fy: initialY,
      });
    });

    // РЎРѕР·РґР°РµРј СЃРІСЏР·Рё
    Object.entries(topicDependencies).forEach(([topicId, prerequisites]) => {
      prerequisites.forEach((prereqId) => {
        if (topicMetadata[prereqId] && topicMetadata[topicId]) {
          linkList.push({
            source: prereqId,
            target: topicId,
            type: "prerequisite",
          });
        }
      });
    });

    return { nodes: nodeList, links: linkList };
  }, [completedTopics]);

  const graphData = useMemo(() => ({ nodes, links }), [nodes, links]);

  const handleNodeClick = useCallback((node: any) => {
    if (loading) {
      return;
    }

    if (!user) {
      showMessage("Чтобы открыть материал, войдите в аккаунт.");
      return;
    }

    if (node.href) {
      window.open(node.href, "_blank");
    }
  }, [loading, user, showMessage]);

  const getNodeColor = (node: TopicNode) => {
    if (hoveredNode === node.id) {
      return "#fbbf24";
    }
    if (node.completed) {
      return "#10b981";
    }
    return categoryColors[node.category] || "#6b7280";
  };

  const handleNodeHover = useCallback((node: any) => {
    const nextHoveredId = node?.id || null;
    setHoveredNode((prev) => (prev === nextHoveredId ? prev : nextHoveredId));
  }, []);

  const handleNodeDragEnd = useCallback((node: any) => {
    node.fx = node.x;
    node.fy = node.y;
  }, []);

  const fitGraphToViewport = useCallback(() => {
    const graph = graphRef.current;
    if (!graph) return;

    // Немного больше отступ, чтобы подписи узлов тоже попадали в видимую область
    graph.zoomToFit(700, 110);
  }, []);

  useEffect(() => {
    const container = graphContainerRef.current;
    if (!container) return;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();

      const currentZoom = graphRef.current?.zoom?.();
      if (typeof currentZoom !== "number") return;

      const zoomFactor = event.deltaY > 0 ? 0.9 : 1.1;
      const nextZoom = Math.max(0.5, Math.min(2, currentZoom * zoomFactor));
      graphRef.current.zoom(nextZoom, 180);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useEffect(() => {
    if (!isMounted || nodes.length === 0) return;

    // Ждем, пока canvas смонтируется и получит финальные размеры контейнера
    const rafId = requestAnimationFrame(() => {
      fitGraphToViewport();
    });

    const timeoutId = window.setTimeout(() => {
      fitGraphToViewport();
    }, 250);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
    };
  }, [isMounted, nodes.length, fitGraphToViewport]);

  return (
    <div className="min-h-dvh bg-[var(--bg-main)] text-[var(--text-main)]">
      <Header leftButton={{ href: "/", text: "← На главную" }} />
      
      <main className="mx-auto max-w-7xl px-5 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-main)] mb-4">
            Граф знаний
          </h1>
          <p className="text-base leading-relaxed text-[var(--text-muted)] max-w-3xl">
            Визуализация зависимостей между темами курса. Каждая тема связана с темами, которые нужно изучить перед ней.
            Зеленые узлы - изученные темы, цветные - доступные для изучения.
          </p>
        </div>

        {/* Р›РµРіРµРЅРґР° */}
        <div className="mb-6 p-4 rounded-xl border border-[var(--border-main)] bg-[var(--bg-card)]">
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span className="text-[var(--text-muted)]">Изучено</span>
            </div>
            {Object.entries(categoryColors).map(([category, color]) => (
              <div key={category} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                <span className="text-[var(--text-muted)]">{category}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Р“СЂР°С„ */}
        <div
          ref={graphContainerRef}
          className="rounded-xl border border-[var(--border-main)] bg-[var(--bg-card)] overflow-hidden"
          style={{ height: "80vh" }}
        >
          {isMounted && (
            <ForceGraph2D
              ref={graphRef}
              graphData={graphData}
              nodeLabel={(node: any) => `${node.name}\n${node.category}`}
              nodeColor={(node: any) => getNodeColor(node)}
              nodeVal={(node: any) => node.completed ? 8 : 6}
              linkColor={() => "rgba(107, 114, 128, 0.3)"}
              linkWidth={2}
              linkDirectionalArrowLength={6}
              linkDirectionalArrowRelPos={1}
              onNodeClick={handleNodeClick}
              onNodeHover={handleNodeHover}
              onNodeDragEnd={handleNodeDragEnd}
              nodeCanvasObjectMode={() => "after"}
              nodeCanvasObject={(node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
                const label = node.name;
                const fontSize = 12 / globalScale;
                ctx.font = `${fontSize}px Sans-Serif`;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillStyle = typeof document !== "undefined" && document.documentElement.classList.contains("dark")
                  ? "rgba(230, 230, 230, 0.95)"
                  : "rgba(0, 0, 0, 0.85)";
                ctx.fillText(label, node.x || 0, (node.y || 0) + 10);
              }}
              cooldownTicks={100}
              onEngineStop={() => {
                fitGraphToViewport();
              }}
              enablePanInteraction={true}
              enableZoomInteraction={false}
              enableNodeDrag={true}
              warmupTicks={100}
              minZoom={0.5}
              maxZoom={2}
            />
          )}
        </div>

        {/* РЎРїРёСЃРѕРє С‚РµРј */}
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {nodes.map((node) => (
            <Link
              key={node.id}
              href={node.href}
              className="rounded-xl border border-[var(--border-main)] bg-[var(--bg-card)] p-4 hover:border-[var(--button-bg)] transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <span
                  className="px-2 py-1 rounded-full text-xs font-medium text-white"
                  style={{ backgroundColor: categoryColors[node.category] || "#6b7280" }}
                >
                  {node.category}
                </span>
                {node.completed && (
                  <span className="text-green-500 text-sm">✓</span>
                )}
              </div>
              <h3 className="text-base font-semibold text-[var(--text-main)] mb-1">
                {node.name}
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                Уровень {node.level}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
