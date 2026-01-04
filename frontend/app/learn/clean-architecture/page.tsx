"use client";

// app/learn/clean-architecture/page.tsx
// Страница с материалом по чистой архитектуре сервисов

import { JetBrains_Mono } from "next/font/google";
import { Header } from "../../Header";
import { MotivationalQuotes } from "../../MotivationalQuotes";
import { DetailedLesson } from "../../DetailedLesson";
import Link from "next/link";
import { usePathname } from "next/navigation";

const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export default function CleanArchitecturePage() {
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
          </div>
        </nav>

        <Header leftButton={{ href: "/learn", text: "← Назад к уровням" }} />
        <MotivationalQuotes />
        <main>
          <section className="mx-auto max-w-6xl px-5 py-14 md:py-20">
            <DetailedLesson
              materialId="learn/clean-architecture"
              title="Чистая архитектура сервисов"
              description="Изучи принципы SOLID, KISS, DRY и другие подходы к проектированию чистого, поддерживаемого и масштабируемого кода."
              sections={[
                {
                  subtitle: "Что такое чистая архитектура",
                  content: [
                    "Чистая архитектура — это подход к проектированию программного обеспечения, который делает код более понятным, тестируемым и поддерживаемым.",
                    "",
                    "Основные цели чистой архитектуры:",
                    "• Независимость от фреймворков — бизнес-логика не зависит от внешних библиотек",
                    "• Тестируемость — код легко тестировать без UI, БД и других внешних зависимостей",
                    "• Независимость от UI — можно легко заменить веб-интерфейс на консольный или мобильный",
                    "• Независимость от БД — можно перейти с MySQL на PostgreSQL без изменения бизнес-логики",
                    "• Независимость от внешних сервисов — бизнес-правила не зависят от внешних API",
                    "",
                    "Чистая архитектура помогает создавать код, который легко изменять, расширять и поддерживать."
                  ]
                },
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
                },
                {
                  subtitle: "KISS (Keep It Simple, Stupid)",
                  content: [
                    "KISS — принцип, который гласит: \"Делай проще\". Большинство систем работают лучше всего, если они остаются простыми, а не усложняются.",
                    "",
                    "Правила KISS:",
                    "• Не усложняй решение без необходимости",
                    "• Простое решение часто лучше сложного",
                    "• Избегай преждевременной оптимизации",
                    "• Пиши код так, чтобы его мог понять любой разработчик",
                    "",
                    "Пример нарушения KISS:",
                    "public boolean isEven(int number) {",
                    "  return number % 2 == 0 ? true : false;",
                    "}",
                    "",
                    "Правильный подход:",
                    "public boolean isEven(int number) {",
                    "  return number % 2 == 0;",
                    "}",
                    "",
                    "KISS не означает, что нужно писать плохой код. Это означает, что нужно выбирать самое простое решение, которое решает задачу."
                  ]
                },
                {
                  subtitle: "DRY (Don't Repeat Yourself)",
                  content: [
                    "DRY — принцип, который гласит: \"Каждая часть знания должна иметь единственное, однозначное представление в системе\".",
                    "",
                    "Почему DRY важен:",
                    "• Уменьшает дублирование кода",
                    "• Упрощает поддержку — изменения нужно делать в одном месте",
                    "• Снижает вероятность ошибок",
                    "• Улучшает читаемость кода",
                    "",
                    "Пример нарушения DRY:",
                    "public void processOrder1(Order order) {",
                    "  validateOrder(order);",
                    "  calculateTotal(order);",
                    "  sendEmail(order.getCustomer(), \"Order #1 processed\");",
                    "}",
                    "",
                    "public void processOrder2(Order order) {",
                    "  validateOrder(order);",
                    "  calculateTotal(order);",
                    "  sendEmail(order.getCustomer(), \"Order #2 processed\");",
                    "}",
                    "",
                    "Правильный подход:",
                    "public void processOrder(Order order) {",
                    "  validateOrder(order);",
                    "  calculateTotal(order);",
                    "  sendEmail(order.getCustomer(), \"Order #\" + order.getId() + \" processed\");",
                    "}",
                    "",
                    "Когда можно нарушить DRY:",
                    "• Если дублирование минимально и извлечение в метод усложнит код",
                    "• Если две похожие части кода могут развиваться в разных направлениях",
                    "• Если абстракция будет слишком сложной"
                  ]
                },
                {
                  subtitle: "YAGNI (You Aren't Gonna Need It)",
                  content: [
                    "YAGNI — принцип, который гласит: \"Не добавляй функциональность, пока она действительно не нужна\".",
                    "",
                    "Почему YAGNI важен:",
                    "• Предотвращает переусложнение кода",
                    "• Экономит время на разработку ненужных функций",
                    "• Упрощает поддержку кода",
                    "• Позволяет сосредоточиться на реальных потребностях",
                    "",
                    "Пример нарушения YAGNI:",
                    "// Создаем сложную систему логирования, хотя пока нужен только простой лог",
                    "class Logger {",
                    "  void logToFile() { ... }",
                    "  void logToDatabase() { ... }",
                    "  void logToCloud() { ... }",
                    "  void logToEmail() { ... }",
                    "}",
                    "",
                    "Правильный подход:",
                    "// Начинаем с простого",
                    "class Logger {",
                    "  void log(String message) {",
                    "    System.out.println(message);",
                    "  }",
                    "}",
                    "",
                    "// Добавляем функциональность только когда она действительно нужна",
                    "",
                    "YAGNI не означает, что нужно игнорировать проектирование. Это означает, что не нужно добавлять функциональность \"на будущее\"."
                  ]
                },
                {
                  subtitle: "Принципы чистой архитектуры в сервисах",
                  content: [
                    "При проектировании микросервисов и сервис-ориентированной архитектуры важно следовать принципам чистой архитектуры.",
                    "",
                    "Слои архитектуры сервиса:",
                    "",
                    "1. Domain Layer (Доменный слой):",
                    "• Содержит бизнес-логику и правила",
                    "• Не зависит от внешних библиотек",
                    "• Содержит сущности (Entities) и интерфейсы репозиториев",
                    "",
                    "2. Application Layer (Слой приложения):",
                    "• Координирует выполнение бизнес-задач",
                    "• Содержит use cases (случаи использования)",
                    "• Зависит только от Domain Layer",
                    "",
                    "3. Infrastructure Layer (Слой инфраструктуры):",
                    "• Реализует технические детали (БД, внешние API, файловая система)",
                    "• Реализует интерфейсы из Domain Layer",
                    "• Зависит от Domain и Application слоев",
                    "",
                    "4. Presentation Layer (Слой представления):",
                    "• Обрабатывает HTTP запросы",
                    "• Валидирует входные данные",
                    "• Преобразует данные для передачи",
                    "",
                    "Пример структуры:",
                    "com.example.service",
                    "  ├── domain",
                    "  │   ├── User.java",
                    "  │   └── UserRepository.java (интерфейс)",
                    "  ├── application",
                    "  │   └── CreateUserUseCase.java",
                    "  ├── infrastructure",
                    "  │   └── JpaUserRepository.java (реализация)",
                    "  └── presentation",
                    "      └── UserController.java"
                  ]
                },
                {
                  subtitle: "Практические советы",
                  content: [
                    "Как применять принципы чистой архитектуры на практике:",
                    "",
                    "1. Начинай с малого:",
                    "Не пытайся сразу создать идеальную архитектуру. Начни с простой структуры и улучшай её по мере необходимости.",
                    "",
                    "2. Используй интерфейсы:",
                    "Зависи от абстракций, а не от конкретных реализаций. Это упростит тестирование и замену компонентов.",
                    "",
                    "3. Разделяй ответственность:",
                    "Каждый класс должен делать одну вещь и делать её хорошо.",
                    "",
                    "4. Избегай циклических зависимостей:",
                    "Если класс A зависит от B, а B от A — это признак плохого дизайна.",
                    "",
                    "5. Тестируй изолированно:",
                    "Бизнес-логика должна тестироваться без БД, внешних API и других зависимостей.",
                    "",
                    "6. Рефакторинг — это нормально:",
                    "Не бойся переписывать код, если он становится слишком сложным или нарушает принципы.",
                    "",
                    "7. Читай чужой код:",
                    "Изучай open-source проекты, чтобы увидеть, как применяются принципы чистой архитектуры на практике.",
                    "",
                    "Помни: чистая архитектура — это не цель, а средство для создания поддерживаемого и масштабируемого кода."
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
          <Link className="hover:text-[var(--text-main)]" href="/learn">
            Назад к уровням
          </Link>
        </div>
      </div>
    </footer>
  );
}

