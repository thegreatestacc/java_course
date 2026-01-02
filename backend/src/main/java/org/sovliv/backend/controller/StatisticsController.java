package org.sovliv.backend.controller;

import org.sovliv.backend.dto.MaterialProgressResponse;
import org.sovliv.backend.dto.UserStatisticsResponse;
import org.sovliv.backend.service.StatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("/api/statistics")
@CrossOrigin(originPatterns = "*", allowCredentials = "true")
public class StatisticsController {

    private final StatisticsService statisticsService;

    @Autowired
    public StatisticsController(StatisticsService statisticsService) {
        this.statisticsService = statisticsService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserStatisticsResponse> getUserStatistics(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        UserStatisticsResponse statistics = statisticsService.getUserStatistics(userId);
        return ResponseEntity.ok(statistics);
    }

    @GetMapping("/materials/status")
    public ResponseEntity<Boolean> getMaterialStatus(@RequestParam("materialId") String materialId, HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        try {
            boolean isCompleted = statisticsService.isMaterialCompleted(userId, materialId);
            return ResponseEntity.ok(isCompleted);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/materials/complete")
    public ResponseEntity<?> markMaterialAsCompleted(@RequestParam("materialId") String materialId, HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Пользователь не авторизован");
        }

        try {
            statisticsService.markMaterialAsCompleted(userId, materialId);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            System.err.println("IllegalArgumentException: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            System.err.println("Exception: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Ошибка при сохранении прогресса: " + e.getMessage());
        }
    }

    @GetMapping("/materials/completed")
    public ResponseEntity<List<MaterialProgressResponse>> getCompletedMaterials(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        try {
            List<MaterialProgressResponse> materials = statisticsService.getCompletedMaterials(userId);
            return ResponseEntity.ok(materials);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/materials/complete")
    public ResponseEntity<?> unmarkMaterialAsCompleted(@RequestParam("materialId") String materialId, HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Пользователь не авторизован");
        }

        try {
            statisticsService.unmarkMaterialAsCompleted(userId, materialId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            System.err.println("Exception: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Ошибка при откате материала: " + e.getMessage());
        }
    }
}

