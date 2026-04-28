package com.finance.api.service;

import com.finance.api.dto.UserDTO;
import com.finance.api.entity.User;
import com.finance.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<UserDTO> listar() {
        return repository.findAll()
                .stream()
                .map(u -> new UserDTO(u.getId(), u.getName(), u.getEmail()))
                .toList();
    }

    public UserDTO criar(UserDTO dto) {
        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPasswordHash(passwordEncoder.encode(dto.getPassword()));

        User saved = repository.save(user);

        return new UserDTO(saved.getId(), saved.getName(), saved.getEmail());
    }

    public UserDTO obterPorId(Long id) {
        return repository.findById(id)
                .map(u -> new UserDTO(u.getId(), u.getName(), u.getEmail()))
                .orElse(null);
    }

    public UserDTO buscarPorEmail(String email) {
        User user = repository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        return new UserDTO(user.getId(), user.getName(), user.getEmail());
    }
}