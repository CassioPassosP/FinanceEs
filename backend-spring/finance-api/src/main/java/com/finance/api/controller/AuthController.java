package com.finance.api.controller;

import com.finance.api.dto.LoginDTO;
import com.finance.api.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService service;

    @PostMapping("/login")
    public String login(@RequestBody LoginDTO dto) {
        return service.login(dto);
    }
}