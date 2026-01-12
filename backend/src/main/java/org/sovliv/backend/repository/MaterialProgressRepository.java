package org.sovliv.backend.repository;

import org.sovliv.backend.model.MaterialProgress;
import org.sovliv.backend.repository.rowmapper.MaterialProgressRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public class MaterialProgressRepository {

    private final JdbcTemplate jdbcTemplate;
    private final RowMapper<MaterialProgress> rowMapper = new MaterialProgressRowMapper();

    @Autowired
    public MaterialProgressRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Optional<MaterialProgress> findByUserIdAndMaterialId(Long userId, String materialId) {
        String sql = "SELECT id, user_id, material_id, completed_at " +
                     "FROM material_progress WHERE user_id = ? AND material_id = ?";
        List<MaterialProgress> results = jdbcTemplate.query(sql, rowMapper, userId, materialId);
        return results.isEmpty() ? Optional.empty() : Optional.of(results.get(0));
    }

    public List<MaterialProgress> findByUserId(Long userId) {
        String sql = "SELECT id, user_id, material_id, completed_at " +
                     "FROM material_progress WHERE user_id = ? ORDER BY completed_at DESC";
        return jdbcTemplate.query(sql, rowMapper, userId);
    }

    public Long countByUserId(Long userId) {
        String sql = "SELECT COUNT(*) FROM material_progress WHERE user_id = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, userId);
        return count != null ? count.longValue() : 0L;
    }

    public MaterialProgress save(MaterialProgress progress) {
        // Проверяем, существует ли уже запись с таким user_id и material_id
        Optional<MaterialProgress> existing = findByUserIdAndMaterialId(
            progress.getUser().getId(), 
            progress.getMaterialId()
        );
        
        if (existing.isPresent()) {
            // Если запись существует, обновляем её
            MaterialProgress existingProgress = existing.get();
            existingProgress.setCompletedAt(progress.getCompletedAt() != null 
                ? progress.getCompletedAt() 
                : LocalDateTime.now());
            return update(existingProgress);
        } else {
            // Если записи нет, создаём новую
            return insert(progress);
        }
    }

    private MaterialProgress insert(MaterialProgress progress) {
        LocalDateTime now = LocalDateTime.now();
        if (progress.getCompletedAt() == null) {
            progress.setCompletedAt(now);
        }

        String sql = "INSERT INTO material_progress (user_id, material_id, completed_at) " +
                     "VALUES (?, ?, ?) RETURNING id";
        
        // Используем queryForObject с RETURNING для получения id напрямую
        Long id = jdbcTemplate.queryForObject(sql, Long.class,
            progress.getUser().getId(),
            progress.getMaterialId(),
            java.sql.Timestamp.valueOf(progress.getCompletedAt())
        );
        
        progress.setId(id);
        return progress;
    }

    private MaterialProgress update(MaterialProgress progress) {
        String sql = "UPDATE material_progress SET user_id = ?, material_id = ?, completed_at = ? WHERE id = ?";
        
        jdbcTemplate.update(sql,
            progress.getUser().getId(),
            progress.getMaterialId(),
            java.sql.Timestamp.valueOf(progress.getCompletedAt()),
            progress.getId()
        );
        
        return progress;
    }

    public void delete(MaterialProgress progress) {
        String sql = "DELETE FROM material_progress WHERE id = ?";
        jdbcTemplate.update(sql, progress.getId());
    }
}
