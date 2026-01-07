package org.sovliv.backend.controller;

import org.sovliv.backend.dto.UserListResponse;
import org.sovliv.backend.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(originPatterns = "*", allowCredentials = "true")
public class AdminController {

    private final AdminService adminService;

    @Value("${app.admin.email:admin@example.com}")
    private String adminEmail;

    @Autowired
    public AdminController(AdminService adminService) {
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

    @GetMapping("/users")
    public ResponseEntity<UserListResponse> getAllUsers(HttpSession session) {
        if (!checkAdminAccess(session)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new UserListResponse(false, "Доступ запрещен. Требуются права администратора.", null));
        }

        UserListResponse response = adminService.getAllUsers();
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("/users/{userId}/block")
    public ResponseEntity<UserListResponse> blockUser(@PathVariable Long userId, HttpSession session) {
        if (!checkAdminAccess(session)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new UserListResponse(false, "Доступ запрещен. Требуются права администратора.", null));
        }

        boolean success = adminService.blockUser(userId);
        if (success) {
            // Возвращаем обновленный список пользователей
            UserListResponse response = adminService.getAllUsers();
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new UserListResponse(false, "Пользователь не найден", null));
        }
    }

    @PostMapping("/users/{userId}/unblock")
    public ResponseEntity<UserListResponse> unblockUser(@PathVariable Long userId, HttpSession session) {
        if (!checkAdminAccess(session)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new UserListResponse(false, "Доступ запрещен. Требуются права администратора.", null));
        }

        boolean success = adminService.unblockUser(userId);
        if (success) {
            // Возвращаем обновленный список пользователей
            UserListResponse response = adminService.getAllUsers();
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new UserListResponse(false, "Пользователь не найден", null));
        }
    }
}

