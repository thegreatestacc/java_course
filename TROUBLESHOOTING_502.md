# Устранение ошибки 502 Bad Gateway

## Симптомы
- При попытке залогиниться получаете ошибку "Ошибка 502: Сервер не отвечает"
- Backend недоступен через nginx

## Диагностика

### 1. Проверьте статус контейнеров
```bash
docker compose -f docker-compose.prod.yml ps
```

Убедитесь, что все контейнеры запущены (Status: Up).

### 2. Проверьте логи backend
```bash
# Последние 100 строк логов
docker compose -f docker-compose.prod.yml logs backend --tail=100

# Логи в реальном времени
docker compose -f docker-compose.prod.yml logs -f backend
```

**Что искать:**
- Ошибки подключения к PostgreSQL
- Ошибки подключения к Redis
- Ошибки Liquibase миграций
- Ошибки компиляции или запуска Spring Boot

### 3. Проверьте доступность backend из nginx
```bash
docker compose -f docker-compose.prod.yml exec nginx wget -q -O- --timeout=5 http://backend:8080/api/auth/me
```

Если команда не выполняется или возвращает ошибку - backend недоступен.

### 4. Проверьте подключение к PostgreSQL
```bash
docker compose -f docker-compose.prod.yml exec backend sh -c "echo 'SELECT 1;' | psql -h postgres -U \${POSTGRES_USER:-java_course_user} -d \${POSTGRES_DB:-java_course_db}"
```

### 5. Проверьте подключение к Redis
```bash
docker compose -f docker-compose.prod.yml exec backend redis-cli -h redis ping
```

Должно вернуть `PONG`.

### 6. Проверьте, слушает ли backend порт 8080
```bash
docker compose -f docker-compose.prod.yml exec backend netstat -tlnp | grep 8080
```

## Частые причины и решения

### Проблема 1: Backend падает при старте из-за ошибок миграций Liquibase

**Симптомы:**
- В логах видны ошибки типа "Column already exists" или "Table already exists"
- Backend контейнер постоянно перезапускается

**Решение:**
1. Проверьте, какие миграции уже применены:
```bash
docker compose -f docker-compose.prod.yml exec postgres psql -U java_course_user -d java_course_db -c "SELECT * FROM databasechangelog ORDER BY dateexecuted DESC LIMIT 10;"
```

2. Если миграции падают, можно временно отключить Liquibase:
   - В `application-prod.properties` установите: `spring.liquibase.enabled=false`
   - Пересоберите и перезапустите backend

3. Или вручную добавьте недостающие колонки в БД:
```sql
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false NOT NULL;
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_blocked BOOLEAN DEFAULT false NOT NULL;
```

### Проблема 2: Backend не может подключиться к PostgreSQL

**Симптомы:**
- В логах: "Connection refused" или "Connection timeout"
- Ошибки типа "FATAL: password authentication failed"

**Решение:**
1. Проверьте переменные окружения в docker-compose.prod.yml
2. Убедитесь, что PostgreSQL запущен: `docker compose -f docker-compose.prod.yml ps postgres`
3. Проверьте логи PostgreSQL: `docker compose -f docker-compose.prod.yml logs postgres`

### Проблема 3: Backend не может подключиться к Redis

**Симптомы:**
- В логах: "Unable to connect to Redis"
- Backend запускается, но сессии не работают

**Решение:**
1. Проверьте, что Redis запущен: `docker compose -f docker-compose.prod.yml ps redis`
2. Проверьте переменную `SPRING_REDIS_HOST` в docker-compose.prod.yml (должна быть `redis`)
3. Временно можно отключить Redis для сессий, изменив в `application-prod.properties`:
   ```properties
   spring.session.store-type=none
   ```

### Проблема 4: Недостаточно памяти

**Симптомы:**
- Backend контейнер падает с ошибкой OOM (Out of Memory)
- В логах: "java.lang.OutOfMemoryError"

**Решение:**
1. Увеличьте лимит памяти для backend в docker-compose.prod.yml
2. Или уменьшите настройки пула соединений в application-prod.properties

## Быстрое решение

Если нужно быстро восстановить работу:

1. **Перезапустите все контейнеры:**
```bash
docker compose -f docker-compose.prod.yml restart
```

2. **Если не помогло, пересоздайте backend:**
```bash
docker compose -f docker-compose.prod.yml up -d --force-recreate backend
```

3. **Проверьте логи после перезапуска:**
```bash
docker compose -f docker-compose.prod.yml logs -f backend
```

## Полезные команды

```bash
# Полная диагностика
./check-backend.sh

# Проверка статуса всех сервисов
docker compose -f docker-compose.prod.yml ps

# Логи всех сервисов
docker compose -f docker-compose.prod.yml logs

# Перезапуск конкретного сервиса
docker compose -f docker-compose.prod.yml restart backend

# Просмотр использования ресурсов
docker stats
```

