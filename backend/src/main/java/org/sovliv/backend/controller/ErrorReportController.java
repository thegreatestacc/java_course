package org.sovliv.backend.controller;

import org.sovliv.backend.dto.ErrorReportListResponse;
import org.sovliv.backend.dto.ErrorReportRequest;
import org.sovliv.backend.dto.ErrorReportResponse;
import org.sovliv.backend.service.AdminService;
import org.sovliv.backend.service.ErrorReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/error-reports")
@CrossOrigin(originPatterns = "*", allowCredentials = "true")
public class ErrorReportController {

    private final ErrorReportService errorReportService;
    private final AdminService adminService;

    @Value("${app.admin.email:admin@example.com}")
    private String adminEmail;

    @Autowired
    public ErrorReportController(ErrorReportService errorReportService, AdminService adminService) {
        this.errorReportService = errorReportService;
        this.adminService = adminService;
    }

    private boolean checkAdminAccess(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        String userEmail = (String) session.getAttribute("userEmail");
        
        if (userId == null || userEmail == null) {
            return false;
        }
        
        // Проверяем, что пользователь является админом И имеет админский email
        boolean isAdmin = adminService.isAdmin(userId);
        boolean hasAdminEmail = userEmail.equalsIgnoreCase(adminEmail);
        
        return isAdmin && hasAdminEmail;
    }

    @PostMapping
    public ResponseEntity<?> createErrorReport(
            @RequestBody ErrorReportRequest request,
            HttpSession session) {
        try {
            // Валидация обязательного поля
            if (request.getUserDescription() == null || request.getUserDescription().trim().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(java.util.Map.of("success", false, "message", "Описание ошибки обязательно для заполнения"));
            }
            
            Long userId = (Long) session.getAttribute("userId");
            // userId может быть null, если пользователь не авторизован - это нормально
            
            ErrorReportResponse response = errorReportService.saveErrorReport(request, userId);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(java.util.Map.of("success", false, "message", "Ошибка при сохранении сообщения об ошибке: " + e.getMessage()));
        }
    }

    @GetMapping("/admin/all")
    public ResponseEntity<ErrorReportListResponse> getAllErrorReports(HttpSession session) {
        if (!checkAdminAccess(session)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new ErrorReportListResponse(false, "Доступ запрещен. Требуются права администратора.", null));
        }
        
        ErrorReportListResponse response = errorReportService.getAllErrorReports();
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}

