package com.finance.api.repository;

import com.finance.api.entity.UserEntity; 
import com.finance.api.entity.GoalEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GoalRepository extends JpaRepository<GoalEntity, Long> {
    List<GoalEntity> findByUser(UserEntity user);
}
