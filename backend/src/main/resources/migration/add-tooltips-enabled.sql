-- Миграция для добавления колонки tooltips_enabled в таблицу users
-- Выполните этот SQL скрипт вручную, если миграция не применилась автоматически

-- Проверяем, существует ли колонка, и добавляем её, если нет
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'users' 
        AND column_name = 'tooltips_enabled'
    ) THEN
        ALTER TABLE users 
        ADD COLUMN tooltips_enabled BOOLEAN NOT NULL DEFAULT true;
        
        -- Обновляем существующие записи, устанавливая значение по умолчанию
        UPDATE users 
        SET tooltips_enabled = true 
        WHERE tooltips_enabled IS NULL;
    END IF;
END $$;










