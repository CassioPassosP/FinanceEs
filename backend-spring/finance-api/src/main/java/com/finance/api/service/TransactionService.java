package com.finance.api.service;

import com.finance.api.repository.CategoryRepository;
import com.finance.api.entity.Category;
import com.finance.api.entity.Transaction;
import com.finance.api.dto.TransactionDTO;
import com.finance.api.entity.User;
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

    public List<TransactionDTO> listTransactionsUser(String email) {

    User user = userRepository.findByEmail(email)
        .orElseThrow();

    List<Transaction> transactions = repository.findByUser(user);

    return transactions.stream()
        .map(t -> new TransactionDTO(
            t.getId(),
            t.getType(),
            t.getAmount(),
            t.getDescription(),
            t.getDate(),
            t.getUser().getId(),
            t.getCategory().getId()
        ))
        .toList();
    }

    public TransactionDTO create(TransactionDTO dto, String email) {
        Transaction entity = new Transaction();
        User user = userRepository.findByEmail(email)
            .orElseThrow();

        entity.setUser(user);
        entity.setDate(dto.getDate());
        entity.setType(dto.getType());
        entity.setAmount(dto.getAmount());
        entity.setDescription(dto.getDescription());
        Category category = categoryRepository
            .findById(dto.getCategoryId())
            .orElseThrow();

        entity.setCategory(category);

        Transaction saved = repository.save(entity);

        return new TransactionDTO(saved.getId(), saved.getType(), saved.getAmount(), saved.getDescription(), saved.getDate(), saved.getUser().getId(), saved.getCategory().getId());
    }

    public TransactionDTO update(Long id, TransactionDTO nova, String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow();

        Transaction entity = repository.findById(id).orElseThrow();

        if (!entity.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Acesso negado");
        }

        entity.setDate(nova.getDate());
        entity.setType(nova.getType());
        entity.setAmount(nova.getAmount());
        entity.setDescription(nova.getDescription());
        
        Category category = categoryRepository
            .findById(nova.getCategoryId())
            .orElseThrow();
        
        entity.setCategory(category);

        Transaction updated = repository.save(entity);

        return new TransactionDTO(updated.getId(), updated.getType(), updated.getAmount(), updated.getDescription(), updated.getDate(), updated.getUser().getId(), updated.getCategory().getId());
    }

    public void delete(Long id, String email) {

        User user = userRepository.findByEmail(email)
            .orElseThrow();

        Transaction entity = repository.findById(id)
            .orElseThrow();

        if (!entity.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Acesso negado");
        }

        repository.delete(entity);
    }
}