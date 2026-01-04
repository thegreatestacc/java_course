"use client";

import Link from "next/link";

interface LevelBlock {
  id: string;
  title: string;
  description: string;
  href: string;
  color: string;
  comingSoon?: boolean;
}

const levelBlocks: LevelBlock[] = [
  {
    id: "junior",
    title: "Junior Java Developer",
    description: "Фундаментальные знания для начала карьеры Java-разработчика. Изучи основы языка, работу с данными и объектно-ориентированное программирование.",
    href: "/learn/junior",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "middle",
    title: "Middle Java Developer",
    description: "Углубленное изучение Java и переход к профессиональной разработке. Изучи продвинутые темы, фреймворки и инструменты для создания реальных приложений.",
    href: "/learn/middle",
    color: "from-purple-500 to-pink-500",
    comingSoon: true
  },
  {
    id: "clean-architecture",
    title: "Чистая архитектура сервисов",
    description: "Изучи принципы SOLID, KISS, DRY и другие подходы к проектированию чистого, поддерживаемого и масштабируемого кода.",
    href: "/learn/clean-architecture",
    color: "from-green-500 to-emerald-500"
  }
];

interface AvailableTopicsProps {
  userId?: number;
}

export function AvailableTopics({ userId }: AvailableTopicsProps) {
  return (
    <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)] p-6">
      <h2 className="text-lg font-semibold text-[var(--text-main)] mb-4">
        Темы для изучения
      </h2>
      <div className="space-y-4">
        {levelBlocks.map((block) => (
          <div
            key={block.id}
            className="rounded-xl border border-[var(--border-main)] bg-[var(--bg-secondary)] p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${block.color} flex items-center justify-center text-white font-semibold text-lg shrink-0`}>
                {block.title.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-base font-semibold text-[var(--text-main)]">
                    {block.title}
                  </h3>
                  {block.comingSoon && (
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-[var(--bg-muted)] text-[var(--text-muted)]">
                      Скоро
                    </span>
                  )}
                </div>
                <p className="text-sm leading-relaxed text-[var(--text-muted)] mb-3">
                  {block.description}
                </p>
                {block.comingSoon ? (
                  <button
                    disabled
                    className="inline-flex items-center justify-center rounded-xl bg-[var(--bg-muted)] px-4 py-2 text-sm font-semibold text-[var(--text-muted)] cursor-not-allowed"
                  >
                    Скоро будет доступно
                  </button>
                ) : (
                  <Link
                    href={block.href}
                    className="inline-flex items-center justify-center rounded-xl bg-[var(--button-bg)] px-4 py-2 text-sm font-semibold text-[var(--button-text)] hover:bg-[var(--button-hover)] transition-colors"
                  >
                    Перейти к материалам
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

