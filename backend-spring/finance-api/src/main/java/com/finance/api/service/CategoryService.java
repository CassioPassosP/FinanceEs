package com.finance.api.service;

import com.finance.api.dto.CategoryDTO;
import com.finance.api.entity.CategoryEntity;
import com.finance.api.entity.UserEntity;
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

    public List<CategoryDTO> listCategoriesUser(Long userId) {
        return categoryRepository.findAll().stream()
            .map(this::entityToDTO)
            .collect(Collectors.toList());
    }

    public List<CategoryDTO> listCategoriesUserAndType(Long userId, String type) {
        return categoryRepository.findByUserIdAndType(userId, type).stream()
                .map(this::entityToDTO)
                .collect(Collectors.toList());
    }

    public CategoryDTO getCategoryById(Long id) {
        return categoryRepository.findById(id)
                .map(this::entityToDTO)
                .orElse(null);
    }

    public CategoryDTO create(CategoryDTO dto) {
        CategoryEntity category = new CategoryEntity();
        category.setName(dto.getName());
        category.setType(dto.getType());
        category.setColor(dto.getColor());
        category.setIcon(dto.getIcon());

        if (dto.getUserId() != null) {
            UserEntity user = userRepository.findById(dto.getUserId()).orElse(null);
            category.setUser(user);
        }

        CategoryEntity saved = categoryRepository.save(category);
        return entityToDTO(saved);
    }

    public CategoryDTO update(Long id, CategoryDTO dto) {
        CategoryEntity category = categoryRepository.findById(id).orElse(null);
        if (category != null) {
            category.setName(dto.getName());
            category.setType(dto.getType());
            category.setColor(dto.getColor());
            category.setIcon(dto.getIcon());

            CategoryEntity updated = categoryRepository.save(category);
            return entityToDTO(updated);
        }
        return null;
    }

    public void delete(Long id) {
        categoryRepository.deleteById(id);
    }

    private CategoryDTO entityToDTO(CategoryEntity category) {
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
