"use client";

// app/learn/java-oop/equals-hashcode/page.tsx
// Страница с обучающим материалом по equals() и hashCode()

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

export default function EqualsHashCodePage() {
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
                  href="/learn/java-oop"
                  className={`block px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                    pathname === "/learn/java-oop"
                      ? "bg-[var(--bg-muted)] text-[var(--text-main)] font-medium"
                      : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                  }`}
                >
                  <span className={`inline-block transition-opacity duration-200 ${
                    pathname === "/learn/java-oop" ? "opacity-100" : "opacity-70"
                  }`}>
                    Обзор материала
                  </span>
                </Link>
                <Link
                  href="/learn/java-oop/equals-hashcode"
                  className={`block px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                    pathname === "/learn/java-oop/equals-hashcode"
                      ? "bg-[var(--bg-muted)] text-[var(--text-main)] font-medium"
                      : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                  }`}
                >
                  <span className={`inline-block transition-opacity duration-200 ${
                    pathname === "/learn/java-oop/equals-hashcode" ? "opacity-100" : "opacity-70"
                  }`}>
                    equals() и hashCode()
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <Header leftButton={{ href: "/learn/junior", text: "← К Junior Java Developer" }} />
        <MotivationalQuotes />
        <main>
          <section className="mx-auto max-w-6xl px-5 py-14 md:py-20">
            <DetailedLesson
              materialId="learn/java-oop/equals-hashcode"
              title="equals() и hashCode()"
              description="Изучи методы equals() и hashCode() в Java. Узнай, почему они важны, как их правильно реализовать, и какие проблемы возникают при неправильной реализации."
              sections={[
                {
                  subtitle: "Зачем нужны equals() и hashCode()",
                  content: [
                    "В Java методы equals() и hashCode() играют критически важную роль при работе с объектами. Они определяют, как объекты сравниваются и хранятся в коллекциях.",
                    "",
                    "Основные причины использования:",
                    "• Сравнение объектов по значению, а не по ссылке",
                    "• Корректная работа с коллекциями (HashSet, HashMap, Hashtable)",
                    "• Поиск объектов в коллекциях",
                    "• Правильная работа с ключами в Map",
                    "",
                    "⚠️ ВНИМАНИЕ: Если вы переопределяете equals(), вы ОБЯЗАТЕЛЬНО должны переопределить hashCode(). Это правило Java, нарушение которого приведет к неправильной работе коллекций."
                  ]
                },
                {
                  subtitle: "Метод equals()",
                  content: [
                    "Метод equals() используется для сравнения двух объектов на равенство по значению.",
                    "",
                    "По умолчанию (из класса Object) equals() сравнивает ссылки:",
                    "",
                    "Object obj1 = new Object();",
                    "Object obj2 = new Object();",
                    "Object obj3 = obj1;",
                    "",
                    "System.out.println(obj1.equals(obj2)); // false (разные объекты)",
                    "System.out.println(obj1.equals(obj3)); // true (одна и та же ссылка)",
                    "",
                    "Для сравнения по значению нужно переопределить equals().",
                    "",
                    "Требования к реализации equals():",
                    "• Рефлексивность: x.equals(x) всегда true",
                    "• Симметричность: если x.equals(y) == true, то y.equals(x) == true",
                    "• Транзитивность: если x.equals(y) == true и y.equals(z) == true, то x.equals(z) == true",
                    "• Консистентность: многократные вызовы x.equals(y) возвращают одно и то же значение",
                    "• Для любого не-null объекта x: x.equals(null) == false"
                  ]
                },
                {
                  subtitle: "Пример неправильной реализации equals()",
                  content: [
                    "Рассмотрим класс Person без переопределения equals():",
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
                    "Person person1 = new Person(\"Иван\", 25);",
                    "Person person2 = new Person(\"Иван\", 25);",
                    "",
                    "System.out.println(person1.equals(person2)); // false!",
                    "System.out.println(person1 == person2); // false",
                    "",
                    "Хотя объекты имеют одинаковые значения полей, equals() вернет false, потому что сравниваются ссылки, а не значения."
                  ]
                },
                {
                  subtitle: "Правильная реализация equals()",
                  content: [
                    "Правильная реализация equals() для класса Person:",
                    "",
                    "import java.util.Objects;",
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
                    "        // Проверка на ссылочное равенство",
                    "        if (this == o) return true;",
                    "        ",
                    "        // Проверка на null и класс",
                    "        if (o == null || getClass() != o.getClass()) return false;",
                    "        ",
                    "        // Приведение типа",
                    "        Person person = (Person) o;",
                    "        ",
                    "        // Сравнение полей",
                    "        return age == person.age && Objects.equals(name, person.name);",
                    "    }",
                    "}",
                    "",
                    "Теперь сравнение работает правильно:",
                    "",
                    "Person person1 = new Person(\"Иван\", 25);",
                    "Person person2 = new Person(\"Иван\", 25);",
                    "",
                    "System.out.println(person1.equals(person2)); // true!",
                    "",
                    "Важные моменты:",
                    "• Используем Objects.equals() для безопасного сравнения строк (обрабатывает null)",
                    "• Проверяем класс через getClass() (не instanceof, чтобы избежать проблем с наследованием)",
                    "• Сначала проверяем ссылочное равенство для оптимизации"
                  ]
                },
                {
                  subtitle: "Метод hashCode()",
                  content: [
                    "Метод hashCode() возвращает целочисленное значение (хеш-код) для объекта. Этот метод используется в хеш-таблицах (HashMap, HashSet).",
                    "",
                    "Требования к реализации hashCode():",
                    "• Если два объекта равны по equals(), их hashCode() должны быть равны",
                    "• Если hashCode() вызывается несколько раз на одном объекте, должен возвращать одно и то же значение (если объект не изменялся)",
                    "• hashCode() может возвращать разные значения для разных объектов",
                    "",
                    "⚠️ ВНИМАНИЕ: Обратное утверждение НЕ верно! Если hashCode() равны, это НЕ означает, что объекты равны по equals()."
                  ]
                },
                {
                  subtitle: "Правильная реализация hashCode()",
                  content: [
                    "Правильная реализация hashCode() для класса Person:",
                    "",
                    "import java.util.Objects;",
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
                    "    public int hashCode() {",
                    "        return Objects.hash(name, age);",
                    "    }",
                    "}",
                    "",
                    "Метод Objects.hash() автоматически вычисляет хеш-код на основе переданных значений.",
                    "",
                    "Альтернативная реализация (вручную):",
                    "",
                    "@Override",
                    "public int hashCode() {",
                    "    int result = name != null ? name.hashCode() : 0;",
                    "    result = 31 * result + age;",
                    "    return result;",
                    "}",
                    "",
                    "Почему используется 31?",
                    "• 31 — простое число",
                    "• 31 * i можно оптимизировать как (i << 5) - i",
                    "• Хорошо распределяет хеш-коды"
                  ]
                },
                {
                  subtitle: "Проблемы при неправильной реализации",
                  content: [
                    "Рассмотрим, что происходит, если переопределить только equals(), но не hashCode():",
                    "",
                    "class Person {",
                    "    String name;",
                    "    int age;",
                    "    ",
                    "    // equals() реализован правильно",
                    "    @Override",
                    "    public boolean equals(Object o) {",
                    "        if (this == o) return true;",
                    "        if (o == null || getClass() != o.getClass()) return false;",
                    "        Person person = (Person) o;",
                    "        return age == person.age && Objects.equals(name, person.name);",
                    "    }",
                    "    ",
                    "    // hashCode() НЕ переопределен!",
                    "}",
                    "",
                    "Теперь попробуем использовать Person в HashSet:",
                    "",
                    "Set<Person> people = new HashSet<>();",
                    "Person person1 = new Person(\"Иван\", 25);",
                    "Person person2 = new Person(\"Иван\", 25);",
                    "",
                    "people.add(person1);",
                    "people.add(person2);",
                    "",
                    "System.out.println(people.size()); // 2! (должно быть 1)",
                    "System.out.println(person1.equals(person2)); // true",
                    "",
                    "Проблема: HashSet использует hashCode() для быстрого поиска. Если hashCode() не переопределен, объекты с одинаковыми значениями получат разные хеш-коды и будут считаться разными."
                  ]
                },
                {
                  subtitle: "Правильная реализация equals() и hashCode() вместе",
                  content: [
                    "Полная правильная реализация класса Person:",
                    "",
                    "import java.util.Objects;",
                    "",
                    "class Person {",
                    "    private String name;",
                    "    private int age;",
                    "    ",
                    "    public Person(String name, int age) {",
                    "        this.name = name;",
                    "        this.age = age;",
                    "    }",
                    "    ",
                    "    public String getName() {",
                    "        return name;",
                    "    }",
                    "    ",
                    "    public int getAge() {",
                    "        return age;",
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
                    "    ",
                    "    @Override",
                    "    public String toString() {",
                    "        return \"Person{name='\" + name + \"', age=\" + age + '}';",
                    "    }",
                    "}",
                    "",
                    "Теперь все работает правильно:",
                    "",
                    "Person person1 = new Person(\"Иван\", 25);",
                    "Person person2 = new Person(\"Иван\", 25);",
                    "",
                    "System.out.println(person1.equals(person2)); // true",
                    "System.out.println(person1.hashCode() == person2.hashCode()); // true",
                    "",
                    "Set<Person> people = new HashSet<>();",
                    "people.add(person1);",
                    "people.add(person2);",
                    "System.out.println(people.size()); // 1 (правильно!)",
                    "",
                    "Map<Person, String> map = new HashMap<>();",
                    "map.put(person1, \"Работает\");",
                    "System.out.println(map.get(person2)); // \"Работает\" (правильно!)"
                  ]
                },
                {
                  subtitle: "Работа с наследованием",
                  content: [
                    "При наследовании нужно быть осторожным с equals() и hashCode().",
                    "",
                    "Пример проблемы:",
                    "",
                    "class Person {",
                    "    String name;",
                    "    ",
                    "    @Override",
                    "    public boolean equals(Object o) {",
                    "        if (this == o) return true;",
                    "        if (o == null || getClass() != o.getClass()) return false;",
                    "        Person person = (Person) o;",
                    "        return Objects.equals(name, person.name);",
                    "    }",
                    "    ",
                    "    @Override",
                    "    public int hashCode() {",
                    "        return Objects.hash(name);",
                    "    }",
                    "}",
                    "",
                    "class Employee extends Person {",
                    "    int salary;",
                    "    ",
                    "    // Проблема: equals() не учитывает salary!",
                    "}",
                    "",
                    "Employee emp1 = new Employee();",
                    "emp1.name = \"Иван\";",
                    "emp1.salary = 50000;",
                    "",
                    "Employee emp2 = new Employee();",
                    "emp2.name = \"Иван\";",
                    "emp2.salary = 60000;",
                    "",
                    "System.out.println(emp1.equals(emp2)); // true (но salary разные!)",
                    "",
                    "Правильное решение — переопределить equals() в Employee:",
                    "",
                    "class Employee extends Person {",
                    "    int salary;",
                    "    ",
                    "    @Override",
                    "    public boolean equals(Object o) {",
                    "        if (this == o) return true;",
                    "        if (o == null || getClass() != o.getClass()) return false;",
                    "        if (!super.equals(o)) return false;",
                    "        Employee employee = (Employee) o;",
                    "        return salary == employee.salary;",
                    "    }",
                    "    ",
                    "    @Override",
                    "    public int hashCode() {",
                    "        return Objects.hash(super.hashCode(), salary);",
                    "    }",
                    "}"
                  ]
                },
                {
                  subtitle: "Использование в коллекциях",
                  content: [
                    "Правильная реализация equals() и hashCode() критически важна для работы с коллекциями:",
                    "",
                    "1. HashSet и LinkedHashSet:",
                    "",
                    "Set<Person> people = new HashSet<>();",
                    "Person person1 = new Person(\"Иван\", 25);",
                    "Person person2 = new Person(\"Иван\", 25);",
                    "",
                    "people.add(person1);",
                    "people.add(person2);",
                    "",
                    "System.out.println(people.size()); // 1 (если equals() и hashCode() реализованы правильно)",
                    "System.out.println(people.contains(new Person(\"Иван\", 25))); // true",
                    "",
                    "2. HashMap и LinkedHashMap:",
                    "",
                    "Map<Person, String> map = new HashMap<>();",
                    "Person person1 = new Person(\"Иван\", 25);",
                    "Person person2 = new Person(\"Иван\", 25);",
                    "",
                    "map.put(person1, \"Работает\");",
                    "String value = map.get(person2); // \"Работает\" (если equals() и hashCode() реализованы правильно)",
                    "",
                    "3. ArrayList (equals() используется в contains(), indexOf(), remove()):",
                    "",
                    "List<Person> people = new ArrayList<>();",
                    "people.add(new Person(\"Иван\", 25));",
                    "",
                    "System.out.println(people.contains(new Person(\"Иван\", 25))); // true (если equals() реализован правильно)"
                  ]
                },
                {
                  subtitle: "Практические рекомендации",
                  content: [
                    "1. Всегда переопределяйте equals() и hashCode() вместе",
                    "",
                    "2. Используйте Objects.equals() и Objects.hash() для упрощения кода",
                    "",
                    "3. Не изменяйте поля, используемые в equals() и hashCode(), после добавления объекта в HashSet или HashMap",
                    "",
                    "4. Используйте final поля, если возможно, чтобы избежать изменений",
                    "",
                    "5. При наследовании вызывайте super.equals() и super.hashCode()",
                    "",
                    "6. Используйте IDE для генерации equals() и hashCode() (IntelliJ IDEA, Eclipse)",
                    "",
                    "7. Тестируйте реализацию:",
                    "",
                    "Person person1 = new Person(\"Иван\", 25);",
                    "Person person2 = new Person(\"Иван\", 25);",
                    "Person person3 = new Person(\"Мария\", 30);",
                    "",
                    "// Рефлексивность",
                    "assert person1.equals(person1);",
                    "",
                    "// Симметричность",
                    "assert person1.equals(person2) == person2.equals(person1);",
                    "",
                    "// hashCode согласованность",
                    "assert person1.equals(person2) == (person1.hashCode() == person2.hashCode());",
                    "",
                    "// Неравенство",
                    "assert !person1.equals(person3);",
                    "",
                    "// null",
                    "assert !person1.equals(null);"
                  ]
                },
                {
                  subtitle: "Использование Lombok (опционально)",
                  content: [
                    "Если вы используете библиотеку Lombok, можно упростить код с помощью аннотаций:",
                    "",
                    "import lombok.EqualsAndHashCode;",
                    "",
                    "@EqualsAndHashCode",
                    "class Person {",
                    "    String name;",
                    "    int age;",
                    "}",
                    "",
                    "Lombok автоматически сгенерирует equals() и hashCode() на основе всех полей класса.",
                    "",
                    "Исключение полей из equals() и hashCode():",
                    "",
                    "@EqualsAndHashCode(exclude = {\"age\"})",
                    "class Person {",
                    "    String name;",
                    "    int age; // не будет использоваться в equals() и hashCode()",
                    "}",
                    "",
                    "Или использовать только определенные поля:",
                    "",
                    "@EqualsAndHashCode(of = {\"name\"})",
                    "class Person {",
                    "    String name;",
                    "    int age; // не будет использоваться в equals() и hashCode()",
                    "}"
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
          <Link className="hover:text-[var(--text-main)]" href="/learn/java-oop">
            К Java OOP
          </Link>
          <Link className="hover:text-[var(--text-main)]" href="/">
            На главную
          </Link>
        </div>
      </div>
    </footer>
  );
}

