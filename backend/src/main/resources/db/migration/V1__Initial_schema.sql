-- Создание таблицы users
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP
);

-- Создание таблицы test_results
CREATE TABLE IF NOT EXISTS test_results (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    test_type VARCHAR(255) NOT NULL,
    topic VARCHAR(255),
    correct_answers INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    percentage INTEGER NOT NULL,
    completed_at TIMESTAMP NOT NULL,
    CONSTRAINT fk_test_results_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Создание таблицы user_activities
CREATE TABLE IF NOT EXISTS user_activities (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    activity_date DATE NOT NULL,
    tasks_completed INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    CONSTRAINT fk_user_activities_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT uk_user_activities_user_date UNIQUE (user_id, activity_date)
);

-- Создание таблицы material_progress
CREATE TABLE IF NOT EXISTS material_progress (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    material_id VARCHAR(255) NOT NULL,
    completed_at TIMESTAMP NOT NULL,
    CONSTRAINT fk_material_progress_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT uk_material_progress_user_material UNIQUE (user_id, material_id)
);

