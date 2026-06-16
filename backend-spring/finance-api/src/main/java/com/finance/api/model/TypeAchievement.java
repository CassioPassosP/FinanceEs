package com.finance.api.model;

public enum TypeAchievement {

    FIRST_INCOME(
        "First Income",
        "Registered your first income",
        30
    ),

    FIRST_EXPENSE(
        "First Expense",
        "Registered your first expense",
        30
    ),

    FIRST_FINANCIAL_GOAL(
        "First Goal",
        "Created your first financial goal",
        30
    ),

    TEN_TRANSACTIONS(
        "Organized",
        "Registered 10 transactions",
        50
    ),

    FIFTY_TRANSACTIONS(
        "Master Controller",
        "Registered 50 transactions",
        100
    ),

    GOAL_ACHIEVED(
        "Goal Achieved",
        "Completed a financial goal",
        75
    );

    private final String title;
    private final String description;
    private final int points;

    TypeAchievement(
            String title,
            String description,
            int points) {

        this.title = title;
        this.description = description;
        this.points = points;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public int getPoints() {
        return points;
    }
}