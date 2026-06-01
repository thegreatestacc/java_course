-- Простой скрипт для ручного добавления колонки tooltips_enabled в таблицу users
-- Выполните этот скрипт в базе данных на проде

-- Добавляем колонку (IF NOT EXISTS работает в PostgreSQL 9.5+)
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS tooltips_enabled BOOLEAN NOT NULL DEFAULT true;

-- Обновляем существующие записи (на случай, если были NULL значения)
UPDATE users 
SET tooltips_enabled = true 
WHERE tooltips_enabled IS NULL;







