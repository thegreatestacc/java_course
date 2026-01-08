-- Добавление колонки tooltips_enabled в таблицу users
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS tooltips_enabled BOOLEAN NOT NULL DEFAULT true;

-- Устанавливаем значение по умолчанию для существующих записей
UPDATE users 
SET tooltips_enabled = true 
WHERE tooltips_enabled IS NULL;


