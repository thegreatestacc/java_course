package org.sovliv.backend.repository;

import org.sovliv.backend.model.MaterialProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MaterialProgressRepository extends JpaRepository<MaterialProgress, Long> {
    
    Optional<MaterialProgress> findByUserIdAndMaterialId(Long userId, String materialId);
    
    @Query("SELECT mp FROM MaterialProgress mp JOIN FETCH mp.user WHERE mp.user.id = :userId ORDER BY mp.completedAt DESC")
    List<MaterialProgress> findByUserId(@Param("userId") Long userId);
    
    @Query("SELECT COUNT(mp) FROM MaterialProgress mp WHERE mp.user.id = :userId")
    Long countByUserId(@Param("userId") Long userId);
}

