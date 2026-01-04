# Настройка SSL сертификата для devcours.ru

## Шаг 1: Получение SSL сертификата Let's Encrypt

Выполните на сервере:

```bash
# 1. Установите certbot
sudo apt update
sudo apt install certbot -y

# 2. Остановите nginx контейнер временно (если запущен)
cd /opt/apps/java_course
docker compose -f docker-compose.prod.yml stop nginx || true

# 3. Получите сертификат (замените email на ваш)
sudo certbot certonly --standalone -d devcours.ru -d www.devcours.ru \
  --email your-email@example.com \
  --agree-tos \
  --non-interactive

# 4. Сертификаты будут сохранены в:
# /etc/letsencrypt/live/devcours.ru-0001/fullchain.pem (или devcours.ru)
# /etc/letsencrypt/live/devcours.ru-0001/privkey.pem (или devcours.ru)
# Проверьте фактический путь после получения сертификата
```

## Шаг 2: Проверка сертификатов

```bash
# Проверьте, что сертификаты созданы
sudo ls -la /etc/letsencrypt/live/devcours.ru/

# Должны быть файлы:
# - fullchain.pem (сертификат)
# - privkey.pem (приватный ключ)
```

## Шаг 3: Запуск контейнеров

```bash
cd /opt/apps/java_course

# Запустите контейнеры (nginx подключит сертификаты)
docker compose -f docker-compose.prod.yml up -d

# Проверьте логи nginx
docker compose -f docker-compose.prod.yml logs nginx
```

## Шаг 4: Проверка SSL

```bash
# Проверьте доступность HTTPS
curl -I https://devcours.ru

# Или откройте в браузере
# https://devcours.ru
```

## Шаг 5: Автоматическое обновление сертификата

Let's Encrypt сертификаты действительны 90 дней. Настройте автоматическое обновление:

```bash
# Создайте скрипт для обновления
sudo nano /etc/cron.monthly/renew-ssl.sh
```

Содержимое скрипта:
```bash
#!/bin/bash
cd /opt/apps/java_course
docker compose -f docker-compose.prod.yml stop nginx
certbot renew --quiet
docker compose -f docker-compose.prod.yml start nginx
```

```bash
# Сделайте скрипт исполняемым
sudo chmod +x /etc/cron.monthly/renew-ssl.sh
```

## Настройка Cloudflare

После установки SSL на сервере:

1. Войдите в панель Cloudflare
2. Выберите домен `devcours.ru`
3. Перейдите в SSL/TLS → Overview
4. Установите режим: "Full" или "Full (strict)"
   - "Full" - Cloudflare → Origin: HTTPS (с самоподписанным сертификатом тоже работает)
   - "Full (strict)" - Cloudflare → Origin: HTTPS (требует валидный сертификат)

## Troubleshooting

### Проблема: certbot не может получить сертификат

**Решение:**
- Убедитесь, что порт 80 открыт в firewall
- Убедитесь, что домен `devcours.ru` указывает на IP сервера
- Временно остановите nginx контейнер

### Проблема: nginx не может найти сертификаты

**Решение:**
```bash
# Проверьте пути в docker-compose.prod.yml
# Должны совпадать с путями, где certbot сохранил сертификаты
sudo ls -la /etc/letsencrypt/live/devcours.ru/
```

### Проблема: 502 Bad Gateway после настройки SSL

**Решение:**
```bash
# Проверьте логи nginx
docker compose -f docker-compose.prod.yml logs nginx

# Проверьте, что сертификаты доступны
docker compose -f docker-compose.prod.yml exec nginx ls -la /etc/nginx/ssl/
```

