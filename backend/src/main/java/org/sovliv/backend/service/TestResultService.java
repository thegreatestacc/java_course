package org.sovliv.backend.service;

import org.sovliv.backend.dto.TestResultRequest;
import org.sovliv.backend.dto.TestResultResponse;
import org.sovliv.backend.model.TestResult;
import org.sovliv.backend.model.User;
import org.sovliv.backend.repository.TestResultRepository;
import org.sovliv.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TestResultService {

    private final TestResultRepository testResultRepository;
    private final UserRepository userRepository;

    @Autowired
    public TestResultService(TestResultRepository testResultRepository, UserRepository userRepository) {
        this.testResultRepository = testResultRepository;
        this.userRepository = userRepository;
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

