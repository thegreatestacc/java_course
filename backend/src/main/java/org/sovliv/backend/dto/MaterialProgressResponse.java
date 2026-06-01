package org.sovliv.backend.dto;

import java.time.LocalDateTime;

public class MaterialProgressResponse {
    private Long id;
    private String materialId;
    private LocalDateTime completedAt;

    public MaterialProgressResponse() {
    }

    public MaterialProgressResponse(Long id, String materialId, LocalDateTime completedAt) {
        this.id = id;
        this.materialId = materialId;
        this.completedAt = completedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMaterialId() {
        return materialId;
    }

    public void setMaterialId(String materialId) {
        this.materialId = materialId;
    }

    public LocalDateTime getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(LocalDateTime completedAt) {
        this.completedAt = completedAt;
    }
}













