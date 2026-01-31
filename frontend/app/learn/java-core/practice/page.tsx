"use client";

import { useState, useEffect } from "react";
import { JetBrains_Mono } from "next/font/google";
import { Header } from "../../../Header";
import { MotivationalQuotes } from "../../../MotivationalQuotes";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import Link from "next/link";
import { usePathname } from "next/navigation";

const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Тема IntelliJ IDEA Darcula (Dark)
const intellijDark: Record<string, React.CSSProperties> = {
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

// Тема IntelliJ IDEA Light
const intellijLight: Record<string, React.CSSProperties> = {
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

interface PracticeTask {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  topics: string[];
  requirements: string[];
  hints?: string[];
  exampleInput?: string;
  exampleOutput?: string;
  badSolution: {
    code: string;
    issues: string[];
  };
  goodSolution: {
    code: string;
    improvements: string[];
  };
}

const tasks: PracticeTask[] = [
  // Уровень 1: Базовые задачи
  {
    id: "age-calculator",
    title: "Калькулятор возраста",
    description: "Напиши программу, которая по году рождения вычисляет текущий возраст человека, определяет, является ли он совершеннолетним, и сколько лет осталось до пенсии (65 лет).",
    difficulty: "easy",
    topics: ["Переменные", "Типы данных", "Условия"],
    requirements: [
      "Программа должна принимать год рождения как входные данные",
      "Вычислить текущий возраст",
      "Определить, совершеннолетний ли человек (>= 18 лет)",
      "Вычислить, сколько лет до пенсии (если уже на пенсии — вывести сообщение)",
      "Вывести все результаты в консоль"
    ],
    hints: [
      "Используй java.time.LocalDate для получения текущего года",
      "Для проверки совершеннолетия используй оператор if"
    ],
    exampleInput: "2000",
    exampleOutput: "Возраст: 25 лет\nСовершеннолетний: Да\nДо пенсии: 40 лет",
    badSolution: {
      code: `public class Main {
    public static void main(String[] args) {
        int x = 2000;
        int y = 2025;
        int z = y - x;
        System.out.println(z);
        if (z > 18) System.out.println("da");
        else System.out.println("net");
        System.out.println(65 - z);
    }
}`,
      issues: [
        "Непонятные имена переменных (x, y, z)",
        "Магические числа (2025, 18, 65) без констант",
        "Вывод на транслите вместо нормальных сообщений",
        "Нет проверки на отрицательный возраст",
        "Год захардкожен вместо получения текущего",
        "Нет обработки случая, когда человек уже на пенсии"
      ]
    },
    goodSolution: {
      code: `import java.time.LocalDate;
import java.util.Scanner;

public class Main {
    // Константы для возрастных границ - делают код понятнее и легче изменять
    private static final int ADULT_AGE = 18;
    private static final int RETIREMENT_AGE = 65;

    public static void main(String[] args) {
        // Создаем Scanner для чтения ввода пользователя
        Scanner scanner = new Scanner(System.in);

        // Запрашиваем год рождения у пользователя
        System.out.print("Введите год рождения: ");
        int birthYear = scanner.nextInt();

        // Получаем текущий год из системной даты
        int currentYear = LocalDate.now().getYear();
        // Вычисляем возраст как разницу между текущим годом и годом рождения
        int age = currentYear - birthYear;

        // Валидация: проверяем, что год рождения не в будущем
        if (age < 0) {
            System.out.println("Ошибка: год рождения не может быть в будущем");
            return; // Завершаем программу при некорректных данных
        }

        // Выводим вычисленный возраст
        System.out.println("Возраст: " + age + " лет");

        // Определяем статус совершеннолетия с помощью тернарного оператора
        String adultStatus = age >= ADULT_AGE ? "Да" : "Нет";
        System.out.println("Совершеннолетний: " + adultStatus);

        // Проверяем, достиг ли человек пенсионного возраста
        if (age >= RETIREMENT_AGE) {
            System.out.println("Уже на пенсии!");
        } else {
            // Вычисляем количество лет до пенсии
            int yearsToRetirement = RETIREMENT_AGE - age;
            System.out.println("До пенсии: " + yearsToRetirement + " лет");
        }

        // Закрываем Scanner для освобождения ресурсов
        scanner.close();
    }
}`,
      improvements: [
        "Понятные имена переменных (birthYear, currentYear, age)",
        "Константы для магических чисел (ADULT_AGE, RETIREMENT_AGE)",
        "Получение текущего года через LocalDate.now()",
        "Валидация входных данных (проверка на будущий год)",
        "Корректная обработка случая пенсионера",
        "Закрытие Scanner для освобождения ресурсов"
      ]
    }
  },
  {
    id: "temperature-converter",
    title: "Конвертер температуры",
    description: "Создай программу для конвертации температуры между шкалами Цельсия, Фаренгейта и Кельвина.",
    difficulty: "easy",
    topics: ["Переменные", "Типы данных", "Switch"],
    requirements: [
      "Пользователь вводит температуру и исходную шкалу (C, F или K)",
      "Программа конвертирует в две другие шкалы",
      "Результат округлить до 2 знаков после запятой",
      "Использовать switch для выбора исходной шкалы"
    ],
    hints: [
      "C = (F - 32) * 5/9",
      "C = K - 273.15",
      "Используй Math.round() или String.format() для округления"
    ],
    exampleInput: "100 C",
    exampleOutput: "100.00°C = 212.00°F = 373.15K",
    badSolution: {
      code: `public class Main {
    public static void main(String[] args) {
        double t = 100;
        String s = "C";
        double c, f, k;
        if (s == "C") {
            c = t;
            f = t * 9 / 5 + 32;
            k = t + 273.15;
        } else if (s == "F") {
            c = (t - 32) * 5 / 9;
            f = t;
            k = c + 273.15;
        } else {
            k = t;
            c = t - 273.15;
            f = c * 9 / 5 + 32;
        }
        System.out.println(c + " " + f + " " + k);
    }
}`,
      issues: [
        "Сравнение строк через == вместо .equals()",
        "Однобуквенные имена переменных",
        "Нет форматирования вывода (много знаков после запятой)",
        "Значения захардкожены вместо ввода пользователем",
        "Использование if-else вместо switch",
        "Нет обработки некорректного ввода шкалы"
      ]
    },
    goodSolution: {
      code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // Создаем Scanner для чтения ввода пользователя
        Scanner scanner = new Scanner(System.in);

        // Запрашиваем температуру
        System.out.print("Введите температуру: ");
        double temperature = scanner.nextDouble();

        // Запрашиваем шкалу и приводим к верхнему регистру для унификации
        System.out.print("Введите шкалу (C/F/K): ");
        String scale = scanner.next().toUpperCase();

        // Переменные для хранения температур во всех трех шкалах
        double celsius, fahrenheit, kelvin;

        // Используем switch для выбора исходной шкалы
        switch (scale) {
            case "C":
                // Если исходная шкала - Цельсий, используем его как базовую
                celsius = temperature;
                // Конвертируем в Фаренгейт: F = C * 9/5 + 32
                fahrenheit = celsius * 9.0 / 5.0 + 32;
                // Конвертируем в Кельвин: K = C + 273.15
                kelvin = celsius + 273.15;
                break;
            case "F":
                // Если исходная шкала - Фаренгейт, используем его как базовую
                fahrenheit = temperature;
                // Конвертируем в Цельсий: C = (F - 32) * 5/9
                celsius = (fahrenheit - 32) * 5.0 / 9.0;
                // Конвертируем в Кельвин через Цельсий
                kelvin = celsius + 273.15;
                break;
            case "K":
                // Если исходная шкала - Кельвин, используем его как базовую
                kelvin = temperature;
                // Конвертируем в Цельсий: C = K - 273.15
                celsius = kelvin - 273.15;
                // Конвертируем в Фаренгейт через Цельсий
                fahrenheit = celsius * 9.0 / 5.0 + 32;
                break;
            default:
                // Обрабатываем случай неизвестной шкалы
                System.out.println("Неизвестная шкала: " + scale);
                scanner.close();
                return; // Завершаем программу при ошибке
        }

        // Выводим результат с форматированием до 2 знаков после запятой
        System.out.printf("%.2f°C = %.2f°F = %.2fK%n",
                          celsius, fahrenheit, kelvin);

        // Закрываем Scanner для освобождения ресурсов
        scanner.close();
    }
}`,
      improvements: [
        "Использование switch для выбора шкалы",
        "Понятные имена переменных (celsius, fahrenheit, kelvin)",
        "Форматированный вывод через printf с 2 знаками",
        "Обработка некорректной шкалы в default",
        "Приведение ввода к верхнему регистру (toUpperCase)",
        "Ввод данных от пользователя через Scanner"
      ]
    }
  },
  {
    id: "multiplication-table",
    title: "Таблица умножения",
    description: "Напиши программу, которая выводит таблицу умножения для заданного числа от 1 до 10.",
    difficulty: "easy",
    topics: ["Циклы", "Форматированный вывод"],
    requirements: [
      "Принять число от пользователя",
      "Проверить, что число в диапазоне 1-10",
      "Вывести таблицу умножения для этого числа (от 1 до 10)",
      "Форматировать вывод для читаемости"
    ],
    hints: [
      "Используй цикл for для итерации от 1 до 10",
      "System.out.printf() поможет с форматированием"
    ],
    exampleInput: "7",
    exampleOutput: "7 x 1 = 7\n7 x 2 = 14\n...\n7 x 10 = 70",
    badSolution: {
      code: `public class Main {
    public static void main(String[] args) {
        int n = 7;
        System.out.println(n + "*1=" + n*1);
        System.out.println(n + "*2=" + n*2);
        System.out.println(n + "*3=" + n*3);
        System.out.println(n + "*4=" + n*4);
        System.out.println(n + "*5=" + n*5);
        System.out.println(n + "*6=" + n*6);
        System.out.println(n + "*7=" + n*7);
        System.out.println(n + "*8=" + n*8);
        System.out.println(n + "*9=" + n*9);
        System.out.println(n + "*10=" + n*10);
    }
}`,
      issues: [
        "Копипаста вместо использования цикла",
        "Число захардкожено вместо ввода",
        "Нет проверки диапазона 1-10",
        "Неформатированный вывод (нет пробелов)",
        "Однобуквенное имя переменной",
        "Код сложно поддерживать и расширять"
      ]
    },
    goodSolution: {
      code: `import java.util.Scanner;

public class Main {
    // Константы для границ диапазона и размера таблицы
    private static final int MIN_NUMBER = 1;
    private static final int MAX_NUMBER = 10;
    private static final int TABLE_SIZE = 10;

    public static void main(String[] args) {
        // Создаем Scanner для чтения ввода пользователя
        Scanner scanner = new Scanner(System.in);

        // Запрашиваем число от пользователя с указанием допустимого диапазона
        System.out.printf("Введите число от %d до %d: ",
                          MIN_NUMBER, MAX_NUMBER);
        int number = scanner.nextInt();

        // Валидация: проверяем, что число в допустимом диапазоне
        if (number < MIN_NUMBER || number > MAX_NUMBER) {
            System.out.println("Ошибка: число должно быть от " +
                               MIN_NUMBER + " до " + MAX_NUMBER);
            scanner.close();
            return; // Завершаем программу при некорректных данных
        }

        // Выводим заголовок таблицы
        System.out.println("\\nТаблица умножения для " + number + ":");
        System.out.println("─".repeat(20)); // Визуальный разделитель

        // Используем цикл for для генерации таблицы умножения
        for (int i = 1; i <= TABLE_SIZE; i++) {
            // Вычисляем результат умножения
            int result = number * i;
            // Форматируем вывод с выравниванием для читаемости
            System.out.printf("%2d x %2d = %3d%n", number, i, result);
        }

        // Закрываем Scanner для освобождения ресурсов
        scanner.close();
    }
}`,
      improvements: [
        "Использование цикла for вместо копипасты",
        "Константы для границ диапазона",
        "Валидация входных данных",
        "Форматированный вывод с выравниванием",
        "Понятное имя переменной (number)",
        "Визуальное оформление таблицы"
      ]
    }
  },

  // Уровень 2: Средние задачи
  {
    id: "password-validator",
    title: "Валидатор пароля",
    description: "Создай программу для проверки надёжности пароля с использованием собственных исключений.",
    difficulty: "medium",
    topics: ["Строки", "Циклы", "Условия", "Исключения"],
    requirements: [
      "Пароль должен быть минимум 8 символов",
      "Должен содержать хотя бы одну заглавную букву",
      "Должен содержать хотя бы одну цифру",
      "Должен содержать хотя бы один спецсимвол (!@#$%^&*)",
      "Создать класс WeakPasswordException",
      "Выбрасывать исключение с описанием проблемы"
    ],
    hints: [
      "Используй Character.isUpperCase(), Character.isDigit()",
      "Создай класс исключения, наследующий от Exception",
      "Проверяй каждое требование отдельно"
    ],
    exampleInput: "pass123",
    exampleOutput: "WeakPasswordException: Пароль должен содержать минимум 8 символов и заглавную букву",
    badSolution: {
      code: `public class Main {
    public static void main(String[] args) {
        String p = "pass123";
        boolean ok = true;
        if (p.length() < 8) ok = false;
        boolean upper = false;
        for (int i = 0; i < p.length(); i++) {
            if (p.charAt(i) >= 'A' && p.charAt(i) <= 'Z')
                upper = true;
        }
        if (!upper) ok = false;
        if (ok) System.out.println("OK");
        else System.out.println("Bad password");
    }
}`,
      issues: [
        "Нет собственного класса исключения",
        "Не все требования проверяются (цифры, спецсимволы)",
        "Непонятные имена переменных (p, ok)",
        "Нет информации о том, что именно не так",
        "Ручная проверка регистра вместо Character.isUpperCase()",
        "Пароль захардкожен"
      ]
    },
    goodSolution: {
      code: `import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

// Собственный класс исключения для слабых паролей
class WeakPasswordException extends Exception {
    public WeakPasswordException(String message) {
        super(message);
    }
}

public class Main {
    // Константы для требований к паролю
    private static final int MIN_LENGTH = 8;
    private static final String SPECIAL_CHARS = "!@#$%^&*";

    public static void main(String[] args) {
        // Создаем Scanner для чтения ввода пользователя
        Scanner scanner = new Scanner(System.in);

        // Запрашиваем пароль у пользователя
        System.out.print("Введите пароль: ");
        String password = scanner.nextLine();

        // Обрабатываем валидацию с помощью try-catch
        try {
            validatePassword(password);
            System.out.println("Пароль надёжный!");
        } catch (WeakPasswordException e) {
            // Выводим сообщение об ошибке, если пароль не соответствует требованиям
            System.out.println("Ошибка: " + e.getMessage());
        }

        // Закрываем Scanner для освобождения ресурсов
        scanner.close();
    }

    // Метод для валидации пароля с выбрасыванием исключения при ошибках
    private static void validatePassword(String password)
            throws WeakPasswordException {
        // Список для накопления ошибок валидации
        List<String> errors = new ArrayList<>();

        // Проверяем минимальную длину пароля
        if (password.length() < MIN_LENGTH) {
            errors.add("минимум " + MIN_LENGTH + " символов");
        }

        // Флаги для отслеживания наличия различных типов символов
        boolean hasUpperCase = false;
        boolean hasDigit = false;
        boolean hasSpecial = false;

        // Проходим по каждому символу пароля
        for (char c : password.toCharArray()) {
            // Проверяем наличие заглавной буквы
            if (Character.isUpperCase(c)) hasUpperCase = true;
            // Проверяем наличие цифры
            if (Character.isDigit(c)) hasDigit = true;
            // Проверяем наличие спецсимвола
            if (SPECIAL_CHARS.indexOf(c) >= 0) hasSpecial = true;
        }

        // Добавляем ошибки в список, если требования не выполнены
        if (!hasUpperCase) errors.add("заглавную букву");
        if (!hasDigit) errors.add("цифру");
        if (!hasSpecial) errors.add("спецсимвол (" + SPECIAL_CHARS + ")");

        // Если есть ошибки, выбрасываем исключение с информативным сообщением
        if (!errors.isEmpty()) {
            throw new WeakPasswordException(
                "Пароль должен содержать: " + String.join(", ", errors)
            );
        }
    }
}`,
      improvements: [
        "Собственный класс WeakPasswordException",
        "Проверка всех требований (длина, регистр, цифры, спецсимволы)",
        "Информативное сообщение об ошибке со списком проблем",
        "Вынесение логики валидации в отдельный метод",
        "Использование Character.isUpperCase() и isDigit()",
        "Константы для настраиваемых параметров"
      ]
    }
  },
  {
    id: "guess-number",
    title: "Угадай число",
    description: "Реализуй игру, где компьютер загадывает число от 1 до 100, а пользователь пытается его угадать.",
    difficulty: "medium",
    topics: ["Циклы while", "Условия", "Random"],
    requirements: [
      "Компьютер генерирует случайное число от 1 до 100",
      "Пользователь вводит свои догадки",
      "После каждой попытки выводить подсказку: \"больше\" или \"меньше\"",
      "Подсчитывать количество попыток",
      "При угадывании вывести поздравление и количество попыток"
    ],
    hints: [
      "Используй java.util.Random для генерации числа",
      "Используй цикл while для повторения попыток",
      "Scanner для чтения ввода пользователя"
    ],
    exampleInput: "50\n75\n63\n68",
    exampleOutput: "Загадано число от 1 до 100\n> 50\nБольше!\n> 75\nМеньше!\n> 63\nБольше!\n> 68\nПоздравляем! Вы угадали за 4 попытки!",
    badSolution: {
      code: `import java.util.Random;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Random r = new Random();
        int n = r.nextInt(100);
        Scanner s = new Scanner(System.in);
        while (true) {
            int g = s.nextInt();
            if (g == n) {
                System.out.println("win");
                break;
            }
            if (g > n) System.out.println("less");
            else System.out.println("more");
        }
    }
}`,
      issues: [
        "Нет подсчёта попыток",
        "Число генерируется от 0 до 99, а не от 1 до 100",
        "Вывод на английском без контекста",
        "Однобуквенные имена переменных",
        "Нет приветственного сообщения",
        "Scanner не закрывается"
      ]
    },
    goodSolution: {
      code: `import java.util.Random;
import java.util.Scanner;

public class Main {
    // Константы для границ диапазона загадываемого числа
    private static final int MIN_NUMBER = 1;
    private static final int MAX_NUMBER = 100;

    public static void main(String[] args) {
        // Создаем генератор случайных чисел
        Random random = new Random();
        // Генерируем случайное число в диапазоне от MIN_NUMBER до MAX_NUMBER включительно
        int secretNumber = random.nextInt(MAX_NUMBER - MIN_NUMBER + 1) + MIN_NUMBER;

        // Создаем Scanner для чтения ввода пользователя
        Scanner scanner = new Scanner(System.in);
        // Счетчик попыток
        int attempts = 0;
        // Флаг для отслеживания, угадал ли пользователь число
        boolean guessed = false;

        // Приветственное сообщение с указанием диапазона
        System.out.println("Я загадал число от " + MIN_NUMBER +
                           " до " + MAX_NUMBER + ". Попробуй угадать!");

        // Цикл продолжается, пока число не угадано
        while (!guessed) {
            System.out.print("Твоя догадка: ");

            // Валидация: проверяем, что введено число
            if (!scanner.hasNextInt()) {
                System.out.println("Пожалуйста, введи число!");
                scanner.next(); // Пропускаем некорректный ввод
                continue; // Переходим к следующей итерации
            }

            // Читаем догадку пользователя
            int guess = scanner.nextInt();
            attempts++; // Увеличиваем счетчик попыток

            // Валидация: проверяем, что число в допустимом диапазоне
            if (guess < MIN_NUMBER || guess > MAX_NUMBER) {
                System.out.println("Число должно быть от " +
                                   MIN_NUMBER + " до " + MAX_NUMBER);
                continue; // Переходим к следующей итерации
            }

            // Сравниваем догадку с загаданным числом
            if (guess < secretNumber) {
                System.out.println("Моё число больше!");
            } else if (guess > secretNumber) {
                System.out.println("Моё число меньше!");
            } else {
                // Число угадано!
                guessed = true;
                System.out.println("Поздравляю! Ты угадал за " +
                                   attempts + " " + getAttemptWord(attempts) + "!");
            }
        }

        // Закрываем Scanner для освобождения ресурсов
        scanner.close();
    }

    // Вспомогательный метод для правильного склонения слова "попытка"
    private static String getAttemptWord(int count) {
        // Правила склонения для русского языка
        if (count % 10 == 1 && count % 100 != 11) {
            return "попытку"; // 1, 21, 31, ... (но не 11)
        } else if (count % 10 >= 2 && count % 10 <= 4
                   && (count % 100 < 10 || count % 100 >= 20)) {
            return "попытки"; // 2-4, 22-24, 32-34, ...
        } else {
            return "попыток"; // 5-20, 25-30, ...
        }
    }
}`,
      improvements: [
        "Корректная генерация числа от 1 до 100",
        "Подсчёт количества попыток",
        "Валидация ввода (проверка на число и диапазон)",
        "Понятные имена переменных (secretNumber, guess, attempts)",
        "Правильное склонение слова 'попытка'",
        "Дружелюбные сообщения на русском языке"
      ]
    }
  },
  {
    id: "text-analyzer",
    title: "Анализатор текста",
    description: "Напиши программу для анализа текста: подсчёт символов, слов, предложений и других статистик.",
    difficulty: "medium",
    topics: ["Строки", "Методы строк", "Циклы", "Условия"],
    requirements: [
      "Подсчитать общее количество символов (с пробелами и без)",
      "Подсчитать количество слов",
      "Подсчитать количество предложений",
      "Подсчитать количество гласных и согласных букв",
      "Найти самое длинное слово"
    ],
    hints: [
      "Используй String.split() для разбиения на слова",
      "Предложения обычно заканчиваются на . ! ?",
      "Гласные: а, е, ё, и, о, у, ы, э, ю, я (и английские)"
    ],
    exampleInput: "Привет, мир! Как дела?",
    exampleOutput: "Символов (с пробелами): 22\nСимволов (без пробелов): 19\nСлов: 4\nПредложений: 2\nГласных: 7\nСогласных: 10\nСамое длинное слово: Привет",
    badSolution: {
      code: `public class Main {
    public static void main(String[] args) {
        String t = "Привет мир";
        System.out.println(t.length());
        String[] w = t.split(" ");
        System.out.println(w.length);
        int v = 0;
        for (int i = 0; i < t.length(); i++) {
            char c = t.charAt(i);
            if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u')
                v++;
        }
        System.out.println(v);
    }
}`,
      issues: [
        "Не все статистики вычисляются",
        "Не учитываются русские гласные",
        "Однобуквенные имена переменных",
        "Нет подсчёта предложений",
        "Нет поиска самого длинного слова",
        "Нет подсчёта символов без пробелов"
      ]
    },
    goodSolution: {
      code: `import java.util.Scanner;

public class Main {
    // Строки с гласными и согласными буквами (русские и английские)
    private static final String VOWELS = "аеёиоуыэюяaeiou";
    private static final String CONSONANTS = "бвгджзйклмнпрстфхцчшщbcdfghjklmnpqrstvwxyz";

    public static void main(String[] args) {
        // Создаем Scanner для чтения ввода пользователя
        Scanner scanner = new Scanner(System.in);

        // Запрашиваем текст для анализа
        System.out.println("Введите текст для анализа:");
        String text = scanner.nextLine();

        // Проверяем, что текст не пустой
        if (text.isEmpty()) {
            System.out.println("Текст пустой!");
            scanner.close();
            return; // Завершаем программу при пустом тексте
        }

        // Вызываем метод анализа текста
        analyzeText(text);
        // Закрываем Scanner для освобождения ресурсов
        scanner.close();
    }

    // Метод для анализа текста и вывода статистики
    private static void analyzeText(String text) {
        // Подсчитываем общее количество символов (включая пробелы)
        int charsWithSpaces = text.length();
        // Подсчитываем количество символов без пробелов
        int charsWithoutSpaces = text.replace(" ", "").length();

        // Разбиваем текст на слова по пробелам, запятым, точкам с запятой и двоеточиям
        String[] words = text.split("[\\\\s,;:]+");
        int wordCount = 0;
        String longestWord = "";

        // Проходим по каждому слову
        for (String word : words) {
            // Удаляем все символы, кроме букв (русских и английских)
            String cleanWord = word.replaceAll("[^а-яА-Яa-zA-Z]", "");
            if (!cleanWord.isEmpty()) {
                wordCount++; // Увеличиваем счетчик слов
                // Обновляем самое длинное слово, если текущее длиннее
                if (cleanWord.length() > longestWord.length()) {
                    longestWord = cleanWord;
                }
            }
        }

        // Подсчитываем количество предложений по знакам препинания
        int sentences = 0;
        for (char c : text.toCharArray()) {
            if (c == '.' || c == '!' || c == '?') {
                sentences++;
            }
        }
        // Если нет знаков препинания, но текст не пустой, считаем одно предложение
        if (sentences == 0 && !text.isEmpty()) sentences = 1;

        // Подсчитываем гласные и согласные буквы
        int vowels = 0;
        int consonants = 0;
        // Приводим текст к нижнему регистру для унификации проверки
        String lowerText = text.toLowerCase();

        // Проходим по каждому символу текста
        for (char c : lowerText.toCharArray()) {
            // Проверяем, является ли символ гласной буквой
            if (VOWELS.indexOf(c) >= 0) vowels++;
            // Проверяем, является ли символ согласной буквой
            else if (CONSONANTS.indexOf(c) >= 0) consonants++;
        }

        // Выводим результаты анализа
        System.out.println("\\n=== Результаты анализа ===");
        System.out.println("Символов (с пробелами): " + charsWithSpaces);
        System.out.println("Символов (без пробелов): " + charsWithoutSpaces);
        System.out.println("Слов: " + wordCount);
        System.out.println("Предложений: " + sentences);
        System.out.println("Гласных: " + vowels);
        System.out.println("Согласных: " + consonants);
        System.out.println("Самое длинное слово: " + longestWord);
    }
}`,
      improvements: [
        "Полный анализ всех требуемых статистик",
        "Поддержка русских и английских букв",
        "Корректное разбиение на слова с учётом пунктуации",
        "Вынесение логики в отдельный метод",
        "Понятные имена переменных",
        "Форматированный вывод результатов"
      ]
    }
  },

  // Уровень 3: Комплексные задачи
  {
    id: "mini-atm",
    title: "Мини-банкомат",
    description: "Создай консольное приложение, имитирующее работу банкомата с обработкой ошибок.",
    difficulty: "hard",
    topics: ["Все темы блока", "Исключения", "Логика приложения"],
    requirements: [
      "Реализовать операции: проверка баланса, снятие, пополнение",
      "Хранить историю последних 5 операций",
      "Создать InsufficientFundsException для недостатка средств",
      "Создать InvalidAmountException для некорректной суммы",
      "Меню с выбором операции через switch",
      "Цикл работы программы до выбора \"Выход\""
    ],
    hints: [
      "Используй ArrayList для хранения истории",
      "Начальный баланс можно задать в коде",
      "Проверяй сумму на отрицательные значения"
    ],
    exampleInput: "1\n2\n500\n3\n200\n4\n5",
    exampleOutput: "=== Банкомат ===\n1. Проверить баланс\n2. Пополнить счёт\n3. Снять деньги\n4. История операций\n5. Выход\n\nВаш баланс: 1000.00 руб.\n...",
    badSolution: {
      code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        double b = 1000;
        Scanner s = new Scanner(System.in);
        while (true) {
            System.out.println("1-balance 2-deposit 3-withdraw 4-exit");
            int c = s.nextInt();
            if (c == 1) System.out.println(b);
            else if (c == 2) {
                double a = s.nextDouble();
                b = b + a;
            }
            else if (c == 3) {
                double a = s.nextDouble();
                b = b - a;
            }
            else break;
        }
    }
}`,
      issues: [
        "Нет собственных исключений",
        "Нет проверки на отрицательную сумму",
        "Можно уйти в минус при снятии",
        "Нет истории операций",
        "Однобуквенные переменные (b, s, c, a)",
        "Меню на английском, без форматирования"
      ]
    },
    goodSolution: {
      code: `import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

// Исключение для случая недостаточности средств на счете
class InsufficientFundsException extends Exception {
    public InsufficientFundsException(double requested, double available) {
        super(String.format(
            "Недостаточно средств. Запрошено: %.2f, доступно: %.2f",
            requested, available));
    }
}

// Исключение для некорректной суммы операции
class InvalidAmountException extends Exception {
    public InvalidAmountException(String message) {
        super(message);
    }
}

public class Main {
    // Начальный баланс счета
    private static double balance = 1000.0;
    // Максимальное количество записей в истории операций
    private static final int HISTORY_SIZE = 5;
    // Список для хранения истории операций
    private static List<String> history = new ArrayList<>();

    public static void main(String[] args) {
        // Создаем Scanner для чтения ввода пользователя
        Scanner scanner = new Scanner(System.in);
        // Флаг для управления циклом работы программы
        boolean running = true;

        System.out.println("Добро пожаловать в банкомат!");
        // Добавляем начальный баланс в историю
        addToHistory("Начальный баланс: " + formatMoney(balance));

        // Основной цикл работы программы
        while (running) {
            printMenu(); // Выводим меню операций

            // Валидация: проверяем, что введено число
            if (!scanner.hasNextInt()) {
                System.out.println("Введите номер операции!");
                scanner.next(); // Пропускаем некорректный ввод
                continue; // Переходим к следующей итерации
            }

            // Читаем выбор пользователя
            int choice = scanner.nextInt();

            // Обрабатываем выбор с помощью switch и обработки исключений
            try {
                switch (choice) {
                    case 1:
                        checkBalance(); // Проверка баланса
                        break;
                    case 2:
                        System.out.print("Сумма пополнения: ");
                        double depositAmount = scanner.nextDouble();
                        deposit(depositAmount); // Пополнение счета
                        break;
                    case 3:
                        System.out.print("Сумма снятия: ");
                        double withdrawAmount = scanner.nextDouble();
                        withdraw(withdrawAmount); // Снятие денег
                        break;
                    case 4:
                        showHistory(); // Показать историю операций
                        break;
                    case 5:
                        running = false; // Выход из программы
                        System.out.println("До свидания!");
                        break;
                    default:
                        System.out.println("Неизвестная операция");
                }
            } catch (InvalidAmountException | InsufficientFundsException e) {
                // Обрабатываем исключения операций с деньгами
                System.out.println("Ошибка: " + e.getMessage());
            }
        }

        // Закрываем Scanner для освобождения ресурсов
        scanner.close();
    }

    // Метод для вывода меню операций
    private static void printMenu() {
        System.out.println("\\n=== Банкомат ===");
        System.out.println("1. Проверить баланс");
        System.out.println("2. Пополнить счёт");
        System.out.println("3. Снять деньги");
        System.out.println("4. История операций");
        System.out.println("5. Выход");
        System.out.print("Выберите операцию: ");
    }

    // Метод для проверки текущего баланса
    private static void checkBalance() {
        System.out.println("Ваш баланс: " + formatMoney(balance));
    }

    // Метод для пополнения счета
    private static void deposit(double amount) throws InvalidAmountException {
        validateAmount(amount); // Проверяем корректность суммы
        balance += amount; // Увеличиваем баланс
        // Формируем запись об операции
        String record = "Пополнение: +" + formatMoney(amount);
        addToHistory(record); // Добавляем в историю
        System.out.println(record + ". Новый баланс: " + formatMoney(balance));
    }

    // Метод для снятия денег со счета
    private static void withdraw(double amount)
            throws InvalidAmountException, InsufficientFundsException {
        validateAmount(amount); // Проверяем корректность суммы
        // Проверяем достаточность средств
        if (amount > balance) {
            throw new InsufficientFundsException(amount, balance);
        }
        balance -= amount; // Уменьшаем баланс
        // Формируем запись об операции
        String record = "Снятие: -" + formatMoney(amount);
        addToHistory(record); // Добавляем в историю
        System.out.println(record + ". Новый баланс: " + formatMoney(balance));
    }

    // Метод для валидации суммы операции
    private static void validateAmount(double amount) throws InvalidAmountException {
        // Сумма должна быть положительной
        if (amount <= 0) {
            throw new InvalidAmountException("Сумма должна быть положительной");
        }
    }

    // Метод для отображения истории операций
    private static void showHistory() {
        System.out.println("\\n=== История операций ===");
        if (history.isEmpty()) {
            System.out.println("История пуста");
        } else {
            // Выводим все записи с нумерацией
            for (int i = 0; i < history.size(); i++) {
                System.out.println((i + 1) + ". " + history.get(i));
            }
        }
    }

    // Метод для добавления записи в историю с ограничением размера
    private static void addToHistory(String record) {
        // Если история достигла максимального размера, удаляем самую старую запись
        if (history.size() >= HISTORY_SIZE) {
            history.remove(0);
        }
        // Добавляем новую запись в конец списка
        history.add(record);
    }

    // Метод для форматирования денежной суммы
    private static String formatMoney(double amount) {
        return String.format("%.2f руб.", amount);
    }
}`,
      improvements: [
        "Собственные исключения (InsufficientFundsException, InvalidAmountException)",
        "История последних 5 операций",
        "Валидация суммы на положительность",
        "Проверка достаточности средств",
        "Форматирование денежных сумм",
        "Чёткая структура с отдельными методами"
      ]
    }
  },
  {
    id: "calculator-with-errors",
    title: "Калькулятор с обработкой ошибок",
    description: "Реализуй калькулятор, который парсит выражения из строки и корректно обрабатывает все ошибки.",
    difficulty: "hard",
    topics: ["Строки", "Switch", "Try-catch", "Исключения"],
    requirements: [
      "Парсить выражения вида \"10 + 5\" или \"20 / 4\"",
      "Поддержать операции: +, -, *, /",
      "Обработать деление на ноль (ArithmeticException)",
      "Обработать неверный формат ввода (NumberFormatException)",
      "Создать UnknownOperationException для неизвестных операций",
      "Работать в цикле до ввода \"exit\""
    ],
    hints: [
      "Используй String.split() для разбора выражения",
      "Integer.parseInt() или Double.parseDouble() для чисел",
      "Оберни парсинг в try-catch"
    ],
    exampleInput: "10 + 5\n20 / 0\n15 % 3\nexit",
    exampleOutput: "Введите выражение (или 'exit' для выхода):\n> 10 + 5\nРезультат: 15.0\n> 20 / 0\nОшибка: Деление на ноль!\n> 15 % 3\nОшибка: Неизвестная операция '%'\n> exit\nДо свидания!",
    badSolution: {
      code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner s = new Scanner(System.in);
        while (true) {
            String line = s.nextLine();
            if (line.equals("exit")) break;
            String[] p = line.split(" ");
            double a = Double.parseDouble(p[0]);
            double b = Double.parseDouble(p[2]);
            String op = p[1];
            double r = 0;
            if (op.equals("+")) r = a + b;
            if (op.equals("-")) r = a - b;
            if (op.equals("*")) r = a * b;
            if (op.equals("/")) r = a / b;
            System.out.println(r);
        }
    }
}`,
      issues: [
        "Нет обработки исключений",
        "При делении на ноль вернёт Infinity, а не ошибку",
        "Нет проверки на неизвестную операцию",
        "Падает при неверном формате ввода",
        "Однобуквенные переменные (s, p, a, b, r)",
        "Использование if вместо switch"
      ]
    },
    goodSolution: {
      code: `import java.util.Scanner;

