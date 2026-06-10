package com.finance.api.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.finance.api.repository.UserRepository;
import com.finance.api.security.JwtService;
import com.finance.api.dto.LoginDTO;
import com.finance.api.entity.UserEntity;
import java.util.Map;

@Service
public class AuthService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Map<String, String> login(LoginDTO dto) {

        UserEntity user = repository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (!passwordEncoder.matches(dto.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Senha inválida");
        }

        return Map.of("token", jwtService.generateToken(user.getEmail()));
    }
}