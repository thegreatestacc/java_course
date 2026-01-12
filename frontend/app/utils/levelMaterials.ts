// Общие константы и типы для материалов по уровням

export interface MaterialProgress {
  id: number;
  materialId: string;
  completedAt: string;
}

export const LEVEL_MATERIALS: Record<string, string[]> = {
  "Junior Java Developer": [
    "gift/basics",
    "gift/branches",
    "gift/remote",
    "gift/advanced",
    "learn/java-core/basics",
    "learn/java-core/variables",
    "learn/java-core/control-flow",
    "learn/java-core/exceptions",
    "learn/java-oop",
    "learn/java-oop/classes",
    "learn/java-oop/inheritance",
    "learn/java-oop/polymorphism",
    "learn/java-oop/equals-hashcode",
    "learn/java-collections/list",
    "learn/java-collections/set",
    "learn/java-collections/map",
    "learn/java-collections/stream",
    "learn/junior"
  ],
  "Middle Java Developer": [
    "learn/middle"
  ],
  "Чистая архитектура сервисов": [
    "learn/clean-architecture"
  ]
};





