-- Скрипт для ручного добавления колонки tooltips_enabled в таблицу users
-- Выполните этот скрипт в базе данных на проде, если миграция не применилась автоматически

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
        
        RAISE NOTICE 'Колонка tooltips_enabled успешно добавлена в таблицу users';
    ELSE
        RAISE NOTICE 'Колонка tooltips_enabled уже существует в таблице users';
    END IF;
END $$;


