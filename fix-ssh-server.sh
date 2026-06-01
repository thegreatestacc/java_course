#!/bin/bash

echo "=== Диагностика SSH на сервере ==="
echo ""

# 1. Проверка статуса SSH сервиса
echo "1. Статус SSH сервиса:"
sudo systemctl status sshd --no-pager -l | head -10
echo ""

# 2. Проверка, на каких интерфейсах слушает SSH
echo "2. SSH слушает на:"
sudo netstat -tlnp | grep sshd || sudo ss -tlnp | grep sshd
echo ""

# 3. Проверка iptables правил
echo "3. Правила iptables для порта 22:"
sudo iptables -L -n -v | grep 22 || echo "Нет правил для порта 22"
echo ""

# 4. Проверка всех правил iptables
echo "4. Все правила INPUT в iptables:"
sudo iptables -L INPUT -n -v --line-numbers
echo ""

# 5. Проверка конфигурации SSH
echo "5. Конфигурация SSH (Port и ListenAddress):"
sudo grep -E "^Port|^ListenAddress|^#Port|^#ListenAddress" /etc/ssh/sshd_config
echo ""

# 6. Проверка, что SSH может принимать соединения
echo "6. Проверка доступности порта 22 локально:"
sudo netstat -tlnp | grep :22 || echo "Порт 22 не слушается"
echo ""

echo "=== Рекомендации ==="
echo ""
echo "Если SSH слушает только на 127.0.0.1, нужно изменить ListenAddress в /etc/ssh/sshd_config"
echo "Если iptables блокирует, нужно добавить правило: sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT"
echo ""











