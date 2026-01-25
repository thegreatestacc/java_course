-- Добавление поля last_login_at в таблицу users
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMP;

-- Создание индекса для быстрого поиска по дате последнего логина
CREATE INDEX IF NOT EXISTS idx_users_last_login_at ON users(last_login_at);