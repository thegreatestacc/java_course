-- Скрипт для добавления недостающих колонок в таблицу users
-- Выполните этот скрипт в БД на проде, если миграции не применились

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

