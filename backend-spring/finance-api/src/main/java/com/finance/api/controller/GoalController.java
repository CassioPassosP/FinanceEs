package com.finance.api.controller;

import com.finance.api.entity.Goal;
import com.finance.api.service.GoalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/goals")
public class GoalController {

    @Autowired
    private GoalService service;

    @GetMapping
    public List<Goal> listGoalsUser(Authentication auth) {
        return service.listGoalsUser(auth.getName());
    }

    @PostMapping
    public Goal create(@RequestBody Goal goal, Authentication auth) {
        return service.create(goal, auth.getName());
    }

    @PutMapping("/{id}")
    public Goal update(@PathVariable Long id, @RequestBody Goal goal) {
        return service.update(id, goal);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}