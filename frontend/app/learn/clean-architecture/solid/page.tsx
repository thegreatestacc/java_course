"use client";

import { JetBrains_Mono } from "next/font/google";
import { Header } from "../../../Header";
import { MotivationalQuotes } from "../../../MotivationalQuotes";
import { DetailedLesson } from "../../../DetailedLesson";
import { Footer } from "../../../components/Footer";
import Link from "next/link";

const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export default function SolidPage() {
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
          </div>
        </nav>

        <Header leftButton={{ href: "/learn/clean-architecture", text: "← Назад к подтемам" }} />
        <MotivationalQuotes />
        <main>
          <section className="mx-auto max-w-6xl px-5 py-14 md:py-20">
            <DetailedLesson
              materialId="learn/clean-architecture/solid"
              title="Принципы SOLID"
              description="Изучи пять фундаментальных принципов объектно-ориентированного программирования: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation и Dependency Inversion."
              sections={[
                {
                  subtitle: "Принципы SOLID",
                  content: [
                    "SOLID — это пять принципов объектно-ориентированного программирования, которые помогают писать чистый код.",
                    "",
                    "S — Single Responsibility Principle (Принцип единственной ответственности):",
                    "Класс должен иметь только одну причину для изменения. Каждый класс должен отвечать только за одну задачу.",
                    "",
                    "Пример нарушения:",
                    "class User {",
                    "  void saveToDatabase() { ... }",
                    "  void sendEmail() { ... }",
                    "  void generateReport() { ... }",
                    "}",
                    "",
                    "Правильный подход:",
                    "class User { ... }",
                    "class UserRepository { void save(User user) { ... } }",
                    "class EmailService { void send(User user) { ... } }",
                    "class ReportGenerator { void generate(User user) { ... } }",
                    "",
                    "O — Open/Closed Principle (Принцип открытости/закрытости):",
                    "Программные сущности должны быть открыты для расширения, но закрыты для модификации.",
                    "",
                    "Пример:",
                    "// Плохо — нужно изменять класс при добавлении нового типа",
                    "class PaymentProcessor {",
                    "  void process(String type) {",
                    "    if (type.equals(\"credit\")) { ... }",
                    "    else if (type.equals(\"paypal\")) { ... }",
                    "  }",
                    "}",
                    "",
                    "// Хорошо — расширяем через интерфейс",
                    "interface PaymentMethod { void pay(); }",
                    "class CreditCardPayment implements PaymentMethod { ... }",
                    "class PayPalPayment implements PaymentMethod { ... }",
                    "",
                    "L — Liskov Substitution Principle (Принцип подстановки Лисков):",
                    "Объекты в программе должны заменяться экземплярами их подтипов без изменения корректности программы.",
                    "",
                    "Пример нарушения:",
                    "class Bird { void fly() { ... } }",
                    "class Penguin extends Bird {",
                    "  void fly() { throw new Exception(\"Пингвины не летают!\"); }",
                    "}",
                    "",
                    "Правильный подход:",
                    "interface Flyable { void fly(); }",
                    "class Bird implements Flyable { void fly() { ... } }",
                    "class Penguin { /* не реализует Flyable */ }",
                    "",
                    "I — Interface Segregation Principle (Принцип разделения интерфейса):",
                    "Клиенты не должны зависеть от интерфейсов, которые они не используют.",
                    "",
                    "Пример нарушения:",
                    "interface Worker {",
                    "  void work();",
                    "  void eat();",
                    "  void sleep();",
                    "}",
                    "",
                    "Правильный подход:",
                    "interface Workable { void work(); }",
                    "interface Eatable { void eat(); }",
                    "interface Sleepable { void sleep(); }",
                    "",
                    "D — Dependency Inversion Principle (Принцип инверсии зависимостей):",
                    "Модули высокого уровня не должны зависеть от модулей низкого уровня. Оба должны зависеть от абстракций.",
                    "",
                    "Пример нарушения:",
                    "class UserService {",
                    "  private MySQLDatabase database; // зависимость от конкретной реализации",
                    "}",
                    "",
                    "Правильный подход:",
                    "interface Database { void save(User user); }",
                    "class UserService {",
                    "  private Database database; // зависимость от абстракции",
                    "}"
                  ]
                }
              ]}
            />
          </section>
        </main>
        <Footer backLink={{ href: "/learn/clean-architecture", text: "Назад к подтемам" }} />
      </div>
    </div>
  );
}






