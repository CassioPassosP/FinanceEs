package com.finance.api.service;

import com.finance.api.entity.Transaction;
import com.finance.api.entity.User;
import com.finance.api.repository.TransactionRepository;
import com.finance.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository repository;

    @Autowired
    private UserRepository userRepository;

    public List<Transaction> listar(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        return repository.findByUser(user);
    }

    public Transaction criar(Transaction transaction, String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        transaction.setUser(user);
        return repository.save(transaction);
    }

    public Transaction atualizar(Long id, Transaction nova, String email) {

        Transaction antiga = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Transação não encontrada"));

        // (opcional mas importante)
        if (!antiga.getUser().getEmail().equals(email)) {
            throw new RuntimeException("Não autorizado");
        }

        antiga.setDescription(nova.getDescription());
        antiga.setAmount(nova.getAmount());
        antiga.setCategory(nova.getCategory());
        antiga.setDate(nova.getDate());
        antiga.setType(nova.getType());

        return repository.save(antiga);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }
}