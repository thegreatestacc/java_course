package org.sovliv.backend.service;

import org.sovliv.backend.dto.TestResultRequest;
import org.sovliv.backend.dto.TestResultResponse;
import org.sovliv.backend.model.TestResult;
import org.sovliv.backend.model.User;
import org.sovliv.backend.repository.TestResultRepository;
import org.sovliv.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TestResultService {

    private final TestResultRepository testResultRepository;
    private final UserRepository userRepository;
    private final ActivityService activityService;

    @Autowired
    public TestResultService(TestResultRepository testResultRepository, 
                            UserRepository userRepository,
                            ActivityService activityService) {
        this.testResultRepository = testResultRepository;
        this.userRepository = userRepository;
        this.activityService = activityService;
    }

    public void saveTestResult(Long userId, TestResultRequest request) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        TestResult testResult = new TestResult();
        testResult.setUser(user);
        testResult.setTestType(request.getTestType());
        testResult.setTopic(request.getTopic() != null ? request.getTopic() : "unknown");
        testResult.setCorrectAnswers(request.getCorrectAnswers());
        testResult.setTotalQuestions(request.getTotalQuestions());
        testResult.setPercentage(request.getPercentage());

        testResultRepository.save(testResult);

        // Автоматически записываем активность, если тест пройден успешно (>= 80%)
        // Обрабатываем ошибки при записи активности, чтобы не прерывать сохранение результата теста
        if (request.getPercentage() != null && request.getPercentage() >= 80) {
            try {
                LocalDate today = LocalDate.now();
                activityService.recordActivity(userId, today, 1);
            } catch (Exception e) {
                System.err.println("Ошибка при записи активности после сохранения результата теста: " + e.getMessage());
                e.printStackTrace();
                // Не пробрасываем исключение, чтобы не прерывать сохранение результата теста
            }
        }
    }

    public TestResultResponse getUserTestResults(Long userId) {
        List<TestResult> results = testResultRepository.findByUserIdOrderByCompletedAtDesc(userId);
        
        List<TestResultResponse.TestResultDto> resultDtos = results.stream()
            .map(result -> new TestResultResponse.TestResultDto(
                result.getId(),
                result.getTestType(),
                result.getTopic() != null ? result.getTopic() : "unknown",
                result.getCorrectAnswers(),
                result.getTotalQuestions(),
                result.getPercentage(),
                result.getCompletedAt()
            ))
            .collect(Collectors.toList());

        return new TestResultResponse(resultDtos);
    }
}

