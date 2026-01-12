#!/bin/bash
# Скрипт для выполнения миграции error_reports на удаленном сервере
# Использование: ./add-error-reports-table-remote.sh

CONTAINER_NAME="java-course-postgres"
DB_USER="java_course_user"
DB_NAME="java_course_db"

echo "=========================================="
echo "Миграция: создание таблицы error_reports"
echo "=========================================="
echo ""
echo "Контейнер: $CONTAINER_NAME"
echo "База данных: $DB_NAME"
echo "Пользователь: $DB_USER"
echo ""

# Проверяем, что контейнер существует и запущен
if ! docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    echo "ОШИБКА: Контейнер $CONTAINER_NAME не найден или не запущен!"
    echo "Запущенные контейнеры:"
    docker ps --format '{{.Names}}'
    exit 1
fi

echo "Контейнер найден. Выполняем миграцию..."
echo ""

# Выполняем SQL скрипт в контейнере PostgreSQL
docker exec -i $CONTAINER_NAME psql -U $DB_USER -d $DB_NAME << 'SQL'
-- Создание таблицы error_reports для хранения сообщений об ошибках от пользователей
CREATE TABLE IF NOT EXISTS error_reports (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT,
    error_message TEXT,
    user_description TEXT NOT NULL,
    page_url VARCHAR(500),
    user_agent TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_error_reports_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Создание индекса для быстрого поиска по дате создания
CREATE INDEX IF NOT EXISTS idx_error_reports_created_at ON error_reports(created_at DESC);

-- Создание индекса для поиска по пользователю
CREATE INDEX IF NOT EXISTS idx_error_reports_user_id ON error_reports(user_id);

-- Проверяем результат
SELECT 
    'Таблица создана успешно!' as status,
    table_name, 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'error_reports'
ORDER BY ordinal_position;

-- Показываем индексы
SELECT 
    'Индексы:' as info,
    indexname, 
    indexdef 
FROM pg_indexes 
WHERE tablename = 'error_reports';
SQL

EXIT_CODE=$?

echo ""
if [ $EXIT_CODE -eq 0 ]; then
    echo "=========================================="
    echo "✓ Миграция выполнена успешно!"
    echo "=========================================="
else
    echo "=========================================="
    echo "✗ Ошибка при выполнении миграции!"
    echo "=========================================="
    exit $EXIT_CODE
fi

