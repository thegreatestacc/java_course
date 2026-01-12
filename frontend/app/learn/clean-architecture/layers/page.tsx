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

export default function LayersPage() {
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
              materialId="learn/clean-architecture/layers"
              title="Слои архитектуры сервисов"
              description="Изучи структуру чистой архитектуры: Domain, Application, Infrastructure и Presentation слои. Научись правильно разделять ответственность между слоями."
              sections={[
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






