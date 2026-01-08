package org.sovliv.backend.repository;

import org.sovliv.backend.model.UserActivity;
import org.sovliv.backend.repository.rowmapper.UserActivityRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public class UserActivityRepository {

    private final JdbcTemplate jdbcTemplate;
    private final RowMapper<UserActivity> rowMapper = new UserActivityRowMapper();

    @Autowired
    public UserActivityRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Optional<UserActivity> findByUserIdAndActivityDate(Long userId, LocalDate date) {
        String sql = "SELECT id, user_id, activity_date, tasks_completed, created_at, updated_at " +
                     "FROM user_activities WHERE user_id = ? AND activity_date = ?";
        List<UserActivity> results = jdbcTemplate.query(sql, rowMapper, userId, java.sql.Date.valueOf(date));
        return results.isEmpty() ? Optional.empty() : Optional.of(results.get(0));
    }

    public List<UserActivity> findByUserIdAndActivityDateAfter(Long userId, LocalDate startDate) {
        String sql = "SELECT id, user_id, activity_date, tasks_completed, created_at, updated_at " +
                     "FROM user_activities WHERE user_id = ? AND activity_date >= ? ORDER BY activity_date ASC";
        return jdbcTemplate.query(sql, rowMapper, userId, java.sql.Date.valueOf(startDate));
    }

    public List<UserActivity> findByUserIdAndActivityDateBetween(Long userId, LocalDate startDate, LocalDate endDate) {
        String sql = "SELECT id, user_id, activity_date, tasks_completed, created_at, updated_at " +
                     "FROM user_activities WHERE user_id = ? AND activity_date BETWEEN ? AND ? ORDER BY activity_date ASC";
        return jdbcTemplate.query(sql, rowMapper, userId, java.sql.Date.valueOf(startDate), java.sql.Date.valueOf(endDate));
    }

    public UserActivity save(UserActivity activity) {
        if (activity.getId() == null) {
            return insert(activity);
        } else {
            return update(activity);
        }
    }

    private UserActivity insert(UserActivity activity) {
        LocalDateTime now = LocalDateTime.now();
        if (activity.getCreatedAt() == null) {
            activity.setCreatedAt(now);
        }
        if (activity.getUpdatedAt() == null) {
            activity.setUpdatedAt(now);
        }
        if (activity.getTasksCompleted() == null) {
            activity.setTasksCompleted(0);
        }

        String sql = "INSERT INTO user_activities (user_id, activity_date, tasks_completed, created_at, updated_at) " +
                     "VALUES (?, ?, ?, ?, ?)";
        
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setLong(1, activity.getUser().getId());
            ps.setDate(2, java.sql.Date.valueOf(activity.getActivityDate()));
            ps.setInt(3, activity.getTasksCompleted());
            ps.setTimestamp(4, java.sql.Timestamp.valueOf(activity.getCreatedAt()));
            ps.setTimestamp(5, java.sql.Timestamp.valueOf(activity.getUpdatedAt()));
            return ps;
        }, keyHolder);

        Long id = keyHolder.getKey() != null ? keyHolder.getKey().longValue() : null;
        activity.setId(id);
        return activity;
    }

    private UserActivity update(UserActivity activity) {
        activity.setUpdatedAt(LocalDateTime.now());
        
        String sql = "UPDATE user_activities SET user_id = ?, activity_date = ?, tasks_completed = ?, updated_at = ? WHERE id = ?";
        
        jdbcTemplate.update(sql,
            activity.getUser().getId(),
            java.sql.Date.valueOf(activity.getActivityDate()),
            activity.getTasksCompleted(),
            java.sql.Timestamp.valueOf(activity.getUpdatedAt()),
            activity.getId()
        );
        
        return activity;
    }
}
