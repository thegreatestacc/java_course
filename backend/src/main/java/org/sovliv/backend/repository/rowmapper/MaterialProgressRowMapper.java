package org.sovliv.backend.repository.rowmapper;

import org.sovliv.backend.model.MaterialProgress;
import org.sovliv.backend.model.User;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class MaterialProgressRowMapper implements RowMapper<MaterialProgress> {
    @Override
    public MaterialProgress mapRow(ResultSet rs, int rowNum) throws SQLException {
        MaterialProgress progress = new MaterialProgress();
        progress.setId(rs.getLong("id"));
        progress.setMaterialId(rs.getString("material_id"));
        
        java.sql.Timestamp completedAt = rs.getTimestamp("completed_at");
        if (completedAt != null) {
            progress.setCompletedAt(completedAt.toLocalDateTime());
        }
        
        // Создаем минимальный объект User только с ID
        User user = new User();
        user.setId(rs.getLong("user_id"));
        progress.setUser(user);
        
        return progress;
    }
}

