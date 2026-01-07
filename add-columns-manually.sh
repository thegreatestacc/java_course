#!/bin/bash

# Скрипт для добавления недостающих колонок в таблицу users
# Выполните на проде для быстрого исправления

echo "Добавление колонок is_admin и is_blocked в таблицу users..."

docker compose -f docker-compose.prod.yml exec -T postgres psql -U java_course_user -d java_course_db <<EOF

-- Добавляем колонку is_blocked, если её нет
DO \$\$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'is_blocked'
    ) THEN
        ALTER TABLE users ADD COLUMN is_blocked BOOLEAN NOT NULL DEFAULT false;
        RAISE NOTICE 'Колонка is_blocked добавлена';
    ELSE
        RAISE NOTICE 'Колонка is_blocked уже существует';
    END IF;
END \$\$;

-- Добавляем колонку is_admin, если её нет
DO \$\$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'is_admin'
    ) THEN
        ALTER TABLE users ADD COLUMN is_admin BOOLEAN NOT NULL DEFAULT false;
        RAISE NOTICE 'Колонка is_admin добавлена';
    ELSE
        RAISE NOTICE 'Колонка is_admin уже существует';
    END IF;
END \$\$;

-- Устанавливаем значения по умолчанию для существующих записей
UPDATE users SET is_blocked = false WHERE is_blocked IS NULL;
UPDATE users SET is_admin = false WHERE is_admin IS NULL;

-- Устанавливаем is_admin = true для админского email
UPDATE users SET is_admin = true WHERE email = 'sovliv@yandex.ru';

-- Проверяем результат
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'users' AND column_name IN ('is_admin', 'is_blocked');

-- Показываем пользователей с админскими правами
SELECT id, email, name, is_admin, is_blocked FROM users WHERE is_admin = true;

EOF

echo ""
echo "Готово! Колонки добавлены. Теперь перезапустите backend:"
echo "docker compose -f docker-compose.prod.yml restart backend"

