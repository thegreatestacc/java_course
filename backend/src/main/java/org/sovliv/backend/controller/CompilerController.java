package org.sovliv.backend.controller;

import org.sovliv.backend.dto.CompileRequest;
import org.sovliv.backend.dto.CompileResponse;
import org.sovliv.backend.service.JavaExecutionService;
import org.sovliv.backend.service.RateLimitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

/**
 * @author Vladimir Solovyov
 * @project java-educational-material-site
 * @date on 25/12/2025
 */
@RestController
@RequestMapping("/api")
@CrossOrigin(originPatterns = "*")
public class CompilerController {

    private final JavaExecutionService javaExecutionService;
    private final RateLimitService rateLimitService;

    @Autowired
    public CompilerController(JavaExecutionService javaExecutionService, 
                             RateLimitService rateLimitService) {
        this.javaExecutionService = javaExecutionService;
        this.rateLimitService = rateLimitService;
    }

    @PostMapping("/compile")
    public ResponseEntity<CompileResponse> compileAndRun(
            @RequestBody CompileRequest request,
            HttpSession session,
            HttpServletRequest httpRequest) {
        try {
            // Rate limiting
            Long userId = (Long) session.getAttribute("userId");
            String ipAddress = getClientIpAddress(httpRequest);
            
            if (!rateLimitService.isAllowed(userId, ipAddress)) {
                CompileResponse errorResponse = new CompileResponse();
                errorResponse.setError("Превышен лимит запросов. Максимум 10 запросов в минуту.");
                return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body(errorResponse);
            }

            CompileResponse response = javaExecutionService.executeCode(request.getCode());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            CompileResponse errorResponse = new CompileResponse();
            errorResponse.setError("Ошибка сервера: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    private String getClientIpAddress(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }
        String xRealIp = request.getHeader("X-Real-IP");
        if (xRealIp != null && !xRealIp.isEmpty()) {
            return xRealIp;
        }
        return request.getRemoteAddr();
    }
}


