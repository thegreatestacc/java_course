module.exports = [
"[project]/app/ThemeToggle.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeToggle",
    ()=>ThemeToggle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function ThemeToggle() {
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("light");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const saved = localStorage.getItem("theme");
        const initial = saved ?? "light";
        setTheme(initial);
        document.documentElement.classList.toggle("dark", initial === "dark");
    }, []);
    function toggleTheme() {
        const next = theme === "light" ? "dark" : "light";
        setTheme(next);
        document.documentElement.classList.toggle("dark", next === "dark");
        localStorage.setItem("theme", next);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: toggleTheme,
        className: "   flex items-center gap-2 rounded-xl   border border-[var(--border-main)]   bg-[var(--bg-card)]   px-3 py-2 text-sm   hover:bg-[var(--bg-muted)]   transition   ",
        "aria-label": "Toggle theme",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-xs",
            children: theme === "light" ? "☀️ Light" : "🌙 Dark"
        }, void 0, false, {
            fileName: "[project]/app/ThemeToggle.tsx",
            lineNumber: 36,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/ThemeToggle.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/CodeExample.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CodeExample",
    ()=>CodeExample
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$syntax$2d$highlighter$2f$dist$2f$esm$2f$prism$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Prism$3e$__ = __turbopack_context__.i("[project]/node_modules/react-syntax-highlighter/dist/esm/prism.js [app-ssr] (ecmascript) <export default as Prism>");
"use client";
;
;
;
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
const intellijLight = {
    'code[class*="language-"]': {
        color: '#000000',
        background: 'transparent'
    },
    'pre[class*="language-"]': {
        color: '#000000',
        background: 'transparent',
        padding: 0,
        margin: 0
    },
    'comment': {
        color: '#808080',
        fontStyle: 'italic'
    },
    'prolog': {
        color: '#808080',
        fontStyle: 'italic'
    },
    'doctype': {
        color: '#808080',
        fontStyle: 'italic'
    },
    'cdata': {
        color: '#808080',
        fontStyle: 'italic'
    },
    'punctuation': {
        color: '#000000'
    },
    'operator': {
        color: '#000000'
    },
    'keyword': {
        color: '#0000ff'
    },
    'class-name': {
        color: '#0066cc'
    },
    'function': {
        color: '#006600'
    },
    'variable': {
        color: '#000000'
    },
    'string': {
        color: '#008000'
    },
    'char': {
        color: '#008000'
    },
    'number': {
        color: '#0000ff'
    },
    'boolean': {
        color: '#0000ff'
    },
    'constant': {
        color: '#0000ff'
    },
    'property': {
        color: '#ffc800'
    },
    'tag': {
        color: '#ffc800'
    },
    'attr-name': {
        color: '#ffc800'
    },
    'attr-value': {
        color: '#808080'
    },
    'builtin': {
        color: '#008000'
    },
    'symbol': {
        color: '#0000ff'
    },
    'deleted': {
        color: '#0000ff'
    },
    'inserted': {
        color: '#008000'
    },
    'entity': {
        color: '#000000'
    },
    'url': {
        color: '#000000'
    },
    'atrule': {
        color: '#0000ff'
    },
    'regex': {
        color: '#000000'
    },
    'important': {
        color: '#000000',
        fontWeight: 'bold'
    }
};
// Тема IntelliJ IDEA Darcula (Dark)
const intellijDark = {
    'code[class*="language-"]': {
        color: '#a9b7c6',
        background: 'transparent'
    },
    'pre[class*="language-"]': {
        color: '#a9b7c6',
        background: 'transparent',
        padding: 0,
        margin: 0
    },
    'comment': {
        color: '#808080',
        fontStyle: 'italic'
    },
    'prolog': {
        color: '#808080',
        fontStyle: 'italic'
    },
    'doctype': {
        color: '#808080',
        fontStyle: 'italic'
    },
    'cdata': {
        color: '#808080',
        fontStyle: 'italic'
    },
    'punctuation': {
        color: '#a9b7c6'
    },
    'operator': {
        color: '#a9b7c6'
    },
    'keyword': {
        color: '#cc7832'
    },
    'class-name': {
        color: '#4eade5'
    },
    'function': {
        color: '#e6b85c'
    },
    'variable': {
        color: '#a9b7c6'
    },
    'string': {
        color: '#6a8759'
    },
    'char': {
        color: '#6a8759'
    },
    'number': {
        color: '#6897bb'
    },
    'boolean': {
        color: '#6897bb'
    },
    'constant': {
        color: '#6897bb'
    },
    'property': {
        color: '#cc7832'
    },
    'tag': {
        color: '#cc7832'
    },
    'attr-name': {
        color: '#629755'
    },
    'attr-value': {
        color: '#6a8759'
    },
    'builtin': {
        color: '#6a8759'
    },
    'symbol': {
        color: '#6897bb'
    },
    'deleted': {
        color: '#6897bb'
    },
    'inserted': {
        color: '#6a8759'
    },
    'entity': {
        color: '#a9b7c6'
    },
    'url': {
        color: '#a9b7c6'
    },
    'atrule': {
        color: '#cc7832'
    },
    'regex': {
        color: '#a9b7c6'
    },
    'important': {
        color: '#a9b7c6',
        fontWeight: 'bold'
    },
    // Для параметров в вызовах методов (message в changeMessage(message)) - фиолетовый
    'parameter': {
        color: '#9876aa'
    }
};
function CodeExample() {
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isTransitioning, setIsTransitioning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isDark, setIsDark] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const codeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const example = codeExamples[currentPage];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const checkTheme = ()=>{
            setIsDark(document.documentElement.classList.contains("dark"));
        };
        checkTheme();
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: [
                "class"
            ]
        });
        return ()=>observer.disconnect();
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (codeRef.current && !isTransitioning) {
            // Добавляем классы к типам в параметрах и объявлениях полей
            const tokens = codeRef.current.querySelectorAll('.token.keyword, .token.class-name');
            tokens.forEach((token)=>{
                const nextSibling = token.nextElementSibling;
                if (nextSibling && (nextSibling.classList.contains('token') && nextSibling.classList.contains('variable') || nextSibling.textContent?.trim() === ',' || nextSibling.textContent?.trim() === ')')) {
                    token.classList.add('type-in-param');
                }
            });
        }
    }, [
        currentPage,
        isTransitioning
    ]);
    const goToPrevious = ()=>{
        setIsTransitioning(true);
        setTimeout(()=>{
            setCurrentPage((prev)=>prev === 0 ? codeExamples.length - 1 : prev - 1);
            setTimeout(()=>setIsTransitioning(false), 50);
        }, 200);
    };
    const goToNext = ()=>{
        setIsTransitioning(true);
        setTimeout(()=>{
            setCurrentPage((prev)=>prev === codeExamples.length - 1 ? 0 : prev + 1);
            setTimeout(()=>setIsTransitioning(false), 50);
        }, 200);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-2xl border border-[var(--border-main)] bg-[var(--bg-secondary)] p-5 shadow-sm",
        style: {
            width: '100%',
            minWidth: '630px',
            maxWidth: '630px'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs font-medium text-[var(--text-muted)]",
                            children: "Пример того, как будем учиться"
                        }, void 0, false, {
                            fileName: "[project]/app/CodeExample.tsx",
                            lineNumber: 253,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[11px] text-[var(--text-secondary)]",
                            children: "IDE-style"
                        }, void 0, false, {
                            fileName: "[project]/app/CodeExample.tsx",
                            lineNumber: 254,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/CodeExample.tsx",
                    lineNumber: 252,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-xl border border-[var(--border-main)] bg-[var(--bg-card)] p-4 w-full min-w-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-2 flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `text-[11px] font-medium text-[var(--text-secondary)] transition-opacity duration-200 ${isTransitioning ? "opacity-0" : "opacity-100"}`,
                                    children: example.title
                                }, void 0, false, {
                                    fileName: "[project]/app/CodeExample.tsx",
                                    lineNumber: 259,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: goToPrevious,
                                            disabled: isTransitioning,
                                            className: "flex h-6 w-6 items-center justify-center rounded border border-[var(--border-main)] bg-[var(--bg-card)] text-[10px] text-[var(--text-muted)] hover:bg-[var(--bg-muted)] transition disabled:opacity-50 disabled:cursor-not-allowed",
                                            "aria-label": "Предыдущий пример",
                                            children: "←"
                                        }, void 0, false, {
                                            fileName: "[project]/app/CodeExample.tsx",
                                            lineNumber: 267,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] text-[var(--text-secondary)]",
                                            children: [
                                                currentPage + 1,
                                                " / ",
                                                codeExamples.length
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/CodeExample.tsx",
                                            lineNumber: 275,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: goToNext,
                                            disabled: isTransitioning,
                                            className: "flex h-6 w-6 items-center justify-center rounded border border-[var(--border-main)] bg-[var(--bg-card)] text-[10px] text-[var(--text-muted)] hover:bg-[var(--bg-muted)] transition disabled:opacity-50 disabled:cursor-not-allowed",
                                            "aria-label": "Следующий пример",
                                            children: "→"
                                        }, void 0, false, {
                                            fileName: "[project]/app/CodeExample.tsx",
                                            lineNumber: 278,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/CodeExample.tsx",
                                    lineNumber: 266,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/CodeExample.tsx",
                            lineNumber: 258,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-[380px] overflow-y-auto w-full min-w-0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `transition-opacity duration-200 w-full ${isTransitioning ? "opacity-0" : "opacity-100"}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$syntax$2d$highlighter$2f$dist$2f$esm$2f$prism$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Prism$3e$__["Prism"], {
                                    language: "java",
                                    style: isDark ? intellijDark : intellijLight,
                                    customStyle: {
                                        margin: 0,
                                        padding: 0,
                                        background: 'transparent',
                                        fontSize: '13px',
                                        lineHeight: '1.6',
                                        fontFamily: 'inherit',
                                        width: '100%',
                                        minWidth: 0
                                    },
                                    codeTagProps: {
                                        style: {
                                            fontFamily: 'inherit'
                                        }
                                    },
                                    PreTag: ({ children, ...props })=>{
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                            ...props,
                                            ref: codeRef,
                                            children: children
                                        }, void 0, false, {
                                            fileName: "[project]/app/CodeExample.tsx",
                                            lineNumber: 314,
                                            columnNumber: 26
                                        }, void 0);
                                    },
                                    children: example.code
                                }, void 0, false, {
                                    fileName: "[project]/app/CodeExample.tsx",
                                    lineNumber: 295,
                                    columnNumber: 15
                                }, this)
                            }, currentPage, false, {
                                fileName: "[project]/app/CodeExample.tsx",
                                lineNumber: 289,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/CodeExample.tsx",
                            lineNumber: 288,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/CodeExample.tsx",
                    lineNumber: 257,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: `text-xs leading-relaxed text-[var(--text-muted)] transition-all duration-200 ${isTransitioning ? "opacity-0" : "opacity-100"}`,
                    children: example.description
                }, void 0, false, {
                    fileName: "[project]/app/CodeExample.tsx",
                    lineNumber: 323,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/CodeExample.tsx",
            lineNumber: 251,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/CodeExample.tsx",
        lineNumber: 250,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=app_d86a1f00._.js.map