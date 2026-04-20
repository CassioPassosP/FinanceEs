package com.finance.api.controller;

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