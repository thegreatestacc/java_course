package org.sovliv.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;

/**
 * Конфигурация для использования Redis в качестве хранилища сессий.
 * Это позволяет нескольким инстансам backend работать с общими сессиями.
 * Spring Session автоматически использует cookie-based подход для совместимости с фронтендом.
 */
@Configuration
@EnableRedisHttpSession(maxInactiveIntervalInSeconds = 1800)
public class RedisSessionConfig {
    // Конфигурация выполняется через аннотацию @EnableRedisHttpSession
    // Cookie-based резолвер используется по умолчанию
}

