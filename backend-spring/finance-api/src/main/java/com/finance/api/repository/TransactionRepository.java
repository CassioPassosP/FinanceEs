package com.finance.api.repository;

import com.finance.api.entity.UserEntity;
import com.finance.api.entity.TransactionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<TransactionEntity, Long> {
    List<TransactionEntity> findByUserOrderByDateDesc(UserEntity user);

    long countByUser(UserEntity user);
}
