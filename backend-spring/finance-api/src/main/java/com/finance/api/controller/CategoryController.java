package com.finance.api.controller;

import com.finance.api.dto.CategoryDTO;
import com.finance.api.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    private CategoryService service;

    @GetMapping("/usuario/{userId}")
    public List<CategoryDTO> listarPorUsuario(@PathVariable Long userId) {
        return service.listarPorUsuario(userId);
    }

    @GetMapping("/usuario/{userId}/tipo/{type}")
    public List<CategoryDTO> listarPorUsuarioETipo(@PathVariable Long userId, @PathVariable String type) {
        return service.listarPorUsuarioETipo(userId, type);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryDTO> obterPorId(@PathVariable Long id) {
        CategoryDTO dto = service.obterPorId(id);
        if (dto != null) {
            return ResponseEntity.ok(dto);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<CategoryDTO> criar(@RequestBody CategoryDTO dto) {
        CategoryDTO created = service.criar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryDTO> atualizar(@PathVariable Long id, @RequestBody CategoryDTO dto) {
        CategoryDTO updated = service.atualizar(id, dto);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
