# Исправление проблемы с отсутствующими колонками в БД

## Проблема
Backend падает с ошибкой: `Schema validation: missing column [is_admin] in table [users]`

Это происходит потому, что Hibernate пытается валидировать схему БД до того, как Liquibase применяет миграции.

## Решение 1: Вручную добавить колонки в БД (БЫСТРОЕ)

Выполните этот SQL скрипт в БД на проде:

```bash
# Подключитесь к PostgreSQL контейнеру
docker compose -f docker-compose.prod.yml exec postgres psql -U java_course_user -d java_course_db
```

Затем выполните SQL:

```sql
-- Добавляем колонку is_blocked, если её нет
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'is_blocked'
    ) THEN
        ALTER TABLE users ADD COLUMN is_blocked BOOLEAN NOT NULL DEFAULT false;
        UPDATE users SET is_blocked = false WHERE is_blocked IS NULL;
    END IF;
END $$;

-- Добавляем колонку is_admin, если её нет
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'is_admin'
    ) THEN
        ALTER TABLE users ADD COLUMN is_admin BOOLEAN NOT NULL DEFAULT false;
        UPDATE users SET is_admin = false WHERE is_admin IS NULL;
    END IF;
END $$;

-- Устанавливаем is_admin = true для админского email
UPDATE users SET is_admin = true WHERE email = 'sovliv@yandex.ru';

-- Проверяем результат
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'users' AND column_name IN ('is_admin', 'is_blocked');
```

Или выполните одной командой:

```bash
docker compose -f docker-compose.prod.yml exec -T postgres psql -U java_course_user -d java_course_db < fix-database-columns.sql
```

## Решение 2: Использовать временную настройку (АВТОМАТИЧЕСКОЕ)

В `application-prod.properties` временно изменено:
- `spring.jpa.hibernate.ddl-auto=none` (вместо `validate`)

Это позволит приложению запуститься, и Liquibase применит миграции. После успешного применения миграций можно вернуть `validate`.

## После исправления

1. Перезапустите backend:
```bash
docker compose -f docker-compose.prod.yml restart backend
```

2. Проверьте логи:
```bash
docker compose -f docker-compose.prod.yml logs -f backend
```

3. Убедитесь, что миграции применились:
```bash
docker compose -f docker-compose.prod.yml exec postgres psql -U java_course_user -d java_course_db -c "SELECT * FROM databasechangelog ORDER BY dateexecuted DESC LIMIT 5;"
```

4. Проверьте, что колонки созданы:
```bash
docker compose -f docker-compose.prod.yml exec postgres psql -U java_course_user -d java_course_db -c "SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'users' AND column_name IN ('is_admin', 'is_blocked');"
```

## Возврат к валидации

После успешного применения миграций можно вернуть валидацию в `application-prod.properties`:
```properties
spring.jpa.hibernate.ddl-auto=validate
```

Это обеспечит, что схема БД всегда соответствует модели JPA.

