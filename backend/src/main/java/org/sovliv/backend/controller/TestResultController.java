package org.sovliv.backend.controller;

import org.sovliv.backend.dto.TestResultRequest;
import org.sovliv.backend.dto.TestResultResponse;
import org.sovliv.backend.service.TestResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/test-results")
@CrossOrigin(originPatterns = "*", allowCredentials = "true")
public class TestResultController {

    private final TestResultService testResultService;

    @Autowired
    public TestResultController(TestResultService testResultService) {
        this.testResultService = testResultService;
    }

    @PostMapping("/save")
    public ResponseEntity<?> saveTestResult(@RequestBody TestResultRequest request, HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Пользователь не авторизован");
        }

        if (request.getTestType() == null || request.getTestType().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Тип теста не указан");
        }

        if (request.getTopic() == null || request.getTopic().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Тема теста не указана");
        }

        if (request.getCorrectAnswers() == null || request.getTotalQuestions() == null || request.getPercentage() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Неверные данные результата");
        }

        testResultService.saveTestResult(userId, request);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/me")
    public ResponseEntity<TestResultResponse> getMyTestResults(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        TestResultResponse response = testResultService.getUserTestResults(userId);
        return ResponseEntity.ok(response);
    }
}

