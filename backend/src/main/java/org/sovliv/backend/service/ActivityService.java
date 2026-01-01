package org.sovliv.backend.service;

import org.sovliv.backend.dto.ActivityResponse;
import org.sovliv.backend.model.User;
import org.sovliv.backend.model.UserActivity;
import org.sovliv.backend.repository.UserActivityRepository;
import org.sovliv.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ActivityService {

    private final UserActivityRepository activityRepository;
    private final UserRepository userRepository;

    @Autowired
    public ActivityService(UserActivityRepository activityRepository, UserRepository userRepository) {
        this.activityRepository = activityRepository;
        this.userRepository = userRepository;
    }

    public ActivityResponse getUserActivity(Long userId) {
        return getUserActivityByYear(userId, LocalDate.now().getYear());
    }

    public ActivityResponse getUserActivityByYear(Long userId, int year) {
        // Получаем данные за весь выбранный год
        LocalDate startDate = LocalDate.of(year, 1, 1);
        LocalDate endDate = LocalDate.of(year, 12, 31);

        List<UserActivity> activities = activityRepository.findByUserIdAndActivityDateBetween(
            userId, startDate, endDate
        );

        // Создаем карту для быстрого доступа
        Map<LocalDate, Integer> activityMap = new HashMap<>();
        for (UserActivity activity : activities) {
            activityMap.put(activity.getActivityDate(), activity.getTasksCompleted());
        }

        // Генерируем полный список дней за год (все дни должны быть представлены)
        List<ActivityResponse.ActivityDay> result = new ArrayList<>();
        LocalDate currentDate = startDate;
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE;

        while (!currentDate.isAfter(endDate)) {
            Integer count = activityMap.getOrDefault(currentDate, 0);
            result.add(new ActivityResponse.ActivityDay(
                currentDate.format(formatter),
                count
            ));
            currentDate = currentDate.plusDays(1);
        }

        return new ActivityResponse(result);
    }

    public void recordActivity(Long userId, LocalDate date, Integer tasksCompleted) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        UserActivity activity = activityRepository.findByUserIdAndActivityDate(userId, date)
            .orElse(new UserActivity());

        if (activity.getId() == null) {
            // Создаем новую активность
            activity.setUser(user);
            activity.setActivityDate(date);
            activity.setTasksCompleted(0);
        }

        activity.setTasksCompleted(activity.getTasksCompleted() + tasksCompleted);
        activityRepository.save(activity);
    }
}

