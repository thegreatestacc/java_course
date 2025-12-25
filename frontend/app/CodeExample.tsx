"use client";

import { useState, useEffect, useRef } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const codeExamples = [
  {
    title: "Базовые концепции",
    code: `// маленькие шаги → понятные результаты
class Main {
  public static void main(String[] args) {
    // Создаём объект пользователя
    var user = new User("Анна", 25);
    
    // Проверяем возраст и выводим приветствие
    if (user.isAdult()) {
      System.out.println(user.greet());
      System.out.println("Добро пожаловать!");
    } else {
      System.out.println("Доступ ограничен");
    }
    
    // Работаем со списком
    var users = new ArrayList<User>();
    users.add(user);
    users.add(new User("Иван", 30));
    
    // Выводим всех пользователей
    for (var u : users) {
      System.out.println(u.name() + " - " + u.age() + " лет");
    }
  }
}

// Record пользователя с базовыми концепциями
record User(String name, int age) {
  public String greet() {
    return "Привет, " + name + "!";
  }
  
  public boolean isAdult() {
    return age >= 18;
  }
}`,
    description: "Сначала — фундамент: типы, условия, циклы, функции, ООП. Затем — практика, архитектурные привычки и «как думать», чтобы расти."
  },
  {
    title: "Практический сервис",
    code: `// Сервис отправки уведомлений через Kafka
@Service
public class NotificationService {
    
    private final KafkaTemplate<String, String> kafka;
    
    // Конструктор: Spring внедряет зависимости
    public NotificationService(KafkaTemplate<String, String> kafka) {
        this.kafka = kafka;
    }
    
    // Отправка сообщения в топик
    public void sendNotification(String userId, String message) {
        // Создаём ключ для партиционирования
        var key = "user-" + userId;
        
        // Отправляем в топик "notifications"
        kafka.send("notifications", key, message)
            .addCallback(
                result -> log.info("Отправлено: {}", message),
                error -> log.error("Ошибка: {}", error.getMessage())
            );
    }
}`,
    description: "Реальные задачи: работа с зависимостями, асинхронность, обработка ошибок. Учимся писать код, который работает в продакшене."
  },
  {
    title: "Тестирование",
    code: `// Тест для NotificationService
@ExtendWith(MockitoExtension.class)
class NotificationServiceTest {
    
    @Mock
    private KafkaTemplate<String, String> kafka;
    
    @InjectMocks
    private NotificationService service;
    
    @Test
    void shouldSendNotification() {
        // Arrange: подготавливаем данные
        var userId = "123";
        var message = "Новое сообщение";
        
        // Act: вызываем метод
        service.sendNotification(userId, message);
        
        // Assert: проверяем результат
        verify(kafka).send(
            eq("notifications"),
            eq("user-123"),
            eq(message)
        );
    }
}`,
    description: "Тесты с первых шагов: проверяем поведение, а не реализацию. Привычка писать тесты — это мышление разработчика."
  }
];

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
  'keyword': { color: '#0000ff' }, // public, class, private, final, return, String - синие (как в Kotlin)
  'class-name': { color: '#0066cc' }, // Example, MessageChanger, CompletableFuture - голубые (как в Kotlin)
  'function': { color: '#006600' }, // updateMessage (объявления) - темно-зеленый
  'variable': { color: '#000000' }, // messageChanger, message - черный/белый
  'string': { color: '#008000' }, // строковые литералы - зеленый
  'char': { color: '#008000' },
  'number': { color: '#0000ff' }, // числа - синий
  'boolean': { color: '#0000ff' },
  'constant': { color: '#0000ff' },
  'property': { color: '#ffc800' }, // аннотации - желтый
  'tag': { color: '#ffc800' }, // @Component, @RequiredArgsConstructor - желтый
  'attr-name': { color: '#ffc800' }, // @author, @project, @date - желтый
  'attr-value': { color: '#808080' }, // значения в комментариях
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
  'comment': { color: '#808080', fontStyle: 'italic' }, // комментарии - серые
  'prolog': { color: '#808080', fontStyle: 'italic' },
  'doctype': { color: '#808080', fontStyle: 'italic' },
  'cdata': { color: '#808080', fontStyle: 'italic' },
  'punctuation': { color: '#a9b7c6' }, // скобки, точки - белые/светло-серые
  'operator': { color: '#a9b7c6' }, // -> и другие операторы
  'keyword': { color: '#cc7832' }, // public, class, private, final, return, String - оранжевые (как в Kotlin)
  'class-name': { color: '#4eade5' }, // Example, MessageChanger, CompletableFuture - светло-голубые (как в Kotlin)
  'function': { color: '#e6b85c' }, // updateMessage (объявления) - темно-желтые
  'variable': { color: '#a9b7c6' }, // messageChanger - белые
  'string': { color: '#6a8759' }, // строковые литералы - зеленые
  'char': { color: '#6a8759' },
  'number': { color: '#6897bb' }, // числа - голубые
  'boolean': { color: '#6897bb' },
  'constant': { color: '#6897bb' },
  'property': { color: '#cc7832' }, // аннотации @Component, @RequiredArgsConstructor - оранжевые
  'tag': { color: '#cc7832' }, // аннотации - оранжевые
  'attr-name': { color: '#629755' }, // @author, @project, @date в комментариях - зеленые
  'attr-value': { color: '#6a8759' }, // значения аннотаций - светло-зеленые
  'builtin': { color: '#6a8759' },
  'symbol': { color: '#6897bb' },
  'deleted': { color: '#6897bb' },
  'inserted': { color: '#6a8759' },
  'entity': { color: '#a9b7c6' },
  'url': { color: '#a9b7c6' },
  'atrule': { color: '#cc7832' },
  'regex': { color: '#a9b7c6' },
  'important': { color: '#a9b7c6', fontWeight: 'bold' },
  // Для параметров в вызовах методов (message в changeMessage(message)) - фиолетовый
  'parameter': { color: '#9876aa' },
};

