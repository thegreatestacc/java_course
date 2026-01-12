# Руководство по масштабированию и распараллеливанию нагрузки

Этот документ описывает настройки для распараллеливания нагрузки на сервис.

## Архитектура

Система теперь поддерживает горизонтальное масштабирование через:

1. **Redis** - для хранения общих сессий между инстансами backend
2. **Nginx** - как load balancer для распределения запросов
3. **Connection Pool** - оптимизированный пул соединений с PostgreSQL
4. **Thread Pool** - параллельная обработка выполнения Java кода

## Компоненты

### Redis (Session Store)
- Хранит сессии пользователей в централизованном хранилище
- Позволяет нескольким инстансам backend работать с общими сессиями
- Настроен через Spring Session

### Nginx (Load Balancer)
- Распределяет входящие запросы между инстансами backend
- Использует алгоритм `least_conn` (наименьшее количество соединений)
- Поддерживает health checks и failover

### Connection Pool (HikariCP)
- Максимальный размер пула: 20 соединений
- Минимальный idle: 5 соединений
- Таймауты настроены для оптимальной производительности

### Thread Pool (Java Execution)
- Динамический размер пула: количество ядер × 2
- Минимум 4 потока
- Очередь задач: 100 элементов

## Использование

### Разработка (docker-compose.yml)

Запуск с Redis:
```bash
docker-compose up -d
```

Backend автоматически подключится к Redis на `localhost:6379`.

### Продакшн (docker-compose.prod.yml)

#### Базовый запуск:
```bash
docker-compose -f docker-compose.prod.yml up -d
```

#### Масштабирование backend инстансов:
```bash
# Запустить 3 инстанса backend
docker-compose -f docker-compose.prod.yml up -d --scale backend=3
```

Nginx автоматически обнаружит все инстансы и распределит нагрузку между ними.

#### Проверка статуса:
```bash
# Проверить количество запущенных инстансов
docker-compose -f docker-compose.prod.yml ps backend

# Проверить логи Nginx
docker-compose -f docker-compose.prod.yml logs nginx

# Проверить логи Redis
docker-compose -f docker-compose.prod.yml logs redis
```

## Конфигурация

### Переменные окружения

Для продакшн окружения можно настроить через переменные окружения:

```bash
# PostgreSQL
export POSTGRES_DB=java_course_db
export POSTGRES_USER=java_course_user
export POSTGRES_PASSWORD=your_password

# Redis
export REDIS_HOST=redis
export REDIS_PORT=6379
export REDIS_PASSWORD=your_redis_password  # опционально

# Docker Registry
export REGISTRY=ghcr.io
export OWNER=your_username
export TAG=latest
```

### Настройка Nginx

Конфигурация Nginx находится в:
- `nginx/nginx.conf` - основная конфигурация
- `nginx/conf.d/default.conf` - конфигурация виртуальных хостов

Для добавления большего количества backend инстансов в upstream, отредактируйте `nginx/conf.d/default.conf`:

```nginx
upstream backend_servers {
    least_conn;
    server backend:8080 max_fails=3 fail_timeout=30s;
    server backend:8080 max_fails=3 fail_timeout=30s;
    server backend:8080 max_fails=3 fail_timeout=30s;
    keepalive 32;
}
```

**Примечание:** В Docker Compose все инстансы сервиса `backend` автоматически доступны через DNS имя `backend`, поэтому Nginx автоматически обнаружит все инстансы.

### Настройка Connection Pool

Параметры connection pool можно изменить в:
- `backend/src/main/resources/application.properties` (разработка)
- `backend/src/main/resources/application-prod.properties` (продакшн)

Основные параметры:
```properties
spring.datasource.hikari.maximum-pool-size=20
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.connection-timeout=30000
```

### Настройка Thread Pool

Размер пула потоков для выполнения Java кода настраивается автоматически на основе количества ядер процессора. Для изменения логики отредактируйте метод `init()` в `JavaExecutionService.java`.

## Мониторинг

### Проверка Redis
```bash
# Подключиться к Redis CLI
docker exec -it java-course-redis redis-cli

# Проверить количество ключей (сессий)
KEYS *

# Проверить информацию о Redis
INFO
```

### Проверка Nginx
```bash
# Статистика подключений
docker exec -it java-course-nginx nginx -t

# Проверить конфигурацию
docker exec -it java-course-nginx cat /etc/nginx/conf.d/default.conf
```

### Проверка Backend
```bash
# Логи всех инстансов
docker-compose -f docker-compose.prod.yml logs backend

# Логи конкретного инстанса
docker logs java-course-backend-1
docker logs java-course-backend-2
```

## Производительность

### Рекомендации

1. **Количество инстансов backend:**
   - Начните с 2-3 инстансов
   - Увеличивайте по мере необходимости
   - Мониторьте использование CPU и памяти

2. **Connection Pool:**
   - Размер пула должен быть: `(количество инстансов × 10) + резерв`
   - Для 3 инстансов: `(3 × 10) + 10 = 40` соединений максимум

3. **Redis:**
   - Для высоконагруженных систем рассмотрите Redis Cluster
   - Настройте persistence для надежности

4. **Nginx:**
   - Увеличьте `worker_connections` при большом количестве одновременных подключений
   - Настройте кэширование для статических ресурсов

## Troubleshooting

### Проблема: Сессии не сохраняются между запросами

**Решение:**
1. Проверьте, что Redis запущен: `docker-compose ps redis`
2. Проверьте подключение backend к Redis в логах
3. Убедитесь, что все инстансы backend используют один и тот же Redis

### Проблема: Nginx не видит backend инстансы

**Решение:**
1. Убедитесь, что все сервисы в одной сети: `docker-compose network ls`
2. Проверьте DNS резолюцию: `docker exec nginx ping backend`
3. Перезапустите Nginx: `docker-compose restart nginx`

### Проблема: Превышен лимит соединений к БД

**Решение:**
1. Уменьшите `maximum-pool-size` в каждом инстансе
2. Увеличьте `max_connections` в PostgreSQL
3. Проверьте утечки соединений через `leak-detection-threshold`

## Дополнительные улучшения

Для дальнейшего масштабирования рассмотрите:

1. **Кэширование:**
   - Redis для кэширования часто запрашиваемых данных
   - Spring Cache с Redis

2. **База данных:**
   - Read replicas для распределения чтения
   - Connection pooling на уровне приложения

3. **Мониторинг:**
   - Prometheus + Grafana для метрик
   - ELK Stack для логов

4. **Автомасштабирование:**
   - Kubernetes с Horizontal Pod Autoscaler
   - Docker Swarm mode






