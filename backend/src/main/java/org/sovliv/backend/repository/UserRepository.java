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
import java.util.List;
import java.util.Optional;

@Repository
public class UserRepository {

    private final JdbcTemplate jdbcTemplate;
    private final RowMapper<User> rowMapper = new UserRowMapper();

    @Autowired
    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Optional<User> findByEmail(String email) {
        String sql = "SELECT id, email, password, name, created_at, updated_at, is_blocked, is_admin, tooltips_enabled " +
                     "FROM users WHERE email = ?";
        List<User> users = jdbcTemplate.query(sql, rowMapper, email);
        return users.isEmpty() ? Optional.empty() : Optional.of(users.get(0));
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