// Исключение для неизвестных операций
class UnknownOperationException extends Exception {
    public UnknownOperationException(String operation) {
        super("Неизвестная операция: '" + operation + "'");
    }
}

public class Main {
    public static void main(String[] args) {
        // Создаем Scanner для чтения ввода пользователя
        Scanner scanner = new Scanner(System.in);

        // Выводим инструкцию по использованию калькулятора
        System.out.println("Калькулятор");
        System.out.println("Формат ввода: число оператор число (например: 10 + 5)");
        System.out.println("Поддерживаемые операции: + - * /");
        System.out.println("Введите 'exit' для выхода\\n");

        // Основной цикл работы калькулятора
        while (true) {
            System.out.print("> ");
            // Читаем ввод пользователя и убираем пробелы по краям
            String input = scanner.nextLine().trim();

            // Проверяем команду выхода (без учета регистра)
            if (input.equalsIgnoreCase("exit")) {
                System.out.println("До свидания!");
                break; // Выходим из цикла
            }

            // Пропускаем пустой ввод
            if (input.isEmpty()) {
                continue;
            }

            // Обрабатываем выражение с обработкой различных типов ошибок
            try {
                double result = calculate(input);
                System.out.println("Результат: " + result);
            } catch (UnknownOperationException e) {
                // Обрабатываем неизвестную операцию
                System.out.println("Ошибка: " + e.getMessage());
            } catch (ArithmeticException e) {
                // Обрабатываем арифметические ошибки (например, деление на ноль)
                System.out.println("Ошибка: " + e.getMessage());
            } catch (NumberFormatException e) {
                // Обрабатываем ошибки парсинга чисел
                System.out.println("Ошибка: Неверный формат числа");
            } catch (Exception e) {
                // Обрабатываем все остальные ошибки (неверный формат выражения)
                System.out.println("Ошибка: Неверный формат выражения. " +
                                   "Используйте: число оператор число");
            }
        }

        // Закрываем Scanner для освобождения ресурсов
        scanner.close();
    }

