# Быстрое исправление: добавление колонок is_admin и is_blocked

## Проблема
Ошибка: `column u1_0.is_admin does not exist` - колонки не существуют в БД.

## Решение (выполните на проде)

### Вариант 1: Использовать скрипт (рекомендуется)

```bash
chmod +x add-columns-manually.sh
./add-columns-manually.sh
```

### Вариант 2: Выполнить SQL вручную

```bash
# Подключитесь к PostgreSQL
docker compose -f docker-compose.prod.yml exec postgres psql -U java_course_user -d java_course_db
```

Затем выполните:

```sql
-- Добавляем колонки
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_blocked BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_admin BOOLEAN NOT NULL DEFAULT false;

-- Устанавливаем значения для существующих записей
UPDATE users SET is_blocked = false WHERE is_blocked IS NULL;
UPDATE users SET is_admin = false WHERE is_admin IS NULL;

-- Устанавливаем админские права для вашего email
UPDATE users SET is_admin = true WHERE email = 'sovliv@yandex.ru';

-- Проверяем результат
SELECT id, email, name, is_admin, is_blocked FROM users;
```

### Вариант 3: Одна команда

```bash
docker compose -f docker-compose.prod.yml exec postgres psql -U java_course_user -d java_course_db -c "ALTER TABLE users ADD COLUMN IF NOT EXISTS is_blocked BOOLEAN NOT NULL DEFAULT false; ALTER TABLE users ADD COLUMN IF NOT EXISTS is_admin BOOLEAN NOT NULL DEFAULT false; UPDATE users SET is_admin = true WHERE email = 'sovliv@yandex.ru';"
```

## После добавления колонок

1. Перезапустите backend:
```bash
docker compose -f docker-compose.prod.yml restart backend
```

2. Проверьте логи:
```bash
docker compose -f docker-compose.prod.yml logs -f backend
```

3. Попробуйте войти снова - должно работать!

## Проверка

Убедитесь, что колонки созданы:
```bash
docker compose -f docker-compose.prod.yml exec postgres psql -U java_course_user -d java_course_db -c "SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'users' AND column_name IN ('is_admin', 'is_blocked');"
```

