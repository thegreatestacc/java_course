package org.sovliv.backend.config;

import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.concurrent.ConcurrentMapCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.data.redis.serializer.JdkSerializationRedisSerializer;

import java.time.Duration;

/**
 * Конфигурация кэширования.
 * В prod-режиме использует Redis, в dev-режиме - простой in-memory кэш.
 */
@Configuration
@EnableCaching
public class CacheConfig {

    /**
     * Redis-based кэш для production
     */
    @Bean
    @Profile("prod")
    public CacheManager redisCacheManager(RedisConnectionFactory connectionFactory) {
        RedisCacheConfiguration defaultConfig = RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofMinutes(5)) // TTL по умолчанию 5 минут
                .serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(new StringRedisSerializer()))
                .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(new JdkSerializationRedisSerializer()))
                .disableCachingNullValues(); // Не кэшируем null значения для экономии памяти

        // Конфигурация для разных типов кэша
        RedisCacheConfiguration statisticsConfig = defaultConfig.entryTtl(Duration.ofMinutes(10));
        RedisCacheConfiguration activityConfig = defaultConfig.entryTtl(Duration.ofMinutes(15));
        RedisCacheConfiguration compileConfig = defaultConfig.entryTtl(Duration.ofHours(1)); // Результаты компиляции кэшируем дольше

        return RedisCacheManager.builder(connectionFactory)
                .cacheDefaults(defaultConfig)
                .withCacheConfiguration("userStatistics", statisticsConfig)
                .withCacheConfiguration("userActivity", activityConfig)
                .withCacheConfiguration("compileResults", compileConfig)
                .withCacheConfiguration("materialStatus", defaultConfig.entryTtl(Duration.ofMinutes(5)))
                .build();
    }

    /**
     * Простой in-memory кэш для dev-режима (без Redis)
     */
    @Bean
    @Profile("!prod")
    public CacheManager simpleCacheManager() {
        return new ConcurrentMapCacheManager(
                "userStatistics",
                "userActivity",
                "compileResults",
                "materialStatus"
        );
    }
}

