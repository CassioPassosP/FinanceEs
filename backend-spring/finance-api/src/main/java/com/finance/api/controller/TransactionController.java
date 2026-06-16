package com.finance.api.controller;

import org.springframework.http.ResponseEntity;
import com.finance.api.dto.TransactionDTO;
import com.finance.api.entity.TransactionEntity;
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
    public List<TransactionDTO> list(Authentication auth) {
        return service.list(auth.getName());
    }

    @PostMapping
    public ResponseEntity<TransactionDTO> create(@RequestBody TransactionDTO dto, Authentication auth) {
        return ResponseEntity.ok(service.create(dto, auth.getName()));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TransactionDTO> update(
        @PathVariable Long id,
        @RequestBody TransactionDTO dto
    ) {

        return ResponseEntity.ok(service.update(id, dto));
    }
}