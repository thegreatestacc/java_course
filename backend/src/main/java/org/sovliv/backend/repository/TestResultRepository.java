package org.sovliv.backend.repository;

import org.sovliv.backend.model.TestResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestResultRepository extends JpaRepository<TestResult, Long> {
    
    @Query("SELECT tr FROM TestResult tr WHERE tr.user.id = :userId ORDER BY tr.completedAt DESC")
    List<TestResult> findByUserIdOrderByCompletedAtDesc(@Param("userId") Long userId);
    
    @Query("SELECT tr FROM TestResult tr WHERE tr.user.id = :userId AND tr.testType = :testType ORDER BY tr.completedAt DESC")
    List<TestResult> findByUserIdAndTestTypeOrderByCompletedAtDesc(@Param("userId") Long userId, @Param("testType") String testType);
}


