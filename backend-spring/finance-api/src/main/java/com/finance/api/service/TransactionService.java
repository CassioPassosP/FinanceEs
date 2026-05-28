package com.finance.api.service;

import com.finance.api.dto.TransactionDTO;
import com.finance.api.entity.Category;
import com.finance.api.entity.Transaction;
import com.finance.api.dto.TransactionDTO;
import com.finance.api.entity.User;
import com.finance.api.repository.CategoryRepository;
import com.finance.api.repository.TransactionRepository;
import com.finance.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private TransactionRepository repository;

    @Autowired
    private UserRepository userRepository;

    public List<TransactionDTO> list(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        return repository.findByUserOrderByDateDesc(user).stream()
                .map(t -> new TransactionDTO(
                    t.getId(),
                    t.getType(),
                    t.getAmount(),
                    t.getDescription(),
                    t.getDate(),
                    t.getUser() != null
                        ? t.getUser().getId()
                        : null,
                    t.getCategory() != null
                        ? t.getCategory().getId()
                        : null
                ))
                .collect(java.util.stream.Collectors.toList());
    }

    public TransactionDTO create(TransactionDTO dto, String email) {

        User user = userRepository.findByEmail(email).orElseThrow();

        Category category = categoryRepository
                .findById(dto.getCategoryId())
                .orElseThrow();

        Transaction transaction = new Transaction();

        transaction.setType(dto.getType());
        transaction.setAmount(dto.getAmount());
        transaction.setDescription(dto.getDescription());
        transaction.setDate(dto.getDate());

        transaction.setUser(user);
        transaction.setCategory(category);

        Transaction saved = repository.save(transaction);

        return new TransactionDTO(
            saved.getId(),
            saved.getType(),
            saved.getAmount(),
            saved.getDescription(),
            saved.getDate(),
            saved.getUser() != null
                ? saved.getUser().getId()
                : null,
            saved.getCategory() != null
                ? saved.getCategory().getId()
                : null  
        );
    }

    public TransactionDTO update(Long id, TransactionDTO dto) {

        Transaction transaction = repository.findById(id)
                .orElseThrow();

        if (dto.getCategoryId() != null) {

            Category category = categoryRepository
                    .findById(dto.getCategoryId())
                    .orElseThrow();

            transaction.setCategory(category);
        }

        if (dto.getType() != null) {
            transaction.setType(dto.getType());
        }

        if (dto.getAmount() != null) {
            transaction.setAmount(dto.getAmount());
        }

        if (dto.getDescription() != null &&
            !dto.getDescription().trim().isEmpty()) {

            transaction.setDescription(dto.getDescription());
        }

        if (dto.getDate() != null) {
            transaction.setDate(dto.getDate());
        }

        Transaction updated = repository.save(transaction);

        return new TransactionDTO(
            updated.getId(),
            updated.getType(),
            updated.getAmount(),
            updated.getDescription(),
            updated.getDate(),
            updated.getUser().getId(),
            updated.getCategory().getId()
        );
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
