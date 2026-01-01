# Настройка отправки email

## ⚠️ Важно: Настройка обязательна!

Без настройки email функционал восстановления пароля и подтверждения регистрации **не будет работать**.

## Конфигурация

Для работы отправки email необходимо настроить следующие переменные окружения:

### Локальная разработка

**Способ 1: Через переменные окружения (рекомендуется)**

Установите переменные окружения перед запуском:

**Windows (PowerShell):**
```powershell
$env:MAIL_USERNAME="your-email@gmail.com"
$env:MAIL_PASSWORD="your-app-password"
$env:APP_BASE_URL="http://localhost:3000"
```

**Windows (CMD):**
```cmd
set MAIL_USERNAME=your-email@gmail.com
set MAIL_PASSWORD=your-app-password
set APP_BASE_URL=http://localhost:3000
```

**Linux/Mac:**
```bash
export MAIL_USERNAME="your-email@gmail.com"
export MAIL_PASSWORD="your-app-password"
export APP_BASE_URL="http://localhost:3000"
```

**Способ 2: Прямо в файле (не рекомендуется для production)**

В файле `backend/src/main/resources/application.properties` настройте:

```properties
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
spring.mail.properties.mail.smtp.starttls.required=true

app.base-url=http://localhost:3000
```

### Production

В production используйте переменные окружения:

- `MAIL_HOST` - SMTP сервер (по умолчанию: smtp.gmail.com)
- `MAIL_PORT` - Порт SMTP (по умолчанию: 587)
- `MAIL_USERNAME` - Email для отправки
- `MAIL_PASSWORD` - Пароль приложения или пароль от email
- `APP_BASE_URL` - Базовый URL приложения (например: https://yourdomain.com)

## Настройка Gmail

Если вы используете Gmail:

1. Включите двухфакторную аутентификацию в вашем Google аккаунте
2. Создайте пароль приложения:
   - Перейдите в [Настройки аккаунта Google](https://myaccount.google.com/)
   - Выберите "Безопасность" → "Пароли приложений"
   - Создайте новый пароль приложения для "Почта"
   - Используйте этот пароль в `spring.mail.password`

## Альтернативные SMTP серверы

### Yandex Mail (для sovliv@yandex.ru)

**Важно:** Для Yandex Mail нужно использовать пароль приложения, а не основной пароль!

1. Включите двухфакторную аутентификацию в настройках Yandex
2. Создайте пароль приложения: [https://id.yandex.ru/security](https://id.yandex.ru/security) → "Пароли приложений"
3. Используйте этот пароль в `MAIL_PASSWORD`

**Настройки для Yandex:**

```properties
spring.mail.host=smtp.yandex.ru
spring.mail.port=465
spring.mail.username=sovliv@yandex.ru
spring.mail.password=ваш-пароль-приложения
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.ssl.enable=true
spring.mail.properties.mail.smtp.ssl.trust=smtp.yandex.ru
```

**Или через переменные окружения:**

```powershell
$env:MAIL_HOST="smtp.yandex.ru"
$env:MAIL_PORT="465"
$env:MAIL_USERNAME="sovliv@yandex.ru"
$env:MAIL_PASSWORD="ваш-пароль-приложения"
```

**Важно:** Для порта 465 нужно использовать SSL, а не STARTTLS!

### Mail.ru

```properties
spring.mail.host=smtp.mail.ru
spring.mail.port=465
spring.mail.properties.mail.smtp.ssl.enable=true
```

## Функциональность

После настройки email система будет:

1. **При регистрации:**
   - Отправлять письмо с ссылкой для подтверждения email
   - Токен подтверждения действителен 7 дней
   - Пользователь не сможет войти до подтверждения email

2. **При восстановлении пароля:**
   - Отправлять письмо со ссылкой для сброса пароля
   - Токен сброса пароля действителен 24 часа
   - Пользователь может установить новый пароль по ссылке

## Endpoints

- `GET /api/auth/verify-email?token=...` - Подтверждение email
- `POST /api/auth/request-password-reset` - Запрос на восстановление пароля
- `POST /api/auth/reset-password` - Сброс пароля по токену

## Тестирование

Для тестирования без реальной отправки email можно использовать:

1. **MailHog** (локально):
   ```bash
   docker run -d -p 1025:1025 -p 8025:8025 mailhog/mailhog
   ```
   
   Настройки:
   ```properties
   spring.mail.host=localhost
   spring.mail.port=1025
   spring.mail.username=
   spring.mail.password=
   ```
   
   Просмотр писем: http://localhost:8025

2. **Mailtrap** (онлайн сервис для тестирования)

