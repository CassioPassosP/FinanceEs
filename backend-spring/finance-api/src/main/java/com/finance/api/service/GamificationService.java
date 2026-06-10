package com.finance.api.service;

import com.finance.api.entity.UserEntity;
import com.finance.api.model.TypeAchievement;
import org.springframework.stereotype.Service;

@Service
public class GamificationService {

    public int calculateLevel(int totalPoints) {

        if (totalPoints >= 3000) return 8;
        if (totalPoints >= 2200) return 7;
        if (totalPoints >= 1500) return 6;
        if (totalPoints >= 1000) return 5;
        if (totalPoints >= 500) return 4;
        if (totalPoints >= 250) return 3;
        if (totalPoints >= 100) return 2;

        return 1;
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