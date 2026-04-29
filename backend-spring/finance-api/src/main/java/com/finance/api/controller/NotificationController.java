package com.finance.api.controller;

import com.finance.api.entity.Notification;
import com.finance.api.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    @Autowired
    private NotificationService service;

    @GetMapping
    public List<Notification> listar(Authentication auth) {
        return service.listar(auth.getName());
    }

    @PostMapping
    public Notification criar(@RequestBody String message, Authentication auth) {
        return service.criar(message, auth.getName());
    }

    @PutMapping("/{id}/read")
    public void marcarComoLida(@PathVariable Long id) {
        service.marcarComoLida(id);
    }
}