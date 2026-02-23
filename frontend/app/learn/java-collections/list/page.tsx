"use client";

// app/learn/java-collections/list/page.tsx
// Страница с обучающим материалом по List и его реализациям

import { JetBrains_Mono } from "next/font/google";
import { Header } from "../../../Header";
import { MotivationalQuotes } from "../../../MotivationalQuotes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../../useAuth";

const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Тема IntelliJ IDEA Light
const intellijLight: any = {
  'code[class*="language-"]': {
    color: '#000000',
    background: 'transparent',
  },
  'pre[class*="language-"]': {
    color: '#000000',
    background: 'transparent',
    padding: 0,
    margin: 0,
  },
  'comment': { color: '#808080', fontStyle: 'italic' },
  'prolog': { color: '#808080', fontStyle: 'italic' },
  'doctype': { color: '#808080', fontStyle: 'italic' },
  'cdata': { color: '#808080', fontStyle: 'italic' },
  'punctuation': { color: '#000000' },
  'operator': { color: '#000000' },
  'keyword': { color: '#0000ff' },
  'class-name': { color: '#0066cc' },
  'function': { color: '#006600' },
  'variable': { color: '#000000' },
  'string': { color: '#008000' },
  'char': { color: '#008000' },
  'number': { color: '#0000ff' },
  'boolean': { color: '#0000ff' },
  'constant': { color: '#0000ff' },
  'property': { color: '#ffc800' },
  'tag': { color: '#ffc800' },
  'attr-name': { color: '#ffc800' },
  'attr-value': { color: '#808080' },
  'builtin': { color: '#008000' },
  'symbol': { color: '#0000ff' },
  'deleted': { color: '#0000ff' },
  'inserted': { color: '#008000' },
  'entity': { color: '#000000' },
  'url': { color: '#000000' },
  'atrule': { color: '#0000ff' },
  'regex': { color: '#000000' },
  'important': { color: '#000000', fontWeight: 'bold' },
};

// Тема IntelliJ IDEA Darcula (Dark)
const intellijDark: any = {
  'code[class*="language-"]': {
    color: '#a9b7c6',
    background: 'transparent',
  },
  'pre[class*="language-"]': {
    color: '#a9b7c6',
    background: 'transparent',
    padding: 0,
    margin: 0,
  },
  'comment': { color: '#808080', fontStyle: 'italic' },
  'prolog': { color: '#808080', fontStyle: 'italic' },
  'doctype': { color: '#808080', fontStyle: 'italic' },
  'cdata': { color: '#808080', fontStyle: 'italic' },
  'punctuation': { color: '#a9b7c6' },
  'operator': { color: '#a9b7c6' },
  'keyword': { color: '#cc7832' },
  'class-name': { color: '#4eade5' },
  'function': { color: '#e6b85c' },
  'variable': { color: '#a9b7c6' },
  'string': { color: '#6a8759' },
  'char': { color: '#6a8759' },
  'number': { color: '#6897bb' },
  'boolean': { color: '#6897bb' },
  'constant': { color: '#6897bb' },
  'property': { color: '#cc7832' },
  'tag': { color: '#cc7832' },
  'attr-name': { color: '#629755' },
  'attr-value': { color: '#6a8759' },
  'builtin': { color: '#6a8759' },
  'symbol': { color: '#6897bb' },
  'deleted': { color: '#6897bb' },
  'inserted': { color: '#6a8759' },
  'entity': { color: '#a9b7c6' },
  'url': { color: '#a9b7c6' },
  'atrule': { color: '#cc7832' },
  'regex': { color: '#a9b7c6' },
  'important': { color: '#a9b7c6', fontWeight: 'bold' },
  'parameter': { color: '#9876aa' },
};

