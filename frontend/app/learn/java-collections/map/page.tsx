"use client";

// app/learn/java-collections/map/page.tsx
// Страница с обучающим материалом по Map и его реализациям

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

export default function JavaCollectionsMapPage() {
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
              </div>
            </div>
          </div>
        </nav>

        <Header leftButton={{ href: "/learn/java-collections", text: "← Назад к Collections" }} />
        <MotivationalQuotes />
        <main>
          <section className="mx-auto max-w-6xl px-5 py-14 md:py-20">
            <DetailedLesson
              materialId="learn/java-collections/map"
              title="Map и его реализации"
              description="Изучи интерфейс Map и его реализации: HashMap, LinkedHashMap и TreeMap. Узнай, как эффективно работать с парами ключ-значение и выбирать правильную реализацию."
              sections={[
                {
                  subtitle: "Что такое Map",
                  content: [
                    "Map — это коллекция, которая хранит пары ключ-значение (key-value). Каждый ключ уникален и связан с одним значением.",
                    "",
                    "Основные характеристики Map:",
                    "• Уникальность ключей — каждый ключ может присутствовать только один раз",
                    "• Связь ключ-значение — каждому ключу соответствует одно значение",
                    "• Значения могут дублироваться",
                    "• Порядок элементов зависит от реализации",
                    "",
                    "Интерфейс Map находится в пакете java.util и не наследуется от Collection.",
                    "",
                    "import java.util.Map;",
                    "import java.util.HashMap;",
                    "import java.util.LinkedHashMap;",
                    "import java.util.TreeMap;"
                  ]
                },
                {
                  subtitle: "HashMap — хеш-таблица",
                  content: [
                    "HashMap — это реализация Map на основе хеш-таблицы. Это самая популярная реализация Map.",
                    "",
                    "Особенности HashMap:",
                    "• Порядок элементов не гарантирован (может изменяться)",
                    "• Очень быстрые операции добавления, удаления и поиска — O(1) в среднем",
                    "• Позволяет хранить один null-ключ и множество null-значений",
                    "• Использует hashCode() и equals() для ключей",
                    "",
                    "Создание HashMap:",
                    "",
                    "// Пустая карта",
                    "Map<String, Integer> ages = new HashMap<>();",
                    "",
                    "// С начальной емкостью",
                    "Map<String, String> names = new HashMap<>(16);",
                    "",
                    "// С начальной емкостью и коэффициентом загрузки",
                    "Map<Integer, String> map = new HashMap<>(16, 0.75f);",
                    "",
                    "Пример работы:",
                    "",
                    "Map<String, Integer> ages = new HashMap<>();",
                    "ages.put(\"Иван\", 25);",
                    "ages.put(\"Мария\", 30);",
                    "ages.put(\"Петр\", 28);",
                    "",
                    "System.out.println(ages); // {Иван=25, Мария=30, Петр=28}",
                    "System.out.println(ages.get(\"Иван\")); // 25"
                  ]
                },
                {
                  subtitle: "Основные методы Map",
                  content: [
                    "Добавление и изменение элементов:",
                    "",
                    "Map<String, Integer> map = new HashMap<>();",
                    "",
                    "// Добавить пару ключ-значение",
                    "map.put(\"ключ\", 100);",
                    "",
                    "// Если ключ уже существует, значение перезапишется",
                    "map.put(\"ключ\", 200); // старое значение 100 заменится на 200",
                    "",
                    "// Добавить только если ключа нет",
                    "map.putIfAbsent(\"ключ\", 300); // не добавится, т.к. ключ уже есть",
                    "",
                    "// Добавить все элементы из другой Map",
                    "Map<String, Integer> otherMap = new HashMap<>();",
                    "otherMap.put(\"другой\", 50);",
                    "map.putAll(otherMap);",
                    "",
                    "Получение элементов:",
                    "",
                    "// Получить значение по ключу",
                    "Integer value = map.get(\"ключ\");",
                    "",
                    "// Получить значение или значение по умолчанию, если ключа нет",
                    "Integer valueOrDefault = map.getOrDefault(\"ключ\", 0);",
                    "",
                    "// Проверить наличие ключа",
                    "boolean hasKey = map.containsKey(\"ключ\");",
                    "",
                    "// Проверить наличие значения",
                    "boolean hasValue = map.containsValue(100);",
                    "",
                    "// Получить размер",
                    "int size = map.size();",
                    "",
                    "// Проверить, пуста ли Map",
                    "boolean isEmpty = map.isEmpty();"
                  ]
                },
                {
                  subtitle: "Удаление элементов",
                  content: [
                    "Удаление элементов из Map:",
                    "",
                    "Map<String, Integer> map = new HashMap<>();",
                    "map.put(\"Иван\", 25);",
                    "map.put(\"Мария\", 30);",
                    "map.put(\"Петр\", 28);",
                    "",
                    "// Удалить по ключу",
                    "Integer removed = map.remove(\"Иван\"); // вернет 25",
                    "",
                    "// Удалить по ключу и значению (удалит только если совпадают)",
                    "boolean removed2 = map.remove(\"Мария\", 30); // вернет true",
                    "boolean removed3 = map.remove(\"Петр\", 50); // вернет false (значение не совпадает)",
                    "",
                    "// Удалить все элементы",
                    "map.clear();",
                    "",
                    "// Удалить все элементы, соответствующие условию",
                    "map.entrySet().removeIf(entry -> entry.getValue() < 30);"
                  ]
                },
                {
                  subtitle: "LinkedHashMap — HashMap с сохранением порядка",
                  content: [
                    "LinkedHashMap — это реализация Map, которая сохраняет порядок вставки элементов. Наследуется от HashMap.",
                    "",
                    "Особенности LinkedHashMap:",
                    "• Сохраняет порядок вставки элементов",
                    "• Производительность немного ниже, чем у HashMap (из-за поддержки порядка)",
                    "• Использует двусвязный список для сохранения порядка",
                    "• Операции добавления, удаления и поиска — O(1) в среднем",
                    "",
                    "Когда использовать LinkedHashMap:",
                    "• Нужна Map с сохранением порядка вставки",
                    "• Нужна производительность HashMap",
                    "• Порядок важен, но не нужна сортировка",
                    "",
                    "Пример:",
                    "",
                    "Map<String, Integer> linkedMap = new LinkedHashMap<>();",
                    "linkedMap.put(\"Третий\", 3);",
                    "linkedMap.put(\"Первый\", 1);",
                    "linkedMap.put(\"Второй\", 2);",
                    "",
                    "System.out.println(linkedMap);",
                    "// {Третий=3, Первый=1, Второй=2} - порядок вставки сохранен"
                  ]
                },
                {
                  subtitle: "TreeMap — отсортированная Map",
                  content: [
                    "TreeMap — это реализация Map, которая хранит элементы в отсортированном порядке по ключам. Основана на красно-черном дереве.",
                    "",
                    "Особенности TreeMap:",
                    "• Элементы всегда отсортированы по ключам",
                    "• Не позволяет хранить null-ключи",
                    "• Операции добавления, удаления и поиска — O(log n)",
                    "• Ключи должны быть Comparable или нужен Comparator",
                    "",
                    "Создание TreeMap:",
                    "",
                    "// С естественной сортировкой (ключи должны быть Comparable)",
                    "Map<Integer, String> sortedMap = new TreeMap<>();",
                    "sortedMap.put(5, \"Пять\");",
                    "sortedMap.put(2, \"Два\");",
                    "sortedMap.put(8, \"Восемь\");",
                    "sortedMap.put(1, \"Один\");",
                    "",
                    "System.out.println(sortedMap);",
                    "// {1=Один, 2=Два, 5=Пять, 8=Восемь} - отсортировано по ключам",
                    "",
                    "// С кастомным Comparator",
                    "Map<String, Integer> reverseMap = new TreeMap<>(Collections.reverseOrder());",
                    "reverseMap.put(\"Яблоко\", 10);",
                    "reverseMap.put(\"Банан\", 20);",
                    "reverseMap.put(\"Апельсин\", 15);",
                    "",
                    "System.out.println(reverseMap);",
                    "// {Яблоко=10, Банан=20, Апельсин=15} - обратный порядок",
                    "",
                    "Дополнительные методы TreeMap:",
                    "",
                    "TreeMap<Integer, String> map = new TreeMap<>();",
                    "map.put(1, \"Один\");",
                    "map.put(3, \"Три\");",
                    "map.put(5, \"Пять\");",
                    "map.put(7, \"Семь\");",
                    "map.put(9, \"Девять\");",
                    "",
                    "// Первый ключ",
                    "Integer firstKey = map.firstKey(); // 1",
                    "",
                    "// Последний ключ",
                    "Integer lastKey = map.lastKey(); // 9",
                    "",
                    "// Первая запись",
                    "Map.Entry<Integer, String> firstEntry = map.firstEntry();",
                    "",
                    "// Последняя запись",
                    "Map.Entry<Integer, String> lastEntry = map.lastEntry();",
                    "",
                    "// Записи с ключами меньше указанного",
                    "SortedMap<Integer, String> head = map.headMap(5); // {1=Один, 3=Три}",
                    "",
                    "// Записи с ключами больше или равными указанному",
                    "SortedMap<Integer, String> tail = map.tailMap(5); // {5=Пять, 7=Семь, 9=Девять}",
                    "",
                    "// Подмножество в диапазоне",
                    "SortedMap<Integer, String> sub = map.subMap(3, 7); // {3=Три, 5=Пять}"
                  ]
                },
                {
                  subtitle: "Сравнение реализаций Map",
                  content: [
                    "HashMap:",
                    "• Используй, когда порядок не важен",
                    "• Самая быстрая реализация",
                    "• Порядок элементов не гарантирован",
                    "",
                    "LinkedHashMap:",
                    "• Используй, когда нужен порядок вставки",
                    "• Немного медленнее HashMap",
                    "• Сохраняет порядок вставки",
                    "",
                    "TreeMap:",
                    "• Используй, когда нужна сортировка по ключам",
                    "• Медленнее HashMap и LinkedHashMap",
                    "• Элементы всегда отсортированы по ключам",
                    "",
                    "Пример выбора:",
                    "",
                    "// Для кэша (порядок не важен)",
                    "Map<String, Object> cache = new HashMap<>();",
                    "",
                    "// Для истории операций (нужен порядок)",
                    "Map<Long, String> operationHistory = new LinkedHashMap<>();",
                    "",
                    "// Для отсортированного справочника",
                    "Map<String, Integer> sortedDictionary = new TreeMap<>();"
                  ]
                },
                {
                  subtitle: "Итерация по Map",
                  content: [
                    "Существует несколько способов итерации по Map:",
                    "",
                    "Map<String, Integer> map = new HashMap<>();",
                    "map.put(\"Иван\", 25);",
                    "map.put(\"Мария\", 30);",
                    "map.put(\"Петр\", 28);",
                    "",
                    "1. Итерация по ключам (keySet):",
                    "",
                    "for (String key : map.keySet()) {",
                    "    Integer value = map.get(key);",
                    "    System.out.println(key + \" = \" + value);",
                    "}",
                    "",
                    "2. Итерация по значениям (values):",
                    "",
                    "for (Integer value : map.values()) {",
                    "    System.out.println(value);",
                    "}",
                    "",
                    "3. Итерация по парам ключ-значение (entrySet) - РЕКОМЕНДУЕТСЯ:",
                    "",
                    "for (Map.Entry<String, Integer> entry : map.entrySet()) {",
                    "    String key = entry.getKey();",
                    "    Integer value = entry.getValue();",
                    "    System.out.println(key + \" = \" + value);",
                    "}",
                    "",
                    "4. Stream API (Java 8+):",
                    "",
                    "map.forEach((key, value) -> System.out.println(key + \" = \" + value));",
                    "",
                    "// Или с методом-ссылкой",
                    "map.entrySet().forEach(entry -> System.out.println(entry.getKey() + \" = \" + entry.getValue()));"
                  ]
                },
                {
                  subtitle: "Работа с объектами в качестве ключей",
                  content: [
                    "⚠️ ВНИМАНИЕ: Для корректной работы Map с пользовательскими объектами в качестве ключей необходимо правильно реализовать методы equals() и hashCode().",
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
                    "Map<Person, String> map = new HashMap<>();",
                    "Person person1 = new Person(\"Иван\", 25);",
                    "Person person2 = new Person(\"Иван\", 25);",
                    "",
                    "map.put(person1, \"Работает\");",
                    "String value = map.get(person2); // вернет null!",
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
                    "Теперь Map будет работать правильно:",
                    "",
                    "Map<Person, String> map = new HashMap<>();",
                    "Person person1 = new Person(\"Иван\", 25);",
                    "Person person2 = new Person(\"Иван\", 25);",
                    "",
                    "map.put(person1, \"Работает\");",
                    "String value = map.get(person2); // вернет \"Работает\"!"
                  ]
                },
                {
                  subtitle: "Полезные методы Map (Java 8+)",
                  content: [
                    "Java 8 добавила множество полезных методов для работы с Map:",
                    "",
                    "Map<String, Integer> map = new HashMap<>();",
                    "",
                    "// Вычислить значение, если ключа нет",
                    "map.computeIfAbsent(\"ключ\", k -> 0); // если ключа нет, создаст со значением 0",
                    "",
                    "// Обновить значение, если ключ есть",
                    "map.computeIfPresent(\"ключ\", (k, v) -> v + 1); // увеличит значение на 1",
                    "",
                    "// Объединить значения",
                    "map.merge(\"ключ\", 1, (oldValue, newValue) -> oldValue + newValue);",
                    "",
                    "// Заменить значение, если оно совпадает",
                    "map.replace(\"ключ\", 10, 20); // заменит 10 на 20, только если текущее значение = 10",
                    "",
                    "// Заменить все значения",
                    "map.replaceAll((key, value) -> value * 2); // удвоит все значения",
                    "",
                    "Пример: Подсчет частоты элементов",
                    "",
                    "List<String> words = Arrays.asList(\"яблоко\", \"банан\", \"яблоко\", \"апельсин\", \"банан\", \"яблоко\");",
                    "",
                    "Map<String, Integer> frequency = new HashMap<>();",
                    "for (String word : words) {",
                    "    frequency.merge(word, 1, (oldValue, newValue) -> oldValue + newValue);",
                    "}",
                    "",
                    "System.out.println(frequency);",
                    "// {яблоко=3, банан=2, апельсин=1}"
                  ]
                },
                {
                  subtitle: "Практические примеры",
                  content: [
                    "Пример 1: Словарь (телефонная книга)",
                    "",
                    "Map<String, String> phoneBook = new HashMap<>();",
                    "phoneBook.put(\"Иван\", \"+7-999-123-45-67\");",
                    "phoneBook.put(\"Мария\", \"+7-999-234-56-78\");",
                    "phoneBook.put(\"Петр\", \"+7-999-345-67-89\");",
                    "",
                    "// Найти телефон по имени",
                    "String phone = phoneBook.get(\"Иван\");",
                    "System.out.println(\"Телефон Ивана: \" + phone);",
                    "",
                    "Пример 2: Группировка элементов",
                    "",
                    "List<String> words = Arrays.asList(\"яблоко\", \"банан\", \"апельсин\", \"яблоко\", \"виноград\");",
                    "",
                    "Map<Integer, List<String>> groupedByLength = new HashMap<>();",
                    "for (String word : words) {",
                    "    int length = word.length();",
                    "    groupedByLength.computeIfAbsent(length, k -> new ArrayList<>()).add(word);",
                    "}",
                    "",
                    "System.out.println(groupedByLength);",
                    "// {5=[яблоко, яблоко], 5=[банан], 7=[апельсин], 8=[виноград]}",
                    "",
                    "Пример 3: Инвертирование Map (ключ и значение меняются местами)",
                    "",
                    "Map<String, Integer> original = new HashMap<>();",
                    "original.put(\"Один\", 1);",
                    "original.put(\"Два\", 2);",
                    "original.put(\"Три\", 3);",
                    "",
                    "Map<Integer, String> inverted = new HashMap<>();",
                    "for (Map.Entry<String, Integer> entry : original.entrySet()) {",
                    "    inverted.put(entry.getValue(), entry.getKey());",
                    "}",
                    "",
                    "System.out.println(inverted);",
                    "// {1=Один, 2=Два, 3=Три}"
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
    const javaTypePattern = /^(int|String|double|boolean|char|byte|short|long|float|Map|HashMap|LinkedHashMap|TreeMap|SortedMap|Entry|Iterator|Collections|Arrays|Objects|List|ArrayList|Integer)\s*[<\(=]/;
    if (javaTypePattern.test(trimmed)) return true;
    
    // Объявления переменных с типами
    if (/^(Map|HashMap|LinkedHashMap|TreeMap|SortedMap|Entry|Iterator|Collections|Arrays|Objects|List|ArrayList|Integer|String|int|double|boolean|char|byte|short|long|float)\s*<.*>\s*\w+\s*=/.test(trimmed)) {
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
        line.includes("boolean ") || line.includes("char ") || line.includes("Map<") || line.includes("HashMap<") || 
        line.includes("LinkedHashMap<") || line.includes("TreeMap<") || line.includes("SortedMap<") ||
        line.includes("Entry<") || line.includes("Iterator<") || line.includes("Collections.") || line.includes("Arrays."))) {
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
                                    code.includes("Map<") || 
                                    code.includes("HashMap<") || 
                                    code.includes("LinkedHashMap<") || 
                                    code.includes("TreeMap<") ||
                                    code.includes("import java") ||
                                    code.includes("Collections.") ||
                                    code.includes("Arrays.") ||
                                    code.includes("Iterator<") ||
                                    code.includes("Entry<") ||
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


