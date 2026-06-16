package com.finance.api.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

import com.finance.api.model.TypeAchievement;

import java.util.List;
import java.util.Set;
import java.util.HashSet;

@Entity
@Table(name = "users")
@Data
public class UserEntity {

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

    @Column(name = "monthly_budget")
    private Double monthlyBudget;

    @Column(name = "profile_type")
    private String profileType = "moderado";

    @Column(name = "total_points")
    private Integer totalPoints = 0;

    @Column(name = "current_level")
    private Integer currentLevel = 1;

    @ElementCollection(fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    @CollectionTable(
        name = "user_achievements",
        joinColumns = @JoinColumn(name = "user_id")
    )
    @Column(name = "achievement")
    private Set<TypeAchievement> achievements = new HashSet<>();
}