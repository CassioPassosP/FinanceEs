package com.finance.api.service;

import com.finance.api.entity.UserEntity;
import com.finance.api.model.TypeAchievement;
import org.springframework.stereotype.Service;
import com.finance.api.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class GamificationService {

    @Autowired
    private TransactionRepository transactionRepository;

    public int calculateLevel(int totalPoints) {

        return (totalPoints / 100) + 1;
    }

    public int calculateTransactionPoints(String type) {

        if ("INCOME".equalsIgnoreCase(type)) {
            return 10;
        }

        if ("EXPENSE".equalsIgnoreCase(type)) {
            return 5;
        }

        return 0;
    }

    public void addPoints(UserEntity user, int points) {

        int totalPoints = user.getTotalPoints() + points;

        user.setTotalPoints(totalPoints);
        user.setCurrentLevel(calculateLevel(totalPoints));
    }

    public void unlockAchievement(
            UserEntity user,
            TypeAchievement achievement) {

        System.out.println("Tentando desbloquear: " + achievement);

        if(user.getAchievements().contains(achievement)) {
            return;
        }

        user.getAchievements().add(achievement);

        addPoints(user, 30);
    }

    public void checkTransactionAchievements(UserEntity user,  String transactionType) {
        long totalTransactions = transactionRepository.countByUser(user);

        if (totalTransactions == 10) {
            unlockAchievement(user, TypeAchievement.TEN_TRANSACTIONS);
        }

        if (totalTransactions == 50) {
            unlockAchievement(user, TypeAchievement.FIFTY_TRANSACTIONS);
        }

        if ("INCOME".equalsIgnoreCase(transactionType)) {
            unlockAchievement(
                user,
                TypeAchievement.FIRST_INCOME
            );
        }

        if ("EXPENSE".equalsIgnoreCase(transactionType)) {
            unlockAchievement(
                user,
                TypeAchievement.FIRST_EXPENSE
            );
        }
    }
}