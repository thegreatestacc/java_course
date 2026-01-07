#!/bin/bash

echo "=== Backend Container Status ==="
docker compose -f docker-compose.prod.yml ps backend

echo ""
echo "=== Backend Logs (last 100 lines) ==="
docker compose -f docker-compose.prod.yml logs backend --tail=100

echo ""
echo "=== Backend Health Check ==="
docker compose -f docker-compose.prod.yml exec backend curl -f http://localhost:8080/actuator/health 2>/dev/null || echo "Health endpoint not available or backend is down"

echo ""
echo "=== Testing Backend from inside nginx ==="
docker compose -f docker-compose.prod.yml exec nginx wget -q -O- --timeout=5 http://backend:8080/api/auth/me 2>&1 | head -20 || echo "Backend is NOT reachable from nginx"

echo ""
echo "=== Backend Container Resource Usage ==="
docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.MemPerc}}" java-course-backend 2>/dev/null || echo "Backend container not running"

echo ""
echo "=== Checking if backend is listening on port 8080 ==="
docker compose -f docker-compose.prod.yml exec backend netstat -tlnp 2>/dev/null | grep 8080 || docker compose -f docker-compose.prod.yml exec backend ss -tlnp 2>/dev/null | grep 8080 || echo "Backend is not listening on port 8080"

echo ""
echo "=== PostgreSQL Connection Test ==="
docker compose -f docker-compose.prod.yml exec backend sh -c "echo 'SELECT 1;' | psql -h postgres -U \${POSTGRES_USER:-java_course_user} -d \${POSTGRES_DB:-java_course_db}" 2>&1 | head -5 || echo "Cannot connect to PostgreSQL"

echo ""
echo "=== Redis Connection Test ==="
docker compose -f docker-compose.prod.yml exec backend redis-cli -h redis ping 2>/dev/null || echo "Cannot connect to Redis"

echo ""
echo "=== Checking Liquibase Status ==="
docker compose -f docker-compose.prod.yml exec backend sh -c "grep -i liquibase /proc/*/environ 2>/dev/null | head -1" || echo "Cannot check Liquibase status"

