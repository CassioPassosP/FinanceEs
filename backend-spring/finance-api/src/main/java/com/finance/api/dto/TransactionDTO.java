package com.finance.api.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class TransactionDTO {
    private Long id;
    private String type;
    private BigDecimal amount;
    private String description;
    private LocalDateTime date;
    private Long userId;
    private Long categoryId;

    public TransactionDTO() {}
    
    public TransactionDTO(Long id, String type, BigDecimal amount, String description, LocalDateTime date, Long userId, Long categoryId) {
        this.id = id;
        this.type = type;
        this.amount = amount;
        this.description = description;
        this.date = date;
        this.userId = userId;
        this.categoryId = categoryId;
    }

    public Long getId() {return id;}
    public void setId(Long id) {this.id = id;}

    public String getType() {return type;}
    public void setType(String type) {this.type = type;}

    public BigDecimal getAmount() {return amount;}
    public void setAmount(BigDecimal amount) {this.amount = amount;}

    public String getDescription() {return description;}
    public void setDescription(String description) {this.description = description;}

    public LocalDateTime getDate() {return date;}
    public void setDate(LocalDateTime date) {this.date = date;}

    public Long getUserId() {return userId;}
    public void setUserId(Long userId) {this.userId = userId;}

    public Long getCategoryId() {return categoryId;}
    public void setCategoryId(Long categoryId) {this.categoryId = categoryId;}

}