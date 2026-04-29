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
    public List<Goal> listar(Authentication auth) {
        return service.listar(auth.getName());
    }

    @PostMapping
    public Goal criar(@RequestBody Goal goal, Authentication auth) {
        return service.criar(goal, auth.getName());
    }

    @PutMapping("/{id}")
    public Goal atualizar(@PathVariable Long id, @RequestBody Goal goal) {
        return service.atualizar(id, goal);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }
}