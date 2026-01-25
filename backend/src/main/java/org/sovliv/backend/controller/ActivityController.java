package org.sovliv.backend.controller;

import org.sovliv.backend.dto.ActivityResponse;
import org.sovliv.backend.dto.RecordActivityRequest;
import org.sovliv.backend.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeParseException;

@RestController
@RequestMapping("/api/activity")
@CrossOrigin(originPatterns = "*", allowCredentials = "true")
public class ActivityController {

    private final ActivityService activityService;

    @Autowired
    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    @GetMapping("/me")
    public ResponseEntity<ActivityResponse> getMyActivity(
            @RequestParam(required = false) Integer year,
            HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        
        if (userId == null) {
            return ResponseEntity.status(401).build();
        }

        ActivityResponse response;
        if (year != null) {
            response = activityService.getUserActivityByYear(userId, year);
        } else {
            response = activityService.getUserActivity(userId);
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/record")
    public ResponseEntity<?> recordActivity(@RequestBody RecordActivityRequest request, HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Пользователь не авторизован");
        }

        if (request.getTasksCompleted() == null || request.getTasksCompleted() < 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Неверное количество заданий");
        }

        LocalDate date;
        try {
            if (request.getDate() != null && !request.getDate().isEmpty()) {
                date = LocalDate.parse(request.getDate());
            } else {
                date = LocalDate.now(ZoneId.of("Europe/Moscow"));
            }
        } catch (DateTimeParseException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Неверный формат даты");
        }

        activityService.recordActivity(userId, date, request.getTasksCompleted());
        return ResponseEntity.ok().build();
    }
}

