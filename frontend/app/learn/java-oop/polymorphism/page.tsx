"use client";

// app/learn/java-oop/polymorphism/page.tsx
// Страница с обучающим материалом по полиморфизму

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

export default function PolymorphismPage() {
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
              materialId="learn/java-oop/polymorphism"
              title="Полиморфизм"
              description="Изучи полиморфизм в Java: как один интерфейс может представлять разные типы, работа с абстрактными классами и интерфейсами, и практическое применение полиморфизма."
              sections={[
                {
                  subtitle: "Что такое полиморфизм",
                  content: [
                    "Полиморфизм (от греческого \"много форм\") — это способность объектов разных классов обрабатываться через один и тот же интерфейс.",
                    "",
                    "Простыми словами: один интерфейс — множество реализаций.",
                    "",
                    "Типы полиморфизма в Java:",
                    "• Полиморфизм времени выполнения (Runtime Polymorphism) — через наследование и переопределение методов",
                    "• Полиморфизм времени компиляции (Compile-time Polymorphism) — через перегрузку методов",
                    "",
                    "Пример полиморфизма:",
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
                    "Animal animal1 = new Dog();",
                    "Animal animal2 = new Cat();",
                    "",
                    "animal1.makeSound(); // Гав-гав!",
                    "animal2.makeSound(); // Мяу-мяу!",
                    "",
                    "Один и тот же метод makeSound() ведет себя по-разному в зависимости от типа объекта."
                  ]
                },
                {
                  subtitle: "Полиморфизм через наследование",
                  content: [
                    "Полиморфизм позволяет использовать объект дочернего класса через ссылку родительского класса.",
                    "",
                    "class Shape {",
                    "    void draw() {",
                    "        System.out.println(\"Рисую фигуру\");",
                    "    }",
                    "}",
                    "",
                    "class Circle extends Shape {",
                    "    @Override",
                    "    void draw() {",
                    "        System.out.println(\"Рисую круг\");",
                    "    }",
                    "}",
                    "",
                    "class Rectangle extends Shape {",
                    "    @Override",
                    "    void draw() {",
                    "        System.out.println(\"Рисую прямоугольник\");",
                    "    }",
                    "}",
                    "",
                    "Использование полиморфизма:",
                    "",
                    "Shape shape1 = new Circle();",
                    "Shape shape2 = new Rectangle();",
                    "",
                    "shape1.draw(); // Рисую круг",
                    "shape2.draw(); // Рисую прямоугольник",
                    "",
                    "Массив разных объектов:",
                    "",
                    "Shape[] shapes = {",
                    "    new Circle(),",
                    "    new Rectangle(),",
                    "    new Circle()",
                    "};",
                    "",
                    "for (Shape shape : shapes) {",
                    "    shape.draw(); // Вызывается правильный метод для каждого объекта",
                    "}",
                    "",
                    "Преимущества:",
                    "• Гибкость кода",
                    "• Легкость расширения (можно добавить новые классы без изменения существующего кода)",
                    "• Единый интерфейс для разных типов"
                  ]
                },
                {
                  subtitle: "Абстрактные классы",
                  content: [
                    "Абстрактный класс — это класс, который нельзя инстанцировать (создать объект). Он используется как базовый класс для других классов.",
                    "",
                    "Особенности:",
                    "• Объявляется с ключевым словом abstract",
                    "• Может содержать абстрактные методы (без реализации)",
                    "• Может содержать обычные методы с реализацией",
                    "• Может содержать поля и конструкторы",
                    "",
                    "Пример:",
                    "",
                    "abstract class Animal {",
                    "    String name;",
                    "    ",
                    "    // Абстрактный метод (без реализации)",
                    "    abstract void makeSound();",
                    "    ",
                    "    // Обычный метод (с реализацией)",
                    "    void sleep() {",
                    "        System.out.println(name + \" спит\");",
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
                    "// Animal animal = new Animal(); // ОШИБКА! Нельзя создать объект абстрактного класса",
                    "",
                    "Animal dog = new Dog();",
                    "dog.name = \"Бобик\";",
                    "dog.makeSound(); // Гав-гав!",
                    "dog.sleep();     // Бобик спит",
                    "",
                    "Когда использовать абстрактные классы:",
                    "• Когда нужно предоставить общую реализацию для подклассов",
                    "• Когда нужно определить общий интерфейс, но некоторые методы должны быть реализованы в подклассах",
                    "• Когда есть общие поля и методы, которые должны быть унаследованы"
                  ]
                },
                {
                  subtitle: "Интерфейсы",
                  content: [
                    "Интерфейс — это контракт, который определяет, какие методы должен реализовать класс.",
                    "",
                    "Особенности интерфейсов:",
                    "• Объявляется с ключевым словом interface",
                    "• Все методы по умолчанию public и abstract (до Java 8)",
                    "• Класс может реализовывать несколько интерфейсов",
                    "• Интерфейсы не могут содержать поля (только константы)",
                    "",
                    "Пример:",
                    "",
                    "interface Drawable {",
                    "    void draw();",
                    "}",
                    "",
                    "interface Movable {",
                    "    void move(int x, int y);",
                    "}",
                    "",
                    "class Circle implements Drawable, Movable {",
                    "    @Override",
                    "    public void draw() {",
                    "        System.out.println(\"Рисую круг\");",
                    "    }",
                    "    ",
                    "    @Override",
                    "    public void move(int x, int y) {",
                    "        System.out.println(\"Перемещаю круг в (\" + x + \", \" + y + \")\");",
                    "    }",
                    "}",
                    "",
                    "Использование:",
                    "",
                    "Drawable drawable = new Circle();",
                    "drawable.draw();",
                    "",
                    "Movable movable = new Circle();",
                    "movable.move(10, 20);",
                    "",
                    "Circle circle = new Circle();",
                    "circle.draw();",
                    "circle.move(10, 20);",
                    "",
                    "Преимущества интерфейсов:",
                    "• Множественное наследование поведения",
                    "• Слабая связанность (loose coupling)",
                    "• Легкость тестирования (можно создать mock-объекты)",
                    "• Определение контракта без реализации"
                  ]
                },
                {
                  subtitle: "Интерфейсы в Java 8+",
                  content: [
                    "Начиная с Java 8, интерфейсы могут содержать:",
                    "",
                    "1. Методы по умолчанию (default methods):",
                    "",
                    "interface Vehicle {",
                    "    void start();",
                    "    ",
                    "    // Метод по умолчанию",
                    "    default void stop() {",
                    "        System.out.println(\"Транспорт остановлен\");",
                    "    }",
                    "}",
                    "",
                    "class Car implements Vehicle {",
                    "    @Override",
                    "    public void start() {",
                    "        System.out.println(\"Машина заведена\");",
                    "    }",
                    "    // stop() не нужно переопределять, используется реализация по умолчанию",
                    "}",
                    "",
                    "2. Статические методы:",
                    "",
                    "interface MathUtils {",
                    "    static int add(int a, int b) {",
                    "        return a + b;",
                    "    }",
                    "}",
                    "",
                    "int result = MathUtils.add(5, 3); // 8",
                    "",
                    "3. Приватные методы (Java 9+):",
                    "",
                    "interface Calculator {",
                    "    default int calculate(int a, int b) {",
                    "        return helper(a, b);",
                    "    }",
                    "    ",
                    "    private int helper(int a, int b) {",
                    "        return a + b;",
                    "    }",
                    "}"
                  ]
                },
                {
                  subtitle: "Абстрактные классы vs Интерфейсы",
                  content: [
                    "Когда использовать абстрактные классы:",
                    "• Когда нужно предоставить общую реализацию методов",
                    "• Когда есть общие поля, которые должны быть унаследованы",
                    "• Когда классы в иерархии тесно связаны",
                    "• Когда нужно использовать конструкторы",
                    "",
                    "Когда использовать интерфейсы:",
                    "• Когда нужно определить контракт без реализации",
                    "• Когда класс должен реализовывать несколько интерфейсов",
                    "• Когда нужна слабая связанность",
                    "• Когда нужно обеспечить полиморфизм для несвязанных классов",
                    "",
                    "Пример комбинации:",
                    "",
                    "abstract class Animal {",
                    "    String name;",
                    "    ",
                    "    abstract void makeSound();",
                    "    ",
                    "    void sleep() {",
                    "        System.out.println(name + \" спит\");",
                    "    }",
                    "}",
                    "",
                    "interface Swimmable {",
                    "    void swim();",
                    "}",
                    "",
                    "interface Flyable {",
                    "    void fly();",
                    "}",
                    "",
                    "class Duck extends Animal implements Swimmable, Flyable {",
                    "    @Override",
                    "    public void makeSound() {",
                    "        System.out.println(\"Кря-кря!\");",
                    "    }",
                    "    ",
                    "    @Override",
                    "    public void swim() {",
                    "        System.out.println(\"Утка плавает\");",
                    "    }",
                    "    ",
                    "    @Override",
                    "    public void fly() {",
                    "        System.out.println(\"Утка летит\");",
                    "    }",
                    "}"
                  ]
                },
                {
                  subtitle: "Приведение типов (Type Casting)",
                  content: [
                    "При полиморфизме часто требуется приведение типов:",
                    "",
                    "1. Восходящее приведение (Upcasting) — автоматическое:",
                    "",
                    "Dog dog = new Dog();",
                    "Animal animal = dog; // Автоматическое приведение",
                    "",
                    "2. Нисходящее приведение (Downcasting) — явное:",
                    "",
                    "Animal animal = new Dog();",
                    "Dog dog = (Dog) animal; // Явное приведение",
                    "",
                    "Проверка типа с помощью instanceof:",
                    "",
                    "Animal animal = new Dog();",
                    "",
                    "if (animal instanceof Dog) {",
                    "    Dog dog = (Dog) animal;",
                    "    dog.bark();",
                    "}",
                    "",
                    "Пример использования:",
                    "",
                    "class Animal { }",
                    "class Dog extends Animal {",
                    "    void bark() { }",
                    "}",
                    "class Cat extends Animal {",
                    "    void meow() { }",
                    "}",
                    "",
                    "Animal[] animals = { new Dog(), new Cat(), new Dog() };",
                    "",
                    "for (Animal animal : animals) {",
                    "    if (animal instanceof Dog) {",
                    "        Dog dog = (Dog) animal;",
                    "        dog.bark();",
                    "    } else if (animal instanceof Cat) {",
                    "        Cat cat = (Cat) animal;",
                    "        cat.meow();",
                    "    }",
                    "}"
                  ]
                },
                {
                  subtitle: "Практический пример: система платежей",
                  content: [
                    "Рассмотрим пример использования полиморфизма в реальном приложении:",
                    "",
                    "interface PaymentMethod {",
                    "    void pay(double amount);",
                    "}",
                    "",
                    "class CreditCard implements PaymentMethod {",
                    "    private String cardNumber;",
                    "    ",
                    "    public CreditCard(String cardNumber) {",
                    "        this.cardNumber = cardNumber;",
                    "    }",
                    "    ",
                    "    @Override",
                    "    public void pay(double amount) {",
                    "        System.out.println(\"Оплата \" + amount + \" руб. картой \" + cardNumber);",
                    "    }",
                    "}",
                    "",
                    "class PayPal implements PaymentMethod {",
                    "    private String email;",
                    "    ",
                    "    public PayPal(String email) {",
                    "        this.email = email;",
                    "    }",
                    "    ",
                    "    @Override",
                    "    public void pay(double amount) {",
                    "        System.out.println(\"Оплата \" + amount + \" руб. через PayPal: \" + email);",
                    "    }",
                    "}",
                    "",
                    "class BankTransfer implements PaymentMethod {",
                    "    private String accountNumber;",
                    "    ",
                    "    public BankTransfer(String accountNumber) {",
                    "        this.accountNumber = accountNumber;",
                    "    }",
                    "    ",
                    "    @Override",
                    "    public void pay(double amount) {",
                    "        System.out.println(\"Перевод \" + amount + \" руб. на счет \" + accountNumber);",
                    "    }",
                    "}",
                    "",
                    "class PaymentProcessor {",
                    "    public void processPayment(PaymentMethod method, double amount) {",
                    "        method.pay(amount);",
                    "    }",
                    "}",
                    "",
                    "Использование:",
                    "",
                    "PaymentProcessor processor = new PaymentProcessor();",
                    "",
                    "PaymentMethod card = new CreditCard(\"1234-5678-9012-3456\");",
                    "PaymentMethod paypal = new PayPal(\"user@example.com\");",
                    "PaymentMethod transfer = new BankTransfer(\"1234567890\");",
                    "",
                    "processor.processPayment(card, 1000.0);",
                    "processor.processPayment(paypal, 500.0);",
                    "processor.processPayment(transfer, 2000.0);",
                    "",
                    "Преимущество: можно легко добавить новые способы оплаты без изменения PaymentProcessor."
                  ]
                },
                {
                  subtitle: "Полиморфизм и коллекции",
                  content: [
                    "Полиморфизм часто используется с коллекциями:",
                    "",
                    "abstract class Employee {",
                    "    String name;",
                    "    abstract double calculateSalary();",
                    "}",
                    "",
                    "class FullTimeEmployee extends Employee {",
                    "    double monthlySalary;",
                    "    ",
                    "    @Override",
                    "    double calculateSalary() {",
                    "        return monthlySalary;",
                    "    }",
                    "}",
                    "",
                    "class PartTimeEmployee extends Employee {",
                    "    double hourlyRate;",
                    "    int hoursWorked;",
                    "    ",
                    "    @Override",
                    "    double calculateSalary() {",
                    "        return hourlyRate * hoursWorked;",
                    "    }",
                    "}",
                    "",
                    "Использование с коллекциями:",
                    "",
                    "List<Employee> employees = new ArrayList<>();",
                    "employees.add(new FullTimeEmployee());",
                    "employees.add(new PartTimeEmployee());",
                    "",
                    "double totalSalary = 0;",
                    "for (Employee employee : employees) {",
                    "    totalSalary += employee.calculateSalary();",
                    "    // Вызывается правильный метод для каждого типа",
                    "}",
                    "",
                    "System.out.println(\"Общая зарплата: \" + totalSalary);"
                  ]
                },
                {
                  subtitle: "Ключевые моменты",
                  content: [
                    "1. Полиморфизм позволяет обрабатывать разные типы через один интерфейс",
                    "",
                    "2. Абстрактные классы используются для предоставления общей реализации",
                    "",
                    "3. Интерфейсы определяют контракт без реализации",
                    "",
                    "4. Класс может реализовывать несколько интерфейсов",
                    "",
                    "5. Приведение типов используется для доступа к специфичным методам",
                    "",
                    "6. instanceof используется для проверки типа перед приведением",
                    "",
                    "7. Полиморфизм делает код гибким и расширяемым",
                    "",
                    "8. Один интерфейс — множество реализаций"
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

