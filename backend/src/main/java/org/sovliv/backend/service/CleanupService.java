package org.sovliv.backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.sovliv.backend.repository.ErrorReportRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Comparator;
import java.util.stream.Stream;

@Service
public class CleanupService {

    private static final Logger log = LoggerFactory.getLogger(CleanupService.class);
    private static final int RETENTION_DAYS = 30;
    private static final String TEMP_DIR = System.getProperty("java.io.tmpdir");
    private static final long TEMP_FILE_MAX_AGE_HOURS = 1;

    private final ErrorReportRepository errorReportRepository;

    public CleanupService(ErrorReportRepository errorReportRepository) {
        this.errorReportRepository = errorReportRepository;
    }

    @Scheduled(cron = "0 0 3 * * *") // Каждый день в 3:00 ночи
    public void cleanupOldErrorReports() {
        LocalDateTime cutoffDate = LocalDateTime.now().minusDays(RETENTION_DAYS);
        int deletedCount = errorReportRepository.deleteOlderThan(cutoffDate);
        if (deletedCount > 0) {
            log.info("Очистка error_reports: удалено {} записей старше {} дней", deletedCount, RETENTION_DAYS);
        }
    }

    @Scheduled(fixedRate = 3600000) // Каждый час
    public void cleanupOldTempFiles() {
        Path tempPath = Paths.get(TEMP_DIR);
        Instant cutoffTime = Instant.now().minus(TEMP_FILE_MAX_AGE_HOURS, ChronoUnit.HOURS);
        int deletedCount = 0;

        try (Stream<Path> dirs = Files.list(tempPath)) {
            for (Path dir : dirs.filter(p -> p.getFileName().toString().startsWith("java_exec_")).toList()) {
                try {
                    Instant lastModified = Files.getLastModifiedTime(dir).toInstant();
                    if (lastModified.isBefore(cutoffTime)) {
                        deleteDirectory(dir);
                        deletedCount++;
                    }
                } catch (IOException e) {
                    log.warn("Не удалось проверить/удалить временную директорию: {}", dir);
                }
            }
        } catch (IOException e) {
            log.error("Ошибка при очистке временных директорий: {}", e.getMessage());
        }

        if (deletedCount > 0) {
            log.info("Очистка temp: удалено {} директорий java_exec_* старше {} часа", deletedCount, TEMP_FILE_MAX_AGE_HOURS);
        }
    }

    private void deleteDirectory(Path directory) throws IOException {
        if (!Files.exists(directory)) {
            return;
        }
        try (Stream<Path> walk = Files.walk(directory)) {
            walk.sorted(Comparator.reverseOrder())
                .forEach(path -> {
                    try {
                        Files.deleteIfExists(path);
                    } catch (IOException e) {
                        log.warn("Не удалось удалить: {}", path);
                    }
                });
        }
    }
}
