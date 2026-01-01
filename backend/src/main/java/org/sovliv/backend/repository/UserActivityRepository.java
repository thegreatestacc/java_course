package org.sovliv.backend.repository;

import org.sovliv.backend.model.UserActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserActivityRepository extends JpaRepository<UserActivity, Long> {
    
    Optional<UserActivity> findByUserIdAndActivityDate(Long userId, LocalDate date);
    
    @Query("SELECT ua FROM UserActivity ua WHERE ua.user.id = :userId AND ua.activityDate >= :startDate ORDER BY ua.activityDate ASC")
    List<UserActivity> findByUserIdAndActivityDateAfter(@Param("userId") Long userId, @Param("startDate") LocalDate startDate);
    
    @Query("SELECT ua FROM UserActivity ua WHERE ua.user.id = :userId AND ua.activityDate BETWEEN :startDate AND :endDate ORDER BY ua.activityDate ASC")
    List<UserActivity> findByUserIdAndActivityDateBetween(
        @Param("userId") Long userId, 
        @Param("startDate") LocalDate startDate, 
        @Param("endDate") LocalDate endDate
    );
}

