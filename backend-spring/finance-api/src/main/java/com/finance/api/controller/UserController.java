package com.finance.api.controller;

import org.springframework.security.core.context.SecurityContextHolder;
import com.finance.api.dto.UserDTO;
import com.finance.api.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService service;

    @GetMapping
    public List<UserDTO> list() {
        return service.list();
    }

    @GetMapping("/{id}")  
    public ResponseEntity<UserDTO> getProfileById(@PathVariable Long id) {
        UserDTO dto = service.getProfileById(id);
        if (dto != null) {
            return ResponseEntity.ok(dto);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/me")
    public ResponseEntity<UserDTO> getMe(Authentication authentication) {
        String email = authentication.getName();

        UserDTO user = service.getByEmail(email);

        return ResponseEntity.ok(user);
    }

    @PostMapping
    public ResponseEntity<UserDTO> create(@RequestBody UserDTO dto) {
        UserDTO created = service.createProfile(dto);

        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/me")
    public ResponseEntity<UserDTO> update(@RequestBody UserDTO dto) {
         String email = SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getName();

        UserDTO updated = service.updateProfile(dto, email);

        return ResponseEntity.ok(updated);
    }
}