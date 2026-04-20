package com.finance.api.service;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    public List<UserDTO> listar() {
        return repository.findAll()
                .stream()
                .map(u -> new UserDTO(u.getId(), u.getName(), u.getEmail()))
                .toList();
    }

    public UserDTO criar(UserDTO dto) {
        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());

        User saved = repository.save(user);

        return new UserDTO(saved.getId(), saved.getName(), saved.getEmail());
    }
}