export default function JavaCollectionsListPage() {
  const pathname = usePathname();

  return (
    <div className={mono.className}>
      <div className="min-h-dvh bg-[var(--bg-main)] text-[var(--text-main)]">
        <nav className="hidden lg:block fixed left-0 top-[20vh] w-56 h-[calc(100vh-20vh)] overflow-y-auto pl-8 pr-4 py-6 z-10">
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3 px-2">
                Навигация
              </h3>
              <div className="space-y-1">
                <Link
                  href="/"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                >
                  <span className="transition-opacity duration-200 opacity-70 hover:opacity-100">Главная</span>
                </Link>
                <Link
                  href="/learn"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                >
                  <span className="transition-opacity duration-200 opacity-70 hover:opacity-100">Начать учиться</span>
                </Link>
                <Link
                  href="/compiler"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                >
                  <span className="transition-opacity duration-200 opacity-70 hover:opacity-100">Компилятор</span>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3 px-2">
                Темы материала
              </h3>
              <div className="space-y-1">
                <Link
                  href="/learn/java-collections"
                  className={`block px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                    pathname === "/learn/java-collections"
                      ? "bg-[var(--bg-muted)] text-[var(--text-main)] font-medium"
                      : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                  }`}
                >
                  <span className={`inline-block transition-opacity duration-200 ${
                    pathname === "/learn/java-collections" ? "opacity-100" : "opacity-70"
                  }`}>
                    Обзор материала
                  </span>
                </Link>
                <Link
                  href="/learn/java-collections/list"
                  className={`block px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                    pathname === "/learn/java-collections/list"
                      ? "bg-[var(--bg-muted)] text-[var(--text-main)] font-medium"
                      : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                  }`}
                >
                  <span className={`inline-block transition-opacity duration-200 ${
                    pathname === "/learn/java-collections/list" ? "opacity-100" : "opacity-70"
                  }`}>
                    List и его реализации
                  </span>
                </Link>
                <Link
                  href="/learn/java-collections/set"
                  className={`block px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                    pathname === "/learn/java-collections/set"
                      ? "bg-[var(--bg-muted)] text-[var(--text-main)] font-medium"
                      : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                  }`}
                >
                  <span className={`inline-block transition-opacity duration-200 ${
                    pathname === "/learn/java-collections/set" ? "opacity-100" : "opacity-70"
                  }`}>
                    Set и его реализации
                  </span>
                </Link>
                <Link
                  href="/learn/java-collections/map"
                  className={`block px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                    pathname === "/learn/java-collections/map"
                      ? "bg-[var(--bg-muted)] text-[var(--text-main)] font-medium"
                      : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                  }`}
                >
                  <span className={`inline-block transition-opacity duration-200 ${
                    pathname === "/learn/java-collections/map" ? "opacity-100" : "opacity-70"
                  }`}>
                    Map и его реализации
                  </span>
                </Link>
                <Link
                  href="/learn/java-collections/stream"
                  className={`block px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                    pathname === "/learn/java-collections/stream"
                      ? "bg-[var(--bg-muted)] text-[var(--text-main)] font-medium"
                      : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                  }`}
                >
                  <span className={`inline-block transition-opacity duration-200 ${
                    pathname === "/learn/java-collections/stream" ? "opacity-100" : "opacity-70"
                  }`}>
                    Streams API
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <Header leftButton={{ href: "/learn/java-collections", text: "← К Java Collections" }} />
        <MotivationalQuotes />
        <main>
          <section className="mx-auto max-w-6xl px-5 py-14 md:py-20">
            <DetailedLesson
              materialId="learn/java-collections/list"
              title="List и его реализации"
              description="Изучи интерфейс List и его основные реализации: ArrayList и LinkedList. Узнай, когда использовать каждую из них и как эффективно работать со списками."
              sections={[
                {
                  subtitle: "Что такое List",
                  content: [
                    "List — это упорядоченная коллекция элементов, которая позволяет хранить дубликаты и обращаться к элементам по индексу.",
                    "",
                    "Основные характеристики List:",
                    "• Упорядоченность — элементы хранятся в определенном порядке",
                    "• Дубликаты — один и тот же элемент может встречаться несколько раз",
                    "• Индексация — доступ к элементам по позиции (индексу)",
                    "• Динамический размер — список может изменять свой размер",
                    "",
                    "Интерфейс List находится в пакете java.util и является частью Collections Framework.",
                    "",
                    "import java.util.List;",
                    "import java.util.ArrayList;",
                    "import java.util.LinkedList;"
                  ]
                },
                {
                  subtitle: "ArrayList — динамический массив",
                  content: [
                    "ArrayList — это реализация List на основе динамического массива. Это самая популярная реализация List в Java.",
                    "",
                    "Преимущества ArrayList:",
                    "• Быстрый доступ по индексу — O(1)",
                    "• Эффективная итерация",
                    "• Меньше памяти на элемент, чем у LinkedList",
                    "",
                    "Недостатки ArrayList:",
                    "• Медленная вставка/удаление в середину — O(n)",
                    "• При переполнении создается новый массив и копируются все элементы",
                    "",
                    "Создание ArrayList:",
                    "",
                    "// Пустой список",
                    "List<String> names = new ArrayList<>();",
                    "",
                    "// С начальной емкостью (оптимизация)",
                    "List<Integer> numbers = new ArrayList<>(100);",
                    "",
                    "// С начальными элементами",
                    "List<String> fruits = new ArrayList<>(Arrays.asList(\"Яблоко\", \"Банан\", \"Апельсин\"));"
                  ]
                },
                {
                  subtitle: "Основные методы ArrayList",
                  content: [
                    "Добавление элементов:",
                    "",
                    "List<String> list = new ArrayList<>();",
                    "",
                    "// Добавить в конец",
                    "list.add(\"Элемент 1\");",
                    "list.add(\"Элемент 2\");",
                    "",
                    "// Добавить по индексу",
                    "list.add(0, \"Элемент 0\"); // вставка в начало",
                    "",
                    "// Добавить несколько элементов",
                    "list.addAll(Arrays.asList(\"Элемент 3\", \"Элемент 4\"));",
                    "",
                    "Получение элементов:",
                    "",
                    "// Получить по индексу",
                    "String first = list.get(0);",
                    "",
                    "// Получить размер",
                    "int size = list.size();",
                    "",
                    "// Проверить наличие элемента",
                    "boolean contains = list.contains(\"Элемент 1\");",
                    "",
                    "// Найти индекс элемента",
                    "int index = list.indexOf(\"Элемент 2\");",
                    "int lastIndex = list.lastIndexOf(\"Элемент 2\"); // последнее вхождение"
                  ]
                },
                {
                  subtitle: "Удаление и изменение элементов",
                  content: [
                    "Удаление элементов:",
                    "",
                    "List<String> list = new ArrayList<>();",
                    "list.add(\"Яблоко\");",
                    "list.add(\"Банан\");",
                    "list.add(\"Апельсин\");",
                    "",
                    "// Удалить по значению",
                    "list.remove(\"Банан\");",
                    "",
                    "// Удалить по индексу",
                    "list.remove(0); // удалит \"Яблоко\"",
                    "",
                    "// Удалить все элементы",
                    "list.clear();",
                    "",
                    "// Удалить несколько элементов",
                    "list.removeAll(Arrays.asList(\"Яблоко\", \"Банан\"));",
                    "",
                    "Изменение элементов:",
                    "",
                    "// Заменить элемент по индексу",
                    "list.set(0, \"Груша\");",
                    "",
                    "// Полный пример работы:",
                    "",
                    "List<String> fruits = new ArrayList<>();",
                    "fruits.add(\"Яблоко\");",
                    "fruits.add(\"Банан\");",
                    "fruits.add(\"Апельсин\");",
                    "",
                    "System.out.println(fruits); // [Яблоко, Банан, Апельсин]",
                    "",
                    "fruits.set(1, \"Груша\");",
                    "System.out.println(fruits); // [Яблоко, Груша, Апельсин]",
                    "",
                    "fruits.remove(0);",
                    "System.out.println(fruits); // [Груша, Апельсин]"
                  ]
                },
                {
                  subtitle: "LinkedList — двусвязный список",
                  content: [
                    "LinkedList — это реализация List на основе двусвязного списка. Каждый элемент хранит ссылки на предыдущий и следующий элементы.",
                    "",
                    "Преимущества LinkedList:",
                    "• Быстрая вставка/удаление в любом месте — O(1) (если известен узел)",
                    "• Не нужно перераспределять память при добавлении",
                    "• Эффективная работа как со списком, так и со стеком/очередью",
                    "",
                    "Недостатки LinkedList:",
                    "• Медленный доступ по индексу — O(n)",
                    "• Больше памяти на элемент (хранит ссылки)",
                    "• Медленная итерация из-за отсутствия кэширования",
                    "",
                    "Создание LinkedList:",
                    "",
                    "List<String> names = new LinkedList<>();",
                    "",
                    "// LinkedList также реализует интерфейсы Deque и Queue",
                    "LinkedList<String> queue = new LinkedList<>();",
                    "queue.addFirst(\"Первый\");",
                    "queue.addLast(\"Последний\");",
                    "",
                    "String first = queue.removeFirst();",
                    "String last = queue.removeLast();"
                  ]
                },
                {
                  subtitle: "Когда использовать ArrayList, а когда LinkedList",
                  content: [
                    "Используй ArrayList, если:",
                    "• Нужен частый доступ по индексу",
                    "• Часто итерируешься по элементам",
                    "• Добавление/удаление происходит в основном в конце списка",
                    "• Важна экономия памяти",
                    "",
                    "Используй LinkedList, если:",
                    "• Часто вставляешь/удаляешь элементы в середине списка",
                    "• Работаешь со стеком или очередью",
                    "• Не нужен доступ по индексу",
                    "",
                    "⚠️ ВНИМАНИЕ: В большинстве случаев ArrayList предпочтительнее LinkedList. Разница в производительности заметна только при очень больших объемах данных или частых операциях вставки/удаления в середину.",
                    "",
                    "Пример выбора:",
                    "",
                    "// Для хранения списка пользователей (часто читаем, редко изменяем)",
                    "List<User> users = new ArrayList<>();",
                    "",
                    "// Для очереди задач (часто добавляем/удаляем с концов)",
                    "LinkedList<Task> taskQueue = new LinkedList<>();"
                  ]
                },
                {
                  subtitle: "Итерация по List",
                  content: [
                    "Существует несколько способов итерации по списку:",
                    "",
                    "1. Обычный цикл for с индексом:",
                    "",
                    "List<String> fruits = new ArrayList<>();",
                    "fruits.add(\"Яблоко\");",
                    "fruits.add(\"Банан\");",
                    "fruits.add(\"Апельсин\");",
                    "",
                    "for (int i = 0; i < fruits.size(); i++) {",
                    "    System.out.println(fruits.get(i));",
                    "}",
                    "",
                    "2. Улучшенный цикл for (for-each):",
                    "",
                    "for (String fruit : fruits) {",
                    "    System.out.println(fruit);",
                    "}",
                    "",
                    "3. Итератор:",
                    "",
                    "Iterator<String> iterator = fruits.iterator();",
                    "while (iterator.hasNext()) {",
                    "    String fruit = iterator.next();",
                    "    System.out.println(fruit);",
                    "}",
                    "",
                    "4. Stream API (Java 8+):",
                    "",
                    "fruits.forEach(fruit -> System.out.println(fruit));",
                    "",
                    "// Или с методом-ссылкой",
                    "fruits.forEach(System.out::println);"
                  ]
                },
                {
                  subtitle: "Практические примеры",
                  content: [
                    "Пример 1: Фильтрация списка",
                    "",
                    "List<Integer> numbers = new ArrayList<>();",
                    "numbers.add(1);",
                    "numbers.add(2);",
                    "numbers.add(3);",
                    "numbers.add(4);",
                    "numbers.add(5);",
                    "",
                    "// Найти все четные числа",
                    "List<Integer> evenNumbers = new ArrayList<>();",
                    "for (Integer num : numbers) {",
                    "    if (num % 2 == 0) {",
                    "        evenNumbers.add(num);",
                    "    }",
                    "}",
                    "",
                    "System.out.println(evenNumbers); // [2, 4]",
                    "",
                    "Пример 2: Поиск максимального элемента",
                    "",
                    "List<Integer> numbers = new ArrayList<>(Arrays.asList(5, 2, 8, 1, 9));",
                    "",
                    "int max = numbers.get(0);",
                    "for (int i = 1; i < numbers.size(); i++) {",
                    "    if (numbers.get(i) > max) {",
                    "        max = numbers.get(i);",
                    "    }",
                    "}",
                    "",
                    "System.out.println(\"Максимум: \" + max); // Максимум: 9",
                    "",
                    "Пример 3: Реверс списка",
                    "",
                    "List<String> list = new ArrayList<>(Arrays.asList(\"A\", \"B\", \"C\"));",
                    "",
                    "// Способ 1: вручную",
                    "List<String> reversed = new ArrayList<>();",
                    "for (int i = list.size() - 1; i >= 0; i--) {",
                    "    reversed.add(list.get(i));",
                    "}",
                    "",
                    "// Способ 2: используя Collections",
                    "Collections.reverse(list);",
                    "",
                    "System.out.println(list); // [C, B, A]"
                  ]
                },
                {
                  subtitle: "Полезные методы Collections для работы со списками",
                  content: [
                    "Класс Collections предоставляет множество статических методов для работы с коллекциями:",
                    "",
                    "import java.util.Collections;",
                    "",
                    "List<Integer> numbers = new ArrayList<>(Arrays.asList(3, 1, 4, 1, 5, 9, 2, 6));",
                    "",
                    "// Сортировка",
                    "Collections.sort(numbers);",
                    "System.out.println(numbers); // [1, 1, 2, 3, 4, 5, 6, 9]",
                    "",
                    "// Реверс",
                    "Collections.reverse(numbers);",
                    "System.out.println(numbers); // [9, 6, 5, 4, 3, 2, 1, 1]",
                    "",
                    "// Перемешивание",
                    "Collections.shuffle(numbers);",
                    "",
                    "// Поиск максимума и минимума",
                    "int max = Collections.max(numbers);",
                    "int min = Collections.min(numbers);",
                    "",
                    "// Заполнение списка одним значением",
                    "List<String> list = new ArrayList<>(Collections.nCopies(5, \"Hello\"));",
                    "System.out.println(list); // [Hello, Hello, Hello, Hello, Hello]",
                    "",
                    "// Замена всех элементов",
                    "Collections.fill(list, \"World\");",
                    "System.out.println(list); // [World, World, World, World, World]"
                  ]
                }
              ]}
            />
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[var(--border-main)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-xs text-[var(--text-muted)] md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Java с нуля до Middle</p>
        <div className="flex gap-4">
          <Link className="hover:text-[var(--text-main)]" href="/learn/java-collections">
            К Collections
          </Link>
          <Link className="hover:text-[var(--text-main)]" href="/">
            На главную
          </Link>
        </div>
      </div>
    </footer>
  );
}

function DetailedLesson({ 
  materialId,
  title, 
  description, 
  sections 
}: { 
  materialId?: string;
  title: string; 
  description: string; 
  sections: Array<{ subtitle: string; content: string[] }> 
}) {
  const { user } = useAuth();
  const [isDark, setIsDark] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  const checkCompletionStatus = useCallback(async () => {
    if (!user || !materialId) {
      setCheckingStatus(false);
      return;
    }

    try {
      const encodedMaterialId = encodeURIComponent(materialId);
      const response = await fetch(`/api/statistics/materials/status?materialId=${encodedMaterialId}`, {
        credentials: "include",
      });

      if (response.ok) {
        const isCompleted = await response.json();
        setCompleted(isCompleted);
      }
    } catch (err) {
      console.error("Ошибка проверки статуса:", err);
    } finally {
      setCheckingStatus(false);
    }
  }, [user, materialId]);

  useEffect(() => {
    checkCompletionStatus();
  }, [checkCompletionStatus]);

  // Перепроверяем статус при возврате на страницу (например, после отката материала)
  useEffect(() => {
    const handleFocus = () => {
      if (user && materialId) {
        checkCompletionStatus();
      }
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [user, materialId, checkCompletionStatus]);

  const handleComplete = async () => {
    if (!user || !materialId) {
      alert("Для завершения материала необходимо войти в систему");
      return;
    }

    setLoading(true);
    try {
      const encodedMaterialId = encodeURIComponent(materialId);
      const response = await fetch(`/api/statistics/materials/complete?materialId=${encodedMaterialId}`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setCompleted(true);
      } else {
        const errorText = await response.text();
        console.error("Ошибка сохранения прогресса:", errorText);
        alert(errorText || "Ошибка при сохранении прогресса");
      }
    } catch (err) {
      console.error("Ошибка:", err);
      alert("Ошибка при сохранении прогресса");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    
    return () => observer.disconnect();
  }, []);

  const isCodeLine = (line: string): boolean => {
    const trimmed = line.trim();
    
    if (trimmed === "") return false;
    
    // Строки с отступом (4+ пробела)
    if (line.match(/^\s{4,}/)) return true;
    
    // Комментарии
    if (trimmed.startsWith("//")) return true;
    
    // Фигурные скобки
    if (trimmed === "}" || trimmed === "{" || trimmed.startsWith("}") || trimmed.startsWith("{")) {
      return true;
    }
    
    // Ключевые слова Java
    const javaKeywords = ["public", "private", "protected", "static", "final", "class", "interface", 
                          "enum", "abstract", "extends", "implements", "import", "package", "return",
                          "if", "else", "for", "while", "do", "switch", "case", "break", "continue",
                          "try", "catch", "finally", "throw", "throws", "new", "this", "super", "void"];
    if (javaKeywords.some(keyword => trimmed.startsWith(keyword + " ") || trimmed.startsWith(keyword + "<") || trimmed === keyword)) {
      return true;
    }
    
    // Типы данных и классы
    const javaTypePattern = /^(int|String|double|boolean|char|byte|short|long|float|List|ArrayList|LinkedList|Iterator|Collections|Arrays|Integer|User|Task)\s*[<\(=]/;
    if (javaTypePattern.test(trimmed)) return true;
    
    // Объявления переменных с типами
    if (/^(List|ArrayList|LinkedList|Iterator|Collections|Arrays|Integer|String|int|double|boolean|char|byte|short|long|float)\s*<.*>\s*\w+\s*=/.test(trimmed)) {
      return true;
    }
    
    // System.out
    if (line.includes("System.out")) return true;
    
    // Вызовы методов
    if (/^[a-zA-Z_][a-zA-Z0-9_]*\s*\(/.test(trimmed) || /^[a-zA-Z_][a-zA-Z0-9_]*\.[a-zA-Z_][a-zA-Z0-9_]*\s*\(/.test(trimmed)) {
      return true;
    }
    
    // Присваивания с типами
    if (line.includes("=") && (line.includes("int ") || line.includes("String ") || line.includes("double ") || 
        line.includes("boolean ") || line.includes("char ") || line.includes("List<") || line.includes("ArrayList<") || 
        line.includes("LinkedList<") || line.includes("Iterator<") || line.includes("Collections.") || line.includes("Arrays."))) {
      return true;
    }
    
    // Лямбда-выражения и операторы
    if (line.includes("->") || line.includes("++") || line.includes("--") || trimmed.startsWith("@")) {
      return true;
    }
    
    // Строки с точкой с запятой в конце (обычно код)
    if (trimmed.endsWith(";") && !trimmed.startsWith("•")) {
      return true;
    }
    
    // Строки с угловыми скобками (generics)
    if (line.includes("<") && line.includes(">")) {
      return true;
    }
    
    // Строки с квадратными скобками (массивы, индексы)
    if (line.includes("[") && line.includes("]") && !line.startsWith("•")) {
      return true;
    }
    
    // Вызовы методов через точку
    if (/\.\w+\s*\(/.test(line) || /\.\w+\s*\[/.test(line)) {
      return true;
    }
    
    return false;
  };

  const isCommandLine = (line: string): boolean => {
    return line.startsWith("java ") || line.startsWith("javac ") || line.startsWith("brew ") || 
           line.startsWith("sudo ") || line.startsWith("cd ");
  };

  return (
    <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)] p-6 shadow-sm">
      <h3 className="text-lg font-semibold tracking-tight text-[var(--text-main)] mb-2">
        {title}
      </h3>
      <p className="text-sm text-[var(--text-muted)] mb-6">
        {description}
      </p>
      
      {/* Информационное сообщение о завершении материала */}
      {!completed && (
        <div className="mb-6 p-4 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <span className="font-semibold">Важно:</span> После изучения материала нажмите кнопку <span className="font-semibold">"Завершить материал"</span> внизу страницы, чтобы статистика по пройденному материалу отображалась в вашем личном кабинете.
            </p>
          </div>
        </div>
      )}
      
      <div className="space-y-6">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-3">
            <h4 className="text-sm font-semibold text-[var(--text-main)]">
              {section.subtitle}
            </h4>
            <div className="rounded-xl border border-[var(--border-main)] bg-[var(--bg-secondary)] p-4">
              <div className="space-y-2.5 text-sm text-[var(--text-muted)] leading-relaxed">
                {(() => {
                  const elements: React.ReactElement[] = [];
                  let currentParagraph: string[] = [];
                  let currentCodeBlock: string[] = [];
                  let keyIndex = 0;

                  const flushParagraph = () => {
                    if (currentParagraph.length > 0) {
                      elements.push(
                        <p key={keyIndex++}>
                          {currentParagraph.join(" ")}
                        </p>
                      );
                      currentParagraph = [];
                    }
                  };

                  const flushCodeBlock = () => {
                    if (currentCodeBlock.length > 0) {
                      const code = currentCodeBlock.join("\n");
                      // Определяем язык: если есть Java-специфичные конструкции, то Java, иначе bash
                      const isJava = code.includes("public class") || 
                                    code.includes("System.out") || 
                                    code.includes("List<") || 
                                    code.includes("ArrayList<") || 
                                    code.includes("LinkedList<") ||
                                    code.includes("import java") ||
                                    code.includes("Collections.") ||
                                    code.includes("Arrays.") ||
                                    code.includes("Iterator<") ||
                                    code.includes("for (") ||
                                    code.includes("while (") ||
                                    code.includes("if (") ||
                                    code.includes("new ") ||
                                    code.includes("int ") ||
                                    code.includes("String ") ||
                                    code.includes("boolean ") ||
                                    code.includes("void ") ||
                                    code.includes("return ") ||
                                    code.includes("public ") ||
                                    code.includes("private ") ||
                                    code.includes("static ");
                      const language = isJava ? "java" : "bash";
                      elements.push(
                        <div key={keyIndex++} className="rounded-lg border border-[var(--border-main)] bg-[var(--bg-card)] p-3 overflow-x-auto my-2">
                          <SyntaxHighlighter
                            language={language}
                            style={isDark ? intellijDark : intellijLight}
                            customStyle={{
                              margin: 0,
                              padding: 0,
                              background: 'transparent',
                              fontSize: '12px',
                              lineHeight: '1.6',
                              fontFamily: 'inherit',
                            }}
                            codeTagProps={{
                              style: {
                                fontFamily: 'inherit',
                              },
                            }}
                          >
                            {code}
                          </SyntaxHighlighter>
                        </div>
                      );
                      currentCodeBlock = [];
                    }
                  };

                  section.content.forEach((line, lineIndex) => {
                    const trimmedLine = line.trim();
                    const nextLine = lineIndex < section.content.length - 1 ? section.content[lineIndex + 1] : "";
                    const nextLineTrimmed = nextLine.trim();
                    
                    if (trimmedLine === "") {
                      if (currentCodeBlock.length > 0) {
                        currentCodeBlock.push("");
                        return;
                      }
                      if (isCodeLine(nextLine) || isCommandLine(nextLine)) {
                        flushParagraph();
                        return;
                      }
                      flushParagraph();
                      flushCodeBlock();
                      elements.push(<div key={keyIndex++} className="h-2" />);
                      return;
                    }
                    
                    if (line.trim() === "" && line.length > 0 && currentCodeBlock.length > 0) {
                      currentCodeBlock.push("");
                      return;
                    }

                    if (isCommandLine(line)) {
                      flushParagraph();
                      if (currentCodeBlock.length > 0) {
                        currentCodeBlock.push(line);
                      } else {
                        flushCodeBlock();
                        currentCodeBlock.push(line);
                      }
                      return;
                    }

                    if (isCodeLine(line)) {
                      flushParagraph();
                      if (currentCodeBlock.length > 0) {
                        currentCodeBlock.push(line);
                      } else {
                        flushCodeBlock();
                        currentCodeBlock.push(line);
                      }
                      return;
                    }

                    if (currentCodeBlock.length > 0) {
                      flushCodeBlock();
                    }

                    if (line.endsWith(":") && !line.includes("•") && line.length < 50) {
                      flushParagraph();
                      elements.push(
                        <p key={keyIndex++} className="font-semibold text-[var(--text-main)] mt-3 first:mt-0">
                          {line}
                        </p>
                      );
                      return;
                    }

                    if (line.startsWith("•")) {
                      flushParagraph();
                      elements.push(
                        <div key={keyIndex++} className="flex items-start gap-2 ml-2">
                          <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--button-bg)] mt-1.5" />
                          <span>{line.replace(/^•\s*/, "")}</span>
                        </div>
                      );
                      return;
                    }

                    if (line.includes("⚠️") || line.includes("ВНИМАНИЕ")) {
                      flushParagraph();
                      elements.push(
                        <p key={keyIndex++} className="text-xs font-medium text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg px-3 py-2">
                          {line}
                        </p>
                      );
                      return;
                    }

                    currentParagraph.push(trimmedLine);
                  });

                  flushParagraph();
                  flushCodeBlock();
                  return elements;
                })()}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {materialId && (
        <div className="mt-6 pt-6 border-t border-[var(--border-main)]">
          {completed ? (
            <div className="flex items-center gap-2 text-sm text-green-500">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Материал завершен</span>
            </div>
          ) : (
            <button
              onClick={handleComplete}
              disabled={loading || !user}
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-[var(--button-bg)] px-6 py-2.5 text-sm font-semibold text-[var(--button-text)] hover:bg-[var(--button-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Сохранение..." : "Завершить материал"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}


