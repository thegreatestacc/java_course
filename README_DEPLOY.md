# Инструкция по развертыванию

## Требования

- Docker и Docker Compose на удаленном сервере
- Настроенные GitHub Secrets:
  - `DEPLOY_HOST` - IP адрес или домен сервера
  - `DEPLOY_USER` - пользователь для SSH подключения
  - `DEPLOY_PORT` - порт SSH (обычно 22)
  - `DEPLOY_SSH_KEY` - приватный SSH ключ для подключения
  - `DEPLOY_PATH` - путь к директории на сервере, где будет развернуто приложение
  - `GHCR_TOKEN` - токен для доступа к GitHub Container Registry

## Настройка на сервере

1. Создайте директорию для проекта:
```bash
mkdir -p /opt/java-course-site
cd /opt/java-course-site
```

2. Скопируйте файл `docker-compose.prod.yml` на сервер в эту директорию

3. Создайте файл `.env` с переменными окружения:
```bash
cat > .env << EOF
TAG=latest
REGISTRY=ghcr.io
OWNER=your-github-username

# PostgreSQL настройки
POSTGRES_DB=java_course_db
POSTGRES_USER=java_course_user
POSTGRES_PASSWORD=your_secure_password_here
EOF
```

**Важно:** Замените `your_secure_password_here` на надежный пароль!

4. Убедитесь, что порты 3000 (frontend) и 8080 (backend) доступны

## Автоматическое развертывание

После настройки, при каждом push в ветку `main` GitHub Actions автоматически:
1. Соберет Docker образы для backend и frontend
2. Загрузит их в GitHub Container Registry
3. Подключится к серверу по SSH
4. Обновит образы и перезапустит контейнеры

## Ручное развертывание

Если нужно развернуть вручную:

```bash
cd /opt/java-course-site
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d
```

## Проверка статуса

```bash
docker compose -f docker-compose.prod.yml ps
docker compose -f docker-compose.prod.yml logs -f
```

## Резервное копирование базы данных

```bash
docker compose -f docker-compose.prod.yml exec postgres pg_dump -U java_course_user java_course_db > backup_$(date +%Y%m%d_%H%M%S).sql
```

## Восстановление из резервной копии

```bash
docker compose -f docker-compose.prod.yml exec -T postgres psql -U java_course_user java_course_db < backup_file.sql
```


