package org.sovliv.backend.repository;

import org.sovliv.backend.model.User;
import org.sovliv.backend.repository.rowmapper.UserRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public class UserRepository {

    private final JdbcTemplate jdbcTemplate;
    private final RowMapper<User> rowMapper = new UserRowMapper();

    @Autowired
    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Optional<User> findByEmail(String email) {
        // Проверяем наличие колонок в таблице
        Set<String> availableColumns = getAvailableColumns("users");
        
        // Формируем список колонок для SELECT
        StringBuilder columns = new StringBuilder("id, email, password, name");
        
        if (availableColumns.contains("created_at")) {
            columns.append(", created_at");
        }
        if (availableColumns.contains("updated_at")) {
            columns.append(", updated_at");
        }
        if (availableColumns.contains("is_blocked")) {
            columns.append(", is_blocked");
        }
        if (availableColumns.contains("is_admin")) {
            columns.append(", is_admin");
        }
        if (availableColumns.contains("tooltips_enabled")) {
            columns.append(", tooltips_enabled");
        }
        
        String sql = "SELECT " + columns.toString() + " FROM users WHERE email = ?";
        List<User> users = jdbcTemplate.query(sql, rowMapper, email);
        return users.isEmpty() ? Optional.empty() : Optional.of(users.get(0));
    }
    
    private Set<String> getAvailableColumns(String tableName) {
        Set<String> columns = new HashSet<>();
        try {
            String sql = "SELECT column_name FROM information_schema.columns WHERE table_name = ?";
            List<String> columnNames = jdbcTemplate.query(sql, (rs, rowNum) -> rs.getString("column_name"), tableName);
            columns.addAll(columnNames);
        } catch (Exception e) {
            // Если не удалось получить список колонок, возвращаем пустой набор
            // RowMapper будет использовать значения по умолчанию
        }
        return columns;
    }

    public boolean existsByEmail(String email) {
        String sql = "SELECT COUNT(*) FROM users WHERE email = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, email);
        return count != null && count > 0;
    }

    public List<User> findAll() {
        String sql = "SELECT id, email, password, name, created_at, updated_at, is_blocked, is_admin, tooltips_enabled " +
                     "FROM users ORDER BY id";
        return jdbcTemplate.query(sql, rowMapper);
    }

    public Optional<User> findById(Long id) {
        String sql = "SELECT id, email, password, name, created_at, updated_at, is_blocked, is_admin, tooltips_enabled " +
                     "FROM users WHERE id = ?";
        List<User> users = jdbcTemplate.query(sql, rowMapper, id);
        return users.isEmpty() ? Optional.empty() : Optional.of(users.get(0));
    }

    public User save(User user) {
        if (user.getId() == null) {
            return insert(user);
        } else {
            return update(user);
        }
    }

    private User insert(User user) {
        LocalDateTime now = LocalDateTime.now();
        if (user.getCreatedAt() == null) {
            user.setCreatedAt(now);
        }
        if (user.getUpdatedAt() == null) {
            user.setUpdatedAt(now);
        }
        if (user.getIsBlocked() == null) {
            user.setIsBlocked(false);
        }
        if (user.getIsAdmin() == null) {
            user.setIsAdmin(false);
        }
        if (user.getTooltipsEnabled() == null) {
            user.setTooltipsEnabled(true);
        }

        String sql = "INSERT INTO users (email, password, name, created_at, updated_at, is_blocked, is_admin, tooltips_enabled) " +
                     "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, user.getEmail());
            ps.setString(2, user.getPassword());
            ps.setString(3, user.getName());
            ps.setTimestamp(4, java.sql.Timestamp.valueOf(user.getCreatedAt()));
            ps.setTimestamp(5, java.sql.Timestamp.valueOf(user.getUpdatedAt()));
            ps.setBoolean(6, user.getIsBlocked());
            ps.setBoolean(7, user.getIsAdmin());
            ps.setBoolean(8, user.getTooltipsEnabled());
            return ps;
        }, keyHolder);

        Long id = keyHolder.getKey() != null ? keyHolder.getKey().longValue() : null;
        user.setId(id);
        return user;
    }

    private User update(User user) {
        user.setUpdatedAt(LocalDateTime.now());
        
        String sql = "UPDATE users SET email = ?, password = ?, name = ?, updated_at = ?, " +
                     "is_blocked = ?, is_admin = ?, tooltips_enabled = ? WHERE id = ?";
        
        jdbcTemplate.update(sql,
            user.getEmail(),
            user.getPassword(),
            user.getName(),
            java.sql.Timestamp.valueOf(user.getUpdatedAt()),
            user.getIsBlocked(),
            user.getIsAdmin(),
            user.getTooltipsEnabled(),
            user.getId()
        );
        
        return user;
    }
}
