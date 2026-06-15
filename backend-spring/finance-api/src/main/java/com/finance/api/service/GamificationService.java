package com.finance.api.service;

import com.finance.api.entity.UserEntity;
import com.finance.api.model.TypeAchievement;
import org.springframework.stereotype.Service;

@Service
public class GamificationService {

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

        if(user.getAchievements().contains(achievement)) {
            return;
        }

        user.getAchievements().add(achievement);

        addPoints(user, 30);
    }
}