package com.finance.api.service;

import com.finance.api.entity.Notification;
import com.finance.api.entity.User;
import com.finance.api.repository.NotificationRepository;
import com.finance.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository repository;

    @Autowired
    private UserRepository userRepository;

    public List<Notification> listar(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        return repository.findByUser(user);
    }

    public Notification criar(String message, String email) {
        User user = userRepository.findByEmail(email).orElseThrow();

        Notification n = new Notification();
        n.setMessage(message);
        n.setRead(false);
        n.setCreatedAt(LocalDateTime.now());
        n.setUser(user);

        return repository.save(n);
    }

    public void marcarComoLida(Long id) {
        Notification n = repository.findById(id).orElseThrow();
        n.setRead(true);
        repository.save(n);
    }
}