package com.finance.api.controller;

import java.util.Map;
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
    public Map<String, String> login(@RequestBody LoginDTO dto) {
        return service.login(dto);
    }
}