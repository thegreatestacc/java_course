package org.sovliv.backend.dto;

public class AuthResponse {
    private boolean success;
    private String message;
    private UserDto user;

    public AuthResponse() {
    }

    public AuthResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public AuthResponse(boolean success, String message, UserDto user) {
        this.success = success;
        this.message = message;
        this.user = user;
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

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }

    public static class UserDto {
        private Long id;
        private String email;
        private String name;
        private String createdAt;
        private Boolean isAdmin;
        private Boolean isBlocked;
        private Boolean tooltipsEnabled;

        public UserDto() {
        }

        public UserDto(Long id, String email, String name) {
            this.id = id;
            this.email = email;
            this.name = name;
        }

        public UserDto(Long id, String email, String name, String createdAt) {
            this.id = id;
            this.email = email;
            this.name = name;
            this.createdAt = createdAt;
        }

        public UserDto(Long id, String email, String name, String createdAt, Boolean isAdmin, Boolean isBlocked) {
            this.id = id;
            this.email = email;
            this.name = name;
            this.createdAt = createdAt;
            this.isAdmin = isAdmin;
            this.isBlocked = isBlocked;
        }

        public UserDto(Long id, String email, String name, String createdAt, Boolean isAdmin, Boolean isBlocked, Boolean tooltipsEnabled) {
            this.id = id;
            this.email = email;
            this.name = name;
            this.createdAt = createdAt;
            this.isAdmin = isAdmin;
            this.isBlocked = isBlocked;
            this.tooltipsEnabled = tooltipsEnabled;
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

        public Boolean getTooltipsEnabled() {
            return tooltipsEnabled != null ? tooltipsEnabled : true;
        }

        public void setTooltipsEnabled(Boolean tooltipsEnabled) {
            this.tooltipsEnabled = tooltipsEnabled;
        }
    }
}

