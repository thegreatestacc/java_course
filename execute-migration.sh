#!/bin/bash
# Скрипт для выполнения миграции tooltips_enabled в контейнере PostgreSQL

echo "Подключение к базе данных PostgreSQL в контейнере java-course-postgres..."

# Выполняем SQL скрипт в контейнере PostgreSQL
docker exec -i java-course-postgres psql -U java_course_user -d java_course_db << EOF
-- Добавляем колонку tooltips_enabled
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS tooltips_enabled BOOLEAN NOT NULL DEFAULT true;

-- Обновляем существующие записи
UPDATE users 
SET tooltips_enabled = true 
WHERE tooltips_enabled IS NULL;

-- Проверяем результат
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'users' AND column_name = 'tooltips_enabled';
EOF

echo "Миграция выполнена!"


