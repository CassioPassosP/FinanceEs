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

    public List<UserDTO> list() {
        return repository.findAll()
                .stream()
                .map(u -> new UserDTO(u.getId(), u.getName(), u.getEmail(), u.getProfileType(), u.getMonthlyBudget()))
                .toList();
    }

    public UserDTO createProfile(UserDTO dto) {
        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setMonthlyBudget(dto.getMonthlyBudget());
        user.setPasswordHash(passwordEncoder.encode(dto.getPassword()));

        User saved = repository.save(user);

        return new UserDTO(saved.getId(), saved.getName(), saved.getEmail(), saved.getProfileType(), saved.getMonthlyBudget());
    }

    public UserDTO getProfileById(Long id) {
        return repository.findById(id)
                .map(u -> new UserDTO(u.getId(), u.getName(), u.getEmail(), u.getProfileType(), u.getMonthlyBudget()))
                .orElse(null);
    }

    public UserDTO getByEmail(String email) {
        User user = repository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        return new UserDTO(user.getId(), user.getName(), user.getEmail(), user.getProfileType(), user.getMonthlyBudget());
    }

    public UserDTO updateProfile(UserDTO dto, String email) {

        User user = repository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (dto.getName() != null && !dto.getName().trim().isEmpty()) {
            user.setName(dto.getName());
        }

        if (dto.getEmail() != null && !dto.getEmail().trim().isEmpty()) {
            user.setEmail(dto.getEmail());
        }

        if (dto.getPassword() != null && !dto.getPassword().trim().isEmpty()) {
            user.setPasswordHash(passwordEncoder.encode(dto.getPassword()));
        }

        if (dto.getProfileType() != null && !dto.getProfileType().trim().isEmpty()) {
            user.setProfileType(dto.getProfileType());
        }

        if (dto.getMonthlyBudget() != null) {
            user.setMonthlyBudget(dto.getMonthlyBudget());
        }

        User updated = repository.save(user);

        return new UserDTO(updated.getId(),updated.getName(),updated.getEmail(),updated.getProfileType(),updated.getMonthlyBudget());
    }
}