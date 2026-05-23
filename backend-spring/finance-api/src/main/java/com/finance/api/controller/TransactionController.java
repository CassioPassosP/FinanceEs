package com.finance.api.controller;

import com.finance.api.entity.Transaction;
import com.finance.api.dto.TransactionDTO;
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
    public List<TransactionDTO> listTransactionsUser(Authentication auth) {
        return service.listTransactionsUser(auth.getName());
    }

    @PostMapping
    public TransactionDTO create(@RequestBody TransactionDTO transaction, Authentication auth) {
        return service.create(transaction, auth.getName());
    }

    @PutMapping("/{id}")
    public TransactionDTO update(
        @PathVariable Long id,
        @RequestBody TransactionDTO transaction,
        Authentication auth
    ) {
        return service.update(id, transaction, auth.getName());
    }

    @DeleteMapping("/{id}")
    public void delete(
        @PathVariable Long id,
        Authentication auth
    ) {
        service.delete(id, auth.getName());
    }
}