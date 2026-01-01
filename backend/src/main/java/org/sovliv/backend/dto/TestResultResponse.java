package org.sovliv.backend.dto;

import java.time.LocalDateTime;
import java.util.List;

public class TestResultResponse {
    private List<TestResultDto> results;

    public TestResultResponse() {
    }

    public TestResultResponse(List<TestResultDto> results) {
        this.results = results;
    }

    public List<TestResultDto> getResults() {
        return results;
    }

    public void setResults(List<TestResultDto> results) {
        this.results = results;
    }

    public static class TestResultDto {
        private Long id;
        private String testType;
        private String topic;
        private Integer correctAnswers;
        private Integer totalQuestions;
        private Integer percentage;
        private LocalDateTime completedAt;

        public TestResultDto() {
        }

        public TestResultDto(Long id, String testType, String topic, Integer correctAnswers, Integer totalQuestions, Integer percentage, LocalDateTime completedAt) {
            this.id = id;
            this.testType = testType;
            this.topic = topic;
            this.correctAnswers = correctAnswers;
            this.totalQuestions = totalQuestions;
            this.percentage = percentage;
            this.completedAt = completedAt;
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getTestType() {
            return testType;
        }

        public void setTestType(String testType) {
            this.testType = testType;
        }

        public String getTopic() {
            return topic;
        }

        public void setTopic(String topic) {
            this.topic = topic;
        }

        public Integer getCorrectAnswers() {
            return correctAnswers;
        }

        public void setCorrectAnswers(Integer correctAnswers) {
            this.correctAnswers = correctAnswers;
        }

        public Integer getTotalQuestions() {
            return totalQuestions;
        }

        public void setTotalQuestions(Integer totalQuestions) {
            this.totalQuestions = totalQuestions;
        }

        public Integer getPercentage() {
            return percentage;
        }

        public void setPercentage(Integer percentage) {
            this.percentage = percentage;
        }

        public LocalDateTime getCompletedAt() {
            return completedAt;
        }

        public void setCompletedAt(LocalDateTime completedAt) {
            this.completedAt = completedAt;
        }
    }
}

