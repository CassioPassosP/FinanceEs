package com.finance.api.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "categories")
@Data
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String type;

    private String color;

    private String icon;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}