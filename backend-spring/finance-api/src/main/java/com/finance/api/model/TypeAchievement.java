package com.finance.api.model;

public enum TypeAchievement {

    FIRST_INCOME(
        "First Income",
        "Registered your first income"
    ),

    FIRST_EXPENSE(
        "First Expense",
        "Registered your first expense"
    ),

    FIRST_FINANCIAL_GOAL(
        "First Goal",
        "Created your first financial goal"
    ),

    TEN_TRANSACTIONS(
        "Organized",
        "Registered 10 transactions"
    ),

    FIFTY_TRANSACTIONS(
        "Master Controller",
        "Registered 50 transactions"
    ),

    GOAL_ACHIEVED(
        "Goal Achieved",
        "Completed a financial goal"
    );

    private final String title;
    private final String description;

    TypeAchievement(String title, String description) {
        this.title = title;
        this.description = description;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }
}