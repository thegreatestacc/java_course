"use client";

// app/Sidebar.tsx
// Боковая панель навигации в стиле IDE

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface TreeNode {
  name: string;
  path: string;
  icon?: string;
  children?: TreeNode[];
}

const navigationTree: TreeNode[] = [
  {
    name: "index.tsx",
    path: "/",
    icon: "📄"
  },
  {
    name: "gift",
    path: "/gift",
    icon: "📁",
    children: [
      {
        name: "basics.tsx",
        path: "/gift/basics",
        icon: "📄"
      },
      {
        name: "branches.tsx",
        path: "/gift/branches",
        icon: "📄"
      },
      {
        name: "remote.tsx",
        path: "/gift/remote",
        icon: "📄"
      },
      {
        name: "advanced.tsx",
        path: "/gift/advanced",
        icon: "📄"
      }
    ]
  }
];

export function Sidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["/gift"]));

  const toggleExpand = (path: string) => {
    const newExpanded = new Set(expanded);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpanded(newExpanded);
  };

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  const renderNode = (node: TreeNode, level: number = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expanded.has(node.path);
    const active = isActive(node.path);

    return (
      <div key={node.path}>
        <div
          className={`flex items-center gap-1.5 px-2 py-1 text-xs hover:bg-[var(--bg-muted)] cursor-pointer select-none ${
            active ? "bg-[var(--bg-muted)] text-[var(--text-main)] font-medium" : "text-[var(--text-muted)]"
          }`}
          style={{ paddingLeft: `${8 + level * 16}px` }}
        >
          {hasChildren && (
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleExpand(node.path);
              }}
              className="w-3 h-3 flex items-center justify-center hover:bg-[var(--bg-secondary)] rounded flex-shrink-0"
            >
              <span className={`text-[9px] transition-transform ${isExpanded ? "rotate-90" : ""}`}>
                ▶
              </span>
            </button>
          )}
          {!hasChildren && <span className="w-3 flex-shrink-0" />}
          <span className="text-xs mr-1.5 flex-shrink-0">{node.icon}</span>
          <Link
            href={node.path}
            className="flex-1 truncate hover:text-[var(--text-main)]"
            onClick={(e) => {
              if (hasChildren) {
                e.preventDefault();
                toggleExpand(node.path);
              }
            }}
          >
            {node.name}
          </Link>
        </div>
        {hasChildren && isExpanded && (
          <div>
            {node.children!.map((child) => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className="w-56 bg-[var(--bg-main)] h-screen sticky top-[20vh] overflow-y-auto flex-shrink-0">
      <div className="p-2 bg-[var(--bg-secondary)]">
        <h2 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
          EXPLORER
        </h2>
      </div>
      <nav className="py-1 font-mono text-xs">
        {navigationTree.map((node) => renderNode(node))}
      </nav>
    </aside>
  );
}

