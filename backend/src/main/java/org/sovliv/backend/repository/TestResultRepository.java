package org.sovliv.backend.repository;

import org.sovliv.backend.model.TestResult;
import org.sovliv.backend.repository.rowmapper.TestResultRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public class TestResultRepository {

    private final JdbcTemplate jdbcTemplate;
    private final RowMapper<TestResult> rowMapper = new TestResultRowMapper();

    @Autowired
    public TestResultRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<TestResult> findByUserIdOrderByCompletedAtDesc(Long userId) {
        String sql = "SELECT id, user_id, test_type, topic, correct_answers, total_questions, percentage, completed_at " +
                     "FROM test_results WHERE user_id = ? ORDER BY completed_at DESC";
        return jdbcTemplate.query(sql, rowMapper, userId);
    }

    public List<TestResult> findByUserIdAndTestTypeOrderByCompletedAtDesc(Long userId, String testType) {
        String sql = "SELECT id, user_id, test_type, topic, correct_answers, total_questions, percentage, completed_at " +
                     "FROM test_results WHERE user_id = ? AND test_type = ? ORDER BY completed_at DESC";
        return jdbcTemplate.query(sql, rowMapper, userId, testType);
    }

    public TestResult save(TestResult testResult) {
        if (testResult.getId() == null) {
            return insert(testResult);
        } else {
            return update(testResult);
        }
    }

    private TestResult insert(TestResult testResult) {
        LocalDateTime now = LocalDateTime.now();
        if (testResult.getCompletedAt() == null) {
            testResult.setCompletedAt(now);
        }

        String sql = "INSERT INTO test_results (user_id, test_type, topic, correct_answers, total_questions, percentage, completed_at) " +
                     "VALUES (?, ?, ?, ?, ?, ?, ?)";
        
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, new String[]{"id"});
            ps.setLong(1, testResult.getUser().getId());
            ps.setString(2, testResult.getTestType());
            ps.setString(3, testResult.getTopic());
            ps.setInt(4, testResult.getCorrectAnswers());
            ps.setInt(5, testResult.getTotalQuestions());
            ps.setInt(6, testResult.getPercentage());
            ps.setTimestamp(7, java.sql.Timestamp.valueOf(testResult.getCompletedAt()));
            return ps;
        }, keyHolder);

        Long id = keyHolder.getKey() != null ? keyHolder.getKey().longValue() : null;
        testResult.setId(id);
        return testResult;
    }

    private TestResult update(TestResult testResult) {
        String sql = "UPDATE test_results SET user_id = ?, test_type = ?, topic = ?, correct_answers = ?, " +
                     "total_questions = ?, percentage = ? WHERE id = ?";
        
        jdbcTemplate.update(sql,
            testResult.getUser().getId(),
            testResult.getTestType(),
            testResult.getTopic(),
            testResult.getCorrectAnswers(),
            testResult.getTotalQuestions(),
            testResult.getPercentage(),
            testResult.getId()
        );
        
        return testResult;
    }
}
