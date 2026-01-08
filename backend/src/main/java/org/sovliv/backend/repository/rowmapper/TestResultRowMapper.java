package org.sovliv.backend.repository.rowmapper;

import org.sovliv.backend.model.TestResult;
import org.sovliv.backend.model.User;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class TestResultRowMapper implements RowMapper<TestResult> {
    @Override
    public TestResult mapRow(ResultSet rs, int rowNum) throws SQLException {
        TestResult testResult = new TestResult();
        testResult.setId(rs.getLong("id"));
        testResult.setTestType(rs.getString("test_type"));
        testResult.setTopic(rs.getString("topic"));
        testResult.setCorrectAnswers(rs.getInt("correct_answers"));
        testResult.setTotalQuestions(rs.getInt("total_questions"));
        testResult.setPercentage(rs.getInt("percentage"));
        
        java.sql.Timestamp completedAt = rs.getTimestamp("completed_at");
        if (completedAt != null) {
            testResult.setCompletedAt(completedAt.toLocalDateTime());
        }
        
        // Создаем минимальный объект User только с ID
        User user = new User();
        user.setId(rs.getLong("user_id"));
        testResult.setUser(user);
        
        return testResult;
    }
}

