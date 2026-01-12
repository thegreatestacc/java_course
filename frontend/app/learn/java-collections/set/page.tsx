"use client";

// app/learn/java-collections/set/page.tsx
// Страница с обучающим материалом по Set и его реализациям

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

export default function JavaCollectionsSetPage() {
  const pathname = usePathname();

  return (
    <div className={mono.className}>
      <div className="min-h-dvh bg-[var(--bg-main)] text-[var(--text-main)]">
        <nav className="fixed left-0 top-[20vh] w-56 h-[calc(100vh-20vh)] overflow-y-auto pl-8 pr-4 py-6 z-10">
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
              materialId="learn/java-collections/set"
              title="Set и его реализации"
              description="Изучи интерфейс Set и его реализации: HashSet, LinkedHashSet и TreeSet. Узнай, как работать с уникальными наборами данных и выбирать правильную реализацию."
              sections={[
                {
                  subtitle: "Что такое Set",
                  content: [
                    "Set — это коллекция, которая не содержит дубликатов элементов. Каждый элемент может присутствовать в Set только один раз.",
                    "",
                    "Основные характеристики Set:",
                    "• Уникальность — дубликаты не допускаются",
                    "• Нет индексации — нельзя получить элемент по индексу",
                    "• Динамический размер — может изменять свой размер",
                    "• Порядок элементов зависит от реализации",
                    "",
                    "Интерфейс Set находится в пакете java.util и наследуется от Collection.",
                    "",
                    "import java.util.Set;",
                    "import java.util.HashSet;",
                    "import java.util.LinkedHashSet;",
                    "import java.util.TreeSet;"
                  ]
                },
                {
                  subtitle: "HashSet — хеш-таблица",
                  content: [
                    "HashSet — это реализация Set на основе хеш-таблицы. Это самая популярная реализация Set.",
                    "",
                    "Особенности HashSet:",
                    "• Порядок элементов не гарантирован (может изменяться)",
                    "• Очень быстрые операции добавления, удаления и поиска — O(1) в среднем",
                    "• Позволяет хранить null (только один раз)",
                    "• Использует hashCode() и equals() для определения уникальности",
                    "",
                    "Создание HashSet:",
                    "",
                    "// Пустое множество",
                    "Set<String> names = new HashSet<>();",
                    "",
                    "// С начальной емкостью",
                    "Set<Integer> numbers = new HashSet<>(16);",
                    "",
                    "// С начальными элементами",
                    "Set<String> fruits = new HashSet<>(Arrays.asList(\"Яблоко\", \"Банан\", \"Апельсин\"));",
                    "",
                    "Пример работы:",
                    "",
                    "Set<String> set = new HashSet<>();",
                    "set.add(\"Яблоко\");",
                    "set.add(\"Банан\");",
                    "set.add(\"Яблоко\"); // дубликат не добавится",
                    "",
                    "System.out.println(set); // [Банан, Яблоко] или [Яблоко, Банан]",
                    "System.out.println(set.size()); // 2"
                  ]
                },
                {
                  subtitle: "Основные методы Set",
                  content: [
                    "Добавление элементов:",
                    "",
                    "Set<String> set = new HashSet<>();",
                    "",
                    "// Добавить элемент (возвращает true, если элемент был добавлен)",
                    "boolean added = set.add(\"Элемент 1\");",
                    "set.add(\"Элемент 2\");",
                    "",
                    "// Попытка добавить дубликат",
                    "boolean duplicate = set.add(\"Элемент 1\"); // вернет false",
                    "",
                    "// Добавить несколько элементов",
                    "set.addAll(Arrays.asList(\"Элемент 3\", \"Элемент 4\", \"Элемент 1\"));",
                    "",
                    "Проверка и получение информации:",
                    "",
                    "// Проверить наличие элемента",
                    "boolean contains = set.contains(\"Элемент 1\");",
                    "",
                    "// Получить размер",
                    "int size = set.size();",
                    "",
                    "// Проверить, пуст ли Set",
                    "boolean isEmpty = set.isEmpty();",
                    "",
                    "Удаление элементов:",
                    "",
                    "// Удалить элемент",
                    "boolean removed = set.remove(\"Элемент 1\");",
                    "",
                    "// Удалить все элементы",
                    "set.clear();",
                    "",
                    "// Удалить несколько элементов",
                    "set.removeAll(Arrays.asList(\"Элемент 2\", \"Элемент 3\"));"
                  ]
                },
                {
                  subtitle: "LinkedHashSet — HashSet с сохранением порядка",
                  content: [
                    "LinkedHashSet — это реализация Set, которая сохраняет порядок вставки элементов. Наследуется от HashSet.",
                    "",
                    "Особенности LinkedHashSet:",
                    "• Сохраняет порядок вставки элементов",
                    "• Производительность немного ниже, чем у HashSet (из-за поддержки порядка)",
                    "• Использует двусвязный список для сохранения порядка",
                    "• Операции добавления, удаления и поиска — O(1) в среднем",
                    "",
                    "Когда использовать LinkedHashSet:",
                    "• Нужен Set с сохранением порядка вставки",
                    "• Нужна уникальность элементов",
                    "• Порядок важен, но не нужна сортировка",
                    "",
                    "Пример:",
                    "",
                    "Set<String> linkedSet = new LinkedHashSet<>();",
                    "linkedSet.add(\"Третий\");",
                    "linkedSet.add(\"Первый\");",
                    "linkedSet.add(\"Второй\");",
                    "linkedSet.add(\"Первый\"); // дубликат",
                    "",
                    "System.out.println(linkedSet);",
                    "// [Третий, Первый, Второй] - порядок вставки сохранен"
                  ]
                },
                {
                  subtitle: "TreeSet — отсортированный Set",
                  content: [
                    "TreeSet — это реализация Set, которая хранит элементы в отсортированном порядке. Основана на красно-черном дереве.",
                    "",
                    "Особенности TreeSet:",
                    "• Элементы всегда отсортированы",
                    "• Не позволяет хранить null",
                    "• Операции добавления, удаления и поиска — O(log n)",
                    "• Элементы должны быть Comparable или нужен Comparator",
                    "",
                    "Создание TreeSet:",
                    "",
                    "// С естественной сортировкой (элементы должны быть Comparable)",
                    "Set<Integer> numbers = new TreeSet<>();",
                    "numbers.add(5);",
                    "numbers.add(2);",
                    "numbers.add(8);",
                    "numbers.add(1);",
                    "",
                    "System.out.println(numbers); // [1, 2, 5, 8] - отсортировано",
                    "",
                    "// С кастомным Comparator",
                    "Set<String> reverseSet = new TreeSet<>(Collections.reverseOrder());",
                    "reverseSet.add(\"Яблоко\");",
                    "reverseSet.add(\"Банан\");",
                    "reverseSet.add(\"Апельсин\");",
                    "",
                    "System.out.println(reverseSet); // [Яблоко, Банан, Апельсин] - обратный порядок",
                    "",
                    "Дополнительные методы TreeSet:",
                    "",
                    "TreeSet<Integer> set = new TreeSet<>(Arrays.asList(1, 3, 5, 7, 9));",
                    "",
                    "// Первый элемент",
                    "Integer first = set.first(); // 1",
                    "",
                    "// Последний элемент",
                    "Integer last = set.last(); // 9",
                    "",
                    "// Элементы меньше указанного",
                    "SortedSet<Integer> head = set.headSet(5); // [1, 3]",
                    "",
                    "// Элементы больше или равные указанному",
                    "SortedSet<Integer> tail = set.tailSet(5); // [5, 7, 9]",
                    "",
                    "// Подмножество в диапазоне",
                    "SortedSet<Integer> sub = set.subSet(3, 7); // [3, 5]"
                  ]
                },
                {
                  subtitle: "Сравнение реализаций Set",
                  content: [
                    "HashSet:",
                    "• Используй, когда порядок не важен",
                    "• Самая быстрая реализация",
                    "• Порядок элементов не гарантирован",
                    "",
                    "LinkedHashSet:",
                    "• Используй, когда нужен порядок вставки",
                    "• Немного медленнее HashSet",
                    "• Сохраняет порядок вставки",
                    "",
                    "TreeSet:",
                    "• Используй, когда нужна сортировка",
                    "• Медленнее HashSet и LinkedHashSet",
                    "• Элементы всегда отсортированы",
                    "",
                    "Пример выбора:",
                    "",
                    "// Для хранения уникальных ID пользователей (порядок не важен)",
                    "Set<Long> userIds = new HashSet<>();",
                    "",
                    "// Для хранения истории посещений (нужен порядок)",
                    "Set<String> visitedPages = new LinkedHashSet<>();",
                    "",
                    "// Для хранения отсортированных оценок",
                    "Set<Integer> scores = new TreeSet<>();"
                  ]
                },
                {
                  subtitle: "Работа с объектами в Set",
                  content: [
                    "⚠️ ВНИМАНИЕ: Для корректной работы Set с пользовательскими объектами необходимо правильно реализовать методы equals() и hashCode().",
                    "",
                    "Проблема без правильной реализации:",
                    "",
                    "class Person {",
                    "    String name;",
                    "    int age;",
                    "    ",
                    "    Person(String name, int age) {",
                    "        this.name = name;",
                    "        this.age = age;",
                    "    }",
                    "}",
                    "",
                    "Set<Person> people = new HashSet<>();",
                    "people.add(new Person(\"Иван\", 25));",
                    "people.add(new Person(\"Иван\", 25)); // добавится как отдельный элемент!",
                    "",
                    "System.out.println(people.size()); // 2 (неправильно!)",
                    "",
                    "Правильная реализация:",
                    "",
                    "class Person {",
                    "    String name;",
                    "    int age;",
                    "    ",
                    "    Person(String name, int age) {",
                    "        this.name = name;",
                    "        this.age = age;",
                    "    }",
                    "    ",
                    "    @Override",
                    "    public boolean equals(Object o) {",
                    "        if (this == o) return true;",
                    "        if (o == null || getClass() != o.getClass()) return false;",
                    "        Person person = (Person) o;",
                    "        return age == person.age && Objects.equals(name, person.name);",
                    "    }",
                    "    ",
                    "    @Override",
                    "    public int hashCode() {",
                    "        return Objects.hash(name, age);",
                    "    }",
                    "}",
                    "",
                    "Теперь Set будет работать правильно:",
                    "",
                    "Set<Person> people = new HashSet<>();",
                    "people.add(new Person(\"Иван\", 25));",
                    "people.add(new Person(\"Иван\", 25)); // не добавится",
                    "",
                    "System.out.println(people.size()); // 1 (правильно!)"
                  ]
                },
                {
                  subtitle: "Операции над множествами",
                  content: [
                    "Set поддерживает математические операции над множествами:",
                    "",
                    "Объединение (union):",
                    "",
                    "Set<Integer> set1 = new HashSet<>(Arrays.asList(1, 2, 3));",
                    "Set<Integer> set2 = new HashSet<>(Arrays.asList(3, 4, 5));",
                    "",
                    "Set<Integer> union = new HashSet<>(set1);",
                    "union.addAll(set2);",
                    "",
                    "System.out.println(union); // [1, 2, 3, 4, 5]",
                    "",
                    "Пересечение (intersection):",
                    "",
                    "Set<Integer> intersection = new HashSet<>(set1);",
                    "intersection.retainAll(set2);",
                    "",
                    "System.out.println(intersection); // [3]",
                    "",
                    "Разность (difference):",
                    "",
                    "Set<Integer> difference = new HashSet<>(set1);",
                    "difference.removeAll(set2);",
                    "",
                    "System.out.println(difference); // [1, 2]",
                    "",
                    "Симметрическая разность (элементы, которые есть только в одном множестве):",
                    "",
                    "Set<Integer> symmetricDiff = new HashSet<>(set1);",
                    "symmetricDiff.addAll(set2);",
                    "Set<Integer> intersection2 = new HashSet<>(set1);",
                    "intersection2.retainAll(set2);",
                    "symmetricDiff.removeAll(intersection2);",
                    "",
                    "System.out.println(symmetricDiff); // [1, 2, 4, 5]",
                    "",
                    "Проверка подмножества:",
                    "",
                    "Set<Integer> subset = new HashSet<>(Arrays.asList(1, 2));",
                    "boolean isSubset = set1.containsAll(subset);",
                    "",
                    "System.out.println(isSubset); // true"
                  ]
                },
                {
                  subtitle: "Итерация по Set",
                  content: [
                    "Итерация по Set:",
                    "",
                    "Set<String> fruits = new HashSet<>(Arrays.asList(\"Яблоко\", \"Банан\", \"Апельсин\"));",
                    "",
                    "1. Улучшенный цикл for:",
                    "",
                    "for (String fruit : fruits) {",
                    "    System.out.println(fruit);",
                    "}",
                    "",
                    "2. Итератор:",
                    "",
                    "Iterator<String> iterator = fruits.iterator();",
                    "while (iterator.hasNext()) {",
                    "    String fruit = iterator.next();",
                    "    System.out.println(fruit);",
                    "}",
                    "",
                    "3. Stream API (Java 8+):",
                    "",
                    "fruits.forEach(fruit -> System.out.println(fruit));",
                    "",
                    "// Или с методом-ссылкой",
                    "fruits.forEach(System.out::println);",
                    "",
                    "⚠️ ВНИМАНИЕ: Нельзя изменять Set во время итерации через for-each или итератор (кроме метода remove() итератора). Это приведет к ConcurrentModificationException."
                  ]
                },
                {
                  subtitle: "Практические примеры",
                  content: [
                    "Пример 1: Удаление дубликатов из списка",
                    "",
                    "List<String> listWithDuplicates = Arrays.asList(\"A\", \"B\", \"A\", \"C\", \"B\");",
                    "",
                    "Set<String> uniqueSet = new HashSet<>(listWithDuplicates);",
                    "List<String> listWithoutDuplicates = new ArrayList<>(uniqueSet);",
                    "",
                    "System.out.println(listWithoutDuplicates); // [A, B, C]",
                    "",
                    "Пример 2: Проверка уникальности элементов",
                    "",
                    "List<String> names = Arrays.asList(\"Иван\", \"Мария\", \"Иван\", \"Петр\");",
                    "",
                    "Set<String> nameSet = new HashSet<>(names);",
                    "boolean hasDuplicates = names.size() != nameSet.size();",
                    "",
                    "System.out.println(\"Есть дубликаты: \" + hasDuplicates); // true",
                    "",
                    "Пример 3: Нахождение общих элементов",
                    "",
                    "Set<String> set1 = new HashSet<>(Arrays.asList(\"яблоко\", \"банан\", \"апельсин\"));",
                    "Set<String> set2 = new HashSet<>(Arrays.asList(\"банан\", \"виноград\", \"яблоко\"));",
                    "",
                    "Set<String> common = new HashSet<>(set1);",
                    "common.retainAll(set2);",
                    "",
                    "System.out.println(\"Общие элементы: \" + common); // [банан, яблоко]"
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
                          "try", "catch", "finally", "throw", "throws", "new", "this", "super", "void", "boolean"];
    if (javaKeywords.some(keyword => trimmed.startsWith(keyword + " ") || trimmed.startsWith(keyword + "<") || trimmed === keyword)) {
      return true;
    }
    
    // Типы данных и классы
    const javaTypePattern = /^(int|String|double|boolean|char|byte|short|long|float|Set|HashSet|LinkedHashSet|TreeSet|SortedSet|Iterator|Collections|Arrays|Objects|List|ArrayList|Integer)\s*[<\(=]/;
    if (javaTypePattern.test(trimmed)) return true;
    
    // Объявления переменных с типами
    if (/^(Set|HashSet|LinkedHashSet|TreeSet|SortedSet|Iterator|Collections|Arrays|Objects|List|ArrayList|Integer|String|int|double|boolean|char|byte|short|long|float)\s*<.*>\s*\w+\s*=/.test(trimmed)) {
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
        line.includes("boolean ") || line.includes("char ") || line.includes("Set<") || line.includes("HashSet<") || 
        line.includes("LinkedHashSet<") || line.includes("TreeSet<") || line.includes("SortedSet<") ||
        line.includes("Iterator<") || line.includes("Collections.") || line.includes("Arrays."))) {
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
                                    code.includes("Set<") || 
                                    code.includes("HashSet<") || 
                                    code.includes("LinkedHashSet<") || 
                                    code.includes("TreeSet<") ||
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


