-- Удаление старых error_reports (старше 30 дней)
-- Это одноразовая очистка при миграции
DELETE FROM error_reports WHERE created_at < NOW() - INTERVAL '30 days';

-- Создание индекса для более эффективной очистки по дате
-- (уже есть idx_error_reports_created_at, но убедимся)
CREATE INDEX IF NOT EXISTS idx_error_reports_created_at ON error_reports(created_at);

-- Добавляем комментарий к таблице для документации политики хранения
COMMENT ON TABLE error_reports IS 'Отчёты об ошибках от пользователей. Политика хранения: 30 дней. Очистка через scheduled task.';
