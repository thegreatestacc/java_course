package org.sovliv.backend.controller;

import org.sovliv.backend.dto.AuthResponse;
import org.sovliv.backend.dto.LoginRequest;
import org.sovliv.backend.dto.RegisterRequest;
import org.sovliv.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(originPatterns = "*", allowCredentials = "true")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request, HttpSession session) {
        AuthResponse response = authService.register(request);
        
        if (response.isSuccess()) {
            // Сохраняем пользователя в сессии
            session.setAttribute("userId", response.getUser().getId());
            session.setAttribute("userEmail", response.getUser().getEmail());
            session.setAttribute("userName", response.getUser().getName());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request, HttpSession session) {
        AuthResponse response = authService.login(request);
        
        if (response.isSuccess()) {
            // Сохраняем пользователя в сессии
            session.setAttribute("userId", response.getUser().getId());
            session.setAttribute("userEmail", response.getUser().getEmail());
            session.setAttribute("userName", response.getUser().getName());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<AuthResponse> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok(new AuthResponse(true, "Выход выполнен успешно"));
    }

    @GetMapping("/me")
    public ResponseEntity<AuthResponse> getCurrentUser(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthResponse(false, "Пользователь не авторизован"));
        }

        // Получаем пользователя из базы данных для получения актуальной информации
        org.sovliv.backend.model.User user = authService.getUserById(userId);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthResponse(false, "Пользователь не найден"));
        }

        String createdAt = user.getCreatedAt() != null ? user.getCreatedAt().toString() : null;
        AuthResponse.UserDto userDto = new AuthResponse.UserDto(user.getId(), user.getEmail(), user.getName(), createdAt);
        return ResponseEntity.ok(new AuthResponse(true, "Пользователь авторизован", userDto));
    }
}