    // Метод для вычисления результата выражения
    private static double calculate(String expression)
            throws UnknownOperationException {
        // Разбиваем выражение на части по пробелам
        String[] parts = expression.split("\\\\s+");

        // Проверяем, что выражение состоит из трех частей (число, оператор, число)
        if (parts.length != 3) {
            throw new IllegalArgumentException("Неверное количество аргументов");
        }

        // Парсим первое число
        double operand1 = Double.parseDouble(parts[0]);
        // Получаем оператор
        String operator = parts[1];
        // Парсим второе число
        double operand2 = Double.parseDouble(parts[2]);

        // Используем switch expression для выбора операции
        return switch (operator) {
            case "+" -> operand1 + operand2; // Сложение
            case "-" -> operand1 - operand2; // Вычитание
            case "*" -> operand1 * operand2; // Умножение
            case "/" -> {
                // Проверяем деление на ноль перед выполнением операции
                if (operand2 == 0) {
                    throw new ArithmeticException("Деление на ноль!");
                }
                yield operand1 / operand2; // Деление
            }
            default -> throw new UnknownOperationException(operator); // Неизвестная операция
        };
    }
}`,
      improvements: [
        "Собственное исключение UnknownOperationException",
        "Обработка всех типов ошибок с понятными сообщениями",
        "Явная проверка деления на ноль",
        "Использование switch expression (Java 14+)",
        "Вынесение логики вычисления в отдельный метод",
        "Информативная справка при запуске"
      ]
    }
  },
  {
    id: "grade-statistics",
    title: "Генератор статистики оценок",
    description: "Напиши программу для анализа списка оценок студентов с расчётом статистики.",
    difficulty: "hard",
    topics: ["Преобразование типов", "Циклы", "Условия", "Исключения"],
    requirements: [
      "Принять список оценок через запятую (например: 85, 92, 78, 65, 90)",
      "Вычислить средний балл",
      "Найти минимальную и максимальную оценку",
      "Подсчитать количество отличников (90+) и двоечников (<60)",
      "Распределить по категориям: A (90+), B (80-89), C (70-79), D (60-69), F (<60)",
      "Обработать ошибки парсинга некорректных значений"
    ],
    hints: [
      "Используй String.split(\",\") для разбора",
      "Оберни Integer.parseInt() в try-catch",
      "Для статистики можно использовать массивы или переменные"
    ],
    exampleInput: "85, 92, 78, 65, 90, 45, 88, 72",
    exampleOutput: "Всего оценок: 8\nСредний балл: 76.88\nМин: 45, Макс: 92\nОтличников: 2, Двоечников: 1\n\nРаспределение:\nA (90+): 2 студента\nB (80-89): 2 студента\nC (70-79): 2 студента\nD (60-69): 1 студент\nF (<60): 1 студент",
    badSolution: {
      code: `public class Main {
    public static void main(String[] args) {
        String s = "85,92,78,65,90";
        String[] arr = s.split(",");
        int sum = 0;
        for (int i = 0; i < arr.length; i++) {
            sum += Integer.parseInt(arr[i]);
        }
        System.out.println(sum / arr.length);
    }
}`,
      issues: [
        "Вычисляется только среднее значение",
        "Нет min/max, нет распределения по категориям",
        "Целочисленное деление теряет точность",
        "Нет обработки ошибок парсинга",
        "Оценки захардкожены",
        "Однобуквенные переменные"
      ]
    },
    goodSolution: {
      code: `import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // Создаем Scanner для чтения ввода пользователя
        Scanner scanner = new Scanner(System.in);

        // Запрашиваем оценки у пользователя
        System.out.println("Введите оценки через запятую:");
        String input = scanner.nextLine();

        // Парсим введенные оценки
        List<Integer> grades = parseGrades(input);

        // Проверяем, что удалось распознать хотя бы одну оценку
        if (grades.isEmpty()) {
            System.out.println("Не удалось распознать ни одной оценки");
            scanner.close();
            return; // Завершаем программу, если нет валидных оценок
        }

        // Выводим статистику по оценкам
        printStatistics(grades);
        // Закрываем Scanner для освобождения ресурсов
        scanner.close();
    }

    // Метод для парсинга оценок из строки
    private static List<Integer> parseGrades(String input) {
        List<Integer> grades = new ArrayList<>();
        // Разбиваем строку на части по запятой
        String[] parts = input.split(",");

        // Проходим по каждой части
        for (String part : parts) {
            try {
                // Парсим число, убирая пробелы по краям
                int grade = Integer.parseInt(part.trim());
                // Проверяем, что оценка в допустимом диапазоне (0-100)
                if (grade >= 0 && grade <= 100) {
                    grades.add(grade); // Добавляем валидную оценку
                } else {
                    // Выводим предупреждение для оценок вне диапазона
                    System.out.println("Пропущено: " + grade +
                                       " (вне диапазона 0-100)");
                }
            } catch (NumberFormatException e) {
                // Обрабатываем ошибки парсинга (нечисловые значения)
                System.out.println("Пропущено: '" + part.trim() +
                                   "' (не является числом)");
            }
        }

        return grades; // Возвращаем список валидных оценок
    }

    // Метод для вычисления и вывода статистики
    private static void printStatistics(List<Integer> grades) {
        int sum = 0; // Сумма всех оценок
        int min = Integer.MAX_VALUE; // Минимальная оценка
        int max = Integer.MIN_VALUE; // Максимальная оценка
        int excellent = 0;  // Количество отличников (90+)
        int failing = 0;    // Количество двоечников (<60)

        // Массив для распределения по категориям: A, B, C, D, F
        int[] distribution = new int[5];

        // Проходим по всем оценкам
        for (int grade : grades) {
            sum += grade; // Суммируем оценки
            // Обновляем минимальную оценку
            if (grade < min) min = grade;
            // Обновляем максимальную оценку
            if (grade > max) max = grade;

            // Распределяем по категориям
            if (grade >= 90) {
                distribution[0]++; // Категория A (90-100)
                excellent++;
            } else if (grade >= 80) {
                distribution[1]++; // Категория B (80-89)
            } else if (grade >= 70) {
                distribution[2]++; // Категория C (70-79)
            } else if (grade >= 60) {
                distribution[3]++; // Категория D (60-69)
            } else {
                distribution[4]++; // Категория F (0-59)
                failing++;
            }
        }

        // Вычисляем средний балл с приведением к double для точности
        double average = (double) sum / grades.size();

        // Выводим общую статистику
        System.out.println("\\n=== Статистика оценок ===");
        System.out.println("Всего оценок: " + grades.size());
        System.out.printf("Средний балл: %.2f%n", average);
        System.out.println("Мин: " + min + ", Макс: " + max);
        System.out.println("Отличников (90+): " + excellent);
        System.out.println("Двоечников (<60): " + failing);

        // Выводим распределение по категориям
        System.out.println("\\nРаспределение:");
        System.out.println("A (90-100): " + distribution[0] + " " +
                           getStudentWord(distribution[0]));
        System.out.println("B (80-89):  " + distribution[1] + " " +
                           getStudentWord(distribution[1]));
        System.out.println("C (70-79):  " + distribution[2] + " " +
                           getStudentWord(distribution[2]));
        System.out.println("D (60-69):  " + distribution[3] + " " +
                           getStudentWord(distribution[3]));
        System.out.println("F (0-59):   " + distribution[4] + " " +
                           getStudentWord(distribution[4]));
    }

    // Вспомогательный метод для правильного склонения слова "студент"
    private static String getStudentWord(int count) {
        // Правила склонения для русского языка
        if (count % 10 == 1 && count % 100 != 11) {
            return "студент"; // 1, 21, 31, ... (но не 11)
        } else if (count % 10 >= 2 && count % 10 <= 4
                   && (count % 100 < 10 || count % 100 >= 20)) {
            return "студента"; // 2-4, 22-24, 32-34, ...
        } else {
            return "студентов"; // 5-20, 25-30, ...
        }
    }
}`,
      improvements: [
        "Полная статистика: среднее, min, max, распределение",
        "Обработка ошибок парсинга с информативными сообщениями",
        "Валидация диапазона оценок (0-100)",
        "Правильное склонение слова 'студент'",
        "Вынесение логики в отдельные методы",
        "Использование ArrayList для гибкости"
      ]
    }
  }
];

const difficultyLabels = {
  easy: { text: "Базовый", color: "bg-green-500/20 text-green-400 border-green-500/30" },
  medium: { text: "Средний", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  hard: { text: "Сложный", color: "bg-red-500/20 text-red-400 border-red-500/30" }
};

export default function PracticePage() {
  const pathname = usePathname();
  const [selectedTask, setSelectedTask] = useState<PracticeTask | null>(null);
  const [filter, setFilter] = useState<"all" | "easy" | "medium" | "hard">("all");
  const [showBadSolution, setShowBadSolution] = useState(true);
  const [isDark, setIsDark] = useState(true);
  const [codeRevealed, setCodeRevealed] = useState(false);
  const [solvedTasks, setSolvedTasks] = useState<Set<string>>(new Set());

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

  // Загрузка решенных задач при монтировании компонента
  useEffect(() => {
    const loadSolvedTasks = async () => {
      try {
        const response = await fetch("/api/statistics/practice/solved", {
          credentials: "include",
        });

        if (response.ok) {
          const solvedTaskIds: string[] = await response.json();
          // Фильтруем только задачи для java-core
          const javaCoreTasks = solvedTaskIds
            .filter(taskId => taskId.startsWith("java-core/"))
            .map(taskId => taskId.substring("java-core/".length));
          setSolvedTasks(new Set(javaCoreTasks));
        }
      } catch (error) {
        console.error("Ошибка загрузки решенных задач:", error);
      }
    };

    loadSolvedTasks();
  }, []);

  const filteredTasks = filter === "all"
    ? tasks
    : tasks.filter(task => task.difficulty === filter);

  const handleTaskClick = (task: PracticeTask) => {
    setSelectedTask(task);
    setShowBadSolution(true);
    setCodeRevealed(false);
  };

  const handleBack = () => {
    setSelectedTask(null);
    setCodeRevealed(false);
  };

  const handleSolutionToggle = (showBad: boolean) => {
    setShowBadSolution(showBad);
    setCodeRevealed(false);
  };

  const handleMarkAsSolved = async () => {
    if (!selectedTask) return;

    const taskId = `java-core/${selectedTask.id}`;

    try {
      const response = await fetch(`/api/statistics/practice/solve?taskId=${encodeURIComponent(taskId)}`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setSolvedTasks(prev => new Set(prev).add(selectedTask.id));
      } else {
        console.error("Ошибка при сохранении решенной задачи");
      }
    } catch (error) {
      console.error("Ошибка при сохранении решенной задачи:", error);
    }
  };

  return (
    <div className={mono.className}>
      <div className="min-h-dvh bg-[var(--bg-main)] text-[var(--text-main)]">
        {/* Навигация слева */}
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
                  href="/learn/java-core"
                  className="block px-3 py-1.5 rounded-lg text-sm transition-all duration-200 text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                >
                  <span className="inline-block transition-opacity duration-200 opacity-70">
                    Обзор материала
                  </span>
                </Link>
                <Link
                  href="/learn/java-core/basics"
                  className="block px-3 py-1.5 rounded-lg text-sm transition-all duration-200 text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                >
                  <span className="inline-block transition-opacity duration-200 opacity-70">
                    Основы Java
                  </span>
                </Link>
                <Link
                  href="/learn/java-core/variables"
                  className="block px-3 py-1.5 rounded-lg text-sm transition-all duration-200 text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                >
                  <span className="inline-block transition-opacity duration-200 opacity-70">
                    Переменные и типы
                  </span>
                </Link>
                <Link
                  href="/learn/java-core/control-flow"
                  className="block px-3 py-1.5 rounded-lg text-sm transition-all duration-200 text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                >
                  <span className="inline-block transition-opacity duration-200 opacity-70">
                    Условия и циклы
                  </span>
                </Link>
                <Link
                  href="/learn/java-core/exceptions"
                  className="block px-3 py-1.5 rounded-lg text-sm transition-all duration-200 text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                >
                  <span className="inline-block transition-opacity duration-200 opacity-70">
                    Исключения
                  </span>
                </Link>
                <Link
                  href="/learn/java-core/practice"
                  className={`block px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                    pathname === "/learn/java-core/practice"
                      ? "bg-[var(--bg-muted)] text-[var(--text-main)] font-medium"
                      : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                  }`}
                >
                  <span className={`inline-block transition-opacity duration-200 ${
                    pathname === "/learn/java-core/practice" ? "opacity-100" : "opacity-70"
                  }`}>
                    Практические задачи
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <Header leftButton={{ href: "/learn/java-core", text: "← К Java Core" }} />
        <MotivationalQuotes />

        <main className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          {selectedTask ? (
            // Детальный просмотр задачи
            <div className="space-y-6">
              <button
                onClick={handleBack}
                className="text-sm text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors flex items-center gap-2"
              >
                ← Назад к списку задач
              </button>

              {/* Предупреждение */}
              <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4">
                <div className="flex gap-3">
                  <span className="text-yellow-500 text-xl shrink-0">⚠️</span>
                  <p className="text-sm text-[var(--text-main)]">
                    <strong>Важно:</strong> Задачи необходимо решать в среде разработки (IDE). 
                    Решение о выполнении задачи принимает сам студент. 
                    Вы самостоятельно оцениваете, выполнена ли задача в соответствии с требованиями. 
                    Для отметки задачи как решенной нажмите на кнопку "Отметить решенной" в разделе "Решения".
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)] p-6 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-main)]">
                    {selectedTask.title}
                  </h1>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${difficultyLabels[selectedTask.difficulty].color}`}>
                    {difficultyLabels[selectedTask.difficulty].text}
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-[var(--text-muted)] mb-6">
                  {selectedTask.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedTask.topics.map((topic, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--bg-muted)] text-[var(--text-muted)] border border-[var(--border-main)]"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-[var(--text-main)] mb-3">
                      Требования
                    </h2>
                    <ul className="space-y-2">
                      {selectedTask.requirements.map((req, index) => (
                        <li key={index} className="flex gap-3 text-sm text-[var(--text-muted)]">
                          <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--button-bg)] mt-2" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {selectedTask.hints && (
                    <div>
                      <h2 className="text-lg font-semibold text-[var(--text-main)] mb-3">
                        Подсказки
                      </h2>
                      <ul className="space-y-2">
                        {selectedTask.hints.map((hint, index) => (
                          <li key={index} className="flex gap-3 text-sm text-[var(--text-muted)]">
                            <span className="text-yellow-500">*</span>
                            <span>{hint}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {(selectedTask.exampleInput || selectedTask.exampleOutput) && (
                    <div>
                      <h2 className="text-lg font-semibold text-[var(--text-main)] mb-3">
                        Пример
                      </h2>
                      <div className="grid gap-4 md:grid-cols-2">
                        {selectedTask.exampleInput && (
                          <div className="rounded-xl border border-[var(--border-main)] bg-[var(--bg-secondary)] p-4">
                            <div className="text-xs font-semibold text-[var(--text-muted)] uppercase mb-2">
                              Ввод
                            </div>
                            <pre className="text-sm text-[var(--text-main)] whitespace-pre-wrap font-mono">
                              {selectedTask.exampleInput}
                            </pre>
                          </div>
                        )}
                        {selectedTask.exampleOutput && (
                          <div className="rounded-xl border border-[var(--border-main)] bg-[var(--bg-secondary)] p-4">
                            <div className="text-xs font-semibold text-[var(--text-muted)] uppercase mb-2">
                              Вывод
                            </div>
                            <pre className="text-sm text-[var(--text-main)] whitespace-pre-wrap font-mono">
                              {selectedTask.exampleOutput}
                            </pre>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Решения */}
                  <div className="pt-6 border-t border-[var(--border-main)]">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-[var(--text-main)]">
                        Решения
                      </h2>
                      {!solvedTasks.has(selectedTask.id) ? (
                        <button
                          onClick={handleMarkAsSolved}
                          className="px-4 py-2 rounded-xl text-sm font-medium bg-[var(--button-bg)] text-[var(--button-text)] hover:bg-[var(--button-hover)] transition-colors"
                        >
                          Отметить решенной
                        </button>
                      ) : (
                        <span className="px-4 py-2 rounded-xl text-sm font-medium bg-green-500/20 text-green-400 border border-green-500/30 flex items-center gap-2">
                          <span>✓</span>
                          Задача решена
                        </span>
                      )}
                    </div>

                    {/* Переключатель между решениями */}
                    <div className="flex gap-2 mb-4">
                      <button
                        onClick={() => handleSolutionToggle(true)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                          showBadSolution
                            ? "bg-[var(--button-bg)] text-[var(--button-text)]"
                            : "bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border-main)] hover:bg-[var(--bg-muted)]"
                        }`}
                      >
                        Плохое решение
                      </button>
                      <button
                        onClick={() => handleSolutionToggle(false)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                          !showBadSolution
                            ? "bg-[var(--button-bg)] text-[var(--button-text)]"
                            : "bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border-main)] hover:bg-[var(--bg-muted)]"
                        }`}
                      >
                        Качественное решение
                      </button>
                    </div>

                    {showBadSolution ? (
                      <div className="space-y-4">
                        <div className="rounded-xl border border-[var(--border-main)] bg-[var(--bg-card)] overflow-hidden">
                          <div className="px-4 py-2 bg-[var(--bg-secondary)] border-b border-[var(--border-main)]">
                            <span className="text-sm font-medium text-[var(--text-muted)]">Как НЕ надо делать</span>
                          </div>
                          <div className="relative overflow-hidden">
                            <div
                              className={`overflow-x-auto ${
                                codeRevealed ? "code-revealed" : "code-blurred"
                              }`}
                            >
                              <SyntaxHighlighter
                                language="java"
                                style={isDark ? intellijDark : intellijLight}
                                customStyle={{
                                  margin: 0,
                                  padding: '16px',
                                  background: 'var(--bg-card)',
                                  fontSize: '13px',
                                  lineHeight: '1.6',
                                }}
                              >
                                {selectedTask.badSolution.code}
                              </SyntaxHighlighter>
                            </div>
                            <div
                              className={`absolute inset-0 flex items-center justify-center bg-[var(--bg-card)]/30 backdrop-blur-sm ${
                                codeRevealed ? "overlay-fade-out" : ""
                              }`}
                              style={{ pointerEvents: codeRevealed ? 'none' : 'auto' }}
                            >
                              {!codeRevealed && (
                                <button
                                  onClick={() => setCodeRevealed(true)}
                                  className="reveal-button px-6 py-3 rounded-xl bg-[var(--button-bg)] text-[var(--button-text)] text-sm font-semibold shadow-xl hover:shadow-2xl transition-all"
                                >
                                  Показать код
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-[var(--text-main)] mb-2">Проблемы этого кода:</h3>
                          <ul className="space-y-1">
                            {selectedTask.badSolution.issues.map((issue, index) => (
                              <li key={index} className="flex gap-2 text-sm text-[var(--text-muted)]">
                                <span className="text-red-400 shrink-0">×</span>
                                <span>{issue}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="rounded-xl border border-[var(--border-main)] bg-[var(--bg-card)] overflow-hidden">
                          <div className="px-4 py-2 bg-[var(--bg-secondary)] border-b border-[var(--border-main)]">
                            <span className="text-sm font-medium text-[var(--text-muted)]">Качественное решение</span>
                          </div>
                          <div className="relative overflow-hidden">
                            <div
                              className={`overflow-x-auto ${
                                codeRevealed ? "code-revealed" : "code-blurred"
                              }`}
                            >
                              <SyntaxHighlighter
                                language="java"
                                style={isDark ? intellijDark : intellijLight}
                                customStyle={{
                                  margin: 0,
                                  padding: '16px',
                                  background: 'var(--bg-card)',
                                  fontSize: '13px',
                                  lineHeight: '1.6',
                                }}
                              >
                                {selectedTask.goodSolution.code}
                              </SyntaxHighlighter>
                            </div>
                            <div
                              className={`absolute inset-0 flex items-center justify-center bg-[var(--bg-card)]/30 backdrop-blur-sm ${
                                codeRevealed ? "overlay-fade-out" : ""
                              }`}
                              style={{ pointerEvents: codeRevealed ? 'none' : 'auto' }}
                            >
                              {!codeRevealed && (
                                <button
                                  onClick={() => setCodeRevealed(true)}
                                  className="reveal-button px-6 py-3 rounded-xl bg-[var(--button-bg)] text-[var(--button-text)] text-sm font-semibold shadow-xl hover:shadow-2xl transition-all"
                                >
                                  Показать код
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-[var(--text-main)] mb-2">Что улучшено:</h3>
                          <ul className="space-y-1">
                            {selectedTask.goodSolution.improvements.map((improvement, index) => (
                              <li key={index} className="flex gap-2 text-sm text-[var(--text-muted)]">
                                <span className="text-green-400 shrink-0">✓</span>
                                <span>{improvement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Список задач
            <div className="space-y-6">
              <div className="space-y-4 mb-8">
                <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-main)] md:text-4xl">
                  Практические задачи
                </h1>
                <p className="text-base leading-relaxed text-[var(--text-muted)] max-w-3xl">
                  Изучи примеры решения задач по Java Core. Для каждой задачи показаны два варианта: плохой код с типичными ошибками и качественное решение с лучшими практиками.
                </p>
              </div>

              {/* Фильтр по сложности */}
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    filter === "all"
                      ? "bg-[var(--button-bg)] text-[var(--button-text)]"
                      : "bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border-main)] hover:bg-[var(--bg-muted)]"
                  }`}
                >
                  Все задачи ({tasks.length})
                </button>
                <button
                  onClick={() => setFilter("easy")}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    filter === "easy"
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border-main)] hover:bg-[var(--bg-muted)]"
                  }`}
                >
                  Базовый ({tasks.filter(t => t.difficulty === "easy").length})
                </button>
                <button
                  onClick={() => setFilter("medium")}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    filter === "medium"
                      ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                      : "bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border-main)] hover:bg-[var(--bg-muted)]"
                  }`}
                >
                  Средний ({tasks.filter(t => t.difficulty === "medium").length})
                </button>
                <button
                  onClick={() => setFilter("hard")}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    filter === "hard"
                      ? "bg-red-500/20 text-red-400 border border-red-500/30"
                      : "bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border-main)] hover:bg-[var(--bg-muted)]"
                  }`}
                >
                  Сложный ({tasks.filter(t => t.difficulty === "hard").length})
                </button>
              </div>

              {/* Список задач */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredTasks.map((task) => (
                  <button
                    key={task.id}
                    onClick={() => handleTaskClick(task)}
                    className="text-left rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)] p-5 shadow-sm hover:border-[var(--button-bg)] transition-all duration-200 group flex flex-col h-full relative"
                  >
                    {solvedTasks.has(task.id) && (
                      <div className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20">
                        <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                    <div className="flex justify-between items-center mb-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${difficultyLabels[task.difficulty].color}`}>
                        {difficultyLabels[task.difficulty].text}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-[var(--text-main)] group-hover:text-[var(--button-bg)] transition-colors mb-3">
                      {task.title}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)] mb-4 line-clamp-2 flex-grow">
                      {task.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {task.topics.slice(0, 3).map((topic, index) => (
                        <span
                          key={index}
                          className="px-2 py-0.5 rounded-full text-xs bg-[var(--bg-muted)] text-[var(--text-muted)]"
                        >
                          {topic}
                        </span>
                      ))}
                      {task.topics.length > 3 && (
                        <span className="px-2 py-0.5 rounded-full text-xs bg-[var(--bg-muted)] text-[var(--text-muted)]">
                          +{task.topics.length - 3}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
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
            К темам
          </Link>
          <Link className="hover:text-[var(--text-main)]" href="/">
            На главную
          </Link>
        </div>
      </div>
    </footer>
  );
}
