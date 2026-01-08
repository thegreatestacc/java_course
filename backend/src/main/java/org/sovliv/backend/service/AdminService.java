package org.sovliv.backend.service;

import org.sovliv.backend.dto.UserListResponse;
import org.sovliv.backend.model.User;
import org.sovliv.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminService {

    private final UserRepository userRepository;

    @Autowired
    public AdminService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserListResponse getAllUsers() {
        try {
            List<User> users = userRepository.findAll();
            List<UserListResponse.UserInfo> userInfos = users.stream()
                    .map(user -> {
                        UserListResponse.UserInfo userInfo = new UserListResponse.UserInfo(
                                user.getId(),
                                user.getEmail(),
                                user.getName(),
                                user.getCreatedAt() != null ? user.getCreatedAt().toString() : null,
                                user.getIsAdmin(),
                                user.getIsBlocked()
                        );
                        userInfo.setPassword(user.getPassword());
                        return userInfo;
                    })
                    .collect(Collectors.toList());
            return new UserListResponse(true, "Список пользователей получен", userInfos);
        } catch (Exception e) {
            return new UserListResponse(false, "Ошибка при получении списка пользователей: " + e.getMessage(), null);
        }
    }

    public boolean blockUser(Long userId) {
        try {
            User user = userRepository.findById(userId).orElse(null);
            if (user == null) {
                return false;
            }
            user.setIsBlocked(true);
            userRepository.save(user);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean unblockUser(Long userId) {
        try {
            User user = userRepository.findById(userId).orElse(null);
            if (user == null) {
                return false;
            }
            user.setIsBlocked(false);
            userRepository.save(user);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isAdmin(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        return user != null && Boolean.TRUE.equals(user.getIsAdmin());
    }
}

