package org.sovliv.backend.dto;

import java.util.List;

public class ErrorReportListResponse {
    private boolean success;
    private String message;
    private List<ErrorReportResponse> errorReports;

    public ErrorReportListResponse() {
    }

    public ErrorReportListResponse(boolean success, String message, List<ErrorReportResponse> errorReports) {
        this.success = success;
        this.message = message;
        this.errorReports = errorReports;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public List<ErrorReportResponse> getErrorReports() {
        return errorReports;
    }

    public void setErrorReports(List<ErrorReportResponse> errorReports) {
        this.errorReports = errorReports;
    }
}

