# Скрипт для выполнения миграции error_reports в контейнере PostgreSQL (PowerShell)

Write-Host "Подключение к базе данных PostgreSQL в контейнере java-course-postgres..." -ForegroundColor Cyan
Write-Host "Создание таблицы error_reports..." -ForegroundColor Cyan
Write-Host ""

# SQL команды для выполнения
$sql = @"
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
    indexname, 
    indexdef 
FROM pg_indexes 
WHERE tablename = 'error_reports';
"@

# Выполняем SQL в контейнере PostgreSQL через stdin
$sql | docker exec -i java-course-postgres psql -U java_course_user -d java_course_db

Write-Host ""
Write-Host "Миграция выполнена!" -ForegroundColor Green
Write-Host "Таблица error_reports создана успешно." -ForegroundColor Green

