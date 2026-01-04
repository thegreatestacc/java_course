package org.sovliv.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

/**
 * Сервис для ограничения частоты запросов (rate limiting).
 * Использует Redis для хранения счетчиков запросов.
 */
@Service
public class RateLimitService {

    private final RedisTemplate<String, String> redisTemplate;
    private static final int MAX_REQUESTS_PER_MINUTE = 10; // Максимум 10 запросов в минуту
    private static final String RATE_LIMIT_KEY_PREFIX = "rate_limit:compile:";

    @Autowired
    public RateLimitService(RedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    /**
     * Проверяет, можно ли выполнить запрос на компиляцию.
     * @param userId ID пользователя (может быть null для анонимных)
     * @param ipAddress IP адрес клиента
     * @return true если запрос разрешен, false если превышен лимит
     */
    public boolean isAllowed(Long userId, String ipAddress) {
        String key = RATE_LIMIT_KEY_PREFIX + (userId != null ? userId : ipAddress);
        
        String countStr = redisTemplate.opsForValue().get(key);
        int count = countStr != null ? Integer.parseInt(countStr) : 0;
        
        if (count >= MAX_REQUESTS_PER_MINUTE) {
            return false;
        }
        
        // Увеличиваем счетчик
        redisTemplate.opsForValue().increment(key);
        
        // Устанавливаем TTL для ключа (1 минута)
        redisTemplate.expire(key, 1, TimeUnit.MINUTES);
        
        return true;
    }

    /**
     * Получает количество оставшихся запросов.
     */
    public int getRemainingRequests(Long userId, String ipAddress) {
        String key = RATE_LIMIT_KEY_PREFIX + (userId != null ? userId : ipAddress);
        String countStr = redisTemplate.opsForValue().get(key);
        int count = countStr != null ? Integer.parseInt(countStr) : 0;
        return Math.max(0, MAX_REQUESTS_PER_MINUTE - count);
    }
}

