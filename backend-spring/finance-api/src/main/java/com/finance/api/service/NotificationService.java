package com.finance.api.service;

import com.finance.api.entity.NotificationEntity;
import com.finance.api.entity.UserEntity;
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

    public List<NotificationEntity> listar(String email) {
        UserEntity user = userRepository.findByEmail(email).orElseThrow();
        return repository.findByUser(user);
    }

    public NotificationEntity criar(String message, String email) {
        UserEntity user = userRepository.findByEmail(email).orElseThrow();

        NotificationEntity n = new NotificationEntity();
        n.setMessage(message);
        n.setRead(false);
        n.setCreatedAt(LocalDateTime.now());
        n.setUser(user);

        return repository.save(n);
    }

    public void marcarComoLida(Long id) {
        NotificationEntity n = repository.findById(id).orElseThrow();
        n.setRead(true);
        repository.save(n);
    }
}