package org.sovliv.backend.repository.rowmapper;

import org.sovliv.backend.model.ErrorReport;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ErrorReportRowMapper implements RowMapper<ErrorReport> {
    @Override
    public ErrorReport mapRow(ResultSet rs, int rowNum) throws SQLException {
        ErrorReport errorReport = new ErrorReport();
        errorReport.setId(rs.getLong("id"));
        
        Long userId = rs.getLong("user_id");
        if (!rs.wasNull()) {
            errorReport.setUserId(userId);
        }
        
        errorReport.setErrorMessage(rs.getString("error_message"));
        errorReport.setUserDescription(rs.getString("user_description"));
        errorReport.setPageUrl(rs.getString("page_url"));
        errorReport.setUserAgent(rs.getString("user_agent"));
        
        java.sql.Timestamp createdAt = rs.getTimestamp("created_at");
        if (createdAt != null) {
            errorReport.setCreatedAt(createdAt.toLocalDateTime());
        }
        
        return errorReport;
    }
}

