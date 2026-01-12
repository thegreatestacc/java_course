# Настройка Dev окружения

## Описание

Dev окружение предназначено для тестирования новых фич перед деплоем на production. Оно работает параллельно с production окружением на том же сервере, но использует отдельные порты, базу данных и конфигурацию.

## Архитектура

- **Отдельная база данных**: `java_course_db_dev` (порт 5433)
- **Отдельный Redis**: порт 6380
- **Отдельные контейнеры**: все сервисы с суффиксом `-dev`
- **Отдельные порты**: 
  - Frontend: 8080 (HTTP)
  - Backend: 8081
  - PostgreSQL: 5433
  - Redis: 6380
- **Отдельный домен/поддомен**: `dev.devcours.ru` (настраивается в nginx)

## Требования

- Docker и Docker Compose на удаленном сервере
- Настроенные GitHub Secrets (можно использовать те же, что и для prod, или отдельные):
  - `DEPLOY_DEV_HOST` (или `DEPLOY_HOST`) - IP адрес или домен сервера
  - `DEPLOY_DEV_USER` (или `DEPLOY_USER`) - пользователь для SSH подключения
  - `DEPLOY_DEV_PORT` (или `DEPLOY_PORT`) - порт SSH (обычно 22)
  - `DEPLOY_DEV_SSH_KEY` (или `DEPLOY_SSH_KEY`) - приватный SSH ключ
  - `DEPLOY_DEV_PATH` (или `DEPLOY_PATH`) - путь к директории на сервере
  - `GHCR_TOKEN` - токен для доступа к GitHub Container Registry
  - `ADMIN_EMAIL` - email для админ аккаунта в dev окружении

## Настройка на сервере

### 1. Создайте директорию для dev окружения

```bash
mkdir -p /opt/java-course-site/dev
cd /opt/java-course-site/dev
```

### 2. Скопируйте файлы

Скопируйте на сервер:
- `docker-compose.dev.yml`
- Директорию `nginx/` (или создайте символическую ссылку)

### 3. Создайте файл `.env` для dev окружения

```bash
cat > .env << EOF
TAG=dev
REGISTRY=ghcr.io
OWNER=your-github-username

# PostgreSQL настройки для dev
POSTGRES_DB_DEV=java_course_db_dev
POSTGRES_USER_DEV=java_course_user_dev
POSTGRES_PASSWORD_DEV=$(openssl rand -base64 32)

# Redis настройки (используются автоматически)
SPRING_REDIS_HOST=redis-dev
SPRING_REDIS_PORT=6379

# Admin email для dev окружения
ADMIN_EMAIL=your-dev-admin@example.com
EOF
```

**Важно:** Замените `your-dev-admin@example.com` на ваш email для dev окружения!

### 4. Настройте DNS (опционально)

Если хотите использовать поддомен `dev.devcours.ru`:

```bash
# Добавьте A-запись в DNS:
# dev.devcours.ru -> IP_вашего_сервера
```

### 5. Настройте Nginx на основном сервере (если используете поддомен)

Если у вас уже есть production nginx на сервере, добавьте конфигурацию для dev поддомена:

```nginx
# В /etc/nginx/sites-available/dev.devcours.ru
server {
    listen 80;
    server_name dev.devcours.ru;
    
    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Или используйте порт напрямую: `http://your-server-ip:8080`

## Автоматическое развертывание

После настройки, при каждом push в ветку `dev`, `develop` или `development` GitHub Actions автоматически:

1. Соберет Docker образы для backend и frontend с тегом `dev`
2. Загрузит их в GitHub Container Registry
3. Подключится к серверу по SSH
4. Обновит образы и перезапустит контейнеры в dev окружении

## Ручное развертывание

Если нужно развернуть вручную:

```bash
cd /opt/java-course-site/dev

# Обновить образы
docker compose -f docker-compose.dev.yml pull

# Запустить/перезапустить контейнеры
docker compose -f docker-compose.dev.yml up -d --remove-orphans

# Просмотр логов
docker compose -f docker-compose.dev.yml logs -f

# Остановить
docker compose -f docker-compose.dev.yml down
```

