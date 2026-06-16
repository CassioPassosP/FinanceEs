package com.finance.api.controller;

import com.finance.api.entity.GoalEntity;
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
    public List<GoalEntity> listGoalsUser(Authentication auth) {
        return service.listGoalsUser(auth.getName());
    }

    @PostMapping
    public GoalEntity create(@RequestBody GoalEntity goal, Authentication auth) {
        return service.create(goal, auth.getName());
    }

    @PutMapping("/{id}")
    public GoalEntity update(@PathVariable Long id, @RequestBody GoalEntity goal) {
        return service.update(id, goal);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}