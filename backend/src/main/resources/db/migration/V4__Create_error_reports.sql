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

