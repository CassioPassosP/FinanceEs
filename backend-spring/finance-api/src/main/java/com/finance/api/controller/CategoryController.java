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
    public List<CategoryDTO> listCategoriesUser(Authentication auth) {

        System.out.println("AUTH: " + auth);

        String email = auth.getName();

        System.out.println("EMAIL AUTH: " + email);

        User user = userRepository.findByEmail(email)
            .orElseThrow();

        System.out.println("USUARIO: " + user.getEmail());

        return service.listCategoriesUser(user.getId());
    }

    @PostMapping
    public CategoryDTO create(@RequestBody CategoryDTO dto, Authentication auth) {
        String email = auth.getName();
        User user = userRepository.findByEmail(email).orElseThrow();
        dto.setUserId(user.getId());
        return service.create(dto);
    }
}