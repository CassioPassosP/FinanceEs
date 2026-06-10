package com.finance.api.service;

import java.math.BigDecimal;
import com.finance.api.entity.GoalEntity;
import com.finance.api.entity.UserEntity;
import com.finance.api.repository.GoalRepository;
import com.finance.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalDateTime;

import java.util.List;

@Service
public class GoalService {

    @Autowired
    private GoalRepository repository;

    @Autowired
    private UserRepository userRepository;

    public List<GoalEntity> listGoalsUser(String email) {
        UserEntity user = userRepository.findByEmail(email).orElseThrow();
        return repository.findByUser(user);
    }

    public GoalEntity create(GoalEntity goal, String email) {
        UserEntity user = userRepository.findByEmail(email).orElseThrow();
        goal.setUser(user);
        goal.setCurrentAmount(new BigDecimal("0.0"));
        goal.setStatus("active");
        return repository.save(goal);
    }

    public GoalEntity update(Long id, GoalEntity updated) {
        GoalEntity goal = repository.findById(id).orElseThrow();

        if (updated.getTitle() != null) {
            goal.setTitle(updated.getTitle());
        }

        if (updated.getTargetAmount() != null) {
            goal.setTargetAmount(updated.getTargetAmount());
        }

        if (updated.getCurrentAmount() != null) {
            goal.setCurrentAmount(updated.getCurrentAmount());
        }

        if (updated.getStatus() != null) {
            goal.setStatus(updated.getStatus());
        }

        if (updated.getDueDate() != null) {
            goal.setDueDate(updated.getDueDate());
        }

        GoalEntity saved = repository.save(goal);
        return repository.findById(saved.getId()).orElseThrow();
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}