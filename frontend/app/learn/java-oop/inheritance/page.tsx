"use client";

// app/learn/java-oop/inheritance/page.tsx
// Страница с обучающим материалом по наследованию

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

export default function InheritancePage() {
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
              materialId="learn/java-oop/inheritance"
              title="Наследование"
              description="Изучи наследование в Java: как создавать подклассы, использовать ключевое слово extends, переопределять методы и работать с иерархией классов."
              sections={[
                {
                  subtitle: "Что такое наследование",
                  content: [
                    "Наследование — это механизм ООП, позволяющий создавать новый класс на основе существующего класса.",
                    "",
                    "Преимущества наследования:",
                    "• Переиспользование кода — не нужно дублировать код",
                    "• Расширяемость — можно добавлять новую функциональность",
                    "• Иерархия классов — логическая организация кода",
                    "",
                    "Терминология:",
                    "• Родительский класс (суперкласс, базовый класс) — класс, от которого наследуются",
                    "• Дочерний класс (подкласс, производный класс) — класс, который наследуется",
                    "",
                    "Пример:",
                    "",
                    "// Родительский класс",
                    "class Animal {",
                    "    String name;",
                    "    ",
                    "    void eat() {",
                    "        System.out.println(name + \" ест\");",
                    "    }",
                    "}",
                    "",
                    "// Дочерний класс",
                    "class Dog extends Animal {",
                    "    void bark() {",
                    "        System.out.println(name + \" лает\");",
                    "    }",
                    "}",
                    "",
                    "Dog dog = new Dog();",
                    "dog.name = \"Бобик\";",
                    "dog.eat();  // Бобик ест (метод унаследован)",
                    "dog.bark(); // Бобик лает (свой метод)"
                  ]
                },
                {
                  subtitle: "Ключевое слово extends",
                  content: [
                    "Для наследования в Java используется ключевое слово extends:",
                    "",
                    "class ChildClass extends ParentClass {",
                    "    // новый код",
                    "}",
                    "",
                    "Пример:",
                    "",
                    "class Vehicle {",
                    "    String brand;",
                    "    int speed;",
                    "    ",
                    "    void start() {",
                    "        System.out.println(brand + \" заводится\");",
                    "    }",
                    "}",
                    "",
                    "class Car extends Vehicle {",
                    "    int numberOfDoors;",
                    "    ",
                    "    void openDoors() {",
                    "        System.out.println(\"Открыто \" + numberOfDoors + \" дверей\");",
                    "    }",
                    "}",
                    "",
                    "Использование:",
                    "",
                    "Car car = new Car();",
                    "car.brand = \"Toyota\";      // Унаследованное поле",
                    "car.speed = 120;             // Унаследованное поле",
                    "car.numberOfDoors = 4;       // Свое поле",
                    "",
                    "car.start();                 // Унаследованный метод",
                    "car.openDoors();             // Свой метод",
                    "",
                    "Важно:",
                    "• В Java можно наследоваться только от одного класса (одиночное наследование)",
                    "• Все классы в Java неявно наследуются от класса Object",
                    "• Дочерний класс получает доступ ко всем public и protected полям и методам родителя"
                  ]
                },
                {
                  subtitle: "Переопределение методов (Override)",
                  content: [
                    "Переопределение метода — это замена реализации метода родительского класса в дочернем классе.",
                    "",
                    "Для переопределения используется аннотация @Override:",
                    "",
                    "class Animal {",
                    "    void makeSound() {",
                    "        System.out.println(\"Животное издает звук\");",
                    "    }",
                    "}",
                    "",
                    "class Dog extends Animal {",
                    "    @Override",
                    "    void makeSound() {",
                    "        System.out.println(\"Гав-гав!\");",
                    "    }",
                    "}",
                    "",
                    "class Cat extends Animal {",
                    "    @Override",
                    "    void makeSound() {",
                    "        System.out.println(\"Мяу-мяу!\");",
                    "    }",
                    "}",
                    "",
                    "Использование:",
                    "",
                    "Animal animal1 = new Dog();",
                    "Animal animal2 = new Cat();",
                    "",
                    "animal1.makeSound(); // Гав-гав!",
                    "animal2.makeSound(); // Мяу-мяу!",
                    "",
                    "Правила переопределения:",
                    "• Сигнатура метода должна совпадать (имя, параметры, возвращаемый тип)",
                    "• Модификатор доступа не может быть более строгим",
                    "• Нельзя переопределить final методы",
                    "• Нельзя переопределить static методы (это будет скрытие метода, а не переопределение)"
                  ]
                },
                {
                  subtitle: "Ключевое слово super",
                  content: [
                    "super — это ссылка на родительский класс. Используется для:",
                    "• Вызова конструктора родительского класса",
                    "• Доступа к полям и методам родительского класса",
                    "",
                    "Вызов конструктора родителя:",
                    "",
                    "class Animal {",
                    "    String name;",
                    "    ",
                    "    Animal(String name) {",
                    "        this.name = name;",
                    "    }",
                    "}",
                    "",
                    "class Dog extends Animal {",
                    "    String breed;",
                    "    ",
                    "    Dog(String name, String breed) {",
                    "        super(name); // Вызов конструктора родителя",
                    "        this.breed = breed;",
                    "    }",
                    "}",
                    "",
                    "Использование:",
                    "",
                    "Dog dog = new Dog(\"Бобик\", \"Овчарка\");",
                    "System.out.println(dog.name);  // Бобик",
                    "System.out.println(dog.breed); // Овчарка",
                    "",
                    "Вызов метода родителя:",
                    "",
                    "class Animal {",
                    "    void eat() {",
                    "        System.out.println(\"Животное ест\");",
                    "    }",
                    "}",
                    "",
                    "class Dog extends Animal {",
                    "    @Override",
                    "    void eat() {",
                    "        super.eat(); // Вызов метода родителя",
                    "        System.out.println(\"Собака ест из миски\");",
                    "    }",
                    "}",
                    "",
                    "Dog dog = new Dog();",
                    "dog.eat();",
                    "// Вывод:",
                    "// Животное ест",
                    "// Собака ест из миски",
                    "",
                    "Доступ к полю родителя:",
                    "",
                    "class Animal {",
                    "    protected String name;",
                    "}",
                    "",
                    "class Dog extends Animal {",
                    "    void setName(String name) {",
                    "        super.name = name; // Доступ к полю родителя",
                    "    }",
                    "}"
                  ]
                },
                {
                  subtitle: "Конструкторы и наследование",
                  content: [
                    "При создании объекта дочернего класса сначала вызывается конструктор родительского класса.",
                    "",
                    "Правила:",
                    "• Если в дочернем классе не указан вызов super(), компилятор автоматически добавит вызов super() (конструктор без параметров)",
                    "• Вызов super() должен быть первой строкой в конструкторе",
                    "",
                    "Пример:",
                    "",
                    "class Animal {",
                    "    String name;",
                    "    ",
                    "    Animal() {",
                    "        System.out.println(\"Конструктор Animal\");",
                    "    }",
                    "    ",
                    "    Animal(String name) {",
                    "        this.name = name;",
                    "        System.out.println(\"Конструктор Animal с параметром\");",
                    "    }",
                    "}",
                    "",
                    "class Dog extends Animal {",
                    "    String breed;",
                    "    ",
                    "    Dog(String name, String breed) {",
                    "        super(name); // Должен быть первым!",
                    "        this.breed = breed;",
                    "        System.out.println(\"Конструктор Dog\");",
                    "    }",
                    "}",
                    "",
                    "Dog dog = new Dog(\"Бобик\", \"Овчарка\");",
                    "// Вывод:",
                    "// Конструктор Animal с параметром",
                    "// Конструктор Dog",
                    "",
                    "Если в родителе нет конструктора без параметров:",
                    "",
                    "class Animal {",
                    "    String name;",
                    "    ",
                    "    Animal(String name) {",
                    "        this.name = name;",
                    "    }",
                    "}",
                    "",
                    "class Dog extends Animal {",
                    "    // ОШИБКА! Нужно явно вызвать super(name)",
                    "    Dog() {",
                    "        super(\"Безымянный\"); // Обязательно!",
                    "    }",
                    "}"
                  ]
                },
                {
                  subtitle: "Модификаторы доступа и наследование",
                  content: [
                    "Модификаторы доступа влияют на то, что может быть унаследовано:",
                    "",
                    "class Parent {",
                    "    public int publicField;      // Доступен везде",
                    "    protected int protectedField; // Доступен в классе и подклассах",
                    "    int packageField;            // Доступен в том же пакете",
                    "    private int privateField;     // НЕ наследуется, доступен только в Parent",
                    "    ",
                    "    public void publicMethod() {}",
                    "    protected void protectedMethod() {}",
                    "    void packageMethod() {}",
                    "    private void privateMethod() {} // НЕ наследуется",
                    "}",
                    "",
                    "class Child extends Parent {",
                    "    void test() {",
                    "        publicField = 1;        // OK",
                    "        protectedField = 2;    // OK",
                    "        packageField = 3;      // OK (если в том же пакете)",
                    "        // privateField = 4;   // ОШИБКА!",
                    "",
                    "        publicMethod();         // OK",
                    "        protectedMethod();      // OK",
                    "        packageMethod();        // OK (если в том же пакете)",
                    "        // privateMethod();     // ОШИБКА!",
                    "    }",
                    "}",
                    "",
                    "Важно:",
                    "• private поля и методы НЕ наследуются",
                    "• protected позволяет доступ в подклассах, даже если они в другом пакете",
                    "• При переопределении метода нельзя сделать его более закрытым (например, public -> private)"
                  ]
                },
                {
                  subtitle: "Иерархия классов",
                  content: [
                    "Иерархия классов — это структура классов, связанных наследованием.",
                    "",
                    "Пример иерархии:",
                    "",
                    "class Animal {",
                    "    String name;",
                    "    void eat() {",
                    "        System.out.println(\"Ест\");",
                    "    }",
                    "}",
                    "",
                    "class Mammal extends Animal {",
                    "    void giveBirth() {",
                    "        System.out.println(\"Рожает детенышей\");",
                    "    }",
                    "}",
                    "",
                    "class Dog extends Mammal {",
                    "    void bark() {",
                    "        System.out.println(\"Лает\");",
                    "    }",
                    "}",
                    "",
                    "class Cat extends Mammal {",
                    "    void meow() {",
                    "        System.out.println(\"Мяукает\");",
                    "    }",
                    "}",
                    "",
                    "Иерархия:",
                    "Object -> Animal -> Mammal -> Dog",
                    "                          -> Cat",
                    "",
                    "Dog наследует от Mammal, который наследует от Animal, который наследует от Object.",
                    "",
                    "Использование:",
                    "",
                    "Dog dog = new Dog();",
                    "dog.name = \"Бобик\";",
                    "dog.eat();        // Унаследовано от Animal",
                    "dog.giveBirth();  // Унаследовано от Mammal",
                    "dog.bark();       // Свой метод",
                    "",
                    "Преимущества иерархии:",
                    "• Логическая организация кода",
                    "• Переиспользование кода на разных уровнях",
                    "• Полиморфизм (рассмотрим в следующей теме)"
                  ]
                },
                {
                  subtitle: "Множественное наследование",
                  content: [
                    "В Java НЕТ множественного наследования классов (нельзя наследоваться от нескольких классов одновременно).",
                    "",
                    "Это НЕ разрешено:",
                    "",
                    "class A { }",
                    "class B { }",
                    "class C extends A, B { } // ОШИБКА!",
                    "",
                    "Почему нет множественного наследования?",
                    "• Избежание проблемы \"ромба\" (diamond problem)",
                    "• Упрощение языка и компилятора",
                    "• Предотвращение конфликтов методов",
                    "",
                    "Пример проблемы \"ромба\":",
                    "",
                    "// Если бы было разрешено:",
                    "class A {",
                    "    void method() { }",
                    "}",
                    "",
                    "class B extends A {",
                    "    @Override",
                    "    void method() { }",
                    "}",
                    "",
                    "class C extends A {",
                    "    @Override",
                    "    void method() { }",
                    "}",
                    "",
                    "class D extends B, C { // Какой method() использовать?",
                    "}",
                    "",
                    "Решение:",
                    "• Для множественного наследования поведения используются интерфейсы (рассмотрим в теме \"Полиморфизм\")",
                    "• Интерфейсы могут иметь множественное наследование"
                  ]
                },
                {
                  subtitle: "Ключевое слово final",
                  content: [
                    "Ключевое слово final может применяться к классам, методам и переменным:",
                    "",
                    "1. final класс — нельзя наследоваться:",
                    "",
                    "final class Animal {",
                    "    // код",
                    "}",
                    "",
                    "class Dog extends Animal { } // ОШИБКА!",
                    "",
                    "Примеры final классов в Java: String, Integer, Math",
                    "",
                    "2. final метод — нельзя переопределить:",
                    "",
                    "class Animal {",
                    "    final void eat() {",
                    "        System.out.println(\"Ест\");",
                    "    }",
                    "}",
                    "",
                    "class Dog extends Animal {",
                    "    @Override",
                    "    void eat() { } // ОШИБКА!",
                    "}",
                    "",
                    "3. final переменная — константа (нельзя изменить значение):",
                    "",
                    "class Circle {",
                    "    final double PI = 3.14159;",
                    "    final int radius;",
                    "    ",
                    "    Circle(int radius) {",
                    "        this.radius = radius; // Можно установить один раз",
                    "    }",
                    "    ",
                    "    void test() {",
                    "        // radius = 10; // ОШИБКА!",
                    "    }",
                    "}"
                  ]
                },
                {
                  subtitle: "Практический пример: иерархия сотрудников",
                  content: [
                    "Рассмотрим полный пример с наследованием:",
                    "",
                    "class Employee {",
                    "    protected String name;",
                    "    protected double salary;",
                    "    ",
                    "    public Employee(String name, double salary) {",
                    "        this.name = name;",
                    "        this.salary = salary;",
                    "    }",
                    "    ",
                    "    public void work() {",
                    "        System.out.println(name + \" работает\");",
                    "    }",
                    "    ",
                    "    public void getSalary() {",
                    "        System.out.println(name + \" получает \" + salary);",
                    "    }",
                    "}",
                    "",
                    "class Manager extends Employee {",
                    "    private int teamSize;",
                    "    ",
                    "    public Manager(String name, double salary, int teamSize) {",
                    "        super(name, salary);",
                    "        this.teamSize = teamSize;",
                    "    }",
                    "    ",
                    "    @Override",
                    "    public void work() {",
                    "        System.out.println(name + \" управляет командой из \" + teamSize + \" человек\");",
                    "    }",
                    "    ",
                    "    public void conductMeeting() {",
                    "        System.out.println(name + \" проводит встречу\");",
                    "    }",
                    "}",
                    "",
                    "class Developer extends Employee {",
                    "    private String programmingLanguage;",
                    "    ",
                    "    public Developer(String name, double salary, String programmingLanguage) {",
                    "        super(name, salary);",
                    "        this.programmingLanguage = programmingLanguage;",
                    "    }",
                    "    ",
                    "    @Override",
                    "    public void work() {",
                    "        System.out.println(name + \" пишет код на \" + programmingLanguage);",
                    "    }",
                    "    ",
                    "    public void debug() {",
                    "        System.out.println(name + \" отлаживает код\");",
                    "    }",
                    "}",
                    "",
                    "Использование:",
                    "",
                    "Manager manager = new Manager(\"Иван\", 100000, 5);",
                    "Developer developer = new Developer(\"Мария\", 80000, \"Java\");",
                    "",
                    "manager.work();           // Иван управляет командой из 5 человек",
                    "manager.getSalary();      // Иван получает 100000.0",
                    "manager.conductMeeting(); // Иван проводит встречу",
                    "",
                    "developer.work();         // Мария пишет код на Java",
                    "developer.getSalary();    // Мария получает 80000.0",
                    "developer.debug();        // Мария отлаживает код"
                  ]
                },
                {
                  subtitle: "Ключевые моменты",
                  content: [
                    "1. Наследование позволяет переиспользовать код и создавать иерархии классов",
                    "",
                    "2. Ключевое слово extends используется для наследования",
                    "",
                    "3. @Override используется для переопределения методов",
                    "",
                    "4. super используется для доступа к родительскому классу",
                    "",
                    "5. Конструктор родителя вызывается первым при создании объекта",
                    "",
                    "6. В Java только одиночное наследование классов",
                    "",
                    "7. final класс нельзя наследовать, final метод нельзя переопределить",
                    "",
                    "8. private элементы не наследуются",
                    "",
                    "9. Все классы наследуются от Object"
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

