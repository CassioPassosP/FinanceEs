package com.finance.api.service;

import com.finance.api.dto.CategoryDTO;
import com.finance.api.entity.Category;
import com.finance.api.entity.User;
import com.finance.api.repository.CategoryRepository;
import com.finance.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UserRepository userRepository;

    public List<CategoryDTO> listarPorUsuario(Long userId) {
        return categoryRepository.findByUserId(userId).stream()
                .map(this::entityToDTO)
                .collect(Collectors.toList());
    }

    public List<CategoryDTO> listarPorUsuarioETipo(Long userId, String type) {
        return categoryRepository.findByUserIdAndType(userId, type).stream()
                .map(this::entityToDTO)
                .collect(Collectors.toList());
    }

    public CategoryDTO obterPorId(Long id) {
        return categoryRepository.findById(id)
                .map(this::entityToDTO)
                .orElse(null);
    }

    public CategoryDTO criar(CategoryDTO dto) {
        Category category = new Category();
        category.setName(dto.getName());
        category.setType(dto.getType());
        category.setColor(dto.getColor());
        category.setIcon(dto.getIcon());

        if (dto.getUserId() != null) {
            User user = userRepository.findById(dto.getUserId()).orElse(null);
            category.setUser(user);
        }

        Category saved = categoryRepository.save(category);
        return entityToDTO(saved);
    }

    public CategoryDTO atualizar(Long id, CategoryDTO dto) {
        Category category = categoryRepository.findById(id).orElse(null);
        if (category != null) {
            category.setName(dto.getName());
            category.setType(dto.getType());
            category.setColor(dto.getColor());
            category.setIcon(dto.getIcon());

            Category updated = categoryRepository.save(category);
            return entityToDTO(updated);
        }
        return null;
    }

    public void deletar(Long id) {
        categoryRepository.deleteById(id);
    }

    private CategoryDTO entityToDTO(Category category) {
        return new CategoryDTO(
                category.getId(),
                category.getName(),
                category.getType(),
                category.getColor(),
                category.getIcon(),
                category.getUser() != null ? category.getUser().getId() : null
        );
    }
}
