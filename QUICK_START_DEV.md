# Быстрый старт Dev окружения

## Минимальная настройка

### 1. На сервере создайте директорию и файлы

```bash
mkdir -p /opt/java-course-site/dev
cd /opt/java-course-site/dev

# Создайте .env файл
cat > .env << EOF
TAG=dev
REGISTRY=ghcr.io
OWNER=your-github-username
POSTGRES_DB_DEV=java_course_db_dev
POSTGRES_USER_DEV=java_course_user_dev
POSTGRES_PASSWORD_DEV=$(openssl rand -base64 32)
ADMIN_EMAIL=your-email@example.com
EOF
```

### 2. Скопируйте файлы на сервер

```bash
# С вашего локального компьютера
scp docker-compose.dev.yml user@server:/opt/java-course-site/dev/
scp -r nginx/ user@server:/opt/java-course-site/dev/
```

### 3. Создайте ветку dev и запушьте

```bash
git checkout -b dev
git push origin dev
```

### 4. GitHub Actions автоматически задеплоит

После push в ветку `dev` GitHub Actions:
- Соберет образы
- Задеплоит в dev окружение
- Приложение будет доступно на `http://your-server:8080`

## Проверка

```bash
# На сервере
cd /opt/java-course-site/dev
docker compose -f docker-compose.dev.yml ps
docker compose -f docker-compose.dev.yml logs -f
```

## Доступ

- Frontend: `http://your-server-ip:8080`
- Backend API: `http://your-server-ip:8081/api/`

## Workflow разработки

1. Разрабатывайте фичу в отдельной ветке
2. Смержите в `dev` → автоматический деплой в dev
3. Протестируйте в dev окружении
4. Смержите `dev` в `main` → автоматический деплой в production