export function CodeExample() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const codeRef = useRef<HTMLPreElement>(null);
  const example = codeExamples[currentPage];

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

  useEffect(() => {
    if (codeRef.current && !isTransitioning) {
      // Добавляем классы к типам в параметрах и объявлениях полей
      const tokens = codeRef.current.querySelectorAll('.token.keyword, .token.class-name');
      tokens.forEach((token) => {
        const nextSibling = token.nextElementSibling;
        if (nextSibling && (
          (nextSibling.classList.contains('token') && nextSibling.classList.contains('variable')) ||
          nextSibling.textContent?.trim() === ',' ||
          nextSibling.textContent?.trim() === ')'
        )) {
          token.classList.add('type-in-param');
        }
      });
    }
  }, [currentPage, isTransitioning]);

  const goToPrevious = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage((prev) => (prev === 0 ? codeExamples.length - 1 : prev - 1));
      setTimeout(() => setIsTransitioning(false), 50);
    }, 200);
  };

  const goToNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage((prev) => (prev === codeExamples.length - 1 ? 0 : prev + 1));
      setTimeout(() => setIsTransitioning(false), 50);
    }, 200);
  };

  return (
    <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-secondary)] p-5 shadow-sm" style={{ width: '100%', minWidth: '630px', maxWidth: '630px' }}>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-[var(--text-muted)]">Пример того, как будем учиться</span>
        </div>
        
        <div className="rounded-xl border border-[var(--border-main)] bg-[var(--bg-card)] p-4 w-full min-w-0">
          <div className="mb-2 flex items-center justify-between">
            <span 
              className={`text-[11px] font-medium text-[var(--text-secondary)] transition-opacity duration-200 ${
                isTransitioning ? "opacity-0" : "opacity-100"
              }`}
            >
              {example.title}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={goToPrevious}
                disabled={isTransitioning}
                className="flex h-6 w-6 items-center justify-center rounded border border-[var(--border-main)] bg-[var(--bg-card)] text-[10px] text-[var(--text-muted)] hover:bg-[var(--bg-muted)] transition disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Предыдущий пример"
              >
                ←
              </button>
              <span className="text-[10px] text-[var(--text-secondary)]">
                {currentPage + 1} / {codeExamples.length}
              </span>
              <button
                onClick={goToNext}
                disabled={isTransitioning}
                className="flex h-6 w-6 items-center justify-center rounded border border-[var(--border-main)] bg-[var(--bg-card)] text-[10px] text-[var(--text-muted)] hover:bg-[var(--bg-muted)] transition disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Следующий пример"
              >
                →
              </button>
            </div>
          </div>
          <div className="h-[380px] overflow-y-auto w-full min-w-0">
            <div
              key={currentPage}
              className={`transition-opacity duration-200 w-full ${
                isTransitioning ? "opacity-0" : "opacity-100"
              }`}
            >
              <SyntaxHighlighter
                language="java"
                style={isDark ? intellijDark : intellijLight}
                customStyle={{
                  margin: 0,
                  padding: 0,
                  background: 'transparent',
                  fontSize: '13px',
                  lineHeight: '1.6',
                  fontFamily: 'inherit',
                  width: '100%',
                  minWidth: 0,
                }}
                codeTagProps={{
                  style: {
                    fontFamily: 'inherit',
                  },
                }}
                PreTag={({ children, ...props }) => {
                  return <pre {...props} ref={codeRef}>{children}</pre>;
                }}
              >
                {example.code}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
        
        <p 
          className={`text-xs leading-relaxed text-[var(--text-muted)] transition-all duration-200 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          {example.description}
        </p>
      </div>
    </div>
  );
}

