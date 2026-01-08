package org.sovliv.backend.repository.rowmapper;

import org.sovliv.backend.model.User;
import org.sovliv.backend.model.UserActivity;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserActivityRowMapper implements RowMapper<UserActivity> {
    @Override
    public UserActivity mapRow(ResultSet rs, int rowNum) throws SQLException {
        UserActivity activity = new UserActivity();
        activity.setId(rs.getLong("id"));
        activity.setTasksCompleted(rs.getInt("tasks_completed"));
        
        java.sql.Date activityDate = rs.getDate("activity_date");
        if (activityDate != null) {
            activity.setActivityDate(activityDate.toLocalDate());
        }
        
        java.sql.Timestamp createdAt = rs.getTimestamp("created_at");
        if (createdAt != null) {
            activity.setCreatedAt(createdAt.toLocalDateTime());
        }
        
        java.sql.Timestamp updatedAt = rs.getTimestamp("updated_at");
        if (updatedAt != null) {
            activity.setUpdatedAt(updatedAt.toLocalDateTime());
        }
        
        // Создаем минимальный объект User только с ID
        User user = new User();
        user.setId(rs.getLong("user_id"));
        activity.setUser(user);
        
        return activity;
    }
}

