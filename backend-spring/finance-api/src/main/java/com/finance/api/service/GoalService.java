package com.finance.api.service;

import java.math.BigDecimal;
import com.finance.api.entity.Goal;
import com.finance.api.entity.User;
import com.finance.api.repository.GoalRepository;
import com.finance.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GoalService {

    @Autowired
    private GoalRepository repository;

    @Autowired
    private UserRepository userRepository;

    public List<Goal> listar(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        return repository.findByUser(user);
    }

    public Goal criar(Goal goal, String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        goal.setUser(user);
        goal.setCurrentAmount(new BigDecimal("0.0"));
        goal.setStatus("active");
        return repository.save(goal);
    }

    public Goal atualizar(Long id, Goal updated) {
        Goal goal = repository.findById(id).orElseThrow();

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

        Goal saved = repository.save(goal);
        return repository.findById(saved.getId()).orElseThrow();
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }
}