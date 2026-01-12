package org.sovliv.backend.service;

import org.sovliv.backend.dto.ErrorReportListResponse;
import org.sovliv.backend.dto.ErrorReportRequest;
import org.sovliv.backend.dto.ErrorReportResponse;
import org.sovliv.backend.model.ErrorReport;
import org.sovliv.backend.model.User;
import org.sovliv.backend.repository.ErrorReportRepository;
import org.sovliv.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ErrorReportService {

    private final ErrorReportRepository errorReportRepository;
    private final UserRepository userRepository;

    @Autowired
    public ErrorReportService(ErrorReportRepository errorReportRepository, UserRepository userRepository) {
        this.errorReportRepository = errorReportRepository;
        this.userRepository = userRepository;
    }

    public ErrorReportResponse saveErrorReport(ErrorReportRequest request, Long userId) {
        try {
            ErrorReport errorReport = new ErrorReport();
            errorReport.setUserId(userId);
            errorReport.setErrorMessage(request.getErrorMessage());
            errorReport.setUserDescription(request.getUserDescription());
            errorReport.setPageUrl(request.getPageUrl());
            errorReport.setUserAgent(request.getUserAgent());

            ErrorReport saved = errorReportRepository.save(errorReport);
            return convertToResponse(saved);
        } catch (Exception e) {
            throw new RuntimeException("Ошибка при сохранении сообщения об ошибке: " + e.getMessage(), e);
        }
    }

    public ErrorReportListResponse getAllErrorReports() {
        try {
            List<ErrorReport> errorReports = errorReportRepository.findAllOrderByCreatedAtDesc();
            List<ErrorReportResponse> responses = errorReports.stream()
                    .map(this::convertToResponse)
                    .collect(Collectors.toList());
            return new ErrorReportListResponse(true, "Список сообщений об ошибках получен", responses);
        } catch (Exception e) {
            return new ErrorReportListResponse(false, "Ошибка при получении списка сообщений об ошибках: " + e.getMessage(), null);
        }
    }

    private ErrorReportResponse convertToResponse(ErrorReport errorReport) {
        ErrorReportResponse response = new ErrorReportResponse();
        response.setId(errorReport.getId());
        response.setUserId(errorReport.getUserId());
        response.setErrorMessage(errorReport.getErrorMessage());
        response.setUserDescription(errorReport.getUserDescription());
        response.setPageUrl(errorReport.getPageUrl());
        response.setUserAgent(errorReport.getUserAgent());
        response.setCreatedAt(errorReport.getCreatedAt());

        // Если есть userId, получаем информацию о пользователе
        if (errorReport.getUserId() != null) {
            User user = userRepository.findById(errorReport.getUserId()).orElse(null);
            if (user != null) {
                response.setUserEmail(user.getEmail());
                response.setUserName(user.getName());
            }
        }

        return response;
    }
}

