#!/bin/bash

# Скрипт для проверки SSH подключения к серверу
# Использование: ./test-ssh-connection.sh

echo "=== Проверка SSH подключения ==="
echo ""
echo "Введите данные для подключения:"
echo ""

read -p "IP адрес или домен сервера (HOST): " HOST
read -p "Пользователь (USER, обычно root): " USER
read -p "Порт SSH (PORT, обычно 22): " PORT

# Устанавливаем значение по умолчанию для порта
PORT=${PORT:-22}

echo ""
echo "Попытка подключения к $USER@$HOST:$PORT..."
echo ""

# Проверка доступности хоста
echo "1. Проверка доступности хоста..."
if ping -c 1 -W 2 "$HOST" > /dev/null 2>&1; then
    echo "✓ Хост доступен"
else
    echo "✗ Хост недоступен (ping не прошел)"
    echo "  Это может быть нормально, если ping отключен на сервере"
fi

echo ""
echo "2. Проверка SSH порта..."
if timeout 3 bash -c "echo > /dev/tcp/$HOST/$PORT" 2>/dev/null; then
    echo "✓ Порт $PORT открыт"
else
    echo "✗ Порт $PORT недоступен или закрыт"
    echo "  Проверьте файрвол и настройки SSH на сервере"
fi

echo ""
echo "3. Попытка SSH подключения..."
ssh -p "$PORT" -o ConnectTimeout=10 -o StrictHostKeyChecking=no "$USER@$HOST" "echo 'SSH подключение успешно!' && hostname && whoami" 2>&1

if [ $? -eq 0 ]; then
    echo ""
    echo "✓ SSH подключение работает!"
    echo ""
    echo "Проверьте, что эти значения совпадают с GitHub Secrets:"
    echo "  DEPLOY_HOST=$HOST"
    echo "  DEPLOY_USER=$USER"
    echo "  DEPLOY_PORT=$PORT"
else
    echo ""
    echo "✗ SSH подключение не удалось"
    echo ""
    echo "Возможные причины:"
    echo "  1. Неправильный IP адрес или домен"
    echo "  2. Неправильный порт (проверьте на сервере: sudo netstat -tlnp | grep sshd)"
    echo "  3. Неправильное имя пользователя"
    echo "  4. Файрвол блокирует соединение"
    echo "  5. SSH сервис не запущен на сервере"
    echo "  6. SSH ключ не настроен (нужен пароль или ключ)"
    echo ""
    echo "Для подключения с ключом используйте:"
    echo "  ssh -p $PORT -i /path/to/private/key $USER@$HOST"
fi






