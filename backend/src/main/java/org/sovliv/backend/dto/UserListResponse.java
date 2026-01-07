package org.sovliv.backend.dto;

import java.util.List;

public class UserListResponse {
    private boolean success;
    private String message;
    private List<UserInfo> users;

    public UserListResponse() {
    }

    public UserListResponse(boolean success, String message, List<UserInfo> users) {
        this.success = success;
        this.message = message;
        this.users = users;
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

    public List<UserInfo> getUsers() {
        return users;
    }

    public void setUsers(List<UserInfo> users) {
        this.users = users;
    }

    public static class UserInfo {
        private Long id;
        private String email;
        private String name;
        private String createdAt;
        private Boolean isAdmin;
        private Boolean isBlocked;

        public UserInfo() {
        }

        public UserInfo(Long id, String email, String name, String createdAt, Boolean isAdmin, Boolean isBlocked) {
            this.id = id;
            this.email = email;
            this.name = name;
            this.createdAt = createdAt;
            this.isAdmin = isAdmin;
            this.isBlocked = isBlocked;
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getCreatedAt() {
            return createdAt;
        }

        public void setCreatedAt(String createdAt) {
            this.createdAt = createdAt;
        }

        public Boolean getIsAdmin() {
            return isAdmin;
        }

        public void setIsAdmin(Boolean isAdmin) {
            this.isAdmin = isAdmin;
        }

        public Boolean getIsBlocked() {
            return isBlocked;
        }

        public void setIsBlocked(Boolean isBlocked) {
            this.isBlocked = isBlocked;
        }
    }
}

