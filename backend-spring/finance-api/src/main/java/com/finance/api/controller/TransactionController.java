package com.finance.api.controller;

import com.finance.api.entity.Transaction;
import com.finance.api.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transactions")
public class TransactionController {

    @Autowired
    private TransactionService service;

    @GetMapping
    public List<Transaction> listar(Authentication auth) {
        return service.listar(auth.getName());
    }

    @PostMapping
    public Transaction criar(@RequestBody Transaction transaction, Authentication auth) {
        return service.criar(transaction, auth.getName());
    }

    @PutMapping("/{id}")
    public Transaction atualizar(
        @PathVariable Long id,
        @RequestBody Transaction transaction,
        Authentication auth
    ) {
        return service.atualizar(id, transaction, auth.getName());
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }
}