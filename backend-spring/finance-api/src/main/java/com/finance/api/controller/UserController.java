package com.finance.api.controller;

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
    public List<UserDTO> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")  // ← ADICIONAR este endpoint
    public ResponseEntity<UserDTO> obterPorId(@PathVariable Long id) {
        UserDTO dto = service.obterPorId(id);
        if (dto != null) {
            return ResponseEntity.ok(dto);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/me")
    public ResponseEntity<UserDTO> getMe(Authentication authentication) {
        String email = authentication.getName();

        UserDTO user = service.buscarPorEmail(email);

        return ResponseEntity.ok(user);
    }

    @PostMapping
    public ResponseEntity<UserDTO> criar(@RequestBody UserDTO dto) {
        UserDTO created = service.criar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}