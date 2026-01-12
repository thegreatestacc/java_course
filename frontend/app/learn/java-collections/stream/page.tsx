"use client";

// app/learn/java-collections/stream/page.tsx
// Страница с обучающим материалом по Streams API

import { JetBrains_Mono } from "next/font/google";
import { Header } from "../../../Header";
import { MotivationalQuotes } from "../../../MotivationalQuotes";
import { DetailedLesson } from "../../../DetailedLesson";
import Link from "next/link";
import { usePathname } from "next/navigation";

const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export default function JavaCollectionsStreamPage() {
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
              materialId="learn/java-collections/stream"
              title="Streams API"
              description="Изучи Streams API в Java 8+. Научись использовать функциональный подход для работы с коллекциями: фильтрация, преобразование, агрегация данных."
              sections={[
                {
                  subtitle: "Что такое Stream",
                  content: [
                    "Stream (поток) — это последовательность элементов, которая поддерживает различные операции для обработки данных в функциональном стиле.",
                    "",
                    "Основные характеристики Stream:",
                    "• Не хранит данные — это не коллекция, а способ обработки данных",
                    "• Функциональный стиль — операции описывают что делать, а не как",
                    "• Ленивое выполнение — операции выполняются только при вызове терминальной операции",
                    "• Не изменяет исходную коллекцию — создает новый поток",
                    "• Может быть использован только один раз",
                    "",
                    "Stream API появился в Java 8 и стал стандартным способом работы с коллекциями.",
                    "",
                    "import java.util.stream.Stream;",
                    "import java.util.stream.Collectors;",
                    "import java.util.List;",
                    "import java.util.Arrays;"
                  ]
                },
                {
                  subtitle: "Создание Stream",
                  content: [
                    "Существует несколько способов создания Stream:",
                    "",
                    "1. Из коллекции:",
                    "",
                    "List<String> list = Arrays.asList(\"Яблоко\", \"Банан\", \"Апельсин\");",
                    "Stream<String> stream = list.stream();",
                    "",
                    "2. Из массива:",
                    "",
                    "String[] array = {\"Яблоко\", \"Банан\", \"Апельсин\"};",
                    "Stream<String> stream = Arrays.stream(array);",
                    "",
                    "3. Статические методы Stream:",
                    "",
                    "// Пустой Stream",
                    "Stream<String> empty = Stream.empty();",
                    "",
                    "// Stream из значений",
                    "Stream<String> stream = Stream.of(\"Яблоко\", \"Банан\", \"Апельсин\");",
                    "",
                    "// Stream из функции (бесконечный)",
                    "Stream<Integer> numbers = Stream.iterate(0, n -> n + 1);",
                    "",
                    "// Stream из генератора",
                    "Stream<Double> random = Stream.generate(Math::random);",
                    "",
                    "4. Из Map:",
                    "",
                    "Map<String, Integer> map = new HashMap<>();",
                    "map.put(\"Иван\", 25);",
                    "map.put(\"Мария\", 30);",
                    "",
                    "// Stream ключей",
                    "Stream<String> keys = map.keySet().stream();",
                    "",
                    "// Stream значений",
                    "Stream<Integer> values = map.values().stream();",
                    "",
                    "// Stream пар ключ-значение",
                    "Stream<Map.Entry<String, Integer>> entries = map.entrySet().stream();"
                  ]
                },
                {
                  subtitle: "Промежуточные операции (Intermediate Operations)",
                  content: [
                    "Промежуточные операции возвращают новый Stream и выполняются лениво. Они не выполняются до вызова терминальной операции.",
                    "",
                    "filter() — фильтрация элементов:",
                    "",
                    "List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);",
                    "List<Integer> evenNumbers = numbers.stream()",
                    "    .filter(n -> n % 2 == 0)",
                    "    .collect(Collectors.toList());",
                    "// [2, 4, 6, 8, 10]",
                    "",
                    "map() — преобразование элементов:",
                    "",
                    "List<String> names = Arrays.asList(\"Иван\", \"Мария\", \"Петр\");",
                    "List<Integer> lengths = names.stream()",
                    "    .map(String::length)",
                    "    .collect(Collectors.toList());",
                    "// [4, 5, 4]",
                    "",
                    "flatMap() — преобразование и \"разворачивание\":",
                    "",
                    "List<List<Integer>> lists = Arrays.asList(",
                    "    Arrays.asList(1, 2, 3),",
                    "    Arrays.asList(4, 5, 6),",
                    "    Arrays.asList(7, 8, 9)",
                    ");",
                    "List<Integer> allNumbers = lists.stream()",
                    "    .flatMap(List::stream)",
                    "    .collect(Collectors.toList());",
                    "// [1, 2, 3, 4, 5, 6, 7, 8, 9]",
                    "",
                    "distinct() — удаление дубликатов:",
                    "",
                    "List<Integer> numbers = Arrays.asList(1, 2, 2, 3, 3, 3, 4);",
                    "List<Integer> unique = numbers.stream()",
                    "    .distinct()",
                    "    .collect(Collectors.toList());",
                    "// [1, 2, 3, 4]",
                    "",
                    "sorted() — сортировка:",
                    "",
                    "List<String> names = Arrays.asList(\"Петр\", \"Иван\", \"Мария\");",
                    "List<String> sorted = names.stream()",
                    "    .sorted()",
                    "    .collect(Collectors.toList());",
                    "// [Иван, Мария, Петр]",
                    "",
                    "// С кастомным компаратором",
                    "List<String> reverseSorted = names.stream()",
                    "    .sorted(Comparator.reverseOrder())",
                    "    .collect(Collectors.toList());",
                    "",
                    "limit() — ограничение количества элементов:",
                    "",
                    "List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);",
                    "List<Integer> firstFive = numbers.stream()",
                    "    .limit(5)",
                    "    .collect(Collectors.toList());",
                    "// [1, 2, 3, 4, 5]",
                    "",
                    "skip() — пропуск элементов:",
                    "",
                    "List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);",
                    "List<Integer> afterFive = numbers.stream()",
                    "    .skip(5)",
                    "    .collect(Collectors.toList());",
                    "// [6, 7, 8, 9, 10]"
                  ]
                },
                {
                  subtitle: "Терминальные операции (Terminal Operations)",
                  content: [
                    "Терминальные операции завершают Stream и возвращают результат. После вызова терминальной операции Stream нельзя использовать повторно.",
                    "",
                    "collect() — сбор элементов в коллекцию:",
                    "",
                    "List<String> names = Arrays.asList(\"Иван\", \"Мария\", \"Петр\");",
                    "List<String> result = names.stream()",
                    "    .filter(name -> name.length() > 4)",
                    "    .collect(Collectors.toList());",
                    "",
                    "// В Set",
                    "Set<String> set = names.stream()",
                    "    .collect(Collectors.toSet());",
                    "",
                    "// В Map",
                    "Map<String, Integer> map = names.stream()",
                    "    .collect(Collectors.toMap(",
                    "        name -> name,",
                    "        String::length",
                    "    ));",
                    "",
                    "forEach() — выполнение действия для каждого элемента:",
                    "",
                    "List<String> names = Arrays.asList(\"Иван\", \"Мария\", \"Петр\");",
                    "names.stream()",
                    "    .forEach(System.out::println);",
                    "",
                    "count() — подсчет элементов:",
                    "",
                    "List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);",
                    "long count = numbers.stream()",
                    "    .filter(n -> n % 2 == 0)",
                    "    .count();",
                    "// 2",
                    "",
                    "anyMatch(), allMatch(), noneMatch() — проверка условий:",
                    "",
                    "List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);",
                    "",
                    "// Есть ли хотя бы один четный?",
                    "boolean hasEven = numbers.stream()",
                    "    .anyMatch(n -> n % 2 == 0);",
                    "// true",
                    "",
                    "// Все ли четные?",
                    "boolean allEven = numbers.stream()",
                    "    .allMatch(n -> n % 2 == 0);",
                    "// false",
                    "",
                    "// Нет ли четных?",
                    "boolean noEven = numbers.stream()",
                    "    .noneMatch(n -> n % 2 == 0);",
                    "// false",
                    "",
                    "findFirst(), findAny() — поиск элементов:",
                    "",
                    "List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);",
                    "Optional<Integer> first = numbers.stream()",
                    "    .filter(n -> n > 3)",
                    "    .findFirst();",
                    "// Optional[4]",
                    "",
                    "reduce() — агрегация элементов:",
                    "",
                    "List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);",
                    "",
                    "// Сумма",
                    "int sum = numbers.stream()",
                    "    .reduce(0, Integer::sum);",
                    "// 15",
                    "",
                    "// Максимум",
                    "Optional<Integer> max = numbers.stream()",
                    "    .reduce(Integer::max);",
                    "// Optional[5]",
                    "",
                    "// Конкатенация строк",
                    "List<String> words = Arrays.asList(\"Hello\", \"World\", \"Java\");",
                    "String result = words.stream()",
                    "    .reduce(\"\", (a, b) -> a + \" \" + b);",
                    "// \" Hello World Java\""
                  ]
                },
                {
                  subtitle: "Практические примеры",
                  content: [
                    "Пример 1: Фильтрация и преобразование списка пользователей",
                    "",
                    "class User {",
                    "    private String name;",
                    "    private int age;",
                    "    ",
                    "    public User(String name, int age) {",
                    "        this.name = name;",
                    "        this.age = age;",
                    "    }",
                    "    ",
                    "    public String getName() { return name; }",
                    "    public int getAge() { return age; }",
                    "}",
                    "",
                    "List<User> users = Arrays.asList(",
                    "    new User(\"Иван\", 25),",
                    "    new User(\"Мария\", 17),",
                    "    new User(\"Петр\", 30),",
                    "    new User(\"Анна\", 20)",
                    ");",
                    "",
                    "// Найти имена всех совершеннолетних пользователей",
                    "List<String> adultNames = users.stream()",
                    "    .filter(user -> user.getAge() >= 18)",
                    "    .map(User::getName)",
                    "    .collect(Collectors.toList());",
                    "// [Иван, Петр, Анна]",
                    "",
                    "Пример 2: Группировка элементов",
                    "",
                    "List<String> words = Arrays.asList(\"яблоко\", \"банан\", \"апельсин\", \"яблоко\", \"банан\");",
                    "",
                    "// Подсчет частоты слов",
                    "Map<String, Long> frequency = words.stream()",
                    "    .collect(Collectors.groupingBy(",
                    "        word -> word,",
                    "        Collectors.counting()",
                    "    ));",
                    "// {яблоко=2, банан=2, апельсин=1}",
                    "",
                    "Пример 3: Цепочка операций",
                    "",
                    "List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);",
                    "",
                    "// Найти сумму квадратов всех четных чисел",
                    "int sumOfSquares = numbers.stream()",
                    "    .filter(n -> n % 2 == 0)",
                    "    .map(n -> n * n)",
                    "    .reduce(0, Integer::sum);",
                    "// 2² + 4² + 6² + 8² + 10² = 4 + 16 + 36 + 64 + 100 = 220",
                    "",
                    "Пример 4: Работа с вложенными коллекциями",
                    "",
                    "List<List<Integer>> matrix = Arrays.asList(",
                    "    Arrays.asList(1, 2, 3),",
                    "    Arrays.asList(4, 5, 6),",
                    "    Arrays.asList(7, 8, 9)",
                    ");",
                    "",
                    "// Преобразовать в один список",
                    "List<Integer> flatList = matrix.stream()",
                    "    .flatMap(List::stream)",
                    "    .collect(Collectors.toList());",
                    "// [1, 2, 3, 4, 5, 6, 7, 8, 9]",
                    "",
                    "// Найти сумму всех элементов",
                    "int totalSum = matrix.stream()",
                    "    .flatMap(List::stream)",
                    "    .mapToInt(Integer::intValue)",
                    "    .sum();",
                    "// 45"
                  ]
                },
                {
                  subtitle: "Специализированные Stream",
                  content: [
                    "Для примитивных типов существуют специализированные Stream:",
                    "",
                    "IntStream — для int:",
                    "",
                    "import java.util.stream.IntStream;",
                    "",
                    "// Создание IntStream",
                    "IntStream range = IntStream.range(1, 10); // 1, 2, 3, ..., 9",
                    "IntStream rangeClosed = IntStream.rangeClosed(1, 10); // 1, 2, 3, ..., 10",
                    "",
                    "// Преобразование в IntStream",
                    "List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);",
                    "IntStream intStream = numbers.stream()",
                    "    .mapToInt(Integer::intValue);",
                    "",
                    "// Операции IntStream",
                    "int sum = IntStream.range(1, 10).sum(); // 45",
                    "OptionalDouble avg = IntStream.range(1, 10).average();",
                    "OptionalInt max = IntStream.range(1, 10).max();",
                    "",
                    "LongStream — для long:",
                    "",
                    "import java.util.stream.LongStream;",
                    "",
                    "long sum = LongStream.range(1, 1000).sum();",
                    "",
                    "DoubleStream — для double:",
                    "",
                    "import java.util.stream.DoubleStream;",
                    "",
                    "double sum = DoubleStream.of(1.5, 2.5, 3.5).sum();"
                  ]
                },
                {
                  subtitle: "Параллельные Stream",
                  content: [
                    "Stream может выполняться параллельно для повышения производительности на многоядерных системах:",
                    "",
                    "List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);",
                    "",
                    "// Обычный Stream",
                    "int sum = numbers.stream()",
                    "    .mapToInt(Integer::intValue)",
                    "    .sum();",
                    "",
                    "// Параллельный Stream",
                    "int parallelSum = numbers.parallelStream()",
                    "    .mapToInt(Integer::intValue)",
                    "    .sum();",
                    "",
                    "⚠️ ВНИМАНИЕ:",
                    "• Параллельные Stream полезны только для больших объемов данных",
                    "• Для маленьких коллекций параллелизм может замедлить выполнение",
                    "• Операции должны быть независимыми и без побочных эффектов",
                    "• Порядок выполнения не гарантирован",
                    "",
                    "Когда использовать parallelStream:",
                    "• Большие коллекции (десятки тысяч элементов)",
                    "• Тяжелые вычисления для каждого элемента",
                    "• Операции не зависят от порядка",
                    "• Нет побочных эффектов"
                  ]
                },
                {
                  subtitle: "Лучшие практики",
                  content: [
                    "1. Используй Stream для функциональной обработки данных:",
                    "",
                    "// ✅ Хорошо",
                    "List<String> result = list.stream()",
                    "    .filter(s -> s.length() > 5)",
                    "    .map(String::toUpperCase)",
                    "    .collect(Collectors.toList());",
                    "",
                    "// ❌ Плохо (изменение состояния)",
                    "List<String> result = new ArrayList<>();",
                    "for (String s : list) {",
                    "    if (s.length() > 5) {",
                    "        result.add(s.toUpperCase());",
                    "    }",
                    "}",
                    "",
                    "2. Избегай побочных эффектов в Stream:",
                    "",
                    "// ❌ Плохо",
                    "list.stream().forEach(item -> externalList.add(item));",
                    "",
                    "// ✅ Хорошо",
                    "List<String> result = list.stream()",
                    "    .collect(Collectors.toList());",
                    "",
                    "3. Используй метод-ссылки, когда возможно:",
                    "",
                    "// ✅ Хорошо",
                    "list.stream().map(String::toUpperCase)",
                    "",
                    "// ❌ Плохо",
                    "list.stream().map(s -> s.toUpperCase())",
                    "",
                    "4. Комбинируй операции для читаемости:",
                    "",
                    "// ✅ Хорошо",
                    "double average = numbers.stream()",
                    "    .filter(n -> n > 0)",
                    "    .mapToInt(Integer::intValue)",
                    "    .average()",
                    "    .orElse(0.0);",
                    "",
                    "5. Используй специализированные Stream для примитивов:",
                    "",
                    "// ✅ Хорошо",
                    "int sum = numbers.stream()",
                    "    .mapToInt(Integer::intValue)",
                    "    .sum();",
                    "",
                    "// ❌ Плохо",
                    "int sum = numbers.stream()",
                    "    .mapToInt(n -> n.intValue())",
                    "    .reduce(0, Integer::sum);"
                  ]
                }
              ]}
            />
          </section>
        </main>
      </div>
    </div>
  );
}

