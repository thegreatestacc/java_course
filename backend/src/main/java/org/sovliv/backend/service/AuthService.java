package org.sovliv.backend.service;

import org.sovliv.backend.dto.AuthResponse;
import org.sovliv.backend.dto.LoginRequest;
import org.sovliv.backend.dto.RegisterRequest;
import org.sovliv.backend.model.User;
import org.sovliv.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Service
public class AuthService {

    private final UserRepository userRepository;

    @Value("${app.admin.email:admin@example.com}")
    private String adminEmail;

    @Autowired
    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public AuthResponse register(RegisterRequest request) {
        // Проверка на существующего пользователя
        if (userRepository.existsByEmail(request.getEmail())) {
            return new AuthResponse(false, "Пользователь с таким email уже существует");
        }

        // Валидация
        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            return new AuthResponse(false, "Email не может быть пустым");
        }
        if (request.getPassword() == null || request.getPassword().length() < 6) {
            return new AuthResponse(false, "Пароль должен содержать минимум 6 символов");
        }
        if (request.getName() == null || request.getName().trim().isEmpty()) {
            return new AuthResponse(false, "Имя не может быть пустым");
        }

        // Создание нового пользователя
        User user = new User();
        String email = request.getEmail().trim().toLowerCase();
        user.setEmail(email);
        user.setPassword(hashPassword(request.getPassword()));
        user.setName(request.getName().trim());
        
        // Устанавливаем права администратора, если email совпадает с админским
        if (email.equalsIgnoreCase(adminEmail)) {
            user.setIsAdmin(true);
        }

        try {
            user = userRepository.save(user);
            String createdAt = user.getCreatedAt() != null ? user.getCreatedAt().toString() : null;
            AuthResponse.UserDto userDto = new AuthResponse.UserDto(
                user.getId(), 
                user.getEmail(), 
                user.getName(), 
                createdAt,
                user.getIsAdmin(),
                user.getIsBlocked()
            );
            return new AuthResponse(true, "Регистрация успешна", userDto);
        } catch (Exception e) {
            return new AuthResponse(false, "Ошибка при регистрации: " + e.getMessage());
        }
    }

    public AuthResponse login(LoginRequest request) {
        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            return new AuthResponse(false, "Email не может быть пустым");
        }
        if (request.getPassword() == null || request.getPassword().isEmpty()) {
            return new AuthResponse(false, "Пароль не может быть пустым");
        }

        User user = userRepository.findByEmail(request.getEmail().trim().toLowerCase())
                .orElse(null);

        if (user == null) {
            return new AuthResponse(false, "Неверный email или пароль");
        }

        // Проверка на блокировку
        if (user.getIsBlocked()) {
            return new AuthResponse(false, "Ваш аккаунт заблокирован. Обратитесь к администратору.");
        }

        String hashedPassword = hashPassword(request.getPassword());
        if (!user.getPassword().equals(hashedPassword)) {
            return new AuthResponse(false, "Неверный email или пароль");
        }

        String createdAt = user.getCreatedAt() != null ? user.getCreatedAt().toString() : null;
        AuthResponse.UserDto userDto = new AuthResponse.UserDto(
            user.getId(), 
            user.getEmail(), 
            user.getName(), 
            createdAt,
            user.getIsAdmin(),
            user.getIsBlocked()
        );
        return new AuthResponse(true, "Вход выполнен успешно", userDto);
    }

    public User getUserById(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }

    private String hashPassword(String password) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(password.getBytes(StandardCharsets.UTF_8));
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Ошибка хеширования пароля", e);
        }
    }
}

