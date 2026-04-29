package com.finance.api.controller;

import com.finance.api.dto.CategoryDTO;
import com.finance.api.service.CategoryService;
import com.finance.api.repository.UserRepository;
import com.finance.api.entity.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    private CategoryService service;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<CategoryDTO> listar(Authentication auth) {
        String email = auth.getName();
        User user = userRepository.findByEmail(email).orElseThrow();
        return service.listarPorUsuario(user.getId());
    }

    @PostMapping
    public CategoryDTO criar(@RequestBody CategoryDTO dto, Authentication auth) {
        String email = auth.getName();
        User user = userRepository.findByEmail(email).orElseThrow();
        dto.setUserId(user.getId());
        return service.criar(dto);
    }
}