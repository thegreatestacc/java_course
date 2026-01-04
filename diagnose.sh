#!/bin/bash

echo "=== Docker Container Status ==="
docker compose -f docker-compose.prod.yml ps

echo ""
echo "=== Nginx Logs (last 50 lines) ==="
docker compose -f docker-compose.prod.yml logs nginx --tail=50

echo ""
echo "=== Nginx Error Logs (last 20 lines) ==="
docker compose -f docker-compose.prod.yml exec nginx cat /var/log/nginx/error.log 2>/dev/null | tail -20 || echo "Cannot read error log"

echo ""
echo "=== Checking if nginx listens on port 80 ==="
docker compose -f docker-compose.prod.yml exec nginx netstat -tlnp 2>/dev/null | grep 80 || docker compose -f docker-compose.prod.yml exec nginx ss -tlnp 2>/dev/null | grep 80 || echo "Cannot check ports"

echo ""
echo "=== Testing Frontend from inside nginx ==="
docker compose -f docker-compose.prod.yml exec nginx wget -q -O- --timeout=5 http://frontend:3000 > /dev/null 2>&1 && echo "✓ Frontend is reachable" || echo "✗ Frontend is NOT reachable"

echo ""
echo "=== Testing Backend from inside nginx ==="
docker compose -f docker-compose.prod.yml exec nginx wget -q -O- --timeout=5 http://backend:8080/health > /dev/null 2>&1 && echo "✓ Backend is reachable" || echo "✗ Backend is NOT reachable"

echo ""
echo "=== Testing nginx from host (localhost) ==="
curl -I http://localhost:80 2>&1 | head -5 || echo "Cannot connect to nginx on localhost:80"

echo ""
echo "=== Checking port 80 on host ==="
ss -tlnp | grep :80 || netstat -tlnp | grep :80 || echo "Cannot check port 80"

echo ""
echo "=== Nginx Configuration Test ==="
docker compose -f docker-compose.prod.yml exec nginx nginx -t 2>&1

echo ""
echo "=== Backend Logs (last 20 lines) ==="
docker compose -f docker-compose.prod.yml logs backend --tail=20

echo ""
echo "=== Frontend Logs (last 20 lines) ==="
docker compose -f docker-compose.prod.yml logs frontend --tail=20

