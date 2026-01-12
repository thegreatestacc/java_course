"use client";

// app/learn/java-oop/classes/page.tsx
// Страница с обучающим материалом по классам и объектам

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

export default function ClassesPage() {
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
                  href="/learn/java-oop/classes"
                  className={`block px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                    pathname === "/learn/java-oop/classes"
                      ? "bg-[var(--bg-muted)] text-[var(--text-main)] font-medium"
                      : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                  }`}
                >
                  <span className={`inline-block transition-opacity duration-200 ${
                    pathname === "/learn/java-oop/classes" ? "opacity-100" : "opacity-70"
                  }`}>
                    Классы и объекты
                  </span>
                </Link>
                <Link
                  href="/learn/java-oop/inheritance"
                  className={`block px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                    pathname === "/learn/java-oop/inheritance"
                      ? "bg-[var(--bg-muted)] text-[var(--text-main)] font-medium"
                      : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                  }`}
                >
                  <span className={`inline-block transition-opacity duration-200 ${
                    pathname === "/learn/java-oop/inheritance" ? "opacity-100" : "opacity-70"
                  }`}>
                    Наследование
                  </span>
                </Link>
                <Link
                  href="/learn/java-oop/polymorphism"
                  className={`block px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                    pathname === "/learn/java-oop/polymorphism"
                      ? "bg-[var(--bg-muted)] text-[var(--text-main)] font-medium"
                      : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                  }`}
                >
                  <span className={`inline-block transition-opacity duration-200 ${
                    pathname === "/learn/java-oop/polymorphism" ? "opacity-100" : "opacity-70"
                  }`}>
                    Полиморфизм
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

        <Header leftButton={{ href: "/learn/java-oop", text: "← К Java OOP" }} />
        <MotivationalQuotes />
        <main>
          <section className="mx-auto max-w-6xl px-5 py-14 md:py-20">
            <DetailedLesson
              materialId="learn/java-oop/classes"
              title="Классы и объекты"
              description="Изучи основы объектно-ориентированного программирования в Java: создание классов, объектов, работа с полями, методами и конструкторами."
              sections={[
                {
                  subtitle: "Что такое класс и объект",
                  content: [
                    "Класс — это шаблон или чертеж для создания объектов. Он определяет структуру и поведение объектов.",
                    "",
                    "Объект — это конкретный экземпляр класса, созданный на основе этого шаблона.",
                    "",
                    "Аналогия:",
                    "• Класс = чертеж дома",
                    "• Объект = конкретный дом, построенный по этому чертежу",
                    "",
                    "Пример:",
                    "",
                    "// Класс (шаблон)",
                    "class Car {",
                    "    String brand;",
                    "    String color;",
                    "    int speed;",
                    "}",
                    "",
                    "// Объекты (конкретные экземпляры)",
                    "Car car1 = new Car();",
                    "Car car2 = new Car();",
                    "",
                    "car1.brand = \"Toyota\";",
                    "car1.color = \"Red\";",
                    "",
                    "car2.brand = \"BMW\";",
                    "car2.color = \"Blue\";"
                  ]
                },
                {
                  subtitle: "Создание класса",
                  content: [
                    "Класс в Java объявляется с помощью ключевого слова class:",
                    "",
                    "class ClassName {",
                    "    // поля (переменные)",
                    "    // методы (функции)",
                    "}",
                    "",
                    "Пример простого класса:",
                    "",
                    "class Person {",
                    "    // Поля класса",
                    "    String name;",
                    "    int age;",
                    "    ",
                    "    // Метод класса",
                    "    void introduce() {",
                    "        System.out.println(\"Меня зовут \" + name + \", мне \" + age + \" лет\");",
                    "    }",
                    "}",
                    "",
                    "Правила именования классов:",
                    "• Имя класса должно начинаться с заглавной буквы",
                    "• Если имя состоит из нескольких слов, используется CamelCase (например, MyClass, BankAccount)",
                    "• Имя класса должно совпадать с именем файла (Person.java для класса Person)"
                  ]
                },
                {
                  subtitle: "Создание объектов",
                  content: [
                    "Объект создается с помощью ключевого слова new:",
                    "",
                    "ClassName objectName = new ClassName();",
                    "",
                    "Пример:",
                    "",
                    "Person person1 = new Person();",
                    "Person person2 = new Person();",
                    "",
                    "Каждый объект имеет свои собственные копии полей:",
                    "",
                    "person1.name = \"Иван\";",
                    "person1.age = 25;",
                    "",
                    "person2.name = \"Мария\";",
                    "person2.age = 30;",
                    "",
                    "System.out.println(person1.name); // \"Иван\"",
                    "System.out.println(person2.name); // \"Мария\"",
                    "",
                    "Важно понимать:",
                    "• person1 и person2 — это разные объекты",
                    "• Изменение person1.name не влияет на person2.name",
                    "• Каждый объект существует независимо"
                  ]
                },
                {
                  subtitle: "Поля класса (переменные экземпляра)",
                  content: [
                    "Поля класса — это переменные, которые хранят данные объекта. Каждый объект имеет свои собственные копии полей.",
                    "",
                    "class Student {",
                    "    // Поля класса",
                    "    String name;",
                    "    int age;",
                    "    double gpa;",
                    "    boolean isActive;",
                    "}",
                    "",
                    "Типы полей:",
                    "• Примитивные типы: int, double, boolean, char и т.д.",
                    "• Ссылочные типы: String, массивы, другие объекты",
                    "",
                    "Доступ к полям:",
                    "",
                    "Student student = new Student();",
                    "student.name = \"Алексей\";",
                    "student.age = 20;",
                    "student.gpa = 4.5;",
                    "",
                    "System.out.println(student.name); // \"Алексей\"",
                    "System.out.println(student.age);  // 20"
                  ]
                },
                {
                  subtitle: "Методы класса",
                  content: [
                    "Методы — это функции, которые определяют поведение объекта. Они могут работать с полями класса и выполнять различные действия.",
                    "",
                    "class Calculator {",
                    "    // Метод без параметров",
                    "    void sayHello() {",
                    "        System.out.println(\"Привет!\");",
                    "    }",
                    "    ",
                    "    // Метод с параметрами",
                    "    int add(int a, int b) {",
                    "        return a + b;",
                    "    }",
                    "    ",
                    "    // Метод, работающий с полями",
                    "    void setValue(int value) {",
                    "        this.value = value;",
                    "    }",
                    "}",
                    "",
                    "Вызов методов:",
                    "",
                    "Calculator calc = new Calculator();",
                    "calc.sayHello(); // \"Привет!\"",
                    "",
                    "int result = calc.add(5, 3);",
                    "System.out.println(result); // 8",
                    "",
                    "calc.setValue(10);",
                    "",
                    "Ключевое слово this:",
                    "• this ссылается на текущий объект",
                    "• Используется для доступа к полям и методам текущего объекта",
                    "• Помогает различать параметры метода и поля класса"
                  ]
                },
                {
                  subtitle: "Конструкторы",
                  content: [
                    "Конструктор — это специальный метод, который вызывается при создании объекта. Он используется для инициализации полей объекта.",
                    "",
                    "Особенности конструкторов:",
                    "• Имя конструктора совпадает с именем класса",
                    "• Конструктор не имеет возвращаемого типа (даже void)",
                    "• Конструктор вызывается автоматически при создании объекта",
                    "",
                    "Конструктор по умолчанию:",
                    "",
                    "class Person {",
                    "    String name;",
                    "    int age;",
                    "    ",
                    "    // Конструктор по умолчанию (создается автоматически, если не определен)",
                    "    Person() {",
                    "        // Пустой конструктор",
                    "    }",
                    "}",
                    "",
                    "Конструктор с параметрами:",
                    "",
                    "class Person {",
                    "    String name;",
                    "    int age;",
                    "    ",
                    "    // Конструктор с параметрами",
                    "    Person(String name, int age) {",
                    "        this.name = name;",
                    "        this.age = age;",
                    "    }",
                    "}",
                    "",
                    "Использование:",
                    "",
                    "Person person = new Person(\"Иван\", 25);",
                    "System.out.println(person.name); // \"Иван\"",
                    "System.out.println(person.age);   // 25"
                  ]
                },
                {
                  subtitle: "Перегрузка конструкторов",
                  content: [
                    "В Java можно создать несколько конструкторов с разными параметрами. Это называется перегрузкой конструкторов.",
                    "",
                    "class Person {",
                    "    String name;",
                    "    int age;",
                    "    String email;",
                    "    ",
                    "    // Конструктор без параметров",
                    "    Person() {",
                    "        this.name = \"Неизвестно\";",
                    "        this.age = 0;",
                    "    }",
                    "    ",
                    "    // Конструктор с двумя параметрами",
                    "    Person(String name, int age) {",
                    "        this.name = name;",
                    "        this.age = age;",
                    "    }",
                    "    ",
                    "    // Конструктор с тремя параметрами",
                    "    Person(String name, int age, String email) {",
                    "        this.name = name;",
                    "        this.age = age;",
                    "        this.email = email;",
                    "    }",
                    "}",
                    "",
                    "Использование:",
                    "",
                    "Person person1 = new Person();",
                    "Person person2 = new Person(\"Иван\", 25);",
                    "Person person3 = new Person(\"Мария\", 30, \"maria@example.com\");",
                    "",
                    "Вызов одного конструктора из другого:",
                    "",
                    "class Person {",
                    "    String name;",
                    "    int age;",
                    "    ",
                    "    Person() {",
                    "        this(\"Неизвестно\", 0); // Вызов другого конструктора",
                    "    }",
                    "    ",
                    "    Person(String name, int age) {",
                    "        this.name = name;",
                    "        this.age = age;",
                    "    }",
                    "}"
                  ]
                },
                {
                  subtitle: "Модификаторы доступа",
                  content: [
                    "Модификаторы доступа определяют, откуда можно обращаться к полям и методам класса.",
                    "",
                    "В Java есть четыре уровня доступа:",
                    "",
                    "1. public — доступен везде",
                    "",
                    "class Person {",
                    "    public String name;",
                    "    public void introduce() {",
                    "        System.out.println(\"Привет, я \" + name);",
                    "    }",
                    "}",
                    "",
                    "2. private — доступен только внутри класса",
                    "",
                    "class Person {",
                    "    private String name;",
                    "    private int age;",
                    "    ",
                    "    public void setName(String name) {",
                    "        this.name = name; // Доступно, т.к. внутри класса",
                    "    }",
                    "}",
                    "",
                    "3. protected — доступен в классе, его подклассах и в том же пакете",
                    "",
                    "4. (без модификатора) — доступен только в том же пакете (package-private)",
                    "",
                    "Рекомендации:",
                    "• Поля обычно делают private для инкапсуляции",
                    "• Для доступа к полям создают методы-геттеры и сеттеры",
                    "• Методы, которые должны использоваться извне, делают public"
                  ]
                },
                {
                  subtitle: "Геттеры и сеттеры",
                  content: [
                    "Геттеры (getters) и сеттеры (setters) — это методы для безопасного доступа к private полям класса.",
                    "",
                    "class Person {",
                    "    private String name;",
                    "    private int age;",
                    "    ",
                    "    // Геттер для name",
                    "    public String getName() {",
                    "        return name;",
                    "    }",
                    "    ",
                    "    // Сеттер для name",
                    "    public void setName(String name) {",
                    "        if (name != null && !name.isEmpty()) {",
                    "            this.name = name;",
                    "        }",
                    "    }",
                    "    ",
                    "    // Геттер для age",
                    "    public int getAge() {",
                    "        return age;",
                    "    }",
                    "    ",
                    "    // Сеттер для age с валидацией",
                    "    public void setAge(int age) {",
                    "        if (age >= 0 && age <= 150) {",
                    "            this.age = age;",
                    "        } else {",
                    "            System.out.println(\"Некорректный возраст\");",
                    "        }",
                    "    }",
                    "}",
                    "",
                    "Использование:",
                    "",
                    "Person person = new Person();",
                    "person.setName(\"Иван\");",
                    "person.setAge(25);",
                    "",
                    "System.out.println(person.getName()); // \"Иван\"",
                    "System.out.println(person.getAge());  // 25",
                    "",
                    "Преимущества геттеров и сеттеров:",
                    "• Контроль доступа к данным",
                    "• Валидация данных перед установкой",
                    "• Возможность добавить логику при чтении/записи",
                    "• Инкапсуляция — скрытие внутренней реализации"
                  ]
                },
                {
                  subtitle: "Статические поля и методы",
                  content: [
                    "Статические (static) поля и методы принадлежат классу, а не объекту. Они общие для всех объектов класса.",
                    "",
                    "class Counter {",
                    "    // Статическое поле (общее для всех объектов)",
                    "    static int count = 0;",
                    "    ",
                    "    // Обычное поле (свое для каждого объекта)",
                    "    int id;",
                    "    ",
                    "    Counter() {",
                    "        count++; // Увеличиваем общий счетчик",
                    "        id = count;",
                    "    }",
                    "    ",
                    "    // Статический метод",
                    "    static int getCount() {",
                    "        return count;",
                    "    }",
                    "}",
                    "",
                    "Использование:",
                    "",
                    "Counter c1 = new Counter();",
                    "Counter c2 = new Counter();",
                    "Counter c3 = new Counter();",
                    "",
                    "System.out.println(Counter.getCount()); // 3",
                    "System.out.println(c1.id); // 1",
                    "System.out.println(c2.id); // 2",
                    "System.out.println(c3.id); // 3",
                    "",
                    "Особенности static:",
                    "• Статические методы могут вызываться без создания объекта: ClassName.methodName()",
                    "• Статические методы не могут обращаться к нестатическим полям и методам",
                    "• Статические поля инициализируются один раз при загрузке класса",
                    "• Часто используются для утилитных методов (например, Math.max(), Math.min())"
                  ]
                },
                {
                  subtitle: "Метод toString()",
                  content: [
                    "Метод toString() возвращает строковое представление объекта. Он автоматически вызывается при выводе объекта.",
                    "",
                    "class Person {",
                    "    private String name;",
                    "    private int age;",
                    "    ",
                    "    Person(String name, int age) {",
                    "        this.name = name;",
                    "        this.age = age;",
                    "    }",
                    "    ",
                    "    @Override",
                    "    public String toString() {",
                    "        return \"Person{name='\" + name + \"', age=\" + age + '}';",
                    "    }",
                    "}",
                    "",
                    "Использование:",
                    "",
                    "Person person = new Person(\"Иван\", 25);",
                    "",
                    "System.out.println(person);",
                    "// Автоматически вызывается toString()",
                    "// Вывод: Person{name='Иван', age=25}",
                    "",
                    "String info = person.toString();",
                    "System.out.println(info); // Person{name='Иван', age=25}",
                    "",
                    "Без переопределения toString() вывод будет примерно таким:",
                    "Person@2f92e0f4 (имя класса + @ + хеш-код объекта)"
                  ]
                },
                {
                  subtitle: "Практический пример: класс BankAccount",
                  content: [
                    "Рассмотрим полный пример класса с использованием всех изученных концепций:",
                    "",
                    "class BankAccount {",
                    "    // Поля класса",
                    "    private String accountNumber;",
                    "    private String ownerName;",
                    "    private double balance;",
                    "    ",
                    "    // Конструктор",
                    "    public BankAccount(String accountNumber, String ownerName) {",
                    "        this.accountNumber = accountNumber;",
                    "        this.ownerName = ownerName;",
                    "        this.balance = 0.0;",
                    "    }",
                    "    ",
                    "    // Геттеры",
                    "    public String getAccountNumber() {",
                    "        return accountNumber;",
                    "    }",
                    "    ",
                    "    public String getOwnerName() {",
                    "        return ownerName;",
                    "    }",
                    "    ",
                    "    public double getBalance() {",
                    "        return balance;",
                    "    }",
                    "    ",
                    "    // Методы для работы со счетом",
                    "    public void deposit(double amount) {",
                    "        if (amount > 0) {",
                    "            balance += amount;",
                    "            System.out.println(\"Пополнение: \" + amount);",
                    "        } else {",
                    "            System.out.println(\"Сумма должна быть положительной\");",
                    "        }",
                    "    }",
                    "    ",
                    "    public boolean withdraw(double amount) {",
                    "        if (amount > 0 && amount <= balance) {",
                    "            balance -= amount;",
                    "            System.out.println(\"Снятие: \" + amount);",
                    "            return true;",
                    "        } else {",
                    "            System.out.println(\"Недостаточно средств или неверная сумма\");",
                    "            return false;",
                    "        }",
                    "    }",
                    "    ",
                    "    @Override",
                    "    public String toString() {",
                    "        return \"BankAccount{accountNumber='\" + accountNumber +",
                    "                \"', ownerName='\" + ownerName +",
                    "                \"', balance=\" + balance + '}';",
                    "    }",
                    "}",
                    "",
                    "Использование:",
                    "",
                    "BankAccount account = new BankAccount(\"12345\", \"Иван Иванов\");",
                    "account.deposit(1000.0);",
                    "account.withdraw(300.0);",
                    "",
                    "System.out.println(account.getBalance()); // 700.0",
                    "System.out.println(account); // BankAccount{accountNumber='12345', ownerName='Иван Иванов', balance=700.0}"
                  ]
                },
                {
                  subtitle: "Ключевые моменты",
                  content: [
                    "1. Класс — это шаблон, объект — конкретный экземпляр",
                    "",
                    "2. Поля хранят данные объекта, методы определяют поведение",
                    "",
                    "3. Конструктор инициализирует объект при создании",
                    "",
                    "4. Модификаторы доступа (public, private, protected) контролируют видимость",
                    "",
                    "5. Геттеры и сеттеры обеспечивают безопасный доступ к private полям",
                    "",
                    "6. Статические элементы принадлежат классу, а не объекту",
                    "",
                    "7. Метод toString() возвращает строковое представление объекта",
                    "",
                    "8. Инкапсуляция — скрытие внутренней реализации и предоставление контролируемого доступа"
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