## Проверка статуса

```bash
cd /opt/java-course-site/dev
docker compose -f docker-compose.dev.yml ps
docker compose -f docker-compose.dev.yml logs -f backend-dev
```

## Доступ к приложению

После развертывания dev окружение будет доступно по адресу:
- **HTTP**: `http://your-server-ip:8080` или `http://dev.devcours.ru` (если настроен DNS)
- **Backend API**: `http://your-server-ip:8081/api/`

## Отличия от Production

| Параметр | Production | Dev |
|----------|-----------|-----|
| База данных | `java_course_db` | `java_course_db_dev` |
| Порт PostgreSQL | 5432 | 5433 |
| Порт Redis | 6379 | 6380 |
| Порт Backend | 8080 | 8081 |
| Порт Frontend | 80/443 | 8080 |
| Профиль Spring | `prod` | `dev` |
| Логирование | INFO | DEBUG |
| SQL логи | Выключены | Включены |
| Ресурсы | Ограничены | Более щедрые |

## Резервное копирование dev базы данных

```bash
cd /opt/java-course-site/dev
docker compose -f docker-compose.dev.yml exec postgres-dev pg_dump -U java_course_user_dev java_course_db_dev > backup_dev_$(date +%Y%m%d_%H%M%S).sql
```

## Восстановление dev базы данных

```bash
cd /opt/java-course-site/dev
docker compose -f docker-compose.dev.yml exec -T postgres-dev psql -U java_course_user_dev java_course_db_dev < backup_dev_file.sql
```

## Работа с ветками

### Рекомендуемый workflow:

1. **Разработка фичи**: создайте ветку `feature/your-feature`
2. **Тестирование в dev**: смержите в `dev` ветку → автоматический деплой в dev окружение
3. **Тестирование**: проверьте работу в dev окружении
4. **Деплой в production**: после успешного тестирования смержите `dev` в `main` → автоматический деплой в production

### Пример:

```bash
# Создать фичу
git checkout -b feature/new-admin-panel
# ... разработка ...

# Закоммитить и запушить
git push origin feature/new-admin-panel

# Смержить в dev для тестирования
git checkout dev
git merge feature/new-admin-panel
git push origin dev
# → Автоматический деплой в dev окружение

# После тестирования - смержить в main
git checkout main
git merge dev
git push origin main
# → Автоматический деплой в production
```

## Устранение проблем

### Проблема: Контейнеры не запускаются

```bash
# Проверьте логи
docker compose -f docker-compose.dev.yml logs

# Проверьте статус
docker compose -f docker-compose.dev.yml ps

# Пересоздайте контейнеры
docker compose -f docker-compose.dev.yml up -d --force-recreate
```

### Проблема: База данных не подключается

```bash
# Проверьте, что postgres-dev запущен
docker compose -f docker-compose.dev.yml ps postgres-dev

# Проверьте логи
docker compose -f docker-compose.dev.yml logs postgres-dev

# Проверьте переменные окружения
docker compose -f docker-compose.dev.yml exec backend-dev env | grep POSTGRES
```

### Проблема: Порт уже занят

Если порт 8080 или 8081 уже занят, измените порты в `docker-compose.dev.yml`:

```yaml
nginx-dev:
  ports:
    - "8082:80"  # Измените на свободный порт

backend-dev:
  ports:
    - "8083:8080"  # Измените на свободный порт
```

## Безопасность

⚠️ **Важно для dev окружения:**

1. Dev окружение **не должен** быть доступен публично без аутентификации
2. Используйте firewall для ограничения доступа к dev портам
3. Не используйте production пароли в dev окружении
4. Регулярно очищайте dev базу данных от тестовых данных

## Очистка dev окружения

Если нужно полностью очистить dev окружение:

```bash
cd /opt/java-course-site/dev
docker compose -f docker-compose.dev.yml down -v
rm -rf .env
```

Это удалит все контейнеры и volumes (включая базу данных).






