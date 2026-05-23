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
                .map(u -> new UserDTO(u.getId(), u.getName(), u.getEmail(), u.getProfileType()))
                .toList();
    }

    public UserDTO criar(UserDTO dto) {
        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setProfileType(dto.getProfileType()); 
        user.setPasswordHash(passwordEncoder.encode(dto.getPassword()));

        User saved = repository.save(user);

        return new UserDTO(saved.getId(), saved.getName(), saved.getEmail(), saved.getProfileType());
    }

    public UserDTO atualizar(Long id, UserDTO updated) {
        User user = repository.findById(id).orElseThrow();

        if (updated.getName() != null) {
            user.setName(updated.getName());
        }

        if (updated.getEmail() != null) {
            user.setEmail(updated.getEmail());
        }

        if (updated.getProfileType() != null) {
            user.setProfileType(updated.getProfileType());
        }

        User saved = repository.save(user);
        
        return new UserDTO(saved.getId(), saved.getName(), saved.getEmail(), saved.getProfileType());
    }

    public UserDTO obterPorId(Long id) {
        return repository.findById(id)
                .map(u -> new UserDTO(u.getId(), u.getName(), u.getEmail(), u.getProfileType()))
                .orElse(null);
    }

    public UserDTO buscarPorEmail(String email) {
        User user = repository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        return new UserDTO(user.getId(), user.getName(), user.getEmail(), user.getProfileType());
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }
}