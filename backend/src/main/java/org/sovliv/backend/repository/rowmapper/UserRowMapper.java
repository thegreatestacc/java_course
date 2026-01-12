package org.sovliv.backend.repository.rowmapper;

import org.sovliv.backend.model.User;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.HashSet;
import java.util.Set;

public class UserRowMapper implements RowMapper<User> {
    @Override
    public User mapRow(ResultSet rs, int rowNum) throws SQLException {
        User user = new User();
        
        // Получаем метаданные для проверки наличия колонок
        ResultSetMetaData metaData = rs.getMetaData();
        Set<String> availableColumns = new HashSet<>();
        for (int i = 1; i <= metaData.getColumnCount(); i++) {
            availableColumns.add(metaData.getColumnName(i).toLowerCase());
        }
        
        user.setId(rs.getLong("id"));
        user.setEmail(rs.getString("email"));
        user.setPassword(rs.getString("password"));
        user.setName(rs.getString("name"));
        
        // Обработка created_at с проверкой наличия колонки
        if (availableColumns.contains("created_at")) {
            java.sql.Timestamp createdAt = rs.getTimestamp("created_at");
            if (createdAt != null) {
                user.setCreatedAt(createdAt.toLocalDateTime());
            }
        } else {
            user.setCreatedAt(java.time.LocalDateTime.now());
        }
        
        // Обработка updated_at с проверкой наличия колонки
        if (availableColumns.contains("updated_at")) {
            java.sql.Timestamp updatedAt = rs.getTimestamp("updated_at");
            if (updatedAt != null) {
                user.setUpdatedAt(updatedAt.toLocalDateTime());
            }
        }
        
        // Обработка is_blocked с проверкой наличия колонки
        if (availableColumns.contains("is_blocked")) {
            user.setIsBlocked(rs.getBoolean("is_blocked"));
        } else {
            user.setIsBlocked(false);
        }
        
        // Обработка is_admin с проверкой наличия колонки
        if (availableColumns.contains("is_admin")) {
            user.setIsAdmin(rs.getBoolean("is_admin"));
        } else {
            user.setIsAdmin(false);
        }
        
        // Обработка tooltips_enabled с проверкой наличия колонки
        if (availableColumns.contains("tooltips_enabled")) {
            user.setTooltipsEnabled(rs.getBoolean("tooltips_enabled"));
        } else {
            user.setTooltipsEnabled(true);
        }
        
        return user;
    }
}

