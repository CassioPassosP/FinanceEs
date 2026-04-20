package com.finance.api.controller;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService service;

    @GetMapping
    public List<UserDTO> listar() {
        return service.listar();
    }

    @PostMapping
    public UserDTO criar(@RequestBody UserDTO dto) {
        return service.criar(dto);
    }
}