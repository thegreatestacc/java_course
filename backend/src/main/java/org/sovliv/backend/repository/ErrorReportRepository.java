package org.sovliv.backend.repository;

import org.sovliv.backend.model.ErrorReport;
import org.sovliv.backend.repository.rowmapper.ErrorReportRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapperResultSetExtractor;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public class ErrorReportRepository {

    private final JdbcTemplate jdbcTemplate;
    private final RowMapper<ErrorReport> rowMapper = new ErrorReportRowMapper();

    @Autowired
    public ErrorReportRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<ErrorReport> findAllOrderByCreatedAtDesc() {
        String sql = "SELECT id, user_id, error_message, user_description, page_url, user_agent, created_at " +
                     "FROM error_reports ORDER BY created_at DESC";
        return jdbcTemplate.query(sql, rowMapper);
    }

    public ErrorReport save(ErrorReport errorReport) {
        LocalDateTime now = LocalDateTime.now();
        if (errorReport.getCreatedAt() == null) {
            errorReport.setCreatedAt(now);
        }

        String sql = "INSERT INTO error_reports (user_id, error_message, user_description, page_url, user_agent, created_at) " +
                     "VALUES (?, ?, ?, ?, ?, ?) RETURNING id";
        
        // Используем query с PreparedStatementSetter для nullable userId
        PreparedStatementSetter pss = (PreparedStatement ps) -> {
            if (errorReport.getUserId() != null) {
                ps.setLong(1, errorReport.getUserId());
            } else {
                ps.setNull(1, java.sql.Types.BIGINT);
            }
            ps.setString(2, errorReport.getErrorMessage());
            ps.setString(3, errorReport.getUserDescription());
            ps.setString(4, errorReport.getPageUrl());
            ps.setString(5, errorReport.getUserAgent());
            ps.setTimestamp(6, java.sql.Timestamp.valueOf(errorReport.getCreatedAt()));
        };
        
        RowMapper<Long> rowMapper = (rs, rowNum) -> rs.getLong("id");
        List<Long> ids = jdbcTemplate.query(sql, pss, new RowMapperResultSetExtractor<>(rowMapper));
        
        if (ids == null || ids.isEmpty()) {
            throw new RuntimeException("Не удалось получить id после вставки записи");
        }
        
        errorReport.setId(ids.get(0));
        return errorReport;
    }
}

