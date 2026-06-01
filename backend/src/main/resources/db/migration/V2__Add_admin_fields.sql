-- Добавление колонки is_blocked в таблицу users
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS is_blocked BOOLEAN NOT NULL DEFAULT false;

-- Устанавливаем значение по умолчанию для существующих записей
UPDATE users 
SET is_blocked = false 
WHERE is_blocked IS NULL;

-- Добавление колонки is_admin в таблицу users
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN NOT NULL DEFAULT false;

-- Устанавливаем значение по умолчанию для существующих записей
UPDATE users 
SET is_admin = false 
WHERE is_admin IS NULL;










