package org.sovliv.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;

/**
 * Конфигурация для использования Redis в качестве хранилища сессий.
 * Это позволяет нескольким инстансам backend работать с общими сессиями.
 * Spring Session автоматически использует cookie-based подход для совместимости с фронтендом.
 * 
 * В dev-режиме (без профиля prod) Redis не требуется - используются обычные in-memory сессии.
 */
@Configuration
@Profile("prod")
@EnableRedisHttpSession(maxInactiveIntervalInSeconds = 1800)
public class RedisSessionConfig {
    // Конфигурация выполняется через аннотацию @EnableRedisHttpSession
    // Cookie-based резолвер используется по умолчанию
    // В dev-режиме (без профиля prod) эта конфигурация не активна
}

