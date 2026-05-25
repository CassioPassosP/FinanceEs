package com.finance.api.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "total_points")
    private Integer totalPoints = 0;

    @Column(name = "current_level")
    private Integer currentLevel = 1;

    @Column(name = "profile_type")
    private String profileType = "moderado";

    @Column(name = "monthly_budget")
    private Double monthlyBudget;
}