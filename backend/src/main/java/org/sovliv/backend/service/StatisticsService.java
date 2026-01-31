package org.sovliv.backend.service;

import org.sovliv.backend.dto.MaterialProgressResponse;
import org.sovliv.backend.dto.UserStatisticsResponse;
import org.sovliv.backend.model.MaterialProgress;
import org.sovliv.backend.model.TestResult;
import org.sovliv.backend.model.User;
import org.sovliv.backend.repository.MaterialProgressRepository;
import org.sovliv.backend.repository.TestResultRepository;
import org.sovliv.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class StatisticsService {

    private final MaterialProgressRepository materialProgressRepository;
    private final TestResultRepository testResultRepository;
    private final UserRepository userRepository;
    private final ActivityService activityService;

    // Список всех материалов для чтения
    private static final Set<String> ALL_MATERIALS = Set.of(
        "gift/basics",
        "gift/branches",
        "gift/remote",
        "gift/advanced",
        "learn/java-core/basics",
        "learn/java-core/variables",
        "learn/java-core/control-flow",
        "learn/java-core/exceptions",
        "learn/java-oop",
        "learn/java-oop/equals-hashcode",
        "learn/java-collections",
        "learn/java-collections/list",
        "learn/java-collections/set",
        "learn/java-collections/map",
        "learn/java-collections/stream",
        "learn/junior",
        "learn/middle",
        "learn/clean-architecture"
        // learn/git не включен, так как это просто редирект на /gift
    );

    // Список всех тестов (по topic)
    private static final Set<String> ALL_TESTS = Set.of(
        "git",
        "java-core"
    );

    @Autowired
    public StatisticsService(MaterialProgressRepository materialProgressRepository,
                            TestResultRepository testResultRepository,
                            UserRepository userRepository,
                            ActivityService activityService) {
        this.materialProgressRepository = materialProgressRepository;
        this.testResultRepository = testResultRepository;
        this.userRepository = userRepository;
        this.activityService = activityService;
    }

    @Cacheable(value = "userStatistics", key = "#userId")
    public UserStatisticsResponse getUserStatistics(Long userId) {
        // Подсчитываем прочитанные материалы
        List<MaterialProgress> materialProgresses = materialProgressRepository.findByUserId(userId);
        Set<String> completedMaterials = new HashSet<>();
        for (MaterialProgress progress : materialProgresses) {
            completedMaterials.add(progress.getMaterialId());
        }
        int completedMaterialsCount = completedMaterials.size();
        int totalMaterialsCount = ALL_MATERIALS.size();
        double materialsPercentage = totalMaterialsCount > 0 
            ? (double) completedMaterialsCount / totalMaterialsCount * 100.0 
            : 0.0;

        // Подсчитываем пройденные тесты (уникальные по topic)
        List<TestResult> testResults = testResultRepository.findByUserIdOrderByCompletedAtDesc(userId);
        Set<String> completedTests = new HashSet<>();
        for (TestResult result : testResults) {
            if (result.getTopic() != null && ALL_TESTS.contains(result.getTopic())) {
                completedTests.add(result.getTopic());
            }
        }
        int completedTestsCount = completedTests.size();
        int totalTestsCount = ALL_TESTS.size();
        double testsPercentage = totalTestsCount > 0 
            ? (double) completedTestsCount / totalTestsCount * 100.0 
            : 0.0;

        return new UserStatisticsResponse(
            totalTestsCount,
            completedTestsCount,
            Math.round(testsPercentage * 100.0) / 100.0,
            totalMaterialsCount,
            completedMaterialsCount,
            Math.round(materialsPercentage * 100.0) / 100.0
        );
    }

    @CacheEvict(value = {"userStatistics", "materialStatus", "userActivity"}, allEntries = true)
    public void markMaterialAsCompleted(Long userId, String materialId) {
        System.out.println("markMaterialAsCompleted called: userId=" + userId + ", materialId=" + materialId);
        
        // Проверяем, что материал существует в списке
        if (!ALL_MATERIALS.contains(materialId)) {
            System.err.println("Материал не найден в списке: " + materialId);
            System.err.println("Доступные материалы: " + ALL_MATERIALS);
            throw new IllegalArgumentException("Материал с ID " + materialId + " не найден");
        }

        // Проверяем, не завершен ли уже материал
        if (materialProgressRepository.findByUserIdAndMaterialId(userId, materialId).isPresent()) {
            System.out.println("Материал уже завершен, пропускаем");
            // Материал уже завершен, ничего не делаем
            return;
        }

        // Получаем пользователя
        User user = userRepository.findById(userId)
            .orElseThrow(() -> {
                System.err.println("User not found: " + userId);
                return new RuntimeException("User not found");
            });

        try {
            // Создаем новую запись о прогрессе
            MaterialProgress progress = new MaterialProgress();
            progress.setUser(user);
            progress.setMaterialId(materialId);
            System.out.println("Сохраняем MaterialProgress: userId=" + userId + ", materialId=" + materialId);
            materialProgressRepository.save(progress);
            System.out.println("MaterialProgress успешно сохранен");
            
            // Записываем активность при завершении материала
            activityService.recordActivity(userId, java.time.LocalDate.now(), 1);
        } catch (Exception e) {
            System.err.println("Ошибка при сохранении MaterialProgress: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    @Cacheable(value = "materialStatus", key = "#userId + ':' + #materialId")
    public boolean isMaterialCompleted(Long userId, String materialId) {
        return materialProgressRepository.findByUserIdAndMaterialId(userId, materialId).isPresent();
    }

    public List<MaterialProgressResponse> getCompletedMaterials(Long userId) {
        List<MaterialProgress> materialProgresses = materialProgressRepository.findByUserId(userId);
        return materialProgresses.stream()
                .map(mp -> new MaterialProgressResponse(
                        mp.getId(),
                        mp.getMaterialId(),
                        mp.getCompletedAt()
                ))
                .collect(Collectors.toList());
    }

    @CacheEvict(value = {"userStatistics", "materialStatus", "userActivity"}, allEntries = true)
    public void unmarkMaterialAsCompleted(Long userId, String materialId) {
        materialProgressRepository.findByUserIdAndMaterialId(userId, materialId)
                .ifPresent(materialProgressRepository::delete);
    }

    // Методы для работы с практическими задачами
    @CacheEvict(value = {"userStatistics", "materialStatus", "userActivity"}, allEntries = true)
    public void markPracticeTaskAsSolved(Long userId, String taskId) {
        String materialId = "practice/" + taskId;
        
        // Проверяем, не решена ли уже задача
        if (materialProgressRepository.findByUserIdAndMaterialId(userId, materialId).isPresent()) {
            System.out.println("Задача уже решена, пропускаем");
            return;
        }

        // Получаем пользователя
        User user = userRepository.findById(userId)
            .orElseThrow(() -> {
                System.err.println("User not found: " + userId);
                return new RuntimeException("User not found");
            });

        try {
            // Создаем новую запись о прогрессе
            MaterialProgress progress = new MaterialProgress();
            progress.setUser(user);
            progress.setMaterialId(materialId);
            System.out.println("Сохраняем решенную задачу: userId=" + userId + ", taskId=" + taskId);
            materialProgressRepository.save(progress);
            System.out.println("Решенная задача успешно сохранена");
        } catch (Exception e) {
            System.err.println("Ошибка при сохранении решенной задачи: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    @Cacheable(value = "materialStatus", key = "#userId + ':practice:' + #taskId")
    public boolean isPracticeTaskSolved(Long userId, String taskId) {
        String materialId = "practice/" + taskId;
        return materialProgressRepository.findByUserIdAndMaterialId(userId, materialId).isPresent();
    }

    public Set<String> getSolvedPracticeTasks(Long userId) {
        List<MaterialProgress> materialProgresses = materialProgressRepository.findByUserId(userId);
        return materialProgresses.stream()
                .map(MaterialProgress::getMaterialId)
                .filter(materialId -> materialId.startsWith("practice/"))
                .map(materialId -> materialId.substring("practice/".length()))
                .collect(Collectors.toSet());
    }
}

